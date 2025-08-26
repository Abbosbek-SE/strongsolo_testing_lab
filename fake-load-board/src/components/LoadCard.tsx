import Link from "next/link";
import { Truck, Calendar } from "lucide-react";
import type { LoadPosting } from "@/data/loads";
import { formatMoney, formatDate, formatWeight } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LoadCardProps {
  load: LoadPosting;
  className?: string;
}

export function LoadCard({ load, className }: LoadCardProps) {
  return (
    <article
      className={cn(
        "posting rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:ring-2 hover:ring-slate-900/5",
        className
      )}
      data-source="dummy"
    >
      <Link
        href={`/load/${load.id}`}
        className="block space-y-4 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 rounded-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-slate-600" />
              <Badge variant="secondary">{load.equipment}</Badge>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold">
                <span className="sr-only">Origin:</span>
                {load.origin}
              </div>
              <div className="text-lg font-semibold text-slate-600">
                <span className="sr-only">Destination:</span>
                → {load.destination}
              </div>
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="text-2xl font-bold text-green-600">
              <span className="sr-only">Rate:</span>
              {formatMoney(load.rateUsd)}
            </div>
            <div className="text-sm text-slate-500">
              <span className="sr-only">Weight:</span>
              {formatWeight(load.weightLbs)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              <span className="sr-only">Pickup:</span>
              Pickup: {formatDate(load.pickupDate)}
            </span>
          </div>
          <div>
            <span className="sr-only">Broker Name:</span>
            {load.broker.name}
          </div>
        </div>

        {load.notes && (
          <div className="text-sm text-slate-500 border-t pt-3 mt-3">
            <strong>Notes:</strong> {load.notes}
          </div>
        )}
      </Link>
    </article>
  );
}