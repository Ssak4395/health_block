import axios from "axios";
import {Card} from "@mui/material";
import CardButton from "./Card";
import Cards from "./Cards";

function Register(props){
    console.log("the web3 provider is ", props.web3_provider)
    return(
        <div>
            <body style={{backgroundColor:"white"}}>
            <h1 style={{textAlign:'center',paddingTop:'100px',color:"black"}}>To get started, please select your role!</h1>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <Cards public_address = {props.public_address} web_3_provider = {props.web3_provider}></Cards>
            </div>
            </body>
        </div>
    );
}
export default Register;