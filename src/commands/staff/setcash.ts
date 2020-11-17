import { getModelForClass } from "@typegoose/typegoose";
import { DMChannel, Message, MessageEmbed, NewsChannel, TextChannel, User } from "discord.js";
import { Bot } from "../../lib/bot";
import BotCommand from "../../lib/command";
import { Gamer } from "../../types/user";
import deletablemessage from "../../utils/deletablemessage";

export default class SetCashCommand extends BotCommand {
	constructor() {
		super("setcash", "Admin command used to set a user's cash.", { category: "Admin" });
	}

	async sendInvalidParams(channel: TextChannel | DMChannel | NewsChannel) : Promise<void> {
		return void await deletablemessage(channel, this.invalidParameters(), 5 * 1000);
	}

	async execute(bot: Bot, message: Message, args: string[]) : Promise<void> {

		if(!message.member?.hasPermission(["ADMINISTRATOR"])) return;

		if(args.length < 2) return this.sendInvalidParams(message.channel);

		const user = message.mentions.users.first();
		const cash: number = Number(args[1]);

		if(!user || !cash) return this.sendInvalidParams(message.channel);

		const model = getModelForClass(Gamer, { existingConnection: bot.db });
		const existingUser = await model.findOne({ user_id: user.id });

		if(existingUser) {

			await model.updateOne({ user_id: user.id }, { cash: cash });
			message.channel.send(this.updatedCashEmbed(user, cash));

		} else message.channel.send(`${user.username} (${user.id}) is not registered in the database.`);
	}

	invalidParameters() : MessageEmbed {
		const embed = new MessageEmbed();
		embed.setDescription(`Invalid Parameters! Use .setcash <user> <amount>.`);
		embed.setColor("RED");
		return embed;
	}

	updatedCashEmbed(user: User, cash: number) : MessageEmbed {
		const embed = new MessageEmbed();
		embed.setDescription(`Updated ${user} cash to ${cash}.`);
		embed.setColor("GREEN");
		return embed;
	}
}