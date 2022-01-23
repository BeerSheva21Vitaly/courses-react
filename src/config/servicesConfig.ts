import AuthServiceJwt from "../service/auth-service-jwt";
import Colledge from "../service/colledge";
import CoursesService from "../service/courses-service";
import CoursesServiceRest from "../service/courses-service-rest";

/***************************DataProvider*********** */
const URL = "http://localhost:3500/courses"
export const pollingInterval: number = 5000;
export const publishingInterval: number = 5000;
const courseProvider: CoursesService = new CoursesServiceRest(URL, pollingInterval);
export const authService = new AuthServiceJwt("http://localhost:3500");
/***************************DataProcessor*********** */
export const colledge: Colledge = new Colledge(courseProvider);

/********************************************** */