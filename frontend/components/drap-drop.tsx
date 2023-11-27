
"use client";

import React, { useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { FileUploader } from "react-drag-drop-files";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/react";

const fileTypes = ["jpg", "jpeg", "png"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleChange = (file) => {
    setFile(file);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const router = useRouter();
  const handleButtonClick = async () => {
    if (!file || !description) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    try {
      const response = await fetch("http://0.0.0.0:7644/predict", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Prediction data:", responseData);
      } else {
        console.error("Error submitting prediction data:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <form className="grid justify-items-center gap-1">
      <Textarea
        className="font-size-md "
        labelPlacement="outside"
        placeholder="Enter your description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <div className=" rounded-2xl bg-[#191717]   flex flex-col items-center justify-center w-fit ">
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>
      <Button
        type="submit"
        color="primary"
        variant="light"
        className=" w-fit"
        onClick={handleButtonClick}
      >
        Submit
      </Button>
    </form>
  );
}

export default DragDrop;
