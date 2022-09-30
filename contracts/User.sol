pragma solidity ^0.8.0;

contract User {

    mapping(address=>string) internal roles;

    constructor() {

    }

    function assignRoleToPatient(address _address) public  returns(string memory){
        roles[_address] = "PATIENT";
        return "OK";
    }

    function assignRoleAsDoctor(address _address) public returns(string memory) {
        roles[_address] = "DOCTOR";
        return "OK";

    }

    function assignRoleAsChemist(address _address) public returns(string memory) {
        roles[_address] = "CHEMIST";
        return "OK";

    }

    function getUserRole(address _address) public returns(string memory){
        return roles[_address];

    }

}
