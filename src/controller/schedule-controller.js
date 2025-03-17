const createError = require("../utils/createError");
const prisma = require("../configs/prisma");
const {
  findIntervalSelectedDate,
  findPlusAndMinusTwoDate,
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

    if (!doctorId) {
      createError(400, "doctor id to be provided");
    }

    if (!selectedDate) {
      createError(400, "selected date to be provided");
    }

    /**
     *
     * @param {Date} selectedDate
     */

    const schedules = await prisma.doctorSchedule.findMany({
      where: {
        doctorId: Number(doctorId),
        day: {
          in: findIntervalSelectedDate(selectedDate),
        },
      },
      include: {
        Time: true,
      },
    });

    // console.log("schedules :>> ", schedules);

    const overtimes = await prisma.doctorOvertime.findMany({
      where: {
        doctorId: Number(doctorId),
        date: {
          in: findPlusAndMinusTwoDate(selectedDate),
        },
      },
      include: {
        Time: true,
      },
    });

    console.log("overtimes :>> ", overtimes);

    const leaves = await prisma.doctorLeave.findMany({
      where: {
        doctorId: Number(doctorId),
        date: {
          in: findPlusAndMinusTwoDate(selectedDate),
        },
      },
    });

    // console.log("leaves :>> ", leaves);
    let scheduleWithoutLeaveDay = [];

    if (leaves) {
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
      console.log("scheduleWithoutLeaveDay :>> ", scheduleWithoutLeaveDay);
    }

    let resulteSchedules = [];
    if (overtimes) {
      resulteSchedules = scheduleWithoutLeaveDay.concat(overtimes);
      // const overtimeDaysNum = [
      //   ...new Set(
      //     overtimes.map((el) => {
      //       const onlyDay = new Date(el.date).getDay();
      //       return onlyDay;
      //     })
      //   ),
      // ];
      // console.log("overtimeDaysNum :>> ", overtimeDaysNum);
      // const overtimeDays = overtimeDaysNum.map((el) => {
      //   return days[el];
      // });
      // console.log("overtimeDays :>> ", overtimeDays);
      // const overtimeSchedules = leaveSchedules.filter(
      //   (el) =>
      //     overtimeDays.includes(el.day) &&
      //     leaves.some((leave) => leave.timeId === el.timeId)
      // );
      // console.log("overtimeSchedules :>> ", overtimeSchedules);
    }
    console.log("resulteSchedules :>> ", resulteSchedules);

    //ลองเพิ่มวันที่ลาในDB

    // console.log("leaves :>> ", leaves);
    // const testSchedules = await prisma.doctor.groupBy({
    //   by: ["id"],
    //   where: {
    //     doctorSchedules: {
    //       every: {
    //         day: {
    //           in: ["MONDAY"]
    //         }
    //       }
    //     }
    //   }
    // })

    // const doctorTime = {
    //   decrease: [],
    //   increase: [],
    // };

    // console.log("Schedules", schedules);

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

    resulteSchedules.map((resulteSchedule) => {
      // console.log(
      //   resulteSchedule.Time.startTime.toISOString().split("T")[1].split(".")[0]
      // );
      // console.log(resulteSchedule.Time.endTime);
      resulteSchedule.Time.startTime = resulteSchedule.Time.startTime
        .toISOString()
        .split("T")[1]
        .split(".")[0];
      resulteSchedule.Time.endTime = resulteSchedule.Time.endTime
        .toISOString()
        .split("T")[1]
        .split(".")[0];
    });

    const groupedSchedules = resulteSchedules.reduce((acc, resulteSchedule) => {
      const day = resulteSchedule.day;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(resulteSchedule);
      return acc;
    }, {});

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
