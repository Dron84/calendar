import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mounthArray: [{
                id: 1,
                name: "Январь"
            },
            {
                id: 2,
                name: "Февраль"
            },
            {
                id: 3,
                name: "Март"
            },
            {
                id: 4,
                name: "Апрель"
            },
            {
                id: 5,
                name: "Май"
            },
            {
                id: 6,
                name: "Июнь"
            },
            {
                id: 7,
                name: "Июль"
            },
            {
                id: 8,
                name: "Август"
            },
            {
                id: 9,
                name: "Сентябрь"
            },
            {
                id: 10,
                name: "Октябрь"
            },
            {
                id: 11,
                name: "Ноябрь"
            },
            {
                id: 12,
                name: "Декабрь"
            }
        ],
        yearsArray: () => {
            const arr = [];
            for (let i = 2030; i >= 1900; i--) {
                arr.push(i);
            }
            return arr;
        },
        formation: [
            'Установление',
            'Устранение',
            'Наполнение',
            'Баланс',
            'Стабильность',
            'Удержание',
            'Разрушение',
            'Опасность',
            'Успех',
            'Получение',
            'Открытие',
            'Закрытие'
        ],
        calendarDays: null
    },
    mutations: {
        date(state, val) {
            state.date = val;
        },
        setCalendarDays(state, val) {
            state.calendarDays = val
        }
    },
    actions: {},
    getters: {
        mounthArray(state) {
            return state.mounthArray
        },
        yearsArray(state) {
            return state.yearsArray()
        },
        formation(state) {
            return state.formation
        },
        getCalendarDays(state) {
            return state.calendarDays
        }
    },
});