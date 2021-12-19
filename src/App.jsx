import { useEffect, useMemo, useState } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useWeb3 } from "@3rdweb/hooks";

const sdk = new ThirdwebSDK("rinkeby");

const bundleDropModule = sdk.getBundleDropModule("0xc7ea7659e16Fa19d986bbf228EDD8Ddc3565Ad62")

const App = () => {

  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address)

  const signer = provider ? provider.getSigner() : undefined;

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    if(!address){
      return;
    }

    return bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        if(balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("This user has a membership NFT!")
        } else {
          setHasClaimedNFT(false);
          console.log("This user does not have membership NFT")
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error("failed to nft balance", error);
      });
  }, [address]);

  if(!address){
    return (
      <div className="landing">
        <h1>BIRDS AREN'T REAL <br/> DAO</h1>
        <h3 className="warning">
          EVERY "BIRD" IS <br/>
          A GOVERNMENT <br/>
          SURVAILANCE DRONE
        </h3>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet 
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>WELCOME MEMBER</h1>
        <p>LIES END HERE</p>
      </div>
    );
  };

  const mintNft = () => {
    setIsClaiming(true);

    bundleDropModule
    .claim("0", 1)
    .catch((err) => {
      console.error("failed to claim", err);
      setIsClaiming(false);
    })
    .finally(() => {
      setIsClaiming(false);
      setHasClaimedNFT(true);
      console.log(`Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`);
    });
  }

  return (
    <div className="mint-nft">
      <h1>JOIN THE UNBELIEVING </h1>
      <h3>MINT YOUR MEMBERSHIP NFT PASSPORT</h3>
      <h3 className="warning">
        EVERY "BIRD" IS <br/>
        A GOVERNMENT <br/>
        SURVAILANCE DRONE
      </h3>
      <button
        disabled={isClaiming}
        onClick={() => mintNft()}
      >
        {isClaiming ? "Minting..." : "Mint"}
      </button>
    </div>  );
};

export default App;
