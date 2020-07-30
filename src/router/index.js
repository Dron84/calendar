/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import calendar from "../views/calendar.vue";
import calendarDay from "../views/calendarDay.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "calendar",
        component: calendar,
    },
    {
        path: "/:date/:day",
        name: "calendarDay",
        component: calendarDay,
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;