import "../css/card-style.css"
import {Button} from "@mui/material";

const DashboardCard = props => {

    return(
        <div className="card text-center inner " >
            <div className={props.className1}>
                <img src={props.location} className="card-img-top"/>
            </div>
            <div className="overflow-auto bgBlack">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text text-secondary">{props.paragraph}</p>
                <Button onClick={props.onClick}>Submit</Button>
            </div>
        </div>
    )
}


export default DashboardCard;