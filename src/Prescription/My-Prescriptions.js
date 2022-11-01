import "../Prescription/css/My-Prescriptions.css"
import prescriptionImage from "../Components/Dashboard/dashboard-images/prescription.png"

import {Box, List, ListItem} from "@mui/material";
import PrescriptionCard from "./Prescription-Card";
import {useEffect, useState} from "react";
import axios from "axios";
import User from "../abi/abis";
import Web3 from "web3";

function UserPrescriptions(){
    const[userPrescriptions,setUserprescriptions] = useState([]);

        let list = localStorage.getItem("myUserList")


    useEffect(()=> {
        if(list === null){
          axios.get("http://localhost:3001/get-prescription",{params:{
              address:localStorage.getItem("public_address")
              }}).then(result => {
                  console.log(result)
              localStorage.setItem("myUserList",JSON.stringify(result.data));
              setUserprescriptions(JSON.parse(localStorage.getItem("myUserList") || "[]"));
          })
        }else{
            setUserprescriptions(JSON.parse(localStorage.getItem("myUserList") || "[]"));


        }

    },[])


    const doSomething = (id) => {
            console.log("THE ID IS ",id)
          const newArray = userPrescriptions.filter((item)=> {
              return item.idprescription != id;
          })
        const web3 = new Web3(detectCurrentProvider());
        const UserContract = new web3.eth.Contract(User.value, "0x47518BAA6a991E61BBc6761bC1f67b89FB5AdE1d", {
            from: localStorage.getItem("public_address")
        })

        const pushToArray = UserContract.methods.approvedPrescription(localStorage.getItem("public_address"),id).send().then((res,err) => {
            if(err){
                alert("Something went wrong")
            }else{
                setUserprescriptions(newArray);
                localStorage.setItem("myUserList",JSON.stringify(newArray));
                alert("Committed to the blockchain.");

            }
        });

    }
    console.log("The user prescriptions are", userPrescriptions)

    return(
     <div>
         <div className="center-screen">
             <Box style={{borderRadius: '16px', backgroundColor: '#D0CEBA',width:"700px",height:"1000px"}} >
                 <h1>Your Prescriptions</h1>
                 <ul style={{display: "inline",
                     listStyle: "none",
                     margin: 0,
                     padding: 0}}>
                     {
                         userPrescriptions.map((item)=>{
                             return <li style={{ display: "inline-block",
                                 width: "50%",padding:"10px"}}>
                                 <PrescriptionCard id={item.idprescription}doctor_name={item.doctor_name} drug_name={item.drug_name} practice_id={item.practice_id} prescription_number={item.prescription_number} handleClick={doSomething} ></PrescriptionCard>
                             </li>
                         })
                     }
                 </ul>

             </Box>
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

export default UserPrescriptions;