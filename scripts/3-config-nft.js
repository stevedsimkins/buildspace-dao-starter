import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0xc7ea7659e16Fa19d986bbf228EDD8Ddc3565Ad62",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Birds Aren't Real DAO Passport",
        description: "Grants access to Birds Aren't Real DAO",
        image: readFileSync("scripts/assets/daoPassport.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()
