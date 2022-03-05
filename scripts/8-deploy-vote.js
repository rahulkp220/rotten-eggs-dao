import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule(process.env.APP_ADDR);

(async () => {
    try {
        const voteModule = await appModule.deployVoteModule({
            name: "RottenEggs Awesome Proposals",
            votingTokenAddress: process.env.TOKEN_MODULE_ADDR,
            proposalStartWaitTimeInSeconds: 0,
            proposalVotingTimeInSeconds: 24 * 60 * 60,
            votingQuorumFraction: 0,
            minimumNumberOfTokensNeededToPropose: "0",
        })
        console.log(
            "✅ Successfully deployed vote module, address:",
            voteModule.address,
          );
        } catch (err) {
          console.error("Failed to deploy vote module", err);
        }
})();