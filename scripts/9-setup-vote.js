import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(process.env.VOTE_MODULE_ADDR);
const tokenModule = sdk.getTokenModule(process.env.TOKEN_MODULE_ADDR);

// transfer token from owner's account to vote contract account
// this is done to make sure vote contract can deal stuff on their own
(async () => {
    try {
        await tokenModule.grantRole("minter", voteModule.address);
        console.log(
            "Successfully gave vote module permissions to act on token module"
        );
    } catch (error) {
        console.error(
          "failed to grant vote module permissions on token module",
          error
        );
        process.exit(1);
    }
    
    try {
        const ownedTokenBalance = await tokenModule.balanceOf(
            process.env.WALLET_ADDRESS,
        );

        // Grab 90% of the supply that we hold.
        const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
        const percent90 = ownedAmount.div(100).mul(90);

        // Transfer 90% of the supply to our voting contract.
        await tokenModule.transfer(
            voteModule.address,
            percent90
        );
        
        console.log("✅ Successfully transferred tokens to vote module");
    } catch (err) {
      console.error("failed to transfer tokens to vote module", err);
    }
  })();
  