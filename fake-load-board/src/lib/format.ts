/**
 * Format currency as USD with no locale surprises
 */
export function formatMoney(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

/**
 * Format weight with lbs suffix
 */
export function formatWeight(weightLbs: number): string {
  return `${weightLbs.toLocaleString("en-US")} lbs`;
}

/**
 * Format date as readable string (MM/DD/YYYY)
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US");
}

/**
 * Format distance with miles suffix
 */
export function formatDistance(miles: number): string {
  return `${miles.toLocaleString("en-US")} miles`;
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, "");
  
  // Format as (XXX) XXX-XXXX if 10 digits
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  // Return as-is if not 10 digits
  return phone;
}