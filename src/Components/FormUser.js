import './css/form-style.css'
import {Field, Form, Formik,touched} from "formik";
import {Box, Button, Input, TextField} from "@mui/material";
import {object,string,date} from "yup"
import axios from "axios";
import {useNavigate} from "react-router-dom";


const initialValues = {
    firstName: "",
    lastName: "",
    address: "",
    dateOfBirth: null,
    ihiNumber: "",
    gender: "",


}

const FormUser =(props) => {
    const navigate = useNavigate()
    return(
        <div className="MaterialForm">
            <div><h1 style={{textAlign:'center',paddingTop:'100px',paddingBottom:'100px',color:"black"}}>Please enter your details</h1></div>
            <Formik initialValues={initialValues} onSubmit={(values,formikHelpers) => {
                let toSend = {
                    firstName:values.firstName,
                    lastName:values.lastName,
                    address: values.address,
                    dateOfBirth:values.dateOfBirth,
                    ihiNumber:values.ihiNumber,
                    gender: values.gender,
                    public_address: props.public_address
                }
                submitToDatabase(values,navigate)
                formikHelpers.resetForm();
            }}
            validationSchema={object({
                firstName: string().required("Please enter a First Name"),
                lastName: string().required("Please enter a Last Name"),
                address : string().required("Please enter an address"),
                dateOfBirth: date().required("Please enter a date"),
                ihiNumber: string().required("Please input a valid ihiNumber"),
                gender: string().required("Please enter your gender")

            })}
            >
                {({ errors, isValid, touched, dirty }) => (<Form className="FormPadding">
                    <Field name="firstName" as={TextField}  type="text" variant="outlined" color="primary" label="First Name" fullWidth error={Boolean(errors.firstName) && Boolean(touched.firstName)} helperText={Boolean(touched.firstName) && errors.firstName}/>
                    <Box height={14}/>
                    <Field name="lastName" as={TextField}  type="text" variant="outlined" color="primary" label="Last Name" fullWidth error={Boolean(errors.lastName) && Boolean(touched.lastName)} helperText={Boolean(touched.lastName) && errors.lastName}/>
                    <Box height={14}/>
                    <Field name="address"  as={TextField}  type="text" variant="outlined" color="primary" label="Address" fullWidth error={Boolean(errors.address) && Boolean(touched.address)} helperText={Boolean(touched.address) && errors.address}/>
                    <Box height={14}/>
                    <Field name="dateOfBirth"   type="date" variant="outlined" color="primary"  fullWidth error={Boolean(errors.dateOfBirth) && Boolean(touched.dateOfBirth)} helperText={Boolean(touched.dateOfBirth) && errors.dateOfBirth}/>
                    <Box height={14}/>
                    <Field name="ihiNumber" as={TextField}  type="text" variant="outlined" color="primary" label="Healthcare Identifer" fullWidth error={Boolean(errors.ihiNumber) && Boolean(touched.ihiNumber)} helperText={Boolean(touched.ihiNumber) && errors.ihiNumber}/>
                    <Box height={14}/>
                    <Field name="gender" as={TextField}  type="text" variant="outlined" color="primary" label="Gender" fullWidth error={Boolean(errors.gender) && Boolean(touched.gender)} helperText={Boolean(touched.gender) && errors.gender}/>
                    <Box height={18}/>
                    <Button type="submit"  variant="contained" color="primary" size="large" disabled={!dirty || !isValid}>Submit</Button>
                </Form>)}
            </Formik>
        </div>
    );
}

const submitToDatabase  = async (values,navigate) => {


    const result = await axios.post("http://localhost:3001/submit-details", {
        public_address: values.public_address,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        ihiNumber:values.ihiNumber,
        date:values.date,
        gender:values.gender
    });
    if (result.data.status === 200){
        navigate("/Dashboard")
    }
}

export default FormUser;
