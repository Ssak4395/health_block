import React, {useEffect, useState} from 'react'
import "../css/Container.css"
import DashboardCard from "./DashboardCard";
import prescriptionImage from "./dashboard-images/prescription.png"
import appointmentImage from "./dashboard-images/appointment.png"
import image from "./dashboard-images/upload.png"
import image2 from "./dashboard-images/prescription_img.png"
import confirm from "./dashboard-images/confirm.png"
import {useNavigate} from "react-router-dom";
import Web3 from "web3";
import User from "../../abi/abis";



function Container(props){


    const[userRole, setUserRole] = useState("");
    const Approval = "Request Approval"
    const Booking = "Book an appointment"
    const UploadDocument = "Upload Document"
    const Prescription = "Create a Prescription"
    const viewPrescriptions = "View your prescriptions";

    const ApprovalPara = "Request data approval from patients"
    const BookingPara = "Book an appointment with a Physician now."
    const UploadDocumentPara = "Upload and encrypt documents so they can be stored safely in IPFS"
    const PresPara = "Create a prescription for your patients."
    const viewPrescPara = "View and confirm your prescriptions"


    const ApprovalClass=  "card-body text-dark bgPrescriptionCard"
    const bookingClass = "card-body text-dark bgBooking"
    const uploadClass = "card-body text-dark bgUpload"
    const approvalClass= "card-body text-dark bgUpload"
    const prescriptionClass = "card-body text-dark bgUpload"
    const prescriptionConfirmationClass = "card-body text-dark bgUpload"

    const image1 = image

    const navigate = useNavigate()

    useEffect(()=>{
        const web3 = new Web3(detectCurrentProvider());
        const address = localStorage.getItem("public_address");

        const UserContract = new web3.eth.Contract(User.value, "0x2A0779387faE48b104af76C86835c13A457a4Ea5", {
            from: address
        })
        const currentUserRole = UserContract.methods.getUserRole(address).call();

        currentUserRole.then((result) => {
            setUserRole(result)
        })

    },[])


    console.log("my userrole is", userRole)



    const navigateRequestApproval = () => {
        navigate("/Dashboard/Request-Approval")
    }

    const navigatePrescription = () => {
        navigate("/Dashboard/New-Prescription")
    }

    const navigateViewPrescriptions = () => {
        navigate("/Dashboard/My-Prescriptions")
    }

    return(

       <div className="outer">
           <div className="inner">
               <h1 style={{textAlign:'center',paddingBottom:'200px',color:"black"}}>Please make a selection.</h1>
               <div className="flexbox-container">
                   <div className="card-div">
                       {userRole === "DOCTOR" &&

                           <DashboardCard  className1={ApprovalClass} location={prescriptionImage} title={Approval}
                                          paragraph={ApprovalPara} onClick={navigateRequestApproval}/>

                       }

                   </div>

                   <div className="card-div">
                       {
                           userRole === "PATIENT" &&
                           <DashboardCard className1={bookingClass} location={appointmentImage} title={Booking}
                                                                    paragraph={BookingPara} onClick={onclick}/>
                       }
                   </div>
                   <div className="card-div">
                       {
                           userRole === "PATIENT" &&
                           <DashboardCard className1={prescriptionConfirmationClass} location={confirm} title={viewPrescriptions}
                                          paragraph={viewPrescPara} onClick={navigateViewPrescriptions}/>
                       }
                   </div>

                   <div className="card-div">
                       <DashboardCard className1={uploadClass} location={image1} title={UploadDocument}
                                      paragraph={UploadDocumentPara} onClick={onclick}/>
                   </div>

                   <div className="card-div">
                       {
                           userRole === "DOCTOR" && <DashboardCard className1={prescriptionClass} location={image2} title={Prescription}
                                                                   paragraph={PresPara} onClick={navigatePrescription}/>
                       }
                   </div>


               </div>
           </div>
       </div>
        /*<div className="container">

            <div class="flexbox-container">
                <div className="card-div" >
                    <DashboardCard className1={prescriptionClass} location={prescriptionImage} title={Prescription} paragraph={PrescriptionPara} onClick={onclick}/>
                </div>

                <div className="card-div">
                    <DashboardCard className1={bookingClass} location={appointmentImage} title={Booking} paragraph={BookingPara} onClick={onclick}/>
                </div>

                <div className="card-div">
                    <DashboardCard className1={uploadClass} location={image1} title={UploadDocument} paragraph={UploadDocumentPara} onClick={onclick}/>
                </div>

            </div>
        </div>*/
    )
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

export default Container