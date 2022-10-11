import {Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Modal, Typography} from "@mui/material"
import {useEffect, useState} from "react";
import axios from "axios";
import "./css/RequestApproval.css"



const  style = {

        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,

};

let open = false;


function RequestApproval(props) {


    console.log("props", props)
    const[resultArray,setResultArray] = useState([]);
    const[approveArray,setApproveArray] = useState([]);

    const address = localStorage.getItem("public_address");

    useEffect(()=> {
        const result =  axios.get("http://localhost:3001/all-user-addresses").then((response) => {
            setResultArray(response.data.result);
        })
    })



    return (

        // eslint-disable-next-line react/style-prop-object
        <div>
            <div className="container">
                <center>
                    <Modal
                        open={open}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Success
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Please wait for user to confirm your approval Request
                            </Typography>
                            <center>
                                <Button onClick={()=>open = false}>Ok</Button>
                            </center>
                        </Box>
                    </Modal>
                </center>
                <center>
                    <h1>Please select a User</h1>
                </center>
                <center style={{paddingTop:"250px"}}>

                    <Box style={{borderRadius: '16px', backgroundColor: '#6ea6be',width:"700px"}}>

                        <List sx={{width: '700px', maxWidth: '1000px'}}>
                            {resultArray.map((item)=>{
                                return  <ListItemButton component="a" onClick={()=>
                                    requestApproval(item.public_address,address)}>
                                    <ListItemText primary={item.first_name + " " + item.last_name} secondary={"Request Data Approval"}>
                                    </ListItemText>
                                </ListItemButton>;
                            })}
                        </List>
                    </Box>
                </center>
            </div>
        </div>
    );
}


const requestApproval = (public_address,toApprove) => {
    const result = axios.get("http://localhost:3001/approve-list",{params:{address:public_address}});

    result.then((response)=>{
        if(response.data.toString() === "" || response.data === null){
            let arrayToInsert = [];
            arrayToInsert.push(toApprove)
            const JsonArray = JSON.stringify(arrayToInsert)
            axios.post("http://localhost:3001/submit-approve", {
                address: public_address,
                approve: JsonArray
            }).finally(()=>{
                open = true;
            })
        }
        if(response.data.toString() !== ""){
            var cloneArray = JSON.parse(JSON.stringify(response.data));
            cloneArray.push(toApprove);
            alert("list  not empty")
            const JsonArray = JSON.stringify(cloneArray)
            axios.post("http://localhost:3001/submit-approve", {
                address: public_address,
                approve: JsonArray
            }).finally(()=>{
                open = true;
            })

        }
    })

}





export default RequestApproval;