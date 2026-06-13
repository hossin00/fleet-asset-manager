import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Search, X, Download } from 'lucide-react';
const A='#064e3b',SK='fleetassetmanagerv1',SS='fleetassetmanagers1',SO='fleetassetmanagero1';
interface Item{id:string;registration:string;make:string;model:string;year:number;assignedDriver:string;mileage:number;nextServiceDate:string;motExpiry:string;insuranceExpiry:string;status:string;notes:string;isSample?:boolean;}
const SAMPLE:Item[]=
[
  {
    "id": "fl1",
    "registration": "AB22 XYZ",
    "make": "Ford",
    "model": "Transit Custom",
    "year": 2022,
    "assignedDriver": "Ali Hassan",
    "mileage": 45200,
    "nextServiceDate": "2026-07-13",
    "motExpiry": "2026-10-11",
    "insuranceExpiry": "2026-12-30",
    "status": "Active",
    "notes": "Delivery van — route North",
    "isSample": true
  },
  {
    "id": "fl2",
    "registration": "CD21 ABC",
    "make": "Volkswagen",
    "model": "Crafter",
    "year": 2021,
    "assignedDriver": "Tom Wilson",
    "mileage": 78500,
    "nextServiceDate": "2026-06-08",
    "motExpiry": "2026-09-11",
    "insuranceExpiry": "2026-12-10",
    "status": "Service Overdue",
    "notes": "SERVICE OVERDUE — book immediately",
    "isSample": true
  },
  {
    "id": "fl3",
    "registration": "EF20 DEF",
    "make": "Mercedes",
    "model": "Sprinter",
    "year": 2020,
    "assignedDriver": "Unassigned",
    "mileage": 112000,
    "nextServiceDate": "2026-08-12",
    "motExpiry": "2026-06-03",
    "insuranceExpiry": "2027-06-13",
    "status": "MOT Expired",
    "notes": "MOT EXPIRED — off road until renewed",
    "isSample": true
  },
  {
    "id": "fl4",
    "registration": "GH23 GHI",
    "make": "Renault",
    "model": "Trafic",
    "year": 2023,
    "assignedDriver": "Omar Khalil",
    "mileage": 18000,
    "nextServiceDate": "2026-12-10",
    "motExpiry": "2027-07-18",
    "insuranceExpiry": "2027-04-09",
    "status": "Active",
    "notes": "New vehicle — all docs valid",
    "isSample": true
  }
];
function ld<T>(k:string,fb:T):T{try{const v=localStorage.getItem(k);return v?JSON.parse(v):fb;}catch{return fb;}}
function sv<T>(k:string,v:T){localStorage.setItem(k,JSON.stringify(v));}
function uid(){return Math.random().toString(36).slice(2,10);}
export default function App(){
  const [items,setItems]=useState<Item[]>(()=>ld(SK,[]));
  const [ob,setOb]=useState(()=>ld(SO,false));
  const [pg,setPg]=useState('dashboard');
  const [q,setQ]=useState('');
  const [modal,setModal]=useState(false);
  const [edit,setEdit]=useState<any>(null);
  const [theme,setTheme]=useState(()=>ld(SS,{theme:'system'}).theme);
  const [form,setForm]=useState<any>({registration:'',make:'',model:'',year:2024,assignedDriver:'',mileage:0,nextServiceDate:'',motExpiry:'',insuranceExpiry:'',status:'Active',notes:''});
  const F=(k:string)=>(e:any)=>setForm((f:any)=>({...f,[k]:e.target.value}));
  const FN=(k:string)=>(e:any)=>setForm((f:any)=>({...f,[k]:+e.target.value}));
  useEffect(()=>{sv(SK,items);},[items]);
  useEffect(()=>{const el=document.documentElement;theme==='dark'?el.classList.add('dark'):theme==='light'?el.classList.remove('dark'):(window.matchMedia('(prefers-color-scheme: dark)').matches?el.classList.add('dark'):el.classList.remove('dark'));sv(SS,{theme});},[theme]);
  const start=(s:boolean)=>{if(s)setItems(SAMPLE);setOb(true);sv(SO,true);};
  const openNew=()=>{setEdit(null);setForm({registration:'',make:'',model:'',year:2024,assignedDriver:'',mileage:0,nextServiceDate:'',motExpiry:'',insuranceExpiry:'',status:'Active',notes:''});setModal(true);};
  const openEdit=(item:any)=>{setEdit(item);setForm({...item});setModal(true);};
  const save=()=>{const item={id:edit?.id||uid(),...form};setItems(p=>edit?p.map((x:any)=>x.id===edit.id?item:x):[item,...p]);setModal(false);};
  const hasSample=items.some((i:any)=>i.isSample);
  const filtered=items.filter((i:any)=>{const qq=q.toLowerCase();return!qq||String(i.registration).toLowerCase().includes(qq)||String(i.make).toLowerCase().includes(qq);});
  const exportCSV=()=>{if(!items.length)return;const r=items.map((i:any)=>[i.registration,i.make,i.status].join(','));const el=document.createElement('a');el.href='data:text/csv;charset=utf-8,'+encodeURIComponent('registration,make,status\n'+r.join('\n'));el.download='vehicles.csv';el.click();};
  if(!ob)return(<div className="min-h-screen flex items-center justify-center p-6" style={{background:`linear-gradient(135deg,${A},${A}bb)`}}><div className="max-w-xl w-full text-center"><div className="text-6xl mb-4">🚛</div><h1 className="text-3xl font-bold text-white mb-2">Fleet Asset Manager</h1><p className="text-white/80 mb-8">Manage fleet vehicles, drivers, servicing, and compliance documents</p><div className="grid grid-cols-2 gap-4 text-left"><button onClick={()=>start(false)} className="bg-white/10 hover:bg-white/20 border-2 border-white/30 rounded-2xl p-6 text-white"><div className="text-2xl mb-2">📋</div><div className="font-semibold">Start Empty</div></button><button onClick={()=>start(true)} className="bg-white rounded-2xl p-6 text-left hover:opacity-90"><div className="text-2xl mb-2">✨</div><div className="font-semibold" style={{color:A}}>Explore Sample Workspace</div><div className="text-gray-500 text-sm mt-1">Sample vehicles preloaded</div><div className="text-gray-400 text-xs mt-2">Sample data · Remove anytime</div></button></div><p className="text-white/50 text-xs mt-4">One-time paid app · No subscription · Fully unlocked</p></div></div>);
  const Nav=({id,lb}:{id:string;lb:string})=>(<button onClick={()=>setPg(id)} className={`px-3 py-2 rounded-xl text-sm font-medium ${pg===id?'text-white':'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`} style={pg===id?{backgroundColor:A}:{}}>{lb}</button>);
  return(<div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg text-white flex items-center justify-center font-bold" style={{backgroundColor:A}}>🚛</div><nav className="flex gap-1"><Nav id="dashboard" lb="Dashboard"/><Nav id='vehicles' lb='Vehicles'/><Nav id="reports" lb="Reports"/><Nav id="settings" lb="Settings"/><Nav id="help" lb="Help"/></nav></div>
      <div className="flex items-center gap-2"><button onClick={()=>setTheme((t:string)=>t==='dark'?'light':'dark')} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">{theme==='dark'?'☀️':'🌙'}</button><button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium" style={{backgroundColor:A}}><Plus size={15}/>Add Vehicle</button></div>
    </header>
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      {pg==='dashboard'&&<>
        {hasSample&&<div className="flex items-center justify-between bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-xl px-4 py-3"><span className="text-amber-700 dark:text-amber-400 text-sm">✦ Sample workspace loaded</span><button onClick={()=>setItems(p=>p.filter((i:any)=>!i.isSample))} className="text-xs text-amber-600 underline">Remove</button></div>}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><div className="text-2xl mb-2">🚛</div><div className="text-2xl font-bold">{items.length}</div><div className="text-sm text-gray-500">Total Vehicles</div></div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><div className="text-2xl mb-2">📅</div><div className="text-lg font-bold">{new Date().toLocaleDateString('en-GB')}</div><div className="text-sm text-gray-500">Today</div></div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><div className="text-2xl mb-2">🔒</div><div className="text-lg font-bold">Private</div><div className="text-sm text-gray-500">Local storage only</div></div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between"><span className="font-semibold">Recent Vehicles</span><button onClick={()=>setPg('vehicles')} className="text-sm underline" style={{color:A}}>View all</button></div>
          {items.slice(0,5).map((item:any,i:number)=>(<div key={i} className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
            <div className="flex-1"><div className="flex items-center gap-2"><span className="font-medium text-sm">{item.registration}</span>{item.isSample&&<span className="text-xs bg-amber-100 text-amber-700 px-1.5 rounded">✦</span>}</div><p className="text-xs text-gray-400">{item.make} · {item.status}</p></div>
            <button onClick={()=>openEdit(item)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-400"><Edit3 size={14}/></button>
          </div>))}
          {items.length===0&&<div className="py-10 text-center text-gray-400"><p>No vehicles yet</p><button onClick={()=>{setPg('vehicles');openNew();}} className="mt-3 px-4 py-2 rounded-xl text-white text-sm" style={{backgroundColor:A}}>Add First Vehicle</button></div>}
        </div>
      </>}
      {pg==='vehicles'&&<>
        <div className="flex gap-3"><div className="relative flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search…" className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"/></div><button onClick={exportCSV} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"><Download size={14}/>CSV</button></div>
        {filtered.length===0?<div className="text-center py-16"><div className="text-5xl mb-4">🚛</div><p className="font-semibold text-lg mb-5">No vehicles yet</p><button onClick={openNew} className="px-5 py-2.5 rounded-xl text-white font-medium" style={{backgroundColor:A}}>Add Vehicle</button></div>:
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800">
          {filtered.map((item:any,i:number)=>(<div key={i} className="flex items-center gap-4 px-5 py-4">
            <div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className="font-medium text-sm">{item.registration}</span>{item.isSample&&<span className="text-xs bg-amber-100 text-amber-700 px-1.5 rounded">✦ Sample</span>}</div><p className="text-xs text-gray-400">{item.make} · {item.status}</p></div>
            <div className="flex gap-1 flex-shrink-0"><button onClick={()=>openEdit(item)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-400"><Edit3 size={15}/></button><button onClick={()=>setItems(p=>p.filter((x:any)=>x.id!==item.id))} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"><Trash2 size={15}/></button></div>
          </div>))}
        </div>}
      </>}
      
      {pg==='reports'&&<div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6"><h3 className="font-semibold mb-4">Vehicles Summary</h3><p className="text-sm text-gray-500">Total vehicles: {items.length}</p></div>}
      {pg==='settings'&&<div className="max-w-lg space-y-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><h3 className="font-semibold mb-3">Theme</h3><div className="flex gap-2">{['light','dark','system'].map(t=><button key={t} onClick={()=>setTheme(t)} className={`px-4 py-2 rounded-xl border text-sm capitalize ${theme===t?'text-white border-transparent':'border-gray-200 dark:border-gray-700'}`} style={theme===t?{backgroundColor:A}:{}}>{t}</button>)}</div></div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><h3 className="font-semibold mb-3">Sample Workspace</h3><div className="flex gap-2">{!hasSample&&<button onClick={()=>setItems(p=>{const f=p.filter((i:any)=>!i.isSample);return[...f,...SAMPLE];})} className="px-4 py-2 rounded-xl border border-gray-200 text-sm">Load Sample Data</button>}{hasSample&&<button onClick={()=>setItems(p=>p.filter((i:any)=>!i.isSample))} className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm">Remove Sample Data</button>}</div></div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><h3 className="font-semibold mb-2">About</h3><p className="text-sm text-gray-500">Fleet Asset Manager · v1.0</p><p className="text-sm text-green-600 mt-1">✓ One-time paid app · No subscription · Fully unlocked</p></div>
      </div>}
      {pg==='help'&&<div className="max-w-2xl space-y-3">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><p className="font-medium text-sm mb-1">How do I add a vehicle?</p><p className="text-sm text-gray-500">Click "Add Vehicle" top right. Fill in the form and click Save.</p></div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><p className="font-medium text-sm mb-1">Can I export my data?</p><p className="text-sm text-gray-500">Yes — CSV export on the Vehicles page.</p></div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><p className="font-medium text-sm mb-1">Is my data private?</p><p className="text-sm text-gray-500">All data stays on your device. Nothing is sent to any server.</p></div>
      </div>}
    </main>
    {modal&&<div className="fixed inset-0 z-50 flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={()=>setModal(false)}/><div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-5"><h3 className="text-lg font-semibold">{edit?'Edit Vehicle':'New Vehicle'}</h3><button onClick={()=>setModal(false)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-400"><X size={18}/></button></div>
      <div className="grid grid-cols-2 gap-3">
        <div className=""><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Registration Plate</label><input value={form.registration||''} onChange={F('registration')} placeholder="" className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"/></div><div className=""><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Make</label><input value={form.make||''} onChange={F('make')} placeholder="e.g. Ford" className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"/></div><div className=""><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Model</label><input value={form.model||''} onChange={F('model')} placeholder="e.g. Transit" className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"/></div><div><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Year</label><input type="number" value={form.year||0} onChange={FN('year')} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"/></div><div className=""><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Assigned Driver</label><input value={form.assignedDriver||''} onChange={F('assignedDriver')} placeholder="" className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"/></div><div><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Current Mileage (km)</label><input type="number" value={form.mileage||0} onChange={FN('mileage')} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"/></div><div><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Next Service Date</label><input type="date" value={form.nextServiceDate||''} onChange={F('nextServiceDate')} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"/></div><div><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">MOT Expiry</label><input type="date" value={form.motExpiry||''} onChange={F('motExpiry')} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"/></div><div><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Insurance Expiry</label><input type="date" value={form.insuranceExpiry||''} onChange={F('insuranceExpiry')} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"/></div><div className=""><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Status</label><select value={form.status||''} onChange={F('status')} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"><option>Active</option><option>Service Overdue</option><option>MOT Expired</option><option>Off Road</option><option>Decommissioned</option></select></div><div className="col-span-2"><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Notes</label><textarea value={form.notes||''} onChange={F('notes')} rows={2} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm resize-none"/></div>
        <div className="col-span-2 flex gap-3 pt-2"><button onClick={()=>setModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm">Cancel</button><button onClick={save} className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium" style={{backgroundColor:A}}>Save Vehicle</button></div>
      </div>
    </div></div>}
  </div>);
}
