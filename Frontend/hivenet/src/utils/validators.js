// Simple validators used by AuthContext

export function isAustEmail(email) {
  const s = String(email || "").trim().toLowerCase();
  // allow aust.edu or student.aust.edu
  return /^[^@\s]+@(?:aust\.edu|student\.aust\.edu)$/.test(s);
}
