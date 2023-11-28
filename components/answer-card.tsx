'use client';

// Import necessary modules
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from '@nextui-org/react';

export const AnswerCard = ({ responseData }) => {
  const [displayedData, setDisplayedData] = useState(responseData);

  useEffect(() => {
    console.log('AnswerCard received data:', responseData);
    setDisplayedData(responseData);
  }, [responseData]);

  useEffect(() => {
    console.log('Updating displayed data:', displayedData);
  }, [displayedData]);

  console.log('Image type:', typeof displayedData.image);

  return (
    <Card className="w-full h-full bg-transparent" css={{ bgBlur: '#0f111466' }}>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md"> Ayre's response... </p>
        </div>
      </CardHeader>

      <Divider />

      <CardBody>
        {displayedData.image ? (
          // Render the image directly if it's a URL
          typeof displayedData.image === 'string' ? (
            <Image
              src={displayedData.image}
              alt="Image of the answer"
              width="500px"
              height="auto"
              className="rounded-large justify-items-center"
            />
          ) : displayedData.image instanceof Blob ? (
            // Use Blob URL directly
            <Image
              src={URL.createObjectURL(displayedData.image)}
              alt="Image of the answer"
              width="500px"
              height="auto"
              className="rounded-large justify-items-center"
            />
          ) : (
            <p>Invalid image format</p>
          )
        ) : (
          <p>No image available</p>
        )}
      </CardBody>

      <Divider />

      <CardFooter>
        <p>{displayedData.prediction || 'Lorem ipsum dolor sit amet...'}</p>
      </CardFooter>
    </Card>
  );
};
