const KEY = "hivenet:interested";
export function getInterested() {
if (typeof window === "undefined") return [];
try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function isInterested(id) {
return getInterested().some((e) => String(e.id) === String(id));
}
export function toggleInterested(eventObj) {
if (typeof window === "undefined") return [];
const list = getInterested();
const idx = list.findIndex((e) => String(e.id) === String(eventObj.id));
if (idx >= 0) {
list.splice(idx, 1);
} else {
list.push(eventObj);
}
localStorage.setItem(KEY, JSON.stringify(list));
return list;
}