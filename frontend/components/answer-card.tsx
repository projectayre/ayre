"use client";

import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export const AnswerCard = ({responseData}) => {
  const { image, description } = responseData;

	return (
    <Card isblurred='true' className='w-full h-full bg-transparent border-0' css={{ bgBlur: "#0f111466" }}>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md"> Ayre's response </p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>

      {/* can pass the image from the backend here */}

      <Image
          src="test.jpg"
          //src={image}
          alt="Image of the answer"
          width="auto"
          height="auto"
          className="rounded-large"
        />

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
        {/* <p>{description}</p> */}
      </CardBody>
    </Card>
		
	);
};
