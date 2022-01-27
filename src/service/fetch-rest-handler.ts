import {ServerErrorType} from "../models/common/server-error-type";

export async function fetchFromRestServer(url: string, init: RequestInit): Promise<any> {
    try {
        const response = await fetch(url, {
            headers: init.headers,
            method: init.method,
            body: init.body,
        });
        if (response.status === 401 || response.status === 403) {
            throw ServerErrorType.userIsNotAuth;
        }
        return await response;
    } catch (err) {
        throw ServerErrorType.serverIsNotAvailable;
    }
}