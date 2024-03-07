/**
 * จัดการกับเหตุการณ์ที่เข้ามา
 * @param {object} event - อ็อบเจ็กต์เหตุการณ์
 */
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }

  console.log(JSON.stringify(event, null, 2));

  const [command, ...args] = event.message.text.split(' ');
  const rest = args.join(' ');
  
  switch (command) {
    case 'จด':
      reply(event, handleSave(rest));
      return;
    default:
      reply(event, 'ไม่เข้าใจคำสั่งจ้า');
      return;
  }
}

/**
 * จัดการคำสั่ง "จด" โดยแยกชื่อและจำนวนเงินจากข้อความที่กำหนดและบันทึกธุรกรรม
 * @param {string} text - ข้อความที่มีชื่อและจำนวนเงินของธุรกรรม
 * @returns {string} - ข้อความที่แสดงผลลัพธ์ของการบันทึก
 */
function handleSave(text) {
  const words = text.split(' ');
  const name = words.slice(0, -1).join(' ');
  const amount = words.pop();
  const amountNumber = parseFloat(amount);
  
  if (isNaN(amountNumber)) {
    return 'จำนวนเงินไม่ถูกต้อง';
  }
  
  try {
    saveTransaction(name, amountNumber);
    return 'บันทึกข้อมูลเรียบร้อย';
  } catch (error) {
    return 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
  }
}

module.exports = { handleEvent };
