// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract Users {
    //  type of agreements
    struct Agreement {
        address investor;
        address escrow;
        address orgAddress;
        // address inspector;
        string startupId;
        uint256 amount;
        bool isComplete;
        // string status;
    }

    // type of users
    struct Inspector {
        address inspectorAddress;
        string name;
        string email;
        string phone;
        string country;
        string city;
        string postalCode;
        bool isKYCVerified;
    }

    // type of organizations
    struct Organization {
        address orgAddress;
        string orgName;
        string orgType;
        string orgCountry;
        string orgCity;
        bool isOrgVerified;
    }

    // type of investors
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

    // address inspector;
    // address escrow;

    constructor() {
        owner = msg.sender;
    }

    mapping(address => Investor) public investorDetails; // for storing investor details
    mapping(address => Organization) public orgDetails; // for storing organization details
    mapping(address => Inspector) public inspectorDetails; // for storing inspector details
    mapping(address => Agreement[]) public investorAgreements; // for storing investor agreements
    mapping(address => Agreement[]) public orgAgreements; //  for storing organization agreements
    modifier onlyInspector() {
        require(
            inspectorDetails[msg.sender].isKYCVerified,
            "Only inspector can call this function"
        );
        _;
    }

    Investor[] public pendingRegistrationsForInvestor; // for storing pending investor registrations
    Organization[] public pendingRegistrationsForOrg; // for storing pending organization registrations

    function registerInspector(
        address _inspectorAddress,
        string memory _name,
        string memory _email,
        string memory _phone,
        string memory _country,
        string memory _city,
        string memory _postalCode
    ) public {
        Inspector memory newInspector = Inspector(
            _inspectorAddress,
            _name,
            _email,
            _phone,
            _country,
            _city,
            _postalCode,
            true
        );

        inspectorDetails[msg.sender] = newInspector;
    }

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
            true
        );

        investorDetails[msg.sender] = newInvestor;
        pendingRegistrationsForInvestor.push(newInvestor);
    }

    // registering organization
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
            true
        );

        orgDetails[msg.sender] = newOrg;
        pendingRegistrationsForOrg.push(newOrg);
    }

    // function to get investor details
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

    // function to get organization details
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
        // address _inspector,
        string memory _startupId,
        uint256 _amount
    ) public {
        Agreement memory newAgreement = Agreement(
            _investor,
            _escrow,
            _orgAddress,
            // _inspector,
            _startupId,
            _amount,
            false
            // "Pending"
        );
        investorAgreements[_investor].push(newAgreement);
        orgAgreements[_orgAddress].push(newAgreement);
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getInvestorAgreements(
        address _investor
    ) public view returns (Agreement[] memory) {
        return investorAgreements[_investor];
    }
    // functions
}
