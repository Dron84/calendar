import { findGlifColor } from "./index";
import { naIn } from "./naIn";
import { findFazi } from "./Fazi";

export const CalculateHours = day =>
  day.sky === "甲" || day.sky === "己"
    ? [
        {
          timeCaption: "ранней крысы",
          time: "00.00-01.00",
          number: 1,
          sky: "甲",
          ground: "子",
          ground_color: findGlifColor("子"),
          sky_color: findGlifColor("甲"),
          naIn: naIn({
            sky: "甲",
            ground: "子"
          }),
          fazi: findFazi("甲", "子")
        },
        {
          timeCaption: "быка",
          time: "01.00-03.00",
          number: 3,
          sky: "乙",
          ground: "丑",
          ground_color: findGlifColor("丑"),
          sky_color: findGlifColor("乙"),
          naIn: naIn({
            sky: "乙",
            ground: "丑"
          }),
          fazi: findFazi("乙", "丑")
        },
        {
          timeCaption: "тигра",
          time: "03.00-05.00",
          number: 2,
          sky: "丙",
          ground: "寅",
          ground_color: findGlifColor("寅"),
          sky_color: findGlifColor("丙"),
          naIn: naIn({
            sky: "丙",
            ground: "寅"
          }),
          fazi: findFazi("丙", "寅")
        },
        {
          timeCaption: "кролика",
          time: "05.00-07.00",
          number: 6,
          sky: "丁",
          ground: "卯",
          ground_color: findGlifColor("卯"),
          sky_color: findGlifColor("丁"),
          naIn: naIn({
            sky: "丁",
            ground: "卯"
          }),
          fazi: findFazi("丁", "卯")
        },
        {
          timeCaption: "дракона",
          time: "07.00-09.00",
          number: 9,
          sky: "戊",
          ground: "辰",
          ground_color: findGlifColor("辰"),
          sky_color: findGlifColor("戊"),
          naIn: naIn({
            sky: "戊",
            ground: "辰"
          }),
          fazi: findFazi("戊", "辰")
        },
        {
          timeCaption: "змея",
          time: "09.00-11.00",
          number: 8,
          sky: "己",
          ground: "巳",
          ground_color: findGlifColor("巳"),
          sky_color: findGlifColor("己"),
          naIn: naIn({
            sky: "己",
            ground: "巳"
          }),
          fazi: findFazi("己", "巳")
        },
        {
          timeCaption: "лошади",
          time: "11.00-13.00",
          number: 8,
          sky: "庚",
          ground: "午",
          ground_color: findGlifColor("午"),
          sky_color: findGlifColor("庚"),
          naIn: naIn({
            sky: "庚",
            ground: "午"
          }),
          fazi: findFazi("庚", "午")
        },
        {
          timeCaption: "козы",
          time: "13.00-15.00",
          number: 9,
          sky: "辛",
          ground: "未",
          ground_color: findGlifColor("未"),
          sky_color: findGlifColor("辛"),
          naIn: naIn({
            sky: "辛",
            ground: "未"
          }),
          fazi: findFazi("辛", "未")
        },
        {
          timeCaption: "обезьяна",
          time: "15.00-17.00",
          number: 2,
          sky: "壬",
          ground: "申",
          ground_color: findGlifColor("申"),
          sky_color: findGlifColor("壬"),
          naIn: naIn({
            sky: "壬",
            ground: "申"
          }),
          fazi: findFazi("壬", "申")
        },
        {
          timeCaption: "петуха",
          time: "17.00-19.00",
          number: 4,
          sky: "癸",
          ground: "酉",
          ground_color: findGlifColor("酉"),
          sky_color: findGlifColor("癸"),
          naIn: naIn({
            sky: "癸",
            ground: "酉"
          }),
          fazi: findFazi("癸", "酉")
        },
        {
          timeCaption: "собака",
          time: "19.00-21.00",
          number: 7,
          sky: "甲",
          ground: "戌",
          ground_color: findGlifColor("戌"),
          sky_color: findGlifColor("甲"),
          naIn: naIn({
            sky: "甲",
            ground: "戌"
          }),
          fazi: findFazi("甲", "戌")
        },
        {
          timeCaption: "свинья",
          time: "21.00-23.00",
          number: 3,
          sky: "乙",
          ground: "亥",
          ground_color: findGlifColor("亥"),
          sky_color: findGlifColor("乙"),
          naIn: naIn({
            sky: "乙",
            ground: "亥"
          }),
          fazi: findFazi("乙", "亥")
        },
        {
          timeCaption: "крыса",
          time: "23.00-00.00",
          number: 6,
          sky: "丙",
          ground: "子",
          ground_color: findGlifColor("子"),
          sky_color: findGlifColor("丙"),
          naIn: naIn({
            sky: "丙",
            ground: "子"
          }),
          fazi: findFazi("丙", "子")
        }
      ]
    : day.sky === "乙" || day.sky === "庚"
    ? [
        {
          timeCaption: "ранней крысы",
          time: "00.00-01.00",
          number: 6,
          sky: "丙",
          ground: "子",
          ground_color: findGlifColor("子"),
          sky_color: findGlifColor("丙"),
          naIn: naIn({
            sky: "丙",
            ground: "子"
          }),
          fazi: findFazi("丙", "子")
        },
        {
          timeCaption: "быка",
          time: "01.00-03.00",
          number: 4,
          sky: "丁",
          ground: "丑",
          ground_color: findGlifColor("丑"),
          sky_color: findGlifColor("丁"),
          naIn: naIn({
            sky: "丁",
            ground: "丑"
          }),
          fazi: findFazi("丁", "丑")
        },
        {
          timeCaption: "тигра",
          time: "03.00-05.00",
          number: 8,
          sky: "戊",
          ground: "寅",
          ground_color: findGlifColor("寅"),
          sky_color: findGlifColor("戊"),
          naIn: naIn({
            sky: "戊",
            ground: "寅"
          }),
          fazi: findFazi("戊", "寅")
        },
        {
          timeCaption: "кролика",
          time: "05.00-07.00",
          number: 7,
          sky: "己",
          ground: "卯",
          ground_color: findGlifColor("卯"),
          sky_color: findGlifColor("己"),
          naIn: naIn({
            sky: "己",
            ground: "卯"
          }),
          fazi: findFazi("己", "卯")
        },
        {
          timeCaption: "дракона",
          time: "07.00-09.00",
          number: 1,
          sky: "庚",
          ground: "辰",
          ground_color: findGlifColor("辰"),
          sky_color: findGlifColor("庚"),
          naIn: naIn({
            sky: "庚",
            ground: "辰"
          }),
          fazi: findFazi("庚", "辰")
        },
        {
          timeCaption: "змея",
          time: "09.00-11.00",
          number: 3,
          sky: "辛",
          ground: "巳",
          ground_color: findGlifColor("巳"),
          sky_color: findGlifColor("辛"),
          naIn: naIn({
            sky: "辛",
            ground: "巳"
          }),
          fazi: findFazi("辛", "巳")
        },
        {
          timeCaption: "лошади",
          time: "11.00-13.00",
          number: 2,
          sky: "壬",
          ground: "午",
          ground_color: findGlifColor("午"),
          sky_color: findGlifColor("壬"),
          naIn: naIn({
            sky: "壬",
            ground: "午"
          }),
          fazi: findFazi("壬", "午")
        },
        {
          timeCaption: "козы",
          time: "13.00-15.00",
          number: 4,
          sky: "癸",
          ground: "未",
          ground_color: findGlifColor("未"),
          sky_color: findGlifColor("癸"),
          naIn: naIn({
            sky: "癸",
            ground: "未"
          }),
          fazi: findFazi("癸", "未")
        },
        {
          timeCaption: "обезьяна",
          time: "15.00-17.00",
          number: 3,
          sky: "甲",
          ground: "申",
          ground_color: findGlifColor("申"),
          sky_color: findGlifColor("甲"),
          naIn: naIn({
            sky: "甲",
            ground: "申"
          }),
          fazi: findFazi("甲", "申")
        },
        {
          timeCaption: "петуха",
          time: "17.00-19.00",
          number: 9,
          sky: "乙",
          ground: "酉",
          ground_color: findGlifColor("酉"),
          sky_color: findGlifColor("乙"),
          naIn: naIn({
            sky: "乙",
            ground: "酉"
          }),
          fazi: findFazi("乙", "酉")
        },
        {
          timeCaption: "собака",
          time: "19.00-21.00",
          number: 6,
          sky: "丙",
          ground: "戌",
          ground_color: findGlifColor("戌"),
          sky_color: findGlifColor("丙"),
          naIn: naIn({
            sky: "丙",
            ground: "戌"
          }),
          fazi: findFazi("丙", "戌")
        },
        {
          timeCaption: "свинья",
          time: "21.00-23.00",
          number: 8,
          sky: "丁",
          ground: "亥",
          ground_color: findGlifColor("亥"),
          sky_color: findGlifColor("丁"),
          naIn: naIn({
            sky: "丁",
            ground: "亥"
          }),
          fazi: findFazi("丁", "亥")
        },
        {
          timeCaption: "крыса",
          time: "23.00-00.00",
          number: 7,
          sky: "戊",
          ground: "子",
          ground_color: findGlifColor("子"),
          sky_color: findGlifColor("戊"),
          naIn: naIn({
            sky: "戊",
            ground: "子"
          }),
          fazi: findFazi("戊", "子")
        }
      ]
    : day.sky === "辛" || day.sky === "丙"
    ? [
        {
          timeCaption: "ранней крысы",
          time: "00.00-01.00",
          number: 7,
          sky: "戊",
          ground: "子",
          ground_color: findGlifColor("子"),
          sky_color: findGlifColor("戊"),
          naIn: naIn({
            sky: "戊",
            ground: "子"
          }),
          fazi: findFazi("戊", "子")
        },
        {
          timeCaption: "быка",
          time: "01.00-03.00",
          number: 9,
          sky: "己",
          ground: "丑",
          ground_color: findGlifColor("丑"),
          sky_color: findGlifColor("己"),
          naIn: naIn({
            sky: "己",
            ground: "丑"
          }),
          fazi: findFazi("己", "丑")
        },
        {
          timeCaption: "тигра",
          time: "03.00-05.00",
          number: 3,
          sky: "庚",
          ground: "寅",
          ground_color: findGlifColor("寅"),
          sky_color: findGlifColor("庚"),
          naIn: naIn({
            sky: "庚",
            ground: "寅"
          }),
          fazi: findFazi("庚", "寅")
        },
        {
          timeCaption: "кролика",
          time: "05.00-07.00",
          number: 2,
          sky: "辛",
          ground: "卯",
          ground_color: findGlifColor("卯"),
          sky_color: findGlifColor("辛"),
          naIn: naIn({
            sky: "辛",
            ground: "卯"
          }),
          fazi: findFazi("辛", "卯")
        },
        {
          timeCaption: "дракона",
          time: "07.00-09.00",
          number: 6,
          sky: "壬",
          ground: "辰",
          ground_color: findGlifColor("辰"),
          sky_color: findGlifColor("壬"),
          naIn: naIn({
            sky: "壬",
            ground: "辰"
          }),
          fazi: findFazi("壬", "辰")
        },
        {
          timeCaption: "змея",
          time: "09.00-11.00",
          number: 4,
          sky: "癸",
          ground: "巳",
          ground_color: findGlifColor("巳"),
          sky_color: findGlifColor("癸"),
          naIn: naIn({
            sky: "癸",
            ground: "巳"
          }),
          fazi: findFazi("癸", "巳")
        },
        {
          timeCaption: "лошади",
          time: "11.00-13.00",
          number: 9,
          sky: "甲",
          ground: "午",
          ground_color: findGlifColor("午"),
          sky_color: findGlifColor("甲"),
          naIn: naIn({
            sky: "甲",
            ground: "午"
          }),
          fazi: findFazi("甲", "午")
        },
        {
          timeCaption: "козы",
          time: "13.00-15.00",
          number: 7,
          sky: "乙",
          ground: "未",
          ground_color: findGlifColor("未"),
          sky_color: findGlifColor("乙"),
          naIn: naIn({
            sky: "乙",
            ground: "未"
          }),
          fazi: findFazi("乙", "未")
        },
        {
          timeCaption: "обезьяна",
          time: "15.00-17.00",
          number: 8,
          sky: "丙",
          ground: "申",
          ground_color: findGlifColor("申"),
          sky_color: findGlifColor("丙"),
          naIn: naIn({
            sky: "丙",
            ground: "申"
          }),
          fazi: findFazi("丙", "申")
        },
        {
          timeCaption: "петуха",
          time: "17.00-19.00",
          number: 4,
          sky: "丁",
          ground: "酉",
          ground_color: findGlifColor("酉"),
          sky_color: findGlifColor("丁"),
          naIn: naIn({
            sky: "丁",
            ground: "酉"
          }),
          fazi: findFazi("丁", "酉")
        },
        {
          timeCaption: "собака",
          time: "19.00-21.00",
          number: 1,
          sky: "戊",
          ground: "戌",
          ground_color: findGlifColor("戌"),
          sky_color: findGlifColor("戊"),
          naIn: naIn({
            sky: "戊",
            ground: "戌"
          }),
          fazi: findFazi("戊", "戌")
        },
        {
          timeCaption: "свинья",
          time: "21.00-23.00",
          number: 2,
          sky: "己",
          ground: "亥",
          ground_color: findGlifColor("亥"),
          sky_color: findGlifColor("己"),
          naIn: naIn({
            sky: "己",
            ground: "亥"
          }),
          fazi: findFazi("己", "亥")
        },
        {
          timeCaption: "крыса",
          time: "23.00-00.00",
          number: 2,
          sky: "庚",
          ground: "子",
          ground_color: findGlifColor("子"),
          sky_color: findGlifColor("庚"),
          naIn: naIn({
            sky: "庚",
            ground: "子"
          }),
          fazi: findFazi("庚", "子")
        }
      ]
    : day.sky === "丁" || day.sky === "壬"
    ? [
        {
          timeCaption: "ранней крысы",
          time: "00.00-01.00",
          number: 2,
          sky: "庚",
          ground: "子",
          ground_color: findGlifColor("子"),
          sky_color: findGlifColor("庚"),
          naIn: naIn({
            sky: "庚",
            ground: "子"
          }),
          fazi: findFazi("庚", "子")
        },
        {
          timeCaption: "быка",
          time: "01.00-03.00",
          number: 1,
          sky: "辛",
          ground: "丑",
          ground_color: findGlifColor("丑"),
          sky_color: findGlifColor("辛"),
          naIn: naIn({
            sky: "辛",
            ground: "丑"
          }),
          fazi: findFazi("辛", "丑")
        },
        {
          timeCaption: "тигра",
          time: "03.00-05.00",
          number: 9,
          sky: "壬",
          ground: "寅",
          ground_color: findGlifColor("寅"),
          sky_color: findGlifColor("壬"),
          naIn: naIn({
            sky: "壬",
            ground: "寅"
          }),
          fazi: findFazi("壬", "寅")
        },
        {
          timeCaption: "кролика",
          time: "05.00-07.00",
          number: 8,
          sky: "癸",
          ground: "卯",
          ground_color: findGlifColor("卯"),
          sky_color: findGlifColor("癸"),
          naIn: naIn({
            sky: "癸",
            ground: "卯"
          }),
          fazi: findFazi("癸", "卯")
        },
        {
          timeCaption: "дракона",
          time: "07.00-09.00",
          number: 3,
          sky: "甲",
          ground: "辰",
          ground_color: findGlifColor("辰"),
          sky_color: findGlifColor("甲"),
          naIn: naIn({
            sky: "甲",
            ground: "辰"
          }),
          fazi: findFazi("甲", "辰")
        },
        {
          timeCaption: "змея",
          time: "09.00-11.00",
          number: 7,
          sky: "乙",
          ground: "巳",
          ground_color: findGlifColor("巳"),
          sky_color: findGlifColor("乙"),
          naIn: naIn({
            sky: "乙",
            ground: "巳"
          }),
          fazi: findFazi("乙", "巳")
        },
        {
          timeCaption: "лошади",
          time: "11.00-13.00",
          number: 4,
          sky: "丙",
          ground: "午",
          ground_color: findGlifColor("午"),
          sky_color: findGlifColor("丙"),
          naIn: naIn({
            sky: "丙",
            ground: "午"
          }),
          fazi: findFazi("丙", "午")
        },
        {
          timeCaption: "козы",
          time: "13.00-15.00",
          number: 6,
          sky: "丁",
          ground: "未",
          ground_color: findGlifColor("未"),
          sky_color: findGlifColor("丁"),
          naIn: naIn({
            sky: "丁",
            ground: "未"
          }),
          fazi: findFazi("丁", "未")
        },
        {
          timeCaption: "обезьяна",
          time: "15.00-17.00",
          number: 2,
          sky: "戊",
          ground: "申",
          ground_color: findGlifColor("申"),
          sky_color: findGlifColor("戊"),
          naIn: naIn({
            sky: "戊",
            ground: "申"
          }),
          fazi: findFazi("戊", "申")
        },
        {
          timeCaption: "петуха",
          time: "17.00-19.00",
          number: 3,
          sky: "己",
          ground: "酉",
          ground_color: findGlifColor("酉"),
          sky_color: findGlifColor("己"),
          naIn: naIn({
            sky: "己",
            ground: "酉"
          }),
          fazi: findFazi("己", "酉")
        },
        {
          timeCaption: "собака",
          time: "19.00-21.00",
          number: 9,
          sky: "庚",
          ground: "戌",
          ground_color: findGlifColor("戌"),
          sky_color: findGlifColor("庚"),
          naIn: naIn({
            sky: "庚",
            ground: "戌"
          }),
          fazi: findFazi("庚", "戌")
        },
        {
          timeCaption: "свинья",
          time: "21.00-23.00",
          number: 7,
          sky: "辛",
          ground: "亥",
          ground_color: findGlifColor("亥"),
          sky_color: findGlifColor("辛"),
          naIn: naIn({
            sky: "辛",
            ground: "亥"
          }),
          fazi: findFazi("辛", "亥")
        },
        {
          timeCaption: "крыса",
          time: "23.00-00.00",
          number: 8,
          sky: "壬",
          ground: "子",
          ground_color: findGlifColor("子"),
          sky_color: findGlifColor("壬"),
          naIn: naIn({
            sky: "壬",
            ground: "子"
          }),
          fazi: findFazi("壬", "子")
        }
      ]
    : (day.sky === "戊" || day.sky === "癸") && [
        {
          timeCaption: "ранней крысы",
          time: "00.00-01.00",
          number: 8,
          sky: "壬",
          ground: "子",
          ground_color: findGlifColor("子"),
          sky_color: findGlifColor("壬"),
          naIn: naIn({
            sky: "壬",
            ground: "子"
          }),
          fazi: findFazi("壬", "子")
        },
        {
          timeCaption: "быка",
          time: "01.00-03.00",
          number: 6,
          sky: "癸",
          ground: "丑",
          ground_color: findGlifColor("丑"),
          sky_color: findGlifColor("癸"),
          naIn: naIn({
            sky: "癸",
            ground: "丑"
          }),
          fazi: findFazi("癸", "丑")
        },
        {
          timeCaption: "тигра",
          time: "03.00-05.00",
          number: 7,
          sky: "甲",
          ground: "寅",
          ground_color: findGlifColor("寅"),
          sky_color: findGlifColor("甲"),
          naIn: naIn({
            sky: "甲",
            ground: "寅"
          }),
          fazi: findFazi("甲", "寅")
        },
        {
          timeCaption: "кролика",
          time: "05.00-07.00",
          number: 1,
          sky: "乙",
          ground: "卯",
          ground_color: findGlifColor("卯"),
          sky_color: findGlifColor("乙"),
          naIn: naIn({
            sky: "乙",
            ground: "卯"
          }),
          fazi: findFazi("乙", "卯")
        },
        {
          timeCaption: "дракона",
          time: "07.00-09.00",
          number: 4,
          sky: "丙",
          ground: "辰",
          ground_color: findGlifColor("辰"),
          sky_color: findGlifColor("丙"),
          naIn: naIn({
            sky: "丙",
            ground: "辰"
          }),
          fazi: findFazi("丙", "辰")
        },
        {
          timeCaption: "змея",
          time: "09.00-11.00",
          number: 2,
          sky: "丁",
          ground: "巳",
          ground_color: findGlifColor("巳"),
          sky_color: findGlifColor("丁"),
          naIn: naIn({
            sky: "丁",
            ground: "巳"
          }),
          fazi: findFazi("丁", "巳")
        },
        {
          timeCaption: "лошади",
          time: "11.00-13.00",
          number: 3,
          sky: "戊",
          ground: "午",
          ground_color: findGlifColor("午"),
          sky_color: findGlifColor("戊"),
          naIn: naIn({
            sky: "戊",
            ground: "午"
          }),
          fazi: findFazi("戊", "午")
        },
        {
          timeCaption: "козы",
          time: "13.00-15.00",
          number: 1,
          sky: "己",
          ground: "未",
          ground_color: findGlifColor("未"),
          sky_color: findGlifColor("己"),
          naIn: naIn({
            sky: "己",
            ground: "未"
          }),
          fazi: findFazi("己", "未")
        },
        {
          timeCaption: "обезьяна",
          time: "15.00-17.00",
          number: 7,
          sky: "庚",
          ground: "申",
          ground_color: findGlifColor("申"),
          sky_color: findGlifColor("庚"),
          naIn: naIn({
            sky: "庚",
            ground: "申"
          }),
          fazi: findFazi("庚", "申")
        },
        {
          timeCaption: "петуха",
          time: "17.00-19.00",
          number: 8,
          sky: "辛",
          ground: "酉",
          ground_color: findGlifColor("酉"),
          sky_color: findGlifColor("辛"),
          naIn: naIn({
            sky: "辛",
            ground: "酉"
          }),
          fazi: findFazi("辛", "酉")
        },
        {
          timeCaption: "собака",
          time: "19.00-21.00",
          number: 4,
          sky: "壬",
          ground: "戌",
          ground_color: findGlifColor("戌"),
          sky_color: findGlifColor("壬"),
          naIn: naIn({
            sky: "壬",
            ground: "戌"
          }),
          fazi: findFazi("壬", "戌")
        },
        {
          timeCaption: "свинья",
          time: "21.00-23.00",
          number: 6,
          sky: "癸",
          ground: "亥",
          ground_color: findGlifColor("亥"),
          sky_color: findGlifColor("癸"),
          naIn: naIn({
            sky: "癸",
            ground: "亥"
          }),
          fazi: findFazi("癸", "亥")
        },
        {
          timeCaption: "крыса",
          time: "23.00-00.00",
          number: 1,
          sky: "甲",
          ground: "子",
          ground_color: findGlifColor("子"),
          sky_color: findGlifColor("甲"),
          naIn: naIn({
            sky: "甲",
            ground: "子"
          }),
          fazi: findFazi("甲", "子")
        }
      ];
