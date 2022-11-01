import "./Appointment.css"
import boiler from "../../Prescription/images/user-prescription.png";
import {Button} from "@mui/material";

function AppointmentCard(props){
    return(
        <div className="card">
            <img  src={boiler} alt="Avatar" style={{width:"75px",height:"75px",display:"block",marginLeft:"auto",marginRight:"auto",paddingTop:"10px"}}/>
            <div className="container_card">
                <h4><b>{props.drug_name}</b></h4>
                <p><b>Appointment Date: </b>{props.date}</p>
                <p><b>Appointment Notes: </b> {props.notes}</p>
                <p><b>Appointment Address: </b> {props.address}</p>
                <p><b>Appointment Type: </b> {props.type}</p>
                <p><b>Appointment ID:</b> {props.id}</p>
                <Button onClick={()=>props.handleClick(props.id)}>
                    Confirm Appointment
                </Button>
            </div>
        </div>
    )
}

export default AppointmentCard;