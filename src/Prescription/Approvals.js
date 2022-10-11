import {useEffect, useState} from "react";
import axios from "axios";
import {Box, List, ListItemButton, ListItemText} from "@mui/material";

function Approvals(){

    const[approvalsList, setApprovalsList] = useState([]);
    const[firstName,setFirstName] = useState("");
    const[lastName,setLastName]=useState("");
    const[noApprovals, setNoApprovals] = useState(false);

    const publicAddress = localStorage.getItem("public_address");
    console.log(publicAddress)


    useEffect(()=> {
        const result =  axios.get("http://localhost:3001/get-user",{params:{
            address:publicAddress
            }}).then((response) => {
                if(response.data.approved_users.length === 0){
                    setNoApprovals(true)
                }
                const jsonArray = JSON.parse(response.data.approved_users)
             setApprovalsList(jsonArray);
             setFirstName(response.data.first_name);
             setLastName(response.data.last_name);
        })

    })

    let button;
    if(noApprovals === false){
         button = <text>asd World</text>
    }


    return(<div>
        <center style={{paddingTop:"150px"}}>
            <h2>Please select which doctor you would like to approve.</h2>
        </center>
        <center style={{paddingTop:"350px"}}>
            <Box style={{borderRadius: '16px', backgroundColor: '#6ea6be',width:"700px"}}>

                <List sx={{width: '700px', maxWidth: '1000px'}}>
                    {approvalsList.map(()=>{
                        return  <ListItemButton component="a">
                            <ListItemText primary={firstName + " " + lastName} secondary={"Accept Approval Request"}>
                            </ListItemText>
                        </ListItemButton>;
                    })}
                </List>
            </Box>
        </center>
        {noApprovals === true &&
            <center style={{paddingTop:"150px"}}>
                <h2>You have no users to approve</h2>
            </center>
        }
    </div>)
}

export default  Approvals;