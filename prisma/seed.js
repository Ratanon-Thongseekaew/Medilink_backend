const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const hashedPassword = bcrypt.hashSync("123456", 10);

const doctorData = [
  {
    firstname: "John",
    lastname: "Doe",
    specialtyId: 1,
    hospitalId: 1,
    experience: "10 Years",
    profileImg: "https://example.com/images/john_doe.jpg",
  },
  {
    firstname: "Jane",
    lastname: "Smith",
    specialtyId: 2,
    hospitalId: 2,
    experience: "8 Years",
    profileImg: "https://example.com/images/jane_smith.jpg",
  },
  {
    firstname: "Michael",
    lastname: "Brown",
    specialtyId: 3,
    hospitalId: 1,
    experience: "12 Years",
    profileImg: "https://example.com/images/michael_brown.jpg",
  },
  {
    firstname: "Emily",
    lastname: "Johnson",
    specialtyId: 4,
    hospitalId: 3,
    experience: "5 Years",
    profileImg: "https://example.com/images/emily_johnson.jpg",
  },
  {
    firstname: "David",
    lastname: "Williams",
    specialtyId: 1,
    hospitalId: 2,
    experience: "15 Years",
    profileImg: "https://example.com/images/david_williams.jpg",
  },
  {
    firstname: "Sophia",
    lastname: "Miller",
    specialtyId: 2,
    hospitalId: 3,
    experience: "7 Years",
    profileImg: "https://example.com/images/sophia_miller.jpg",
  },
  {
    firstname: "Daniel",
    lastname: "Taylor",
    specialtyId: 3,
    hospitalId: 1,
    experience: "10 Years",
    profileImg: "https://example.com/images/daniel_taylor.jpg",
  },
  {
    firstname: "Olivia",
    lastname: "Anderson",
    specialtyId: 4,
    hospitalId: 2,
    experience: "9 Years",
    profileImg: "https://example.com/images/olivia_anderson.jpg",
  },
  {
    firstname: "James",
    lastname: "Thomas",
    specialtyId: 1,
    hospitalId: 3,
    experience: "11 Years",
    profileImg: "https://example.com/images/james_thomas.jpg",
  },
  {
    firstname: "Isabella",
    lastname: "Moore",
    specialtyId: 2,
    hospitalId: 1,
    experience: "6 Years",
    profileImg: "https://example.com/images/isabella_moore.jpg",
  },
];

const specialtyData = [
  { specialtyName: "Cardiology" },
  { specialtyName: "Neurology" },
  { specialtyName: "Orthopedics" },
  { specialtyName: "Pediatrics" },
  { specialtyName: "Dermatology" },
  { specialtyName: "Gynecology" },
  { specialtyName: "Ophthalmology" },
  { specialtyName: "Oncology" },
  { specialtyName: "Gastroenterology" },
  { specialtyName: "Endocrinology" },
];

const hospitalData = [
  {
    name: "City Hospital",
    contactInfo: "123-456-7890",
    locationId: 1,
    profileImg: "https://example.com/images/city_hospital.jpg",
  },
  {
    name: "Metro Medical Center",
    contactInfo: "987-654-3210",
    locationId: 2,
    profileImg: "https://example.com/images/metro_medical.jpg",
  },
  {
    name: "Green Valley Clinic",
    contactInfo: "555-666-7777",
    locationId: 3,
    profileImg: "https://example.com/images/green_valley.jpg",
  },
];

const locationData = [
  {
    latitude: 40.7128,
    longitude: -74.006,
    address: "123 Main St, New York, NY",
  },
  {
    latitude: 34.0522,
    longitude: -118.2437,
    address: "456 Elm St, Los Angeles, CA",
  },
  {
    latitude: 41.8781,
    longitude: -87.6298,
    address: "789 Pine St, Chicago, IL",
  },
];

const doctorScheduleData = [
  { day: "MONDAY", doctorId: 1, timeId: 1 },
  { day: "MONDAY", doctorId: 1, timeId: 2 },
  { day: "MONDAY", doctorId: 2, timeId: 3 },
  { day: "MONDAY", doctorId: 2, timeId: 4 },
  { day: "TUESDAY", doctorId: 3, timeId: 1 },
  { day: "TUESDAY", doctorId: 3, timeId: 2 },
  { day: "TUESDAY", doctorId: 4, timeId: 3 },
  { day: "TUESDAY", doctorId: 4, timeId: 4 },
  { day: "WEDNESDAY", doctorId: 5, timeId: 1 },
  { day: "WEDNESDAY", doctorId: 5, timeId: 2 },
  { day: "WEDNESDAY", doctorId: 6, timeId: 3 },
  { day: "WEDNESDAY", doctorId: 6, timeId: 4 },
  { day: "THURSDAY", doctorId: 7, timeId: 1 },
  { day: "THURSDAY", doctorId: 7, timeId: 2 },
  { day: "THURSDAY", doctorId: 8, timeId: 3 },
  { day: "THURSDAY", doctorId: 8, timeId: 4 },
  { day: "FRIDAY", doctorId: 9, timeId: 1 },
  { day: "FRIDAY", doctorId: 9, timeId: 2 },
  { day: "FRIDAY", doctorId: 10, timeId: 3 },
  { day: "FRIDAY", doctorId: 10, timeId: 4 },
  { day: "SATURDAY", doctorId: 1, timeId: 5 },
  { day: "SATURDAY", doctorId: 2, timeId: 6 },
  { day: "SATURDAY", doctorId: 3, timeId: 7 },
  { day: "SATURDAY", doctorId: 4, timeId: 8 },
  { day: "SUNDAY", doctorId: 5, timeId: 5 },
  { day: "SUNDAY", doctorId: 6, timeId: 6 },
  { day: "SUNDAY", doctorId: 7, timeId: 7 },
  { day: "SUNDAY", doctorId: 8, timeId: 8 },
];

const timeData = [
  {
    startTime: new Date("2025-03-13T17:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T18:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T18:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T19:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T19:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T20:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T20:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T21:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T21:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T22:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T22:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T23:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T23:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T00:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T00:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T01:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T01:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T02:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T02:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T03:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T03:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T04:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T04:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T05:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T05:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T06:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T06:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T07:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T07:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T08:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T08:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T09:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T09:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T10:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T10:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T11:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T11:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T12:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T13:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T14:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T14:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T15:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T15:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T16:00:00Z"),
  },
  {
    startTime: new Date("2025-03-13T16:00:00Z"), // เวลา UTC
    endTime: new Date("2025-03-13T17:00:00Z"),
  },
];
console.log("DB seed...");

async function run() {
  await prisma.specialty.createMany({ data: specialtyData });
}

async function run() {
  await prisma.location.createMany({ data: locationData });
}
async function run() {
  await prisma.time.createMany({ data: timeData });
}

async function run() {
  await prisma.hospital.createMany({ data: hospitalData });
}

async function run() {
  await prisma.doctor.createMany({ data: doctorData });
}
async function run() {
  await prisma.doctorSchedule.createMany({ data: doctorScheduleData });
}

run();

// ลำดับการ seed
// 1. location 2. specialty 3. time 4. hospital 5 doctor 6. doctor schedule
// command "npx prisma db seed"
