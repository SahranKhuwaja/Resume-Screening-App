"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconUpload } from "@tabler/icons-react"
import { ReactNode, useRef, useState } from "react";

export default function Home() {
  
    const fileRef = useRef<HTMLInputElement | null>(null)
    const [fileName, setFileName] = useState("")
    const [fileSize, setFileSize] = useState(0)
    
    const upload = ()=>{
        fileRef.current?.click()
    }
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const file = e.target.files?.[0];
        if(file){
            setFileName(file.name)
            setFileSize(file.size)
        }
    }
    const fileDetails = () => {
        if(fileName!==""){
            return (
                <div className="mt-4">
                    <p className="font-medium">File Uploaded: {fileName}</p>
                    <p className="font-medium">File Size: {fileSize / 1000 } Bytes</p>
                </div>
            );
        }
        return <></>
    }
    return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <h2 className="scroll-m-20 mb-4 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Resume Analyzer
      </h2>
      <Button variant="outline" size="lg" onClick={upload}>
        Upload <IconUpload />
      </Button>
      <Input id="resume" 
        type="file" hidden={true} 
        accept=".pdf,.doc,.docx,.txt"
        ref={fileRef}
        onChange={onFileChange}/>
      {fileDetails()}
    </div>

  );
}
