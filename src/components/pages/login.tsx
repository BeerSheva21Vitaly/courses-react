import { Typography } from "@mui/material";
import React from "react";
import { authService } from "../../config/servicesConfig";
import { LoginData } from "../../models/common/login-data";
import LoginForm from "../common/login-form";
import configData from "../../config/courseData.json"

const Login: React.FC = () => {
    return <LoginForm loginFn={function (loginData: LoginData): Promise<boolean> {
        return authService.login(loginData);
    } } passwordValidationFn={function (password: string): string {
        return password.length < configData.passwordLength ? 
            `Pasword must be greater or equual then ${configData.passwordLength} characters` : "";        
    } } />
}

export default Login;