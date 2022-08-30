import Web3 from "web3"

export const detectCurrentProvider = () => {
    let provider;

    if(window.ethereum){
        provider = window.ethereum;
    }else if (window.web3){
        provider = window.web3.currentProvider;
    }else{
        console.log("Non-ethereum browser");
    }

    return provider;
}

