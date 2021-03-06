module.exports = function(message, prefix, resource_info){

	const embed_color = 16540258;
	const lib_version = "11.5.1";
	const discord_link = "https://discord.gg/HNFmKsE";
	const add_bot_link = `https://discordapp.com/oauth2/authorize?client_id=${process.env.DISCORD_APP_ID}&scope=bot&permissions=${process.env.DISCORD_BOT_PERMS}`;
	const bot_vote_link = `https://discordbots.org/bot/${process.env.DISCORD_APP_ID}`;

	//Escape prefix to avoid issues with Discord formatting
	const escaped_prefix = (prefix) ? prefix.replace(/[^a-zA-Z0-9]/g, '\\$&') : null;
	const sticker_amount = resource_info.customStickers.length;

	if(message.channel.type === 'text'){

		let sticker_manager_role = resource_info.stickerManagers.roleId;
		let custom_stickers = resource_info.customStickers;
		let list_mode = resource_info.listMode;
		let whitelist_role = resource_info.whitelist.roleId;
		let blacklist_role = resource_info.blacklist.roleId;
		let personal_stickers_allowed = resource_info.personalStickersAllowed ? "Yes" : "No";
		let who_can_send;
		let guild = message.channel.guild;	
		let sticker_manager_role_name;

		const getRoleNameFromId = id => {
			if(id === '@everyone') return 'everyone';
			else if(id === null) return 'N/A';
			else{
				let role = guild.roles.find(r => r.id === id);
				return role.name.replace(/[^a-zA-Zа-яёА-ЯЁ0-9\s]/g, '\\$&');
			}
		}

		sticker_manager_role_name = getRoleNameFromId(sticker_manager_role);
		whitelist_role_name = getRoleNameFromId(whitelist_role);
		blacklist_role_name = getRoleNameFromId(blacklist_role);	

		if(list_mode === 'whitelist'){
			if(whitelist_role_name === 'everyone') who_can_send = 'everyone';
			else who_can_send = `Anyone with the role *${whitelist_role_name}*`;
		}else{
			who_can_send = `Anyone __without__ the role *${blacklist_role_name}*`;
		}

		message.channel.send({embed: {
			color: embed_color,
			fields: [
				{
					name: "Sticker Surge",
					value: `
						To view a list of commands, type: **${escaped_prefix}commands**
						[View available sticker packs](${process.env.APP_URL}/sticker-packs)
						[View documentation](${process.env.APP_URL}/docs)
						.
					`.replace(/\t/g, '')
				},
				{
					name: message.guild.name,
					value: `
						Command Prefix: ${escaped_prefix}
						Who can use stickers: ${who_can_send}
						Sticker Manager Role: ${sticker_manager_role_name}
						Personal stickers allowed: ${personal_stickers_allowed}
						Custom Stickers: ${sticker_amount}
						[View Stickers](${process.env.APP_URL}/server/${message.guild.id})
						.
					`.replace(/\t/g, '')
				},
				{
					name: "Misc. Links",
					value: `
						[Join our Discord](${discord_link})
						[Add bot to another server](${add_bot_link})
						[Enjoy the bot? Upvote it on DiscordBotList <3](${bot_vote_link})
						___
					`.replace(/\t/g, '')
				}
			],
			footer: {
				text: `Created by: DRL#1287 | Library: Discord.js ${lib_version}`
			}
		}});

	}else{

		message.channel.send({embed: {
			color: embed_color,
			fields: [
				{
					name: "Sticker Surge",
					value: `
						To view a list of commands, type: **commands**
						.
					`.replace(/\t/g, '')
				},
				{
					name: message.author.username,
					value: `
						Custom Stickers: ${sticker_amount}
						[View Stickers](${process.env.APP_URL}/user/${message.author.id})
						.
					`.replace(/\t/g, '')
				},
				{
					name: "Useful Links",
					value: `
						[Join our Discord](${discord_link})
						[Add bot to a server](${add_bot_link})
						[Enjoy the bot? Upvote it on DiscordBotList <3](${bot_vote_link})
						___
					`.replace(/\t/g, '')
				}
			],
			footer: {
				text: `Created by: DRL#1287 | Library: Discord.js ${lib_version}`
			}
		}});

	}
	
}