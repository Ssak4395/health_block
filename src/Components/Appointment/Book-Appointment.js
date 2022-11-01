import {Box, Button, TextField} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {date, number, object, string} from "yup";
import axios from "axios";


const initialValues = {
    appointment_date: "",
    appointment_address: "",
    appointment_notes: "",
    appointment_doctor_name: "",
    appointment_type: "",
    doctor_public_address: "",
}

function BookAppointment(props){
    return(
        <div className="MaterialForm">
            <div><h1 style={{textAlign:'center',paddingTop:'100px',paddingBottom:'100px',color:"black"}}>Please enter your details</h1></div>
            <Formik initialValues={initialValues} onSubmit={(values,formikHelpers) => {
                let toSend = {
                    appointment_date:values.appointment_date,
                    appointment_address:values.appointment_address,
                    appointment_notes: values.appointment_notes,
                    appointment_doctor_name:values.appointment_doctor_name,
                    appointment_type:values.appointment_type,
                    doctor_public_address: values.doctor_public_address,

                }
                //submitToDatabase(toSend,navigate)

                submitToDatabase(values)
                formikHelpers.resetForm();
            }}
                    validationSchema={object({
                        appointment_date: string().required("Please enter an Appointment Date"),
                        appointment_address: string().required("Please enter an Address."),
                        appointment_notes : string().required("Please enter an address"),
                        appointment_doctor_name: string().required("Please enter a date"),
                        appointment_type: string().required("Please input an appointment type"),
                        doctor_public_address: string().required("Please enter the doctor's public address")

                    })}
            >
                {({ errors, isValid, touched, dirty }) => (<Form className="FormPadding">
                    <p>Appointment Date</p>
                    <Field name="appointment_date"   type="date" variant="outlined" color="primary"  fullWidth error={Boolean(errors.appointment_date) && Boolean(touched.dateOfBirth)} helperText={Boolean(touched.dateOfBirth) && errors.dateOfBirth}/>
                    <Box height={14}/>
                    <Field name="appointment_address" as={TextField}  type="text" variant="outlined" color="primary" label="Appointment Address" fullWidth error={Boolean(errors.appointment_address) && Boolean(touched.appointment_address)} helperText={Boolean(touched.appointment_address) && errors.appointment_address}/>
                    <Box height={14}/>
                    <Field name="appointment_notes"  as={TextField}  type="text" variant="outlined" color="primary" label="Appointment Notes" fullWidth error={Boolean(errors.appointment_notes) && Boolean(touched.appointment_notes)} helperText={Boolean(touched.appointment_notes) && errors.appointment_notes}/>
                    <Box height={14}/>
                    <Field name="appointment_doctor_name"   as={TextField} variant="outlined" color="primary" label="Doctor Name"  fullWidth error={Boolean(errors.appointment_doctor_name) && Boolean(touched.appointment_doctor_name)} helperText={Boolean(touched.appointment_doctor_name) && errors.appointment_doctor_name}/>
                    <Box height={14}/>
                    <Field name="appointment_type" as={TextField}  type="text" variant="outlined" color="primary" label="Appointment Type" fullWidth error={Boolean(errors.appointment_type) && Boolean(touched.appointment_type)} helperText={Boolean(touched.appointment_type) && errors.appointment_type}/>
                    <Box height={14}/>
                    <Field name="doctor_public_address" as={TextField}  type="text" variant="outlined" color="primary" label="Doctor Public Address" fullWidth error={Boolean(errors.doctor_public_address) && Boolean(touched.doctor_public_address)} helperText={Boolean(touched.doctor_public_address) && errors.doctor_public_address}/>
                    <Box height={18}/>
                    <Button type="submit"  variant="contained" color="primary" size="large" disabled={!dirty || !isValid}>Submit</Button>
                </Form>)}
            </Formik>
        </div>
    );
}


const submitToDatabase = (values)=> {
    axios.post("http://localhost:3001/create-appointment",{
        appointment_date:values.appointment_date,
        appointment_address:values.appointment_address,
        appointment_notes:values.appointment_notes,
        appointment_doctor_name:values.appointment_doctor_name,
        appointment_type:values.appointment_type,
        doctor_public_address:values.doctor_public_address,
        patient_public_address:localStorage.getItem("public_address")
    }).then((result)=>{
        console.log('the result is', result)
    })
}

export default BookAppointment