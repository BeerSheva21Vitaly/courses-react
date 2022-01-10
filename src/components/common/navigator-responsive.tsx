import React from "react";
import { useMediaQuery } from "react-responsive";
import MediaQuery from "react-responsive/dist/Component";
import { RouteType } from "../../models/common/route-type";
import NavigatorMobile from "./navigator-mobile";
import NavigatorWeb from "./navigator-web";


const NavigatorResponsive: React.FC<{items: RouteType[]}> = (props) => {
    const isLaptop = useMediaQuery({ query: '(min-width: 900px)' })
    
    return <div>
        {isLaptop ? <NavigatorWeb items={props.items} /> 
            : <NavigatorMobile items={props.items} />}
     </div>
};

export default NavigatorResponsive;