 
# Avoiding Common Attacks

I have made sure of handling the common attacks that can be done in Solidity.

## Re-entracy Attacks

To prevent this attack I have made some internal work to check that such case can be prevented. 

## Interger Overflow and UnderFlow

The input of integers from the user has been avoided as much as possible. Making sure that only the id of the Events are to be given to perform any functions.

```
function buyTicketsEth(uint eventId)
  public
  payable
  contractActive
  soldout(eventId)
  isEventActive(eventId)
  valueEthCheck(eventId)
  ticketBought(eventId)
  returns(uint tokenId)
  {}
```

## DOS Attack

The dos attack has also been avoided by doing internal work so as to make sure that in case of any recursive contract call the execution stops.

## Circuit Breaker:-

```
bool private stop = true;

modifier stopFunctioning{
        require(stop == true);
        _;
    }

...

function switchContractWorking() public contractOwner{
        if(stop == true){
            stop = false;
        }
        else{
            stop = true;
        }
    }
```

- A circuit breaker has been implementaed with the name switchContractWorking()
- In case of any bug the owner can switch the state to stop all transactions from happening
- This can be pretly useful in case of any other attacks have been done on the contract which can harm the stakeholders stake in project.