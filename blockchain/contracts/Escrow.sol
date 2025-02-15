// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;
import {Users} from "./Users.sol";

contract Escrow {
    address public owner;
    address public inspector;
    Users public usersContract;

    // constructor(address _inspector, address _usersContractAddress) {
    constructor(address _usersContractAddress) {
        owner = msg.sender;
        // inspector = _inspector;
        usersContract = Users(_usersContractAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyInspector() {
        require(
            msg.sender == inspector,
            "Only inspector can call this function"
        );
        _;
    }

    function createAgreement(
        address _investor,
        address _orgAddress,
        // address _inspector,
        string memory _startupId,  // is id se accociated data will also be on ipfs
        uint256 _amount
    ) public {
        usersContract.addAgreement(
            _investor,
            _orgAddress,
            address(this),
            // _inspector,
            _startupId,
            _amount
        );
    }

    function getUserContractAddress() public view returns (address) {
        return address(usersContract);
    }

}
