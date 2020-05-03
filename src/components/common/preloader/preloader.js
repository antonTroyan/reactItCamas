import loader from "../../../assets/images/loader.gif";
import React from "react";

let Preloader = () => {
    return (
        <div>
            <img src={loader} style={{width: 50, height: 50}}/>
        </div>
    )
};

export default Preloader;