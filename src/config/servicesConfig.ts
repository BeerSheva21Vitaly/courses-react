import Colledge from "../service/colledge";
import CoursesService from "../service/courses-service";
import CoursesServiceRest from "../service/courses-service-rest";

/***************************DataProvider*********** */
const URL = "http://localhost:3500/courses"
export const pollingInterval: number = 2000;
export const publishingInterval: number = 2000;
const courseProvider: CoursesService = new CoursesServiceRest(URL, pollingInterval);
/***************************DataProcessor*********** */
export const colledge: Colledge = new Colledge(courseProvider);

/********************************************** */