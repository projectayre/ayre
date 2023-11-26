"use client";

import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export const AnswerCard = () => {
	return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">ANSWER</p>
          <p className="text-small text-default-500">description of the answer</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>

      {/* can pass the image from the backend here */}
      
      <Image
          src="test.jpg"
          alt="Image of the answer"
          width="auto"
          height="auto"
          className="rounded-md"
        />

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </CardBody>
    </Card>
		
	);
};
