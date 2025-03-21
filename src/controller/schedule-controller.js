const createError = require("../utils/createError");
const prisma = require("../configs/prisma");
const {
  findIntervalSelectedDate,
  findPlusAndMinusTwoDate,
  groupAndSortSchedules,
} = require("../utils/schedule-servies");

const days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

module.exports.getDoctorSchedulesByDoctorIdAndDay = async (req, res, next) => {
  try {
    const { doctorId, selectedDate } = req.query;

    const now = new Date();
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + 91);
    console.log(futureDate);

    console.log("selectedDate :>> ", selectedDate);

    if (!doctorId || isNaN(doctorId)) {
      createError(400, "doctor id invalid");
    }

    if (!selectedDate || typeof selectedDate !== ("string" || "number")) {
      createError(400, "selected date invalid");
    }

    if (new Date(selectedDate) <= now || new Date(selectedDate) > futureDate) {
      createError(
        400,
        "Appointments can be scheduled from tomorrow to 90 days ahead"
      );
    }

    /**
     *
     * @param {Date} selectedDate
     */

    const workDays = await prisma.doctorSchedule.groupBy({
      where: {
        doctorId: Number(doctorId),
        // day: {
        //   in: intervalDay,
        // },
      },
      by: ["day"],
    });

    console.log("workDays :>> ", workDays);

    const interval = workDays.map((el) => {
      return el.day;
    });

    // [
    // 'MONDAY',
    // "TUESDAY",
    // "WEDNESDAY"
    // ]

    const { intervalDate, dayAndDate } = findIntervalSelectedDate(
      interval,
      selectedDate
    );

    const schedules = await prisma.doctorSchedule.findMany({
      where: {
        doctorId: Number(doctorId),
        day: {
          in: interval,
        },
      },
      include: {
        Time: true,
      },
    });

    // console.log("schedules :>> ", schedules);

    // console.log("schedules :>> ", schedules);

    const overtimes = await prisma.doctorOvertime.findMany({
      where: {
        doctorId: Number(doctorId),
        date: {
          in: intervalDate,
        },
      },
      include: {
        Time: true,
      },
    });

    // console.log("overtimes :>> ", overtimes);

    const leaves = await prisma.doctorLeave.findMany({
      where: {
        doctorId: Number(doctorId),
        date: {
          in: intervalDate,
        },
      },
    });

    // console.log("leaves :>> ", leaves);

    let scheduleWithoutLeaveDay = [];

    if (leaves) {
      // console.log("JING :>> ");
      const leaveDaysNum = [
        ...new Set(
          leaves.map((el) => {
            const onlyDay = new Date(el.date).getDay();
            return onlyDay;
          })
        ),
      ];
      // console.log("leaveDaysNum :>> ", leaveDaysNum);

      const leaveDays = leaveDaysNum.map((el) => {
        return days[el];
      });
      // console.log("leaveDays :>> ", leaveDays);

      const leaveSchedules = schedules.filter(
        (el) =>
          leaveDays.includes(el.day) &&
          leaves.some((leave) => leave.timeId === el.timeId)
      );
      // console.log("leaveSchedules :>> ", leaveSchedules);

      scheduleWithoutLeaveDay = schedules.filter(
        (el) => !leaveSchedules.includes(el)
      );
      // console.log("scheduleWithoutLeaveDay :>> ", scheduleWithoutLeaveDay);
    }

    const bookedShedule = await prisma.appointment.findMany({
      where: {
        doctorId: Number(doctorId),
        appointmentDate: {
          in: intervalDate,
        },

        OR: [
          {
            doctorOvertimeId: {
              in: overtimes.map((el) => {
                return el.id;
              }),
            },
          },
          {
            doctorScheduleId: {
              in: scheduleWithoutLeaveDay.map((el) => {
                return el.id;
              }),
            },
          },
        ],
      },
    });

    // console.log("bookedShedule :>> ", bookedShedule);

    let resulteSchedules = [];
    if (overtimes) {
      resulteSchedules = scheduleWithoutLeaveDay.concat(overtimes);
    }
    // console.log("resulteSchedules :>> ", resulteSchedules);

    //ลองเพิ่มวันที่ลาในDB

    // for (let schedule of schedules) {
    // }

    // const overtimeSchedules = await prisma.overtimeSchedules.findMany({
    //   where: {
    //     doctorId: Number(doctorId),
    //     date: {
    //       in: [
    //         new Date(selectedDate),
    //         new Date(selectedDate - 1),
    //         new Date(selectedDate - 2),
    //         new Date(selectedDate + 1),
    //         new Date(selectedDate + 2),
    //       ],
    //     },
    //   },
    //   include: {
    //     Time: true,
    //   },
    // });

    // เอามาแค่เวลาจาก ISO
    // console.log("resultSchedules :>> ", resulteSchedules);

    const finalSchedule = resulteSchedules.filter((resulteSchedule) => {
      if (resulteSchedule.day) {
        const bookedId = bookedShedule.filter((el) => {
          return el.doctorScheduleId === resulteSchedule.id;
        });
        return bookedId.length === 0;
      } else if (resulteSchedule.date) {
        const bookedId = bookedShedule.filter((el) => {
          return el.doctorOvertimeId === resulteSchedule.id;
        });
        return bookedId.length === 0;
      }
    });

    finalSchedule.forEach((resulteSchedule) => {
      resulteSchedule.Time.startTime = resulteSchedule.Time.startTime
        .toISOString()
        .split("T")[1]
        .split(".")[0];
      resulteSchedule.Time.endTime = resulteSchedule.Time.endTime
        .toISOString()
        .split("T")[1]
        .split(".")[0];
    });

    // ทดสอบฟังก์ชัน
    const groupedSchedules = groupAndSortSchedules(finalSchedule, dayAndDate);
    // console.log(groupedSchedules);

    res.json({ groupedSchedules });
  } catch (error) {
    next(error);
  }
};

module.exports.getDoctorOvertime = async (req, res, next) => {
  try {
    const { doctorId, selectedDate } = req.query;
    if (!doctorId) {
      createError(400, "doctor id to be provided");
    }

    if (!selectedDate) {
      createError(400, "selected date to be provided");
    }

    const doctorOvertime = await prisma.doctorOvertime.findMany({
      where: {
        doctorId: Number(doctorId),
        date: new Date(selectedDate),
      },
      include: {
        Time: true,
      },
    });

    res.json({ doctorOvertime });
  } catch (error) {
    next(error);
  }
};

module.exports.getDoctorLeave = async (req, res, next) => {
  try {
    const { doctorId, selectedDate } = req.query;
    if (!doctorId) {
      createError(400, "doctor id to be provided");
    }

    if (!selectedDate) {
      createError(400, "selected date to be provided");
    }

    const doctorLeave = await prisma.doctorLeave.findMany({
      where: {
        doctorId: Number(doctorId),
        date: new Date(selectedDate),
      },
      include: {
        Time: true,
      },
    });

    res.json({ doctorLeave });
  } catch (error) {
    next(error);
  }
};
