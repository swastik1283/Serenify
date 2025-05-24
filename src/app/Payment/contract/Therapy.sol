//SPDX-License-Identifier:MIT

pragma solidity^0.8.0;

contract TherapyPay{
    address public owner; 
   mapping(address=>uint256)public payment;
   mapping(address=>address)public doctorAddress;


   event PaymentReceived(address indexed payer,address indexed doctors,uint256 amount);

   constructor (){
     owner=msg.sender;
   }


   function PayforTherapy(address doctors) external payable{
     require(msg.value>0,"Payment must be greater than zero");
     //record which doctor user paid
     doctorAddress[msg.sender]=doctors;
     //transfering payment
     payable(doctors).transfer(msg.value);

     emit PaymentReceived(msg.sender, doctors, msg.value);
   }


   function withdraw() external{
    require (msg.sender==owner,"you are not the owner");
    payable(owner).transfer(address(this).balance);
   }
}