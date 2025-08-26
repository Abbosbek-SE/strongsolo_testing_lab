export type Equipment = "Dry Van" | "Reefer" | "Flatbed" | "Step Deck" | "Power Only";

export interface LoadPosting {
  id: string;
  origin: string; // "City, ST"
  destination: string; // "City, ST"
  pickupDate: string; // ISO date
  deliveryDate: string; // ISO date
  equipment: Equipment;
  weightLbs: number;
  rateUsd: number; // flat rate
  distanceMiles?: number;
  reference?: string;
  broker: {
    name: string;
    phone?: string;
    email?: string;
    mcNumber?: string;
  };
  notes?: string;
}

export const loadPostings: LoadPosting[] = [
  {
    id: "LOAD-2025-001",
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ",
    pickupDate: "2025-08-28",
    deliveryDate: "2025-08-29",
    equipment: "Dry Van",
    weightLbs: 28500,
    rateUsd: 1850,
    distanceMiles: 370,
    reference: "LAX-PHX-0828",
    broker: {
      name: "Pacific Logistics",
      phone: "(555) 123-4567",
      email: "dispatch@pacificlogistics.com",
      mcNumber: "MC-789456",
    },
    notes: "Pickup available 8AM-5PM. No weekend delivery.",
  },
  {
    id: "LOAD-2025-002",
    origin: "Chicago, IL",
    destination: "Atlanta, GA",
    pickupDate: "2025-08-29",
    deliveryDate: "2025-08-31",
    equipment: "Reefer",
    weightLbs: 43200,
    rateUsd: 3200,
    distanceMiles: 716,
    reference: "CHI-ATL-FOOD",
    broker: {
      name: "Midwest Cold Chain",
      phone: "(312) 987-6543",
      email: "reefer@mwcoldchain.com",
      mcNumber: "MC-456789",
    },
    notes: "Temperature controlled: 34-38°F. Food grade trailer required.",
  },
  {
    id: "LOAD-2025-003",
    origin: "Houston, TX",
    destination: "Denver, CO",
    pickupDate: "2025-08-30",
    deliveryDate: "2025-09-01",
    equipment: "Flatbed",
    weightLbs: 47800,
    rateUsd: 4100,
    distanceMiles: 879,
    reference: "HOU-DEN-STEEL",
    broker: {
      name: "Lone Star Freight",
      phone: "(713) 555-0123",
      email: "flatbed@lonestarfreight.com",
      mcNumber: "MC-123987",
    },
    notes: "Steel coils - tarps and chains required. Must secure per DOT regulations.",
  },
  {
    id: "LOAD-2025-004",
    origin: "Miami, FL",
    destination: "Nashville, TN",
    pickupDate: "2025-08-27",
    deliveryDate: "2025-08-28",
    equipment: "Dry Van",
    weightLbs: 31200,
    rateUsd: 2400,
    distanceMiles: 662,
    reference: "MIA-NASH-EXPRESS",
    broker: {
      name: "Southeast Express",
      phone: "(305) 444-7890",
      email: "loads@seexpress.com",
      mcNumber: "MC-654321",
    },
    notes: "Rush delivery - pickup ASAP. Consignee available 24/7.",
  },
  {
    id: "LOAD-2025-005",
    origin: "Portland, OR",
    destination: "Las Vegas, NV",
    pickupDate: "2025-09-02",
    deliveryDate: "2025-09-03",
    equipment: "Step Deck",
    weightLbs: 52000,
    rateUsd: 3800,
    reference: "PDX-LAS-MACHINERY",
    broker: {
      name: "Western Heavy Haul",
      phone: "(503) 789-0123",
      email: "stepdeck@westernheavy.com",
      mcNumber: "MC-987654",
    },
    notes: "Oversized machinery - permits required. Height: 11'6\". Must call for routing.",
  },
  {
    id: "LOAD-2025-006",
    origin: "Boston, MA",
    destination: "Baltimore, MD",
    pickupDate: "2025-08-31",
    deliveryDate: "2025-09-01",
    equipment: "Dry Van",
    weightLbs: 26800,
    rateUsd: 1650,
    distanceMiles: 406,
    reference: "BOS-BWI-0831",
    broker: {
      name: "Northeast Logistics",
      phone: "(617) 333-2222",
      email: "dispatch@northeastlog.com",
      mcNumber: "MC-111222",
    },
  },
  {
    id: "LOAD-2025-007",
    origin: "Dallas, TX",
    destination: "Kansas City, MO",
    pickupDate: "2025-09-01",
    deliveryDate: "2025-09-02",
    equipment: "Reefer",
    weightLbs: 38900,
    rateUsd: 2850,
    distanceMiles: 542,
    reference: "DFW-KC-PRODUCE",
    broker: {
      name: "Central Plains Logistics",
      phone: "(214) 567-8901",
      email: "reefer@centralplains.com",
      mcNumber: "MC-333444",
    },
    notes: "Fresh produce - maintain 32°F. No delays accepted.",
  },
  {
    id: "LOAD-2025-008",
    origin: "Seattle, WA",
    destination: "San Diego, CA",
    pickupDate: "2025-09-03",
    deliveryDate: "2025-09-05",
    equipment: "Power Only",
    weightLbs: 0,
    rateUsd: 2200,
    distanceMiles: 1255,
    reference: "SEA-SD-TRAILER",
    broker: {
      name: "West Coast Power",
      phone: "(206) 888-9999",
      email: "power@westcoastpower.com",
      mcNumber: "MC-555666",
    },
    notes: "Power only - customer trailer. Pickup loaded trailer at shipper dock 15.",
  },
  {
    id: "LOAD-2025-009",
    origin: "Detroit, MI",
    destination: "Buffalo, NY",
    pickupDate: "2025-08-29",
    deliveryDate: "2025-08-30",
    equipment: "Flatbed",
    weightLbs: 42300,
    rateUsd: 2900,
    distanceMiles: 252,
    reference: "DET-BUF-AUTO",
    broker: {
      name: "Great Lakes Freight",
      phone: "(313) 222-1111",
      email: "flatbed@greatlakesfreight.com",
      mcNumber: "MC-777888",
    },
    notes: "Auto parts - fragile. Secure with care. No weekend pickup available.",
  },
  {
    id: "LOAD-2025-010",
    origin: "Memphis, TN",
    destination: "Jacksonville, FL",
    pickupDate: "2025-09-04",
    deliveryDate: "2025-09-06",
    equipment: "Dry Van",
    weightLbs: 33500,
    rateUsd: 2750,
    distanceMiles: 599,
    reference: "MEM-JAX-0904",
    broker: {
      name: "Southern Transport Solutions",
      phone: "(901) 444-3333",
      email: "dispatch@southerntransport.com",
      mcNumber: "MC-999000",
    },
    notes: "Standard dry goods. Appointment required for delivery - call 24hrs ahead.",
  },
];