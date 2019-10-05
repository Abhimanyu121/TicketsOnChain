import getWeb3 from './utils/getWeb3.js'
import Travel from "./contracts/Travel.json";

const getContractInstance = async () => {
  try {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();

    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Travel.networks[networkId];
    const instance = new web3.eth.Contract(
      Travel.abi,
      deployedNetwork && deployedNetwork.address,
    );

    const obj = {
      'web3':web3,
      'accounts': accounts, 'contract': instance
    };

    return obj;
  } catch (error) {
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`,
    );
    console.error(error);
    return error;
  }
}

export default getContractInstance;
