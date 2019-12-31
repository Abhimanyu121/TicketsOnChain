let BN = web3.utils.BN
let catchRevert = require("./exceptionHelpers.js").catchRevert
let artifact = artifacts.require('TicketsOnChain')

contract('TicketsOnChain', function (accounts){
    const owner = accounts[0];
    const host = accounts[1];
    const alice = accounts[2];
    const emptyAddress = '0x0000000000000000000000000000000000000000';
    const event  = [1,1,'this is monalisa', 'mona ', 'monalisa exhibit', 12];
    let instance
    beforeEach(async () => {
        instance = await artifact.new()
    })
    it("should add an event", async() => {
        const tx = await instance.createEvent(event[0],event[1],event[2],event[3],event[4], event[5]);
        const result = await instance.eventMapping.call(0);
        assert.equal(result[0].toString(), event[0], 'price did not match')
        assert.equal(result[1].toString(), event[1], 'price did not match')
        assert.equal(result[2], owner, 'owner shouldnt be this address')
    })

    it("should buy tickets", async() => {
        const tx = await instance.createEvent(event[0],event[1],event[2],event[3],event[4], event[5]);
        const tx2 = await instance.buyTicketsEth(0,{from: alice, value: event[1]})
        const result = await instance.sales(0);
        assert.equal(result[4][0], alice,"Ticket not bought")
    })
    it("Check in success", async() => {
        const tx = await instance.createEvent(event[0],event[1],event[2],event[3],event[4], event[5]);
        const tx2 = await instance.buyTicketsEth(0,{from: alice, value: event[1]})
        const tx3 = await instance.checkIn(0, {from: alice});
        const result = await instance.sales(0);
        assert.equal(result[0][0], alice,"Not Checked In")
    })
    it("should not be able to buy tickets if event is off", async() => {
        const tx = await instance.createEvent(event[0],event[1],event[2],event[3],event[4], event[5]);
        const tx2 = await instance.turnEventOff(0)
        await catchRevert(instance.buyTicketsEth(0,{from: alice, value: event[1]}))
    })
    it("should not be able to buy tickets if ticket already bought", async() => {
        const tx = await instance.createEvent(event[0],event[1],event[2],event[3],event[4], event[5]);
        const tx2 = await instance.buyTicketsEth(0,{from: alice, value: event[1]})
        await catchRevert(instance.buyTicketsEth(0,{from: alice, value: event[1]}))
    })
});