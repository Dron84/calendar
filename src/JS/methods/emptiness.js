export const emptiness = (firstSky, firstGround, secondGround) =>
  (secondGround === "戌" || secondGround === "亥") &&
  ((firstSky === "甲" && firstGround === "子") ||
    (firstSky === "乙" && firstGround === "丑") ||
    (firstSky === "丙" && firstGround === "寅") ||
    (firstSky === "丁" && firstGround === "卯") ||
    (firstSky === "戊" && firstGround === "辰") ||
    (firstSky === "己" && firstGround === "巳") ||
    (firstSky === "庚" && firstGround === "午") ||
    (firstSky === "辛" && firstGround === "未") ||
    (firstSky === "壬" && firstGround === "申") ||
    (firstSky === "癸" && firstGround === "酉"))
    ? true
    : (secondGround === "申" || secondGround === "酉") &&
      ((firstSky === "甲" && firstGround === "戌") ||
        (firstSky === "乙" && firstGround === "亥") ||
        (firstSky === "丙" && firstGround === "子") ||
        (firstSky === "丁" && firstGround === "丑") ||
        (firstSky === "戊" && firstGround === "寅") ||
        (firstSky === "己" && firstGround === "卯") ||
        (firstSky === "庚" && firstGround === "辰") ||
        (firstSky === "辛" && firstGround === "巳") ||
        (firstSky === "壬" && firstGround === "午") ||
        (firstSky === "癸" && firstGround === "未"))
    ? true
    : (secondGround === "午" || secondGround === "未") &&
      ((firstSky === "甲" && firstGround === "申") ||
        (firstSky === "乙" && firstGround === "酉") ||
        (firstSky === "丙" && firstGround === "戌") ||
        (firstSky === "丁" && firstGround === "亥") ||
        (firstSky === "戊" && firstGround === "子") ||
        (firstSky === "己" && firstGround === "丑") ||
        (firstSky === "庚" && firstGround === "寅") ||
        (firstSky === "辛" && firstGround === "卯") ||
        (firstSky === "壬" && firstGround === "辰") ||
        (firstSky === "癸" && firstGround === "巳"))
    ? true
    : (secondGround === "辰" || secondGround === "巳") &&
      ((firstSky === "甲" && firstGround === "午") ||
        (firstSky === "乙" && firstGround === "未") ||
        (firstSky === "丙" && firstGround === "申") ||
        (firstSky === "丁" && firstGround === "酉") ||
        (firstSky === "戊" && firstGround === "戌") ||
        (firstSky === "己" && firstGround === "亥") ||
        (firstSky === "庚" && firstGround === "子") ||
        (firstSky === "辛" && firstGround === "丑") ||
        (firstSky === "壬" && firstGround === "寅") ||
        (firstSky === "癸" && firstGround === "卯"))
    ? true
    : (secondGround === "寅" || secondGround === "卯") &&
      ((firstSky === "甲" && firstGround === "辰") ||
        (firstSky === "乙" && firstGround === "巳") ||
        (firstSky === "丙" && firstGround === "午") ||
        (firstSky === "丁" && firstGround === "未") ||
        (firstSky === "戊" && firstGround === "申") ||
        (firstSky === "己" && firstGround === "酉") ||
        (firstSky === "庚" && firstGround === "戌") ||
        (firstSky === "辛" && firstGround === "亥") ||
        (firstSky === "壬" && firstGround === "子") ||
        (firstSky === "癸" && firstGround === "丑"))
    ? true
    : (secondGround === "子" || secondGround === "丑") &&
      ((firstSky === "甲" && firstGround === "寅") ||
        (firstSky === "乙" && firstGround === "卯") ||
        (firstSky === "丙" && firstGround === "辰") ||
        (firstSky === "丁" && firstGround === "巳") ||
        (firstSky === "戊" && firstGround === "午") ||
        (firstSky === "己" && firstGround === "未") ||
        (firstSky === "庚" && firstGround === "申") ||
        (firstSky === "辛" && firstGround === "酉") ||
        (firstSky === "壬" && firstGround === "戌") ||
        (firstSky === "癸" && firstGround === "亥")) &&
      true;
