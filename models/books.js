import fs from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filepath = join(__dirname, "storage.json");

async function getAllBooks() {
  try {
    // Check if file json storage exist, return error of didnt exist
    await fs.promises.access(filepath);

    let res = await fs.promises.readFile(filepath);
    res = JSON.parse(res.toString());

    return { status: "success", data: res };
  } catch (e) {
    return {
      status: "error",
      code: e.code,
      message: "Invalid, file doesn't exist",
    };
  }
}

async function insertBook(data) {
  try {
    // Check if file json storage exist, return error of didnt exist
    await fs.promises.access(filepath);

    await fs.promises.writeFile(filepath, JSON.stringify(data));

    return { status: "success", data: data };
  } catch (e) {
    return {
      status: "error",
      code: e.code,
      message: "Invalid, file doesn't exist",
    };
  }
}

export { getAllBooks, insertBook };
