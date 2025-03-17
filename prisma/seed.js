const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const hashedPassword = bcrypt.hashSync("123456", 10);

const doctorData = [
  {
    firstname: "สมชาย",
    lastname: "พานิช",
    specialtyId: 1,
    hospitalId: 1,
    experience: "10 ปี",
    profileImg: "https://example.com/images/somchai_panich.jpg",
  },
  {
    firstname: "ณัฐชา",
    lastname: "สมิธ",
    specialtyId: 2,
    hospitalId: 2,
    experience: "8 ปี",
    profileImg: "https://example.com/images/natcha_smith.jpg",
  },
  {
    firstname: "ไมเคิล",
    lastname: "พงษ์ประทีป",
    specialtyId: 3,
    hospitalId: 1,
    experience: "12 ปี",
    profileImg: "https://example.com/images/michael_pongprateep.jpg",
  },
  {
    firstname: "เอมิลี",
    lastname: "ศิริวิทย์",
    specialtyId: 4,
    hospitalId: 3,
    experience: "5 ปี",
    profileImg: "https://example.com/images/emily_sirivith.jpg",
  },
  {
    firstname: "เดวิด",
    lastname: "วิลเลียมส์",
    specialtyId: 1,
    hospitalId: 2,
    experience: "15 ปี",
    profileImg: "https://example.com/images/david_williams.jpg",
  },
  {
    firstname: "โซเฟีย",
    lastname: "มิลเลอร์",
    specialtyId: 2,
    hospitalId: 3,
    experience: "7 ปี",
    profileImg: "https://example.com/images/sophia_miller.jpg",
  },
  {
    firstname: "แดเนียล",
    lastname: "เทย์เลอร์",
    specialtyId: 3,
    hospitalId: 1,
    experience: "10 ปี",
    profileImg: "https://example.com/images/daniel_taylor.jpg",
  },
  {
    firstname: "โอลิเวีย",
    lastname: "แอนเดอร์สัน",
    specialtyId: 4,
    hospitalId: 2,
    experience: "9 ปี",
    profileImg: "https://example.com/images/olivia_anderson.jpg",
  },
  {
    firstname: "เจมส์",
    lastname: "ธomas",
    specialtyId: 1,
    hospitalId: 3,
    experience: "11 ปี",
    profileImg: "https://example.com/images/james_thomas.jpg",
  },
  {
    firstname: "อิศรา",
    lastname: "สมคิด",
    specialtyId: 2,
    hospitalId: 1,
    experience: "6 ปี",
    profileImg: "https://example.com/images/itsara_somkid.jpg",
  },
  {
    firstname: "อรรถชัย",
    lastname: "ชัยประทีป",
    specialtyId: 3,
    hospitalId: 2,
    experience: "13 ปี",
    profileImg: "https://example.com/images/attachai_chaiprateep.jpg",
  },
  {
    firstname: "มิเชล",
    lastname: "หิรัญพงษ์",
    specialtyId: 4,
    hospitalId: 5,
    experience: "7 ปี",
    profileImg: "https://example.com/images/michelle_hiranpong.jpg",
  },
  {
    firstname: "ชนินทร์",
    lastname: "ยิ้มมา",
    specialtyId: 2,
    hospitalId: 4,
    experience: "14 ปี",
    profileImg: "https://example.com/images/chanin_yimma.jpg",
  },
  {
    firstname: "นิตยา",
    lastname: "ประสาร",
    specialtyId: 3,
    hospitalId: 5,
    experience: "9 ปี",
    profileImg: "https://example.com/images/nitaya_prasan.jpg",
  },
  {
    firstname: "รวิศ",
    lastname: "ประทีป",
    specialtyId: 1,
    hospitalId: 4,
    experience: "8 ปี",
    profileImg: "https://example.com/images/ravis_prateep.jpg",
  },
  {
    firstname: "ศิวกร",
    lastname: "เลิศภาณุ",
    specialtyId: 4,
    hospitalId: 2,
    experience: "6 ปี",
    profileImg: "https://example.com/images/sivakorn_lertphan.jpg",
  },
  {
    firstname: "ธีรเทพ",
    lastname: "ราชวงศ์",
    specialtyId: 2,
    hospitalId: 1,
    experience: "10 ปี",
    profileImg: "https://example.com/images/teerathap_rachawong.jpg",
  },
  {
    firstname: "อมรรัตน์",
    lastname: "สมภาร",
    specialtyId: 3,
    hospitalId: 2,
    experience: "13 ปี",
    profileImg: "https://example.com/images/amornrat_sompharn.jpg",
  },
  {
    firstname: "ชลธิชา",
    lastname: "มานะ",
    specialtyId: 1,
    hospitalId: 3,
    experience: "9 ปี",
    profileImg: "https://example.com/images/chonthicha_mana.jpg",
  },
  {
    firstname: "ดาริน",
    lastname: "อรุณรุ่ง",
    specialtyId: 4,
    hospitalId: 4,
    experience: "12 ปี",
    profileImg: "https://example.com/images/darin_arunrung.jpg",
  },
  {
    firstname: "อุดม",
    lastname: "กุลยาม",
    specialtyId: 2,
    hospitalId: 3,
    experience: "5 ปี",
    profileImg: "https://example.com/images/udom_kulyam.jpg",
  },
  {
    firstname: "ภูวดล",
    lastname: "โสภา",
    specialtyId: 3,
    hospitalId: 2,
    experience: "8 ปี",
    profileImg: "https://example.com/images/phuwadol_sopha.jpg",
  },
  {
    firstname: "ฐิติรัตน์",
    lastname: "สมบูรณ์",
    specialtyId: 1,
    hospitalId: 5,
    experience: "10 ปี",
    profileImg: "https://example.com/images/thitirat_somboon.jpg",
  },
  {
    firstname: "มุทิตา",
    lastname: "โสภณ",
    specialtyId: 4,
    hospitalId: 1,
    experience: "7 ปี",
    profileImg: "https://example.com/images/mutita_sopon.jpg",
  },
  {
    firstname: "พิมพ์ชนก",
    lastname: "ทองดี",
    specialtyId: 2,
    hospitalId: 4,
    experience: "12 ปี",
    profileImg: "https://example.com/images/pimchanok_thongdee.jpg",
  },
  {
    firstname: "ชนะชัย",
    lastname: "ภูมิภัทร",
    specialtyId: 1,
    hospitalId: 3,
    experience: "9 ปี",
    profileImg: "https://example.com/images/chanachai_phumiphat.jpg",
  },
  {
    firstname: "สิริกร",
    lastname: "บูรณสิทธิ์",
    specialtyId: 3,
    hospitalId: 2,
    experience: "8 ปี",
    profileImg: "https://example.com/images/sirikan_buranasit.jpg",
  },
  {
    firstname: "นวลทิพย์",
    lastname: "แก้วมณี",
    specialtyId: 4,
    hospitalId: 5,
    experience: "13 ปี",
    profileImg: "https://example.com/images/nualthip_kaewmanee.jpg",
  },
  {
    firstname: "วีรชัย",
    lastname: "สุขสม",
    specialtyId: 1,
    hospitalId: 2,
    experience: "11 ปี",
    profileImg: "https://example.com/images/veerachai_suksom.jpg",
  },
  {
    firstname: "ขวัญฤดี",
    lastname: "บำรุง",
    specialtyId: 2,
    hospitalId: 3,
    experience: "10 ปี",
    profileImg: "https://example.com/images/kwanrdee_bamrung.jpg",
  },
  {
    firstname: "ยิ่งยง",
    lastname: "ดวงดี",
    specialtyId: 3,
    hospitalId: 1,
    experience: "9 ปี",
    profileImg: "https://example.com/images/yingyong_duangdee.jpg",
  },
  {
    firstname: "มินตรา",
    lastname: "วิชัย",
    specialtyId: 4,
    hospitalId: 5,
    experience: "6 ปี",
    profileImg: "https://example.com/images/mintra_wichai.jpg",
  },
  {
    firstname: "ธัญญรัตน์",
    lastname: "พึ่งบุญ",
    specialtyId: 2,
    hospitalId: 4,
    experience: "12 ปี",
    profileImg: "https://example.com/images/tanyarat_phungboon.jpg",
  },
  {
    firstname: "พัชรินทร์",
    lastname: "ชัยรัตน์",
    specialtyId: 1,
    hospitalId: 3,
    experience: "7 ปี",
    profileImg: "https://example.com/images/patcharin_chairat.jpg",
  },
  {
    firstname: "ปรัชญา",
    lastname: "ศรีธวัช",
    specialtyId: 3,
    hospitalId: 2,
    experience: "9 ปี",
    profileImg: "https://example.com/images/prachaya_sreethawut.jpg",
  },
];

const specialtyData = [
  { specialtyName: "โรคหัวใจ" },
  { specialtyName: "โรคประสาท" },
  { specialtyName: "ศัลยกรรมกระดูกและข้อ" },
  { specialtyName: "กุมารเวชศาสตร์" },
  { specialtyName: "ผิวหนัง" },
  { specialtyName: "นรีเวชศาสตร์" },
  { specialtyName: "จักษุวิทยา" },
  { specialtyName: "มะเร็งวิทยา" },
  { specialtyName: "ระบบทางเดินอาหาร" },
  { specialtyName: "ต่อมไร้ท่อ" },
];

const hospitalData = [
  {
    name: "โรงพยาบาลกรุงเทพ",
    contactInfo: "02-123-4567",
    locationId: 1,
    profileImg: "https://example.com/images/bangkok_hospital.jpg",
  },
  {
    name: "โรงพยาบาลสมิติเวช สุขุมวิท",
    contactInfo: "02-202-2222",
    locationId: 2,
    profileImg: "https://example.com/images/samitivej_sukhumvit.jpg",
  },
  {
    name: "โรงพยาบาลจุฬาลงกรณ์",
    contactInfo: "02-256-4000",
    locationId: 3,
    profileImg: "https://example.com/images/chulalongkorn_hospital.jpg",
  },
  {
    name: "โรงพยาบาลรามคำแหง",
    contactInfo: "02-310-8000",
    locationId: 4,
    profileImg: "https://example.com/images/ramkhamhaeng_hospital.jpg",
  },
  {
    name: "โรงพยาบาลบำรุงราษฎร์",
    contactInfo: "02-066-8888",
    locationId: 5,
    profileImg: "https://example.com/images/bumrungrad_hospital.jpg",
  },
];

const locationData = [
  {
    latitude: 13.7367,
    longitude: 100.5231,
    address: "ซอย 1 ถนนสุขุมวิท กรุงเทพมหานคร ประเทศไทย",
  },
  {
    latitude: 13.737,
    longitude: 100.5921,
    address: "133 ถนนสุขุมวิท 49 คลองตันเหนือ วัฒนา กรุงเทพมหานคร ประเทศไทย",
  },
  {
    latitude: 13.7372,
    longitude: 100.529,
    address: "1873 ถนนพระราม 4 ปทุมวัน กรุงเทพมหานคร ประเทศไทย",
  },
  {
    latitude: 13.7549,
    longitude: 100.5854,
    address: "ซอย 5 ถนนรามคำแหง สวนหลวง กรุงเทพมหานคร ประเทศไทย",
  },
  {
    latitude: 13.7246,
    longitude: 100.582,
    address: "33 ถนนสุขุมวิท 3 คลองตันเหนือ วัฒนา กรุงเทพมหานคร ประเทศไทย",
  },
];

const doctorScheduleData = [
  {
    day: "WEDNESDAY",
    doctorId: 1,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 1,
    timeId: 2,
  },
  {
    day: "WEDNESDAY",
    doctorId: 1,
    timeId: 3,
  },
  {
    day: "WEDNESDAY",
    doctorId: 1,
    timeId: 4,
  },
  {
    day: "WEDNESDAY",
    doctorId: 1,
    timeId: 5,
  },
  {
    day: "WEDNESDAY",
    doctorId: 1,
    timeId: 6,
  },
  {
    day: "WEDNESDAY",
    doctorId: 1,
    timeId: 7,
  },
  {
    day: "WEDNESDAY",
    doctorId: 1,
    timeId: 8,
  },
  {
    day: "TUESDAY",
    doctorId: 1,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 1,
    timeId: 2,
  },
  {
    day: "TUESDAY",
    doctorId: 1,
    timeId: 3,
  },
  {
    day: "TUESDAY",
    doctorId: 1,
    timeId: 4,
  },
  {
    day: "TUESDAY",
    doctorId: 1,
    timeId: 5,
  },
  {
    day: "TUESDAY",
    doctorId: 1,
    timeId: 6,
  },
  {
    day: "TUESDAY",
    doctorId: 1,
    timeId: 7,
  },
  {
    day: "TUESDAY",
    doctorId: 1,
    timeId: 8,
  },
  {
    day: "FRIDAY",
    doctorId: 1,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 1,
    timeId: 2,
  },
  {
    day: "FRIDAY",
    doctorId: 1,
    timeId: 3,
  },
  {
    day: "FRIDAY",
    doctorId: 1,
    timeId: 4,
  },
  {
    day: "FRIDAY",
    doctorId: 1,
    timeId: 5,
  },
  {
    day: "FRIDAY",
    doctorId: 1,
    timeId: 6,
  },
  {
    day: "FRIDAY",
    doctorId: 1,
    timeId: 7,
  },
  {
    day: "FRIDAY",
    doctorId: 1,
    timeId: 8,
  },
  {
    day: "THURSDAY",
    doctorId: 1,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 1,
    timeId: 2,
  },
  {
    day: "THURSDAY",
    doctorId: 1,
    timeId: 3,
  },
  {
    day: "THURSDAY",
    doctorId: 1,
    timeId: 4,
  },
  {
    day: "THURSDAY",
    doctorId: 1,
    timeId: 5,
  },
  {
    day: "THURSDAY",
    doctorId: 1,
    timeId: 6,
  },
  {
    day: "THURSDAY",
    doctorId: 1,
    timeId: 7,
  },
  {
    day: "THURSDAY",
    doctorId: 1,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 1,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 1,
    timeId: 2,
  },
  {
    day: "MONDAY",
    doctorId: 1,
    timeId: 3,
  },
  {
    day: "MONDAY",
    doctorId: 1,
    timeId: 4,
  },
  {
    day: "MONDAY",
    doctorId: 1,
    timeId: 5,
  },
  {
    day: "MONDAY",
    doctorId: 1,
    timeId: 6,
  },
  {
    day: "MONDAY",
    doctorId: 1,
    timeId: 7,
  },
  {
    day: "MONDAY",
    doctorId: 1,
    timeId: 8,
  },
  {
    day: "WEDNESDAY",
    doctorId: 2,
    timeId: 9,
  },
  {
    day: "WEDNESDAY",
    doctorId: 2,
    timeId: 10,
  },
  {
    day: "WEDNESDAY",
    doctorId: 2,
    timeId: 11,
  },
  {
    day: "WEDNESDAY",
    doctorId: 2,
    timeId: 12,
  },
  {
    day: "WEDNESDAY",
    doctorId: 2,
    timeId: 13,
  },
  {
    day: "WEDNESDAY",
    doctorId: 2,
    timeId: 14,
  },
  {
    day: "WEDNESDAY",
    doctorId: 2,
    timeId: 15,
  },
  {
    day: "WEDNESDAY",
    doctorId: 2,
    timeId: 16,
  },
  {
    day: "TUESDAY",
    doctorId: 2,
    timeId: 9,
  },
  {
    day: "TUESDAY",
    doctorId: 2,
    timeId: 10,
  },
  {
    day: "TUESDAY",
    doctorId: 2,
    timeId: 11,
  },
  {
    day: "TUESDAY",
    doctorId: 2,
    timeId: 12,
  },
  {
    day: "TUESDAY",
    doctorId: 2,
    timeId: 13,
  },
  {
    day: "TUESDAY",
    doctorId: 2,
    timeId: 14,
  },
  {
    day: "TUESDAY",
    doctorId: 2,
    timeId: 15,
  },
  {
    day: "TUESDAY",
    doctorId: 2,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 2,
    timeId: 9,
  },
  {
    day: "THURSDAY",
    doctorId: 2,
    timeId: 10,
  },
  {
    day: "THURSDAY",
    doctorId: 2,
    timeId: 11,
  },
  {
    day: "THURSDAY",
    doctorId: 2,
    timeId: 12,
  },
  {
    day: "THURSDAY",
    doctorId: 2,
    timeId: 13,
  },
  {
    day: "THURSDAY",
    doctorId: 2,
    timeId: 14,
  },
  {
    day: "THURSDAY",
    doctorId: 2,
    timeId: 15,
  },
  {
    day: "THURSDAY",
    doctorId: 2,
    timeId: 16,
  },
  {
    day: "FRIDAY",
    doctorId: 2,
    timeId: 9,
  },
  {
    day: "FRIDAY",
    doctorId: 2,
    timeId: 10,
  },
  {
    day: "FRIDAY",
    doctorId: 2,
    timeId: 11,
  },
  {
    day: "FRIDAY",
    doctorId: 2,
    timeId: 12,
  },
  {
    day: "FRIDAY",
    doctorId: 2,
    timeId: 13,
  },
  {
    day: "FRIDAY",
    doctorId: 2,
    timeId: 14,
  },
  {
    day: "FRIDAY",
    doctorId: 2,
    timeId: 15,
  },
  {
    day: "FRIDAY",
    doctorId: 2,
    timeId: 16,
  },
  {
    day: "MONDAY",
    doctorId: 2,
    timeId: 9,
  },
  {
    day: "MONDAY",
    doctorId: 2,
    timeId: 10,
  },
  {
    day: "MONDAY",
    doctorId: 2,
    timeId: 11,
  },
  {
    day: "MONDAY",
    doctorId: 2,
    timeId: 12,
  },
  {
    day: "MONDAY",
    doctorId: 2,
    timeId: 13,
  },
  {
    day: "MONDAY",
    doctorId: 2,
    timeId: 14,
  },
  {
    day: "MONDAY",
    doctorId: 2,
    timeId: 15,
  },
  {
    day: "MONDAY",
    doctorId: 2,
    timeId: 16,
  },
  {
    day: "WEDNESDAY",
    doctorId: 3,
    timeId: 17,
  },
  {
    day: "WEDNESDAY",
    doctorId: 3,
    timeId: 18,
  },
  {
    day: "WEDNESDAY",
    doctorId: 3,
    timeId: 19,
  },
  {
    day: "WEDNESDAY",
    doctorId: 3,
    timeId: 20,
  },
  {
    day: "WEDNESDAY",
    doctorId: 3,
    timeId: 21,
  },
  {
    day: "WEDNESDAY",
    doctorId: 3,
    timeId: 22,
  },
  {
    day: "WEDNESDAY",
    doctorId: 3,
    timeId: 23,
  },
  {
    day: "WEDNESDAY",
    doctorId: 3,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 3,
    timeId: 17,
  },
  {
    day: "TUESDAY",
    doctorId: 3,
    timeId: 18,
  },
  {
    day: "TUESDAY",
    doctorId: 3,
    timeId: 19,
  },
  {
    day: "TUESDAY",
    doctorId: 3,
    timeId: 20,
  },
  {
    day: "TUESDAY",
    doctorId: 3,
    timeId: 21,
  },
  {
    day: "TUESDAY",
    doctorId: 3,
    timeId: 22,
  },
  {
    day: "TUESDAY",
    doctorId: 3,
    timeId: 23,
  },
  {
    day: "TUESDAY",
    doctorId: 3,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 3,
    timeId: 17,
  },
  {
    day: "FRIDAY",
    doctorId: 3,
    timeId: 18,
  },
  {
    day: "FRIDAY",
    doctorId: 3,
    timeId: 19,
  },
  {
    day: "FRIDAY",
    doctorId: 3,
    timeId: 20,
  },
  {
    day: "FRIDAY",
    doctorId: 3,
    timeId: 21,
  },
  {
    day: "FRIDAY",
    doctorId: 3,
    timeId: 22,
  },
  {
    day: "FRIDAY",
    doctorId: 3,
    timeId: 23,
  },
  {
    day: "FRIDAY",
    doctorId: 3,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 3,
    timeId: 17,
  },
  {
    day: "MONDAY",
    doctorId: 3,
    timeId: 18,
  },
  {
    day: "MONDAY",
    doctorId: 3,
    timeId: 19,
  },
  {
    day: "MONDAY",
    doctorId: 3,
    timeId: 20,
  },
  {
    day: "MONDAY",
    doctorId: 3,
    timeId: 21,
  },
  {
    day: "MONDAY",
    doctorId: 3,
    timeId: 22,
  },
  {
    day: "MONDAY",
    doctorId: 3,
    timeId: 23,
  },
  {
    day: "MONDAY",
    doctorId: 3,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 3,
    timeId: 17,
  },
  {
    day: "THURSDAY",
    doctorId: 3,
    timeId: 18,
  },
  {
    day: "THURSDAY",
    doctorId: 3,
    timeId: 19,
  },
  {
    day: "THURSDAY",
    doctorId: 3,
    timeId: 20,
  },
  {
    day: "THURSDAY",
    doctorId: 3,
    timeId: 21,
  },
  {
    day: "THURSDAY",
    doctorId: 3,
    timeId: 22,
  },
  {
    day: "THURSDAY",
    doctorId: 3,
    timeId: 23,
  },
  {
    day: "THURSDAY",
    doctorId: 3,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 4,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 4,
    timeId: 2,
  },
  {
    day: "FRIDAY",
    doctorId: 4,
    timeId: 3,
  },
  {
    day: "FRIDAY",
    doctorId: 4,
    timeId: 4,
  },
  {
    day: "FRIDAY",
    doctorId: 4,
    timeId: 5,
  },
  {
    day: "FRIDAY",
    doctorId: 4,
    timeId: 6,
  },
  {
    day: "FRIDAY",
    doctorId: 4,
    timeId: 7,
  },
  {
    day: "FRIDAY",
    doctorId: 4,
    timeId: 8,
  },
  {
    day: "WEDNESDAY",
    doctorId: 4,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 4,
    timeId: 2,
  },
  {
    day: "WEDNESDAY",
    doctorId: 4,
    timeId: 3,
  },
  {
    day: "WEDNESDAY",
    doctorId: 4,
    timeId: 4,
  },
  {
    day: "WEDNESDAY",
    doctorId: 4,
    timeId: 5,
  },
  {
    day: "WEDNESDAY",
    doctorId: 4,
    timeId: 6,
  },
  {
    day: "WEDNESDAY",
    doctorId: 4,
    timeId: 7,
  },
  {
    day: "WEDNESDAY",
    doctorId: 4,
    timeId: 8,
  },
  {
    day: "TUESDAY",
    doctorId: 4,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 4,
    timeId: 2,
  },
  {
    day: "TUESDAY",
    doctorId: 4,
    timeId: 3,
  },
  {
    day: "TUESDAY",
    doctorId: 4,
    timeId: 4,
  },
  {
    day: "TUESDAY",
    doctorId: 4,
    timeId: 5,
  },
  {
    day: "TUESDAY",
    doctorId: 4,
    timeId: 6,
  },
  {
    day: "TUESDAY",
    doctorId: 4,
    timeId: 7,
  },
  {
    day: "TUESDAY",
    doctorId: 4,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 4,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 4,
    timeId: 2,
  },
  {
    day: "MONDAY",
    doctorId: 4,
    timeId: 3,
  },
  {
    day: "MONDAY",
    doctorId: 4,
    timeId: 4,
  },
  {
    day: "MONDAY",
    doctorId: 4,
    timeId: 5,
  },
  {
    day: "MONDAY",
    doctorId: 4,
    timeId: 6,
  },
  {
    day: "MONDAY",
    doctorId: 4,
    timeId: 7,
  },
  {
    day: "MONDAY",
    doctorId: 4,
    timeId: 8,
  },
  {
    day: "THURSDAY",
    doctorId: 4,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 4,
    timeId: 2,
  },
  {
    day: "THURSDAY",
    doctorId: 4,
    timeId: 3,
  },
  {
    day: "THURSDAY",
    doctorId: 4,
    timeId: 4,
  },
  {
    day: "THURSDAY",
    doctorId: 4,
    timeId: 5,
  },
  {
    day: "THURSDAY",
    doctorId: 4,
    timeId: 6,
  },
  {
    day: "THURSDAY",
    doctorId: 4,
    timeId: 7,
  },
  {
    day: "THURSDAY",
    doctorId: 4,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 5,
    timeId: 9,
  },
  {
    day: "MONDAY",
    doctorId: 5,
    timeId: 10,
  },
  {
    day: "MONDAY",
    doctorId: 5,
    timeId: 11,
  },
  {
    day: "MONDAY",
    doctorId: 5,
    timeId: 12,
  },
  {
    day: "MONDAY",
    doctorId: 5,
    timeId: 13,
  },
  {
    day: "MONDAY",
    doctorId: 5,
    timeId: 14,
  },
  {
    day: "MONDAY",
    doctorId: 5,
    timeId: 15,
  },
  {
    day: "MONDAY",
    doctorId: 5,
    timeId: 16,
  },
  {
    day: "TUESDAY",
    doctorId: 5,
    timeId: 9,
  },
  {
    day: "TUESDAY",
    doctorId: 5,
    timeId: 10,
  },
  {
    day: "TUESDAY",
    doctorId: 5,
    timeId: 11,
  },
  {
    day: "TUESDAY",
    doctorId: 5,
    timeId: 12,
  },
  {
    day: "TUESDAY",
    doctorId: 5,
    timeId: 13,
  },
  {
    day: "TUESDAY",
    doctorId: 5,
    timeId: 14,
  },
  {
    day: "TUESDAY",
    doctorId: 5,
    timeId: 15,
  },
  {
    day: "TUESDAY",
    doctorId: 5,
    timeId: 16,
  },
  {
    day: "WEDNESDAY",
    doctorId: 5,
    timeId: 9,
  },
  {
    day: "WEDNESDAY",
    doctorId: 5,
    timeId: 10,
  },
  {
    day: "WEDNESDAY",
    doctorId: 5,
    timeId: 11,
  },
  {
    day: "WEDNESDAY",
    doctorId: 5,
    timeId: 12,
  },
  {
    day: "WEDNESDAY",
    doctorId: 5,
    timeId: 13,
  },
  {
    day: "WEDNESDAY",
    doctorId: 5,
    timeId: 14,
  },
  {
    day: "WEDNESDAY",
    doctorId: 5,
    timeId: 15,
  },
  {
    day: "WEDNESDAY",
    doctorId: 5,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 5,
    timeId: 9,
  },
  {
    day: "THURSDAY",
    doctorId: 5,
    timeId: 10,
  },
  {
    day: "THURSDAY",
    doctorId: 5,
    timeId: 11,
  },
  {
    day: "THURSDAY",
    doctorId: 5,
    timeId: 12,
  },
  {
    day: "THURSDAY",
    doctorId: 5,
    timeId: 13,
  },
  {
    day: "THURSDAY",
    doctorId: 5,
    timeId: 14,
  },
  {
    day: "THURSDAY",
    doctorId: 5,
    timeId: 15,
  },
  {
    day: "THURSDAY",
    doctorId: 5,
    timeId: 16,
  },
  {
    day: "FRIDAY",
    doctorId: 5,
    timeId: 9,
  },
  {
    day: "FRIDAY",
    doctorId: 5,
    timeId: 10,
  },
  {
    day: "FRIDAY",
    doctorId: 5,
    timeId: 11,
  },
  {
    day: "FRIDAY",
    doctorId: 5,
    timeId: 12,
  },
  {
    day: "FRIDAY",
    doctorId: 5,
    timeId: 13,
  },
  {
    day: "FRIDAY",
    doctorId: 5,
    timeId: 14,
  },
  {
    day: "FRIDAY",
    doctorId: 5,
    timeId: 15,
  },
  {
    day: "FRIDAY",
    doctorId: 5,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 6,
    timeId: 17,
  },
  {
    day: "THURSDAY",
    doctorId: 6,
    timeId: 18,
  },
  {
    day: "THURSDAY",
    doctorId: 6,
    timeId: 19,
  },
  {
    day: "THURSDAY",
    doctorId: 6,
    timeId: 20,
  },
  {
    day: "THURSDAY",
    doctorId: 6,
    timeId: 21,
  },
  {
    day: "THURSDAY",
    doctorId: 6,
    timeId: 22,
  },
  {
    day: "THURSDAY",
    doctorId: 6,
    timeId: 23,
  },
  {
    day: "THURSDAY",
    doctorId: 6,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 6,
    timeId: 17,
  },
  {
    day: "FRIDAY",
    doctorId: 6,
    timeId: 18,
  },
  {
    day: "FRIDAY",
    doctorId: 6,
    timeId: 19,
  },
  {
    day: "FRIDAY",
    doctorId: 6,
    timeId: 20,
  },
  {
    day: "FRIDAY",
    doctorId: 6,
    timeId: 21,
  },
  {
    day: "FRIDAY",
    doctorId: 6,
    timeId: 22,
  },
  {
    day: "FRIDAY",
    doctorId: 6,
    timeId: 23,
  },
  {
    day: "FRIDAY",
    doctorId: 6,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 6,
    timeId: 17,
  },
  {
    day: "WEDNESDAY",
    doctorId: 6,
    timeId: 18,
  },
  {
    day: "WEDNESDAY",
    doctorId: 6,
    timeId: 19,
  },
  {
    day: "WEDNESDAY",
    doctorId: 6,
    timeId: 20,
  },
  {
    day: "WEDNESDAY",
    doctorId: 6,
    timeId: 21,
  },
  {
    day: "WEDNESDAY",
    doctorId: 6,
    timeId: 22,
  },
  {
    day: "WEDNESDAY",
    doctorId: 6,
    timeId: 23,
  },
  {
    day: "WEDNESDAY",
    doctorId: 6,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 6,
    timeId: 17,
  },
  {
    day: "TUESDAY",
    doctorId: 6,
    timeId: 18,
  },
  {
    day: "TUESDAY",
    doctorId: 6,
    timeId: 19,
  },
  {
    day: "TUESDAY",
    doctorId: 6,
    timeId: 20,
  },
  {
    day: "TUESDAY",
    doctorId: 6,
    timeId: 21,
  },
  {
    day: "TUESDAY",
    doctorId: 6,
    timeId: 22,
  },
  {
    day: "TUESDAY",
    doctorId: 6,
    timeId: 23,
  },
  {
    day: "TUESDAY",
    doctorId: 6,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 6,
    timeId: 17,
  },
  {
    day: "MONDAY",
    doctorId: 6,
    timeId: 18,
  },
  {
    day: "MONDAY",
    doctorId: 6,
    timeId: 19,
  },
  {
    day: "MONDAY",
    doctorId: 6,
    timeId: 20,
  },
  {
    day: "MONDAY",
    doctorId: 6,
    timeId: 21,
  },
  {
    day: "MONDAY",
    doctorId: 6,
    timeId: 22,
  },
  {
    day: "MONDAY",
    doctorId: 6,
    timeId: 23,
  },
  {
    day: "MONDAY",
    doctorId: 6,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 7,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 7,
    timeId: 2,
  },
  {
    day: "THURSDAY",
    doctorId: 7,
    timeId: 3,
  },
  {
    day: "THURSDAY",
    doctorId: 7,
    timeId: 4,
  },
  {
    day: "THURSDAY",
    doctorId: 7,
    timeId: 5,
  },
  {
    day: "THURSDAY",
    doctorId: 7,
    timeId: 6,
  },
  {
    day: "THURSDAY",
    doctorId: 7,
    timeId: 7,
  },
  {
    day: "THURSDAY",
    doctorId: 7,
    timeId: 8,
  },
  {
    day: "WEDNESDAY",
    doctorId: 7,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 7,
    timeId: 2,
  },
  {
    day: "WEDNESDAY",
    doctorId: 7,
    timeId: 3,
  },
  {
    day: "WEDNESDAY",
    doctorId: 7,
    timeId: 4,
  },
  {
    day: "WEDNESDAY",
    doctorId: 7,
    timeId: 5,
  },
  {
    day: "WEDNESDAY",
    doctorId: 7,
    timeId: 6,
  },
  {
    day: "WEDNESDAY",
    doctorId: 7,
    timeId: 7,
  },
  {
    day: "WEDNESDAY",
    doctorId: 7,
    timeId: 8,
  },
  {
    day: "FRIDAY",
    doctorId: 7,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 7,
    timeId: 2,
  },
  {
    day: "FRIDAY",
    doctorId: 7,
    timeId: 3,
  },
  {
    day: "FRIDAY",
    doctorId: 7,
    timeId: 4,
  },
  {
    day: "FRIDAY",
    doctorId: 7,
    timeId: 5,
  },
  {
    day: "FRIDAY",
    doctorId: 7,
    timeId: 6,
  },
  {
    day: "FRIDAY",
    doctorId: 7,
    timeId: 7,
  },
  {
    day: "FRIDAY",
    doctorId: 7,
    timeId: 8,
  },
  {
    day: "TUESDAY",
    doctorId: 7,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 7,
    timeId: 2,
  },
  {
    day: "TUESDAY",
    doctorId: 7,
    timeId: 3,
  },
  {
    day: "TUESDAY",
    doctorId: 7,
    timeId: 4,
  },
  {
    day: "TUESDAY",
    doctorId: 7,
    timeId: 5,
  },
  {
    day: "TUESDAY",
    doctorId: 7,
    timeId: 6,
  },
  {
    day: "TUESDAY",
    doctorId: 7,
    timeId: 7,
  },
  {
    day: "TUESDAY",
    doctorId: 7,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 7,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 7,
    timeId: 2,
  },
  {
    day: "MONDAY",
    doctorId: 7,
    timeId: 3,
  },
  {
    day: "MONDAY",
    doctorId: 7,
    timeId: 4,
  },
  {
    day: "MONDAY",
    doctorId: 7,
    timeId: 5,
  },
  {
    day: "MONDAY",
    doctorId: 7,
    timeId: 6,
  },
  {
    day: "MONDAY",
    doctorId: 7,
    timeId: 7,
  },
  {
    day: "MONDAY",
    doctorId: 7,
    timeId: 8,
  },
  {
    day: "FRIDAY",
    doctorId: 8,
    timeId: 9,
  },
  {
    day: "FRIDAY",
    doctorId: 8,
    timeId: 10,
  },
  {
    day: "FRIDAY",
    doctorId: 8,
    timeId: 11,
  },
  {
    day: "FRIDAY",
    doctorId: 8,
    timeId: 12,
  },
  {
    day: "FRIDAY",
    doctorId: 8,
    timeId: 13,
  },
  {
    day: "FRIDAY",
    doctorId: 8,
    timeId: 14,
  },
  {
    day: "FRIDAY",
    doctorId: 8,
    timeId: 15,
  },
  {
    day: "FRIDAY",
    doctorId: 8,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 8,
    timeId: 9,
  },
  {
    day: "THURSDAY",
    doctorId: 8,
    timeId: 10,
  },
  {
    day: "THURSDAY",
    doctorId: 8,
    timeId: 11,
  },
  {
    day: "THURSDAY",
    doctorId: 8,
    timeId: 12,
  },
  {
    day: "THURSDAY",
    doctorId: 8,
    timeId: 13,
  },
  {
    day: "THURSDAY",
    doctorId: 8,
    timeId: 14,
  },
  {
    day: "THURSDAY",
    doctorId: 8,
    timeId: 15,
  },
  {
    day: "THURSDAY",
    doctorId: 8,
    timeId: 16,
  },
  {
    day: "WEDNESDAY",
    doctorId: 8,
    timeId: 9,
  },
  {
    day: "WEDNESDAY",
    doctorId: 8,
    timeId: 10,
  },
  {
    day: "WEDNESDAY",
    doctorId: 8,
    timeId: 11,
  },
  {
    day: "WEDNESDAY",
    doctorId: 8,
    timeId: 12,
  },
  {
    day: "WEDNESDAY",
    doctorId: 8,
    timeId: 13,
  },
  {
    day: "WEDNESDAY",
    doctorId: 8,
    timeId: 14,
  },
  {
    day: "WEDNESDAY",
    doctorId: 8,
    timeId: 15,
  },
  {
    day: "WEDNESDAY",
    doctorId: 8,
    timeId: 16,
  },
  {
    day: "TUESDAY",
    doctorId: 8,
    timeId: 9,
  },
  {
    day: "TUESDAY",
    doctorId: 8,
    timeId: 10,
  },
  {
    day: "TUESDAY",
    doctorId: 8,
    timeId: 11,
  },
  {
    day: "TUESDAY",
    doctorId: 8,
    timeId: 12,
  },
  {
    day: "TUESDAY",
    doctorId: 8,
    timeId: 13,
  },
  {
    day: "TUESDAY",
    doctorId: 8,
    timeId: 14,
  },
  {
    day: "TUESDAY",
    doctorId: 8,
    timeId: 15,
  },
  {
    day: "TUESDAY",
    doctorId: 8,
    timeId: 16,
  },
  {
    day: "MONDAY",
    doctorId: 8,
    timeId: 9,
  },
  {
    day: "MONDAY",
    doctorId: 8,
    timeId: 10,
  },
  {
    day: "MONDAY",
    doctorId: 8,
    timeId: 11,
  },
  {
    day: "MONDAY",
    doctorId: 8,
    timeId: 12,
  },
  {
    day: "MONDAY",
    doctorId: 8,
    timeId: 13,
  },
  {
    day: "MONDAY",
    doctorId: 8,
    timeId: 14,
  },
  {
    day: "MONDAY",
    doctorId: 8,
    timeId: 15,
  },
  {
    day: "MONDAY",
    doctorId: 8,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 9,
    timeId: 17,
  },
  {
    day: "THURSDAY",
    doctorId: 9,
    timeId: 18,
  },
  {
    day: "THURSDAY",
    doctorId: 9,
    timeId: 19,
  },
  {
    day: "THURSDAY",
    doctorId: 9,
    timeId: 20,
  },
  {
    day: "THURSDAY",
    doctorId: 9,
    timeId: 21,
  },
  {
    day: "THURSDAY",
    doctorId: 9,
    timeId: 22,
  },
  {
    day: "THURSDAY",
    doctorId: 9,
    timeId: 23,
  },
  {
    day: "THURSDAY",
    doctorId: 9,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 9,
    timeId: 17,
  },
  {
    day: "FRIDAY",
    doctorId: 9,
    timeId: 18,
  },
  {
    day: "FRIDAY",
    doctorId: 9,
    timeId: 19,
  },
  {
    day: "FRIDAY",
    doctorId: 9,
    timeId: 20,
  },
  {
    day: "FRIDAY",
    doctorId: 9,
    timeId: 21,
  },
  {
    day: "FRIDAY",
    doctorId: 9,
    timeId: 22,
  },
  {
    day: "FRIDAY",
    doctorId: 9,
    timeId: 23,
  },
  {
    day: "FRIDAY",
    doctorId: 9,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 9,
    timeId: 17,
  },
  {
    day: "WEDNESDAY",
    doctorId: 9,
    timeId: 18,
  },
  {
    day: "WEDNESDAY",
    doctorId: 9,
    timeId: 19,
  },
  {
    day: "WEDNESDAY",
    doctorId: 9,
    timeId: 20,
  },
  {
    day: "WEDNESDAY",
    doctorId: 9,
    timeId: 21,
  },
  {
    day: "WEDNESDAY",
    doctorId: 9,
    timeId: 22,
  },
  {
    day: "WEDNESDAY",
    doctorId: 9,
    timeId: 23,
  },
  {
    day: "WEDNESDAY",
    doctorId: 9,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 9,
    timeId: 17,
  },
  {
    day: "TUESDAY",
    doctorId: 9,
    timeId: 18,
  },
  {
    day: "TUESDAY",
    doctorId: 9,
    timeId: 19,
  },
  {
    day: "TUESDAY",
    doctorId: 9,
    timeId: 20,
  },
  {
    day: "TUESDAY",
    doctorId: 9,
    timeId: 21,
  },
  {
    day: "TUESDAY",
    doctorId: 9,
    timeId: 22,
  },
  {
    day: "TUESDAY",
    doctorId: 9,
    timeId: 23,
  },
  {
    day: "TUESDAY",
    doctorId: 9,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 9,
    timeId: 17,
  },
  {
    day: "MONDAY",
    doctorId: 9,
    timeId: 18,
  },
  {
    day: "MONDAY",
    doctorId: 9,
    timeId: 19,
  },
  {
    day: "MONDAY",
    doctorId: 9,
    timeId: 20,
  },
  {
    day: "MONDAY",
    doctorId: 9,
    timeId: 21,
  },
  {
    day: "MONDAY",
    doctorId: 9,
    timeId: 22,
  },
  {
    day: "MONDAY",
    doctorId: 9,
    timeId: 23,
  },
  {
    day: "MONDAY",
    doctorId: 9,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 10,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 10,
    timeId: 2,
  },
  {
    day: "FRIDAY",
    doctorId: 10,
    timeId: 3,
  },
  {
    day: "FRIDAY",
    doctorId: 10,
    timeId: 4,
  },
  {
    day: "FRIDAY",
    doctorId: 10,
    timeId: 5,
  },
  {
    day: "FRIDAY",
    doctorId: 10,
    timeId: 6,
  },
  {
    day: "FRIDAY",
    doctorId: 10,
    timeId: 7,
  },
  {
    day: "FRIDAY",
    doctorId: 10,
    timeId: 8,
  },
  {
    day: "THURSDAY",
    doctorId: 10,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 10,
    timeId: 2,
  },
  {
    day: "THURSDAY",
    doctorId: 10,
    timeId: 3,
  },
  {
    day: "THURSDAY",
    doctorId: 10,
    timeId: 4,
  },
  {
    day: "THURSDAY",
    doctorId: 10,
    timeId: 5,
  },
  {
    day: "THURSDAY",
    doctorId: 10,
    timeId: 6,
  },
  {
    day: "THURSDAY",
    doctorId: 10,
    timeId: 7,
  },
  {
    day: "THURSDAY",
    doctorId: 10,
    timeId: 8,
  },
  {
    day: "WEDNESDAY",
    doctorId: 10,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 10,
    timeId: 2,
  },
  {
    day: "WEDNESDAY",
    doctorId: 10,
    timeId: 3,
  },
  {
    day: "WEDNESDAY",
    doctorId: 10,
    timeId: 4,
  },
  {
    day: "WEDNESDAY",
    doctorId: 10,
    timeId: 5,
  },
  {
    day: "WEDNESDAY",
    doctorId: 10,
    timeId: 6,
  },
  {
    day: "WEDNESDAY",
    doctorId: 10,
    timeId: 7,
  },
  {
    day: "WEDNESDAY",
    doctorId: 10,
    timeId: 8,
  },
  {
    day: "TUESDAY",
    doctorId: 10,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 10,
    timeId: 2,
  },
  {
    day: "TUESDAY",
    doctorId: 10,
    timeId: 3,
  },
  {
    day: "TUESDAY",
    doctorId: 10,
    timeId: 4,
  },
  {
    day: "TUESDAY",
    doctorId: 10,
    timeId: 5,
  },
  {
    day: "TUESDAY",
    doctorId: 10,
    timeId: 6,
  },
  {
    day: "TUESDAY",
    doctorId: 10,
    timeId: 7,
  },
  {
    day: "TUESDAY",
    doctorId: 10,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 10,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 10,
    timeId: 2,
  },
  {
    day: "MONDAY",
    doctorId: 10,
    timeId: 3,
  },
  {
    day: "MONDAY",
    doctorId: 10,
    timeId: 4,
  },
  {
    day: "MONDAY",
    doctorId: 10,
    timeId: 5,
  },
  {
    day: "MONDAY",
    doctorId: 10,
    timeId: 6,
  },
  {
    day: "MONDAY",
    doctorId: 10,
    timeId: 7,
  },
  {
    day: "MONDAY",
    doctorId: 10,
    timeId: 8,
  },
  {
    day: "THURSDAY",
    doctorId: 11,
    timeId: 9,
  },
  {
    day: "THURSDAY",
    doctorId: 11,
    timeId: 10,
  },
  {
    day: "THURSDAY",
    doctorId: 11,
    timeId: 11,
  },
  {
    day: "THURSDAY",
    doctorId: 11,
    timeId: 12,
  },
  {
    day: "THURSDAY",
    doctorId: 11,
    timeId: 13,
  },
  {
    day: "THURSDAY",
    doctorId: 11,
    timeId: 14,
  },
  {
    day: "THURSDAY",
    doctorId: 11,
    timeId: 15,
  },
  {
    day: "THURSDAY",
    doctorId: 11,
    timeId: 16,
  },
  {
    day: "MONDAY",
    doctorId: 11,
    timeId: 9,
  },
  {
    day: "MONDAY",
    doctorId: 11,
    timeId: 10,
  },
  {
    day: "MONDAY",
    doctorId: 11,
    timeId: 11,
  },
  {
    day: "MONDAY",
    doctorId: 11,
    timeId: 12,
  },
  {
    day: "MONDAY",
    doctorId: 11,
    timeId: 13,
  },
  {
    day: "MONDAY",
    doctorId: 11,
    timeId: 14,
  },
  {
    day: "MONDAY",
    doctorId: 11,
    timeId: 15,
  },
  {
    day: "MONDAY",
    doctorId: 11,
    timeId: 16,
  },
  {
    day: "WEDNESDAY",
    doctorId: 11,
    timeId: 9,
  },
  {
    day: "WEDNESDAY",
    doctorId: 11,
    timeId: 10,
  },
  {
    day: "WEDNESDAY",
    doctorId: 11,
    timeId: 11,
  },
  {
    day: "WEDNESDAY",
    doctorId: 11,
    timeId: 12,
  },
  {
    day: "WEDNESDAY",
    doctorId: 11,
    timeId: 13,
  },
  {
    day: "WEDNESDAY",
    doctorId: 11,
    timeId: 14,
  },
  {
    day: "WEDNESDAY",
    doctorId: 11,
    timeId: 15,
  },
  {
    day: "WEDNESDAY",
    doctorId: 11,
    timeId: 16,
  },
  {
    day: "FRIDAY",
    doctorId: 11,
    timeId: 9,
  },
  {
    day: "FRIDAY",
    doctorId: 11,
    timeId: 10,
  },
  {
    day: "FRIDAY",
    doctorId: 11,
    timeId: 11,
  },
  {
    day: "FRIDAY",
    doctorId: 11,
    timeId: 12,
  },
  {
    day: "FRIDAY",
    doctorId: 11,
    timeId: 13,
  },
  {
    day: "FRIDAY",
    doctorId: 11,
    timeId: 14,
  },
  {
    day: "FRIDAY",
    doctorId: 11,
    timeId: 15,
  },
  {
    day: "FRIDAY",
    doctorId: 11,
    timeId: 16,
  },
  {
    day: "TUESDAY",
    doctorId: 11,
    timeId: 9,
  },
  {
    day: "TUESDAY",
    doctorId: 11,
    timeId: 10,
  },
  {
    day: "TUESDAY",
    doctorId: 11,
    timeId: 11,
  },
  {
    day: "TUESDAY",
    doctorId: 11,
    timeId: 12,
  },
  {
    day: "TUESDAY",
    doctorId: 11,
    timeId: 13,
  },
  {
    day: "TUESDAY",
    doctorId: 11,
    timeId: 14,
  },
  {
    day: "TUESDAY",
    doctorId: 11,
    timeId: 15,
  },
  {
    day: "TUESDAY",
    doctorId: 11,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 12,
    timeId: 17,
  },
  {
    day: "THURSDAY",
    doctorId: 12,
    timeId: 18,
  },
  {
    day: "THURSDAY",
    doctorId: 12,
    timeId: 19,
  },
  {
    day: "THURSDAY",
    doctorId: 12,
    timeId: 20,
  },
  {
    day: "THURSDAY",
    doctorId: 12,
    timeId: 21,
  },
  {
    day: "THURSDAY",
    doctorId: 12,
    timeId: 22,
  },
  {
    day: "THURSDAY",
    doctorId: 12,
    timeId: 23,
  },
  {
    day: "THURSDAY",
    doctorId: 12,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 12,
    timeId: 17,
  },
  {
    day: "TUESDAY",
    doctorId: 12,
    timeId: 18,
  },
  {
    day: "TUESDAY",
    doctorId: 12,
    timeId: 19,
  },
  {
    day: "TUESDAY",
    doctorId: 12,
    timeId: 20,
  },
  {
    day: "TUESDAY",
    doctorId: 12,
    timeId: 21,
  },
  {
    day: "TUESDAY",
    doctorId: 12,
    timeId: 22,
  },
  {
    day: "TUESDAY",
    doctorId: 12,
    timeId: 23,
  },
  {
    day: "TUESDAY",
    doctorId: 12,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 12,
    timeId: 17,
  },
  {
    day: "FRIDAY",
    doctorId: 12,
    timeId: 18,
  },
  {
    day: "FRIDAY",
    doctorId: 12,
    timeId: 19,
  },
  {
    day: "FRIDAY",
    doctorId: 12,
    timeId: 20,
  },
  {
    day: "FRIDAY",
    doctorId: 12,
    timeId: 21,
  },
  {
    day: "FRIDAY",
    doctorId: 12,
    timeId: 22,
  },
  {
    day: "FRIDAY",
    doctorId: 12,
    timeId: 23,
  },
  {
    day: "FRIDAY",
    doctorId: 12,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 12,
    timeId: 17,
  },
  {
    day: "MONDAY",
    doctorId: 12,
    timeId: 18,
  },
  {
    day: "MONDAY",
    doctorId: 12,
    timeId: 19,
  },
  {
    day: "MONDAY",
    doctorId: 12,
    timeId: 20,
  },
  {
    day: "MONDAY",
    doctorId: 12,
    timeId: 21,
  },
  {
    day: "MONDAY",
    doctorId: 12,
    timeId: 22,
  },
  {
    day: "MONDAY",
    doctorId: 12,
    timeId: 23,
  },
  {
    day: "MONDAY",
    doctorId: 12,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 12,
    timeId: 17,
  },
  {
    day: "WEDNESDAY",
    doctorId: 12,
    timeId: 18,
  },
  {
    day: "WEDNESDAY",
    doctorId: 12,
    timeId: 19,
  },
  {
    day: "WEDNESDAY",
    doctorId: 12,
    timeId: 20,
  },
  {
    day: "WEDNESDAY",
    doctorId: 12,
    timeId: 21,
  },
  {
    day: "WEDNESDAY",
    doctorId: 12,
    timeId: 22,
  },
  {
    day: "WEDNESDAY",
    doctorId: 12,
    timeId: 23,
  },
  {
    day: "WEDNESDAY",
    doctorId: 12,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 13,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 13,
    timeId: 2,
  },
  {
    day: "TUESDAY",
    doctorId: 13,
    timeId: 3,
  },
  {
    day: "TUESDAY",
    doctorId: 13,
    timeId: 4,
  },
  {
    day: "TUESDAY",
    doctorId: 13,
    timeId: 5,
  },
  {
    day: "TUESDAY",
    doctorId: 13,
    timeId: 6,
  },
  {
    day: "TUESDAY",
    doctorId: 13,
    timeId: 7,
  },
  {
    day: "TUESDAY",
    doctorId: 13,
    timeId: 8,
  },
  {
    day: "THURSDAY",
    doctorId: 13,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 13,
    timeId: 2,
  },
  {
    day: "THURSDAY",
    doctorId: 13,
    timeId: 3,
  },
  {
    day: "THURSDAY",
    doctorId: 13,
    timeId: 4,
  },
  {
    day: "THURSDAY",
    doctorId: 13,
    timeId: 5,
  },
  {
    day: "THURSDAY",
    doctorId: 13,
    timeId: 6,
  },
  {
    day: "THURSDAY",
    doctorId: 13,
    timeId: 7,
  },
  {
    day: "THURSDAY",
    doctorId: 13,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 13,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 13,
    timeId: 2,
  },
  {
    day: "MONDAY",
    doctorId: 13,
    timeId: 3,
  },
  {
    day: "MONDAY",
    doctorId: 13,
    timeId: 4,
  },
  {
    day: "MONDAY",
    doctorId: 13,
    timeId: 5,
  },
  {
    day: "MONDAY",
    doctorId: 13,
    timeId: 6,
  },
  {
    day: "MONDAY",
    doctorId: 13,
    timeId: 7,
  },
  {
    day: "MONDAY",
    doctorId: 13,
    timeId: 8,
  },
  {
    day: "FRIDAY",
    doctorId: 13,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 13,
    timeId: 2,
  },
  {
    day: "FRIDAY",
    doctorId: 13,
    timeId: 3,
  },
  {
    day: "FRIDAY",
    doctorId: 13,
    timeId: 4,
  },
  {
    day: "FRIDAY",
    doctorId: 13,
    timeId: 5,
  },
  {
    day: "FRIDAY",
    doctorId: 13,
    timeId: 6,
  },
  {
    day: "FRIDAY",
    doctorId: 13,
    timeId: 7,
  },
  {
    day: "FRIDAY",
    doctorId: 13,
    timeId: 8,
  },
  {
    day: "WEDNESDAY",
    doctorId: 13,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 13,
    timeId: 2,
  },
  {
    day: "WEDNESDAY",
    doctorId: 13,
    timeId: 3,
  },
  {
    day: "WEDNESDAY",
    doctorId: 13,
    timeId: 4,
  },
  {
    day: "WEDNESDAY",
    doctorId: 13,
    timeId: 5,
  },
  {
    day: "WEDNESDAY",
    doctorId: 13,
    timeId: 6,
  },
  {
    day: "WEDNESDAY",
    doctorId: 13,
    timeId: 7,
  },
  {
    day: "WEDNESDAY",
    doctorId: 13,
    timeId: 8,
  },
  {
    day: "FRIDAY",
    doctorId: 14,
    timeId: 9,
  },
  {
    day: "FRIDAY",
    doctorId: 14,
    timeId: 10,
  },
  {
    day: "FRIDAY",
    doctorId: 14,
    timeId: 11,
  },
  {
    day: "FRIDAY",
    doctorId: 14,
    timeId: 12,
  },
  {
    day: "FRIDAY",
    doctorId: 14,
    timeId: 13,
  },
  {
    day: "FRIDAY",
    doctorId: 14,
    timeId: 14,
  },
  {
    day: "FRIDAY",
    doctorId: 14,
    timeId: 15,
  },
  {
    day: "FRIDAY",
    doctorId: 14,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 14,
    timeId: 9,
  },
  {
    day: "THURSDAY",
    doctorId: 14,
    timeId: 10,
  },
  {
    day: "THURSDAY",
    doctorId: 14,
    timeId: 11,
  },
  {
    day: "THURSDAY",
    doctorId: 14,
    timeId: 12,
  },
  {
    day: "THURSDAY",
    doctorId: 14,
    timeId: 13,
  },
  {
    day: "THURSDAY",
    doctorId: 14,
    timeId: 14,
  },
  {
    day: "THURSDAY",
    doctorId: 14,
    timeId: 15,
  },
  {
    day: "THURSDAY",
    doctorId: 14,
    timeId: 16,
  },
  {
    day: "WEDNESDAY",
    doctorId: 14,
    timeId: 9,
  },
  {
    day: "WEDNESDAY",
    doctorId: 14,
    timeId: 10,
  },
  {
    day: "WEDNESDAY",
    doctorId: 14,
    timeId: 11,
  },
  {
    day: "WEDNESDAY",
    doctorId: 14,
    timeId: 12,
  },
  {
    day: "WEDNESDAY",
    doctorId: 14,
    timeId: 13,
  },
  {
    day: "WEDNESDAY",
    doctorId: 14,
    timeId: 14,
  },
  {
    day: "WEDNESDAY",
    doctorId: 14,
    timeId: 15,
  },
  {
    day: "WEDNESDAY",
    doctorId: 14,
    timeId: 16,
  },
  {
    day: "TUESDAY",
    doctorId: 14,
    timeId: 9,
  },
  {
    day: "TUESDAY",
    doctorId: 14,
    timeId: 10,
  },
  {
    day: "TUESDAY",
    doctorId: 14,
    timeId: 11,
  },
  {
    day: "TUESDAY",
    doctorId: 14,
    timeId: 12,
  },
  {
    day: "TUESDAY",
    doctorId: 14,
    timeId: 13,
  },
  {
    day: "TUESDAY",
    doctorId: 14,
    timeId: 14,
  },
  {
    day: "TUESDAY",
    doctorId: 14,
    timeId: 15,
  },
  {
    day: "TUESDAY",
    doctorId: 14,
    timeId: 16,
  },
  {
    day: "MONDAY",
    doctorId: 14,
    timeId: 9,
  },
  {
    day: "MONDAY",
    doctorId: 14,
    timeId: 10,
  },
  {
    day: "MONDAY",
    doctorId: 14,
    timeId: 11,
  },
  {
    day: "MONDAY",
    doctorId: 14,
    timeId: 12,
  },
  {
    day: "MONDAY",
    doctorId: 14,
    timeId: 13,
  },
  {
    day: "MONDAY",
    doctorId: 14,
    timeId: 14,
  },
  {
    day: "MONDAY",
    doctorId: 14,
    timeId: 15,
  },
  {
    day: "MONDAY",
    doctorId: 14,
    timeId: 16,
  },
  {
    day: "WEDNESDAY",
    doctorId: 15,
    timeId: 17,
  },
  {
    day: "WEDNESDAY",
    doctorId: 15,
    timeId: 18,
  },
  {
    day: "WEDNESDAY",
    doctorId: 15,
    timeId: 19,
  },
  {
    day: "WEDNESDAY",
    doctorId: 15,
    timeId: 20,
  },
  {
    day: "WEDNESDAY",
    doctorId: 15,
    timeId: 21,
  },
  {
    day: "WEDNESDAY",
    doctorId: 15,
    timeId: 22,
  },
  {
    day: "WEDNESDAY",
    doctorId: 15,
    timeId: 23,
  },
  {
    day: "WEDNESDAY",
    doctorId: 15,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 15,
    timeId: 17,
  },
  {
    day: "TUESDAY",
    doctorId: 15,
    timeId: 18,
  },
  {
    day: "TUESDAY",
    doctorId: 15,
    timeId: 19,
  },
  {
    day: "TUESDAY",
    doctorId: 15,
    timeId: 20,
  },
  {
    day: "TUESDAY",
    doctorId: 15,
    timeId: 21,
  },
  {
    day: "TUESDAY",
    doctorId: 15,
    timeId: 22,
  },
  {
    day: "TUESDAY",
    doctorId: 15,
    timeId: 23,
  },
  {
    day: "TUESDAY",
    doctorId: 15,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 15,
    timeId: 17,
  },
  {
    day: "MONDAY",
    doctorId: 15,
    timeId: 18,
  },
  {
    day: "MONDAY",
    doctorId: 15,
    timeId: 19,
  },
  {
    day: "MONDAY",
    doctorId: 15,
    timeId: 20,
  },
  {
    day: "MONDAY",
    doctorId: 15,
    timeId: 21,
  },
  {
    day: "MONDAY",
    doctorId: 15,
    timeId: 22,
  },
  {
    day: "MONDAY",
    doctorId: 15,
    timeId: 23,
  },
  {
    day: "MONDAY",
    doctorId: 15,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 15,
    timeId: 17,
  },
  {
    day: "THURSDAY",
    doctorId: 15,
    timeId: 18,
  },
  {
    day: "THURSDAY",
    doctorId: 15,
    timeId: 19,
  },
  {
    day: "THURSDAY",
    doctorId: 15,
    timeId: 20,
  },
  {
    day: "THURSDAY",
    doctorId: 15,
    timeId: 21,
  },
  {
    day: "THURSDAY",
    doctorId: 15,
    timeId: 22,
  },
  {
    day: "THURSDAY",
    doctorId: 15,
    timeId: 23,
  },
  {
    day: "THURSDAY",
    doctorId: 15,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 15,
    timeId: 17,
  },
  {
    day: "FRIDAY",
    doctorId: 15,
    timeId: 18,
  },
  {
    day: "FRIDAY",
    doctorId: 15,
    timeId: 19,
  },
  {
    day: "FRIDAY",
    doctorId: 15,
    timeId: 20,
  },
  {
    day: "FRIDAY",
    doctorId: 15,
    timeId: 21,
  },
  {
    day: "FRIDAY",
    doctorId: 15,
    timeId: 22,
  },
  {
    day: "FRIDAY",
    doctorId: 15,
    timeId: 23,
  },
  {
    day: "FRIDAY",
    doctorId: 15,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 16,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 16,
    timeId: 2,
  },
  {
    day: "TUESDAY",
    doctorId: 16,
    timeId: 3,
  },
  {
    day: "TUESDAY",
    doctorId: 16,
    timeId: 4,
  },
  {
    day: "TUESDAY",
    doctorId: 16,
    timeId: 5,
  },
  {
    day: "TUESDAY",
    doctorId: 16,
    timeId: 6,
  },
  {
    day: "TUESDAY",
    doctorId: 16,
    timeId: 7,
  },
  {
    day: "TUESDAY",
    doctorId: 16,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 16,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 16,
    timeId: 2,
  },
  {
    day: "MONDAY",
    doctorId: 16,
    timeId: 3,
  },
  {
    day: "MONDAY",
    doctorId: 16,
    timeId: 4,
  },
  {
    day: "MONDAY",
    doctorId: 16,
    timeId: 5,
  },
  {
    day: "MONDAY",
    doctorId: 16,
    timeId: 6,
  },
  {
    day: "MONDAY",
    doctorId: 16,
    timeId: 7,
  },
  {
    day: "MONDAY",
    doctorId: 16,
    timeId: 8,
  },
  {
    day: "WEDNESDAY",
    doctorId: 16,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 16,
    timeId: 2,
  },
  {
    day: "WEDNESDAY",
    doctorId: 16,
    timeId: 3,
  },
  {
    day: "WEDNESDAY",
    doctorId: 16,
    timeId: 4,
  },
  {
    day: "WEDNESDAY",
    doctorId: 16,
    timeId: 5,
  },
  {
    day: "WEDNESDAY",
    doctorId: 16,
    timeId: 6,
  },
  {
    day: "WEDNESDAY",
    doctorId: 16,
    timeId: 7,
  },
  {
    day: "WEDNESDAY",
    doctorId: 16,
    timeId: 8,
  },
  {
    day: "THURSDAY",
    doctorId: 16,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 16,
    timeId: 2,
  },
  {
    day: "THURSDAY",
    doctorId: 16,
    timeId: 3,
  },
  {
    day: "THURSDAY",
    doctorId: 16,
    timeId: 4,
  },
  {
    day: "THURSDAY",
    doctorId: 16,
    timeId: 5,
  },
  {
    day: "THURSDAY",
    doctorId: 16,
    timeId: 6,
  },
  {
    day: "THURSDAY",
    doctorId: 16,
    timeId: 7,
  },
  {
    day: "THURSDAY",
    doctorId: 16,
    timeId: 8,
  },
  {
    day: "FRIDAY",
    doctorId: 16,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 16,
    timeId: 2,
  },
  {
    day: "FRIDAY",
    doctorId: 16,
    timeId: 3,
  },
  {
    day: "FRIDAY",
    doctorId: 16,
    timeId: 4,
  },
  {
    day: "FRIDAY",
    doctorId: 16,
    timeId: 5,
  },
  {
    day: "FRIDAY",
    doctorId: 16,
    timeId: 6,
  },
  {
    day: "FRIDAY",
    doctorId: 16,
    timeId: 7,
  },
  {
    day: "FRIDAY",
    doctorId: 16,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 17,
    timeId: 9,
  },
  {
    day: "MONDAY",
    doctorId: 17,
    timeId: 10,
  },
  {
    day: "MONDAY",
    doctorId: 17,
    timeId: 11,
  },
  {
    day: "MONDAY",
    doctorId: 17,
    timeId: 12,
  },
  {
    day: "MONDAY",
    doctorId: 17,
    timeId: 13,
  },
  {
    day: "MONDAY",
    doctorId: 17,
    timeId: 14,
  },
  {
    day: "MONDAY",
    doctorId: 17,
    timeId: 15,
  },
  {
    day: "MONDAY",
    doctorId: 17,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 17,
    timeId: 9,
  },
  {
    day: "THURSDAY",
    doctorId: 17,
    timeId: 10,
  },
  {
    day: "THURSDAY",
    doctorId: 17,
    timeId: 11,
  },
  {
    day: "THURSDAY",
    doctorId: 17,
    timeId: 12,
  },
  {
    day: "THURSDAY",
    doctorId: 17,
    timeId: 13,
  },
  {
    day: "THURSDAY",
    doctorId: 17,
    timeId: 14,
  },
  {
    day: "THURSDAY",
    doctorId: 17,
    timeId: 15,
  },
  {
    day: "THURSDAY",
    doctorId: 17,
    timeId: 16,
  },
  {
    day: "TUESDAY",
    doctorId: 17,
    timeId: 9,
  },
  {
    day: "TUESDAY",
    doctorId: 17,
    timeId: 10,
  },
  {
    day: "TUESDAY",
    doctorId: 17,
    timeId: 11,
  },
  {
    day: "TUESDAY",
    doctorId: 17,
    timeId: 12,
  },
  {
    day: "TUESDAY",
    doctorId: 17,
    timeId: 13,
  },
  {
    day: "TUESDAY",
    doctorId: 17,
    timeId: 14,
  },
  {
    day: "TUESDAY",
    doctorId: 17,
    timeId: 15,
  },
  {
    day: "TUESDAY",
    doctorId: 17,
    timeId: 16,
  },
  {
    day: "FRIDAY",
    doctorId: 17,
    timeId: 9,
  },
  {
    day: "FRIDAY",
    doctorId: 17,
    timeId: 10,
  },
  {
    day: "FRIDAY",
    doctorId: 17,
    timeId: 11,
  },
  {
    day: "FRIDAY",
    doctorId: 17,
    timeId: 12,
  },
  {
    day: "FRIDAY",
    doctorId: 17,
    timeId: 13,
  },
  {
    day: "FRIDAY",
    doctorId: 17,
    timeId: 14,
  },
  {
    day: "FRIDAY",
    doctorId: 17,
    timeId: 15,
  },
  {
    day: "FRIDAY",
    doctorId: 17,
    timeId: 16,
  },
  {
    day: "WEDNESDAY",
    doctorId: 17,
    timeId: 9,
  },
  {
    day: "WEDNESDAY",
    doctorId: 17,
    timeId: 10,
  },
  {
    day: "WEDNESDAY",
    doctorId: 17,
    timeId: 11,
  },
  {
    day: "WEDNESDAY",
    doctorId: 17,
    timeId: 12,
  },
  {
    day: "WEDNESDAY",
    doctorId: 17,
    timeId: 13,
  },
  {
    day: "WEDNESDAY",
    doctorId: 17,
    timeId: 14,
  },
  {
    day: "WEDNESDAY",
    doctorId: 17,
    timeId: 15,
  },
  {
    day: "WEDNESDAY",
    doctorId: 17,
    timeId: 16,
  },
  {
    day: "MONDAY",
    doctorId: 18,
    timeId: 17,
  },
  {
    day: "MONDAY",
    doctorId: 18,
    timeId: 18,
  },
  {
    day: "MONDAY",
    doctorId: 18,
    timeId: 19,
  },
  {
    day: "MONDAY",
    doctorId: 18,
    timeId: 20,
  },
  {
    day: "MONDAY",
    doctorId: 18,
    timeId: 21,
  },
  {
    day: "MONDAY",
    doctorId: 18,
    timeId: 22,
  },
  {
    day: "MONDAY",
    doctorId: 18,
    timeId: 23,
  },
  {
    day: "MONDAY",
    doctorId: 18,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 18,
    timeId: 17,
  },
  {
    day: "WEDNESDAY",
    doctorId: 18,
    timeId: 18,
  },
  {
    day: "WEDNESDAY",
    doctorId: 18,
    timeId: 19,
  },
  {
    day: "WEDNESDAY",
    doctorId: 18,
    timeId: 20,
  },
  {
    day: "WEDNESDAY",
    doctorId: 18,
    timeId: 21,
  },
  {
    day: "WEDNESDAY",
    doctorId: 18,
    timeId: 22,
  },
  {
    day: "WEDNESDAY",
    doctorId: 18,
    timeId: 23,
  },
  {
    day: "WEDNESDAY",
    doctorId: 18,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 18,
    timeId: 17,
  },
  {
    day: "TUESDAY",
    doctorId: 18,
    timeId: 18,
  },
  {
    day: "TUESDAY",
    doctorId: 18,
    timeId: 19,
  },
  {
    day: "TUESDAY",
    doctorId: 18,
    timeId: 20,
  },
  {
    day: "TUESDAY",
    doctorId: 18,
    timeId: 21,
  },
  {
    day: "TUESDAY",
    doctorId: 18,
    timeId: 22,
  },
  {
    day: "TUESDAY",
    doctorId: 18,
    timeId: 23,
  },
  {
    day: "TUESDAY",
    doctorId: 18,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 18,
    timeId: 17,
  },
  {
    day: "THURSDAY",
    doctorId: 18,
    timeId: 18,
  },
  {
    day: "THURSDAY",
    doctorId: 18,
    timeId: 19,
  },
  {
    day: "THURSDAY",
    doctorId: 18,
    timeId: 20,
  },
  {
    day: "THURSDAY",
    doctorId: 18,
    timeId: 21,
  },
  {
    day: "THURSDAY",
    doctorId: 18,
    timeId: 22,
  },
  {
    day: "THURSDAY",
    doctorId: 18,
    timeId: 23,
  },
  {
    day: "THURSDAY",
    doctorId: 18,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 18,
    timeId: 17,
  },
  {
    day: "FRIDAY",
    doctorId: 18,
    timeId: 18,
  },
  {
    day: "FRIDAY",
    doctorId: 18,
    timeId: 19,
  },
  {
    day: "FRIDAY",
    doctorId: 18,
    timeId: 20,
  },
  {
    day: "FRIDAY",
    doctorId: 18,
    timeId: 21,
  },
  {
    day: "FRIDAY",
    doctorId: 18,
    timeId: 22,
  },
  {
    day: "FRIDAY",
    doctorId: 18,
    timeId: 23,
  },
  {
    day: "FRIDAY",
    doctorId: 18,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 19,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 19,
    timeId: 2,
  },
  {
    day: "TUESDAY",
    doctorId: 19,
    timeId: 3,
  },
  {
    day: "TUESDAY",
    doctorId: 19,
    timeId: 4,
  },
  {
    day: "TUESDAY",
    doctorId: 19,
    timeId: 5,
  },
  {
    day: "TUESDAY",
    doctorId: 19,
    timeId: 6,
  },
  {
    day: "TUESDAY",
    doctorId: 19,
    timeId: 7,
  },
  {
    day: "TUESDAY",
    doctorId: 19,
    timeId: 8,
  },
  {
    day: "THURSDAY",
    doctorId: 19,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 19,
    timeId: 2,
  },
  {
    day: "THURSDAY",
    doctorId: 19,
    timeId: 3,
  },
  {
    day: "THURSDAY",
    doctorId: 19,
    timeId: 4,
  },
  {
    day: "THURSDAY",
    doctorId: 19,
    timeId: 5,
  },
  {
    day: "THURSDAY",
    doctorId: 19,
    timeId: 6,
  },
  {
    day: "THURSDAY",
    doctorId: 19,
    timeId: 7,
  },
  {
    day: "THURSDAY",
    doctorId: 19,
    timeId: 8,
  },
  {
    day: "FRIDAY",
    doctorId: 19,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 19,
    timeId: 2,
  },
  {
    day: "FRIDAY",
    doctorId: 19,
    timeId: 3,
  },
  {
    day: "FRIDAY",
    doctorId: 19,
    timeId: 4,
  },
  {
    day: "FRIDAY",
    doctorId: 19,
    timeId: 5,
  },
  {
    day: "FRIDAY",
    doctorId: 19,
    timeId: 6,
  },
  {
    day: "FRIDAY",
    doctorId: 19,
    timeId: 7,
  },
  {
    day: "FRIDAY",
    doctorId: 19,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 19,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 19,
    timeId: 2,
  },
  {
    day: "MONDAY",
    doctorId: 19,
    timeId: 3,
  },
  {
    day: "MONDAY",
    doctorId: 19,
    timeId: 4,
  },
  {
    day: "MONDAY",
    doctorId: 19,
    timeId: 5,
  },
  {
    day: "MONDAY",
    doctorId: 19,
    timeId: 6,
  },
  {
    day: "MONDAY",
    doctorId: 19,
    timeId: 7,
  },
  {
    day: "MONDAY",
    doctorId: 19,
    timeId: 8,
  },
  {
    day: "WEDNESDAY",
    doctorId: 19,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 19,
    timeId: 2,
  },
  {
    day: "WEDNESDAY",
    doctorId: 19,
    timeId: 3,
  },
  {
    day: "WEDNESDAY",
    doctorId: 19,
    timeId: 4,
  },
  {
    day: "WEDNESDAY",
    doctorId: 19,
    timeId: 5,
  },
  {
    day: "WEDNESDAY",
    doctorId: 19,
    timeId: 6,
  },
  {
    day: "WEDNESDAY",
    doctorId: 19,
    timeId: 7,
  },
  {
    day: "WEDNESDAY",
    doctorId: 19,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 20,
    timeId: 9,
  },
  {
    day: "MONDAY",
    doctorId: 20,
    timeId: 10,
  },
  {
    day: "MONDAY",
    doctorId: 20,
    timeId: 11,
  },
  {
    day: "MONDAY",
    doctorId: 20,
    timeId: 12,
  },
  {
    day: "MONDAY",
    doctorId: 20,
    timeId: 13,
  },
  {
    day: "MONDAY",
    doctorId: 20,
    timeId: 14,
  },
  {
    day: "MONDAY",
    doctorId: 20,
    timeId: 15,
  },
  {
    day: "MONDAY",
    doctorId: 20,
    timeId: 16,
  },
  {
    day: "TUESDAY",
    doctorId: 20,
    timeId: 9,
  },
  {
    day: "TUESDAY",
    doctorId: 20,
    timeId: 10,
  },
  {
    day: "TUESDAY",
    doctorId: 20,
    timeId: 11,
  },
  {
    day: "TUESDAY",
    doctorId: 20,
    timeId: 12,
  },
  {
    day: "TUESDAY",
    doctorId: 20,
    timeId: 13,
  },
  {
    day: "TUESDAY",
    doctorId: 20,
    timeId: 14,
  },
  {
    day: "TUESDAY",
    doctorId: 20,
    timeId: 15,
  },
  {
    day: "TUESDAY",
    doctorId: 20,
    timeId: 16,
  },
  {
    day: "WEDNESDAY",
    doctorId: 20,
    timeId: 9,
  },
  {
    day: "WEDNESDAY",
    doctorId: 20,
    timeId: 10,
  },
  {
    day: "WEDNESDAY",
    doctorId: 20,
    timeId: 11,
  },
  {
    day: "WEDNESDAY",
    doctorId: 20,
    timeId: 12,
  },
  {
    day: "WEDNESDAY",
    doctorId: 20,
    timeId: 13,
  },
  {
    day: "WEDNESDAY",
    doctorId: 20,
    timeId: 14,
  },
  {
    day: "WEDNESDAY",
    doctorId: 20,
    timeId: 15,
  },
  {
    day: "WEDNESDAY",
    doctorId: 20,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 20,
    timeId: 9,
  },
  {
    day: "THURSDAY",
    doctorId: 20,
    timeId: 10,
  },
  {
    day: "THURSDAY",
    doctorId: 20,
    timeId: 11,
  },
  {
    day: "THURSDAY",
    doctorId: 20,
    timeId: 12,
  },
  {
    day: "THURSDAY",
    doctorId: 20,
    timeId: 13,
  },
  {
    day: "THURSDAY",
    doctorId: 20,
    timeId: 14,
  },
  {
    day: "THURSDAY",
    doctorId: 20,
    timeId: 15,
  },
  {
    day: "THURSDAY",
    doctorId: 20,
    timeId: 16,
  },
  {
    day: "FRIDAY",
    doctorId: 20,
    timeId: 9,
  },
  {
    day: "FRIDAY",
    doctorId: 20,
    timeId: 10,
  },
  {
    day: "FRIDAY",
    doctorId: 20,
    timeId: 11,
  },
  {
    day: "FRIDAY",
    doctorId: 20,
    timeId: 12,
  },
  {
    day: "FRIDAY",
    doctorId: 20,
    timeId: 13,
  },
  {
    day: "FRIDAY",
    doctorId: 20,
    timeId: 14,
  },
  {
    day: "FRIDAY",
    doctorId: 20,
    timeId: 15,
  },
  {
    day: "FRIDAY",
    doctorId: 20,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 21,
    timeId: 17,
  },
  {
    day: "THURSDAY",
    doctorId: 21,
    timeId: 18,
  },
  {
    day: "THURSDAY",
    doctorId: 21,
    timeId: 19,
  },
  {
    day: "THURSDAY",
    doctorId: 21,
    timeId: 20,
  },
  {
    day: "THURSDAY",
    doctorId: 21,
    timeId: 21,
  },
  {
    day: "THURSDAY",
    doctorId: 21,
    timeId: 22,
  },
  {
    day: "THURSDAY",
    doctorId: 21,
    timeId: 23,
  },
  {
    day: "THURSDAY",
    doctorId: 21,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 21,
    timeId: 17,
  },
  {
    day: "TUESDAY",
    doctorId: 21,
    timeId: 18,
  },
  {
    day: "TUESDAY",
    doctorId: 21,
    timeId: 19,
  },
  {
    day: "TUESDAY",
    doctorId: 21,
    timeId: 20,
  },
  {
    day: "TUESDAY",
    doctorId: 21,
    timeId: 21,
  },
  {
    day: "TUESDAY",
    doctorId: 21,
    timeId: 22,
  },
  {
    day: "TUESDAY",
    doctorId: 21,
    timeId: 23,
  },
  {
    day: "TUESDAY",
    doctorId: 21,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 21,
    timeId: 17,
  },
  {
    day: "FRIDAY",
    doctorId: 21,
    timeId: 18,
  },
  {
    day: "FRIDAY",
    doctorId: 21,
    timeId: 19,
  },
  {
    day: "FRIDAY",
    doctorId: 21,
    timeId: 20,
  },
  {
    day: "FRIDAY",
    doctorId: 21,
    timeId: 21,
  },
  {
    day: "FRIDAY",
    doctorId: 21,
    timeId: 22,
  },
  {
    day: "FRIDAY",
    doctorId: 21,
    timeId: 23,
  },
  {
    day: "FRIDAY",
    doctorId: 21,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 21,
    timeId: 17,
  },
  {
    day: "MONDAY",
    doctorId: 21,
    timeId: 18,
  },
  {
    day: "MONDAY",
    doctorId: 21,
    timeId: 19,
  },
  {
    day: "MONDAY",
    doctorId: 21,
    timeId: 20,
  },
  {
    day: "MONDAY",
    doctorId: 21,
    timeId: 21,
  },
  {
    day: "MONDAY",
    doctorId: 21,
    timeId: 22,
  },
  {
    day: "MONDAY",
    doctorId: 21,
    timeId: 23,
  },
  {
    day: "MONDAY",
    doctorId: 21,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 21,
    timeId: 17,
  },
  {
    day: "WEDNESDAY",
    doctorId: 21,
    timeId: 18,
  },
  {
    day: "WEDNESDAY",
    doctorId: 21,
    timeId: 19,
  },
  {
    day: "WEDNESDAY",
    doctorId: 21,
    timeId: 20,
  },
  {
    day: "WEDNESDAY",
    doctorId: 21,
    timeId: 21,
  },
  {
    day: "WEDNESDAY",
    doctorId: 21,
    timeId: 22,
  },
  {
    day: "WEDNESDAY",
    doctorId: 21,
    timeId: 23,
  },
  {
    day: "WEDNESDAY",
    doctorId: 21,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 22,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 22,
    timeId: 2,
  },
  {
    day: "THURSDAY",
    doctorId: 22,
    timeId: 3,
  },
  {
    day: "THURSDAY",
    doctorId: 22,
    timeId: 4,
  },
  {
    day: "THURSDAY",
    doctorId: 22,
    timeId: 5,
  },
  {
    day: "THURSDAY",
    doctorId: 22,
    timeId: 6,
  },
  {
    day: "THURSDAY",
    doctorId: 22,
    timeId: 7,
  },
  {
    day: "THURSDAY",
    doctorId: 22,
    timeId: 8,
  },
  {
    day: "FRIDAY",
    doctorId: 22,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 22,
    timeId: 2,
  },
  {
    day: "FRIDAY",
    doctorId: 22,
    timeId: 3,
  },
  {
    day: "FRIDAY",
    doctorId: 22,
    timeId: 4,
  },
  {
    day: "FRIDAY",
    doctorId: 22,
    timeId: 5,
  },
  {
    day: "FRIDAY",
    doctorId: 22,
    timeId: 6,
  },
  {
    day: "FRIDAY",
    doctorId: 22,
    timeId: 7,
  },
  {
    day: "FRIDAY",
    doctorId: 22,
    timeId: 8,
  },
  {
    day: "WEDNESDAY",
    doctorId: 22,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 22,
    timeId: 2,
  },
  {
    day: "WEDNESDAY",
    doctorId: 22,
    timeId: 3,
  },
  {
    day: "WEDNESDAY",
    doctorId: 22,
    timeId: 4,
  },
  {
    day: "WEDNESDAY",
    doctorId: 22,
    timeId: 5,
  },
  {
    day: "WEDNESDAY",
    doctorId: 22,
    timeId: 6,
  },
  {
    day: "WEDNESDAY",
    doctorId: 22,
    timeId: 7,
  },
  {
    day: "WEDNESDAY",
    doctorId: 22,
    timeId: 8,
  },
  {
    day: "TUESDAY",
    doctorId: 22,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 22,
    timeId: 2,
  },
  {
    day: "TUESDAY",
    doctorId: 22,
    timeId: 3,
  },
  {
    day: "TUESDAY",
    doctorId: 22,
    timeId: 4,
  },
  {
    day: "TUESDAY",
    doctorId: 22,
    timeId: 5,
  },
  {
    day: "TUESDAY",
    doctorId: 22,
    timeId: 6,
  },
  {
    day: "TUESDAY",
    doctorId: 22,
    timeId: 7,
  },
  {
    day: "TUESDAY",
    doctorId: 22,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 22,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 22,
    timeId: 2,
  },
  {
    day: "MONDAY",
    doctorId: 22,
    timeId: 3,
  },
  {
    day: "MONDAY",
    doctorId: 22,
    timeId: 4,
  },
  {
    day: "MONDAY",
    doctorId: 22,
    timeId: 5,
  },
  {
    day: "MONDAY",
    doctorId: 22,
    timeId: 6,
  },
  {
    day: "MONDAY",
    doctorId: 22,
    timeId: 7,
  },
  {
    day: "MONDAY",
    doctorId: 22,
    timeId: 8,
  },
  {
    day: "FRIDAY",
    doctorId: 23,
    timeId: 9,
  },
  {
    day: "FRIDAY",
    doctorId: 23,
    timeId: 10,
  },
  {
    day: "FRIDAY",
    doctorId: 23,
    timeId: 11,
  },
  {
    day: "FRIDAY",
    doctorId: 23,
    timeId: 12,
  },
  {
    day: "FRIDAY",
    doctorId: 23,
    timeId: 13,
  },
  {
    day: "FRIDAY",
    doctorId: 23,
    timeId: 14,
  },
  {
    day: "FRIDAY",
    doctorId: 23,
    timeId: 15,
  },
  {
    day: "FRIDAY",
    doctorId: 23,
    timeId: 16,
  },
  {
    day: "MONDAY",
    doctorId: 23,
    timeId: 9,
  },
  {
    day: "MONDAY",
    doctorId: 23,
    timeId: 10,
  },
  {
    day: "MONDAY",
    doctorId: 23,
    timeId: 11,
  },
  {
    day: "MONDAY",
    doctorId: 23,
    timeId: 12,
  },
  {
    day: "MONDAY",
    doctorId: 23,
    timeId: 13,
  },
  {
    day: "MONDAY",
    doctorId: 23,
    timeId: 14,
  },
  {
    day: "MONDAY",
    doctorId: 23,
    timeId: 15,
  },
  {
    day: "MONDAY",
    doctorId: 23,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 23,
    timeId: 9,
  },
  {
    day: "THURSDAY",
    doctorId: 23,
    timeId: 10,
  },
  {
    day: "THURSDAY",
    doctorId: 23,
    timeId: 11,
  },
  {
    day: "THURSDAY",
    doctorId: 23,
    timeId: 12,
  },
  {
    day: "THURSDAY",
    doctorId: 23,
    timeId: 13,
  },
  {
    day: "THURSDAY",
    doctorId: 23,
    timeId: 14,
  },
  {
    day: "THURSDAY",
    doctorId: 23,
    timeId: 15,
  },
  {
    day: "THURSDAY",
    doctorId: 23,
    timeId: 16,
  },
  {
    day: "TUESDAY",
    doctorId: 23,
    timeId: 9,
  },
  {
    day: "TUESDAY",
    doctorId: 23,
    timeId: 10,
  },
  {
    day: "TUESDAY",
    doctorId: 23,
    timeId: 11,
  },
  {
    day: "TUESDAY",
    doctorId: 23,
    timeId: 12,
  },
  {
    day: "TUESDAY",
    doctorId: 23,
    timeId: 13,
  },
  {
    day: "TUESDAY",
    doctorId: 23,
    timeId: 14,
  },
  {
    day: "TUESDAY",
    doctorId: 23,
    timeId: 15,
  },
  {
    day: "TUESDAY",
    doctorId: 23,
    timeId: 16,
  },
  {
    day: "WEDNESDAY",
    doctorId: 23,
    timeId: 9,
  },
  {
    day: "WEDNESDAY",
    doctorId: 23,
    timeId: 10,
  },
  {
    day: "WEDNESDAY",
    doctorId: 23,
    timeId: 11,
  },
  {
    day: "WEDNESDAY",
    doctorId: 23,
    timeId: 12,
  },
  {
    day: "WEDNESDAY",
    doctorId: 23,
    timeId: 13,
  },
  {
    day: "WEDNESDAY",
    doctorId: 23,
    timeId: 14,
  },
  {
    day: "WEDNESDAY",
    doctorId: 23,
    timeId: 15,
  },
  {
    day: "WEDNESDAY",
    doctorId: 23,
    timeId: 16,
  },
  {
    day: "TUESDAY",
    doctorId: 24,
    timeId: 17,
  },
  {
    day: "TUESDAY",
    doctorId: 24,
    timeId: 18,
  },
  {
    day: "TUESDAY",
    doctorId: 24,
    timeId: 19,
  },
  {
    day: "TUESDAY",
    doctorId: 24,
    timeId: 20,
  },
  {
    day: "TUESDAY",
    doctorId: 24,
    timeId: 21,
  },
  {
    day: "TUESDAY",
    doctorId: 24,
    timeId: 22,
  },
  {
    day: "TUESDAY",
    doctorId: 24,
    timeId: 23,
  },
  {
    day: "TUESDAY",
    doctorId: 24,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 24,
    timeId: 17,
  },
  {
    day: "WEDNESDAY",
    doctorId: 24,
    timeId: 18,
  },
  {
    day: "WEDNESDAY",
    doctorId: 24,
    timeId: 19,
  },
  {
    day: "WEDNESDAY",
    doctorId: 24,
    timeId: 20,
  },
  {
    day: "WEDNESDAY",
    doctorId: 24,
    timeId: 21,
  },
  {
    day: "WEDNESDAY",
    doctorId: 24,
    timeId: 22,
  },
  {
    day: "WEDNESDAY",
    doctorId: 24,
    timeId: 23,
  },
  {
    day: "WEDNESDAY",
    doctorId: 24,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 24,
    timeId: 17,
  },
  {
    day: "THURSDAY",
    doctorId: 24,
    timeId: 18,
  },
  {
    day: "THURSDAY",
    doctorId: 24,
    timeId: 19,
  },
  {
    day: "THURSDAY",
    doctorId: 24,
    timeId: 20,
  },
  {
    day: "THURSDAY",
    doctorId: 24,
    timeId: 21,
  },
  {
    day: "THURSDAY",
    doctorId: 24,
    timeId: 22,
  },
  {
    day: "THURSDAY",
    doctorId: 24,
    timeId: 23,
  },
  {
    day: "THURSDAY",
    doctorId: 24,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 24,
    timeId: 17,
  },
  {
    day: "MONDAY",
    doctorId: 24,
    timeId: 18,
  },
  {
    day: "MONDAY",
    doctorId: 24,
    timeId: 19,
  },
  {
    day: "MONDAY",
    doctorId: 24,
    timeId: 20,
  },
  {
    day: "MONDAY",
    doctorId: 24,
    timeId: 21,
  },
  {
    day: "MONDAY",
    doctorId: 24,
    timeId: 22,
  },
  {
    day: "MONDAY",
    doctorId: 24,
    timeId: 23,
  },
  {
    day: "MONDAY",
    doctorId: 24,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 24,
    timeId: 17,
  },
  {
    day: "FRIDAY",
    doctorId: 24,
    timeId: 18,
  },
  {
    day: "FRIDAY",
    doctorId: 24,
    timeId: 19,
  },
  {
    day: "FRIDAY",
    doctorId: 24,
    timeId: 20,
  },
  {
    day: "FRIDAY",
    doctorId: 24,
    timeId: 21,
  },
  {
    day: "FRIDAY",
    doctorId: 24,
    timeId: 22,
  },
  {
    day: "FRIDAY",
    doctorId: 24,
    timeId: 23,
  },
  {
    day: "FRIDAY",
    doctorId: 24,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 25,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 25,
    timeId: 2,
  },
  {
    day: "WEDNESDAY",
    doctorId: 25,
    timeId: 3,
  },
  {
    day: "WEDNESDAY",
    doctorId: 25,
    timeId: 4,
  },
  {
    day: "WEDNESDAY",
    doctorId: 25,
    timeId: 5,
  },
  {
    day: "WEDNESDAY",
    doctorId: 25,
    timeId: 6,
  },
  {
    day: "WEDNESDAY",
    doctorId: 25,
    timeId: 7,
  },
  {
    day: "WEDNESDAY",
    doctorId: 25,
    timeId: 8,
  },
  {
    day: "TUESDAY",
    doctorId: 25,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 25,
    timeId: 2,
  },
  {
    day: "TUESDAY",
    doctorId: 25,
    timeId: 3,
  },
  {
    day: "TUESDAY",
    doctorId: 25,
    timeId: 4,
  },
  {
    day: "TUESDAY",
    doctorId: 25,
    timeId: 5,
  },
  {
    day: "TUESDAY",
    doctorId: 25,
    timeId: 6,
  },
  {
    day: "TUESDAY",
    doctorId: 25,
    timeId: 7,
  },
  {
    day: "TUESDAY",
    doctorId: 25,
    timeId: 8,
  },
  {
    day: "FRIDAY",
    doctorId: 25,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 25,
    timeId: 2,
  },
  {
    day: "FRIDAY",
    doctorId: 25,
    timeId: 3,
  },
  {
    day: "FRIDAY",
    doctorId: 25,
    timeId: 4,
  },
  {
    day: "FRIDAY",
    doctorId: 25,
    timeId: 5,
  },
  {
    day: "FRIDAY",
    doctorId: 25,
    timeId: 6,
  },
  {
    day: "FRIDAY",
    doctorId: 25,
    timeId: 7,
  },
  {
    day: "FRIDAY",
    doctorId: 25,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 25,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 25,
    timeId: 2,
  },
  {
    day: "MONDAY",
    doctorId: 25,
    timeId: 3,
  },
  {
    day: "MONDAY",
    doctorId: 25,
    timeId: 4,
  },
  {
    day: "MONDAY",
    doctorId: 25,
    timeId: 5,
  },
  {
    day: "MONDAY",
    doctorId: 25,
    timeId: 6,
  },
  {
    day: "MONDAY",
    doctorId: 25,
    timeId: 7,
  },
  {
    day: "MONDAY",
    doctorId: 25,
    timeId: 8,
  },
  {
    day: "THURSDAY",
    doctorId: 25,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 25,
    timeId: 2,
  },
  {
    day: "THURSDAY",
    doctorId: 25,
    timeId: 3,
  },
  {
    day: "THURSDAY",
    doctorId: 25,
    timeId: 4,
  },
  {
    day: "THURSDAY",
    doctorId: 25,
    timeId: 5,
  },
  {
    day: "THURSDAY",
    doctorId: 25,
    timeId: 6,
  },
  {
    day: "THURSDAY",
    doctorId: 25,
    timeId: 7,
  },
  {
    day: "THURSDAY",
    doctorId: 25,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 26,
    timeId: 9,
  },
  {
    day: "MONDAY",
    doctorId: 26,
    timeId: 10,
  },
  {
    day: "MONDAY",
    doctorId: 26,
    timeId: 11,
  },
  {
    day: "MONDAY",
    doctorId: 26,
    timeId: 12,
  },
  {
    day: "MONDAY",
    doctorId: 26,
    timeId: 13,
  },
  {
    day: "MONDAY",
    doctorId: 26,
    timeId: 14,
  },
  {
    day: "MONDAY",
    doctorId: 26,
    timeId: 15,
  },
  {
    day: "MONDAY",
    doctorId: 26,
    timeId: 16,
  },
  {
    day: "FRIDAY",
    doctorId: 26,
    timeId: 9,
  },
  {
    day: "FRIDAY",
    doctorId: 26,
    timeId: 10,
  },
  {
    day: "FRIDAY",
    doctorId: 26,
    timeId: 11,
  },
  {
    day: "FRIDAY",
    doctorId: 26,
    timeId: 12,
  },
  {
    day: "FRIDAY",
    doctorId: 26,
    timeId: 13,
  },
  {
    day: "FRIDAY",
    doctorId: 26,
    timeId: 14,
  },
  {
    day: "FRIDAY",
    doctorId: 26,
    timeId: 15,
  },
  {
    day: "FRIDAY",
    doctorId: 26,
    timeId: 16,
  },
  {
    day: "TUESDAY",
    doctorId: 26,
    timeId: 9,
  },
  {
    day: "TUESDAY",
    doctorId: 26,
    timeId: 10,
  },
  {
    day: "TUESDAY",
    doctorId: 26,
    timeId: 11,
  },
  {
    day: "TUESDAY",
    doctorId: 26,
    timeId: 12,
  },
  {
    day: "TUESDAY",
    doctorId: 26,
    timeId: 13,
  },
  {
    day: "TUESDAY",
    doctorId: 26,
    timeId: 14,
  },
  {
    day: "TUESDAY",
    doctorId: 26,
    timeId: 15,
  },
  {
    day: "TUESDAY",
    doctorId: 26,
    timeId: 16,
  },
  {
    day: "WEDNESDAY",
    doctorId: 26,
    timeId: 9,
  },
  {
    day: "WEDNESDAY",
    doctorId: 26,
    timeId: 10,
  },
  {
    day: "WEDNESDAY",
    doctorId: 26,
    timeId: 11,
  },
  {
    day: "WEDNESDAY",
    doctorId: 26,
    timeId: 12,
  },
  {
    day: "WEDNESDAY",
    doctorId: 26,
    timeId: 13,
  },
  {
    day: "WEDNESDAY",
    doctorId: 26,
    timeId: 14,
  },
  {
    day: "WEDNESDAY",
    doctorId: 26,
    timeId: 15,
  },
  {
    day: "WEDNESDAY",
    doctorId: 26,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 26,
    timeId: 9,
  },
  {
    day: "THURSDAY",
    doctorId: 26,
    timeId: 10,
  },
  {
    day: "THURSDAY",
    doctorId: 26,
    timeId: 11,
  },
  {
    day: "THURSDAY",
    doctorId: 26,
    timeId: 12,
  },
  {
    day: "THURSDAY",
    doctorId: 26,
    timeId: 13,
  },
  {
    day: "THURSDAY",
    doctorId: 26,
    timeId: 14,
  },
  {
    day: "THURSDAY",
    doctorId: 26,
    timeId: 15,
  },
  {
    day: "THURSDAY",
    doctorId: 26,
    timeId: 16,
  },
  {
    day: "WEDNESDAY",
    doctorId: 27,
    timeId: 17,
  },
  {
    day: "WEDNESDAY",
    doctorId: 27,
    timeId: 18,
  },
  {
    day: "WEDNESDAY",
    doctorId: 27,
    timeId: 19,
  },
  {
    day: "WEDNESDAY",
    doctorId: 27,
    timeId: 20,
  },
  {
    day: "WEDNESDAY",
    doctorId: 27,
    timeId: 21,
  },
  {
    day: "WEDNESDAY",
    doctorId: 27,
    timeId: 22,
  },
  {
    day: "WEDNESDAY",
    doctorId: 27,
    timeId: 23,
  },
  {
    day: "WEDNESDAY",
    doctorId: 27,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 27,
    timeId: 17,
  },
  {
    day: "MONDAY",
    doctorId: 27,
    timeId: 18,
  },
  {
    day: "MONDAY",
    doctorId: 27,
    timeId: 19,
  },
  {
    day: "MONDAY",
    doctorId: 27,
    timeId: 20,
  },
  {
    day: "MONDAY",
    doctorId: 27,
    timeId: 21,
  },
  {
    day: "MONDAY",
    doctorId: 27,
    timeId: 22,
  },
  {
    day: "MONDAY",
    doctorId: 27,
    timeId: 23,
  },
  {
    day: "MONDAY",
    doctorId: 27,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 27,
    timeId: 17,
  },
  {
    day: "TUESDAY",
    doctorId: 27,
    timeId: 18,
  },
  {
    day: "TUESDAY",
    doctorId: 27,
    timeId: 19,
  },
  {
    day: "TUESDAY",
    doctorId: 27,
    timeId: 20,
  },
  {
    day: "TUESDAY",
    doctorId: 27,
    timeId: 21,
  },
  {
    day: "TUESDAY",
    doctorId: 27,
    timeId: 22,
  },
  {
    day: "TUESDAY",
    doctorId: 27,
    timeId: 23,
  },
  {
    day: "TUESDAY",
    doctorId: 27,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 27,
    timeId: 17,
  },
  {
    day: "FRIDAY",
    doctorId: 27,
    timeId: 18,
  },
  {
    day: "FRIDAY",
    doctorId: 27,
    timeId: 19,
  },
  {
    day: "FRIDAY",
    doctorId: 27,
    timeId: 20,
  },
  {
    day: "FRIDAY",
    doctorId: 27,
    timeId: 21,
  },
  {
    day: "FRIDAY",
    doctorId: 27,
    timeId: 22,
  },
  {
    day: "FRIDAY",
    doctorId: 27,
    timeId: 23,
  },
  {
    day: "FRIDAY",
    doctorId: 27,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 27,
    timeId: 17,
  },
  {
    day: "THURSDAY",
    doctorId: 27,
    timeId: 18,
  },
  {
    day: "THURSDAY",
    doctorId: 27,
    timeId: 19,
  },
  {
    day: "THURSDAY",
    doctorId: 27,
    timeId: 20,
  },
  {
    day: "THURSDAY",
    doctorId: 27,
    timeId: 21,
  },
  {
    day: "THURSDAY",
    doctorId: 27,
    timeId: 22,
  },
  {
    day: "THURSDAY",
    doctorId: 27,
    timeId: 23,
  },
  {
    day: "THURSDAY",
    doctorId: 27,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 28,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 28,
    timeId: 2,
  },
  {
    day: "FRIDAY",
    doctorId: 28,
    timeId: 3,
  },
  {
    day: "FRIDAY",
    doctorId: 28,
    timeId: 4,
  },
  {
    day: "FRIDAY",
    doctorId: 28,
    timeId: 5,
  },
  {
    day: "FRIDAY",
    doctorId: 28,
    timeId: 6,
  },
  {
    day: "FRIDAY",
    doctorId: 28,
    timeId: 7,
  },
  {
    day: "FRIDAY",
    doctorId: 28,
    timeId: 8,
  },
  {
    day: "WEDNESDAY",
    doctorId: 28,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 28,
    timeId: 2,
  },
  {
    day: "WEDNESDAY",
    doctorId: 28,
    timeId: 3,
  },
  {
    day: "WEDNESDAY",
    doctorId: 28,
    timeId: 4,
  },
  {
    day: "WEDNESDAY",
    doctorId: 28,
    timeId: 5,
  },
  {
    day: "WEDNESDAY",
    doctorId: 28,
    timeId: 6,
  },
  {
    day: "WEDNESDAY",
    doctorId: 28,
    timeId: 7,
  },
  {
    day: "WEDNESDAY",
    doctorId: 28,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 28,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 28,
    timeId: 2,
  },
  {
    day: "MONDAY",
    doctorId: 28,
    timeId: 3,
  },
  {
    day: "MONDAY",
    doctorId: 28,
    timeId: 4,
  },
  {
    day: "MONDAY",
    doctorId: 28,
    timeId: 5,
  },
  {
    day: "MONDAY",
    doctorId: 28,
    timeId: 6,
  },
  {
    day: "MONDAY",
    doctorId: 28,
    timeId: 7,
  },
  {
    day: "MONDAY",
    doctorId: 28,
    timeId: 8,
  },
  {
    day: "THURSDAY",
    doctorId: 28,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 28,
    timeId: 2,
  },
  {
    day: "THURSDAY",
    doctorId: 28,
    timeId: 3,
  },
  {
    day: "THURSDAY",
    doctorId: 28,
    timeId: 4,
  },
  {
    day: "THURSDAY",
    doctorId: 28,
    timeId: 5,
  },
  {
    day: "THURSDAY",
    doctorId: 28,
    timeId: 6,
  },
  {
    day: "THURSDAY",
    doctorId: 28,
    timeId: 7,
  },
  {
    day: "THURSDAY",
    doctorId: 28,
    timeId: 8,
  },
  {
    day: "TUESDAY",
    doctorId: 28,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 28,
    timeId: 2,
  },
  {
    day: "TUESDAY",
    doctorId: 28,
    timeId: 3,
  },
  {
    day: "TUESDAY",
    doctorId: 28,
    timeId: 4,
  },
  {
    day: "TUESDAY",
    doctorId: 28,
    timeId: 5,
  },
  {
    day: "TUESDAY",
    doctorId: 28,
    timeId: 6,
  },
  {
    day: "TUESDAY",
    doctorId: 28,
    timeId: 7,
  },
  {
    day: "TUESDAY",
    doctorId: 28,
    timeId: 8,
  },
  {
    day: "FRIDAY",
    doctorId: 29,
    timeId: 9,
  },
  {
    day: "FRIDAY",
    doctorId: 29,
    timeId: 10,
  },
  {
    day: "FRIDAY",
    doctorId: 29,
    timeId: 11,
  },
  {
    day: "FRIDAY",
    doctorId: 29,
    timeId: 12,
  },
  {
    day: "FRIDAY",
    doctorId: 29,
    timeId: 13,
  },
  {
    day: "FRIDAY",
    doctorId: 29,
    timeId: 14,
  },
  {
    day: "FRIDAY",
    doctorId: 29,
    timeId: 15,
  },
  {
    day: "FRIDAY",
    doctorId: 29,
    timeId: 16,
  },
  {
    day: "WEDNESDAY",
    doctorId: 29,
    timeId: 9,
  },
  {
    day: "WEDNESDAY",
    doctorId: 29,
    timeId: 10,
  },
  {
    day: "WEDNESDAY",
    doctorId: 29,
    timeId: 11,
  },
  {
    day: "WEDNESDAY",
    doctorId: 29,
    timeId: 12,
  },
  {
    day: "WEDNESDAY",
    doctorId: 29,
    timeId: 13,
  },
  {
    day: "WEDNESDAY",
    doctorId: 29,
    timeId: 14,
  },
  {
    day: "WEDNESDAY",
    doctorId: 29,
    timeId: 15,
  },
  {
    day: "WEDNESDAY",
    doctorId: 29,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 29,
    timeId: 9,
  },
  {
    day: "THURSDAY",
    doctorId: 29,
    timeId: 10,
  },
  {
    day: "THURSDAY",
    doctorId: 29,
    timeId: 11,
  },
  {
    day: "THURSDAY",
    doctorId: 29,
    timeId: 12,
  },
  {
    day: "THURSDAY",
    doctorId: 29,
    timeId: 13,
  },
  {
    day: "THURSDAY",
    doctorId: 29,
    timeId: 14,
  },
  {
    day: "THURSDAY",
    doctorId: 29,
    timeId: 15,
  },
  {
    day: "THURSDAY",
    doctorId: 29,
    timeId: 16,
  },
  {
    day: "MONDAY",
    doctorId: 29,
    timeId: 9,
  },
  {
    day: "MONDAY",
    doctorId: 29,
    timeId: 10,
  },
  {
    day: "MONDAY",
    doctorId: 29,
    timeId: 11,
  },
  {
    day: "MONDAY",
    doctorId: 29,
    timeId: 12,
  },
  {
    day: "MONDAY",
    doctorId: 29,
    timeId: 13,
  },
  {
    day: "MONDAY",
    doctorId: 29,
    timeId: 14,
  },
  {
    day: "MONDAY",
    doctorId: 29,
    timeId: 15,
  },
  {
    day: "MONDAY",
    doctorId: 29,
    timeId: 16,
  },
  {
    day: "TUESDAY",
    doctorId: 29,
    timeId: 9,
  },
  {
    day: "TUESDAY",
    doctorId: 29,
    timeId: 10,
  },
  {
    day: "TUESDAY",
    doctorId: 29,
    timeId: 11,
  },
  {
    day: "TUESDAY",
    doctorId: 29,
    timeId: 12,
  },
  {
    day: "TUESDAY",
    doctorId: 29,
    timeId: 13,
  },
  {
    day: "TUESDAY",
    doctorId: 29,
    timeId: 14,
  },
  {
    day: "TUESDAY",
    doctorId: 29,
    timeId: 15,
  },
  {
    day: "TUESDAY",
    doctorId: 29,
    timeId: 16,
  },
  {
    day: "TUESDAY",
    doctorId: 30,
    timeId: 17,
  },
  {
    day: "TUESDAY",
    doctorId: 30,
    timeId: 18,
  },
  {
    day: "TUESDAY",
    doctorId: 30,
    timeId: 19,
  },
  {
    day: "TUESDAY",
    doctorId: 30,
    timeId: 20,
  },
  {
    day: "TUESDAY",
    doctorId: 30,
    timeId: 21,
  },
  {
    day: "TUESDAY",
    doctorId: 30,
    timeId: 22,
  },
  {
    day: "TUESDAY",
    doctorId: 30,
    timeId: 23,
  },
  {
    day: "TUESDAY",
    doctorId: 30,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 30,
    timeId: 17,
  },
  {
    day: "WEDNESDAY",
    doctorId: 30,
    timeId: 18,
  },
  {
    day: "WEDNESDAY",
    doctorId: 30,
    timeId: 19,
  },
  {
    day: "WEDNESDAY",
    doctorId: 30,
    timeId: 20,
  },
  {
    day: "WEDNESDAY",
    doctorId: 30,
    timeId: 21,
  },
  {
    day: "WEDNESDAY",
    doctorId: 30,
    timeId: 22,
  },
  {
    day: "WEDNESDAY",
    doctorId: 30,
    timeId: 23,
  },
  {
    day: "WEDNESDAY",
    doctorId: 30,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 30,
    timeId: 17,
  },
  {
    day: "FRIDAY",
    doctorId: 30,
    timeId: 18,
  },
  {
    day: "FRIDAY",
    doctorId: 30,
    timeId: 19,
  },
  {
    day: "FRIDAY",
    doctorId: 30,
    timeId: 20,
  },
  {
    day: "FRIDAY",
    doctorId: 30,
    timeId: 21,
  },
  {
    day: "FRIDAY",
    doctorId: 30,
    timeId: 22,
  },
  {
    day: "FRIDAY",
    doctorId: 30,
    timeId: 23,
  },
  {
    day: "FRIDAY",
    doctorId: 30,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 30,
    timeId: 17,
  },
  {
    day: "THURSDAY",
    doctorId: 30,
    timeId: 18,
  },
  {
    day: "THURSDAY",
    doctorId: 30,
    timeId: 19,
  },
  {
    day: "THURSDAY",
    doctorId: 30,
    timeId: 20,
  },
  {
    day: "THURSDAY",
    doctorId: 30,
    timeId: 21,
  },
  {
    day: "THURSDAY",
    doctorId: 30,
    timeId: 22,
  },
  {
    day: "THURSDAY",
    doctorId: 30,
    timeId: 23,
  },
  {
    day: "THURSDAY",
    doctorId: 30,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 30,
    timeId: 17,
  },
  {
    day: "MONDAY",
    doctorId: 30,
    timeId: 18,
  },
  {
    day: "MONDAY",
    doctorId: 30,
    timeId: 19,
  },
  {
    day: "MONDAY",
    doctorId: 30,
    timeId: 20,
  },
  {
    day: "MONDAY",
    doctorId: 30,
    timeId: 21,
  },
  {
    day: "MONDAY",
    doctorId: 30,
    timeId: 22,
  },
  {
    day: "MONDAY",
    doctorId: 30,
    timeId: 23,
  },
  {
    day: "MONDAY",
    doctorId: 30,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 31,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 31,
    timeId: 2,
  },
  {
    day: "WEDNESDAY",
    doctorId: 31,
    timeId: 3,
  },
  {
    day: "WEDNESDAY",
    doctorId: 31,
    timeId: 4,
  },
  {
    day: "WEDNESDAY",
    doctorId: 31,
    timeId: 5,
  },
  {
    day: "WEDNESDAY",
    doctorId: 31,
    timeId: 6,
  },
  {
    day: "WEDNESDAY",
    doctorId: 31,
    timeId: 7,
  },
  {
    day: "WEDNESDAY",
    doctorId: 31,
    timeId: 8,
  },
  {
    day: "TUESDAY",
    doctorId: 31,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 31,
    timeId: 2,
  },
  {
    day: "TUESDAY",
    doctorId: 31,
    timeId: 3,
  },
  {
    day: "TUESDAY",
    doctorId: 31,
    timeId: 4,
  },
  {
    day: "TUESDAY",
    doctorId: 31,
    timeId: 5,
  },
  {
    day: "TUESDAY",
    doctorId: 31,
    timeId: 6,
  },
  {
    day: "TUESDAY",
    doctorId: 31,
    timeId: 7,
  },
  {
    day: "TUESDAY",
    doctorId: 31,
    timeId: 8,
  },
  {
    day: "THURSDAY",
    doctorId: 31,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 31,
    timeId: 2,
  },
  {
    day: "THURSDAY",
    doctorId: 31,
    timeId: 3,
  },
  {
    day: "THURSDAY",
    doctorId: 31,
    timeId: 4,
  },
  {
    day: "THURSDAY",
    doctorId: 31,
    timeId: 5,
  },
  {
    day: "THURSDAY",
    doctorId: 31,
    timeId: 6,
  },
  {
    day: "THURSDAY",
    doctorId: 31,
    timeId: 7,
  },
  {
    day: "THURSDAY",
    doctorId: 31,
    timeId: 8,
  },
  {
    day: "FRIDAY",
    doctorId: 31,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 31,
    timeId: 2,
  },
  {
    day: "FRIDAY",
    doctorId: 31,
    timeId: 3,
  },
  {
    day: "FRIDAY",
    doctorId: 31,
    timeId: 4,
  },
  {
    day: "FRIDAY",
    doctorId: 31,
    timeId: 5,
  },
  {
    day: "FRIDAY",
    doctorId: 31,
    timeId: 6,
  },
  {
    day: "FRIDAY",
    doctorId: 31,
    timeId: 7,
  },
  {
    day: "FRIDAY",
    doctorId: 31,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 31,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 31,
    timeId: 2,
  },
  {
    day: "MONDAY",
    doctorId: 31,
    timeId: 3,
  },
  {
    day: "MONDAY",
    doctorId: 31,
    timeId: 4,
  },
  {
    day: "MONDAY",
    doctorId: 31,
    timeId: 5,
  },
  {
    day: "MONDAY",
    doctorId: 31,
    timeId: 6,
  },
  {
    day: "MONDAY",
    doctorId: 31,
    timeId: 7,
  },
  {
    day: "MONDAY",
    doctorId: 31,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 32,
    timeId: 9,
  },
  {
    day: "MONDAY",
    doctorId: 32,
    timeId: 10,
  },
  {
    day: "MONDAY",
    doctorId: 32,
    timeId: 11,
  },
  {
    day: "MONDAY",
    doctorId: 32,
    timeId: 12,
  },
  {
    day: "MONDAY",
    doctorId: 32,
    timeId: 13,
  },
  {
    day: "MONDAY",
    doctorId: 32,
    timeId: 14,
  },
  {
    day: "MONDAY",
    doctorId: 32,
    timeId: 15,
  },
  {
    day: "MONDAY",
    doctorId: 32,
    timeId: 16,
  },
  {
    day: "TUESDAY",
    doctorId: 32,
    timeId: 9,
  },
  {
    day: "TUESDAY",
    doctorId: 32,
    timeId: 10,
  },
  {
    day: "TUESDAY",
    doctorId: 32,
    timeId: 11,
  },
  {
    day: "TUESDAY",
    doctorId: 32,
    timeId: 12,
  },
  {
    day: "TUESDAY",
    doctorId: 32,
    timeId: 13,
  },
  {
    day: "TUESDAY",
    doctorId: 32,
    timeId: 14,
  },
  {
    day: "TUESDAY",
    doctorId: 32,
    timeId: 15,
  },
  {
    day: "TUESDAY",
    doctorId: 32,
    timeId: 16,
  },
  {
    day: "FRIDAY",
    doctorId: 32,
    timeId: 9,
  },
  {
    day: "FRIDAY",
    doctorId: 32,
    timeId: 10,
  },
  {
    day: "FRIDAY",
    doctorId: 32,
    timeId: 11,
  },
  {
    day: "FRIDAY",
    doctorId: 32,
    timeId: 12,
  },
  {
    day: "FRIDAY",
    doctorId: 32,
    timeId: 13,
  },
  {
    day: "FRIDAY",
    doctorId: 32,
    timeId: 14,
  },
  {
    day: "FRIDAY",
    doctorId: 32,
    timeId: 15,
  },
  {
    day: "FRIDAY",
    doctorId: 32,
    timeId: 16,
  },
  {
    day: "WEDNESDAY",
    doctorId: 32,
    timeId: 9,
  },
  {
    day: "WEDNESDAY",
    doctorId: 32,
    timeId: 10,
  },
  {
    day: "WEDNESDAY",
    doctorId: 32,
    timeId: 11,
  },
  {
    day: "WEDNESDAY",
    doctorId: 32,
    timeId: 12,
  },
  {
    day: "WEDNESDAY",
    doctorId: 32,
    timeId: 13,
  },
  {
    day: "WEDNESDAY",
    doctorId: 32,
    timeId: 14,
  },
  {
    day: "WEDNESDAY",
    doctorId: 32,
    timeId: 15,
  },
  {
    day: "WEDNESDAY",
    doctorId: 32,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 32,
    timeId: 9,
  },
  {
    day: "THURSDAY",
    doctorId: 32,
    timeId: 10,
  },
  {
    day: "THURSDAY",
    doctorId: 32,
    timeId: 11,
  },
  {
    day: "THURSDAY",
    doctorId: 32,
    timeId: 12,
  },
  {
    day: "THURSDAY",
    doctorId: 32,
    timeId: 13,
  },
  {
    day: "THURSDAY",
    doctorId: 32,
    timeId: 14,
  },
  {
    day: "THURSDAY",
    doctorId: 32,
    timeId: 15,
  },
  {
    day: "THURSDAY",
    doctorId: 32,
    timeId: 16,
  },
  {
    day: "MONDAY",
    doctorId: 33,
    timeId: 17,
  },
  {
    day: "MONDAY",
    doctorId: 33,
    timeId: 18,
  },
  {
    day: "MONDAY",
    doctorId: 33,
    timeId: 19,
  },
  {
    day: "MONDAY",
    doctorId: 33,
    timeId: 20,
  },
  {
    day: "MONDAY",
    doctorId: 33,
    timeId: 21,
  },
  {
    day: "MONDAY",
    doctorId: 33,
    timeId: 22,
  },
  {
    day: "MONDAY",
    doctorId: 33,
    timeId: 23,
  },
  {
    day: "MONDAY",
    doctorId: 33,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 33,
    timeId: 17,
  },
  {
    day: "WEDNESDAY",
    doctorId: 33,
    timeId: 18,
  },
  {
    day: "WEDNESDAY",
    doctorId: 33,
    timeId: 19,
  },
  {
    day: "WEDNESDAY",
    doctorId: 33,
    timeId: 20,
  },
  {
    day: "WEDNESDAY",
    doctorId: 33,
    timeId: 21,
  },
  {
    day: "WEDNESDAY",
    doctorId: 33,
    timeId: 22,
  },
  {
    day: "WEDNESDAY",
    doctorId: 33,
    timeId: 23,
  },
  {
    day: "WEDNESDAY",
    doctorId: 33,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 33,
    timeId: 17,
  },
  {
    day: "THURSDAY",
    doctorId: 33,
    timeId: 18,
  },
  {
    day: "THURSDAY",
    doctorId: 33,
    timeId: 19,
  },
  {
    day: "THURSDAY",
    doctorId: 33,
    timeId: 20,
  },
  {
    day: "THURSDAY",
    doctorId: 33,
    timeId: 21,
  },
  {
    day: "THURSDAY",
    doctorId: 33,
    timeId: 22,
  },
  {
    day: "THURSDAY",
    doctorId: 33,
    timeId: 23,
  },
  {
    day: "THURSDAY",
    doctorId: 33,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 33,
    timeId: 17,
  },
  {
    day: "FRIDAY",
    doctorId: 33,
    timeId: 18,
  },
  {
    day: "FRIDAY",
    doctorId: 33,
    timeId: 19,
  },
  {
    day: "FRIDAY",
    doctorId: 33,
    timeId: 20,
  },
  {
    day: "FRIDAY",
    doctorId: 33,
    timeId: 21,
  },
  {
    day: "FRIDAY",
    doctorId: 33,
    timeId: 22,
  },
  {
    day: "FRIDAY",
    doctorId: 33,
    timeId: 23,
  },
  {
    day: "FRIDAY",
    doctorId: 33,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 33,
    timeId: 17,
  },
  {
    day: "TUESDAY",
    doctorId: 33,
    timeId: 18,
  },
  {
    day: "TUESDAY",
    doctorId: 33,
    timeId: 19,
  },
  {
    day: "TUESDAY",
    doctorId: 33,
    timeId: 20,
  },
  {
    day: "TUESDAY",
    doctorId: 33,
    timeId: 21,
  },
  {
    day: "TUESDAY",
    doctorId: 33,
    timeId: 22,
  },
  {
    day: "TUESDAY",
    doctorId: 33,
    timeId: 23,
  },
  {
    day: "TUESDAY",
    doctorId: 33,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 34,
    timeId: 1,
  },
  {
    day: "FRIDAY",
    doctorId: 34,
    timeId: 2,
  },
  {
    day: "FRIDAY",
    doctorId: 34,
    timeId: 3,
  },
  {
    day: "FRIDAY",
    doctorId: 34,
    timeId: 4,
  },
  {
    day: "FRIDAY",
    doctorId: 34,
    timeId: 5,
  },
  {
    day: "FRIDAY",
    doctorId: 34,
    timeId: 6,
  },
  {
    day: "FRIDAY",
    doctorId: 34,
    timeId: 7,
  },
  {
    day: "FRIDAY",
    doctorId: 34,
    timeId: 8,
  },
  {
    day: "THURSDAY",
    doctorId: 34,
    timeId: 1,
  },
  {
    day: "THURSDAY",
    doctorId: 34,
    timeId: 2,
  },
  {
    day: "THURSDAY",
    doctorId: 34,
    timeId: 3,
  },
  {
    day: "THURSDAY",
    doctorId: 34,
    timeId: 4,
  },
  {
    day: "THURSDAY",
    doctorId: 34,
    timeId: 5,
  },
  {
    day: "THURSDAY",
    doctorId: 34,
    timeId: 6,
  },
  {
    day: "THURSDAY",
    doctorId: 34,
    timeId: 7,
  },
  {
    day: "THURSDAY",
    doctorId: 34,
    timeId: 8,
  },
  {
    day: "WEDNESDAY",
    doctorId: 34,
    timeId: 1,
  },
  {
    day: "WEDNESDAY",
    doctorId: 34,
    timeId: 2,
  },
  {
    day: "WEDNESDAY",
    doctorId: 34,
    timeId: 3,
  },
  {
    day: "WEDNESDAY",
    doctorId: 34,
    timeId: 4,
  },
  {
    day: "WEDNESDAY",
    doctorId: 34,
    timeId: 5,
  },
  {
    day: "WEDNESDAY",
    doctorId: 34,
    timeId: 6,
  },
  {
    day: "WEDNESDAY",
    doctorId: 34,
    timeId: 7,
  },
  {
    day: "WEDNESDAY",
    doctorId: 34,
    timeId: 8,
  },
  {
    day: "TUESDAY",
    doctorId: 34,
    timeId: 1,
  },
  {
    day: "TUESDAY",
    doctorId: 34,
    timeId: 2,
  },
  {
    day: "TUESDAY",
    doctorId: 34,
    timeId: 3,
  },
  {
    day: "TUESDAY",
    doctorId: 34,
    timeId: 4,
  },
  {
    day: "TUESDAY",
    doctorId: 34,
    timeId: 5,
  },
  {
    day: "TUESDAY",
    doctorId: 34,
    timeId: 6,
  },
  {
    day: "TUESDAY",
    doctorId: 34,
    timeId: 7,
  },
  {
    day: "TUESDAY",
    doctorId: 34,
    timeId: 8,
  },
  {
    day: "MONDAY",
    doctorId: 34,
    timeId: 1,
  },
  {
    day: "MONDAY",
    doctorId: 34,
    timeId: 2,
  },
  {
    day: "MONDAY",
    doctorId: 34,
    timeId: 3,
  },
  {
    day: "MONDAY",
    doctorId: 34,
    timeId: 4,
  },
  {
    day: "MONDAY",
    doctorId: 34,
    timeId: 5,
  },
  {
    day: "MONDAY",
    doctorId: 34,
    timeId: 6,
  },
  {
    day: "MONDAY",
    doctorId: 34,
    timeId: 7,
  },
  {
    day: "MONDAY",
    doctorId: 34,
    timeId: 8,
  },
  {
    day: "FRIDAY",
    doctorId: 35,
    timeId: 9,
  },
  {
    day: "FRIDAY",
    doctorId: 35,
    timeId: 10,
  },
  {
    day: "FRIDAY",
    doctorId: 35,
    timeId: 11,
  },
  {
    day: "FRIDAY",
    doctorId: 35,
    timeId: 12,
  },
  {
    day: "FRIDAY",
    doctorId: 35,
    timeId: 13,
  },
  {
    day: "FRIDAY",
    doctorId: 35,
    timeId: 14,
  },
  {
    day: "FRIDAY",
    doctorId: 35,
    timeId: 15,
  },
  {
    day: "FRIDAY",
    doctorId: 35,
    timeId: 16,
  },
  {
    day: "TUESDAY",
    doctorId: 35,
    timeId: 9,
  },
  {
    day: "TUESDAY",
    doctorId: 35,
    timeId: 10,
  },
  {
    day: "TUESDAY",
    doctorId: 35,
    timeId: 11,
  },
  {
    day: "TUESDAY",
    doctorId: 35,
    timeId: 12,
  },
  {
    day: "TUESDAY",
    doctorId: 35,
    timeId: 13,
  },
  {
    day: "TUESDAY",
    doctorId: 35,
    timeId: 14,
  },
  {
    day: "TUESDAY",
    doctorId: 35,
    timeId: 15,
  },
  {
    day: "TUESDAY",
    doctorId: 35,
    timeId: 16,
  },
  {
    day: "THURSDAY",
    doctorId: 35,
    timeId: 9,
  },
  {
    day: "THURSDAY",
    doctorId: 35,
    timeId: 10,
  },
  {
    day: "THURSDAY",
    doctorId: 35,
    timeId: 11,
  },
  {
    day: "THURSDAY",
    doctorId: 35,
    timeId: 12,
  },
  {
    day: "THURSDAY",
    doctorId: 35,
    timeId: 13,
  },
  {
    day: "THURSDAY",
    doctorId: 35,
    timeId: 14,
  },
  {
    day: "THURSDAY",
    doctorId: 35,
    timeId: 15,
  },
  {
    day: "THURSDAY",
    doctorId: 35,
    timeId: 16,
  },
  {
    day: "MONDAY",
    doctorId: 35,
    timeId: 9,
  },
  {
    day: "MONDAY",
    doctorId: 35,
    timeId: 10,
  },
  {
    day: "MONDAY",
    doctorId: 35,
    timeId: 11,
  },
  {
    day: "MONDAY",
    doctorId: 35,
    timeId: 12,
  },
  {
    day: "MONDAY",
    doctorId: 35,
    timeId: 13,
  },
  {
    day: "MONDAY",
    doctorId: 35,
    timeId: 14,
  },
  {
    day: "MONDAY",
    doctorId: 35,
    timeId: 15,
  },
  {
    day: "MONDAY",
    doctorId: 35,
    timeId: 16,
  },
  {
    day: "WEDNESDAY",
    doctorId: 35,
    timeId: 9,
  },
  {
    day: "WEDNESDAY",
    doctorId: 35,
    timeId: 10,
  },
  {
    day: "WEDNESDAY",
    doctorId: 35,
    timeId: 11,
  },
  {
    day: "WEDNESDAY",
    doctorId: 35,
    timeId: 12,
  },
  {
    day: "WEDNESDAY",
    doctorId: 35,
    timeId: 13,
  },
  {
    day: "WEDNESDAY",
    doctorId: 35,
    timeId: 14,
  },
  {
    day: "WEDNESDAY",
    doctorId: 35,
    timeId: 15,
  },
  {
    day: "WEDNESDAY",
    doctorId: 35,
    timeId: 16,
  },
];

const timeData = [
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
];
console.log("DB seed...");

async function run() {
  await prisma.time.createMany({ data: timeData });
  await prisma.specialty.createMany({ data: specialtyData });
  await prisma.location.createMany({ data: locationData });
  await prisma.hospital.createMany({ data: hospitalData });
  await prisma.doctor.createMany({ data: doctorData });
  await prisma.doctorSchedule.createMany({ data: doctorScheduleData });
}

run();

// ลำดับการ seed
// 1. location 2. specialty 3. time 4. hospital 5 doctor 6. doctor schedule
// command "npx prisma db seed"
