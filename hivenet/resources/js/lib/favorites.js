const KEY = "hivenet:favorites";
export function getFavorites() {
if (typeof window === "undefined") return [];
try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function isFavorite(id) {
return getFavorites().some((e) => String(e.id) === String(id));
}
export function toggleFavorite(eventObj) {
if (typeof window === "undefined") return [];
const list = getFavorites();
const idx = list.findIndex((e) => String(e.id) === String(eventObj.id));
if (idx >= 0) {
list.splice(idx, 1);
} else {
list.push(eventObj);
}
localStorage.setItem(KEY, JSON.stringify(list));
return list;
}