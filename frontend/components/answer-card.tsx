"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";

export const AnswerCard = ({ responseData }) => {
  const { image, description } = responseData;

  return (
    <Card className='w-full h-full bg-transparent' css={{ bgBlur: "#0f111466" }}>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md"> Ayre's response... </p>
        </div>
      </CardHeader>

      <Divider />

      <CardBody>
        <Image
          src="1280px-HD_transparent_picture.png"
          //src={image}
          alt="Image of the answer"
          width="500px"
          height="auto"
          className="rounded-large justify-items-center"
        />
      </CardBody>

      <Divider />

      <CardFooter>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
        {/* <p>{description}</p> */}
      </CardFooter>
    </Card>

  );
};
