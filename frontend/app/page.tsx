'use client'
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Canvas } from '@react-three/fiber';
import { Divider, Textarea, Text, Image, Card } from "@nextui-org/react";
import { SketchfabModel } from '../components/SketchfabModel';

export default function Home() {
	return (
		<section className="flex flex-col items-center h-3/4 border-2">
			<div className="flex flex-row items-center justify-center w-full h-3/4 border-2 max-w-full">
				<div className="flex flex-col items-center justify-center w-1/2 h-full border-2">
					<SketchfabModel />
				</div>

				<div className="flex flex-col items-center justify-start w-1/2 h-full border-2">
					<div className="flex flex-col items-center justify-center w-full h-1/5 border-2">
						<Card css={{ mw: "95%" }}>
							<Card.Body>
								<Text>A basic card</Text>
							</Card.Body>
						</Card>
					</div>
					<div className="flex flex-col items-center justify-center w-full h-1/2 border-2 flex-grow">

						<Image
							isBlurred
							width={400}
							src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
							alt="NextUI Album Cover"
							classNames="m-10"
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-row items-center justify-center w-full h-full border-2 px-6">
				<Textarea
					fullWidth={true}
					label="Description"
					labelPlacement="outside"
					placeholder="Enter your description"
					className=""
				/>
			</div>
		</section>
	);
}
