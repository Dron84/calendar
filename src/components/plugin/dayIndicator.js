const one = {
  good: [
    "remont",
    "planirovanie",
    "svidaniya",
    "vstuplenie_vdoljnost",
    "peregovori",
    "podpisanie_dogovora",
    "nachalo_obucheniya",
    "obrachenie_za_medpomochiu"
  ],
  bad: [
    "svadiba",
    "posechenie_kladbicha",
    "zemelnie_raboti",
    "razrushenie_postroek",
    "zakladka_fundamenta"
  ]
};
const two = {
  good: [
    "remont",
    "razrushenie_postroek",
    "zemelnie_raboti",
    "uborka",
    "nachalo_dieti",
    "rastovanie"
  ],
  bad: [
    "svadiba",
    "planirovanie",
    "vstuplenie_vdoljnost",
    "peregovori",
    "nachalo_obucheniya"
  ]
};
const three = {
  good: [
    "remont",
    "planirovanie",
    "svidaniya",
    "vstuplenie_vdoljnost",
    "peregovori",
    "podpisanie_dogovora",
    "nachalo_obucheniya",
    "obrachenie_za_medpomochiu"
  ],
  bad: [
    "svadiba",
    "posechenie_kladbicha",
    "zemelnie_raboti",
    "razrushenie_postroek",
    "zakladka_fundamenta"
  ]
};
const four = {
  good: [
    "remont",
    "otkritie_busnesa",
    "dalnie_putushestviya",
    "svadiba",
    "planirovanie",
    "duhovnie_praktiki"
  ],
  bad: [
    "pereezd",
    "sudebni_process",
    "posechenie_kladbicha",
    "razdel_imuchestva"
  ]
};
const five = {
  good: [
    "duhovnie_praktiki",
    "obrachenie_za_medpomochiu",
    "svadiba",
    "nachalo_stroitelstva",
    "nachalo_lecheniya"
  ],
  bad: ["pereezd", "dalnie_putushestviya", "posechenie_kladbicha"]
};
const six = {
  good: [
    "otkritie_busnesa",
    "remont",
    "nachalo_novogo_proekta",
    "podpisanie_dogovora",
    "vstuplenie_vdoljnost",
    "duhovnie_praktiki",
    "zakladka_fundamenta"
  ],
  bad: ["dalnie_putushestviya", "svadiba", "pereezd"]
};
const seven = {
  good: ["razrushenie_postroek", "uborka", "otdich"],
  bad: ["vse_dela"]
};
const eight = {
  good: ["duhovnie_praktiki", "peregovori", "zemelnie_raboti"],
  bad: [
    "otkritie_busnesa",
    "dalnie_putushestviya",
    "posechenie_kladbicha",
    "svadiba"
  ]
};
const nine = {
  good: [
    "otkritie_busnesa",
    "nachalo_obucheniya",
    "nachalo_novogo_proekta",
    "vstuplenie_vdoljnost",
    "svadiba",
    "pereezd",
    "nachalo_lecheniya"
  ],
  bad: ["sudebni_process"]
};
const teen = {
  good: [
    "poluchenie_nagrad",
    "nachalo_obucheniya",
    "duhovnie_praktiki",
    "svadiba",
    "investirovanie"
  ],
  bad: ["posechenie_kladbicha", "obrachenie_za_medpomochiu", "sudebni_process"]
};
const eleven = {
  good: [
    "otkritie_busnesa",
    "nachalo_obucheniya",
    "podpisanie_dogovora",
    "vstuplenie_vdoljnost",
    "pereezd",
    "pokupka_doma",
    "duhovnie_praktiki"
  ],
  bad: ["posechenie_kladbicha", "zemelnie_raboti"]
};
const twelve = {
  good: ["posechenie_kladbicha", "rastovanie", "otdich"],
  bad: ["vse_dela"]
};
// "pokupka_doma",
// "investirovanie",
// "poluchenie_nagrad",
// "vse_dela"
// "otdich",
// "razrushenie_postroek"
// "razdel_imuchestva",
// "sudebni_process",
// "pereezd",
// "duhovnie_praktiki",
// "dalnie_putushestviya",
// "otkritie_busnesa",
// "remont",
// "planirovanie",
// "svidaniya",
// "vstuplenie_vdoljnost",
// "peregovori",
// "podpisanie_dogovora",
// "nachalo_obucheniya",
// "nachalo_stroitelstva",
// "nachalo_lecheniya",
// "nachalo_novogo_proekta",
// "obrachenie_za_medpomochiu"
// "zakladka_fundamenta"
// "svadiba",
// "posechenie_kladbicha",
// "zemelnie_raboti",
// "uborka",
// "rastovanie",
// "nachalo_dieti",
// "razrushenie_postroek",
32

export default indicatorArray => {
  const good = new Array();
  const bad = new Array();
  for (let item of indicatorArray) {
    switch (item) {
      case 1:
        good.push(...one.good);
        bad.push(...one.bad);
        break;
      case 2:
        good.push(...two.good);
        bad.push(...two.bad);
        break;
      case 3:
        good.push(...three.good);
        bad.push(...three.bad);
        break;
      case 4:
        good.push(...four.good);
        bad.push(...four.bad);
        break;
      case 5:
        good.push(...five.good);
        bad.push(...five.bad);
        break;
      case 6:
        good.push(...six.good);
        bad.push(...six.bad);
        break;
      case 7:
        good.push(...seven.good);
        bad.push(...seven.bad);
        break;
      case 8:
        good.push(...eight.good);
        bad.push(...eight.bad);
        break;
      case 9:
        good.push(...nine.good);
        bad.push(...nine.bad);
        break;
      case 10:
        good.push(...teen.good);
        bad.push(...teen.bad);
        break;
      case 11:
        good.push(...eleven.good);
        bad.push(...eleven.bad);
        break;
      case 12:
        good.push(...twelve.good);
        bad.push(...twelve.bad);
        break;
    }
  }
  return {good: Array.from(new Set(good)), bad: Array.from(new Set(bad))}
};
