import logo from './logo.svg';
import './App.css';
import Landing from "./Components/Landing";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Register from "./Components/Register";
import FormUser from "./Components/FormUser"
import {useState} from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import RequestApproval from "./Prescription/RequestApproval";
import Approvals from "./Prescription/Approvals";
import Prescription from "./Prescription/Prescription";
import MyPrescriptions from "./Prescription/My-Prescriptions";
import UserPrescriptions from "./Prescription/My-Prescriptions";
import Appointment from "./Components/Appointment/Appointment";
import BookAppointment from "./Components/Appointment/Book-Appointment";
import ConfirmAppointment from "./Components/Appointment/ConfirmAppointment";

function App() {
    const[ethBalance, setEthBalance] = useState(" ");
    const[public_address,setPublic_address] = useState("");
    const[web3Provider, setWeb3Provider] = useState(null)

    const setBalance = (balance) => {
        setEthBalance(balance)
    }




    return (
      <Router>
       <Routes>
           <Route  path="/" element={<Landing onBalanceUpdate={setBalance} onAddressUpdate={setPublic_address} setProvider = {setWeb3Provider}/>}></Route>
           <Route path="/Register" element={<Register balance={ethBalance} public_address={public_address} web3_provider = {web3Provider}  />} />
           <Route path="/Profile" element={<FormUser public_address={public_address}/>}/>
           <Route path="/Dashboard" element={<Dashboard public_address={public_address}/>}/>
           <Route path="/Dashboard/Request-Approval" element={<RequestApproval public_address={public_address}/>}/>
           <Route path="/Dashboard/Approvals" element={<Approvals/>}/>
           <Route path="/Dashboard/New-Prescription" element={<Prescription/>}/>
           <Route path="/Dashboard/My-Prescriptions" element={<UserPrescriptions/>}/>
           <Route path="/Dashboard/Appointment" element={<Appointment/>}/>
           <Route path="/Dashboard/Appointment/Book-Appointment" element={<BookAppointment/>}/>
           <Route path="/Dashboard/Confirm-Booking" element={<ConfirmAppointment/>}/>
       </Routes>
      </Router>

  );
}

export default App;
