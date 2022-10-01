import "../css/Dashboard.css"
import Logo from "../../assets/images/logo.png"
import { FaRegUser } from "react-icons/fa";
import Menu from "./Menu";
import Container from "./Container";

const Dashboard = (props) => {
    return(
        <div className="MainDiv">
            <Menu/>
            <Container/>
        </div>
    );
}


export default Dashboard;