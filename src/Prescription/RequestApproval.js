import {Box, Button, Grid, List, ListItem, ListItemButton, ListItemText} from "@mui/material"
import {useEffect, useState} from "react";
import axios from "axios";




function RequestApproval() {

    const[resultArray,setResultArray] = useState([]);


    useEffect(()=> {
        const result =  axios.get("http://localhost:3001/all-user-addresses").then((response) => {
            setResultArray(response.data.result);
        })
    })




    return (
        <div>
            <div style={{margin:"auto",width: "50%" , padding:"300px"}} >
                <h1 style={{textAlign:'center',paddingTop:'100px',color:"black"}}>Please select a User</h1>
                <Box style={{borderRadius: '16px', backgroundColor: '#6ea6be',width:"700px"}}>
                    <List sx={{width: '700px', maxWidth: '1000px',paddingTop:"10px"}}>
                        {resultArray.map((item)=>{
                            return  <ListItemButton component="a" onClick={() => alert(item.public_address)}>
                                <ListItemText primary={item.first_name + " " + item.last_name} secondary={"Request Data Approval"}>
                                </ListItemText>
                            </ListItemButton>;
                        })}
                    </List>
                </Box>
            </div>

        </div>

    );
}



export default RequestApproval;