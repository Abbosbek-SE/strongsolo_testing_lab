import type { LoadPosting, Equipment } from "@/data/loads";

/**
 * Filter loads by equipment type
 */
export function filterByEquipment(
  loads: LoadPosting[],
  equipment?: Equipment
): LoadPosting[] {
  if (!equipment) return loads;
  return loads.filter((load) => load.equipment === equipment);
}

/**
 * Filter loads by origin (case-insensitive partial match)
 */
export function filterByOrigin(
  loads: LoadPosting[],
  origin?: string
): LoadPosting[] {
  if (!origin) return loads;
  const searchTerm = origin.toLowerCase();
  return loads.filter((load) =>
    load.origin.toLowerCase().includes(searchTerm)
  );
}

/**
 * Filter loads by destination (case-insensitive partial match)
 */
export function filterByDestination(
  loads: LoadPosting[],
  destination?: string
): LoadPosting[] {
  if (!destination) return loads;
  const searchTerm = destination.toLowerCase();
  return loads.filter((load) =>
    load.destination.toLowerCase().includes(searchTerm)
  );
}

/**
 * Apply all filters to loads
 */
export function searchLoads(
  loads: LoadPosting[],
  filters: {
    equipment?: Equipment;
    origin?: string;
    destination?: string;
  }
): LoadPosting[] {
  let filtered = loads;
  
  if (filters.equipment) {
    filtered = filterByEquipment(filtered, filters.equipment);
  }
  
  if (filters.origin) {
    filtered = filterByOrigin(filtered, filters.origin);
  }
  
  if (filters.destination) {
    filtered = filterByDestination(filtered, filters.destination);
  }
  
  return filtered;
}

/**
 * Paginate results
 */
export function paginateResults<T>(
  items: T[],
  page: number,
  limit: number
): {
  items: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
} {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    totalPages,
    currentPage: page,
    totalItems,
  };
}