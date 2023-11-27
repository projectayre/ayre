//DARG DROP IS NOT FUNCTIONAL
//TO SUBMIT A RESPONSE, CLICK THE ARROW ICON

'use client'

import React, { useState } from "react";
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
// import Link from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FileUploader } from "react-drag-drop-files";
 

const fileTypes = ["MP3"];
  
function DragDrop() {
  const [file, setFile] = useState(null);
  
  const handleChange = file => {
    setFile(file);
  };

  const router = useRouter();
  const handleButtonClick = () => {
    // do something with file
    //console.log(file);

    router.push(`/responses/new`);
  }

  return (
    <div className=" rounded-2xl bg-[#191717] p-3  flex flex-col items-center justify-center w-fit">
   
    <ArrowUpTrayIcon onClick={handleButtonClick} className="h-8 w-8 " />

      <h3>Or Drag and Drop Below</h3>
      <FileUploader 
        handleChange={handleChange} 
        name="file" 
        types={fileTypes} 
      />
    </div>
      
  );
}
  
export default DragDrop;