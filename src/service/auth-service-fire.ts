import AuthService from "./auth-service";
import {Observable} from "rxjs";
import {LoginData} from "../models/common/login-data";
import {nonAuthorizedUser, UserData} from "../models/common/user-data";
import appFire from "../config/fire-config"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {authState} from "rxfire/auth";
import {map} from "rxjs/operators";

export default class AuthServiceFire implements AuthService {
    private authFire = getAuth(appFire);
    constructor(private collectionAdministrators: string) {};
    getUserData(): Observable<UserData> {
        return authState(this.authFire).pipe(
            map(userFire => (
                !!userFire ? {
                        username: userFire.uid,
                        displayName: userFire.displayName || userFire.email as string,
                        isAdmin: userFire.uid == "GpWjKAazZLcI1oWiR8A78Mno2x13",
                    } : nonAuthorizedUser
                )
            )
        )
    }

    login(loginData: LoginData): Promise<boolean> {
       return signInWithEmailAndPassword(this.authFire, loginData.email, loginData.password)
           .then(() => true)
           .catch(() => false);
    }

    logout(): Promise<boolean> {
        return signOut(this.authFire)
            .then(() => true)
            .catch(() => false);
    }
}