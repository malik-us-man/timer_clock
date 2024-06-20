#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";



import { differenceInSeconds } from "date-fns";

const res = await inquirer.prompt([
  {
    name: "userInput",
    type: "number",
    message: (chalk.bold.yellow("Enter The Number Of Seconds.")),
    validate: (input)=>{
      if(isNaN(input)){
        return (chalk.bold.yellow("Please Inter Vaild Number"))
      }else if (input > 60){
        return (chalk.bold.yellow("Seconds Must Be In 60"))
      }else {
        return true;
      }
    }
  },
]);

let input = res.userInput;

function startTime(val: number) {
  const intTime = new Date().setSeconds(new Date().getSeconds() + val);
  const intervalTime = new Date(intTime);
  setInterval(() => {
    const currTime = new Date();
    const timeDiff = differenceInSeconds(intervalTime, currTime);

    if (timeDiff <= 0) {
      console.log(chalk.bold.green("Time is Over"));
      process.exit();
    }
    const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
    const sec = Math.floor(timeDiff % 60);
    console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
  }, 1000);
}
startTime(input);
