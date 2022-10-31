import {Button} from "@mui/material";
import "./css/My-Prescriptions.css"
import boiler from  "./images/user-prescription.png"

function PrescriptionCard(props){



    return(
        <div className="card">
            <img  src={boiler} alt="Avatar" style={{width:"75px",height:"75px",display:"block",marginLeft:"auto",marginRight:"auto",paddingTop:"10px"}}/>
            <div className="container_card">
                <h4><b>{props.drug_name}</b></h4>
                <p><b>Doctor Name: </b>{props.doctor_name}</p>
                <p><b>Practice ID: </b> {props.practice_id}</p>
                <p><b>Prescription ID:</b> {props.prescription_number}</p>
                <Button onClick={()=>props.handleClick(props.id)}>
                    Dispatch
                </Button>
            </div>
        </div>
    )
}



function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

export default PrescriptionCard;