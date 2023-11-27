'use client';

// Import necessary modules
import { useState } from 'react';
import { Divider, Spacer } from '@nextui-org/react';
import { SketchfabModel } from '../components/SketchfabModel';
import { AnswerCard } from '@/components/answer-card';
import DragDrop from '@/components/drap-drop';
import axios from 'axios'; // Add this import

const responseData = {
  // image: "https://example.com/image.jpg",
  // description: "This is the description of the answer.",
};

export default function Home() {
  const [predictionData, setPredictionData] = useState(responseData);

  const handlePrediction = (data) => {
    // Check if the image URL is present in the response data
    if (data.image) {
      // If the image is present, set the image URL directly
      data.image = URL.createObjectURL(data.image);
    }
    setPredictionData(data);
  };


  return (
    <section className="grid justify-items-center">
      <div className=" grid grid-flow-col items-center gap-10 p-6 pr-40">
        <div className="grid justify-items-center max-w-full">
          <SketchfabModel />
        </div>

        <div className="">
          <AnswerCard responseData={predictionData} />
        </div>
      </div>

      <Divider />
      <Spacer y={2} />

      <div className="grid items-center w-full h-fit">
        <DragDrop onPrediction={handlePrediction} />
      </div>
    </section>
  );
}