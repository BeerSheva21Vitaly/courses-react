//функциональность модуля
// 1. обеспечить приложение информацией о данных пользователя, включая данные для 
// авторизации и аутентификации запросов к серверу

import {LoginData} from "../models/common/login-data";
import {nonAuthorizedUser, UserData} from "../models/common/user-data";
import { Observable } from "rxjs";
import AuthService from "./auth-service";
import { AUTH_TOKEN } from "./courses-service-rest";

const pollingInterval: number = 2000;

export default class AuthServiceJwt implements AuthService {
    private cache: string = "";
    constructor(private url: string) {}
    getUserData(): Observable<UserData> {
        return new Observable<UserData>(subscriber => {
            // при первом вызове этого метода пользовательские данные будут опубликованы в sunbscription
            // без проверки кеша
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
    async login(loginData: LoginData): Promise<boolean> {
        let res = false;
        const response = await fetch(`${this.url}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });
        if (response.ok) {
            const token = await response.json();
            localStorage.setItem(AUTH_TOKEN, token.accessToken);
            res = true;
        }
        return res;
    }

    logout(): Promise<boolean> {
        localStorage.removeItem(AUTH_TOKEN);
        return Promise.resolve(true);
    }

}

function fetchUserData(): UserData {
    const token: string | null = localStorage.getItem(AUTH_TOKEN);
    if (!!token) {
        return nonAuthorizedUser;
    } else {
        return tokenToUserData(token as string);
    }
}

function tokenToUserData(token: string): UserData {
    //payload зранится в 1-м индексе JWT
    const rawPayLoad = token.split('.')[1] ; //JSON in base64
    const payload: any = Buffer.from(rawPayLoad, "base64").toString('ascii');
    return payload.exp < (Date.now() / 1000) ? nonAuthorizedUser : {
        username: payload.email,
        isAdmin: +payload.sub === 1,
        displayName: payload.email,
    }
}

