import { useState, useEffect } from "react";

const DAYS_KR = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];

const CATEGORIES = [
  { id: "work", label: "업무", color: "#E07A5F", emoji: "💼" },
  { id: "personal", label: "개인", color: "#7EB5A6", emoji: "✨" },
  { id: "study", label: "학습", color: "#E4B979", emoji: "📚" },
  { id: "health", label: "건강", color: "#6B7FA3", emoji: "💪" },
];

const PRIORITY = {
  high: { label: "높음", color: "#E07A5F", bg: "#FEF0EC" },
  medium: { label: "보통", color: "#E4B979", bg: "#FDF6E8" },
  low: { label: "낮음", color: "#7EB5A6", bg: "#EDF6F2" },
};

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y, m) { return new Date(y, m, 1).getDay(); }
function fmt(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
function parse(s) { const [y,m,d] = s.split("-").map(Number); return new Date(y,m-1,d); }

const now = new Date();

const initTasks = [
  { id: 1, text: "프로젝트 기획안 작성", cat: "work", pri: "high", done: false, date: fmt(now), time: "09:00" },
  { id: 2, text: "헬스장 운동", cat: "health", pri: "medium", done: false, date: fmt(now), time: "18:00" },
  { id: 3, text: "React 강의 수강", cat: "study", pri: "medium", done: true, date: fmt(now), time: "14:00" },
  { id: 4, text: "장보기", cat: "personal", pri: "low", done: false, date: fmt(now), time: "19:30" },
];

function Splash({ onDone }) {
  const [fade, setFade] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 1200);
    const t2 = setTimeout(onDone, 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:9999,
      background:"linear-gradient(145deg, #2D2A26 0%, #3E3A34 100%)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      opacity: fade ? 0 : 1, transition:"opacity 0.5s ease",
    }}>
      <div style={{
        width:72, height:72, borderRadius:20, background:"linear-gradient(135deg, #E07A5F, #E8956F)",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:32, boxShadow:"0 12px 40px rgba(224,122,95,0.4)",
        animation:"splashPulse 1s ease infinite",
      }}>📋</div>
      <p style={{ color:"#FDF6EC", fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, marginTop:20, letterSpacing:"-0.5px" }}>Planner</p>
      <p style={{ color:"rgba(253,246,236,0.4)", fontSize:12, marginTop:4, letterSpacing:2 }}>MY DAILY ORGANIZER</p>
      <style>{`@keyframes splashPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}`}</style>
    </div>
  );
}

function BottomNav({ tab, setTab }) {
  const tabs = [
    { id:"home", label:"홈", d:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" },
    { id:"calendar", label:"캘린더", d:"M3 6a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6z M16 2v4 M8 2v4 M3 10h18" },
    { id:"stats", label:"통계", d:"M18 20V10 M12 20V4 M6 20V14" },
    { id:"settings", label:"설정", d:"M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" },
  ];
  return (
    <nav style={{
      position:"fixed", bottom:0, left:0, right:0, zIndex:100,
      background:"rgba(255,255,255,0.88)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
      borderTop:"1px solid rgba(45,42,38,0.06)",
      display:"flex", justifyContent:"space-around", padding:"6px 0 max(env(safe-area-inset-bottom),10px)",
    }}>
      {tabs.map(t=>(
        <button key={t.id} onClick={()=>setTab(t.id)} style={{
          background:"none", border:"none", cursor:"pointer", padding:"6px 18px",
          display:"flex", flexDirection:"column", alignItems:"center", gap:3, position:"relative",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={tab===t.id?"#E07A5F":"#A09A92"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={t.d}/></svg>
          <span style={{ fontSize:10, fontWeight:tab===t.id?600:400, color:tab===t.id?"#E07A5F":"#A09A92" }}>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default function Planner() {
  const [splash, setSplash] = useState(true);
  const [tab, setTab] = useState("home");
  const [selDate, setSelDate] = useState(fmt(now));
  const [cMonth, setCMonth] = useState(now.getMonth());
  const [cYear, setCYear] = useState(now.getFullYear());
  const [tasks, setTasks] = useState(initTasks);
  const [showAdd, setShowAdd] = useState(false);
  const [newText, setNewText] = useState("");
  const [newCat, setNewCat] = useState("work");
  const [newPri, setNewPri] = useState("medium");
  const [newTime, setNewTime] = useState("09:00");
  const [nid, setNid] = useState(100);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [toast, setToast] = useState(null);
  const [userName, setUserName] = useState("사용자");
  const [theme, setTheme] = useState("warm");

  const themes = {
    warm: { bg:"linear-gradient(160deg,#FDF6EC 0%,#F5EDE0 40%,#EDE4D6 100%)", card:"rgba(255,255,255,0.65)", text:"#2D2A26", sub:"#8B857D", accent:"#E07A5F", navBg:"rgba(255,255,255,0.88)" },
    cool: { bg:"linear-gradient(160deg,#EEF2F7 0%,#E4EAF2 40%,#DAE2ED 100%)", card:"rgba(255,255,255,0.7)", text:"#1A2332", sub:"#7B8A9E", accent:"#5B8FB9", navBg:"rgba(255,255,255,0.88)" },
    dark: { bg:"linear-gradient(160deg,#1A1A1E 0%,#222226 40%,#2A2A2E 100%)", card:"rgba(255,255,255,0.07)", text:"#E8E4E0", sub:"#7A7672", accent:"#E07A5F", navBg:"rgba(30,30,34,0.92)" },
  };
  const th = themes[theme];
  const bdr = theme==="dark"?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.7)";

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null), 2000); };

  const dayTasks = tasks.filter(t=>t.date===selDate).sort((a,b)=>(a.time||"").localeCompare(b.time||""));
  const done = dayTasks.filter(t=>t.done).length;
  const total = dayTasks.length;
  const pct = total > 0 ? Math.round((done/total)*100) : 0;

  const addTask = () => {
    if (!newText.trim()) return;
    setTasks(p=>[...p,{ id:nid, text:newText.trim(), cat:newCat, pri:newPri, done:false, date:selDate, time:newTime }]);
    setNid(n=>n+1); setNewText(""); setShowAdd(false);
    showToast("할 일이 추가되었습니다 ✓");
  };
  const toggle = id => {
    const t = tasks.find(t=>t.id===id);
    setTasks(p=>p.map(t=>t.id===id?{...t,done:!t.done}:t));
    showToast(t?.done ? "다시 시작!" : "완료! 🎉");
  };
  const del = id => { setTasks(p=>p.filter(t=>t.id!==id)); showToast("삭제되었습니다"); };
  const saveEdit = id => { setTasks(p=>p.map(t=>t.id===id?{...t,text:editText}:t)); setEditId(null); };

  const prevM = () => { if(cMonth===0){setCMonth(11);setCYear(y=>y-1);}else setCMonth(m=>m-1); };
  const nextM = () => { if(cMonth===11){setCMonth(0);setCYear(y=>y+1);}else setCMonth(m=>m+1); };

  const daysInMonth = getDaysInMonth(cYear, cMonth);
  const firstDay = getFirstDay(cYear, cMonth);
  const calDays = [...Array(firstDay).fill(null), ...Array.from({length:daysInMonth},(_,i)=>i+1)];
  const selP = parse(selDate);
  const isToday = d => d===now.getDate()&&cMonth===now.getMonth()&&cYear===now.getFullYear();
  const isSel = d => d===selP.getDate()&&cMonth===selP.getMonth()&&cYear===selP.getFullYear();
  const tCount = d => tasks.filter(t=>t.date===`${cYear}-${String(cMonth+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`).length;

  const mTasks = tasks.filter(t=>{ const d=parse(t.date); return d.getMonth()===cMonth&&d.getFullYear()===cYear; });
  const weekTasks = tasks.filter(t=>{ const d=parse(t.date); const diff=(now-d)/86400000; return diff>=0&&diff<7; });

  const greeting = now.getHours()<12?"좋은 아침이에요":now.getHours()<18?"좋은 오후예요":"좋은 저녁이에요";

  if (splash) return <Splash onDone={()=>setSplash(false)} />;

  return (
    <div style={{
      minHeight:"100vh", background:th.bg, color:th.text,
      fontFamily:"'Noto Sans KR',-apple-system,BlinkMacSystemFont,sans-serif",
      paddingBottom:80, transition:"background 0.4s, color 0.4s",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"/>

      {toast && (
        <div style={{
          position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", zIndex:999,
          background:th.text, color:theme==="dark"?"#1A1A1E":"#FDF6EC",
          padding:"12px 24px", borderRadius:14, fontSize:13, fontWeight:500,
          boxShadow:"0 8px 30px rgba(0,0,0,0.15)", animation:"toastIn 0.3s ease",
        }}>{toast}</div>
      )}

      <div style={{ maxWidth:500, margin:"0 auto", padding:"24px 20px 0" }}>

        {/* ══════ HOME ══════ */}
        {tab==="home" && (
          <div style={{ animation:"pageIn 0.35s ease" }}>
            <div style={{ marginBottom:28 }}>
              <p style={{ fontSize:14, color:th.sub, margin:"0 0 2px" }}>{greeting} 👋</p>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:700, margin:0, letterSpacing:"-0.5px" }}>{userName}님의 하루</h1>
              <p style={{ fontSize:13, color:th.sub, margin:"6px 0 0" }}>{cYear}년 {MONTHS[now.getMonth()]} {now.getDate()}일 {DAYS_KR[now.getDay()]}요일</p>
            </div>

            <div style={{ background:th.card, borderRadius:22, padding:"22px 24px", backdropFilter:"blur(14px)", border:`1px solid ${bdr}`, boxShadow:"0 4px 24px rgba(0,0,0,0.04)", marginBottom:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <div>
                  <p style={{ fontSize:11, color:th.sub, margin:0, letterSpacing:1.5, fontWeight:500 }}>오늘의 진행률</p>
                  <div style={{ display:"flex", alignItems:"baseline", gap:4, marginTop:4 }}>
                    <span style={{ fontSize:40, fontWeight:700, fontFamily:"'Playfair Display',serif", lineHeight:1 }}>{pct}</span>
                    <span style={{ fontSize:16, color:th.sub, fontWeight:300 }}>%</span>
                  </div>
                </div>
                <div style={{ width:56, height:56, borderRadius:"50%", background:`conic-gradient(${th.accent} ${pct*3.6}deg, ${theme==="dark"?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)"} 0deg)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:theme==="dark"?"#222226":theme==="cool"?"#EEF2F7":"#FDF6EC", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:600 }}>{done}/{total}</div>
                </div>
              </div>
              <div style={{ height:5, borderRadius:3, background:theme==="dark"?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.05)", overflow:"hidden" }}>
                <div style={{ height:"100%", borderRadius:3, width:`${pct}%`, background:`linear-gradient(90deg,${th.accent},${th.accent}cc)`, transition:"width 0.8s cubic-bezier(0.4,0,0.2,1)" }}/>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:24 }}>
              {CATEGORIES.map(c=>{
                const ct=dayTasks.filter(t=>t.cat===c.id).length, cd=dayTasks.filter(t=>t.cat===c.id&&t.done).length;
                return (
                  <div key={c.id} style={{ background:th.card, borderRadius:16, padding:"14px 10px", textAlign:"center", backdropFilter:"blur(14px)", border:`1px solid ${bdr}` }}>
                    <div style={{ fontSize:20, marginBottom:6 }}>{c.emoji}</div>
                    <div style={{ fontSize:11, color:th.sub, fontWeight:500 }}>{c.label}</div>
                    <div style={{ fontSize:16, fontWeight:700, marginTop:2 }}>{cd}/{ct}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <h2 style={{ fontSize:17, fontWeight:600, margin:0 }}>오늘의 할 일</h2>
              <button onClick={()=>setShowAdd(true)} style={{ background:th.accent, color:"#FFF", border:"none", borderRadius:12, padding:"8px 16px", fontSize:12, fontWeight:600, cursor:"pointer" }}>+ 추가</button>
            </div>

            {dayTasks.length===0 && (
              <div style={{ textAlign:"center", padding:"48px 20px", background:th.card, borderRadius:22, border:`1px solid ${bdr}` }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🌿</div>
                <p style={{ color:th.sub, fontSize:15, margin:0, fontWeight:500 }}>오늘은 한가한 날이에요</p>
                <p style={{ color:th.sub, fontSize:12, margin:"6px 0 0", opacity:0.6 }}>위 추가 버튼으로 할 일을 만들어보세요</p>
              </div>
            )}

            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {dayTasks.map((t,i)=>{
                const cat=CATEGORIES.find(c=>c.id===t.cat); const pri=PRIORITY[t.pri];
                return (
                  <div key={t.id} style={{
                    background:th.card, borderRadius:18, padding:"16px 18px", backdropFilter:"blur(14px)", border:`1px solid ${bdr}`,
                    display:"flex", alignItems:"center", gap:14, opacity:t.done?0.5:1, transition:"all 0.3s",
                    animation:`slideUp 0.3s ease ${i*0.04}s both`, borderLeft:`3px solid ${cat?.color||"transparent"}`,
                  }}>
                    <button onClick={()=>toggle(t.id)} style={{
                      width:24, height:24, borderRadius:8, border:`2px solid ${t.done?"#7EB5A6":"rgba(128,128,128,0.2)"}`,
                      background:t.done?"#7EB5A6":"transparent", cursor:"pointer", flexShrink:0,
                      display:"flex", alignItems:"center", justifyContent:"center", color:"#FFF", fontSize:12, fontWeight:700,
                    }}>{t.done&&"✓"}</button>
                    <div style={{ flex:1, minWidth:0 }}>
                      {editId===t.id ? (
                        <input value={editText} onChange={e=>setEditText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveEdit(t.id)} onBlur={()=>saveEdit(t.id)} autoFocus
                          style={{ width:"100%", border:"none", borderBottom:`1.5px solid ${th.accent}`, background:"transparent", fontSize:14, fontWeight:500, padding:"2px 0", outline:"none", fontFamily:"inherit", color:th.text, boxSizing:"border-box" }}/>
                      ) : (
                        <p onClick={()=>{setEditId(t.id);setEditText(t.text)}} style={{ margin:0, fontSize:14, fontWeight:500, cursor:"pointer", textDecoration:t.done?"line-through":"none", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t.text}</p>
                      )}
                      <div style={{ display:"flex", gap:8, marginTop:5, alignItems:"center" }}>
                        {t.time&&<span style={{ fontSize:11, color:th.sub }}>{t.time}</span>}
                        <span style={{ fontSize:11, color:cat?.color, fontWeight:500 }}>{cat?.label}</span>
                        <span style={{ fontSize:10, padding:"2px 8px", borderRadius:6, background:theme==="dark"?`${pri.color}22`:pri.bg, color:pri.color, fontWeight:600 }}>{pri.label}</span>
                      </div>
                    </div>
                    <button onClick={()=>del(t.id)} style={{ width:30, height:30, borderRadius:10, border:"none", background:`${th.accent}12`, color:th.accent, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, opacity:0.5 }}>×</button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════ CALENDAR ══════ */}
        {tab==="calendar" && (
          <div style={{ animation:"pageIn 0.35s ease" }}>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, margin:"0 0 24px" }}>캘린더</h1>
            <div style={{ background:th.card, borderRadius:22, padding:24, backdropFilter:"blur(14px)", border:`1px solid ${bdr}`, marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                <button onClick={prevM} style={{ width:38,height:38,borderRadius:"50%",border:"none",background:theme==="dark"?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)",cursor:"pointer",fontSize:16,color:th.sub,display:"flex",alignItems:"center",justifyContent:"center" }}>←</button>
                <span style={{ fontSize:17, fontWeight:600 }}>{cYear}. {String(cMonth+1).padStart(2,"0")}</span>
                <button onClick={nextM} style={{ width:38,height:38,borderRadius:"50%",border:"none",background:theme==="dark"?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)",cursor:"pointer",fontSize:16,color:th.sub,display:"flex",alignItems:"center",justifyContent:"center" }}>→</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, textAlign:"center" }}>
                {DAYS_KR.map((d,i)=>(<div key={d} style={{ fontSize:11, fontWeight:500, padding:"6px 0", color:i===0?"#E07A5F":i===6?"#5B8FB9":th.sub, letterSpacing:1 }}>{d}</div>))}
                {calDays.map((day,i)=>{
                  if(!day) return <div key={`e${i}`}/>;
                  const tc=tCount(day), sel=isSel(day), tod=isToday(day);
                  return (
                    <button key={i} onClick={()=>{ setSelDate(`${cYear}-${String(cMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`); setTab("home"); }} style={{
                      width:"100%",aspectRatio:"1",borderRadius:12,border:"none",cursor:"pointer",transition:"all 0.2s",
                      background:sel?th.accent:tod?`${th.accent}18`:"transparent",
                      color:sel?"#FFF":tod?th.accent:th.text, fontWeight:sel||tod?600:400, fontSize:13,
                      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,
                    }}>
                      {day}
                      {tc>0&&<div style={{ display:"flex",gap:2 }}>{[...Array(Math.min(tc,3))].map((_,j)=>(<div key={j} style={{ width:3,height:3,borderRadius:"50%",background:sel?"rgba(255,255,255,0.6)":th.accent }}/>))}</div>}
                    </button>
                  );
                })}
              </div>
            </div>
            <p style={{ fontSize:13, color:th.sub, marginBottom:12 }}>이번 달 총 <strong style={{color:th.text}}>{mTasks.length}개</strong>의 할 일</p>
            {CATEGORIES.map(c=>{
              const ct=mTasks.filter(t=>t.cat===c.id).length; if(!ct) return null;
              const cd=mTasks.filter(t=>t.cat===c.id&&t.done).length;
              return (
                <div key={c.id} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
                  <span style={{ fontSize:18 }}>{c.emoji}</span>
                  <span style={{ fontSize:13,fontWeight:500,flex:1 }}>{c.label}</span>
                  <span style={{ fontSize:12,color:th.sub }}>{cd}/{ct}</span>
                  <div style={{ width:80,height:5,borderRadius:3,background:theme==="dark"?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.05)" }}>
                    <div style={{ height:"100%",borderRadius:3,background:c.color,width:`${ct?cd/ct*100:0}%`,transition:"width 0.4s" }}/>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ══════ STATS ══════ */}
        {tab==="stats" && (
          <div style={{ animation:"pageIn 0.35s ease" }}>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, margin:"0 0 24px" }}>통계</h1>
            <div style={{ background:th.card, borderRadius:22, padding:24, backdropFilter:"blur(14px)", border:`1px solid ${bdr}`, marginBottom:16, textAlign:"center" }}>
              <p style={{ fontSize:12, color:th.sub, margin:"0 0 8px", letterSpacing:1.5 }}>이번 주 완료</p>
              <p style={{ fontSize:48, fontWeight:700, fontFamily:"'Playfair Display',serif", margin:0, lineHeight:1 }}>{weekTasks.filter(t=>t.done).length}</p>
              <p style={{ fontSize:13, color:th.sub, margin:"8px 0 0" }}>총 {weekTasks.length}개 중</p>
            </div>
            <div style={{ background:th.card, borderRadius:22, padding:24, backdropFilter:"blur(14px)", border:`1px solid ${bdr}`, marginBottom:16 }}>
              <p style={{ fontSize:13, fontWeight:600, margin:"0 0 16px" }}>카테고리별 분석</p>
              {CATEGORIES.map(c=>{
                const all=tasks.filter(t=>t.cat===c.id), dn=all.filter(t=>t.done).length, p=all.length?Math.round(dn/all.length*100):0;
                return (
                  <div key={c.id} style={{ marginBottom:16 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
                      <span style={{ fontSize:13,display:"flex",alignItems:"center",gap:6 }}>{c.emoji} {c.label}</span>
                      <span style={{ fontSize:12,color:th.sub }}>{p}% ({dn}/{all.length})</span>
                    </div>
                    <div style={{ height:8,borderRadius:4,background:theme==="dark"?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.05)" }}>
                      <div style={{ height:"100%",borderRadius:4,background:`linear-gradient(90deg,${c.color},${c.color}aa)`,width:`${p}%`,transition:"width 0.6s cubic-bezier(0.4,0,0.2,1)" }}/>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ background:th.card, borderRadius:22, padding:24, backdropFilter:"blur(14px)", border:`1px solid ${bdr}` }}>
              <p style={{ fontSize:13, fontWeight:600, margin:"0 0 16px" }}>우선순위별</p>
              {Object.entries(PRIORITY).map(([k,v])=>{
                const ct=tasks.filter(t=>t.pri===k).length, cd=tasks.filter(t=>t.pri===k&&t.done).length;
                return (
                  <div key={k} style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}>
                    <div style={{ width:10,height:10,borderRadius:3,background:v.color }}/>
                    <span style={{ fontSize:13,flex:1 }}>{v.label}</span>
                    <span style={{ fontSize:24,fontWeight:700,fontFamily:"'Playfair Display',serif" }}>{ct}</span>
                    <span style={{ fontSize:11,color:th.sub }}>({cd} 완료)</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════ SETTINGS ══════ */}
        {tab==="settings" && (
          <div style={{ animation:"pageIn 0.35s ease" }}>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, margin:"0 0 24px" }}>설정</h1>
            <div style={{ background:th.card, borderRadius:22, padding:24, backdropFilter:"blur(14px)", border:`1px solid ${bdr}`, marginBottom:16 }}>
              <p style={{ fontSize:13, fontWeight:600, margin:"0 0 14px" }}>이름</p>
              <input value={userName} onChange={e=>setUserName(e.target.value)} style={{ width:"100%", border:"none", borderBottom:`1.5px solid ${theme==="dark"?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.08)"}`, background:"transparent", fontSize:15, fontWeight:500, padding:"8px 0", outline:"none", fontFamily:"inherit", color:th.text, boxSizing:"border-box" }}/>
            </div>
            <div style={{ background:th.card, borderRadius:22, padding:24, backdropFilter:"blur(14px)", border:`1px solid ${bdr}`, marginBottom:16 }}>
              <p style={{ fontSize:13, fontWeight:600, margin:"0 0 14px" }}>테마</p>
              <div style={{ display:"flex", gap:10 }}>
                {[
                  { id:"warm", label:"웜톤", c1:"#FDF6EC", c2:"#E07A5F" },
                  { id:"cool", label:"쿨톤", c1:"#EEF2F7", c2:"#5B8FB9" },
                  { id:"dark", label:"다크", c1:"#1A1A1E", c2:"#E07A5F" },
                ].map(t=>(
                  <button key={t.id} onClick={()=>setTheme(t.id)} style={{
                    flex:1, padding:"16px 10px", borderRadius:16, cursor:"pointer",
                    border:theme===t.id?`2px solid ${t.c2}`:"2px solid transparent",
                    background:t.c1, display:"flex", flexDirection:"column", alignItems:"center", gap:8,
                  }}>
                    <div style={{ display:"flex", gap:4 }}>
                      <div style={{ width:14,height:14,borderRadius:4,background:t.c1,border:"1px solid rgba(128,128,128,0.2)" }}/>
                      <div style={{ width:14,height:14,borderRadius:4,background:t.c2 }}/>
                    </div>
                    <span style={{ fontSize:11, fontWeight:500, color:t.id==="dark"?"#E8E4E0":"#2D2A26" }}>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ background:th.card, borderRadius:22, padding:24, backdropFilter:"blur(14px)", border:`1px solid ${bdr}` }}>
              <p style={{ fontSize:13, fontWeight:600, margin:"0 0 14px" }}>데이터</p>
              <button onClick={()=>{setTasks([]);showToast("모든 할 일이 삭제되었습니다");}} style={{ width:"100%", padding:12, borderRadius:12, border:"none", background:"#E07A5F18", color:"#E07A5F", cursor:"pointer", fontSize:13, fontWeight:600 }}>모든 할 일 초기화</button>
            </div>
            <p style={{ textAlign:"center", color:th.sub, fontSize:11, marginTop:24, opacity:0.5 }}>Planner v2.0</p>
          </div>
        )}
      </div>

      {/* ══════ ADD MODAL ══════ */}
      {showAdd && (
        <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.4)", backdropFilter:"blur(6px)", display:"flex", alignItems:"flex-end", justifyContent:"center", animation:"fadeIn 0.2s ease" }}
          onClick={e=>e.target===e.currentTarget&&setShowAdd(false)}>
          <div style={{ width:"100%", maxWidth:500, background:theme==="dark"?"#2A2A2E":"#FDF6EC", borderRadius:"24px 24px 0 0", padding:"28px 24px max(env(safe-area-inset-bottom),24px)", animation:"slideSheet 0.35s cubic-bezier(0.32,0.72,0,1)" }}>
            <div style={{ width:36, height:4, borderRadius:2, background:"rgba(128,128,128,0.2)", margin:"0 auto 20px" }}/>
            <h3 style={{ fontSize:18, fontWeight:600, margin:"0 0 20px", color:th.text }}>새로운 할 일</h3>
            <input value={newText} onChange={e=>setNewText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTask()} placeholder="무엇을 해야 하나요?" autoFocus
              style={{ width:"100%", border:"none", borderBottom:`1.5px solid ${theme==="dark"?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.08)"}`, background:"transparent", fontSize:16, fontWeight:500, padding:"10px 0", outline:"none", fontFamily:"inherit", color:th.text, marginBottom:20, boxSizing:"border-box" }}/>
            <div style={{ marginBottom:12 }}>
              <input type="time" value={newTime} onChange={e=>setNewTime(e.target.value)} style={{ border:`1px solid ${theme==="dark"?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.08)"}`, borderRadius:10, padding:"8px 12px", fontSize:13, fontFamily:"inherit", background:"transparent", color:th.text, outline:"none" }}/>
            </div>
            <p style={{ fontSize:12, color:th.sub, margin:"0 0 8px", fontWeight:500 }}>카테고리</p>
            <div style={{ display:"flex", gap:6, marginBottom:16, flexWrap:"wrap" }}>
              {CATEGORIES.map(c=>(<button key={c.id} onClick={()=>setNewCat(c.id)} style={{ padding:"8px 14px", borderRadius:12, border:"none", cursor:"pointer", fontSize:12, fontWeight:500, background:newCat===c.id?c.color:theme==="dark"?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)", color:newCat===c.id?"#FFF":th.sub }}>{c.emoji} {c.label}</button>))}
            </div>
            <p style={{ fontSize:12, color:th.sub, margin:"0 0 8px", fontWeight:500 }}>우선순위</p>
            <div style={{ display:"flex", gap:6, marginBottom:24 }}>
              {Object.entries(PRIORITY).map(([k,v])=>(<button key={k} onClick={()=>setNewPri(k)} style={{ padding:"8px 16px", borderRadius:12, border:"none", cursor:"pointer", fontSize:12, fontWeight:500, background:newPri===k?v.color:theme==="dark"?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)", color:newPri===k?"#FFF":th.sub }}>{v.label}</button>))}
            </div>
            <button onClick={addTask} style={{ width:"100%", padding:14, borderRadius:14, border:"none", background:th.accent, color:"#FFF", cursor:"pointer", fontSize:15, fontWeight:600 }}>추가하기</button>
          </div>
        </div>
      )}

      <BottomNav tab={tab} setTab={setTab} />

      <style>{`
        @keyframes pageIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideSheet{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes toastIn{from{opacity:0;transform:translate(-50%,-12px)}to{opacity:1;transform:translate(-50%,0)}}
        button:active{transform:scale(0.97)}
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
      `}</style>
    </div>
  );
}
