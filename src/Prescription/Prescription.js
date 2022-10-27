import "./css/Prescription.css"
import PrescriptionTable from "./PrescriptionTable";
import PrescriptionForm from "./PrescriptionForm";
import Web3 from "web3"
import {useEffect} from "react";

function Prescription(){

        const currentProvider = detectCurrentProvider();
        const web3 = new Web3(currentProvider);




    return(
        <div>
            <div className="split left">
                <div className="centered">
                   <PrescriptionTable provider={currentProvider} web3={web3}/>
                </div>
            </div>

            <div className="split right">
                <div className="centered">
                    <PrescriptionForm web3={web3} provider={currentProvider}/>
                </div>
            </div>
        </div>
    );

}

const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
        provider = window.ethereum;
    } else if (window.web3) {
        provider = window.web3.currentProvider;
    } else {
        console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
};


export default Prescription;

