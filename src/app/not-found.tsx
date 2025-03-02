import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="fade-in flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="flex flex-col items-center justify-center gap-0">
          <div className="flex justify-center">
            <AlertTriangle className="size-24 animate-pulse text-amber-500" />
          </div>
          {/* Error code */}
          <h1 className="text-7xl font-bold md:text-9xl">404</h1>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold md:text-3xl">Page Not Found</h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Back to home button */}
        <Button asChild size={"lg"}>
          <Link href="/">
            <ArrowLeft size={20} />
            <span className="font-bold -tracking-wider">Back to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
