import { Typography } from "@mui/material";
import React, {Fragment, useState} from "react";
import { authService } from "../../config/servicesConfig";
import { LoginData } from "../../models/common/login-data";
import LoginForm from "../common/login-form";
import configData from "../../config/courseData.json"
import { Navigate } from "react-router-dom";
import { PATH_COURSES } from "../../config/routes-сonfig";



const Login: React.FC = () => {
    async function loginFn(loginData: LoginData): Promise<boolean> {
        const result = await authService.login(loginData);
        if(result) {
            setNavigateFl(true);
        }
        return result;
    }
    const [navigateFl, setNavigateFl] = useState<boolean>(false);
    return <Fragment>
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