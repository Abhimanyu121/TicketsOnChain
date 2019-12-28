pragma solidity >=0.4.22 <0.6.0;


import "@openzeppelin/contracts/token/ERC721/ERC721MetadataMintable.sol";

/// @title An event registeration and checkin contract
/// @author Abhimanyu Shekhawat
/// @notice The contract allows adding events and checking in into the events, NFT are issued as tickets
/// @dev The contract inherits ERC721 token to implement NFT
contract TicketsOnChain is ERC721MetadataMintable {
  address address_dai = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;
  address contract_owner;
  bool private stop = false;
  uint public nftId;
  uint public eventCount;
  mapping (address => uint) public ownerToEvent;
  mapping(uint=>uint) public nftToEvent;// this shows which event has is represented by this token, for back tracking
  mapping(uint=>NFT) public nftInformation;// gives nft info
  mapping(uint => Event) public eventMapping;
  mapping(address=>User)  userMapping;
  struct Event{
      uint priceInEth;
      uint priceInDai;
      address ownerAddress;
      string metadata;
      string name;
      address[] checkedInUsers;
      mapping(address => bool) issuedAddressCheck;
      address[] issuedAddresses;
      bool active;
      uint eth;
      uint dai;
      uint ticketsIssued;
      string description;
      uint eventId;
      uint checkInCount;
  }
  struct NFT{
    uint eventId;
    address owner;
  }
  struct User{
      uint[] hosting;
      uint[] owned;
      uint[] events;
      mapping(uint=>bool) checkedIn;
      mapping(uint =>bool) notCheckedIn;
  }
  modifier contractOwner{
    require(msg.sender == contract_owner,"You are not Contract owner");
    _;
  }
  modifier contractActive{
    require(stop == false, "Contract not Active");
    _;
  }
  modifier eventOwner(uint eventId){
    require(eventMapping[eventId].ownerAddress == msg.sender,"you cant call this function");
    _;
  }
  modifier soldout(uint eventId){
    require(eventMapping[eventId].ticketsIssued<eventMapping[eventId].issuedAddresses.length,"All tickets sold");
    _;
  }
  modifier isEventActive(uint eventId){
    require(eventMapping[eventId].active == true,"Event not available anymore");
    _;
  }
  modifier valueEthCheck(uint eventId){
    require(msg.value>=eventMapping[eventId].priceInEth,"Insufficient value send");
    _;
  }
  modifier valueDaiCheck(uint eventId){
    require(ERC20(address_dai).balanceOf(msg.sender)>=eventMapping[eventId].priceInDai,"Insufficient value send");
    _;
  }
  modifier ticketBought(uint eventId){
    require(eventMapping[eventId].issuedAddressCheck[msg.sender]==false,"Ticket has been already bought with this address");
    _;
  }
  modifier isCheckIn(uint eventId){
    require(userMapping[msg.sender].notCheckedIn[eventId] == true,"You have already checked in");
    require(userMapping[msg.sender].checkedIn[eventId] != true, "You have already checkedIn");
    _;
  }
  /// @dev Makes the contract deployer as owner, set Token Symbol and Name
  constructor() ERC721Metadata("eventTicket","CEFT") public{
    contract_owner = msg.sender;
  }
  /// @notice Owner can disable the app temporarily in case of emergency
  /// @dev Creates a circuit breaker in case of unprecedented bugs, switches on and off
  function switchContractWorking()
  public
  contractOwner
  {
    if(stop == true){
      stop = false;
    }
    else{
      stop = true;
    }
  }
  /// @dev Users can create new events
  /// @param _priceEth price in eth for event ticket
  /// @param _priceDai price in Dai for event token
  /// @param _metadata URI  for the NFT to be minted
  /// @param _name Name of event
  /// @param _description description of event
  /// @param _noOfTickets number of total available tickets
  function createEvent(uint _priceEth, uint _priceDai,string memory _metadata, string memory _name, string memory _description,uint _noOfTickets)
  public
  contractActive
  {
    Event memory obj = Event({
      priceInEth:_priceEth,
      priceInDai:_priceDai,
      metadata:_metadata,
      name:_name,
      ownerAddress:msg.sender,
      active:true,
      issuedAddresses:new address[](_noOfTickets),
      checkedInUsers:new address[](_noOfTickets),
      dai:0,
      eth:0,
      checkInCount:0,
      ticketsIssued:0,
      description:_description,
      eventId:eventCount
    });
    ownerToEvent[msg.sender] = eventCount;
    userMapping[msg.sender].hosting.push(eventCount);
    eventMapping[eventCount] = obj;
    eventCount++;
  }
  /// @dev Event owner can stop from more tickets from being sold
  /// @param eventId id of event that is to be disabled
  function turnEventOff(uint eventId)
  public
  eventOwner(eventId)
  {
    eventMapping[eventId].active = false;
  }
  /// @dev Users can get list of people who checked in
  /// @param _id id of event
  /// @return list of attendes checked in (addresses)
  /// @return total number of tickets sold
  /// @return name of event
  /// @return total number of checkins
  function checkInList(uint _id)
  public
  view
  returns(address[] memory attendees, uint _totalTickets, string memory name , uint totalCheckin)
  {
    attendees = eventMapping[_id].checkedInUsers;
    _totalTickets = eventMapping[_id].ticketsIssued;
    name = eventMapping[_id].name;
    totalCheckin = eventMapping[_id].checkInCount;
  }
  /// @dev Buying event tickets using eth and minting NFT of the event for the user
  /// @param eventId event id of the event whose tickets needs to be purchased
  /// @return token id of the minted NFT
  function buyTicketsEth(uint eventId)
  public
  payable
  contractActive
  soldout(eventId)
  isEventActive(eventId)
  valueEthCheck(eventId)
  ticketBought(eventId)
  returns(uint tokenId)
  {
    uint  count = eventMapping[eventId].ticketsIssued;
    eventMapping[eventId].issuedAddressCheck[msg.sender] = true;
    eventMapping[eventId].issuedAddresses[count] = msg.sender;
    eventMapping[eventId].eth = eventMapping[eventId].eth+msg.value;
    eventMapping[eventId].ticketsIssued++;
    _mint(msg.sender, nftId);
    _setTokenURI(nftId, eventMapping[eventId].metadata);
    nftToEvent[nftId] = eventId;
    nftInformation[nftId].eventId = eventId;
    nftInformation[nftId].owner = msg.sender;
    userMapping[msg.sender].owned.push(nftId);
    userMapping[msg.sender].events.push(eventId);
    userMapping[msg.sender].notCheckedIn[eventId] = true;
    nftId++;
    tokenId = nftId;
  }
  /// @dev Buying event tickets using DAI and minting NFT of the event for the user
  /// @param eventId event id of the event whose tickets needs to be purchased
  /// @return token id of the minted NFT
  function buyTicketsDAi(uint eventId)
  public
  contractActive
  soldout(eventId)
  isEventActive(eventId)
  ticketBought(eventId)
  valueDaiCheck(eventId)
  returns(uint tokenId)
  {
    ERC20(address_dai).approve(address(this),eventMapping[eventId].priceInDai);
    ERC20(address_dai).transferFrom(msg.sender, address(this),eventMapping[eventId].priceInDai);
    uint  count = eventMapping[eventId].ticketsIssued;
    eventMapping[eventId].issuedAddressCheck[msg.sender] = true;
    eventMapping[eventId].issuedAddresses[count] = msg.sender;
    eventMapping[eventId].dai = eventMapping[eventId].dai+eventMapping[eventId].priceInDai;
    eventMapping[eventId].ticketsIssued++;
    _mint(msg.sender, nftId);
    _setTokenURI(nftId, eventMapping[eventId].metadata);
    nftToEvent[nftId] = eventId;
    nftInformation[nftId].eventId = eventId;
    nftInformation[nftId].owner = msg.sender;
    userMapping[msg.sender].owned.push(nftId);
    userMapping[msg.sender].events.push(eventId);
    userMapping[msg.sender].notCheckedIn[eventId] = true;
    nftId++;
    tokenId = nftId;
  }
  /// @dev infrmation about tickets sold
  /// @param _id event id
  /// @return list of addresses that checked in
  /// @return total tickets sold
  /// @return name of event
  /// @return total checkins
  /// @return list of addresses that bought tickets
  function sales(uint _id)
  public
  view
  returns(address[] memory attendees, uint _totalTickets, string memory name , uint totalCheckin, address[] memory alltickets){
      attendees = eventMapping[_id].checkedInUsers;
      _totalTickets = eventMapping[_id].ticketsIssued;
      name = eventMapping[_id].name;
      totalCheckin = eventMapping[_id].checkInCount;
      alltickets = eventMapping[_id].issuedAddresses;
  }
  /// @dev checking in users at the event
  /// @param eventId event id of event
  /// @return success or faliure of check in
 function checkIn(uint eventId)
 public
 contractActive
 isCheckIn(eventId)
 returns(bool status)
 {
    uint count = eventMapping[eventId].checkInCount;
    eventMapping[eventId].checkedInUsers[count] = msg.sender;
    userMapping[msg.sender].checkedIn[eventId] = true;
    userMapping[msg.sender].notCheckedIn[eventId] = false;
    eventMapping[eventId].checkInCount++;
    status = true;
 }
 /// @dev returns important aspects of user's profile
 /// @return list of event hosted by user
 /// @return list of tickets bought by a  user
 /// @return boolean array of of events checked in or not checked in by users, marked at same index as of array of tickets bought by user
 /// @return list of Tokens(NFT) Owned by user
 function UserProfile()
 public
 view
 returns (uint[] memory eventHost,uint[] memory eventList, bool[] memory statusList, uint[] memory tokenList)
 {
    eventHost = userMapping[msg.sender].hosting;
    eventList = userMapping[msg.sender].events;
    tokenList = userMapping[msg.sender].owned;
    statusList = new bool[](userMapping[msg.sender].events.length);
    for(uint i = 0; i<userMapping[msg.sender].events.length;i++){
      statusList[i] = userMapping[msg.sender].notCheckedIn[userMapping[msg.sender].events[i]];
    }
 }
 /// @dev allowing event host to withdraw fees deposited by users to buy tickets
 /// @param eventId id of event
 function withdraw(uint eventId)
 public
 contractActive
 eventOwner(eventId)
 {
    uint _eth = eventMapping[eventId].eth;
    eventMapping[eventId].eth = 0;
    uint _dai = eventMapping[eventId].dai;
    eventMapping[eventId].dai = 0;
    msg.sender.transfer(_eth);
    ERC20(address_dai).transfer(eventMapping[eventId].ownerAddress, _dai);
 }
}

interface ERC20 {
  function balanceOf(address tokenOwner) external view returns (uint balance);
  function transfer(address receiver, uint amount) external returns(bool);
  function approve(address spender, uint256 value) external returns (bool);
  function transferFrom(address _from, address _to, uint256 _value) external returns(bool);
}
