import AuthService from "./auth-service";
import {LoginData} from "../models/common/login-data";
import {Observable, of} from "rxjs";
import {UserData} from "../models/common/user-data";

export default class AuthServiceFake implements AuthService {
    getUserData(): Observable<UserData> {
        return of({
            username: "fakeuser@tel-ran.co.il",
            displayName: "Fake user",
            isAdmin: true,
        });
    }

    login(loginData: LoginData): Promise<boolean> {
        throw new Error("Login is not available")
    }

    logout(): Promise<boolean> {
        return Promise.resolve(true);
    }

}