import { CollectionName } from "@/lib/pb/client";
import { runCommand } from "@/utils/fs";
import { config as dotenvConfig } from "dotenv";
import { writeFile } from "fs/promises";

dotenvConfig();

const CHUNKED_TYPES_OUTPUT_DIR = "./src/lib/pb/database.ts";

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
    ];
    console.log(" ================ running command =============== ", commands);
    const output = await runCommand(commands.join(" "));
    return output;
  } catch (error) {
    throw error;
  }
}

export async function filterByCollection() {
  const collection = process.argv[2];
  if (!collection) {
    throw new Error("Please provide a collection name");
  }
  // console.log("process args === ", process.argv[2]);
  try {
    let text_output = "";
    let currentBlock: string | null = null;
    let first_block_index = 0;
    let current_block_indexes = [0, 0];
    const all_block_indexes: { [key: string]: number[] } = {};

    // const file_string = await readFile(TYPES_OUTPUT_PATH, "utf-8");
    const file_string = await getPBType();
    const lines = file_string.split("\n");
    for (const [index, line] of lines.entries()) {
      if (currentBlock) {
        // mark the end current block if at the end of the file
        if (lines.length - 1 === index) {
          current_block_indexes[1] = index;
          all_block_indexes[currentBlock] = [...current_block_indexes];
        }
      }
      if (line.startsWith("// ===== ")) {
        const current_block_name = line.split("=====")[1].trim();
        // currentBlck is not null after the first // ===== encount eredor a new block
        if (currentBlock) {
          // current block is not the same as the current block name
          if (currentBlock !== current_block_name) {
            // mark where the currennt block index ends at
            current_block_indexes[1] = index;
            // save the current block index to the all_block_indexes
            all_block_indexes[currentBlock] = [...current_block_indexes];
          }
          //   nullify the current block name to start the new one
          currentBlock = null;
        }
        // current block is null after the first // ===== encount eredor a new block
        if (!currentBlock) {
          // mark where the first // ===== block index is encountered ,this will be used to determine where the glbal/shared types end
          if (Object.entries(all_block_indexes).length === 0) {
            first_block_index = index;
          }
          // mark where the currennt block index starts at
          current_block_indexes[0] = index;
          //   set the current block name
          currentBlock = current_block_name;
        }
      }
    }

    //  add init types ( shared pocketbase types )
    const init_types = lines.slice(0, first_block_index);

    text_output = init_types.join("\n");

    //  Main types section
    for (const [key, value] of Object.entries(all_block_indexes)) {
      // filter inly for specified collection
      if (!key.includes(collection)) continue;
      const selected_lines = lines.slice(value[0], value[1]);
      selected_lines.splice(0, 1, "// ==== start of " + key + " block =====\n");
      selected_lines.push("// ==== end of " + key + " block =====\n");
      const data = selected_lines.join("\n");
      //   concatenate the selected lines
      text_output += data + "\n";
    }
    //  add the final schema block
    const schema_block = all_block_indexes["Schema"];
    // filter only for specified collection
    if (schema_block) {
      const schema_lines = lines.slice(schema_block[0], schema_block[1]);
      const filtered_schema_lines = [];
      for (const line of schema_lines) {
        if (line.includes(collection)) {
          filtered_schema_lines.push(line);
        }
        if (line.includes("{") || line.includes("}")) {
          filtered_schema_lines.push(line);
        }
      }
      console.log({ filtered_schema_lines });

      text_output += filtered_schema_lines.join("\n");
    }

    await writeFile(CHUNKED_TYPES_OUTPUT_DIR, text_output, "utf-8");
    return { text_output, all_block_indexes, first_block_index };
  } catch (error) {
    throw error;
  }
}

filterByCollection()
  .then((res) => {
    console.log("===== succesfull types generation ==== ");
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
