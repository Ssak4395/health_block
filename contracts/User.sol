pragma solidity ^0.8.0;

contract User {

    mapping(address=>string) internal roles;

    constructor() {

    }

    function assignRoleToPatient(address _address) public {
        roles[_address] = "PATIENT";
    }

    function assignRoleAsDoctor(address _address) public {
        roles[_address] = "DOCTOR";
    }

    function assignRoleAsChemist(address _address) public {
        roles[_address] = "CHEMIST";
    }

    function getUserRole(address _address) public returns(string memory){
        return roles[_address];
    }

}
