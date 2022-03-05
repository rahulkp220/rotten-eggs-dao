import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(process.env.VOTE_MODULE_ADDR);
const tokenModule = sdk.getTokenModule(process.env.TOKEN_MODULE_ADDR);

(async () => {
    try {
        const amount = 42_000;
        await voteModule.propose(
            "Should DAO mint an additional " +  amount + " token into treasury?",
            [{
                nativeTokenValue: 0,
                transactionData: tokenModule.contract.interface.encodeFunctionData(
                    "mint",
                    [
                        voteModule.address,
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
                toAddress: tokenModule.address

            }]
        );

        console.log("✅ Successfully created proposal to mint tokens");
    } catch (error) {
            console.error("failed to create first proposal", error);
        process.exit(1);
    }


    try {
        const amount = 6_900;
        // Create proposal to transfer ourselves 6,900 tokens for being awesome.
        await voteModule.propose(
          "Should the DAO transfer " +
          amount + " tokens from the treasury to " +
          process.env.WALLET_ADDRESS + " for being awesome?",
          [
            {
              // Again, we're sending ourselves 0 ETH. Just sending our own token.
              nativeTokenValue: 0,
              transactionData: tokenModule.contract.interface.encodeFunctionData(
                // We're doing a transfer from the treasury to our wallet.
                "transfer",
                [
                  process.env.WALLET_ADDRESS,
                  ethers.utils.parseUnits(amount.toString(), 18),
                ]
              ),
    
              toAddress: tokenModule.address,
            },
          ]
        );
    
        console.log(
          "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
        );
      } catch (error) {
        console.error("failed to create second proposal", error);
      }
})();