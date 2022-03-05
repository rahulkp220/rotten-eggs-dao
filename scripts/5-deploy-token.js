import sdk from './1-initialize-sdk.js';

const app = sdk.getAppModule(process.env.APP_ADDR);

// deployTokenModule deploys ERC-20
// https://github.com/thirdweb-dev/contracts/blob/v1/contracts/Coin.sol

(async () => {
    try {
        const tokenModule = await app.deployTokenModule({
            name: "RottenEggsDAO Governance Token",
            symbol: "ROTEGG"
        });
    console.log(
        "✅ Successfully deployed token module, address:",
        tokenModule.address,
      );
    } catch (error) {
      console.error("failed to deploy token module", error);
    }
})();