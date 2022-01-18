import { Box, Button, Typography } from "@mui/material";
import React, {Fragment, useState} from "react";
import { Navigate } from "react-router-dom";
import { PATH_LOGIN } from "../../config/routes-сonfig";
import { authService } from "../../config/servicesConfig";
import { LoginData } from "../../models/common/login-data";

const Logout: React.FC = () => {
    async function logoutFn(): Promise<boolean> {
        const result = await authService.logout();
        if(result) {
            setNavigateFl(true);
        }
        return result;
    }
    const [navigateFl, setNavigateFl] = useState<boolean>(false);

    return <Fragment>
        <Box>
            <Button
                onClick={logoutFn}>
                Logout
            </Button>
        </Box>
        {navigateFl && <Navigate to={PATH_LOGIN}></Navigate>}
    </Fragment>
    
}
export default Logout;