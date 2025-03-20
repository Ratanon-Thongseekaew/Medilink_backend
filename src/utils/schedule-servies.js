const prisma = require("../configs/prisma");

exports.findIntervalSelectedDate = (interval, selectedDate) => {
  const newDateObj = new Date(selectedDate);
  const intervalDate = [];
  const dayAndDate = {};
  const date = newDateObj.getDate();

  const daysArray = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const selectedDayIndex = new Date(selectedDate).getDay();

  const day = daysArray[selectedDayIndex];

  const daysObject = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 7,
  };

  // Get ISO number for the selected day.
  const selectedDayNumber = daysObject[day.toUpperCase()];

  // For each candidate day, assign a date based on its “closest occurrence.”
  // The rule we use here is:
  // • If the candidate day is the selected day, date = selectedDate.
  // • If the candidate day’s ISO is less than the selected day’s, it’s in the past → offset = candidateISO - selectedISO.
  // • If it’s greater than the selected day’s:
  //     - In the special case when the selected day is at the beginning of the week (here, selectedISO <= 2)
  //       and the candidate is SATURDAY or SUNDAY (ISO >= 6), we choose its previous occurrence:
  //           offset = candidateISO - selectedISO - 7.
  //     - Otherwise, we choose the upcoming occurrence: offset = candidateISO - selectedISO.

  for (const day of interval) {
    console.log("interval :>> ", interval);
    console.log("day :>> ", day);
    const dayUpper = day.toUpperCase();
    const dayInWeekNumber = daysObject[dayUpper];
    let offset = 0;

    if (dayInWeekNumber === selectedDayNumber) {
      console.log("case1");
      offset = 0;
    } else if (selectedDayNumber <= 2 && dayInWeekNumber >= 4) {
      console.log("case2");
      offset = dayInWeekNumber - selectedDayNumber - 7;
    } else if (selectedDayNumber >= 4 && dayInWeekNumber <= 2) {
      console.log("case3");
      offset = dayInWeekNumber - selectedDayNumber + 7;
    } else if (dayInWeekNumber < selectedDayNumber) {
      console.log("case4");
      // Candidate day comes before the selected day in ISO order → use previous week.
      offset = dayInWeekNumber - selectedDayNumber;
    } else {
      console.log("case5");
      offset = dayInWeekNumber - selectedDayNumber;
    }

    const selectedSpecificDate = new Date(selectedDate).getDate();

    console.log("selectedSpecificDate :>> ", selectedSpecificDate);

    console.log("offset :>> ", offset);

    const offSetDate = new Date(
      new Date(selectedDate).setDate(selectedSpecificDate + offset)
    );

    console.log("offSetDate :>> ", offSetDate);

    intervalDate.push(offSetDate);
    dayAndDate[dayUpper] = offSetDate;
  }

  console.log("intervalDate :>> ", intervalDate);

  console.log("dayAndDate :>> ", dayAndDate);
  // intervalDay.push(days[dayIndx]);

  // for (let i = 1; i < 3; i++) {
  //   let minusIndx = dayIndx - i;
  //   let plusIndex = dayIndx + i;

  //   console.log("minusIndx :>> ", minusIndx);
  //   console.log("plusIndex :>> ", plusIndex);

  //   if (minusIndx < 0) {
  //     minusIndx += 7;
  //   }
  //   if (plusIndex > 6) {
  //     plusIndex -= 7;
  //   }

  //   intervalDay.push(days[minusIndx]);
  //   intervalDay.push(days[plusIndex]);

  //   const minusDay = days[minusIndx];
  //   const plusDay = days[plusIndex];

  //   let minusDate = new Date(new Date(selectedDate).setDate(date - i));
  //   let plusDate = new Date(new Date(selectedDate).setDate(date + i));

  //   console.log("minusIndx :>> ", minusDate);
  //   console.log("plusIndex :>> ", plusDate);

  //   intervalDate.push(minusDate);
  //   intervalDate.push(plusDate);

  //   dayAndDate[minusDay] = minusDate;
  //   dayAndDate[plusDay] = plusDate;
  // }

  // dayAndDate[days[dayIndx]] = new Date(selectedDate);

  // console.log("intervalDay :>> ", intervalDay);
  return { intervalDate, dayAndDate };
};

// exports.findPlusAndMinusTwoDate = (selectedDate) => {
//   const newDateObj = new Date(selectedDate);
//   console.log("newDateObj :>> ", newDateObj);
//   const date = newDateObj.getDate();
//   const intervalDate = [];
//   intervalDate.push(newDateObj);

//   console.log("intervalDate after first push:>> ", intervalDate);

//   for (let i = 1; i < 3; i++) {
//     let minusDate = new Date(new Date(selectedDate).setDate(date - i));
//     let plusDate = new Date(new Date(selectedDate).setDate(date + i));
//     console.log("minusIndx :>> ", minusDate);
//     console.log("plusIndex :>> ", plusDate);

//     intervalDate.push(minusDate);
//     intervalDate.push(plusDate);
//   }
//   console.log("intervalDay :>> ", intervalDate);
//   return intervalDate;
// };

exports.groupAndSortSchedules = (schedules, dayAndDate) => {
  const allSchedule = [];
  const grouped = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0); // ปรับให้เป็นเที่ยงคืน เพื่อลบผลกระทบของเวลา

  const weekDays = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  // grouped = {
  //     "MONDAY" : []
  //     "TUESDAY": []
  // }

  schedules.forEach((schedule) => {
    let groupKey = schedule.day;

    if (schedule.date) {
      const scheduleDate = new Date(schedule.date);
      if (scheduleDate > today) {
        groupKey = weekDays[scheduleDate.getDay()]; // แปลง date เป็นชื่อวัน
      } else {
        return; // ข้ามรายการที่เป็นอดีต
      }
    }

    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
      allSchedule.push({
        day: groupKey,
        date: schedule.date || dayAndDate[groupKey],
      });
    }

    // console.log("schedule :>> ", schedule);

    if (schedule.day) {
      grouped[groupKey].push({
        doctorScheduleId: schedule.id,
        startTime: schedule.Time.startTime,
        endTime: schedule.Time.endTime,
      });
    }
    if (schedule.date) {
      grouped[groupKey].push({
        doctorOvertimeId: schedule.id,
        startTime: schedule.Time.startTime,
        endTime: schedule.Time.endTime,
      });
    }
  });

  // เรียงวันตามลำดับของสัปดาห์
  const weekDaysOrder = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  // console.log("grouped :>> ", grouped);

  const sortedGrouped = Object.keys(grouped)
    .sort((a, b) => weekDaysOrder.indexOf(a) - weekDaysOrder.indexOf(b))
    .reduce((acc, key) => {
      acc[key] = grouped[key].sort((a, b) =>
        a.startTime.localeCompare(b.startTime)
      );
      return acc;
    }, {});

  allSchedule.forEach((el) => {
    const timeBox = sortedGrouped[el.day];
    el.timeBox = timeBox;
  });

  // allSchedule.push()

  allSchedule.sort((a, b) => a.date - b.date);

  return allSchedule;
};
