#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import os from "os";
import cp from "child_process";

const phrases = [
  {
    name: "Bismillah",
    value: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  },
  {
    name: "Suphaneke",
    value:
      "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلاَ إِلَهَ غَيْرُكَ",
  },
  {
    name: "Bakara",
    value:
      "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۚ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
  },
  {
    name: "Alhamdulillah",
    value: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
  },
  {
    name: "Allahuakbar",
    value: "اللَّهُ أَكْبَرُ",
  },
  {
    name: "Quran",
    value: "قُرَآنًا كَرِيمًا",
  },
];

async function main() {
  const computerName = getComputerName();

  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "phrase",
      message: `Hello ${computerName?.split(" ")[0]}, pick a prayer:`,
      choices: phrases,
    },
  ]);

  console.log("\n" + chalk.green(answer.phrase) + "\n");
  process.exit(0);
}

main().catch((error) => {
  console.error(chalk.red(error));
  process.exit(1);
});

function getComputerName() {
  switch (process.platform) {
    case "win32":
      return process.env.COMPUTERNAME;
    case "darwin":
      return cp.execSync("scutil --get ComputerName").toString().trim();
    case "linux":
      const prettyname = cp.execSync("hostnamectl --pretty").toString().trim();
      return prettyname === "" ? os.hostname() : prettyname;
    default:
      return os.hostname();
  }
}
