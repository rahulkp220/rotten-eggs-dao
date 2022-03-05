import {ethers} from 'ethers';
import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const app = sdk.getAppModule(process.env.APP_ADDR);

(async () => {
    try {
        const bundleDropModule = await app.deployBundleDropModule({
            name: "RotteneggsDAO Membership",
            description: "A Dao for movie reviews",
            image: readFileSync("scripts/assets/eggs.jpg"),
            primarySaleRecipientAddress: ethers.constants.AddressZero
        });

    console.log(
        "✅ Successfully deployed bundleDrop module, address:",
        bundleDropModule.address,
      );

    console.log(
    "✅ bundleDrop metadata:",
    await bundleDropModule.getMetadata(),
    );

    } catch (error) {
        console.log("failed to deploy bundleDrop module", error);
    }

})()