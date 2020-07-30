import moment from "moment";
import bacziData from "../bacziData";
import mounthBegin from "../mounthbegin";

import {
    naIn
} from "./naIn";
import {
    FormationCaption
} from "./formation";
import {
    collisionsCaption,
    directCollision
} from "./collisions";
import {
    SHA
} from "./SHA";
import {
    Fazi
} from "./Fazi";
import {
    Loss
} from "./Loss";
import {
    whitOutWealth
} from "./whitOutWealth";

export const isEmptyObject = object =>
    object === null || object === undefined ?
    true :
    Object.entries(object).length === 0 ?
    true :
    false;

export const findDayFirstDayInMounth = (date) => {
    const dayCalibration = 17;
    const oneDayMsec = 24 * 3600;
    const oneD = moment("1970/01/01").unix();
    const TwoD = moment(`${date.year}/${date.mounth}/01`).unix();
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
};

export const getBacziMount = (i, date) => {
    const getMountCorrection = (
        yearDate,
        mounthDate,
        February = false,
        yearCorection = null
    ) => {
        const year = yearCorection !== null ? yearDate - yearCorection : yearDate;
        const beginMounth = Number(
            mounthBegin[year][mounthDate].begin_date.match(/(\d+)\.\d+/)[1]
        );
        return i < beginMounth ?
            Number(
                (February ?
                    mounthBegin[year - 1][12] :
                    mounthBegin[year][mounthDate - 1]
                ).mounth_correction
            ) :
            Number(mounthBegin[year][mounthDate].mounth_correction);
    };

    const MounthBegin =
        date.mounth === 1 ?
        mounthBegin[date.year - 1][12].begin_date :
        mounthBegin[date.year][date.mounth - 1].begin_date;
    return {
        ...bacziData.filter(
            item =>
            Number(item.id) ===
            (date.mounth === 1 ?
                getMountCorrection(date.year, 12, false, 1) :
                date.mounth === 2 ?
                getMountCorrection(date.year, date.mounth - 1, true) :
                getMountCorrection(date.year, date.mounth - 1))
        )[0].data,
        MounthBegin
    };
};

export const getBacziDays = (dayInMounth, date) => {
    const getCorrectionNumber = num =>
        num > 60 ? num - 60 : num < 0 ? 60 + num : num;
    const getBacziInRange = (first, second) =>
        bacziData.filter(item => item.id >= first && item.id <= second);
    const getBacziArr = (firstDay, countOfDays) =>
        60 - countOfDays > firstDay ?
        getBacziInRange(firstDay, firstDay + countOfDays) : [
            ...getBacziInRange(firstDay, 60),
            ...getBacziInRange(
                0,
                getCorrectionNumber(
                    findDayFirstDayInMounth(date) + dayInMounth
                )
            )
        ];
    return getBacziArr(findDayFirstDayInMounth(date), dayInMounth).map(
        item => item.data
    );
};

export const getBacziYear = (i, date) => {
    const yearBegin = mounthBegin[date.year][1].begin_date.match(
        /(\d+)\.(\d+)/
    );
    const correction = date.mounth === Number(yearBegin[2]) ?
        i < Number(yearBegin[1]) ?
        Number(mounthBegin[date.year - 1].correction) :
        Number(mounthBegin[date.year].correction) :
        date.mounth < Number(yearBegin[2]) ?
        Number(mounthBegin[date.year - 1].correction) :
        Number(mounthBegin[date.year].correction)


    return bacziData.filter(item => Number(item.id) === correction)[0].data;
};
export const mounthCaption = (mounthArray, date) => {
    return mounthArray.filter(
        item => Number(item.id) === date.mounth
    )[0].name;
};
export const generateCalendar = (date, dayInMounth) => {
    const calendar = [];
    for (let i = 1; i < dayInMounth; i++) {
        const mounth = {
            ...getBacziMount(i, date)
        };
        const MounthBegin = mounth.MounthBegin;
        const timeMounthBegin = MounthBegin.match(/\d+:\d+/)[0];
        const dateMounthBegin = Number(MounthBegin.match(/(\d+)\.\d+/)[1]);
        const timeOn = i === dateMounthBegin;
        const day = {
            ...getBacziDays(dayInMounth, date)[i],
            timeOn,
            timeMounthBegin
        };
        const year = {
            ...getBacziYear(i, date)
        };
        const naIn_day = naIn(day);
        const naIn_mounth = naIn(mounth);
        const naIn_year = naIn(year);
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
                day: {
                    ...naIn_day
                },
                mounth: {
                    ...naIn_mounth
                },
                year: {
                    ...naIn_year
                }
            },
            fazi,
            caption
        });
    }

    const result = whitOutWealth(
        Loss(
            Fazi(SHA(directCollision(collisionsCaption(FormationCaption(calendar)))))
        ),
        date.year
    );

    return result;
};

export const CalculateHours = (day)=>
  day.sky === '甲' ||  day.sky ==='己' 
  ? ([
    {timeCaption: 'ранней крысы', time: '00.00-01.00', number: 1, sky: '甲', ground: '子', ground_color: findGlifColor('子'), sky_color: findGlifColor('甲')},
    {timeCaption: 'быка', time: '01.00-03.00', number: 3, sky: '乙', ground: '丑', ground_color: findGlifColor('丑'), sky_color: findGlifColor('乙')},
    {timeCaption: 'тигра', time: '03.00-05.00', number: 2, sky: '丙', ground: '寅', ground_color: findGlifColor('寅'), sky_color: findGlifColor('丙')},
    {timeCaption: 'кролика', time: '05.00-07.00', number: 6, sky: '丁', ground: '卯', ground_color: findGlifColor('卯'), sky_color: findGlifColor('丁')},
    {timeCaption: 'дракона', time: '07.00-09.00', number: 9, sky: '戊', ground: '辰', ground_color: findGlifColor('辰'), sky_color: findGlifColor('戊')},
    {timeCaption: 'змея', time: '09.00-11.00', number: 8, sky: '己', ground: '巳', ground_color: findGlifColor('巳'), sky_color: findGlifColor('己')},
    {timeCaption: 'лошади', time: '11.00-13.00', number: 8, sky: '庚', ground: '午', ground_color: findGlifColor('午'), sky_color: findGlifColor('庚')},
    {timeCaption: 'козы', time: '13.00-15.00', number: 9, sky: '辛', ground: '未', ground_color: findGlifColor('未'), sky_color: findGlifColor('辛')},
    {timeCaption: 'обезьяна', time: '15.00-17.00', number: 2, sky: '壬', ground: '申', ground_color: findGlifColor('申'), sky_color: findGlifColor('壬')},
    {timeCaption: 'петуха', time: '17.00-19.00', number: 4, sky: '癸', ground: '酉', ground_color: findGlifColor('酉'), sky_color: findGlifColor('癸')},
    {timeCaption: 'собака', time: '19.00-21.00', number: 7, sky: '甲', ground: '戌', ground_color: findGlifColor('戌'), sky_color: findGlifColor('甲')},
    {timeCaption: 'свинья', time: '21.00-23.00', number: 3, sky: '乙', ground: '亥', ground_color: findGlifColor('亥'), sky_color: findGlifColor('乙')},
    {timeCaption: 'крыса', time: '23.00-00.00', number: 6, sky: '丙', ground: '子', ground_color: findGlifColor('子'), sky_color: findGlifColor('丙')},
    ])
      		
  : day.sky === '乙' ||  day.sky ==='庚' 
    ? ([
    {timeCaption: 'ранней крысы', time: '00.00-01.00', number: 6, sky: '丙', ground: '子', ground_color: findGlifColor('子'), sky_color: findGlifColor('丙')},
    {timeCaption: 'быка', time: '01.00-03.00', number: 4, sky: '丁', ground: '丑', ground_color: findGlifColor('丑'), sky_color: findGlifColor('丁')},
    {timeCaption: 'тигра', time: '03.00-05.00', number: 8, sky: '戊', ground: '寅', ground_color: findGlifColor('寅'), sky_color: findGlifColor('戊')},
    {timeCaption: 'кролика', time: '05.00-07.00', number: 7, sky: '己', ground: '卯', ground_color: findGlifColor('卯'), sky_color: findGlifColor('己')},
    {timeCaption: 'дракона', time: '07.00-09.00', number: 1, sky: '庚', ground: '辰', ground_color: findGlifColor('辰'), sky_color: findGlifColor('庚')},
    {timeCaption: 'змея', time: '09.00-11.00', number: 3, sky: '辛', ground: '巳', ground_color: findGlifColor('巳'), sky_color: findGlifColor('辛')},
    {timeCaption: 'лошади', time: '11.00-13.00', number: 2, sky: '壬', ground: '午', ground_color: findGlifColor('午'), sky_color: findGlifColor('壬')},
    {timeCaption: 'козы', time: '13.00-15.00', number: 4, sky: '癸', ground: '未', ground_color: findGlifColor('未'), sky_color: findGlifColor('癸')},
    {timeCaption: 'обезьяна', time: '15.00-17.00', number: 3, sky: '甲', ground: '申', ground_color: findGlifColor('申'), sky_color: findGlifColor('甲')},
    {timeCaption: 'петуха', time: '17.00-19.00', number: 9, sky: '乙', ground: '酉', ground_color: findGlifColor('酉'), sky_color: findGlifColor('乙')},
    {timeCaption: 'собака', time: '19.00-21.00', number: 6, sky: '丙', ground: '戌', ground_color: findGlifColor('戌'), sky_color: findGlifColor('丙')},
    {timeCaption: 'свинья', time: '21.00-23.00', number: 8, sky: '丁', ground: '亥', ground_color: findGlifColor('亥'), sky_color: findGlifColor('丁')},
    {timeCaption: 'крыса', time: '23.00-00.00', number: 7, sky: '戊', ground: '子', ground_color: findGlifColor('子'), sky_color: findGlifColor('戊')},
    ])
      		
    :day.sky === '辛' ||  day.sky ==='丙' ? ([
    {timeCaption: 'ранней крысы', time: '00.00-01.00', number: 7, sky: '戊', ground: '子', ground_color: findGlifColor('子'), sky_color: findGlifColor('戊')},
    {timeCaption: 'быка', time: '01.00-03.00', number: 9, sky: '己', ground: '丑', ground_color: findGlifColor('丑'), sky_color: findGlifColor('己')},
    {timeCaption: 'тигра', time: '03.00-05.00', number: 3, sky: '庚', ground: '寅', ground_color: findGlifColor('寅'), sky_color: findGlifColor('庚')},
    {timeCaption: 'кролика', time: '05.00-07.00', number: 2, sky: '辛', ground: '卯', ground_color: findGlifColor('卯'), sky_color: findGlifColor('辛')},
    {timeCaption: 'дракона', time: '07.00-09.00', number: 6, sky: '壬', ground: '辰', ground_color: findGlifColor('辰'), sky_color: findGlifColor('壬')},
    {timeCaption: 'змея', time: '09.00-11.00', number: 4, sky: '癸', ground: '巳', ground_color: findGlifColor('巳'), sky_color: findGlifColor('癸')},
    {timeCaption: 'лошади', time: '11.00-13.00', number: 9, sky: '甲', ground: '午', ground_color: findGlifColor('午'), sky_color: findGlifColor('甲')},
    {timeCaption: 'козы', time: '13.00-15.00', number: 7, sky: '乙', ground: '未', ground_color: findGlifColor('未'), sky_color: findGlifColor('乙')},
    {timeCaption: 'обезьяна', time: '15.00-17.00', number: 8, sky: '丙', ground: '申', ground_color: findGlifColor('申'), sky_color: findGlifColor('丙')},
    {timeCaption: 'петуха', time: '17.00-19.00', number: 4, sky: '丁', ground: '酉', ground_color: findGlifColor('酉'), sky_color: findGlifColor('丁')},
    {timeCaption: 'собака', time: '19.00-21.00', number: 1, sky: '戊', ground: '戌', ground_color: findGlifColor('戌'), sky_color: findGlifColor('戊')},
    {timeCaption: 'свинья', time: '21.00-23.00', number: 2, sky: '己', ground: '亥', ground_color: findGlifColor('亥'), sky_color: findGlifColor('己')},
    {timeCaption: 'крыса', time: '23.00-00.00', number: 2, sky: '庚', ground: '子', ground_color: findGlifColor('子'), sky_color: findGlifColor('庚')},
    ])
        		
    :day.sky === '丁' ||  day.sky ==='壬' ? ([
    {timeCaption: 'ранней крысы', time: '00.00-01.00', number: 2, sky: '庚', ground: '子', ground_color: findGlifColor('子'), sky_color: findGlifColor('庚')},
    {timeCaption: 'быка', time: '01.00-03.00', number: 1, sky: '辛', ground: '丑', ground_color: findGlifColor('丑'), sky_color: findGlifColor('辛')},
    {timeCaption: 'тигра', time: '03.00-05.00', number: 9, sky: '壬', ground: '寅', ground_color: findGlifColor('寅'), sky_color: findGlifColor('壬')},
    {timeCaption: 'кролика', time: '05.00-07.00', number: 8, sky: '癸', ground: '卯', ground_color: findGlifColor('卯'), sky_color: findGlifColor('癸')},
    {timeCaption: 'дракона', time: '07.00-09.00', number: 3, sky: '甲', ground: '辰', ground_color: findGlifColor('辰'), sky_color: findGlifColor('甲')},
    {timeCaption: 'змея', time: '09.00-11.00', number: 7, sky: '乙', ground: '巳', ground_color: findGlifColor('巳'), sky_color: findGlifColor('乙')},
    {timeCaption: 'лошади', time: '11.00-13.00', number: 4, sky: '丙', ground: '午', ground_color: findGlifColor('午'), sky_color: findGlifColor('丙')},
    {timeCaption: 'козы', time: '13.00-15.00', number: 6, sky: '丁', ground: '未', ground_color: findGlifColor('未'), sky_color: findGlifColor('丁')},
    {timeCaption: 'обезьяна', time: '15.00-17.00', number: 2, sky: '戊', ground: '申', ground_color: findGlifColor('申'), sky_color: findGlifColor('戊')},
    {timeCaption: 'петуха', time: '17.00-19.00', number: 3, sky: '己', ground: '酉', ground_color: findGlifColor('酉'), sky_color: findGlifColor('己')},
    {timeCaption: 'собака', time: '19.00-21.00', number: 9, sky: '庚', ground: '戌', ground_color: findGlifColor('戌'), sky_color: findGlifColor('庚')},
    {timeCaption: 'свинья', time: '21.00-23.00', number: 7, sky: '辛', ground: '亥', ground_color: findGlifColor('亥'), sky_color: findGlifColor('辛')},
    {timeCaption: 'крыса', time: '23.00-00.00', number: 8, sky: '壬', ground: '子', ground_color: findGlifColor('子'), sky_color: findGlifColor('壬')},
    ])
              
          		
  :day.sky === '戊' ||  day.sky ==='癸' && ([
    {timeCaption: 'ранней крысы', time: '00.00-01.00', number: 8, sky: '壬', ground: '子', ground_color: findGlifColor('子'), sky_color: findGlifColor('壬')},
    {timeCaption: 'быка', time: '01.00-03.00', number: 6, sky: '癸', ground: '丑', ground_color: findGlifColor('丑'), sky_color: findGlifColor('癸')},
    {timeCaption: 'тигра', time: '03.00-05.00', number: 7, sky: '甲', ground: '寅', ground_color: findGlifColor('寅'), sky_color: findGlifColor('甲')},
    {timeCaption: 'кролика', time: '05.00-07.00', number: 1, sky: '乙', ground: '卯', ground_color: findGlifColor('卯'), sky_color: findGlifColor('乙')},
    {timeCaption: 'дракона', time: '07.00-09.00', number: 4, sky: '丙', ground: '辰', ground_color: findGlifColor('辰'), sky_color: findGlifColor('丙')},
    {timeCaption: 'змея', time: '09.00-11.00', number: 2, sky: '丁', ground: '巳', ground_color: findGlifColor('巳'), sky_color: findGlifColor('丁')},
    {timeCaption: 'лошади', time: '11.00-13.00', number: 3, sky: '戊', ground: '午', ground_color: findGlifColor('午'), sky_color: findGlifColor('戊')},
    {timeCaption: 'козы', time: '13.00-15.00', number: 1, sky: '己', ground: '未', ground_color: findGlifColor('未'), sky_color: findGlifColor('己')},
    {timeCaption: 'обезьяна', time: '15.00-17.00', number: 7, sky: '庚', ground: '申', ground_color: findGlifColor('申'), sky_color: findGlifColor('庚')},
    {timeCaption: 'петуха', time: '17.00-19.00', number: 8, sky: '辛', ground: '酉', ground_color: findGlifColor('酉'), sky_color: findGlifColor('辛')},
    {timeCaption: 'собака', time: '19.00-21.00', number: 4, sky: '壬', ground: '戌', ground_color: findGlifColor('戌'), sky_color: findGlifColor('壬')},
    {timeCaption: 'свинья', time: '21.00-23.00', number: 6, sky: '癸', ground: '亥', ground_color: findGlifColor('亥'), sky_color: findGlifColor('癸')},
    {timeCaption: 'крыса', time: '23.00-00.00', number: 1, sky: '甲', ground: '子', ground_color: findGlifColor('子'), sky_color: findGlifColor('甲')},
    ])

export const findGlifColor = glif=>{
  let result ;
  bacziData.map(item=>{
    item.data.sky === glif 
    ? (result = item.data.sky_color)
    : item.data.ground === glif && (result = item.data.sky_color)
  })
  return result
}