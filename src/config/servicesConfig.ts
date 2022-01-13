import Colledge from "../service/colledge";
import CoursesService from "../service/courses-service";
import CoursesServiceRest from "../service/courses-service-rest";

/***************************DataProvider*********** */
const URL = "http://localhost:3500/courses"
const courseProvider: CoursesService = new CoursesServiceRest(URL);
/***************************DataProcessor*********** */
export const colledge: Colledge = new Colledge(courseProvider);
export const pollingInterval: number = 2000;

/********************************************** */