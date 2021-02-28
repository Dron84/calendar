import { isEmptyObject } from "./index";

const getWealth = (day, year) =>
  year >= 1984 && year <= 1993 && day.sky === "壬" && day.ground === "申"
    ? "День без богатства"
    : year >= 1994 &&
      year <= 2003 &&
      ((day.sky === "庚" && day.ground === "辰") ||
        (day.sky === "辛" && day.ground === "巳"))
    ? "День без богатства"
    : year >= 2004 &&
      year <= 2013 &&
      ((day.sky === "丁" && day.ground === "亥") ||
        (day.sky === "己" && day.ground === "丑"))
    ? "День без богатства"
    : year >= 2014 &&
      year <= 2023 &&
      ((day.sky === "丙" && day.ground === "申") ||
        (day.sky === "戊" && day.ground === "戌"))
    ? "День без богатства"
    : year >= 2024 &&
      year <= 2033 &&
      ((day.sky === "甲" && day.ground === "辰") ||
        (day.sky === "乙" && day.ground === "巳"))
    ? "День без богатства"
    : year >= 2034 && year <= 2043 && day.sky === "癸" && day.ground === "亥"
    ? "День без богатства"
    : null;

export const whitOutWealth = (calendar, year) => {
  calendar.map(item => {
    const wealth = getWealth(item.glif.day, year);
    !isEmptyObject(wealth) && item.caption.push(wealth);
  });
  return calendar;
};
