// e.g. 2026年10月21日
export const formatJapaneseDate = (date: Date = new Date()) =>
  `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
