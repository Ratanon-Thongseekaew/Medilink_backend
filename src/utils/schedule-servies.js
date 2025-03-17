const prisma = require("../configs/prisma");

exports.findIntervalSelectedDate = (selectedDate) => {
  const intervalDay = [];
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const dayIndx = new Date(selectedDate).getDay();

  intervalDay.push(days[dayIndx]);
  for (let i = 1; i < 3; i++) {
    let minusIndx = dayIndx - i;
    let plusIndex = dayIndx + i;
    console.log("minusIndx :>> ", minusIndx);
    console.log("plusIndex :>> ", plusIndex);
    if (minusIndx < 0) {
      minusIndx += 7;
    }
    if (plusIndex > 6) {
      plusIndex -= 7;
    }
    intervalDay.push(days[minusIndx]);
    intervalDay.push(days[plusIndex]);
  }
  // console.log("intervalDay :>> ", intervalDay);
  return intervalDay;
};

exports.findPlusAndMinusTwoDate = (selectedDate) => {
  const newDateObj = new Date(selectedDate);
  console.log("newDateObj :>> ", newDateObj);
  const date = newDateObj.getDate();
  const intervalDate = [];
  intervalDate.push(newDateObj);

  console.log("intervalDate after first push:>> ", intervalDate);

  for (let i = 1; i < 3; i++) {
    let minusDate = new Date(new Date(selectedDate).setDate(date - i));
    let plusDate = new Date(new Date(selectedDate).setDate(date + i));
    console.log("minusIndx :>> ", minusDate);
    console.log("plusIndex :>> ", plusDate);

    intervalDate.push(minusDate);
    intervalDate.push(plusDate);
  }
  console.log("intervalDay :>> ", intervalDate);
  return intervalDate;
};

//   {
//     id: 40,
//     day: 'MONDAY',
//     doctorId: 1,
//     timeId: 8,
//     Time: {
//       id: 8,
//       startTime: 2025-03-13T07:00:00.000Z,
//       endTime: 2025-03-13T08:00:00.000Z
//     }

// overtimes :>>  [
//     {
//       id: 1,
//       date: 2025-03-26T00:00:00.000Z,
//       doctorId: 1,
//       timeId: 10,
//       Time: {
//         id: 10,
//         startTime: 2025-03-13T09:00:00.000Z,
//         endTime: 2025-03-13T10:00:00.000Z
//       }
//     },

// leaves :>>  [
//     {
//       id: 1,
//       date: 2025-03-27T00:00:00.000Z,
//       doctorId: 1,
//       timeId: 1,
//       reason: '',
//       Time: {
//         id: 1,
//         startTime: 2025-03-13T00:00:00.000Z,
//         endTime: 2025-03-13T01:00:00.000Z
//       }
//     },
