import axios from "axios";

function Contacts(props){
    console.log("The balance is", props.balance)
    let result1;
    console.log("AccountAddress", props.public_address);


    axios(
        {
            method:'get',
            url:'http://localhost:3001/'
        }
    ).then((resp) => {
        console.log("The response ", resp.data);
    })


    axios({
        method:'post',
        url:'http://localhost:3001/create',
        data:{
            public_address:props.public_address
        }
    }).then((result) => {
        console.log("The result is",result.status);
    },(error) => {
        console.log(error)
    });

    return(
        <div> Successfully commited address is {props.public_address} and the result is {result1}</div>
    );
}
export default Contacts;