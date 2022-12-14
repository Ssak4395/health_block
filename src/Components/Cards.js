import nCard from "./Card";
import Card from "./Card";
import doctor from "../assets/images/Doctor.png"
import patient from "../assets/images/Patient.png"
import chemist from "../assets/images/Chemist.png"
import CardButton from "./Card";

const Cards = props => {
   const chemistTitle = "Pathologist"
    const doctorTitle = "Doctor"
    const patientTitle = "Patient"

    const doctorPara = "Review patient documents, prescribe drugs, view clinical records, immunisation history."
    const chemistPara = "View test results, send test results to patients and liase with Doctors regarding patient treatment"
    const patientPara = "Book appointments, update personal information and view current appointments as a Patient!"

    const className1Doctor =  "card-body text-dark bgdoctor"
    const className2Doctor = "overflow-auto bgdoctor"
    return (
        <div className="container-fluid d-flex justify-content-center">
         <div className="row">
             <div className="col-md-4">
                 <CardButton public_address = {props.public_address} location={doctor} title={doctorTitle} className1={className1Doctor} className2={className2Doctor} paragraph={doctorPara} web3_provider = {props.web_3_provider}></CardButton>
             </div>
             <div className="col-md-4">
                 <CardButton public_address = {props.public_address} location={patient} title={patientTitle}  paragraph={patientPara} web3_provider = {props.web_3_provider}></CardButton>
             </div>
             <div className="col-md-4">
                 <CardButton public_address = {props.public_address} location={chemist} title={chemistTitle}  paragraph={chemistPara} web3_provider = {props.web_3_provider}></CardButton>
             </div>
         </div>
        </div>
    );
}

export default Cards;