'use client'
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Divider, Textarea } from "@nextui-org/react";


export default function Home() {
	return (
		<section className="flex flex-row items-center justify-evenly h-4/5 gap-4 md:py-2 border-2">
			<div className="flex flex-col items-center justify-center w-1/2 h-full border-2 max-w-full">

				<h1 className="text-3xl font-bold"> Insert 3D model here </h1>

				<Divider />
				<Textarea
					label="Description"
					labelPlacement="outside"
					placeholder="Enter your description"
					size="full"
				/>
			</div>

			<div className="flex flex-col items-center justify-center gap-4 w-1/2 h-full border-2">
				<h1 className="text-3xl font-bold"> Sentiment Plot </h1>
				<h1 className="text-3xl font-bold"> Image Plot </h1>
				<Divider />
				<h1 className="text-3xl font-bold"> Answer </h1>
			</div>
		</section>
	);
}
