# TicketsOnChain

This project is made for Consensys Ethereum Bootcamp October 2019
>Author: Abhimanyu Shekhawat

The Project provides a way to manage events using ethereum, enabling easy check-ins using walletConnect and easy profile management using 3BOX. 

This projects uses ERC721 NFT as tickets and users can buy them using ETH (buy with dai option doesnt work yet), it supports 3 ways to access web3 metamask, walletconnect and torus, this project handles profile management using 3BOX, this project and check-ins at the venue are done using walletconnect(Any web3 compatible wallet can be used, although metamask mobile wallet is prefered) and uses IPFS to store Images.

* Note - a few  Ui elements are written and improved by someone else, but web3 and everything is soleley handled by me, you can check the commit history for that.
* You can access project [here](http://goofy-beaver-e7c5b4.netlify.com)

## How to set it up?

- Clone this directory using `git clone https://github.com/Abhimanyu121/TicketsOnChain -b consensys && cd TicketsOnChain`
- Run `truffle compile` and `truffle migrate --network kovan`
- Start the Frontend Server using `npm run dev`
- The site can be seen on `localhost:3000`
* Note - This project is hard coded to use Kovan network for better UX, please select kovan in you web3 provider
## What all can it currently do?
- A Person can create an event.
- Users can buy  tickets using eth(DAI needs more debugging).
- Ticket holders can check-in at the event using wallet connect compatible app and siging a tx.
- Event host can check user profile and events attended by them.
- Users can edit some parts of their profile.

## What needs more work
- Check-In proccess needs to be furthur imporved so that no one can call check-in function directly while not being at event
## Evaluation checklist

- [x] README.md
- [X] Screen recording [!!]
- [x] Truffle project - compile, migrate, test
- [x] Smart Contract Commented
- [x] Library use
- [x] Local development interface
    - [x] Displays the current ETH Account
    - [x] Can sign transactions using MetaMask
    - [x] App interface reflects contract state
- [x] 5 tests in Js or Sol
    - [x] Structured tests
    - [x] All pass
- [x] Circuit breaker/Emergency stop
- [x] Project includes a file called design_pattern_desicions.md / at least 2 implemented
- [x] avoiding_common_attacks.md and explains at least 3 attacks and how it mitigates
- [x] deployed_addresses.txt that indicates contract address on testnet
- [ ] upgradeable design pattern
- [ ] One contract written in Vyper or LLL
- [x] IPFS
- [x] 3BOX
- [x] Web3Connect (Wallet Connect, Metamask, Torus)
- [ ] uPort
- [ ] ENS
- [ ] Oracle
