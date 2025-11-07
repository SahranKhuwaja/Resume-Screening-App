"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconUpload } from "@tabler/icons-react"
import axios from "axios";
import { ReactNode, useRef, useState } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

export default function Home() {

  const fileRef = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState("")
  const [fileSize, setFileSize] = useState(0)
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [prediction, setPrediction] = useState("")
  const [error, setError] = useState("")
  const [isProcessing, setProcesing] = useState(false)

  const upload = () => {
    fileRef.current?.click()
  }
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setError("")
      setPrediction("")
      setProcesing(true)
      setFileName(file.name)
      setFileSize(file.size)
      setFile(file);
      setFileUrl(URL.createObjectURL(file));
      handleHttpRequest(file)
    }
  }
  const fileDetails = () => {
    if (fileName !== "") {
      return (
        <div className="mt-4">
          <p className="font-medium">File Uploaded: {fileName}</p>
          <p className="font-medium">File Size: {fileSize / 1000} Bytes</p>
        </div>
      );
    }
    return <></>
  }

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

  const handleHttpRequest = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    const response = await axios.post('http://127.0.0.1:8000/api/prediction/predict', formData)
    if (response.data.success) {
      setTimeout(() => {
        setProcesing(false)
        setPrediction(response.data.prediction_label)
      }, 2000)
    } else {
      setProcesing(false)
      setError(response.data.error)
      setPrediction("")
    }
  }

  const renderPrediction = () => {
    if (error === "" && prediction !== "") {
      return (
        <div className="flex flex-col items-center justify-center bg-gray-50">
          <div className="text-gray-500">
            <p>We analyzed <b>{fileName}</b> and detected a role for which applicant is applied for:</p>
            <p className="text-2xl font-semibold text-indigo-600">{prediction}</p>
          </div>
          <Card className="w-96 text-center">
            <CardHeader><CardTitle>Prediction Result</CardTitle></CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{prediction}</p>
            </CardContent>
          </Card>
        </div>
      )
    }
  }

  return (
    <div className=" text-center bg-zinc-50 font-sans">
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
        onChange={onFileChange} />
      {fileDetails()}
      {showLoading()}
      {renderPrediction()}
      {fileUrl && (
        <iframe
          src={fileUrl}
          width="100%"
          height="600px"
          className="mt-6 rounded-lg border"
        />)
      }
    </div>

  );
}