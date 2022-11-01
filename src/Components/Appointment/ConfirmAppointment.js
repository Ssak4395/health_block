import {useEffect, useState} from "react";
import axios from "axios";
import {Box} from "@mui/material";
import AppointmentCard from "./AppointmentCard";

function ConfirmAppointment(props){

    const[appointmentList, setAppointmentList] = useState([]);

    let localStorageList = localStorage.getItem("myAppointmentList");


    useEffect(()=>{
        if(localStorageList === null){
            axios.get("http://localhost:3001/get-appointments",{
                params:{
                    address:localStorage.getItem("public_address")
                }
            }).then(result =>{
                localStorage.setItem("myAppointmentList",JSON.stringify(result.data))
                setAppointmentList(JSON.parse(localStorage.getItem("myAppointmentList") || "[]"))
            })
        }else{
            setAppointmentList(JSON.parse(localStorage.getItem("myAppointmentList") || "[]"))
        }
    },[])
    console.log(appointmentList)
    return(
        <div>
           <div className="center-screen">
               <Box style={{borderRadius: '16px', backgroundColor: '#D0CEBA',width:"700px",height:"1000px"}} >
                   <h1>Confirm Appointments</h1>
                   <ul style={{display: "inline",
                       listStyle: "none",
                       margin: 0,
                       padding: 0}}>
                       {
                           appointmentList.map(item=>{
                               return <li style={{ display: "inline-block",
                                   width: "50%",padding:"10px"}}>
                                   <AppointmentCard type={item.appointment_type} address={item.appointment_address} id={item.idappointment} date={item.appointment_date} notes={item.appointment_notes} ></AppointmentCard>
                               </li>
                           })
                       }
                   </ul>
               </Box>
           </div>
        </div>
    )
}

export default ConfirmAppointment;