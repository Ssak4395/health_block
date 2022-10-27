import {Box} from "@mui/material";
import {Field, Form, Formik,touched} from "formik";
import {Button, Input, TextField} from "@mui/material";
import {date, number, object, string} from "yup";
import User from "../abi/abis";
import axios from "axios";



const initialValues = {
    patient_public_address: "",
    prescription_number: "",
    drug_name: "",
    drug_manu: "",
    patient_age: "",
    practice_id: "",
    drug_dosage:"",
    drug_frequency:"",
    doctor_name:"",
    physician_license_number:""
}

function PrescriptionForm(props){
    const address = localStorage.getItem("public_address");

    return(
        <div>
            <h1>Input Prescription Details</h1>
            <div>
                <Box height={100}/>
                <Formik initialValues={initialValues} onSubmit={(values,formikHelpers) => {
                    console.log("The values are ", values)
                    formikHelpers.resetForm();
                    pushToDatabase(props.web3,address,values)
                }}
                        validationSchema={object({
                            patient_public_address: string().required("Please enter the patient public address!"),
                            prescription_number: string().required("Please enter the prescription number."),
                            drug_name : string().required("Please enter the drug dosage."),
                            drug_manu: string().required("Please enter the drug manufacturer."),
                            patient_age: number().required("Please input a valid number"),
                            practice_id: string().required("Please enter your practice ID"),
                            drug_dosage:string().required("Please enter drug dosage"),
                            drug_frequency:string().required("Please enter drug frequency"),
                            doctor_name:string().required("Please enter your name"),
                            physician_license_number:number().required("Please input a valid number")

                        })}>{({ errors, isValid, touched, dirty }) => (
                        <Form className="FormPadding">

                            <Field  name="patient_public_address" as={TextField}  type="text" variant="outlined" color="primary" label="Patient Public Address" fullWidth error={Boolean(errors.patient_public_address) && Boolean(touched.patient_public_address)} helperText={Boolean(touched.patient_public_address) && errors.patient_public_address}/>
                            <Box height={14}/>
                            <Field name="prescription_number" as={TextField}  type="text" variant="outlined" color="primary" label="Prescription Number" fullWidth error={Boolean(errors.prescription_number) && Boolean(touched.prescription_number)} helperText={Boolean(touched.prescription_number) && errors.prescription_number} />
                            <Box height={14}/>
                            <Field name="drug_name" as={TextField}  type="text" variant="outlined" color="primary" label="Drug Name" fullWidth error={Boolean(errors.drug_name) && Boolean(touched.drug_name)} helperText={Boolean(touched.drug_name) && errors.drug_name}  />
                            <Box height={14}/>

                            <Field name="drug_manu" as={TextField}  type="text" variant="outlined" color="primary" label="Drug Manufacturer" fullWidth error={Boolean(errors.drug_manu) && Boolean(touched.drug_manu)} helperText={Boolean(touched.drug_manu) && errors.drug_manu} />

                            <Box height={14}/>
                            <Field name="patient_age" as={TextField}  type="text" variant="outlined" color="primary" label="Patient Age" fullWidth error={Boolean(errors.patient_age) && Boolean(touched.patient_age)} helperText={Boolean(touched.patient_age) && errors.patient_age} />

                            <Box height={14}/>
                            <Field name="practice_id" as={TextField}  type="text" variant="outlined" color="primary" label="Practice ID" fullWidth error={Boolean(errors.practice_id) && Boolean(touched.practice_id)} helperText={Boolean(touched.practice_id) && errors.practice_id} />

                            <Box height={14}/>
                            <Field name="drug_dosage" as={TextField}  type="text" variant="outlined" color="primary" label="Drug Dosage" fullWidth error={Boolean(errors.drug_dosage) && Boolean(touched.drug_dosage)} helperText={Boolean(touched.drug_dosage) && errors.drug_dosage} />

                            <Box height={14}/>
                            <Field name="drug_frequency" as={TextField}  type="text" variant="outlined" color="primary" label="Drug Frequency" fullWidth error={Boolean(errors.drug_frequency) && Boolean(touched.drug_frequency)} helperText={Boolean(touched.drug_frequency) && errors.drug_frequency} />

                            <Box height={14}/>
                            <Field name="doctor_name" as={TextField}  type="text" variant="outlined" color="primary" label="Doctor Name" fullWidth error={Boolean(errors.doctor_name) && Boolean(touched.doctor_name)} helperText={Boolean(touched.doctor_name) && errors.doctor_name} />

                            <Box height={14}/>
                            <Field name="physician_license_number" as={TextField}  type="text" variant="outlined" color="primary" label="Physician License Number" fullWidth error={Boolean(errors.physician_license_number) && Boolean(touched.physician_license_number)} helperText={Boolean(touched.physician_license_number) && errors.physician_license_number} />
                            <Box height={14}/>
                            <Button type="submit"  variant="contained" color="primary" size="large" disabled={!dirty || !isValid}>Submit</Button>
                        </Form>)}
                    </Formik>
            </div>
        </div>
    );
}

const pushToDatabase = (web3,address,values) => {
    const UserContract = new web3.eth.Contract(User.value, "0xEeA1fcb8280d3723d0930C5fB8281D93929D4e2f", {
        from: address
    })

    const userRole = UserContract.methods.getUserRole(address).call();

    userRole.then((res) => {
        if(res === "DOCTOR"){
            console.log(values.patient_address)
            axios.post("http://localhost:3001/prescribe-patient",{
                doctor_public_address:address,
                drug_name:values.drug_name,
                drug_manufacturer:values.drug_manu,
                patient_age:values.patient_age,
                practice_id:values.practice_id,
                drug_dosage:values.drug_dosage,
                doctor_name:values.doctor_name,
                doctor_license_number:values.physician_license_number,
                patient_address:values.patient_public_address

            }).then((result) => {
                console.log("result is", result)
            })
        }
    })
}






export default PrescriptionForm;