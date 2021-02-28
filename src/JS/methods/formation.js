import store from "../../store";

export const FormationCaption = calendar => {
  /// установление
  const formation = store.getters.formation;
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
};
