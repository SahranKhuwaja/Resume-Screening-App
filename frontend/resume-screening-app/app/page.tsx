import { IconGitBranch } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Resume Screening App
      </h2>
      <Button variant="outline" size="sm">
        <IconGitBranch /> New Branch
      </Button>
    </div>
  );
}
