## Design Patterns Decisions 

## Using ERC721

 The ERC721 tokens are a very good way we  can demonstrate unique tickets for users.

## Features provided by the ERC721 fit for my project:- 

- ERC721 can have some metadata to provide extra information
- Tickets are transferable if required

## Using OpenZepplin contract:-

- One should be using extrenal contracts from trusted sources and battle tested code
- Zepplin contracts provide a standard ERC721 full implementation which covers for all of ERC721 features with security

## Circuit Breaker:-

- A circuit breaker has been implementaed with the name switchContractWorking()
- In case of any bug the owner can switch the state to stop all transactions from happening

## Modifiers- 
- Multiple modifiers are used to ensure the fulfilment of certain conditions before the execution of function

## Using web3js instead over other libraries like web3py for python
- Other libraries require the user to enter the private key in the platform where as using web3js users can use metamask and other such plugins keeping security in own hands.

## Using Web3Connect
- It provides users better UX as they can use web3 provider of their choice.

## Using 3BOX
- 3BOX is one of the popular and new way to manage profile and can be used accross multiple Dapps if required.
