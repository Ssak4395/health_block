import "./css/Landing.css"
import {Box, Button, styled, ThemeProvider, Typography} from "@mui/material";
import videobg from "../assets/video/videobg.mp4"
import {LoginButton} from "./Buttons";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Contacts from "./Contacts";
import theme from "./Themes/landing-themes";
import Web3 from "web3"
import {detectCurrentProvider, onConnect} from "./Login";
import {useEffect, useState} from "react";




function Landing(props)
{
    console.log("the props are", props)
    const navigate = useNavigate();
    const navigateToContacts = () => {
        // 👇️ navigate to /contacts
        navigate('/contacts');
    };
    const [isConnected, setIsConnected] = useState(false);
    const setEthBalance = props.onBalanceUpdate();
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
                console.log("The user account is", userAccount[0]);
                setIsConnected(true);
                console.log("the eth balance is", ethBalance)
                if(isConnected)
                {
                    props.onBalanceUpdate(ethBalance);
                    props.onAddressUpdate(account);
                    navigate("/contacts")
                }
            }
        } catch(err) {
            console.log(err);
        }
    }

    const onDisconnect = () => {
        setIsConnected(false);
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
                    <div className="Login-Button">
                        <Box m={1.2} pt={0}>
                            <LoginButton onClick={onConnect} variant="contained">
                                <Typography color="white" fontSize="30px">
                                    Register
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