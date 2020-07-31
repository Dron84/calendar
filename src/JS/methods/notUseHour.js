export const notUseHour = (daySky, hourSky) =>
  ((daySky === "甲" && hourSky === "庚") ||
    (daySky === "乙" && hourSky === "辛") ||
    (daySky === "丙" && hourSky === "壬") ||
    (daySky === "丁" && hourSky === "癸") ||
    (daySky === "戊" && hourSky === "甲") ||
    (daySky === "己" && hourSky === "乙") ||
    (daySky === "庚" && hourSky === "丙") ||
    (daySky === "辛" && hourSky === "丁") ||
    (daySky === "壬" && hourSky === "戊") ||
    (daySky === "癸" && hourSky === "己")) &&
  true;
