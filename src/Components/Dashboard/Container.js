import React from 'react'
import "../css/Container.css"
import DashboardCard from "./DashboardCard";
import prescriptionImage from "./dashboard-images/prescription.png"
import appointmentImage from "./dashboard-images/appointment.png"
import image from "./dashboard-images/upload.png"
import image2 from "./dashboard-images/prescription_img.png"
import {useNavigate} from "react-router-dom";



function Container(props){

    const Approval = "Request Approval"
    const Booking = "Book an appointment"
    const UploadDocument = "Upload Document"
    const Prescription = "Create a Prescription"

    const ApprovalPara = "Request data approval from patients"
    const BookingPara = "Book an appointment with a Physician now."
    const UploadDocumentPara = "Upload and encrypt documents so they can be stored safely in IPFS"
    const PresPara = "Create a prescription for your patients."


    const ApprovalClass=  "card-body text-dark bgPrescriptionCard"
    const bookingClass = "card-body text-dark bgBooking"
    const uploadClass = "card-body text-dark bgUpload"
    const approvalClass= "card-body text-dark bgUpload"
    const prescriptionClass = "card-body text-dark bgUpload"
    const image1 = image

    const navigate = useNavigate()

    const navigateRequestApproval = () => {
        navigate("/Dashboard/Request-Approval")
    }

    const navigatePrescription = () => {
        navigate("/Dashboard/New-Prescription")
    }

    return(

       <div className="outer">
           <div className="inner">
               <h1 style={{textAlign:'center',paddingBottom:'200px',color:"black"}}>Please make a selection.</h1>
               <div className="flexbox-container">
                   <div className="card-div">
                       <DashboardCard className1={ApprovalClass} location={prescriptionImage} title={Approval}
                                      paragraph={ApprovalPara} onClick={navigateRequestApproval}/>
                   </div>

                   <div className="card-div">
                       <DashboardCard className1={bookingClass} location={appointmentImage} title={Booking}
                                      paragraph={BookingPara} onClick={onclick}/>
                   </div>

                   <div className="card-div">
                       <DashboardCard className1={uploadClass} location={image1} title={UploadDocument}
                                      paragraph={UploadDocumentPara} onClick={onclick}/>
                   </div>

                   <div className="card-div">
                       <DashboardCard className1={prescriptionClass} location={image2} title={Prescription}
                                      paragraph={PresPara} onClick={navigatePrescription}/>
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

export default Container