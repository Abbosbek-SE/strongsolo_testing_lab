import { Truck, Calendar, DollarSign, MapPin, Phone, Mail } from "lucide-react";
import type { LoadPosting } from "@/data/loads";
import { formatMoney, formatDate, formatWeight, formatDistance, formatPhoneNumber } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

interface LoadDetailsProps {
  load: LoadPosting;
}

export function LoadDetails({ load }: LoadDetailsProps) {
  return (
    <article
      className="posting space-y-8"
      data-source="dummy"
    >
      <div className="border-b pb-6">
        <div className="flex items-start justify-between gap-6 mb-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-slate-600" />
              <Badge variant="secondary" className="text-sm">
                {load.equipment}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold">
              {load.origin} → {load.destination}
            </h1>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {formatMoney(load.rateUsd)}
            </div>
            <div className="text-slate-500">Load Rate</div>
          </div>
        </div>
      </div>

      <dl className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <dt className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
              <MapPin className="h-4 w-4" />
              Origin
            </dt>
            <dd className="text-lg font-medium">{load.origin}</dd>
          </div>
          
          <div>
            <dt className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
              <MapPin className="h-4 w-4" />
              Destination  
            </dt>
            <dd className="text-lg font-medium">{load.destination}</dd>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <dt className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
              <Calendar className="h-4 w-4" />
              Pickup
            </dt>
            <dd className="text-lg">{formatDate(load.pickupDate)}</dd>
          </div>
          
          <div>
            <dt className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
              <Calendar className="h-4 w-4" />
              Delivery
            </dt>
            <dd className="text-lg">{formatDate(load.deliveryDate)}</dd>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold text-slate-600 mb-2">Equipment</dt>
            <dd className="text-lg">{load.equipment}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-semibold text-slate-600 mb-2">Weight</dt>
            <dd className="text-lg">{formatWeight(load.weightLbs)}</dd>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <dt className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
              <DollarSign className="h-4 w-4" />
              Rate
            </dt>
            <dd className="text-lg font-semibold text-green-600">{formatMoney(load.rateUsd)}</dd>
          </div>
          
          {load.distanceMiles && (
            <div>
              <dt className="text-sm font-semibold text-slate-600 mb-2">Distance</dt>
              <dd className="text-lg">{formatDistance(load.distanceMiles)}</dd>
            </div>
          )}
        </div>

        {load.reference && (
          <div>
            <dt className="text-sm font-semibold text-slate-600 mb-2">Reference</dt>
            <dd className="text-lg font-mono">{load.reference}</dd>
          </div>
        )}

        <div className="border-t pt-6">
          <dt className="text-lg font-semibold text-slate-900 mb-4">Broker Information</dt>
          <dd className="space-y-3">
            <div>
              <span className="text-sm font-semibold text-slate-600">Broker Name</span>
              <div className="text-lg">{load.broker.name}</div>
            </div>
            
            {load.broker.phone && (
              <div>
                <span className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Broker Phone
                </span>
                <div className="text-lg">
                  <a 
                    href={`tel:${load.broker.phone}`}
                    className="hover:underline text-blue-600"
                  >
                    {formatPhoneNumber(load.broker.phone)}
                  </a>
                </div>
              </div>
            )}
            
            {load.broker.email && (
              <div>
                <span className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Broker Email
                </span>
                <div className="text-lg">
                  <a 
                    href={`mailto:${load.broker.email}`}
                    className="hover:underline text-blue-600"
                  >
                    {load.broker.email}
                  </a>
                </div>
              </div>
            )}
            
            {load.broker.mcNumber && (
              <div>
                <span className="text-sm font-semibold text-slate-600">MC Number</span>
                <div className="text-lg font-mono">{load.broker.mcNumber}</div>
              </div>
            )}
          </dd>
        </div>

        {load.notes && (
          <div className="border-t pt-6">
            <dt className="text-sm font-semibold text-slate-600 mb-2">Notes</dt>
            <dd className="text-lg bg-slate-50 p-4 rounded-lg">{load.notes}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}