import {Alert, Typography} from "@mui/material";
import React, {Fragment, useState} from "react";
import { authService } from "../../config/servicesConfig";
import { LoginData } from "../../models/common/login-data";
import LoginForm from "../common/login-form";
import configData from "../../config/courseData.json"
import { Navigate } from "react-router-dom";
import { PATH_COURSES } from "../../config/routes-сonfig";



const Login: React.FC = () => {
    const [isServerAvailable, setIsServerAvailable] = useState(true);
    async function loginFn(loginData: LoginData): Promise<boolean> {
        try {
            const result = await authService.login(loginData);
            setIsServerAvailable(true);
            if (result) {
                setNavigateFl(true);
            }
            return result;
        } catch (e) {
            console.log(e);
            setIsServerAvailable(false);
            return true;
        }
    }
    const [navigateFl, setNavigateFl] = useState<boolean>(false);
    return <Fragment>
                {!isServerAvailable && <Alert severity="error">Server is unavailable!</Alert>}
                <LoginForm 
                    loginFn={loginFn}
                    passwordValidationFn={function (password: string): string {
                        return password.length < configData.passwordLength ? 
                    `Pasword must be greater or equual then ${configData.passwordLength} characters` : "";        
                    }} />
                {navigateFl && <Navigate to={PATH_COURSES}></Navigate>}
            </Fragment>
}

export default Login;