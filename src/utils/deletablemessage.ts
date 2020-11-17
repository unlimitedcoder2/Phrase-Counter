import { Message, APIMessageContentResolvable, MessageAdditions, MessageOptions, Channel, TextChannel, NewsChannel, DMChannel } from "discord.js";

/**
 * 
 */
export default async (channel: TextChannel | DMChannel | NewsChannel, content:  APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions, deleteAfter: number): Promise<Message> => {
	const m = await channel.send(content);

	setTimeout(async () => {
		if(m.deletable) m.delete();
	}, deleteAfter);

	return m;
}