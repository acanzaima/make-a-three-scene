import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import chalk from "chalk";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

let targetDir = __dirname.split(path.sep);
targetDir.pop();
targetDir = path.join(targetDir.join(path.sep), "scenes");

// 场景菜单结果数组
const MENUS_ARR = [];

// 控制台指令实例
const warn = chalk.hex("#FAAD14");
const error = chalk.hex("#FF4D4F");
const success = chalk.hex("#52C41A");
const info = chalk.hex("#1890FF");

console.log(info("reading scene folder..."));

// 合并菜单结果
fs.readdir(targetDir, (err, files) => {
  if (err) {
    console.log(warn(err));
  }

  console.log(info("reading description of scenes..."));

  files.forEach((file) => {
    let desc = fs.readFileSync(
      path.join(targetDir, file, "desc.json"),
      "utf-8"
    );
    desc && MENUS_ARR.push(desc);
  });
  if (MENUS_ARR.length > 0) {
    console.log(
      info("read description of scenes completed, try generate result file...")
    );
    fs.writeFile(
      path.join(__dirname, "menus.js"),
      "export default " + JSON.stringify(MENUS_ARR, null, 2),
      (err) => {
        if (err) {
          console.log(
            error(
              `failed to generate the scene menu file, as the reason of${err}`
            )
          );
        }
        console.log(success("the scene menu file is generated successfully"));
      }
    );
  }
});
