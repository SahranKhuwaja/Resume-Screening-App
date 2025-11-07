"use client";

import { IconRocket } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  const handleClick = ()=>{
    router.push('/ranker')
  }
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <h2 className="scroll-m-20 mb-4 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Resume Screening App
      </h2>
      <Button variant="outline" size="lg" onClick={handleClick}>
        Get Started <IconRocket />
      </Button>
    </div>
  );
}
