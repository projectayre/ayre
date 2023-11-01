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
import { SketchfabModel }  from '../components/SketchfabModel';

// import { Model } from '../components/New_surface_study_2';


export default function Home() {
	return (
		<section className="flex flex-row items-center justify-evenly h-4/5 gap-4 md:py-2 border-2">
			<div className="flex flex-col items-center justify-center w-1/2 h-full border-2 max-w-full">
				<h1 className="text-3xl font-bold"> Insert 3D model here </h1>
				<SketchfabModel />
				{/* <div class="sketchfab-embed-wrapper"> <iframe title="New Surface study 2" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/4e821134e2994b8d8164dd7255fe9fd6/embed"> </iframe> <p style="font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;"> <a href="https://sketchfab.com/3d-models/new-surface-study-2-4e821134e2994b8d8164dd7255fe9fd6?utm_medium=embed&utm_campaign=share-popup&utm_content=4e821134e2994b8d8164dd7255fe9fd6" target="_blank" rel="nofollow" style="font-weight: bold; color: #1CAAD9;"> New Surface study 2 </a> by <a href="https://sketchfab.com/tamminen?utm_medium=embed&utm_campaign=share-popup&utm_content=4e821134e2994b8d8164dd7255fe9fd6" target="_blank" rel="nofollow" style="font-weight: bold; color: #1CAAD9;"> tamminen </a> on <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=4e821134e2994b8d8164dd7255fe9fd6" target="_blank" rel="nofollow" style="font-weight: bold; color: #1CAAD9;">Sketchfab</a></p></div> */}

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
