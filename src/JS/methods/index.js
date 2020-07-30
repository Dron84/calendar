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