import { ReactNode } from "react";
import AddCourse from "../components/pages/add-course";
import Courses from "../components/pages/courses";
import Login from "../components/pages/login";
import Logout from "../components/pages/logout";
import StatisticsCost from "../components/pages/statistics-cost";
import StatisticsHours from "../components/pages/statistics-hours";
import { RouteType } from "../models/common/route-type";

/**пути к компонентам. Принято формулировать в виде констант */

export const PATH_COURSES = "/courses";
export const PATH_ADD_COURSE = "/courses/add";
export const PATH_LOGIN = "/login";
export const PATH_LOGOUT = "/logout";
export const PATH_STATISTICS_HOURS = "/courses/statistics/hours";
export const PATH_STATISTICS_COST = "/courses/statistics/cost"

export const routes: RouteType[] = [
    {path: PATH_COURSES, element: <Courses />, label: "Courses", authenticated: true},
    {path: PATH_ADD_COURSE, element: <AddCourse />, label: "Add course", adminOnly: true},
    {path: PATH_STATISTICS_COST, element: <StatisticsCost />, label: "Cost statistics", authenticated: true},
    {path: PATH_STATISTICS_HOURS, element: <StatisticsHours />, label: "Hours statistics", authenticated: true},
    {path: PATH_LOGIN, element: <Login />, label: "Sign in"},
    {path: PATH_LOGOUT, element: <Logout />, label: "Sign out", authenticated: true},
]


