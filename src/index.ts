import dotenv from "dotenv";
import { Bot } from "./lib/bot";
import fs from "fs";
import { Config } from "./types/config";

(async () => {
	const configFile = await fs.promises.readFile("./config");
	const config = JSON.parse(configFile.toString()) as Config;

	dotenv.config();

	const bot = new Bot({}, config);
	
	bot.once('ready', () => {
		bot.user!.setActivity(config.bot.status.activity, { type: config.bot.status.type });
		console.log(`Logged into ${bot.user?.username}.`);
	});
	
	bot.login(process.env.TOKEN);

})();