import "./css/Landing.css"
import {Box, Button, styled, ThemeProvider, Typography} from "@mui/material";
import videobg from "../assets/video/videobg.mp4"
import {LoginButton} from "./Buttons";
import {Routes, Route, useNavigate} from 'react-router-dom';
import theme from "./Themes/landing-themes";
import Web3 from "web3"
import {useEffect, useState} from "react";
import axios from "axios";




function Landing(props)
{
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false);


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

    const onConnect = async() => {
        try {
            const currentProvider = detectCurrentProvider();
            if(currentProvider) {
                await currentProvider.request({method: 'eth_requestAccounts'});
                const web3 = new Web3(currentProvider);
                const userAccount  =await web3.eth.getAccounts();
                const account = userAccount[0].toString();
                let ethBalance = await web3.eth.getBalance(account);
                setIsConnected(true);

                if(isConnected)
                {
                    props.setProvider(web3)
                    props.onBalanceUpdate(ethBalance);
                    props.onAddressUpdate(account);

                    /*console.log(userAccount[0].toString())

                    // Call Search API to check whether Wallet Address exists in database.
                    const params = new URLSearchParams([['address',userAccount[0].toString()]]);

                    const doesExist = await axios.get("http://localhost:3001/search",{params})



                    if(doesExist.data.result.length === 0 && doesExist.status === 200 && userAccount[0] !== "" && userAccount[0] !== undefined){
                        const pushToDatabase = await axios.post("http://localhost:3001/add",{
                            public_address:userAccount[0].toString()
                        }
                        )
                            alert("pushed to database");
                            navigate("/Register");
                    }else{
                        alert("TODO IMPLEMENT DASHBOARD")
                    }
*/
                    navigate("/Register");
                }
            }
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <ThemeProvider theme={theme}>
            <div className="">
                <video  className="video" autoPlay loop muted src={videobg}>
                </video>
                <div className="color-overlay"></div>
                <div className="centerdiv">
                    <div className="Login-Button">
                        <Box m={2} pt={3}>
                            <LoginButton onClick={onConnect}variant="contained">
                                <Typography color="white" fontSize="30px">
                                    Login
                                </Typography>
                            </LoginButton>
                        </Box>

                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}




export default Landing