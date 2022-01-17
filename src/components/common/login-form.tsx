import { Box, Button, TextField } from "@mui/material";
import {FC, useState, useEffect} from "react";
import { LoginData } from "../../models/common/login-data"; 

type LoginFormProps = {
    loginFn: (loginData: LoginData) => Promise<boolean>;
    //если все ок, то passwordValidationFn будет возвращать пустую строку. Если не ок, то текст ошибки
    passwordValidationFn: (password: string) => string;
}
const emptyloginData: LoginData = {
    email: "",
    password: "",
}

const LoginForm: FC<LoginFormProps> = (props) => {
    const {loginFn, passwordValidationFn} = props;
    const [loginData, setLoginData] = useState<LoginData>(emptyloginData);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [flValid, setFlValid] = useState<boolean>(false);
    useEffect(() => {
        setFlValid(!!loginData.email && !passwordValidationFn(loginData.password));
        return () => {}
    }, [loginData])

    async function onSubmit(event: any) {
        event.preventDefault();
        const res: boolean = await loginFn(loginData);
        if(!res) {
            alert("Email and/or password is incorrect");
        } else {
            alert("Login successfully")
        }
    }
    function usernameHandler(event: any) {
        loginData.email = event.target.value;
        setLoginData({...loginData});
    }
    function passwordHandler(event: any) {
        const enteredPassword: string = event.target.value;
        const message = passwordValidationFn(enteredPassword);
        setErrorMessage(message);
        loginData.password = enteredPassword;
        setLoginData({...loginData});
    }

    return (       
        <Box 
            component ="form"
            onSubmit={onSubmit}
            onReset={() => setLoginData(emptyloginData)}
            sx={{display: "flex", flexDirection: "column"}}>
            <TextField
                required
                id="outlined-email-input"
                label="Email"
                type="email"
                autoComplete="current-email"
                onChange={usernameHandler}
            />
            <TextField
                error={!!errorMessage}
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                helperText={errorMessage}
                onChange={passwordHandler}
            />
            <Button type="submit" disabled ={!flValid} variant="contained">Login</Button>
            <Button type="reset"> Reset</Button>
        </Box>
    );
};

export default LoginForm;