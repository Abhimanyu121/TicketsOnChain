import { IDX } from "@ceramicstudio/idx";


let account = null;
let provider = null;





export async  function openIDXSpace (provider, account){
  try {
    if (typeof provider !== "undefined") {
      const { ThreeIdConnect, EthereumAuthProvider } = await  import("3id-connect");
      const threeID = new ThreeIdConnect(null);
      console.log(provider)
      const authProvider = new EthereumAuthProvider(provider, account[0])
      await threeID.connect(authProvider);
      const didProvider = await threeID.getDidProvider()
      console.log(didProvider)
      const Ceramic = (await import("@ceramicnetwork/http-client")).default;
      const ceramic = new Ceramic("https://ceramic-dev.3boxlabs.com");
      console.log(ceramic)
      await ceramic.setDIDProvider(didProvider);
      console.log(ceramic)
      const idx = createIDX(ceramic);
      console.log(idx)
      return  idx ;
    }
    throw new Error("No web3 provider available");
  } catch (error) {
    throw error;
  }
};

export async function getProfile(provider, account){
  try {
    if (typeof provider !== "undefined") {
      const { ThreeIdConnect, EthereumAuthProvider } = await  import("3id-connect");
      const threeID = new ThreeIdConnect(null);
      console.log(provider)
      const authProvider = new EthereumAuthProvider(provider, account[0])
      await threeID.connect(authProvider);
      const didProvider = await threeID.getDidProvider()
      console.log(didProvider)
      const Ceramic = (await import("@ceramicnetwork/http-client")).default;
      const ceramic = new Ceramic("https://ceramic-dev.3boxlabs.com");
      console.log(ceramic)
      await ceramic.setDIDProvider(didProvider);
      console.log(ceramic)
      const idx = createIDX(ceramic);
      console.log(idx)
      const user = await idx.get("basicProfile");
      console.log(user)
      user["idxId"] = idx.id;
      console.log(user)
      return  user ;
    }
    throw new Error("No web3 provider available");
  } catch (error) {
    throw error;
  }
}
export function createIDX(ceramic) {
  const idx = new IDX({ ceramic });
  return idx;
}
