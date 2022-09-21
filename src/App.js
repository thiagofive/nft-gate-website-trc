import { useAddress, useMetamask, useNFTDrop } from "@thirdweb-dev/react";
import { useState } from "react";

const App = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const nftDrop = useNFTDrop ("0x1A2F1965013d909C8539821CA7b1Bd4D616F09f9");
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setisClaiming] = useState(false);

  const mintNft = async () => {
    try {
      setisClaiming(true);
      await nftDrop.claim(1);
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setisClaiming(false);
    }
  };

  if(!address) {
    return <button onClick={connectWithMetamask}>Connect With Metamask</button>
  }

  if (hasClaimedNFT) {
    return (
      <div>
        You have a membership NFT!!🎉
      </div>
    )
  }

  return (
    <div>
      <p>It seems like you don't have one 😔</p>
      <button disable={isClaiming} onClick={mintNft}>Mint NFT</button>
    </div>
  )
}

export default App;
