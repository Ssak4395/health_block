import React from 'react'
import "./css/card-style.css"
import {Button} from "@mui/material";
import User from "../abi/abis";
import {useNavigate} from "react-router-dom";

const CardButton = props => {
    const navigate = useNavigate()
    return(
        <div className="card text-center inner " >
            <div className={props.className1}>
                <img src={props.location} className="card-img-top"/>
            </div>
            <div className={props.className2}>
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text text-secondary">{props.paragraph}</p>
                <Button onClick={() => invokeRole(props.public_address,props.title,props.web3_provider,navigate)}>Submit</Button>
            </div>
        </div>
    )
}




const invokeRole = async (public_address,title,web3,navigate) =>   {

    const UserContract = new web3.eth.Contract(User.value,"0x47518BAA6a991E61BBc6761bC1f67b89FB5AdE1d",{
        from:public_address
    })

    if(title === 'Doctor'){
       const result = await UserContract.methods.assignRoleAsDoctor(public_address).send(function (err,res) {
           if(err){
               alert("An error has occurred");
           }else{
               alert("Assigned user to DOCTOR ROLE");
           }
       });
       navigate("/Profile")
    }
    if(title === 'Patient'){
        const result = await UserContract.methods.assignRoleToPatient(public_address).send(function (err,res){
            if(err)
            {
                alert("An error has occurred");
            }else{
                alert("Assigned user to PATIENT ROLE");
            }
        });

        navigate('/Profile')

    }

    if(title === 'Pathologist'){
        const result = await UserContract.methods.assignRoleAsChemist(public_address).send(function (err,res){
            if(err)
            {
               alert("An error has occured")
            }else{
                alert("Assigned user to PATHOLOGIST ROLE")
            }
        });
        navigate('/Profile')
    }
}

export default CardButton;