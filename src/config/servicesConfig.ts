import AuthServiceJwt from "../service/auth-service-jwt";
import Colledge from "../service/colledge";
import CoursesService from "../service/courses-service";
import CoursesServiceRest from "../service/courses-service-rest";
import CoursesServicesFirestore from "../service/courses-service-firestore";
import courseData from "./courseData.json"
import AuthServiceFake from "../service/auth-service-fake";
import AuthServiceFire from "../service/auth-service-fire";

/***************************DataProvider*********** */
const URL = "http://localhost:3500/courses"
export const pollingInterval: number = 2000;
export const publishingInterval: number = 1000;
// const courseProvider: CoursesService = new CoursesServiceRest(URL);
const courseProvider: CoursesService =
    new CoursesServicesFirestore("courses", courseData.minId, courseData.maxId);
// export const authService = new AuthServiceJwt("http://localhost:3500");
export const authService = new AuthServiceFire('administrators');
/***************************DataProcessor*********** */
export const colledge: Colledge = new Colledge(courseProvider);

/********************************************** */