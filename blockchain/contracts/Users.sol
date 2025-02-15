// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract Users {
    struct Agreement {
        address investor;
        address escrow;
        address orgAddress;
        address inspector;
        bytes startupId;
        uint256 amount;
        bool isComplete;
        string status;
    }

    struct Organization {
        address orgAddress;
        string orgName;
        string orgType;
        string orgCountry;
        string orgCity;
        bool isOrgVerified;
    }

    struct Investor {
        address investorAddress;
        string name;
        string email;
        string phone;
        string country;
        string city;
        string postalCode;
        bool isKYCVerified;
    }

    address owner;
    address inspector;
    address escrow;

    // constructor() {}

    mapping(address => Investor) public investorDetails;
    mapping(address => Organization) public orgDetails;
    mapping(address => Agreement[]) public investorAgreements;
    mapping(address => Agreement[]) public orgAgreements;

    // registering investor
    function registerInvestor(
        string memory _name,
        string memory _email,
        string memory _phone,
        string memory _country,
        string memory _city,
        string memory _postalCode
    ) public {
        Investor memory newInvestor = Investor(
            msg.sender,
            _name,
            _email,
            _phone,
            _country,
            _city,
            _postalCode,
            false
        );

        investorDetails[msg.sender] = newInvestor;
    }

    function registerOrg(
        string memory orgName,
        string memory orgType,
        string memory orgCountry,
        string memory orgCity
    ) public {
        Organization memory newOrg = Organization(
            msg.sender,
            orgName,
            orgType,
            orgCountry,
            orgCity,
            false
        );

        orgDetails[msg.sender] = newOrg;
    }

    function getInvestorDetails(
        address _investorAddress
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            bool
        )
    {
        Investor memory investor = investorDetails[_investorAddress];
        return (
            investor.name,
            investor.email,
            investor.phone,
            investor.country,
            investor.city,
            investor.postalCode,
            investor.isKYCVerified
        );
    }

    function getOrgDetails(
        address _orgAddress
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            bool
        )
    {
        Organization memory org = orgDetails[_orgAddress];
        return (
            org.orgName,
            org.orgType,
            org.orgCountry,
            org.orgCity,
            org.isOrgVerified
        );
    }

    function addAgreement(
        address _investor,
        address _orgAddress,
        address _escrow,
        address _inspector,
        bytes memory _startupId,
        uint256 _amount
    ) public {
        Agreement memory newAgreement = Agreement(
            _investor,
            _escrow,
            _orgAddress,
            _inspector,
            _startupId,
            _amount,
            false,
            "Pending"
        );
        investorAgreements[_investor].push(newAgreement);
        orgAgreements[_orgAddress].push(newAgreement);
    }
}
