<template>
  <div class="calendar">
    <div class="header">
      <div class="logo">
        <img src="https://nadezhda-kalinina.com/img/icon/logo.svg" />
      </div>
      <div class="info">
        <h1>Китайский календарь. Выбор дат. Энергии часа, дня, месяца и года.</h1>
        <dates v-model="date" />
      </div>
    </div>

    <div class="wrapper">
      <aside>
        <div class="year white_bg sideMargin">
          <ieroglifs :block="{ ...getBacziYear(15) }" :ieroglifOnly="true" />
        </div>
        <div class="mounthCaption">
          <div class="caption">{{ mounthCaption() }}</div>
        </div>
      </aside>
      <header>
        <span v-for="day in Array.from(daysTitle)" :key="day.index">{{ day.nameRu }}</span>
      </header>

      <calendarDay :calendar="generateCalendar()" :weekDay="weekDay" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import dates from "../components/dates";
import bacziData from "../JS/bacziData";
import ieroglifs from "../components/ieroglifs";
import calendarDay from "../components/calendarDay";
import mounthBegin from "../JS/mounthbegin";

const mounth = Number(moment().format("MM"));
const year = Number(moment().format("YYYY"));

export default {
  name: "calendar",
  components: { dates, calendarDay, ieroglifs },
  data: () => ({
    miss: null,
    date: {
      mounth,
      year
    },
    daysTitle: [
      { nameEng: "Mon", nameRu: "ПН", index: 1 },
      { nameEng: "Tue", nameRu: "ВТ", index: 2 },
      { nameEng: "Wed", nameRu: "СР", index: 3 },
      { nameEng: "Thu", nameRu: "ЧТ", index: 4 },
      { nameEng: "Fri", nameRu: "ПТ", index: 5 },
      { nameEng: "Sat", nameRu: "СБ", index: 6 },
      { nameEng: "Sun", nameRu: "ВС", index: 7 }
    ],
    bacziData,
    mounthBegin
  }),
  methods: {
    findDayFirstDayInMounth() {
      const dayCalibration = 17;
      const oneDayMsec = 24 * 3600;
      const oneD = moment("1970/01/01").unix();
      const TwoD = moment(`${this.date.year}/${this.date.mounth}/01`).unix();
      let day = (Number(TwoD) - Number(oneD)) / Number(oneDayMsec);
      let operand;
      let days;
      if (day < 0) {
        operand = "-";
        day = day * -1;
      } else {
        operand = "+";
      }
      let step = day / 60;

      for (let i = 0; i < Math.floor(step); i++) {
        day = day - 60;
      }
      if (operand == "-") {
        days = dayCalibration - day;
        if (days < 0) {
          days = 60 + days;
        }
      } else if (operand == "+") {
        days = dayCalibration + day;
        if (days > 59) {
          days = days - 60;
        }
      }
      return days;
    },
    getBacziMount(i) {
      const getMountCorrection = (
        yearDate,
        mounthDate,
        February = false,
        yearCorection = null
      ) => {
        const year =
          yearCorection !== null ? yearDate - yearCorection : yearDate;
        const beginMounth = Number(
          this.mounthBegin[year][mounthDate].begin_date.match(/(\d+)\.\d+/)[1]
        );
        return i < beginMounth
          ? Number(
              (February
                ? this.mounthBegin[year - 1][12]
                : this.mounthBegin[year][mounthDate - 1]
              ).mounth_correction
            )
          : Number(this.mounthBegin[year][mounthDate].mounth_correction);
      };

      const MounthBegin =
        this.date.mounth === 1
          ? this.mounthBegin[this.date.year - 1][12].begin_date
          : this.mounthBegin[this.date.year][this.date.mounth - 1].begin_date;
      return {
        ...this.bacziData.filter(
          item =>
            Number(item.id) ===
            (this.date.mounth === 1
              ? getMountCorrection(this.date.year, 12, false, 1)
              : this.date.mounth === 2
              ? getMountCorrection(this.date.year, this.date.mounth - 1, true)
              : getMountCorrection(this.date.year, this.date.mounth - 1))
        )[0].data,
        MounthBegin
      };
    },
    getBacziDays() {
      const getCorrectionNumber = num =>
        num > 60 ? num - 60 : num < 0 ? 60 + num : num;
      const getBacziInRange = (first, second) =>
        this.bacziData.filter(item => item.id >= first && item.id <= second);
      const getBacziArr = (firstDay, countOfDays) =>
        60 - countOfDays > firstDay
          ? getBacziInRange(firstDay, firstDay + countOfDays)
          : [
              ...getBacziInRange(firstDay, 60),
              ...getBacziInRange(
                0,
                getCorrectionNumber(
                  this.findDayFirstDayInMounth() + this.dayInMounth
                )
              )
            ];
      return getBacziArr(this.findDayFirstDayInMounth(), this.dayInMounth).map(
        item => item.data
      );
    },
    getBacziYear(i) {
      const yearBegin = this.mounthBegin[this.date.year][1].begin_date.match(
        /(\d+)\.(\d+)/
      );
      const correction =
        this.date.mounth === Number(yearBegin[2])
          ? i < Number(yearBegin[1])
            ? Number(this.mounthBegin[this.date.year - 1].correction)
            : Number(this.mounthBegin[this.date.year].correction)
          : this.date.mounth < Number(yearBegin[2])
          ? Number(this.mounthBegin[this.date.year - 1].correction)
          : Number(this.mounthBegin[this.date.year].correction);
      return this.bacziData.filter(item => Number(item.id) === correction)[0]
        .data;
    },
    mounthCaption() {
      return this.$store.getters.mounthArray.filter(
        item => Number(item.id) === this.date.mounth
      )[0].name;
    },
    naIn(stolp) {
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
    },
    FormationCaption(calendar) {
      /// установление
      const formation = this.$store.getters.formation;
      let id = calendar.filter(
        item => item.glif.day.ground === item.glif.mounth.ground
      );
      id.map(day => {
        calendar.map((item, index) => {
          let dopIndex = false;
          if (item.dayNum === day.dayNum) {
            const pushCalendar = (index, formationIndex) => {
              const timeOnFalse = () => {
                calendar[index].caption.push(
                  `${formationIndex}. ${
                    formation[formationIndex - 1]
                  } / ${formationIndex + 1}. ${formation[formationIndex]}`
                );
                dopIndex = true;
              };

              return calendar[index] !== undefined
                ? calendar[index].glif.day.timeOn === false
                  ? !dopIndex
                    ? formation[formationIndex] !== undefined &&
                      calendar[index].caption.push(
                        `${formationIndex + 1}. ${formation[formationIndex]}`
                      )
                    : calendar[index].caption.push(
                        `${formationIndex}. ${formation[formationIndex - 1]}`
                      )
                  : timeOnFalse()
                : false;
            };

            for (let i = 0; i <= 12; i++) {
              pushCalendar(index + i, i);
            }
          }
        });
      });
      let dopIndexBefore = () => {
        let dop = false;
        let index = -1;
        for (let i = 0; i < id[0].dayNum; i++) {
          if (calendar[i].glif.day.timeOn === true) {
            dop = true;
            index = i;
          }
        }
        return { dop, index };
      };
      calendar.map((item, index) => {
        const fi = !dopIndexBefore().dop
          ? item.dayNum + 12 - id[0].dayNum
          : item.dayNum + 12 - id[0].dayNum + 1;
        !dopIndexBefore().dop
          ? item.dayNum < id[0].dayNum &&
            calendar[index].caption.push(`${fi + 1}. ${formation[fi]}`)
          : item.dayNum < id[0].dayNum && index < dopIndexBefore().index
          ? calendar[index].caption.push(`${fi + 1}. ${formation[fi]}`)
          : item.dayNum < id[0].dayNum && index === dopIndexBefore().index
          ? fi - 1 !== 11
            ? calendar[index].caption.push(
                `${fi}. ${formation[fi - 1]}/${fi + 1}. ${formation[fi]}`
              )
            : calendar[index].caption.push(
                `${fi}. ${formation[fi - 1]}/${1}. ${formation[0]}`
              )
          : item.dayNum < id[0].dayNum &&
            index > dopIndexBefore().index &&
            calendar[index].caption.push(`${fi}. ${formation[fi - 1]}`);
      });
      return calendar;
    },
    collisionsCaption(calendar) {
      /// столкновения
      const collisions = (first, second, caption) =>
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
        `Столкновение ${caption}`;
      const collisionsDont = first => {
        let result;
        first === "午" && (result = "Не подходит для крысы");
        first === "未" && (result = "Не подходит для быка");
        first === "申" && (result = "Не подходит для тигра");
        first === "酉" && (result = "Не подходит для кролика");
        first === "巳" && (result = "Не подходит для свиньи");
        first === "戌" && (result = "Не подходит для дракона");
        first === "午" && (result = "Не подходит для лошади");
        first === "未" && (result = "Не подходит для козы");
        first === "申" && (result = "Не подходит для обезъяны");
        first === "酉" && (result = "Не подходит для петуха");
        first === "巳" && (result = "Не подходит для змеи");
        first === "戌" && (result = "Не подходит для собаки");
        return result;
      };

      calendar.map(item => {
        const day_mounth = collisions(
          item.glif.day.ground,
          item.glif.mounth.ground,
          "день/месяц"
        );
        const day_year = collisions(
          item.glif.day.ground,
          item.glif.year.ground,
          "день/год"
        );
        const mounth_year = collisions(
          item.glif.mounth.ground,
          item.glif.year.ground,
          "месяц/год"
        );
        // добавление столкновений
        !this.isEmptyObject(day_mounth) && item.caption.push(day_mounth);
        !this.isEmptyObject(day_year) && item.caption.push(day_year);
        !this.isEmptyObject(mounth_year) && item.caption.push(mounth_year);

        // добавление неподходящих столкновений
        const dayscollisionsDont = collisionsDont(item.glif.day.ground);
        !this.isEmptyObject(dayscollisionsDont) &&
          item.caption.push(dayscollisionsDont);
      });
      return calendar;
    },
    directCollision(calendar) {
      /// прямое столкновение
      const collisions = (
        dayTop,
        dayBottom,
        checkTop,
        checkBottom,
        caption
      ) => {
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
        !this.isEmptyObject(day_mounth) && item.caption.push(day_mounth);
        !this.isEmptyObject(day_year) && item.caption.push(day_year);
        !this.isEmptyObject(mounth_year) && item.caption.push(mounth_year);
      });

      return calendar;
    },
    SHA(calendar) {
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
      calendar.map(item => {
        const year = findSHA(
          item.glif.year.ground,
          item.glif.day.ground,
          "года"
        );
        const mounth = findSHA(
          item.glif.mounth.ground,
          item.glif.day.ground,
          "месяца"
        );
        !this.isEmptyObject(mounth) && item.caption.push(mounth);
        !this.isEmptyObject(year) && item.caption.push(year);
      });
      return calendar;
    },
    Fazi(calendar) {
      const findFaz = (sky, ground) => {
        let result;
        switch (sky) {
          case "甲":
            switch (ground) {
              case "亥":
                result = "Рождение";
                break;
              case "子":
                result = "Купание";
                break;
              case "丑":
                result = "Шапка и Пояс";
                break;
              case "寅":
                result = "Поступление на службу";
                break;
              case "卯":
                result = "Императорский светильник";
                break;
              case "辰":
                result = "Ослабление";
                break;
              case "巳":
                result = "Болезнь";
                break;
              case "午":
                result = "Смерть";
                break;
              case "未":
                result = "Могила";
                break;
              case "申":
                result = "Разложение";
                break;
              case "酉":
                result = "Эмбрион";
                break;
              case "戌":
                result = "Питание";
                break;
            }
            break;
          case "乙":
            switch (ground) {
              case "亥":
                result = "Рождение";
                break;
              case "子":
                result = "Купание";
                break;
              case "丑":
                result = "Шапка и Пояс";
                break;
              case "寅":
                result = "Поступление на службу";
                break;
              case "卯":
                result = "Императорский светильник";
                break;
              case "辰":
                result = "Ослабление";
                break;
              case "巳":
                result = "Болезнь";
                break;
              case "午":
                result = "Смерть";
                break;
              case "未":
                result = "Могила";
                break;
              case "申":
                result = "Разложение";
                break;
              case "酉":
                result = "Эмбрион";
                break;
              case "戌":
                result = "Питание";
                break;
            }
            break;
          case "丙":
            switch (ground) {
              case "寅":
                result = "Рождение";
                break;
              case "卯":
                result = "Купание";
                break;
              case "辰":
                result = "Шапка и Пояс";
                break;
              case "巳":
                result = "Поступление на службу";
                break;
              case "午":
                result = "Императорский светильник";
                break;
              case "未":
                result = "Ослабление";
                break;
              case "申":
                result = "Болезнь";
                break;
              case "酉":
                result = "Смерть";
                break;
              case "戌":
                result = "Могила";
                break;
              case "亥":
                result = "Разложение";
                break;
              case "子":
                result = "Эмбрион";
                break;
              case "丑":
                result = "Питание";
                break;
            }
            break;
          case "丁":
            switch (ground) {
              case "酉":
                result = "Рождение";
                break;
              case "申":
                result = "Купание";
                break;
              case "未":
                result = "Шапка и Пояс";
                break;
              case "午":
                result = "Поступление на службу";
                break;
              case "巳":
                result = "Императорский светильник";
                break;
              case "辰":
                result = "Ослабление";
                break;
              case "卯":
                result = "Болезнь";
                break;
              case "寅":
                result = "Смерть";
                break;
              case "丑":
                result = "Могила";
                break;
              case "子":
                result = "Разложение";
                break;
              case "亥":
                result = "Эмбрион";
                break;
              case "戌":
                result = "Питание";
                break;
            }
            break;
          case "戊":
            switch (ground) {
              case "寅":
                result = "Рождение";
                break;
              case "卯":
                result = "Купание";
                break;
              case "辰":
                result = "Шапка и Пояс";
                break;
              case "巳":
                result = "Поступление на службу";
                break;
              case "午":
                result = "Императорский светильник";
                break;
              case "未":
                result = "Ослабление";
                break;
              case "申":
                result = "Болезнь";
                break;
              case "酉":
                result = "Смерть";
                break;
              case "戌":
                result = "Могила";
                break;
              case "亥":
                result = "Разложение";
                break;
              case "子":
                result = "Эмбрион";
                break;
              case "丑":
                result = "Питание";
                break;
            }
            break;

          case "己":
            switch (ground) {
              case "酉":
                result = "Рождение";
                break;
              case "申":
                result = "Купание";
                break;
              case "未":
                result = "Шапка и Пояс";
                break;
              case "午":
                result = "Поступление на службу";
                break;
              case "巳":
                result = "Императорский светильник";
                break;
              case "辰":
                result = "Ослабление";
                break;
              case "卯":
                result = "Болезнь";
                break;
              case "寅":
                result = "Смерть";
                break;
              case "丑":
                result = "Могила";
                break;
              case "子":
                result = "Разложение";
                break;
              case "亥":
                result = "Эмбрион";
                break;
              case "戌":
                result = "Питание";
                break;
            }
            break;

          case "庚":
            switch (ground) {
              case "巳":
                result = "Рождение";
                break;
              case "午":
                result = "Купание";
                break;
              case "未":
                result = "Шапка и Пояс";
                break;
              case "申":
                result = "Поступление на службу";
                break;
              case "酉":
                result = "Императорский светильник";
                break;
              case "戌":
                result = "Ослабление";
                break;
              case "亥":
                result = "Болезнь";
                break;
              case "子":
                result = "Смерть";
                break;
              case "丑":
                result = "Могила";
                break;
              case "寅":
                result = "Разложение";
                break;
              case "卯":
                result = "Эмбрион";
                break;
              case "辰":
                result = "Питание";
                break;
            }
            break;

          case "辛":
            switch (ground) {
              case "子":
                result = "Рождение";
                break;
              case "亥":
                result = "Купание";
                break;
              case "戌":
                result = "Шапка и Пояс";
                break;
              case "酉":
                result = "Поступление на службу";
                break;
              case "申":
                result = "Императорский светильник";
                break;
              case "未":
                result = "Ослабление";
                break;
              case "午":
                result = "Болезнь";
                break;
              case "巳":
                result = "Смерть";
                break;
              case "辰":
                result = "Могила";
                break;
              case "卯":
                result = "Разложение";
                break;
              case "寅":
                result = "Эмбрион";
                break;
              case "丑":
                result = "Питание";
                break;
            }
            break;

          case "壬":
            switch (ground) {
              case "申":
                result = "Рождение";
                break;
              case "酉":
                result = "Купание";
                break;
              case "戌":
                result = "Шапка и Пояс";
                break;
              case "亥":
                result = "Поступление на службу";
                break;
              case "子":
                result = "Императорский светильник";
                break;
              case "丑":
                result = "Ослабление";
                break;
              case "寅":
                result = "Болезнь";
                break;
              case "卯":
                result = "Смерть";
                break;
              case "辰":
                result = "Могила";
                break;
              case "巳":
                result = "Разложение";
                break;
              case "午":
                result = "Эмбрион";
                break;
              case "未":
                result = "Питание";
                break;
            }
            break;

          case "癸":
            switch (ground) {
              case "卯":
                result = "Рождение";
                break;
              case "寅":
                result = "Купание";
                break;
              case "丑":
                result = "Шапка и Пояс";
                break;
              case "子":
                result = "Поступление на службу";
                break;
              case "亥":
                result = "Императорский светильник";
                break;
              case "戌":
                result = "Ослабление";
                break;
              case "酉":
                result = "Болезнь";
                break;
              case "申":
                result = "Смерть";
                break;
              case "未":
                result = "Могила";
                break;
              case "午":
                result = "Разложение";
                break;
              case "巳":
                result = "Эмбрион";
                break;
              case "辰":
                result = "Питание";
                break;
            }
            break;
        }
        return result;
      };

      calendar.map(item => {
        item.fazi.day = findFaz(item.glif.day.sky, item.glif.day.ground);
        item.fazi.mounth = findFaz(
          item.glif.mounth.sky,
          item.glif.mounth.ground
        );
        item.fazi.year = findFaz(item.glif.year.sky, item.glif.year.ground);
      });
      return calendar;
    },
    generateCalendar() {
      const calendar = [];
      for (let i = 1; i < this.dayInMounth; i++) {
        const mounth = { ...this.getBacziMount(i) };
        const MounthBegin = mounth.MounthBegin;
        const timeMounthBegin = MounthBegin.match(/\d+:\d+/)[0];
        const dateMounthBegin = Number(MounthBegin.match(/(\d+)\.\d+/)[1]);
        const timeOn = i === dateMounthBegin;
        const day = { ...this.getBacziDays()[i], timeOn, timeMounthBegin };
        const year = { ...this.getBacziYear(i) };
        const naIn_day = this.naIn(day);
        const naIn_mounth = this.naIn(mounth);
        const naIn_year = this.naIn(year);
        const fazi = {
          day: "",
          mounth: "",
          year: ""
        };
        const caption = [];
        calendar.push({
          dayNum: i,
          glif: {
            day,
            mounth,
            year
          },
          naIn: {
            day: { ...naIn_day },
            mounth: { ...naIn_mounth },
            year: { ...naIn_year }
          },
          fazi,
          caption
        });
      }

      return this.Fazi(
        this.SHA(
          this.directCollision(
            this.collisionsCaption(this.FormationCaption(calendar))
          )
        )
      );
    }
  },
  computed: {
    dayInMounth() {
      return !this.isEmptyObject(this.date)
        ? moment(
            `${this.date.year}/${this.date.mounth}`,
            "YYYY/MM"
          ).daysInMonth()
        : null;
    },
    weekDay() {
      return this.date
        ? moment(`${this.date.year}/${this.date.mounth}/01`).isoWeekday() - 1
        : null;
    },
    formation() {
      return this.$store.getters.formation;
    }
  }
};
</script>

<style lang="sass">
@import ../assets/vars
.calendar
  height: 100vh
  color: $text_on_normal
  .header
    display: flex
    align-items: center
    justify-content: center
    .logo
      img
        height: 140px
    .info
      display: grid
      div
        justify-self: center
  .wrapper
    display: grid
    grid-template-areas: 'asids heads' 'asids bodys'
    grid-template-columns: 1fr 10fr
    position: relative
    aside
      position: relative
      top: 0
      left: 0
      height: auto
      background-color: rgba($accent,1)
      grid-area: asids
      height: 100%
      display: grid
      grid-template-rows: 130px 1fr
      align-items: center
      .white_bg
        background-color: white
      .sideMargin
        margin: 0 auto
        padding: 20px
        width: 90px
        position: relative
        top: -30px
        border: 3px solid $accent
      .mounthCaption
        .caption
          transform: rotateZ(-90deg)
          font-size: 5em
          color: white
    header
      grid-area: heads
      height: 80px
      background-color: rgba($accent,1)
      display: grid
      grid-template-columns: repeat(7, 1fr )
      align-items: flex-end
      font-size: 1.3em
      color: $text_on_accent
      span
        margin: 20px
.hoverTitle
  position: relative
  &::after
    position: absolute
    width: 150px
    top: 50px
    left: 0px
    content: attr(data-title)
    font-size: 18px
    color: black
    background-color: white
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
    visibility: hidden
    opacity: 0
    z-index: 99999
    border-radius: 5px
  &:hover
    &::after
      visibility: visible
      opacity: 1
</style>
