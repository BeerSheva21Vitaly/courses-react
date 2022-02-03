import AuthServiceJwt from "../service/auth-service-jwt";
import Colledge from "../service/colledge";
import CoursesService from "../service/courses-service";
import CoursesServiceRest from "../service/courses-service-rest";
import CoursesServicesFirestore from "../service/courses-service-firestore";
import courseData from "./courseData.json"
import AuthServiceFake from "../service/auth-service-fake";
import AuthServiceFire from "../service/auth-service-fire";
import {OAuthProvider} from "../models/common/oauth-provider-type";
import {AuthProviderEnum} from "../models/common/auth-provider-enum";

/***************************DataProvider*********** */
const URL = "http://localhost:3500/courses"
export const pollingInterval: number = 2000;
export const publishingInterval: number = 1000;
// const courseProvider: CoursesService = new CoursesServiceRest(URL);
const courseProvider: CoursesService =
    new CoursesServicesFirestore("courses", courseData.minId, courseData.maxId);
/***************************Authentication Provider */
// export const authService = new AuthServiceJwt("http://localhost:3500");
export const authService = new AuthServiceFire('administrators');
export const oauthProviders: OAuthProvider[] = [
    {name: AuthProviderEnum.google, iconLink: "/images/google.png"},
    {name: AuthProviderEnum.facebook, iconLink: "/images/facebook.png"},
    {name: AuthProviderEnum.github, iconLink: "/images/github.png"},
]
/***************************DataProcessor*********** */
export const colledge: Colledge = new Colledge(courseProvider);
/********************************************** */