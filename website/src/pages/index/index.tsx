import React from "react";
import Head from "next/head";
import s from "./index.module.scss";
import { LinkButton } from "components/Button";
import { BOT_INVITE_URL } from "data/constants";

const taglines = [
	"Make your server more expressive",
	"Spice up your server",
	"Meme it up in your server",
	"Liven up the mood in your server",
	"Keep your server interesting",
	"Add some fun to your server",
	"Express yourself in your server",
	"Try something new in your server",
	"Bring a bit of humor to your server",
	"Trash talk your buddies in new ways",
	"Turn your server up a notch"
];

const HomePage = () => {
	// const tagline = taglines[Math.floor(Math.random() * taglines.length)];
	const tagline = taglines[0];

	return (
		<main className={s.page}>
			<Head>
				<title key="title">Sticker Packs & Custom Stickers - Stickers for Discord</title>
				<meta
					key="description"
					name="description"
					content="Discord stickers have finally arrived – Inspired by apps like Telegram & LINE, this bot is here to help! Setting up your server is fun & only takes a minute."
				/>
			</Head>

			<div className={s.headline}>
				<span>{tagline} with</span>
				<h1>Stickers for Discord</h1>
			</div>

			<div className={s.buttonGroup}>
				<LinkButton
					type="primary"
					size="large"
					link={BOT_INVITE_URL}
					isExternal={true}
				>
					Add to Discord
				</LinkButton>

				<LinkButton
					type="standard"
					size="large"
					link="/docs"
					isExternal={false}
				>
					Learn More
				</LinkButton>
			</div>
		</main>
	);
};

export default HomePage;
