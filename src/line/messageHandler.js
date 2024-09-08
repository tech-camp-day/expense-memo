const {
  createUser,
  deleteUser,
  saveTransaction,
  getReport,
} = require("../data/db");
const { MESSAGE_LANG } = require("./message");
const { reply } = require("./messageSender");

/**
 * จัดการกับเหตุการณ์ที่เข้ามา, ตรวจสอบประเภทของเหตุการณ์และส่งไปยังฟังก์ชันที่เหมาะสม
 * @param {object} event - อ็อบเจ็กต์เหตุการณ์
 */
function handleEvent(lang) {
  const languages = Object.keys(MESSAGE_LANG);
  if (!languages.includes(lang)) {
    console.warn(`Unknown language: ${lang}, using English as default`);
    lang = "en";
  }

  return (event) => {
    const txt = MESSAGE_LANG[lang];
    switch (event.type) {
      case "message":
        handleMessage(event, txt);
        break;
      case "follow":
        handleFollow(event, txt);
        break;
      case "unfollow":
        handleUnfollow(event);
        break;
      default:
        break;
    }
  };
}

/**
 * จัดการกับเหตุการณ์ 'follow' ส่งข้อความทักทายและสร้างผู้ใช้ในฐานข้อมูล
 * @param {object} event - อ็อบเจ็กต์เหตุการณ์
 */
function handleFollow(event, txt) {
  reply(event, txt.HELLO, txt.HOWTO);
  createUser(event.source.userId);
}

/**
 * จัดการกับเหตุการณ์ 'unfollow' ลบผู้ใช้และรายการจดรายจ่ายออกจากฐานข้อมูล
 * @param {object} event - อ็อบเจ็กต์เหตุการณ์
 */
function handleUnfollow(event) {
  deleteUser(event.source.userId);
}

/**
 * จัดการกับเหตุการณ์ข้อความที่เข้ามา ตรวจสอบคำสั่งและส่งไปยังฟังก์ชันที่เหมาะสม
 * @param {object} event - อ็อบเจ็กต์เหตุการณ์ข้อความ
 */
function handleMessage(event, txt) {
  if (event.type !== "message" || event.message.type !== "text") {
    return;
  }

  const [command] = event.message.text.split(" ");

  switch (command) {
    case txt.NOTE:
      handleSave(event, txt);
      return;
    case txt.REPORT:
      handleReport(event, txt);
      return;
    default:
      reply(event, txt.UNKNOWN_COMMAND, txt.HOWTO);
      return;
  }
}

/**
 * จัดการคำสั่ง "จด" โดยแยกชื่อและจำนวนเงินจากข้อความที่กำหนดและบันทึกธุรกรรม
 * @param {object} event - อ็อบเจ็กต์เหตุการณ์
 */
function handleSave(event, txt) {
  const words = event.message.text.split(" ");
  const transactionName = words.slice(1, -1).join(" ");
  const amount = words.pop();
  const amountNumber = parseFloat(amount);

  const lineUserId = event.source.userId;

  if (isNaN(amountNumber)) {
    reply(event, txt.INCORRECT_AMOUNT);
    return;
  }

  try {
    saveTransaction(lineUserId, transactionName, amountNumber);
    reply(event, txt.SAVE_COMPLETE);
  } catch (error) {
    console.error('Error saving transaction:', error);
    reply(event, txt.SAVE_ERROR);
  }
}

/**
 * จัดการคำสั่ง "รายงาน" และสร้างรายงานของธุรกรรมตามพารามิเตอร์ที่กำหนด
 * @param {Object} event - อ็อบเจ็กต์เหตุการณ์ที่มีข้อความและข้อมูลต้นทาง
 */
function handleReport(event, txt) {
  const words = event.message.text.split(" ");
  const length = Number.parseInt(words[1]);
  const interval = words[2];
  const lineUserId = event.source.userId;
  const intervalTypes = [
    txt.INTERVAL_DAY,
    txt.INTERVAL_MONTH,
    txt.INTERVAL_YEAR,
  ];

  if (words.length !== 3) {
    reply(event, txt.INCORRECT_COMMAND, txt.HOWTO);
    return;
  }

  if (isNaN(length) || length < 1) {
    reply(event, txt.INCORRECT_DATE_LENGTH);
    return;
  }

  if (!intervalTypes.includes(interval)) {
    reply(event, txt.INCORRECT_DATE_INTERVAL);
    return;
  }

  let intervalDbType;
  if (interval === txt.INTERVAL_DAY) {
    intervalDbType = "days";
  } else if (interval === txt.INTERVAL_MONTH) {
    intervalDbType = "months";
  } else {
    intervalDbType = "years";
  }

  const { transactions, totalAmount } = getReport(
    lineUserId,
    length,
    intervalDbType
  );

  let message = txt.REPORT_MESSAGE.replace("{length}", length)
    .replace("{interval}", interval)
    .replace("{transactions}", transactions)
    .replace("{totalAmount}", totalAmount)
    .replace("{totalAmount}", totalAmount);

  reply(event, message);
}

module.exports = { handleEvent };
