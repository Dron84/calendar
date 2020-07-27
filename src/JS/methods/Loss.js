import { isEmptyObject } from "./index";

const getLoss = (mounthGround, day) =>
  (mounthGround === "寅" || mounthGround === "卯" || mounthGround === "辰") &&
  day.sky === "庚" &&
  day.ground === "申"
    ? "Потеря"
    : (mounthGround === "巳" ||
        mounthGround === "午" ||
        mounthGround === "未") &&
      day.sky === "壬" &&
      day.ground === "子"
    ? "Потеря"
    : (mounthGround === "申" ||
        mounthGround === "酉" ||
        mounthGround === "戌") &&
      day.sky === "甲" &&
      day.ground === "寅"
    ? "Потеря"
    : (mounthGround === "亥" ||
        mounthGround === "子" ||
        mounthGround === "丑") &&
      day.sky === "丙" &&
      day.ground === "午"
    ? "Потеря"
    : null;

const fullLoss = (day) =>
  (day.sky === "辛" && day.ground === "酉") ||
  (day.sky === "癸" && day.ground === "亥") ||
  (day.sky === "乙" && day.ground === "卯") ||
  (day.sky === "丁" && day.ground === "巳")
    ? "Истинная потеря"
    : null;

export const Loss = (calendar) => {
  calendar.map((item) => {
    const loss = getLoss(item.glif.mounth.ground, item.glif.day);
    const fullloss = fullLoss(item.glif.day);
    !isEmptyObject(loss) && item.caption.push(loss);
    !isEmptyObject(fullloss) && item.caption.push(fullloss);
  });
  return calendar;
};
