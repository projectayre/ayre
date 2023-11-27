'use client;'

import { title } from "@Ï/components/primitives";

export default function AboutPage() {
    return (
        <div className='grid-cols-1'>

            <div className='grid-rows'>
                <p className="text-4xl justify-center my-40 py-0.5" css={{ fontFamily: "Poppins" }}>
                    About Us
                </p>
            </div>            

            <div className='grid-rows'>
                <p className="justify-center font-normal text-lg text-justify" css={{ fontFamily: "Poppins" }}>
                    AYRE is an Adpative Yielding Response Engine which is not only semantically attentive but also emotionally aware.
                    The engine is a Semantic-Attentive Visual Question Answering system with the capability of generating answers to questions based on the content of the image and the mood it portrays. 
                </p> <br />

                <br />

                <p className="text-2xl justify-center font-normal text-justify" css={{ fontFamily: "Poppins" }}>
                Problem Statement
                </p> <br />

                <p className="justify-center font-normal text-lg text-justify" css={{ fontFamily: "Poppins" }}>
                Given an image, can our machine answer users’ questions in natural language? 
                If so, can it frame answers in a way that captures any abstract semantics behind just the image or the question? 
                </p>
            </div>
        </div >
    );
}