const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => ethers.parseUnits(n.toString(), "ether");

describe("ScaleUp", function () {
  let UsersContract; // actual smart contract
  let usersContract; // contrat after deployment
  let EscrowContract; // actual smart contract
  let escrowContract; // contrat after deployment

  let owner;
  let investor1;
  let investor2;
  let investor3;
  let org1;
  let org2;
  let org3;

  beforeEach(async function () {
    [owner, investor1, investor2, investor3, org1, org2, org3] =
      await ethers.getSigners();

    UsersContract = await ethers.getContractFactory("Users");
    usersContract = await UsersContract.deploy();

    EscrowContract = await ethers.getContractFactory("Escrow");
    escrowContract = await EscrowContract.deploy(usersContract.target);
  });

  describe("Deployment", function () {
    it("Should should check deployment of UsersContract", async function () {
      console.log("usersContract", usersContract);
      expect(await usersContract.getOwner()).to.equal(owner.address);
    });

    it("Should should check deployment of EscrowContract", async function () {
      expect(await escrowContract.getUserContractAddress()).to.equal(
        usersContract.target
      );
    });
  });

  describe("Users", function () {
    it("Complete Overview of both contracts", async function () {
      await usersContract
        .connect(investor1)
        .registerInvestor(
          "Vineet",
          "abc@gmail.com",
          "21345",
          "India",
          "New Delhi",
          "110001"
        );

      const gettingInvestor1 = await usersContract.getInvestorDetails(
        investor1
      );

      await usersContract
        .connect(investor2)
        .registerInvestor(
          "Amit",
          "test@gmail.com",
          "21345",
          "India",
          "New Delhi",
          "110001"
        );
      const gettingInvestor2 = await usersContract.getInvestorDetails(
        investor2
      );
      await usersContract
        .connect(investor3)
        .registerInvestor(
          "Shivam",
          "test@gmail.com",
          "21345",
          "India",
          "New Delhi",
          "110001"
        );
      const gettingInvestor3 = await usersContract.getInvestorDetails(
        investor3
      );
      expect(gettingInvestor1[0]).to.equal("Vineet");
      expect(gettingInvestor2[0]).to.equal("Amit");
      expect(gettingInvestor3[0]).to.equal("Shivam");

      // adding organizations
      await usersContract
        .connect(org1)
        .registerOrg("ZYA", "Finance", "India", "New Delhi");

      const gettingOrg1 = await usersContract.getOrgDetails(org1);

      await usersContract
        .connect(org2)
        .registerOrg("XYZ", "MASTI", "India", "New Delhi");

      const gettingOrg2 = await usersContract.getOrgDetails(org2);

      await usersContract
        .connect(org3)
        .registerOrg("ABC", "FOOD", "India", "New Delhi");

      const gettingOrg3 = await usersContract.getOrgDetails(org3);

      expect(gettingOrg1[0]).to.equal("ZYA");
      expect(gettingOrg2[0]).to.equal("XYZ");
      expect(gettingOrg3[0]).to.equal("ABC");

      // now making agreement between investor and organization
      await escrowContract
        .connect(investor1)
        .createAgreement(investor1.address, org1.address, "AI05C", tokens(10));

      await escrowContract
        .connect(investor1)
        .createAgreement(investor1.address, org2.address, "AI05D", tokens(200));

      const agreements = await usersContract.getInvestorAgreements(
        investor1.address
      );
      console.log(agreements);
    });
  });

  // describe("User", function () {
  //   it("Should add user", async function () {
  //     await healthLinkAI.registerNewUser(
  //       user1.address,
  //       "Vineet",
  //       21,
  //       "Male",
  //       "abc@gmail.com",
  //       "1234567890"
  //     );

  //     const customer = await healthLinkAI.getCustomer(user1.address);
  //     expect(customer.customer).to.equal(user1.address);
  //   });
  // });

  // describe("Doctor", function () {
  //   it("Should add doctor", async function () {
  //     await healthLinkAI.registerNewDoctor(
  //       doctor1.address,

  //       "Dr. Vineet",
  //       21,
  //       "Male",
  //       "abc@gmail.com",
  //       "1234567890",
  //       "MBBS",
  //       "head, neck",
  //       1
  //     );

  //     const doctor = await healthLinkAI.getDoctor(doctor1.address);

  //     expect(doctor[0].customer).to.equal(doctor1.address);
  //   });

  //   it("Should add doctor simultaneously and then check doctorIdx", async function () {
  //     await healthLinkAI.registerNewDoctor(
  //       doctor1.address,

  //       "Dr. Vineet",
  //       21,
  //       "Male",
  //       "abc@gmail.com",
  //       "1234567890",
  //       "MBBS",
  //       "head, neck1",
  //       tokens(1)
  //     );

  //     const doctor_1 = await healthLinkAI.getDoctor(doctor1.address);

  //     await healthLinkAI.registerNewDoctor(
  //       doctor2.address,
  //       "Dr. Vineet",
  //       21,
  //       "Male",
  //       "abc@gmail.com",
  //       "1234567890",
  //       "MBBS",
  //       "head, neck2",
  //       tokens(2)
  //     );

  //     const doctor_2 = await healthLinkAI.getDoctor(doctor2.address);
  //     const allDoctors = await healthLinkAI.getDoctors();

  //     expect(doctor_1[0].customer).to.equal(allDoctors[0].doctor);
  //     expect(doctor_2[0].customer).to.equal(allDoctors[1].doctor);

  //     await healthLinkAI.registerNewUser(
  //       user1.address,
  //       "Vineet",
  //       21,
  //       "Male",
  //       "abc@gmail.com",
  //       "1234567890"
  //     );

  //     const customer_1 = await healthLinkAI.getCustomer(user1.address);
  //     expect(customer_1.customer).to.equal(user1.address);

  //     await healthLinkAI.registerNewUser(
  //       user2.address,
  //       "Vineet 2",
  //       21,
  //       "Male",
  //       "abc@gmail.com",
  //       "1234567890"
  //     );

  //     const customer_2 = await healthLinkAI.getCustomer(user2.address);
  //     expect(customer_2.customer).to.equal(user2.address);

  //     try {
  //       let transaction = await healthLinkAI
  //         .connect(user1)
  //         .bookAppointment(doctor1.address, "date", "time", "meetLink", {
  //           value: tokens(1),
  //         });
  //       await transaction.wait();
  //       // console.log(transaction);
  //       // console.log("doctor1 => ", doctor1);
  //     } catch (error) {
  //       console.error(error);
  //     }

  //     try {
  //       let transaction = await healthLinkAI
  //         .connect(user1)
  //         .bookAppointment(doctor2.address, "date", "time", "meetLink", {
  //           value: tokens(2),
  //         });
  //       await transaction.wait();
  //     } catch (error) {
  //       console.error(error.message);
  //     }

  //     try {
  //       let txn = await healthLinkAI.connect(owner).getBalance();
  //       expect(txn).to.equal(tokens(0.3));
  //     } catch (error) {
  //       console.error(error);
  //     }

  //     // getting user appointments
  //     try {
  //       let txn = await healthLinkAI.connect(user1).getAllUserAppointments();
  //     } catch (error) {
  //       console.log(error.message);
  //     }

  //     try {
  //       let txn = await healthLinkAI
  //         .connect(doctor1)
  //         .getDoctorAppointments(doctor1.address);
  //     } catch (error) {
  //       console.log(error.message);
  //     }

  //     try {
  //       let txn = await healthLinkAI
  //         .connect(doctor2)
  //         .getDoctorAppointments(doctor2.address);
  //     } catch (error) {
  //       console.log(error.message);
  //     }

  //     const initialBalance = await ethers.provider.getBalance(doctor1.address);

  //     // Book appointment
  //     await healthLinkAI
  //       .connect(user1)
  //       .bookAppointment(doctor1.address, "date", "time", "meetLink", {
  //         value: tokens(1),
  //       });

  //     // Get doctor's final balance
  //     const finalBalance = await ethers.provider.getBalance(doctor1.address);
  //     console.log("finalBalance", finalBalance);
  //     console.log("initialBalance", initialBalance);
  //     // Doctor should receive 90% of fees (0.9 ETH)
  //     expect(finalBalance - initialBalance).to.equal(tokens(0.9));
  //   });
  // });
});
