// =====================================================
// AUST HiveNet — Demo API (LocalStorage-based, plain ES)
// =====================================================

// Keys
const CLUBS_KEY = "hivenet_seed_clubs_v1";
const MEMBERSHIP_KEY = (uid) => "hivenet_membership_" + uid;
const CHAT_KEY = (clubId) => "hivenet_chat_" + clubId;
const EVENTS_KEY = "hivenet_seed_events_v1";
const PARTICIPATION_KEY = (uid) => "hivenet_participation_" + uid;
const ATTEND_KEY = (eventId) => "hivenet_attendance_" + eventId;
const USERS_KEY = "hivenet_users_v1";

// Forum
const POSTS_KEY = "hivenet_forum_posts_v1";
const COMMENTS_KEY = (pid) => "hivenet_forum_comments_" + pid;

// Utils
function uuid(){ return (crypto?.randomUUID ? crypto.randomUUID() : `u_${Date.now()}_${Math.random().toString(36).slice(2)}`); }
function jget(k,f){ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):f; }catch{ return f; } }
function jset(k,v){ localStorage.setItem(k, JSON.stringify(v)); }

// Seeds
const seedClubs = [
  { id:1, name:"AUSTIDC", tagline:"Competitive Programming", about:"ICPC, contests, problem solving.", location:"CSE Block" },
  { id:2, name:"CSE Society", tagline:"Tech & Talks", about:"Tech talks, seminars, mentorship.", location:"Auditorium" },
  { id:3, name:"Robotics Club", tagline:"Bots & Automation", about:"Robotics meetups and demos.", location:"ECE Lab" },
  { id:4, name:"Design Club", tagline:"UI/UX & Graphics", about:"Design systems, workshops.", location:"Studio 2" },
  { id:5, name:"Cultural Club", tagline:"Events & Music", about:"Cultural programs & music.", location:"Open Stage" },
];
const seedEvents = [
  { id:1, title:"Hackathon Kickoff", club:"CSE Society", date:"2025-09-05", time:"10:00", location:"Auditorium" },
  { id:2, title:"UI/UX Workshop", club:"Design Club", date:"2025-09-10", time:"14:00", location:"Lab 3" },
  { id:3, title:"Intro to Competitive Programming", club:"AUSTIDC", date:"2025-09-02", time:"15:00", location:"CSE 402" },
];

function ensureClubs(){ if(!localStorage.getItem(CLUBS_KEY)) jset(CLUBS_KEY, seedClubs); }
function ensureEvents(){ if(!localStorage.getItem(EVENTS_KEY)) jset(EVENTS_KEY, seedEvents); }
function ensureUsers(){ if(!localStorage.getItem(USERS_KEY)) jset(USERS_KEY, []); }
function ensurePosts(){
  if(!localStorage.getItem(POSTS_KEY)){
    const now = Date.now();
    const demo = [
      { id:1, title:"How to start CP at AUST?", body:"Share resources & weekly meetups please.", club:"AUSTIDC", authorId:"u_demo1", authorName:"Arif Hasan", ts: now-86400000, likes:[], commentsCount:1 },
      { id:2, title:"Looking for UI/UX teammates", body:"Design Club workshop team forming.", club:"Design Club", authorId:"u_demo2", authorName:"Sadia N.", ts: now-3600000, likes:[], commentsCount:0 },
    ];
    jset(POSTS_KEY, demo);
    jset(COMMENTS_KEY(1), [
      { id: uuid(), authorId:"u_demo3", authorName:"Nabil", text:"Check cp-algorithms + codeforces.", ts: now-7200000 }
    ]);
  }
}

function readClubs(){ ensureClubs(); return jget(CLUBS_KEY, []); }
function writeClubs(a){ jset(CLUBS_KEY, a); }
function readEvents(){ ensureEvents(); return jget(EVENTS_KEY, []); }
function writeEvents(a){ jset(EVENTS_KEY, a); }
function readUsers(){ ensureUsers(); return jget(USERS_KEY, []); }
function writeUsers(a){ jset(USERS_KEY, a); }
function readPosts(){ ensurePosts(); return jget(POSTS_KEY, []); }
function writePosts(a){ jset(POSTS_KEY, a); }
function readComments(pid){ ensurePosts(); return jget(COMMENTS_KEY(pid), []); }
function writeComments(pid, a){ jset(COMMENTS_KEY(pid), a); }

// USERS (Auth + Admin)
export function listUsers(){ return readUsers(); }
export function findUserByEmail(email){
  const e = String(email||"").trim().toLowerCase();
  const arr = readUsers();
  for(let i=0;i<arr.length;i++){ if(String(arr[i].email||"").toLowerCase()===e) return arr[i]; }
  return null;
}
export function registerUser(profile){
  const arr = readUsers();
  const e = String(profile.email||"").toLowerCase();
  let found = false;
  for(let i=0;i<arr.length;i++){
    if(String(arr[i].email||"").toLowerCase()===e){ arr[i] = Object.assign({}, arr[i], profile); found=true; break; }
  }
  if(!found) arr.push(profile);
  writeUsers(arr);
  return profile;
}
export function updateUserRole(userId, role){
  const arr = readUsers();
  for(let i=0;i<arr.length;i++){ if(arr[i].id===userId){ arr[i].role = role; break; } }
  writeUsers(arr);
  for(let i=0;i<arr.length;i++) if(arr[i].id===userId) return arr[i];
  return null;
}
export function deleteUser(userId){
  writeUsers(readUsers().filter(u=>u.id!==userId));
  return true;
}

// CLUBS
export function listClubs(userId){
  const clubs = readClubs();
  const joined = new Set(readMembership(userId));
  return clubs.map(c => Object.assign({}, c, { joined: joined.has(c.id) }));
}
export function adminListClubs(){ return readClubs(); }
export function getClub(clubId, userId){
  const id = Number(clubId);
  const c = readClubs().find(x=>x.id===id);
  if(!c) return null;
  const joined = readMembership(userId).includes(id);
  return Object.assign({}, c, { joined });
}
export function createClub(data){
  const arr = readClubs();
  const id = Math.max(0, ...arr.map(x=>x.id)) + 1;
  const row = Object.assign({ id, name:"", tagline:"", about:"", location:"" }, data||{});
  arr.push(row); writeClubs(arr); return row;
}
export function updateClub(id, updates){
  const nid = Number(id);
  const arr = readClubs().map(c=> c.id===nid ? Object.assign({}, c, updates||{}) : c);
  writeClubs(arr);
  return arr.find(c=>c.id===nid) || null;
}
export function deleteClub(id){
  const nid = Number(id);
  writeClubs(readClubs().filter(c=>c.id!==nid));
  return true;
}

// Membership
function readMembership(uid){ if(!uid) return []; return jget(MEMBERSHIP_KEY(uid), []); }
function writeMembership(uid, arr){ if(!uid) return; jset(MEMBERSHIP_KEY(uid), arr||[]); }
export function joinClub(uid, cid){
  const set = new Set(readMembership(uid)); set.add(Number(cid));
  const out = Array.from(set); writeMembership(uid, out); return out;
}
export function leaveClub(uid, cid){
  const set = new Set(readMembership(uid)); set.delete(Number(cid));
  const out = Array.from(set); writeMembership(uid, out); return out;
}
export function listClubMembers(){
  return [
    { id:"u1", name:"Arif Hasan" },
    { id:"u2", name:"Sadia N." },
    { id:"u3", name:"Nabil Karim" },
    { id:"u4", name:"Tanisha R." },
  ];
}

// Chat (per club) - demo
function ensureChat(clubId){
  const key = CHAT_KEY(clubId);
  if(!localStorage.getItem(key)){
    jset(key, [{ id: uuid(), userId:"bot", name:"Club Bot", text:"Welcome to the club chat!", ts: Date.now()-3600000 }]);
  }
}
export function getChat(clubId){ ensureChat(clubId); return jget(CHAT_KEY(clubId), []); }
export function sendChatMessage(user, clubId, text){
  const row = { id: uuid(), userId: user.id, name: user.name || "You", text: String(text||""), ts: Date.now() };
  const list = getChat(clubId); list.push(row); jset(CHAT_KEY(clubId), list); return row;
}

// Events + Participation
export function listEvents(){ return readEvents(); }
export function getEvent(eventId){ const id=Number(eventId); return readEvents().find(e=>e.id===id) || null; }
export function createEvent(data){
  const arr = readEvents();
  const id = Math.max(0, ...arr.map(e=>e.id)) + 1;
  const row = Object.assign({ id, title:"", club:"", date:"", time:"", location:"" }, data||{});
  arr.push(row); writeEvents(arr); return row;
}
export function updateEvent(id, updates){
  const nid = Number(id);
  const arr = readEvents().map(e=> e.id===nid ? Object.assign({}, e, updates||{}) : e);
  writeEvents(arr);
  return arr.find(e=>e.id===nid) || null;
}
export function deleteEvent(id){
  const nid = Number(id);
  writeEvents(readEvents().filter(e=>e.id!==nid)); return true;
}

// Participation
function readParticipation(uid){ return jget(PARTICIPATION_KEY(uid), []); }
function writeParticipation(uid, arr){ jset(PARTICIPATION_KEY(uid), arr||[]); }
export function attendEvent(uid, eventId){
  const set = new Set(readParticipation(uid)); set.add(Number(eventId));
  const out = Array.from(set); writeParticipation(uid, out); return out;
}
export function listMyEvents(uid){
  const ids = readParticipation(uid); const all = readEvents();
  return ids.map(id => all.find(e=>e?.id===id) || { id, title:"(Unknown Event)", club:"", date:"", time:"", location:"" });
}

// Attendance + Check-in
function readAttendance(eventId){ return jget(ATTEND_KEY(eventId), []); }
function writeAttendance(eventId, arr){ jset(ATTEND_KEY(eventId), arr||[]); }
export function listAttendance(eventId){ return readAttendance(eventId); }
export function markAttendance(eventId, who){
  const arr = readAttendance(eventId);
  if (!arr.some(x=>x.who===who)) {
    arr.push({ id: uuid(), who: String(who||""), at: Date.now() });
    writeAttendance(eventId, arr);
  }
  return arr;
}
export function eventCheckinCode(eventId){
  const s = String(eventId); const pad = "0000"; const code = pad.slice(Math.min(pad.length, s.length)) + s;
  return "EVT-" + code;
}

// ======================================
// FORUM (Step-10)
// ======================================
export function listPosts(){
  const rows = readPosts().slice();
  rows.sort((a,b)=> b.ts - a.ts);
  return rows;
}
export function createPost(args){
  const posts = readPosts();
  const id = Math.max(0, ...posts.map(p=>p.id)) + 1;
  const row = {
    id,
    authorId: args?.authorId || "",
    authorName: args?.authorName || "Anonymous",
    title: String(args?.title || ""),
    body: String(args?.body || ""),
    club: String(args?.club || ""),
    ts: Date.now(),
    likes: [],
    commentsCount: 0
  };
  posts.push(row); writePosts(posts); return row;
}
export function getPost(id){
  const pid = Number(id);
  const posts = readPosts();
  for(let i=0;i<posts.length;i++) if(posts[i].id===pid) return posts[i];
  return null;
}
export function deletePost(id){
  const pid = Number(id);
  writePosts(readPosts().filter(p=>p.id!==pid));
  localStorage.removeItem(COMMENTS_KEY(pid));
  return true;
}
export function likePost(id, userId){
  const pid = Number(id);
  const posts = readPosts();
  for(let i=0;i<posts.length;i++){
    if(posts[i].id===pid){
      const likes = Array.isArray(posts[i].likes) ? posts[i].likes.slice() : [];
      const idx = likes.indexOf(userId);
      if(idx>=0){ posts[i].likes = likes.filter(x=>x!==userId); }
      else { likes.push(userId); posts[i].likes = likes; }
      writePosts(posts);
      return posts[i];
    }
  }
  return null;
}
export function listComments(postId){
  const arr = readComments(postId).slice();
  arr.sort((a,b)=> a.ts - b.ts);
  return arr;
}
export function addComment(postId, args){
  const arr = readComments(postId);
  const row = {
    id: uuid(),
    authorId: args?.authorId || "",
    authorName: args?.authorName || "Anon",
    text: String(args?.text || ""),
    ts: Date.now()
  };
  arr.push(row); writeComments(postId, arr);
  const posts = readPosts();
  const pid = Number(postId);
  for(let i=0;i<posts.length;i++) if(posts[i].id===pid){ posts[i].commentsCount = (posts[i].commentsCount||0)+1; break; }
  writePosts(posts);
  return row;
}
export function deleteComment(postId, commentId){
  const arr = readComments(postId).filter(c=>c.id!==commentId);
  writeComments(postId, arr);
  const posts = readPosts();
  const pid = Number(postId);
  for(let i=0;i<posts.length;i++) if(posts[i].id===pid && posts[i].commentsCount>0){ posts[i].commentsCount -= 1; break; }
  writePosts(posts);
  return true;
}
