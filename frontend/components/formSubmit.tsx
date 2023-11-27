/* eslint-disable react-hooks/rules-of-hooks */

//DARG DROP IS NOT FUNCTIONAL
//TO SUBMIT A RESPONSE, CLICK THE ARROW ICON


'use client'

import React, { useState } from "react";
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
// import Link from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FileUploader } from "react-drag-drop-files";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/react";
import DragDrop from "@/components/drap-drop";

  
function formSubmit() {

  //do something with the file here.

  const router = useRouter();
  const handleButtonClick = () => {
    // do something with file
    //console.log(file);

    router.push(`/responses/new`);
  }

  return (
    <div>
      <form className="grid justify-items-center gap-1">
        <Textarea
          className="font-size-md "
          labelPlacement="outside"
          placeholder="Enter your description"
        />
        <DragDrop />
        <Button
          type="submit"
          color="primary"
          variant="light"
          className=" w-fit  "
        >
          Submit
        </Button>
      </form>
    </div>
    
      
  );
}
  
export default formSubmit;