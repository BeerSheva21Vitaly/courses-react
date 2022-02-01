import AuthService from "./auth-service";
import {Observable} from "rxjs";
import {LoginData} from "../models/common/login-data";
import {nonAuthorizedUser, UserData} from "../models/common/user-data";
import appFire from "../config/fire-config"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {authState} from "rxfire/auth";
import {map, mergeMap} from "rxjs/operators";
import {collectionData} from "rxfire/firestore";
import {collection, CollectionReference, getFirestore} from "firebase/firestore";

export default class AuthServiceFire implements AuthService {
    private authFire = getAuth(appFire);
    private collectionAuth: CollectionReference;
    constructor(private collectionAdministrators: string) {
        this.collectionAuth = collection(getFirestore(appFire), this.collectionAdministrators);
    };
    getUserData(): Observable<UserData> {
        return authState(this.authFire).pipe(
            mergeMap(userFire => {
                return collectionData(this.collectionAuth).pipe(
                    map(admins => (
                        !!userFire ? {
                                    username: userFire.uid,
                                    displayName: userFire.displayName || userFire.email as string,
                                    isAdmin: admins.findIndex(doc => doc.email == userFire.email) >= 0
                                } : nonAuthorizedUser
                    ))
                )
            })
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