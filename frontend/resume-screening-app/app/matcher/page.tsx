"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconUpload } from "@tabler/icons-react"
import axios from "axios";
import { ReactNode, useEffect, useRef, useState } from "react";
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
import { Medal, Trophy, Award, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

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

  useEffect(()=>{
    if(jobDescription!=="" && files.length > 0){
       handleHttpRequest()
    }
  },[jobDescription, files])

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

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-amber-500" />
      case 2:
        return <Medal className="h-5 w-5 text-slate-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-700" />
      default:
        return null
    }
  }

  const getRankBadgeVariant = (rank: number): "default" | "secondary" | "outline" => {
    if (rank <= 3) return "default"
    return "secondary"
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return "text-emerald-600 dark:text-emerald-400"
    if (score >= 0.8) return "text-blue-600 dark:text-blue-400"
    if (score >= 0.7) return "text-amber-600 dark:text-amber-400"
    return "text-muted-foreground"
  }

  const getProgressColor = (score: number) => {
    if (score >= 0.9) return "bg-emerald-500"
    if (score >= 0.8) return "bg-blue-500"
    if (score >= 0.7) return "bg-amber-500"
    return "bg-muted"
  }

  const CircularProgress = ({ score }: { score: number }) => {
    const percentage = score * 100
    const radius = 24
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    const getStrokeColor = (score: number) => {
      if (score >= 0.9) return "#10b981" // emerald-500
      if (score >= 0.8) return "#3b82f6" // blue-500
      if (score >= 0.7) return "#f59e0b" // amber-500
      return "#9ca3af" // gray-400
    }

    const getTextColor = (score: number) => {
      if (score >= 0.9) return "text-emerald-600 dark:text-emerald-400"
      if (score >= 0.8) return "text-blue-600 dark:text-blue-400"
      if (score >= 0.7) return "text-amber-600 dark:text-amber-400"
      return "text-muted-foreground"
    }

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg className="transform -rotate-90" width="64" height="64">
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-muted/20"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke={getStrokeColor(score)}
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-bold tabular-nums ${getTextColor(score)}`}>{Math.round(percentage)}%</span>
        </div>
      </div>
    )
  }

  const resumeRankingTable = () => {
    return (
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-24 font-semibold">Rank</TableHead>
                <TableHead className="font-semibold">File Name</TableHead>
                <TableHead className="w-48 text-right font-semibold">Similarity Score</TableHead>
                <TableHead className="w-32 text-right font-semibold">Match</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resumes.map((resume: any, i: number) => {
                const scorePercentage = Math.round(resume.similarity_score * 100)
                const icon = getRankIcon(resume.rank)

                return (
                  <TableRow key={resume.rank} className="group hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {icon ? (
                          <div className="flex items-center gap-2">
                            {icon}
                            <Badge variant={getRankBadgeVariant(i + 1)} className="font-semibold">
                              #{resume.rank}
                            </Badge>
                          </div>
                        ) : (
                          <Badge variant="outline" className="font-medium">
                            #{resume.rank}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{resume.file_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-3">
                        <CircularProgress score={resume.similarity_score} />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="font-semibold tabular-nums">
                        {scorePercentage}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    )
  }

  return (
    <div className=" text-center bg-zinc-50 font-sans">
      <h2 className="scroll-m-20 mb-4 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Similarity Score Calculator
      </h2>
      <div className="grid gap-3 ml-15 mb-5 mt-5 mr-15">
        <Label htmlFor="message">Job Description</Label>
        <Textarea placeholder="Enter job description here" id="message" onChange={e => setJobDescription(e.target.value)} />
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
      {resumes.length > 0 && resumeRankingTable()}
    </div>

  );
}
