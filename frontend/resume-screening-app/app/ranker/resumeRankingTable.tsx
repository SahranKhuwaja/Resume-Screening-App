"use client";

import {
  Card,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Medal, Trophy, Award, FileText } from "lucide-react"

 export default function resumeRankingTable({resumes} : any){
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
  
  const CircularProgress = ({ score }: { score: number }) => {
    const percentage = score * 100
    const radius = 24
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    const getStrokeColor = (score: number) => {
      if (score >= 0.9) return "#0000FF" 
      if (score >= 0.8) return "#228B22" 
      if (score >= 0.7) return "#FFA500" 
      if(score >= 0.6) return "#FFFF00"
      return "#FF0000"
    }

    const getTextColor = (score: number) => {
      if (score >= 0.9) return "text-blue-600 dark:text-blue-400"
      if (score >= 0.8) return "text-green-800 dark:text-green-600"
      if (score >= 0.7) return "text-orange-600 dark:text-orange-400"
      if(score >= 0.6) return "text-yellow-400 dark:text-yellow-300"
      return "text-red-800 dark:text-red-600"
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
    return (
      <Card className="overflow-hidden m-20 mt-5">
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
                const icon = getRankIcon(i + 1)

                return (
                  <TableRow key={i + 1} className="group hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {icon ? (
                          <div className="flex items-center gap-2">
                            {icon}
                            <Badge variant={getRankBadgeVariant(i + 1)} className="font-semibold">
                              #{i + 1}
                            </Badge>
                          </div>
                        ) : (
                          <Badge variant="outline" className="font-medium">
                            #{i + 1}
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