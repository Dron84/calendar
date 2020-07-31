/* eslint-disable prettier/prettier */
import { isEmptyObject } from "./index";

export const collisions = (first, second, caption) =>
  ((first === "子" && second === "午") ||
    (first === "丑" && second === "未") ||
    (first === "寅" && second === "申") ||
    (first === "卯" && second === "酉") ||
    (first === "亥" && second === "巳") ||
    (first === "辰" && second === "戌") ||
    (second === "子" && first === "午") ||
    (second === "丑" && first === "未") ||
    (second === "寅" && first === "申") ||
    (second === "卯" && first === "酉") ||
    (second === "亥" && first === "巳") ||
    (second === "辰" && first === "戌")) &&
  `${caption}`;

export const collisionsCaption = calendar => {
  /// столкновения

  const collisionsDont = first => {
    let result;
    first === "午" && (result = "Не подходит для крысы");
    first === "未" && (result = "Не подходит для быка");
    first === "申" && (result = "Не подходит для тигра");
    first === "酉" && (result = "Не подходит для кролика");
    first === "巳" && (result = "Не подходит для свиньи");
    first === "戌" && (result = "Не подходит для дракона");
    first === "子" && (result = "Не подходит для лошади");
    first === "丑" && (result = "Не подходит для козы");
    first === "寅" && (result = "Не подходит для обезъяны");
    first === "卯" && (result = "Не подходит для петуха");
    first === "亥" && (result = "Не подходит для змеи");
    first === "辰" && (result = "Не подходит для собаки");
    return result;
  };

  calendar.map(item => {
    const day_mounth = collisions(
      item.glif.day.ground,
      item.glif.mounth.ground,
      `Столкновение день/месяц`
    );
    const day_year = collisions(
      item.glif.day.ground,
      item.glif.year.ground,
      `Столкновение день/год`
    );
    const mounth_year = collisions(
      item.glif.mounth.ground,
      item.glif.year.ground,
      `Столкновение месяц/год`
    );
    // добавление столкновений
    !isEmptyObject(day_mounth) && item.caption.push(day_mounth);
    !isEmptyObject(day_year) && item.caption.push(day_year);
    !isEmptyObject(mounth_year) && item.caption.push(mounth_year);

    // добавление неподходящих столкновений
    const dayscollisionsDont = collisionsDont(item.glif.day.ground);
    !isEmptyObject(dayscollisionsDont) && item.caption.push(dayscollisionsDont);
  });
  return calendar;
};

export const directCollision = calendar => {
  /// прямое столкновение
  const collisions = (dayTop, dayBottom, checkTop, checkBottom, caption) => {
    let result;
    dayTop === "甲" &&
      dayBottom === "子" &&
      ((checkTop === "戊" && checkBottom === "午") ||
        (checkTop === "壬" && checkBottom === "午")) &&
      (result = `Прямое столкновение ${caption}`);
    dayTop === "丙" &&
      dayBottom === "子" &&
      ((checkTop === "庚" && checkBottom === "午") ||
        (checkTop === "戊" && checkBottom === "午")) &&
      (result = `Прямое столкновение ${caption}`);
    dayTop === "戊" &&
      dayBottom === "子" &&
      ((checkTop === "甲" && checkBottom === "午") ||
        (checkTop === "壬" && checkBottom === "午")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "庚" &&
      dayBottom === "子" &&
      ((checkTop === "甲" && checkBottom === "午") ||
        (checkTop === "丙" && checkBottom === "午")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "壬" &&
      dayBottom === "子" &&
      ((checkTop === "丙" && checkBottom === "午") ||
        (checkTop === "庚" && checkBottom === "午")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "乙" &&
      dayBottom === "丑" &&
      ((checkTop === "癸" && checkBottom === "未") ||
        (checkTop === "己" && checkBottom === "未")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "丁" &&
      dayBottom === "丑" &&
      ((checkTop === "己" && checkBottom === "未") ||
        (checkTop === "辛" && checkBottom === "未")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "己" &&
      dayBottom === "丑" &&
      ((checkTop === "癸" && checkBottom === "未") ||
        (checkTop === "乙" && checkBottom === "未")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "辛" &&
      dayBottom === "丑" &&
      ((checkTop === "乙" && checkBottom === "未") ||
        (checkTop === "丁" && checkBottom === "未")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "癸" &&
      dayBottom === "丑" &&
      ((checkTop === "丁" && checkBottom === "未") ||
        (checkTop === "辛" && checkBottom === "未")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "丙" &&
      dayBottom === "寅" &&
      ((checkTop === "壬" && checkBottom === "申") ||
        (checkTop === "戊" && checkBottom === "申")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "戊" &&
      dayBottom === "寅" &&
      ((checkTop === "壬" && checkBottom === "申") ||
        (checkTop === "甲" && checkBottom === "申")) &&
      (result = `Прямое столкновение ${caption}`);
    dayTop === "庚" &&
      dayBottom === "寅" &&
      ((checkTop === "甲" && checkBottom === "申") ||
        (checkTop === "戊" && checkBottom === "申")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "壬" &&
      dayBottom === "寅" &&
      ((checkTop === "丙" && checkBottom === "申") ||
        (checkTop === "庚" && checkBottom === "申")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "甲" &&
      dayBottom === "寅" &&
      ((checkTop === "丙" && checkBottom === "申") ||
        (checkTop === "戊" && checkBottom === "申")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "丁" &&
      dayBottom === "卯" &&
      ((checkTop === "辛" && checkBottom === "酉") ||
        (checkTop === "癸" && checkBottom === "酉")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "己" &&
      dayBottom === "卯" &&
      ((checkTop === "癸" && checkBottom === "酉") ||
        (checkTop === "乙" && checkBottom === "酉")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "辛" &&
      dayBottom === "卯" &&
      ((checkTop === "己" && checkBottom === "酉") ||
        (checkTop === "乙" && checkBottom === "酉")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "癸" &&
      dayBottom === "卯" &&
      ((checkTop === "丁" && checkBottom === "酉") ||
        (checkTop === "辛" && checkBottom === "酉")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "乙" &&
      dayBottom === "卯" &&
      ((checkTop === "己" && checkBottom === "酉") ||
        (checkTop === "丁" && checkBottom === "酉")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "戊" &&
      dayBottom === "辰" &&
      ((checkTop === "丙" && checkBottom === "戊") ||
        (checkTop === "壬" && checkBottom === "戊")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "庚" &&
      dayBottom === "辰" &&
      ((checkTop === "甲" && checkBottom === "戊") ||
        (checkTop === "戊" && checkBottom === "戊")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "壬" &&
      dayBottom === "辰" &&
      ((checkTop === "丙" && checkBottom === "戊") ||
        (checkTop === "甲" && checkBottom === "戊")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "甲" &&
      dayBottom === "辰" &&
      ((checkTop === "庚" && checkBottom === "戊") ||
        (checkTop === "戊" && checkBottom === "戊")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "丙" &&
      dayBottom === "辰" &&
      ((checkTop === "壬" && checkBottom === "戊") ||
        (checkTop === "庚" && checkBottom === "戊")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "己" &&
      dayBottom === "巳" &&
      ((checkTop === "癸" && checkBottom === "亥") ||
        (checkTop === "丁" && checkBottom === "亥")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "己辛" &&
      dayBottom === "巳" &&
      ((checkTop === "乙" && checkBottom === "亥") ||
        (checkTop === "己" && checkBottom === "亥")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "癸" &&
      dayBottom === "巳" &&
      ((checkTop === "丁" && checkBottom === "亥") ||
        (checkTop === "乙" && checkBottom === "亥")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "乙" &&
      dayBottom === "巳" &&
      ((checkTop === "辛" && checkBottom === "亥") ||
        (checkTop === "己" && checkBottom === "亥")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "丁" &&
      dayBottom === "巳" &&
      ((checkTop === "癸" && checkBottom === "亥") ||
        (checkTop === "辛" && checkBottom === "亥")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "庚" &&
      dayBottom === "午" &&
      ((checkTop === "甲" && checkBottom === "子") ||
        (checkTop === "丙" && checkBottom === "子")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "壬" &&
      dayBottom === "午" &&
      ((checkTop === "丙" && checkBottom === "子") ||
        (checkTop === "庚" && checkBottom === "子")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "甲" &&
      dayBottom === "午" &&
      ((checkTop === "戊" && checkBottom === "子") ||
        (checkTop === "壬" && checkBottom === "子")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "丙" &&
      dayBottom === "午" &&
      ((checkTop === "戊" && checkBottom === "子") ||
        (checkTop === "庚" && checkBottom === "子")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "戊" &&
      dayBottom === "午" &&
      ((checkTop === "甲" && checkBottom === "子") ||
        (checkTop === "壬" && checkBottom === "子")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "辛" &&
      dayBottom === "未" &&
      ((checkTop === "丁" && checkBottom === "丑") ||
        (checkTop === "己" && checkBottom === "丑")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "癸" &&
      dayBottom === "未" &&
      ((checkTop === "丁" && checkBottom === "丑") ||
        (checkTop === "辛" && checkBottom === "丑")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "乙" &&
      dayBottom === "未" &&
      ((checkTop === "癸" && checkBottom === "丑") ||
        (checkTop === "己" && checkBottom === "丑")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "丁" &&
      dayBottom === "未" &&
      ((checkTop === "己" && checkBottom === "丑") ||
        (checkTop === "辛" && checkBottom === "丑")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "己" &&
      dayBottom === "未" &&
      ((checkTop === "癸" && checkBottom === "丑") ||
        (checkTop === "乙" && checkBottom === "丑")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "壬" &&
      dayBottom === "申" &&
      ((checkTop === "丙" && checkBottom === "寅") ||
        (checkTop === "庚" && checkBottom === "寅")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "甲" &&
      dayBottom === "申" &&
      ((checkTop === "丙" && checkBottom === "寅") ||
        (checkTop === "戊" && checkBottom === "寅")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "丙" &&
      dayBottom === "申" &&
      ((checkTop === "壬" && checkBottom === "寅") ||
        (checkTop === "庚" && checkBottom === "寅")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "戊" &&
      dayBottom === "申" &&
      ((checkTop === "壬" && checkBottom === "寅") ||
        (checkTop === "甲" && checkBottom === "寅")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "庚" &&
      dayBottom === "申" &&
      ((checkTop === "甲" && checkBottom === "寅") ||
        (checkTop === "戊" && checkBottom === "寅")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "癸" &&
      dayBottom === "酉" &&
      ((checkTop === "丁" && checkBottom === "卯") ||
        (checkTop === "辛" && checkBottom === "卯")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "乙" &&
      dayBottom === "酉" &&
      ((checkTop === "丁" && checkBottom === "卯") ||
        (checkTop === "己" && checkBottom === "卯")) &&
      (result = `Прямое столкновение ${caption}`);
    dayTop === "丁" &&
      dayBottom === "酉" &&
      ((checkTop === "癸" && checkBottom === "卯") ||
        (checkTop === "辛" && checkBottom === "卯")) &&
      (result = `Прямое столкновение ${caption}`);
    dayTop === "己" &&
      dayBottom === "酉" &&
      ((checkTop === "癸" && checkBottom === "卯") ||
        (checkTop === "乙" && checkBottom === "卯")) &&
      (result = `Прямое столкновение ${caption}`);
    dayTop === "辛" &&
      dayBottom === "酉" &&
      ((checkTop === "乙" && checkBottom === "卯") ||
        (checkTop === "己" && checkBottom === "卯")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "甲" &&
      dayBottom === "戌" &&
      ((checkTop === "戊" && checkBottom === "辰") ||
        (checkTop === "庚" && checkBottom === "辰")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "丙" &&
      dayBottom === "戌" &&
      ((checkTop === "壬" && checkBottom === "辰") ||
        (checkTop === "庚" && checkBottom === "辰")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "戊" &&
      dayBottom === "戌" &&
      ((checkTop === "壬" && checkBottom === "辰") ||
        (checkTop === "丙" && checkBottom === "辰")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "庚" &&
      dayBottom === "戌" &&
      ((checkTop === "甲" && checkBottom === "辰") ||
        (checkTop === "戊" && checkBottom === "辰")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "壬" &&
      dayBottom === "戌" &&
      ((checkTop === "甲" && checkBottom === "辰") ||
        (checkTop === "丙" && checkBottom === "辰")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "乙" &&
      dayBottom === "亥" &&
      ((checkTop === "己" && checkBottom === "巳") ||
        (checkTop === "辛" && checkBottom === "巳")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "丁" &&
      dayBottom === "亥" &&
      ((checkTop === "癸" && checkBottom === "巳") ||
        (checkTop === "辛" && checkBottom === "巳")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "己" &&
      dayBottom === "亥" &&
      ((checkTop === "癸" && checkBottom === "巳") ||
        (checkTop === "丁" && checkBottom === "巳")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "辛" &&
      dayBottom === "亥" &&
      ((checkTop === "乙" && checkBottom === "巳") ||
        (checkTop === "己" && checkBottom === "巳")) &&
      (result = `Прямое столкновение ${caption}`);

    dayTop === "癸" &&
      dayBottom === "亥" &&
      ((checkTop === "乙" && checkBottom === "巳") ||
        (checkTop === "丁" && checkBottom === "巳")) &&
      (result = `Прямое столкновение ${caption}`);

    return result;
  };
  calendar.map(item => {
    const day_mounth = collisions(
      item.glif.day.sky,
      item.glif.day.ground,
      item.glif.mounth.sky,
      item.glif.mounth.ground,
      "день/месяц"
    );
    const day_year = collisions(
      item.glif.day.sky,
      item.glif.day.ground,
      item.glif.year.sky,
      item.glif.year.ground,
      "день/год"
    );
    const mounth_year = collisions(
      item.glif.mounth.sky,
      item.glif.mounth.ground,
      item.glif.year.sky,
      item.glif.year.ground,
      "месяц/год"
    );
    !isEmptyObject(day_mounth) && item.caption.push(day_mounth);
    !isEmptyObject(day_year) && item.caption.push(day_year);
    !isEmptyObject(mounth_year) && item.caption.push(mounth_year);
  });

  return calendar;
};
