import {useEffect, useState} from "react";
import axios from "axios";
import {Box, List, ListItemButton, ListItemText} from "@mui/material";
import Web3 from "web3"
import User from "../abi/abis";


function Approvals(){

    const[approvalsList, setApprovalsList] = useState([]);
    const[noApprovals, setNoApprovals] = useState(false);
    const[callAPI,setCanCallAPI] = useState("")
    const publicAddress = localStorage.getItem("public_address");
        useEffect(()=>{

            if(callAPI === "") {
                const result =  axios.get("http://localhost:3001/get-user",{params:{
                    address:publicAddress
                }}).then((response) => {
                if(response.data.approved_users.length === 0){
                    setNoApprovals(true)
                }
                const jsonArray = JSON.parse(response.data.approved_users)
                setApprovalsList(jsonArray);
            })}

        },[])



    const callSmartContract = async (address) => {
        const currentProvider = detectCurrentProvider();
        if (currentProvider) {
            await currentProvider.request({method: 'eth_requestAccounts'});
            const web3 = new Web3(currentProvider)
            const userAccount = await web3.eth.getAccounts();
            const account = userAccount[0].toString();
            const UserContract = new web3.eth.Contract(User.value,"0xEeA1fcb8280d3723d0930C5fB8281D93929D4e2f",{
                from:account
            })
            const result = await UserContract.methods.giveApproval(account,address).send().then(response => {
                const arr = approvalsList.filter(e=> e !== address);
                if(arr.length === 0){
                    setNoApprovals(true)
                }
                setApprovalsList(arr)

            })
        }
    }



    return(<div>
        <center style={{paddingTop:"150px"}}>
            <h2>Please select which doctor you would like to approve.</h2>
        </center>
        <center style={{paddingTop:"350px"}}>
            <Box style={{borderRadius: '16px', backgroundColor: '#6ea6be',width:"700px"}}>

                <List sx={{width: '700px', maxWidth: '1000px'}}>
                    {
                        approvalsList.map((item)=>{
                        return  <ListItemButton component="a" onClick={()=>callSmartContract(item)}>
                            <ListItemText primary={item} secondary={"Accept Approval Request"} >
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

export default  Approvals;