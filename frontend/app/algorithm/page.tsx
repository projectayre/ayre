'use client;'

import { Image, Spacer, Text } from "@nextui-org/react";
import { title } from "@Ï/components/primitives";

export default function AlgorithmPage() {
    return (
        <div className='grid-cols-1'>

            <div className='grid-rows'>
                <p className="text-4xl justify-center my-40 py-0.5" css={{ fontFamily: "Poppins" }}>
                    About Us
                </p>
            </div>

            <div className='grid-rows'>
                <p className="justify-center font-normal text-lg text-justify" css={{ fontFamily: "Poppins" }}>
                    <b> Adpative Yielding Response Engine (AYRE) </b> which is not only semantically attentive but also emotionally aware.
                    The engine is a Semantic-Attentive Visual Question Answering system with the capability of generating answers to questions based on the content of the image and the mood it portrays.
                </p> <Spacer y={50} />

                <p className="text-2xl justify-center font-normal text-justify" css={{ fontFamily: "Poppins" }}>
                    Problem Statement
                </p> <br />

                <p className="justify-center font-normal text-lg text-justify" css={{ fontFamily: "Poppins" }}>
                    Given an image, can our machine answer users’ questions in natural language?
                    If so, can it frame answers in a way that captures any abstract semantics behind just the image or the question?
                </p> <Spacer y={50} />

                <p className="text-2xl justify-center font-normal text-justify" css={{ fontFamily: "Poppins" }}>
                    Methodology
                </p> <Spacer y={50} />

                <Image
                    alt="NextUI hero Image"
                    src="AYRE.png"
                /> <Spacer y={50} />

                <p className="justify-center font-normal text-lg text-justify" css={{ fontFamily: "Poppins" }}>
                    A modified vision transformer along with another modified U-NET model made into a seamless pipeline that will perform tasks of semantic segmentation and VQA in hopes that the segmented analysis is able to outperform SOTA methods.
                </p> <br />

                <p className="justify-center font-normal text-lg text-justify" css={{ fontFamily: "Poppins" }}>
                    A modified U-Net segmentation model provides semantic information about each pixel in the image.
                    These color segments, as latent tensors, provide the value matrix for attention masks.
                    The segments can also be annotated on the fly to provide context to the user.
                </p> <br />

                <Image
                    alt="NextUI hero Image"
                    src="Segmentation.png"
                    isBlurred                    
                /> <Spacer y={50} />

                <p className="justify-center font-normal text-lg text-justify" css={{ fontFamily: "Poppins" }}>
                    Dual stream transformer Vision Language Processing model that uses self-attention on both visual and text features to maximize info-gain. The novelty lies in the attention heads; these are generated using image segmentation to ensure every label gets its own attention
                </p> <br />

                <Image
                    alt="NextUI hero Image"
                    src="Dual stream transofrmer.png"
                    className=""
                    isBlurred
                /> <Spacer y={50} />

                <p className="justify-center font-normal text-lg text-justify" css={{ fontFamily: "Poppins" }}>
                The AYRE sentiment analysis module is designed to interpret an image's emotional undertones through color analysis. The system maps dominant colors extracted from the image to corresponding emotions using color psychology. This process begins loading the image into the system, which imports the image and converts it to RGB format for accurate color representation.
                </p> <br />

                <Image
                    alt="NextUI hero Image"
                    src="Plutchik-wheel.png"
                    isBlurred
                /> <Spacer y={50} />
            </div>
        </div >
    );
}