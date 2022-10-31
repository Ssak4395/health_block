pragma solidity ^0.8.0;

contract User {

    mapping(address=>string) internal roles;
    mapping(address=>User) internal Users;


    struct   User{
        address userAddress;
        string userRole;
        uint flag;
        uint verifiedPrescriptionsFlag;
        address[] approvedAddress;
        string[]  verifiedPrescriptions;
        uint[] verifiedPrescriptionTimeStamp;
        uint timestampFlag;
    }


    constructor() {

    }


    function createUser(address _address) public returns(User memory) {
        address[] memory arr;
        string[] memory arr2;
        uint[] memory arr3;
        User memory user = User({userAddress:_address,userRole:"",flag:0,approvedAddress:arr,verifiedPrescriptions:arr2,verifiedPrescriptionsFlag:0,timestampFlag:0,verifiedPrescriptionTimeStamp:arr3});
        Users[_address] = user;
        return Users[_address];
    }

    function assignRoleToPatient(address _address) external  returns(string memory){
        Users[_address].userRole = "PATIENT";
        return Users[_address].userRole;
    }

    function assignRoleAsDoctor(address _address) external returns(string memory) {
        Users[_address].userRole = "DOCTOR";
        return Users[_address].userRole;

    }

    function assignRoleAsChemist(address _address) external returns(string memory) {
        Users[_address].userRole = "CHEMIST";
        return Users[_address].userRole;

    }

    function getUserRole(address _address) view external returns(string memory){
        return Users[_address].userRole;
    }

    function testCall() view external returns(string memory){
        return "Test call successful";
    }

    function giveApproval(address userToBeApproved, address user) external returns(address[] memory){
        uint i = 0;
        ++i;
        Users[user].approvedAddress.push(userToBeApproved);
        Users[user].flag = i;
        return Users[user].approvedAddress;
    }

    function getApprovedArray(address user) view external returns(address[] memory){
        return Users[user].approvedAddress;
    }

    modifier onlyPatient(address walletAddress) {
        require(compareStrings(Users[walletAddress].userRole,"PATIENT")==true);
        _;
    }

    function approvedPrescription(address _address,string memory prescription_id) onlyPatient(_address) external returns(string memory){
        uint i = 0;
        ++i;
        Users[_address].verifiedPrescriptions.push(prescription_id);
        Users[_address].verifiedPrescriptionsFlag = i;
    }


    function getApprovedPrescriptionArray(address _address) view external returns(string[] memory){
        return Users[_address].verifiedPrescriptions;
    }

    function compareStrings(string memory a, string memory b) public view returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

}