const Discord = require('discord.js');
const base62 = require('base62');
const util = require('./helper-functions');
const token = require('./token.json');
const replies = require('./replies.json');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
	let command = message.content.trim().split(' ')[0];

	if(command == '+sticker'){
  	addSticker(message);
	}else if(command == '-sticker'){
		removeSticker(message);
	}else if(command == '/stickers'){
		provideStickerInfo(message);
	}
});

/**
* Adds a sticker.
*
* @param {message object} message that triggered the bot
*/
function addSticker(message){
	let messageWords = message.content.trim().split(' ');
	let stickerName, stickerURL;
	let groupStickerRole = 'sticker-artist';

	//Make sure user has correct permissions
	if(message.channel.type == 'text' && !util.msgHasRole(message, groupStickerRole)){
		message.channel.sendMessage(replies.insufficientPermission.replace('%%ROLE%%', groupStickerRole));
		return false;
	}

	//Determine sticker image URL (to download from)
	if(messageWords.length < 2 || messageWords.length > 3){
		message.channel.sendMessage(replies.invalidAddSyntax);
		return false;
	}else if(messageWords.length == 2 && util.msgHasImgAttached(message)){
		stickerURL = message.attachments.array()[0].proxyURL;
	}else if(messageWords.length == 3 && util.linkIsDirectImg(messageWords[2]) && !util.msgHasImgAttached(message)){
		stickerURL = messageWords[2];
	}else{
		message.channel.sendMessage(replies.invalidAddSyntax);
		return false; 
	}

	stickerName = messageWords[1];

	//Determine if sticker is personal or group
	if(message.channel.type == 'dm'){
		message.channel.sendMessage(replies.addPersonalSticker.replace('%%STICKERNAME%%', stickerName));
		//add sticker to db
	}else if(message.channel.type == 'text' && util.msgHasRole(message, groupStickerRole)){
		message.channel.sendMessage(replies.addGroupSticker.replace('%%STICKERNAME%%', stickerName));
		//add sticker to db
	}else{
		message.channel.sendMessage('An unknown error occured');
	}

}

function removeSticker(message){
	let messageWords = message.content.trim().split(' ');
	let stickerName;
	let groupStickerRole = 'sticker-artist';

	//Make sure user has correct permissions
	if(message.channel.type == 'text' && !util.msgHasRole(message, groupStickerRole)){
		message.channel.sendMessage(replies.insufficientPermission.replace('%%ROLE%%', groupStickerRole));
		return false;
	}else if(messageWords.length != 2){
		message.channel.sendMessage(replies.invalidRemoveSyntax);
		return false;
	}

	stickerName = messageWords[1];

	if(message.channel.type == 'dm'){
		message.channel.sendMessage(replies.removePersonalSticker.replace('%%STICKERNAME%%', stickerName));
		//remove sticker to db
	}else if(message.channel.type == 'text' && util.msgHasRole(message, groupStickerRole)){
		message.channel.sendMessage(replies.removeGroupSticker.replace('%%STICKERNAME%%', stickerName));
		//remove sticker to db
	}else{
		message.channel.sendMessage(replies.unknownError);
	}

}

function provideStickerInfo(message){
	if(message.channel.type == 'dm'){
		let base62userid = base62.encode(parseInt(message.author.id));
		message.channel.sendMessage(replies.personalStickerInfo.replace('%%BASE62USERID%%', base62userid));	
	}else if(message.channel.type == 'text'){
		let base62serverid = base62.encode(message.guild.id);
		message.channel.sendMessage(replies.groupStickerInfo.replace('%%BASE62SERVERID%%', base62serverid).replace('%%RECENTSTICKERS%%', '`:test1:`, `:test2:`, `:test3`'));
	}

}

client.login(token.value);