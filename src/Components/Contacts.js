import axios from "axios";
import {Card} from "@mui/material";
import CardButton from "./Card";
import Cards from "./Cards";

function Contacts(props){
/*
    axios(
        {
            method:'get',
            url:'http://localhost:3001/'
        }
    ).then((resp) => {
        console.log("The response ", resp.data);
    })


    axios({
        method:'post',
        url:'http://localhost:3001/create',
        data:{
            public_address:props.public_address
        }
    }).then((result) => {
        console.log("The result is",result.status);
    },(error) => {
        console.log(error)
    });*/

    return(
        <div>
            <body style={{backgroundColor:"white"}}>
            <h1 style={{textAlign:'center',paddingTop:'100px',color:"black"}}>To get started, please select your role!</h1>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <Cards></Cards>
            </div>
            </body>
        </div>
    );
}
export default Contacts;