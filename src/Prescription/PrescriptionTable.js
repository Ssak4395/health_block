import Web3 from "web3";
import User from "../abi/abis";
import {useEffect, useState} from "react";
import {Box, List, ListItemButton, ListItemText} from "@mui/material";

function PrescriptionTable(props){


    const[approvedArray, setApprovedArray]=useState([]);

    const address = localStorage.getItem("public_address");

   useEffect(()=>{
       getApprovedArray(address,props.web3).then((result) => {
           const uniq = [...new Set(result)];
           setApprovedArray(uniq)
       })

   },[])



    return(
        <div>
            <h1>Approved Users</h1>
            <h5 style={{padding:"20px"}}>Users you are permitted to prescribe medicine</h5>
            <Box style={{borderRadius: '16px', backgroundColor: '#86dac0',width:"700px"}}>

                <List sx={{width: '700px', maxWidth: '1000px'}}>
                    {
                        approvedArray.map((item)=>{
                            return  <ListItemButton component="a">
                                <ListItemText primary={item} secondary={"Approved User"} >
                                </ListItemText>
                            </ListItemButton>;
                        })}
                </List>
            </Box>
        </div>
    )
}

const getApprovedArray = async (address,web3) => {

        const UserContract = new web3.eth.Contract(User.value, "0x47518BAA6a991E61BBc6761bC1f67b89FB5AdE1d", {
            from: address
        })
        const arrResult = await UserContract.methods.getApprovedArray(address).call();

        return arrResult;
}

export default PrescriptionTable