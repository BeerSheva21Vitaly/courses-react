import { Box, Button, TextField } from "@mui/material";
import React, {FC, useState, useEffect} from "react";
import { LoginData } from "../../models/common/login-data";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {OAuthProvider} from "../../models/common/oauth-provider-type";


type LoginFormProps = {
    loginFn: (loginData: LoginData) => Promise<boolean>;
    //если все ок, то passwordValidationFn будет возвращать пустую строку. Если не ок, то текст ошибки
    passwordValidationFn: (password: string) => string;
    oauthProviders: OAuthProvider[];
}
const emptyloginData: LoginData = {
    email: "",
    password: "",
}
function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
const theme = createTheme();

const LoginForm: FC<LoginFormProps> = (props) => {
    const {loginFn, passwordValidationFn, oauthProviders} = props;
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
            // alert("Login successfully")
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

    async function oauthProvidersHandler(name: string, event: any) {
        loginData.email = name;
        loginData.password = "";
        setLoginData({...loginData})
        await onSubmit(event);
    }

    function getOAuthProviders(): React.ReactNode[] {
        return oauthProviders.map(provider => {
            return <Button
                        key={provider.name}
                        sx={{
                            p: 1,
                            m: 1,
                        }}
                        variant="outlined"
                        onClick={(event) => oauthProvidersHandler(provider.name, event)}
                    >
                <img
                    src={`${provider.iconLink}`}
                    width={'30px'}
                    height={'30px'}
                />
                <Typography
                    sx={{
                        marginLeft: 1,
                    }}
                >
                    {provider.name}
                </Typography>

            </Button>
        })
    }

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={usernameHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errorMessage}
                helperText={errorMessage}
                onChange={passwordHandler}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Typography>or login with </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    {getOAuthProviders()}
                </Box>
            </Box>

          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    );
};



export default LoginForm;