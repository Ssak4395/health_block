import "../css/Dashboard.css"
import {
    FaUser,
    FaPrescriptionBottleAlt,
    FaCloudUploadAlt,
    FaCalendarPlus,
    FaHospitalAlt,
    FaSignOutAlt,
} from "react-icons/fa";
import {blue} from "@mui/material/colors";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
const Menu = (props) =>{

    const navigate = useNavigate();

    useEffect(()=> {
        const mainMenuLi = document.getElementById("mainMenu").querySelectorAll("li");

        function changeActive(){
            mainMenuLi.forEach(n=>n.classList.remove('active'));
            this.classList.add("active");
        }

        mainMenuLi.forEach(n => n.addEventListener('click',changeActive))

    })

    const approvalsPage = () => {
        navigate("/Dashboard/Approvals");
    }


    return (
        <menu>
            <ul id="mainMenu">
                <Icon onClick={()=>alert("Hi")} icon={<FaUser onClick={approvalsPage} size={40} />} />
                <Icon icon={<FaPrescriptionBottleAlt size={40}/>} />
                <Icon icon={<FaCloudUploadAlt size={40} />} />
                <Icon icon={<FaCalendarPlus size={40} />} />
                <Icon icon={<FaHospitalAlt size={40} />} />
            </ul>

            <ul className="lastMenu">
                <Icon icon={<FaSignOutAlt size={40}/>} />
            </ul>
        </menu>
    );
}

const Icon = ({ icon }) => (
    <li>
        <a onClick={check}>{icon}</a>
    </li>
);

const check = () => {
    console.log("Hello")
}





export default Menu;