import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { loadPostings } from "@/data/loads";
import { LoadDetails } from "@/components/LoadDetails";
import { Button } from "@/components/ui/button";
import { generateLoadPostingJsonLd } from "@/lib/jsonld";

interface LoadPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: LoadPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const load = loadPostings.find((l) => l.id === resolvedParams.id);
  
  if (!load) {
    return {
      title: "Load Not Found - StrongSolo Demo",
      description: "The requested load could not be found.",
    };
  }

  return {
    title: `${load.equipment} Load: ${load.origin} to ${load.destination} - StrongSolo Demo`,
    description: `${load.equipment} freight load from ${load.origin} to ${load.destination}. Rate: $${load.rateUsd}. Weight: ${load.weightLbs} lbs. Broker: ${load.broker.name}.`,
    openGraph: {
      title: `${load.equipment} Load: ${load.origin} to ${load.destination}`,
      description: `Rate: $${load.rateUsd} | Weight: ${load.weightLbs} lbs | Broker: ${load.broker.name}`,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return loadPostings.map((load) => ({
    id: load.id,
  }));
}

export default async function LoadPage({ params }: LoadPageProps) {
  const resolvedParams = await params;
  console.info(`Route hit: /load/${resolvedParams.id} (load detail page)`);
  
  const load = loadPostings.find((l) => l.id === resolvedParams.id);

  if (!load) {
    notFound();
  }

  const jsonLd = generateLoadPostingJsonLd(load);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/board" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Load Board
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <LoadDetails load={load} />
        </div>
      </div>
    </>
  );
}