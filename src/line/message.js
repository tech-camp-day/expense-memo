export const MESSAGE_LANG = {
  th: {
    HELLO: 'สวัสดีครับ ให้ผมช่วยจดรายจ่ายให้คุณนะครับ',
    HOWTO: `วิธีใช้บอท
1. พิมพ์ "จด" ตามด้วยชื่อรายการและจำนวนเงินที่จ่ายไป เช่น "จด อาหาร 100" หรือ "จด ขนม ของใช้ 500"
2. พิมพ์ "รายงาน" ตามด้วยจำนวนวันที่ต้องการดูย้อนหลังและช่วงเวลาที่ต้องการดูย้อนหลัง เช่น "รายงาน 7 วัน" หรือ "รายงาน 1 เดือน"`,
    NOTE: 'จด',
    REPORT: 'รายงาน',
    INCORRECT_AMOUNT: 'จำนวนเงินไม่ถูกต้อง',
    UNKNOWN_COMMAND: 'ไม่เข้าใจคำสั่งจ้า',
    INCORRECT_COMMAND: 'คำสั่งไม่ถูกต้อง',
    SAVE_COMPLETE: 'บันทึกข้อมูลเรียบร้อย',
    SAVE_ERROR: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
    INCORRECT_DATE_LENGTH: 'ระยะเวลาไม่ถูกต้อง ระบุเป็นจำนวนเต็มบวกได้เท่านั้น',
    INCORRECT_DATE_INTERVAL: 'ช่วงเวลาไม่ถูกต้อง ระบุเป็น "วัน", "เดือน", หรือ "ปี" ได้เท่านั้น',
    REPORT_MESSAGE:  `รายงานธุรกรรมย้อนหลัง {length} {interval} ที่ผ่านมา
    จำนวนธุรกรรม: {transactions}
    ยอดเงินรวม: {totalAmount} บาท`,
    INTERVAL_DAY: 'วัน',
    INTERVAL_MONTH: 'เดือน',
    INTERVAL_YEAR: 'ปี'
  },
  en: {
    HELLO: 'Hello, I can help you record your expenses',
    HOWTO: `How to use the bot
1. Type "note" followed by the name of the item and the amount you spent, e.g. "note food 100" or "note snacks and supplies 500"
2. Type "report" followed by the number of days you want to look back and the time interval you want to look back, e.g. "report 7 days" or "report 1 month"`,
    NOTE: 'note',
    REPORT: 'report',
    INCORRECT_AMOUNT: 'Incorrect amount',
    UNKNOWN_COMMAND: 'Unknown command',
    INCORRECT_COMMAND: 'Incorrect command',
    SAVE_COMPLETE: 'Data saved successfully',
    SAVE_ERROR: 'An error occurred while saving data',
    INCORRECT_DATE_LENGTH: 'Incorrect time period. Specify only positive integers',
    INCORRECT_DATE_INTERVAL: 'Incorrect time interval. Specify only "days", "months", or "years"',
    REPORT_MESSAGE:  `Report of transactions for the past {length} {interval}
    Number of transactions: {transactions}
    Total amount: {totalAmount} baht`,
    INTERVAL_DAY: 'days',
    INTERVAL_MONTH: 'months',
    INTERVAL_YEAR: 'years'
  }
}