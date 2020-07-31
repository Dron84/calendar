//Благородный человек

export const nobleMan = (daySky, hourGround) =>
  (daySky === "甲" || daySky === "戊" || daySky === "庚") &&
  (hourGround === "未" || hourGround === "丑")
    ? true
    : (daySky === "乙" || daySky === "己") &&
      (hourGround === "子" || hourGround === "申")
    ? true
    : (daySky === "丙" || daySky === "丁") &&
      (hourGround === "亥" || hourGround === "酉")
    ? true
    : (daySky === "壬" || daySky === "癸") &&
      (hourGround === "卯" || hourGround === "巳")
    ? true
    : daySky === "辛" && (hourGround === "午" || hourGround === "寅") && true;
