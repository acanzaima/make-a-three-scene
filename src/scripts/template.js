import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import minimist from "minimist";
import chalk from "chalk";
import { execa } from "execa";
import enquirer from "enquirer";

const { prompt } = enquirer;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ARGS = minimist(process.argv.slice(2));
const NODE_VERSION = process.version;
const OS_PLATFORM = os.platform();

// 模板文件目录
let srcDir = __dirname.split(path.sep);
srcDir.pop();
srcDir = srcDir.join(path.sep);

let templateDir = path.join(srcDir, "tpl");

// 控制台指令实例
const warn = chalk.hex("#FAAD14");
const error = chalk.hex("#FF4D4F");
const success = chalk.hex("#52C41A");

// 执行模板创建
main();

// 主函数
async function main() {
  if (ARGS._.length > 0) {
    let sceneName = ARGS._[0];
    let targetDir = path.join(srcDir, "scenes", sceneName);
    // 校验场景名称: 字符只能是小写字母，数字及-
    while (!/^[a-z0-9-]+$/g.test(sceneName)) {
      console.log(
        warn(
          "the scenario name can only contain lowercase letters, digits, and hyphens (-), please change the name and try again."
        )
      );
      const { scene } = await prompt({
        type: "input",
        name: "scene",
        message: "enter a scenario directory name:",
      });
      sceneName = scene;
      targetDir = path.join(srcDir, "scenes", sceneName);
    }
    // 校验场景名称: 场景名是否已使用
    while (fs.existsSync(targetDir)) {
      console.log(
        warn(
          "the scenario directory already exists, please change the name and try again."
        )
      );
      const { scene } = await prompt({
        type: "input",
        name: "scene",
        message: "enter a scenario directory name:",
      });
      sceneName = scene;
      targetDir = path.join(srcDir, "scenes", sceneName);
    }
    // node版本符合要求，使用nodejs复制文件
    if (versionIsGreaterThan16()) {
      fs.cp(templateDir, targetDir, { recursive: true }, (err) => {
        if (err) {
          console.log(
            error(
              `failed to generated the scenario directory, as the reason of ${err}`
            )
          );
        }
        console.log(
          success("the scenario directory is generated successfully")
        );
      });
    } else {
      // 否则根据平台类别执行命令复制
      executeOsCp(OS_PLATFORM, templateDir, targetDir);
    }
  } else {
    console.log(warn("please enter an argument as scenario directory name"));
  }
}

/**
 * 检查node版本是否大于v16.7
 * @param {*} version node版本
 * @returns 结果
 */
function versionIsGreaterThan16(version = NODE_VERSION) {
  let vInfo = version.split(".");
  if (Number(vInfo[0].slice(1)) >= 16) {
    if (Number(vInfo[1]) >= 7) {
      return true;
    }
    return false;
  }
  return false;
}

/**
 * 执行复制模板命令
 * @param {*} platform 平台类别
 * @param {*} srcDir 复制目录
 * @param {*} targetDir 目标目录
 */
async function executeOsCp(platform = OS_PLATFORM, srcDir, targetDir) {
  if (platform === "win32") {
    const { stdout, stderr } = await execa("xcopy", [
      srcDir,
      targetDir,
      "/S",
      "/I",
    ]);
    stdout && console.log(success(stdout));
    stderr && console.log(error(stderr));
    if (!stderr) {
      console.log(success("the scenario directory is generated successfully"));
    }
  } else if (platform === "linux" || platform === "darwin") {
    await execa("mkdir", ["-p", targetDir]);
    const { stdout, stderr } = await execa("cp", [
      "-r",
      `${targetDir}/*`,
      targetDir,
    ]);
    stdout && console.log(success(stdout));
    stderr && console.log(error(stderr));
    if (!stderr) {
      console.log(success("the scenario directory is generated successfully"));
    }
  } else {
    console.log(warn("unsupported os"));
  }
}
