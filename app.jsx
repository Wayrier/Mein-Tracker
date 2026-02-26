import { useState } from "react";

const TRANSLATIONS = {
  de: {
    title: "Habit Tracker",
    today: "Heute",
    week: "Woche",
    day: "Tag",
    perfect: "🎉 Perfekter Tag!",
    halfway: "Über die Hälfte!",
    motivate: "Du schaffst das!",
    of: "von",
    addHabit: "+ Gewohnheit hinzufügen",
    editHabit: "Gewohnheit bearbeiten",
    newHabit: "Neue Gewohnheit",
    save: "Speichern",
    add: "Hinzufügen",
    delete: "Löschen",
    cancel: "Abbrechen",
    deleteConfirmTitle: "Gewohnheit löschen?",
    deleteConfirmMsg: "Alle Fortschrittsdaten werden gelöscht.",
    emoji: "Emoji",
    name: "Name",
    namePlaceholder: "z.B. Gym, Meditieren...",
    duration: "Dauer (optional)",
    unit: "Einheit",
    category: "Kategorie",
    days: ["Mo","Di","Mi","Do","Fr","Sa","So"],
    streakDays: "Tage",
    weekLabel: (ws) => `${ws}/7 diese Woche`,
    categories: ["Fitness","Lernen","Ernährung","Fokus","Mental","Produktivität","Anderes"],
    empty: "Füge deine erste Gewohnheit hinzu!",
  },
  en: {
    title: "Habit Tracker",
    today: "Today",
    week: "Week",
    day: "Day",
    perfect: "🎉 Perfect day!",
    halfway: "More than halfway!",
    motivate: "You got this!",
    of: "of",
    addHabit: "+ Add Habit",
    editHabit: "Edit Habit",
    newHabit: "New Habit",
    save: "Save",
    add: "Add",
    delete: "Delete",
    cancel: "Cancel",
    deleteConfirmTitle: "Delete habit?",
    deleteConfirmMsg: "All progress data will be deleted.",
    emoji: "Emoji",
    name: "Name",
    namePlaceholder: "e.g. Gym, Meditate...",
    duration: "Duration (optional)",
    unit: "Unit",
    category: "Category",
    days: ["Mo","Tu","We","Th","Fr","Sa","Su"],
    streakDays: "days",
    weekLabel: (ws) => `${ws}/7 this week`,
    categories: ["Fitness","Learning","Nutrition","Focus","Mental","Productivity","Other"],
    empty: "Add your first habit!",
  }
};

const DEFAULT_HABITS = [
  { id: 1, emoji: "🏋️", name: "Gym", duration: 30, unit: "min", category: "Fitness" },
  { id: 2, emoji: "📚", name: "Novels lesen", duration: 30, unit: "min", category: "Fokus" },
  { id: 3, emoji: "🧠", name: "Lernfelder", duration: 60, unit: "min", category: "Lernen" },
  { id: 4, emoji: "🥗", name: "Essplan", duration: null, unit: null, category: "Ernährung" },
];

const CAT_COLORS = {
  "Fitness": "#4ade80", "Learning": "#4ade80",
  "Lernen": "#a78bfa", "Learning2": "#a78bfa",
  "Ernährung": "#fb923c", "Nutrition": "#fb923c",
  "Fokus": "#f472b6", "Focus": "#f472b6",
  "Mental": "#38bdf8",
  "Produktivität": "#facc15", "Productivity": "#facc15",
  "Anderes": "#94a3b8", "Other": "#94a3b8",
};

function getCatColor(cat) {
  return CAT_COLORS[cat] || "#6366f1";
}

function getTodayIndex() {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1;
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:100,display:"flex",alignItems:"flex-end",justifyContent:"center",background:"rgba(0,0,0,0.55)",backdropFilter:"blur(4px)" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#1a1a2e",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:480,padding:"28px 20px 44px",animation:"slideUp 0.25s ease" }}>
        {children}
      </div>
    </div>
  );
}

function HabitForm({ form, setForm, t }) {
  const EMOJIS_LIST = ["🏋️","🧠","📚","🥗","💧","🎯","🏃","🧘","🌅","💊","✍️","🎨","🎸","🚴","🛌","📵","💪","🫀","🍎","☕","🚿","🪥","🧹","🎮","📱"];
  const inputStyle = { width:"100%", padding:"12px 14px", borderRadius:12, background:"#0d0d1a", border:"1px solid #2d2d4a", color:"#e2e8f0", fontSize:15, marginTop:4, outline:"none" };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div>
        <label style={{ fontSize:12, color:"#6b7280", fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>{t.emoji}</label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:8 }}>
          {EMOJIS_LIST.map(e => (
            <button key={e} onClick={() => setForm(f=>({...f,emoji:e}))} style={{ width:40,height:40,borderRadius:10,fontSize:20,border:"none",cursor:"pointer",background:form.emoji===e?"#6366f1":"#1e1e35",transition:"all 0.15s" }}>{e}</button>
          ))}
        </div>
      </div>
      <div>
        <label style={{ fontSize:12, color:"#6b7280", fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>{t.name}</label>
        <input style={inputStyle} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder={t.namePlaceholder} />
      </div>
      <div style={{ display:"flex", gap:10 }}>
        <div style={{ flex:2 }}>
          <label style={{ fontSize:12, color:"#6b7280", fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>{t.duration}</label>
          <input style={inputStyle} type="number" value={form.duration} onChange={e=>setForm(f=>({...f,duration:e.target.value}))} placeholder="30" />
        </div>
        <div style={{ flex:1 }}>
          <label style={{ fontSize:12, color:"#6b7280", fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>{t.unit}</label>
          <select style={inputStyle} value={form.unit} onChange={e=>setForm(f=>({...f,unit:e.target.value}))}>
            <option value="min">min</option>
            <option value="h">h</option>
            <option value="x">×</option>
          </select>
        </div>
      </div>
      <div>
        <label style={{ fontSize:12, color:"#6b7280", fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>{t.category}</label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:8 }}>
          {t.categories.map(c => (
            <button key={c} onClick={() => setForm(f=>({...f,category:c}))} style={{ padding:"7px 14px",borderRadius:20,fontSize:12,fontWeight:600,border:"none",cursor:"pointer",background:form.category===c?(getCatColor(c)||"#6366f1"):"#1e1e35",color:form.category===c?"#000":"#6b7280",transition:"all 0.15s" }}>{c}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const todayIndex = getTodayIndex();
  const [lang, setLang] = useState("de");
  const t = TRANSLATIONS[lang];

  const [habits, setHabits] = useState(DEFAULT_HABITS);
  const [checked, setChecked] = useState(() => {
    const init = {};
    DEFAULT_HABITS.forEach(h => { init[h.id] = Array(7).fill(false); });
    return init;
  });
  const [activeDay, setActiveDay] = useState(todayIndex);
  const [view, setView] = useState("today");
  const [editModal, setEditModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [form, setForm] = useState({ emoji:"🎯", name:"", duration:"", unit:"min", category: lang === "de" ? "Anderes" : "Other" });

  const openEdit = (habit) => {
    setForm({ emoji: habit.emoji, name: habit.name, duration: habit.duration || "", unit: habit.unit || "min", category: habit.category });
    setEditModal(habit);
  };

  const openAdd = () => {
    setForm({ emoji:"🎯", name:"", duration:"", unit:"min", category: lang === "de" ? "Anderes" : "Other" });
    setAddModal(true);
  };

  const saveEdit = () => {
    if (!form.name.trim()) return;
    setHabits(prev => prev.map(h => h.id === editModal.id ? { ...h, emoji:form.emoji, name:form.name, duration:form.duration?parseInt(form.duration):null, unit:form.duration?form.unit:null, category:form.category } : h));
    setEditModal(null);
  };

  const saveAdd = () => {
    if (!form.name.trim()) return;
    const newId = uid();
    setHabits(prev => [...prev, { id:newId, emoji:form.emoji, name:form.name, duration:form.duration?parseInt(form.duration):null, unit:form.duration?form.unit:null, category:form.category }]);
    setChecked(prev => ({ ...prev, [newId]: Array(7).fill(false) }));
    setAddModal(false);
  };

  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
    setChecked(prev => { const n={...prev}; delete n[id]; return n; });
    setDeleteConfirm(null);
    setEditModal(null);
  };

  const toggle = (id) => {
    setChecked(prev => {
      const next = { ...prev, [id]: [...(prev[id] || Array(7).fill(false))] };
      next[id][activeDay] = !next[id][activeDay];
      return next;
    });
  };

  const getStreak = (id) => {
    const arr = checked[id] || [];
    let s = 0;
    for (let i = todayIndex; i >= 0; i--) { if (arr[i]) s++; else break; }
    return s;
  };

  const todayDone = habits.filter(h => (checked[h.id]||[])[activeDay]).length;
  const pct = habits.length ? Math.round((todayDone / habits.length) * 100) : 0;
  const circumference = 2 * Math.PI * 36;

  return (
    <div style={{ minHeight:"100vh", background:"#0d0d1a", color:"#e2e8f0", fontFamily:"'DM Sans', sans-serif", maxWidth:480, margin:"0 auto", position:"relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@700&display=swap');
        * { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
        @keyframes slideUp { from{transform:translateY(60px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes pop { 0%{transform:scale(1)} 50%{transform:scale(1.18)} 100%{transform:scale(1)} }
        .pop { animation: pop 0.22s ease; }
        ::-webkit-scrollbar { display:none; }
        input, select { font-family:inherit; }
        .lang-btn { transition: all 0.18s; }
        .lang-btn:hover { opacity: 0.85; }
      `}</style>

      {/* Header */}
      <div style={{ padding:"52px 20px 16px", background:"linear-gradient(180deg,#16162a 0%,transparent 100%)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:12, color:"#6366f1", fontWeight:600, letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>{t.title}</div>
            <div style={{ fontSize:26, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>
              {activeDay === todayIndex ? t.today : t.days[activeDay]}
            </div>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {/* Language Toggle */}
            <div style={{ display:"flex", background:"#1e1e35", borderRadius:12, padding:3, gap:2 }}>
              {["de","en"].map(l => (
                <button key={l} className="lang-btn" onClick={() => setLang(l)} style={{
                  background: lang===l ? "#6366f1" : "transparent",
                  color: lang===l ? "#fff" : "#6b7280",
                  border:"none", borderRadius:9, padding:"6px 11px", fontSize:12, fontWeight:700,
                  cursor:"pointer", letterSpacing:1, textTransform:"uppercase"
                }}>
                  {l === "de" ? "🇩🇪 DE" : "🇬🇧 EN"}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div style={{ display:"flex", background:"#1e1e35", borderRadius:12, padding:3, gap:2 }}>
              {["today","week"].map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  background: view===v ? "#6366f1" : "transparent",
                  color: view===v ? "#fff" : "#6b7280",
                  border:"none", borderRadius:9, padding:"6px 12px", fontSize:12, fontWeight:600, cursor:"pointer", transition:"all 0.2s"
                }}>
                  {v === "today" ? t.day : t.week}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div style={{ padding:"0 20px 16px", display:"flex", gap:6 }}>
        {t.days.map((d, i) => {
          const isToday = i === todayIndex;
          const isActive = i === activeDay;
          const dayDone = habits.filter(h => (checked[h.id]||[])[i]).length;
          const allDone = dayDone === habits.length && habits.length > 0;
          return (
            <button key={i} onClick={() => setActiveDay(i)} style={{
              flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4,
              background: isActive ? "#6366f1" : isToday ? "#1e1e3f" : "#161625",
              border: isToday && !isActive ? "1.5px solid #6366f1" : "1.5px solid transparent",
              borderRadius:12, padding:"8px 0", cursor:"pointer", transition:"all 0.18s",
            }}>
              <span style={{ fontSize:10, fontWeight:600, color: isActive ? "#fff" : "#6b7280" }}>{d}</span>
              <div style={{ width:6, height:6, borderRadius:"50%", background: allDone?"#4ade80":dayDone>0?"#f59e0b":isActive?"rgba(255,255,255,0.3)":"#2d2d4a" }} />
            </button>
          );
        })}
      </div>

      {/* Progress Ring */}
      {view === "today" && (
        <div style={{ padding:"0 20px 20px", display:"flex", alignItems:"center", gap:20 }}>
          <div style={{ position:"relative", width:96, height:96, flexShrink:0 }}>
            <svg width={96} height={96} style={{ transform:"rotate(-90deg)" }} viewBox="0 0 96 96">
              <circle cx={48} cy={48} r={36} fill="none" stroke="#1e1e35" strokeWidth={8} />
              <circle cx={48} cy={48} r={36} fill="none" stroke={pct===100?"#4ade80":"#6366f1"} strokeWidth={8} strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={circumference*(1-pct/100)}
                style={{ transition:"stroke-dashoffset 0.6s cubic-bezier(.4,0,.2,1)" }} />
            </svg>
            <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ fontSize:20, fontWeight:700 }}>{pct}%</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize:22, fontWeight:700 }}>{todayDone}<span style={{ color:"#4b5563",fontSize:16 }}>/{habits.length}</span></div>
            <div style={{ color:"#6b7280", fontSize:14, marginTop:2 }}>
              {pct===100 ? t.perfect : pct>=50 ? t.halfway : t.motivate}
            </div>
          </div>
          <button onClick={openAdd} style={{
            marginLeft:"auto", width:44, height:44, borderRadius:"50%",
            background:"#6366f1", border:"none", color:"#fff", fontSize:22, cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center", flexShrink:0,
            boxShadow:"0 0 20px rgba(99,102,241,0.4)"
          }}>+</button>
        </div>
      )}

      {/* Habits */}
      <div style={{ padding:"0 20px", display:"flex", flexDirection:"column", gap:12, paddingBottom:100 }}>
        {habits.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#4b5563" }}>
            <div style={{ fontSize:40 }}>✨</div>
            <div style={{ marginTop:8 }}>{t.empty}</div>
          </div>
        )}
        {habits.map(habit => {
          const isDone = (checked[habit.id]||[])[activeDay];
          const streak = getStreak(habit.id);
          const ws = (checked[habit.id]||[]).filter(Boolean).length;
          const catColor = getCatColor(habit.category);
          if (view === "week") {
            return (
              <div key={habit.id} style={{ background:"#161625", borderRadius:20, padding:16, border:"1px solid #1e1e35" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                  <span style={{ fontSize:26 }}>{habit.emoji}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:15 }}>{habit.name}</div>
                    {habit.duration && <div style={{ color:"#6b7280", fontSize:12 }}>{habit.duration} {habit.unit}</div>}
                  </div>
                  <div style={{ fontSize:13, fontWeight:700, color: ws>=5?"#4ade80":ws>=3?"#f59e0b":"#6b7280" }}>{t.weekLabel(ws)}</div>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  {t.days.map((d,i) => (
                    <div key={i} style={{ flex:1, display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
                      <div style={{ width:"100%", height:32, borderRadius:8, background:(checked[habit.id]||[])[i]?catColor:"#1e1e35", border:i===todayIndex?`1.5px solid ${catColor}`:"1.5px solid transparent", transition:"background 0.2s" }} />
                      <span style={{ fontSize:9, color:"#4b5563" }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <div key={habit.id} style={{ background:isDone?"linear-gradient(135deg,#1a2e1a,#1e2e1e)":"#161625", borderRadius:20, padding:16, border:isDone?`1px solid ${catColor}40`:"1px solid #1e1e35", transition:"all 0.25s ease", opacity:isDone?0.85:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <button onClick={() => toggle(habit.id)} style={{ width:40,height:40,borderRadius:"50%",border:"none",flexShrink:0,background:isDone?catColor:"#1e1e35",color:isDone?"#000":"#4b5563",fontSize:18,cursor:"pointer",transition:"all 0.2s",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:isDone?`0 0 16px ${catColor}60`:"none" }}>
                  {isDone?"✓":"○"}
                </button>
                <span style={{ fontSize:26 }}>{habit.emoji}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:600,fontSize:15,textDecoration:isDone?"line-through":"none",color:isDone?"#4b5563":"#e2e8f0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{habit.name}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:3 }}>
                    {habit.duration && <span style={{ fontSize:11,color:catColor,fontWeight:600,background:`${catColor}20`,padding:"2px 8px",borderRadius:20 }}>{habit.duration} {habit.unit}</span>}
                    <span style={{ fontSize:11, color:"#4b5563" }}>{habit.category}</span>
                    {streak > 1 && <span style={{ fontSize:11, color:"#f59e0b" }}>🔥 {streak} {t.streakDays}</span>}
                  </div>
                </div>
                <button onClick={() => openEdit(habit)} style={{ background:"#1e1e35",border:"none",width:34,height:34,borderRadius:10,color:"#6b7280",cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center" }}>✏️</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Add Button */}
      {view === "today" && habits.length > 0 && (
        <div style={{ position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,padding:"16px 20px 32px",background:"linear-gradient(0deg,#0d0d1a 60%,transparent)",pointerEvents:"none" }}>
          <button onClick={openAdd} style={{ width:"100%",padding:16,borderRadius:18,background:"#6366f1",border:"none",color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",boxShadow:"0 8px 30px rgba(99,102,241,0.5)",pointerEvents:"all" }}>
            {t.addHabit}
          </button>
        </div>
      )}

      {/* Edit Modal */}
      <Modal open={!!editModal} onClose={() => setEditModal(null)}>
        <div style={{ fontSize:18,fontWeight:700,marginBottom:20 }}>{t.editHabit}</div>
        <HabitForm form={form} setForm={setForm} t={t} />
        <div style={{ display:"flex", gap:10, marginTop:20 }}>
          <button onClick={() => setDeleteConfirm(editModal?.id)} style={{ flex:1,padding:14,borderRadius:14,background:"#2d1515",border:"1px solid #7f1d1d",color:"#f87171",fontWeight:600,cursor:"pointer",fontSize:14 }}>{t.delete}</button>
          <button onClick={saveEdit} style={{ flex:2,padding:14,borderRadius:14,background:"#6366f1",border:"none",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:15 }}>{t.save}</button>
        </div>
      </Modal>

      {/* Add Modal */}
      <Modal open={addModal} onClose={() => setAddModal(false)}>
        <div style={{ fontSize:18,fontWeight:700,marginBottom:20 }}>{t.newHabit}</div>
        <HabitForm form={form} setForm={setForm} t={t} />
        <button onClick={saveAdd} style={{ width:"100%",marginTop:20,padding:14,borderRadius:14,background:"#6366f1",border:"none",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:15 }}>{t.add}</button>
      </Modal>

      {/* Delete Confirm */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:40,marginBottom:12 }}>⚠️</div>
          <div style={{ fontSize:17,fontWeight:700,marginBottom:8 }}>{t.deleteConfirmTitle}</div>
          <div style={{ color:"#6b7280",fontSize:14,marginBottom:24 }}>{t.deleteConfirmMsg}</div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={() => setDeleteConfirm(null)} style={{ flex:1,padding:14,borderRadius:14,background:"#1e1e35",border:"none",color:"#e2e8f0",fontWeight:600,cursor:"pointer" }}>{t.cancel}</button>
            <button onClick={() => deleteHabit(deleteConfirm)} style={{ flex:1,padding:14,borderRadius:14,background:"#ef4444",border:"none",color:"#fff",fontWeight:700,cursor:"pointer" }}>{t.delete}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
