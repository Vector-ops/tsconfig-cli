import { writeFileSync } from "fs";
import inquirer from "inquirer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const react = require("./config/tsconfig.react.json");
const node = require("./config/tsconfig.node.json");
const nextjs = require("./config/tsconfig.nextjs.json");

const tsconfigs = {
	react: JSON.stringify(react),
	node: JSON.stringify(node),
	nextjs: JSON.stringify(nextjs),
};

inquirer
	.prompt([
		{
			type: "list",
			message: "Choose the framework for your project",
			name: "framework",
			choices: ["react", "node", "nextjs"],
		},
	])
	.then(({ framework }) => {
		let tsconfigChoice = tsconfigs[framework];

		const path = process.cwd();
		writeFileSync(path + "/tsconfig.json", tsconfigChoice, "utf-8");
		console.log("tsconfig.json successfully created.");
	});
