import {ServerErrorType} from "../models/common/server-error-type";

export async function fetchFromRestServer(url: string, init: RequestInit): Promise<any> {
    let flIntException = false;
    try {
        const response = await fetch(url, {
            headers: init.headers,
            method: init.method,
            body: init.body,
        });
        console.log(response);
        if (response.status < 400 || response.status === 404) {
            return response;
        }
        if (response.status === 401 || response.status === 403) {
            throw ServerErrorType.userIsNotAuth;
            flIntException = true;
        } else {
            throw ServerErrorType.serverIsNotAvailable;
            flIntException = true;
        }

    } catch (err) {
        if(flIntException) {
            throw err;
        } else {
            throw ServerErrorType.serverIsNotAvailable;
        }
    }
}