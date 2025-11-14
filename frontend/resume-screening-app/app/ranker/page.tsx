"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconUpload } from "@tabler/icons-react"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

import { Spinner } from "@/components/ui/spinner"
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

import ResumeRankingTable from './resumeRankingTable';

export default function Home() {

  const fileRef = useRef<HTMLInputElement | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState("")
  const [isProcessing, setProcesing] = useState(false)
  const [resumes, setResumes] = useState([])

  const upload = () => {
    fileRef.current?.click()
  }
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  }

  useEffect(() => {
    if (jobDescription !== "" && files.length > 0) {
      setProcesing(true)
      handleHttpRequest()
    }
  }, [jobDescription, files])

  const showLoading = () => {
    if (isProcessing) {
      return (
        <Empty className="w-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>
            <EmptyTitle>Processing your request</EmptyTitle>
            <EmptyDescription>
              Please wait while we process your request. Do not refresh the page.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )
    }
  }

  const handleHttpRequest = async () => {
    const formData = new FormData()
    formData.append("job_description", jobDescription)
    files.forEach((file) => {
      formData.append("files", file);
    });
    const response = await axios.post('http://127.0.0.1:8000/api/match/similarity', formData)
    if (response.data.success) {
      setTimeout(() => {
        setProcesing(false)
        setResumes(response.data.resumes)
      }, 2000)
    } else {
      setProcesing(false)
      setError(response.data.error)
      setResumes([])
    }
  }

  
  const resumeTableHeader = () => {
    return (<div className="space-y-2 mt-5">
      <h1 className="text-3xl font-bold tracking-tight text-balance">Resume Rankings</h1>
      <p className="text-muted-foreground text-balance">
        Top candidates ranked by similarity score to job requirements
      </p>
    </div>
    );
  }
 
  return (
    <div className=" text-center bg-zinc-50 font-sans">
      <h2 className="scroll-m-20 mb-4 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Similarity Score Calculator
      </h2>
      <div className="grid gap-3 ml-15 mb-5 mt-5 mr-15">
        <Label htmlFor="message">Job Description</Label>
        <Textarea className="overflow-auto h-50"
          placeholder="Enter job description here"
          id="message"
          onChange={e => setJobDescription(e.target.value)} />
      </div>
      <Button variant="outline" size="lg" onClick={upload}>
        Upload Multiple Resumes<IconUpload />
      </Button>
      <Input id="resume"
        type="file" hidden={true}
        accept=".pdf,.doc,.docx,.txt"
        ref={fileRef}
        onChange={onFileChange}
        multiple={true} />
      {showLoading()}
      {resumes.length > 0 && [resumeTableHeader(), <ResumeRankingTable resumes={resumes}/>]}
    </div>

  );
}
