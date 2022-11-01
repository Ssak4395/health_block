import "./Appointment.css"
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

function Appointment(props){

    const navigate = useNavigate()

    const navigateToActiveAppointments = () => {
        navigate("/Dashboard/Appointment/Book-Appointment")
    }

    return(
        <div>
            <div className="split left">
                <div className="centered">
                    <Button
                        style={{
                            borderRadius: 35,
                            backgroundColor: "#000000",
                            padding: "18px 36px",
                            fontSize: "18px"
                        }}
                        variant="contained"
                        onClick={onclick}
                    >
                        View Active Appointments
                    </Button>
                </div>
            </div>

            <div className="split right">
                <div className="centered">
                    <Button
                        style={{
                            borderRadius: 35,
                            backgroundColor: "#000000",
                            padding: "18px 36px",
                            fontSize: "18px"
                        }}
                        variant="contained"
                        onClick={navigateToActiveAppointments}
                    >
                        Book Appointment
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Appointment;