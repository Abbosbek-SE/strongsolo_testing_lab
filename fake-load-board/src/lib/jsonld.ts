import type { LoadPosting } from "@/data/loads";

/**
 * Generate JSON-LD structured data for a load posting
 */
export function generateLoadPostingJsonLd(load: LoadPosting) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    identifier: load.id,
    title: `${load.equipment} Load: ${load.origin} to ${load.destination}`,
    description: `Freight load from ${load.origin} to ${load.destination}. Equipment: ${load.equipment}. Weight: ${load.weightLbs} lbs. Rate: $${load.rateUsd}${load.notes ? `. Notes: ${load.notes}` : ""}`,
    datePosted: new Date().toISOString().split("T")[0],
    validThrough: load.deliveryDate,
    employmentType: "CONTRACT",
    hiringOrganization: {
      "@type": "Organization",
      name: load.broker.name,
      ...(load.broker.phone && { telephone: load.broker.phone }),
      ...(load.broker.email && { email: load.broker.email }),
      ...(load.broker.mcNumber && { identifier: load.broker.mcNumber }),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: load.origin,
      },
    },
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: load.destination,
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: load.rateUsd,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Equipment Type",
        value: load.equipment,
      },
      {
        "@type": "PropertyValue",
        name: "Weight",
        value: `${load.weightLbs} lbs`,
      },
      {
        "@type": "PropertyValue",
        name: "Pickup Date",
        value: load.pickupDate,
      },
      {
        "@type": "PropertyValue",
        name: "Delivery Date",
        value: load.deliveryDate,
      },
      ...(load.distanceMiles
        ? [
            {
              "@type": "PropertyValue",
              name: "Distance",
              value: `${load.distanceMiles} miles`,
            },
          ]
        : []),
      ...(load.reference
        ? [
            {
              "@type": "PropertyValue",
              name: "Reference",
              value: load.reference,
            },
          ]
        : []),
    ],
  };
}