import AuthService from "./auth-service";
import {Observable} from "rxjs";
import {LoginData} from "../models/common/login-data";
import {nonAuthorizedUser, UserData} from "../models/common/user-data";
import appFire from "../config/fire-config"
import { getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {authState} from "rxfire/auth";
import {map, mergeMap} from "rxjs/operators";
import {collectionData} from "rxfire/firestore";
import {collection, CollectionReference, getFirestore} from "firebase/firestore";
import {GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider} from "firebase/auth";
import {OAuthProvider} from "../models/common/oauth-provider-type";
import {AuthProviderEnum} from "../models/common/auth-provider-enum";

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
                                    isAdmin: admins.findIndex(doc => doc.id == userFire.uid) >= 0
                                } : nonAuthorizedUser
                    ))
                )
            })
        )
    }

    login(loginData: LoginData): Promise<boolean> {
        if(loginData.password) {
            return this.loginWithEmailPassword(loginData)
        } else {
            return this.loginWithOAuthProviders(loginData);
        }
    }

    private loginWithOAuthProviders(loginData: LoginData) {
        switch(loginData.email) {
            case(AuthProviderEnum.google) : {
                return signInWithPopup(this.authFire, new GoogleAuthProvider())
                    .then(() => true)
                    .catch(() => false);
                break;
            }
            case(AuthProviderEnum.facebook): {
                return signInWithPopup(this.authFire, new FacebookAuthProvider())
                    .then(() => true)
                    .catch(() => false);
                break;
            }
            case(AuthProviderEnum.twitter): {
                return signInWithPopup(this.authFire, new TwitterAuthProvider())
                    .then(() => true)
                    .catch(() => false);
                break;
            }
            case(AuthProviderEnum.github): {
                return signInWithPopup(this.authFire, new GithubAuthProvider())
                    .then(() => true)
                    .catch(() => false);
                break;
            }
            default: {
                return  Promise.resolve(false);
            }
        }
    }

    private loginWithEmailPassword(loginData: LoginData) {
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