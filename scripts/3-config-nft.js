import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const bundleDrop = sdk.getBundleDropModule(process.env.DROP_MODULE_ADDR);

(async () => {
    try {
        await bundleDrop.createBatch([
            {
                name: "RottenEgg Numero Uno",
                description: "This NFT will give you access to RottenEggsDAO!",
                image: readFileSync("scripts/assets/eggs2.jpg"),
            }
        ]);
    console.log("✅ Successfully created a new NFT in the drop!");
} catch (error) {
  console.error("failed to create the new NFT", error);
}
})()