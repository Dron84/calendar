import { isEmptyObject } from "./index";

export const SHA = (calendar) => {
  //Поиск ША

  const findSHA = (firstGroung, secondGround, caption) => {
    let result;
    firstGroung === "寅" && secondGround === "亥"
      ? (result = `Ша ограбление ${caption}`)
      : firstGroung === "寅" && secondGround === "子"
      ? (result = `Ша несчастья ${caption}`)
      : firstGroung === "寅" &&
        secondGround === "丑" &&
        (result = `Ша задержки ${caption}`);

    firstGroung === "卯" && secondGround === "申"
      ? (result = `Ша ограбление ${caption}`)
      : firstGroung === "卯" && secondGround === "酉"
      ? (result = `Ша несчастья ${caption}`)
      : firstGroung === "卯" &&
        secondGround === "戌" &&
        (result = `Ша задержки ${caption}`);

    firstGroung === "辰" && secondGround === "巳"
      ? (result = `Ша ограбление ${caption}`)
      : firstGroung === "辰" && secondGround === "午"
      ? (result = `Ша несчастья ${caption}`)
      : firstGroung === "辰" &&
        secondGround === "未" &&
        (result = `Ша задержки ${caption}`);

    firstGroung === "巳" && secondGround === "寅"
      ? (result = `Ша ограбление ${caption}`)
      : firstGroung === "巳" && secondGround === "卯"
      ? (result = `Ша несчастья ${caption}`)
      : firstGroung === "巳" &&
        secondGround === "辰" &&
        (result = `Ша задержки ${caption}`);

    firstGroung === "午" && secondGround === "亥"
      ? (result = `Ша ограбление ${caption}`)
      : firstGroung === "午" && secondGround === "子"
      ? (result = `Ша несчастья ${caption}`)
      : firstGroung === "午" &&
        secondGround === "丑" &&
        (result = `Ша задержки ${caption}`);

    firstGroung === "未" && secondGround === "申"
      ? (result = `Ша ограбление ${caption}`)
      : firstGroung === "未" && secondGround === "酉"
      ? (result = `Ша несчастья ${caption}`)
      : firstGroung === "未" &&
        secondGround === "戌" &&
        (result = `Ша задержки ${caption}`);

    firstGroung === "申" && secondGround === "巳"
      ? (result = `Ша ограбление ${caption}`)
      : firstGroung === "申" && secondGround === "午"
      ? (result = `Ша несчастья ${caption}`)
      : firstGroung === "申" &&
        secondGround === "未" &&
        (result = `Ша задержки ${caption}`);

    firstGroung === "酉" && secondGround === "寅"
      ? (result = `Ша ограбление ${caption}`)
      : firstGroung === "酉" && secondGround === "卯"
      ? (result = `Ша несчастья ${caption}`)
      : firstGroung === "酉" &&
        secondGround === "辰" &&
        (result = `Ша задержки ${caption}`);

    firstGroung === "戌" && secondGround === "亥"
      ? (result = `Ша ограбление ${caption}`)
      : firstGroung === "戌" && secondGround === "子"
      ? (result = `Ша несчастья ${caption}`)
      : firstGroung === "戌" &&
        secondGround === "丑" &&
        (result = `Ша задержки ${caption}`);

    firstGroung === "亥" && secondGround === "申"
      ? (result = `Ша ограбление ${caption}`)
      : firstGroung === "亥" && secondGround === "酉"
      ? (result = `Ша несчастья ${caption}`)
      : firstGroung === "亥" &&
        secondGround === "戌" &&
        (result = `Ша задержки ${caption}`);

    firstGroung === "子" && secondGround === "巳"
      ? (result = `Ша ограбление ${caption}`)
      : firstGroung === "子" && secondGround === "午"
      ? (result = `Ша несчастья ${caption}`)
      : firstGroung === "子" &&
        secondGround === "未" &&
        (result = `Ша задержки ${caption}`);

    firstGroung === "丑" && secondGround === "寅"
      ? (result = `Ша ограбление ${caption}`)
      : firstGroung === "丑" && secondGround === "卯"
      ? (result = `Ша несчастья ${caption}`)
      : firstGroung === "丑" &&
        secondGround === "辰" &&
        (result = `Ша задержки ${caption}`);

    return result;
  };
  calendar.map((item) => {
    const year = findSHA(item.glif.year.ground, item.glif.day.ground, "года");
    const mounth = findSHA(
      item.glif.mounth.ground,
      item.glif.day.ground,
      "месяца"
    );
    !isEmptyObject(mounth) && item.caption.push(mounth);
    !isEmptyObject(year) && item.caption.push(year);
  });
  return calendar;
};
