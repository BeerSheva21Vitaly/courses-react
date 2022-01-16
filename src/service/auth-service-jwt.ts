import {LoginData} from "../models/common/login-data";
import {UserData} from "../models/common/user-data";
import { Observable } from "rxjs";
import AuthService from "./auth-service";
import { AUTH_TOKEN } from "./courses-service-rest";

const pollingInterval: number = 2000;
const nonAuthorizedUser: UserData = {
    username: "",
    isAdmin: false,
    displayName: "Non authorized user"
}

export default class AuthServiceJwt implements AuthService {
    private cache: string = "";
    getUserData(): Observable<UserData> {
        return new Observable<UserData>(subscriber => {
            let userData: UserData = fetchUserData();
            this.cache = JSON.stringify(userData);
            subscriber.next(userData);
            setInterval(() => {
                userData = fetchUserData();
                const userDataJson = JSON.stringify(userData);
                if(userDataJson !== this.cache) {
                    subscriber.next(userData);
                    this.cache = userDataJson;
                }
            }, pollingInterval)
        })
    }
    login(loginData: LoginData): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    logout(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}

function fetchUserData(): UserData {
    const token: string | null = localStorage.getItem(AUTH_TOKEN);
    if(typeof token !== "string") {
        return nonAuthorizedUser;
    } else {
        return tokenToUserData(token);
    }
}

function tokenToUserData(token: string): UserData {
    const rawPayLoad = token.split(".")[1] ; //JSON in base64
    const payLoad: any = Buffer.from(rawPayLoad, "base64");
    return {
        username: payLoad.username,
        isAdmin: payLoad.isAdmin,
        displayName: payLoad.displayName,
    }
}

