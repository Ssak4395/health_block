import logo from './logo.svg';
import './App.css';
import Landing from "./Components/Landing";
import {ThemeProvider} from "@mui/material";
import landing_theme from "./Components/Themes/landing-themes";
import theme from "./Components/Themes/landing-themes";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Contacts from "./Components/Contacts";
import {useState} from "react";

function App() {
    const[ethBalance, setEthBalance] = useState(" ");
    const[public_address,setPublic_address] = useState("");

    const setBalance = (balance) => {
        setEthBalance(balance)
    }

    return (
      <Router>
       <Routes>
           <Route  path="/" element={<Landing onBalanceUpdate={setBalance} onAddressUpdate={setPublic_address}/>}></Route>
           <Route path="/contacts" element={<Contacts balance={ethBalance} public_address={public_address} />} />

       </Routes>
      </Router>

  );
}

export default App;
