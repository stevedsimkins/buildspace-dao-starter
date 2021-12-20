import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0xE145A21954FDc687c1C945eC493078c07732Fa79",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "BIRDS AREN'T REAL DAO PASSPORT",
        description: "Grants access to Birds Aren't Real DAO",
        image: readFileSync("scripts/assets/daoPassport.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()
