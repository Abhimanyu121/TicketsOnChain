pragma solidity >=0.4.22 <0.6.0;
import 'zeppelin/contracts/token/ERC721/ERC721MetadataMintable.sol';
contract Travel is ERC721MetadataMintable{

    constructor() ERC721Metadata("TraveToken","TVC") public{

    }
    struct traveller{
        uint tokens;
        uint repo ;
        uint upvotes;
        uint downvotes;
        uint posts;
    }
    struct Post {
        string location;
        address publisher;
        string  content;
        uint upvote_count;
        uint downvote_count;
        address[] downvoters;
        address[] upvoters;
    }
    uint post_count;
    uint public tokenid;
    mapping (uint => Post) post_counter;
    mapping(uint => address )  post_address;
    mapping (address => traveller)  address_traveller;

    function add_posts(string memory content,string memory location) public {
        post_counter[post_count].location = location;
        post_counter[post_count].publisher = msg.sender;
        post_counter[post_count].content = content;
        post_address[post_count]= msg.sender;
        address_traveller[msg.sender].posts ++;
        post_count ++;
    }
    function mint_token(string memory tokenURI)public  {
        _mint(msg.sender, tokenid);
        _setTokenURI(tokenid, tokenURI);
        tokenid+=1;
        address_traveller[msg.sender].tokens++;
    }
    function upvote(uint postId) public {
        bool status = inArray(msg.sender, postId);
        if(status){
            post_counter[postId].upvoters.push(msg.sender);
            address_traveller[post_address[postId]].repo++;
            post_counter[postId].upvote_count++;
            address_traveller[msg.sender].upvotes ++;
        }else{
            revert("already voted");
        }

    }
     function downvote(uint postId) public {
        bool status = inArray(msg.sender, postId);
        if(status){

            post_counter[postId].downvoters.push(msg.sender);
            address_traveller[post_address[postId]].repo--;
            post_counter[postId].downvote_count++;
            address_traveller[msg.sender].downvotes ++;
        }else{
            revert("already voted");
        }

    }

    function inArray(address who, uint id ) private view returns (bool) {
        for(uint i = 0; i<post_counter[id].upvote_count;i++){
            if(post_counter[id].upvoters[i]==who){
                return false;
            }
        }
        for(uint i = 0; i<post_counter[id].downvote_count;i++){
            if(post_counter[id].downvoters[i]==who){
                return false;
            }
        }
        return true;
    }
    function getPostCount()view public returns (uint count ){
        count = post_count;
    }
    function getPosts(uint postId) view public returns(address addr, string memory location,string memory content, uint upvotes , uint downvotes ){
        addr = post_counter[postId].publisher;
        content = post_counter[postId].content;
        location = post_counter[postId].location;
        upvotes = post_counter[postId].upvote_count;
        downvotes = post_counter[postId].downvote_count;
    }
    function myProfile () view public returns(uint tokens,uint repo, uint upvotes,uint downvotes,uint posts){
        tokens = address_traveller[msg.sender].tokens;
        repo = address_traveller[msg.sender].repo;
        upvotes = address_traveller[msg.sender].upvotes;
        downvotes = address_traveller[msg.sender].downvotes;
         posts = address_traveller[msg.sender].posts;
    }
     function getProfile (address addr) view public returns(uint tokens,uint repo, uint upvotes,uint downvotes,uint posts){
        tokens = address_traveller[addr].tokens;
        repo = address_traveller[addr].repo;
        upvotes = address_traveller[addr].upvotes;
        downvotes = address_traveller[addr].downvotes;
        posts = address_traveller[addr].posts;
    }

}
