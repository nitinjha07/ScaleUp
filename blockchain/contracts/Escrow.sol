// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;
import {Users} from "./Users.sol";

contract Escrow {
    address public owner;
    address public inspector;
    Users public usersContract;

    constructor(address _inspector, address _usersContractAddress) {
        owner = msg.sender;
        inspector = _inspector;
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
        address _inspector,
        bytes memory _startupId,
        uint256 _amount
    ) public onlyOwner {
        usersContract.addAgreement(
            _investor,
            _orgAddress,
            address(this),
            _inspector,
            _startupId,
            _amount
        );
    }
}