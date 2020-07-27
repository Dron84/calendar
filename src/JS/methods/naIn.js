export const naIn = (stolp) => {
  if (
    (stolp.sky === "戊" && stolp.ground === "子") ||
    (stolp.sky === "己" && stolp.ground === "丑") ||
    (stolp.sky === "丙" && stolp.ground === "寅") ||
    (stolp.sky === "丁" && stolp.ground === "卯") ||
    (stolp.sky === "甲" && stolp.ground === "辰") ||
    (stolp.sky === "乙" && stolp.ground === "巳") ||
    (stolp.sky === "戊" && stolp.ground === "午") ||
    (stolp.sky === "己" && stolp.ground === "未") ||
    (stolp.sky === "丙" && stolp.ground === "申") ||
    (stolp.sky === "丁" && stolp.ground === "酉") ||
    (stolp.sky === "甲" && stolp.ground === "戌") ||
    (stolp.sky === "乙" && stolp.ground === "亥")
  ) {
    return { caption: "火", color: "red" };
  } else if (
    (stolp.sky === "庚" && stolp.ground === "子") ||
    (stolp.sky === "辛" && stolp.ground === "丑") ||
    (stolp.sky === "戊" && stolp.ground === "寅") ||
    (stolp.sky === "己" && stolp.ground === "卯") ||
    (stolp.sky === "丙" && stolp.ground === "辰") ||
    (stolp.sky === "丁" && stolp.ground === "巳") ||
    (stolp.sky === "庚" && stolp.ground === "午") ||
    (stolp.sky === "辛" && stolp.ground === "未") ||
    (stolp.sky === "戊" && stolp.ground === "申") ||
    (stolp.sky === "己" && stolp.ground === "酉") ||
    (stolp.sky === "丙" && stolp.ground === "戌") ||
    (stolp.sky === "丁" && stolp.ground === "亥")
  ) {
    return { caption: "土", color: "brown" };
  } else if (
    (stolp.sky === "甲" && stolp.ground === "子") ||
    (stolp.sky === "乙" && stolp.ground === "丑") ||
    (stolp.sky === "壬" && stolp.ground === "寅") ||
    (stolp.sky === "癸" && stolp.ground === "卯") ||
    (stolp.sky === "庚" && stolp.ground === "辰") ||
    (stolp.sky === "辛" && stolp.ground === "巳") ||
    (stolp.sky === "甲" && stolp.ground === "午") ||
    (stolp.sky === "乙" && stolp.ground === "未") ||
    (stolp.sky === "壬" && stolp.ground === "申") ||
    (stolp.sky === "癸" && stolp.ground === "酉") ||
    (stolp.sky === "庚" && stolp.ground === "戌") ||
    (stolp.sky === "辛" && stolp.ground === "亥")
  ) {
    return { caption: "金", color: "gray" };
  } else if (
    (stolp.sky === "丙" && stolp.ground === "子") ||
    (stolp.sky === "丁" && stolp.ground === "丑") ||
    (stolp.sky === "甲" && stolp.ground === "寅") ||
    (stolp.sky === "乙" && stolp.ground === "卯") ||
    (stolp.sky === "壬" && stolp.ground === "辰") ||
    (stolp.sky === "癸" && stolp.ground === "巳") ||
    (stolp.sky === "丙" && stolp.ground === "午") ||
    (stolp.sky === "丁" && stolp.ground === "未") ||
    (stolp.sky === "甲" && stolp.ground === "申") ||
    (stolp.sky === "乙" && stolp.ground === "酉") ||
    (stolp.sky === "壬" && stolp.ground === "戌") ||
    (stolp.sky === "癸" && stolp.ground === "亥")
  ) {
    return { caption: "水", color: "blue" };
  } else if (
    (stolp.sky === "壬" && stolp.ground === "子") ||
    (stolp.sky === "癸" && stolp.ground === "丑") ||
    (stolp.sky === "庚" && stolp.ground === "寅") ||
    (stolp.sky === "辛" && stolp.ground === "卯") ||
    (stolp.sky === "戊" && stolp.ground === "辰") ||
    (stolp.sky === "己" && stolp.ground === "巳") ||
    (stolp.sky === "壬" && stolp.ground === "午") ||
    (stolp.sky === "癸" && stolp.ground === "未") ||
    (stolp.sky === "庚" && stolp.ground === "申") ||
    (stolp.sky === "辛" && stolp.ground === "酉") ||
    (stolp.sky === "戊" && stolp.ground === "戌") ||
    (stolp.sky === "己" && stolp.ground === "亥")
  ) {
    return { caption: "木", color: "green" };
  }
};
