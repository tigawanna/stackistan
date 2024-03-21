import { CollectionName } from "@/lib/pb/client";
import { runCommand } from "@/utils/fs";
import { config as dotenvConfig } from "dotenv";
import { createReadStream } from "fs";
import { readFile, appendFile } from "fs/promises";
import { createInterface, ReadLine } from "readline";

dotenvConfig();
const TYPES_OUTPUT_PATH = "./pb_types.ts";
const CHUNKED_TYPES_OUTPUT_DIR = "./pb-out"

type ValidSubset<T extends string> = T extends `${infer Prefix}_${infer Suffix}`
  ? Prefix
  : never;

export async function getPBType() {
  try {
    const PB_ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL;
    const PB_ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD;

    const commands = [
      "npx",
      "typed-pocketbase",
      "--email",
      PB_ADMIN_EMAIL,
      "--password",
      PB_ADMIN_PASSWORD,
      "--out",
      TYPES_OUTPUT_PATH,
    ];
    console.log(" ================ running command =============== ", commands);
    const output = await runCommand(commands.join(" "));
    return output;
  } catch (error) {
    throw error;
  }
}

async function copyStackistanData(filePath: string) {
  try {
    const data = await readFile(filePath, "utf-8");
    let currentBlock: string | null = null; // Track the current comment block
    let stackistanData = "";

    for (const line of data.split("\n")) {
      // Check if the line starts a comment block
      if (line.startsWith("// ===== ")) {
        currentBlock = line.slice("// ===== ".length).trim(); // Extract the comment block name
        stackistanData = ""; // Clear data for the new block
      } else if (currentBlock) {
        // Check if the line ends the current comment block (empty line after comment)
        if (line.trim() === "") {
          // Write the extracted data for the block
          stackistanData += "\n"; // Add newline after each block
        appendFile("stackistan_data.txt", stackistanData);
          currentBlock = null;
        } else {
          // Append line to the current block data
          stackistanData += line + "\n";
        }
      }
    }
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

export async function filterByCollection(
  collection: ValidSubset<CollectionName>,
) {
  try {
    let output: string[] = [];
    const fileStream = createReadStream(TYPES_OUTPUT_PATH);
    const rl: ReadLine = createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    let currentBlock: string | null = null; // Track the current comment block
    let stackistanData = "";
    for await (const line of rl) {
      // if(line.includes(`${collection}`)){
      //   output.push(line);
      //     console.log("Line from file:", line);
      // }
    
        if (line.startsWith("// ===== ") ) {
        const current_block = line.split("=====")[1].trim();
        // console.log(" ====  current_block  === ", current_block);
          currentBlock = current_block;// Extract the comment block name
          stackistanData = "";
        } 
      else if (currentBlock) {
            if (line.trim() === "") {
                console.log(" ====  stackistanData  === ", stackistanData);
                // console.log(" === line  === ",line)
                // console.log(" ====  stackistanData  === ", stackistanData);
              // Write the extracted data for the block
              stackistanData += "\n"; // Add newline after each block
            //   appendFile(`${CHUNKED_TYPES_OUTPUT_DIR}/${currentBlock}/data.ts`,
            //     stackistanData,
            //   );
              currentBlock = null;
            } else {
              // Append line to the current block data
              console.log(" ==  append new === ", line);
              stackistanData += line + "\n";
            }
        }
      
    }
    console.log(" ====  current block  === ", currentBlock);
    console.log(" ====  stackistanData  === ", stackistanData);
    return output;
  } catch (error) {
    throw error;
  }
}

filterByCollection("stackistan")
  .then((res) => {
    console.log("===== succesfull types generation ==== ", res);
  })
  .catch((err) => {
    console.log("===== error types generation ==== ", err);
  });

// getPBType()
//   .then((res) => {
//     console.log("===== succesfull types generation ==== ", res);
//   })
//   .catch((err) => {
//     console.log("===== error types generation ==== ", err);
//   });
