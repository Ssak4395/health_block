import React from 'react'
import doctor from "../assets/images/Doctor.png"
import patient from "../assets/images/Patient.png"
import chemist from "../assets/images/Chemist.png"
import "./css/card-style.css"
import {Button} from "@mui/material";

const CardButton = props => {
    return(
        <div className="card text-center inner " >
            <div className={props.className1}>
                <img src={props.location} className="card-img-top"/>
            </div>
            <div className={props.className2}>
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text text-secondary">{props.paragraph}</p>
                <Button>Submit</Button>
            </div>
        </div>
    )
}

export default CardButton;