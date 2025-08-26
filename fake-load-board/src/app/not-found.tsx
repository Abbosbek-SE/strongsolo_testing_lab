import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="text-center space-y-6 py-16">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-slate-900">404 - Page Not Found</h1>
        <p className="text-xl text-slate-600">
          The load or page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-4">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/board">Browse Loads</Link>
        </Button>
      </div>
    </div>
  );
}