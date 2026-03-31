"use client";
import { useState, useMemo, useCallback } from "react";

const D = {
  cream:"#F0EAD9",creamD:"#E4DCC8",gold:"#7A6528",goldH:"#5E4D1E",goldBg:"#FAF6ED",
  white:"#FFFFFF",dark:"#1A1714",text:"#2C2820",muted:"#6B6356",
  border:"#DDD5C0",borderL:"#EDE6D4",shadow:"rgba(26,23,20,0.08)",
  amber:"#D97706",amberBg:"#FFFBEB",green:"#16A34A",
};

// ─── SVG ICON SYSTEM ────────────────────────────────────────────
const Ico = ({ name, size=16, style={} }) => {
  const p = { viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"1.8", strokeLinecap:"round", strokeLinejoin:"round",
    style:{ width:size, height:size, display:"inline-block", verticalAlign:"middle", flexShrink:0, ...style } };
  if (name==="scales")   return <svg {...p}><path d="M12 3v18M3 6l9 3 9-3M5 10l-2 5h4L5 10zM19 10l-2 5h4L19 10z"/><line x1="3" y1="21" x2="21" y2="21"/></svg>;
  if (name==="doc")      return <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
  if (name==="list")     return <svg {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
  if (name==="columns")  return <svg {...p}><rect x="2" y="20" width="20" height="2" rx="1"/><rect x="2" y="3" width="20" height="2" rx="1"/><rect x="5" y="5" width="2" height="15"/><rect x="11" y="5" width="2" height="15"/><rect x="17" y="5" width="2" height="15"/></svg>;
  if (name==="shield")   return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
  if (name==="percent")  return <svg {...p}><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/><line x1="5" y1="19" x2="19" y2="5"/></svg>;
  if (name==="clock")    return <svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
  if (name==="pen")      return <svg {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;
  if (name==="link")     return <svg {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
  if (name==="download") return <svg {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
  if (name==="copy")     return <svg {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
  if (name==="check")    return <svg {...p} strokeWidth="2.2"><polyline points="20 6 9 17 4 12"/></svg>;
  if (name==="warn")     return <svg {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
  if (name==="info")     return <svg {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
  if (name==="target")   return <svg {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
  if (name==="sliders")  return <svg {...p}><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>;
  if (name==="spinner")  return <svg {...p} strokeWidth="2" style={{...p.style, animation:"rvg-spin 0.8s linear infinite"}}><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>;
  if (name==="arrow")    return <svg {...p} strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
  return null;
};

// ─── Gebührentabellen ────────────────────────────────────────────
const T25=[[500,51.5],[1000,93],[1500,134.5],[2000,176],[3000,235.5],[4000,295],[5000,354.5],[6000,414],[7000,473.5],[8000,533],[9000,592.5],[10000,652],[13000,707],[16000,762],[19000,817],[22000,872],[25000,927],[30000,1013],[35000,1099],[40000,1185],[45000,1271],[50000,1357],[65000,1456.5],[80000,1556],[95000,1655.5],[110000,1755],[125000,1854.5],[140000,1954],[155000,2053.5],[170000,2153],[185000,2252.5],[200000,2352],[230000,2492],[260000,2632],[290000,2772],[320000,2912],[350000,3052],[380000,3192],[410000,3332],[440000,3472],[470000,3612],[500000,3752]];
const T21=[[500,48.6],[1000,87.5],[1500,127],[2000,166],[3000,222],[4000,278.5],[5000,334.5],[6000,390.5],[7000,447],[8000,503],[9000,559],[10000,615],[13000,667],[16000,719],[19000,771],[22000,823],[25000,875],[30000,956],[35000,1037],[40000,1118],[45000,1199],[50000,1280],[65000,1374],[80000,1468],[95000,1562],[110000,1656],[125000,1750],[140000,1843.5],[155000,1937.5],[170000,2031],[185000,2125],[200000,2219],[230000,2351],[260000,2483],[290000,2615],[320000,2747],[350000,2879.5],[380000,3011.5],[410000,3143.5],[440000,3275.5],[470000,3408],[500000,3540]];
const G25=[[500,40.5],[1000,61.5],[1500,82.5],[2000,104],[3000,126],[4000,148.5],[5000,171],[6000,193],[7000,215],[8000,237.5],[9000,260],[10000,282],[13000,332],[16000,382],[19000,431.5],[22000,481],[25000,531.5],[30000,606.5],[35000,681.5],[40000,757],[45000,832],[50000,907.5],[65000,1038],[80000,1168],[95000,1299.5],[110000,1429.5],[125000,1559.5],[140000,1690],[155000,1820],[170000,1951],[185000,2081],[200000,2211],[230000,2413.5],[260000,2616.5],[290000,2819.5],[320000,3022.5],[350000,3225.5],[380000,3428],[410000,3631],[440000,3834],[470000,4037],[500000,4240]];
const G21=[[500,38],[1000,58],[1500,78],[2000,98],[3000,119],[4000,140],[5000,161],[6000,182],[7000,203],[8000,224],[9000,245],[10000,266],[13000,313],[16000,360],[19000,407],[22000,454],[25000,501],[30000,572],[35000,643],[40000,714],[45000,785],[50000,856],[65000,979],[80000,1102],[95000,1225],[110000,1348],[125000,1471],[140000,1594],[155000,1717],[170000,1840],[185000,1963],[200000,2086],[230000,2277],[260000,2468],[290000,2659],[320000,2850],[350000,3041],[380000,3232],[410000,3423],[440000,3614],[470000,3805],[500000,3996]];

function lkp(v,t){if(v<=0)return 0;for(const[l,f]of t)if(v<=l)return f;const[l1,f1]=t[t.length-1],[l2,f2]=t[t.length-2];return f1+((f1-f2)/(l1-l2))*(v-l1);}
const eur=n=>new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"}).format(n||0);
const pSW=s=>{const n=parseFloat(s.replace(/\./g,"").replace(",","."));return isNaN(n)?0:n;};

// ─── Verfahrensarten ─────────────────────────────────────────────
const VF=[
  {id:"ag_",label:"Außergerichtliche Tätigkeit",kurz:"Außergerichtlich",isG:false,hasTerm:false,hasEin:true,hasGKG:false,hasGegner:false,einNr:"Nr. 1000 VV RVG",einF:1.5,
   fees:(g,o)=>{const r=[{nr:"Nr. 2300 VV RVG",lbl:"Geschäftsgebühr",f:1.3,b:1.3*g}];if(o.ein)r.push({nr:"Nr. 1000 VV RVG",lbl:"Einigungsgebühr (außergerichtl.)",f:1.5,b:1.5*g});return r;},note:null},
  {id:"arbg",label:"Arbeitsgericht – 1. Instanz (ArbG)",kurz:"ArbG",isG:true,hasTerm:true,hasEin:true,hasGKG:true,hasGegner:false,einNr:"Nr. 1003 VV RVG",einF:1.0,
   gF:v=>v?0:2,gL:v=>v?"Vergleich – gerichtsgebührenfrei (§ 54 Abs. 2 ArbGG)":"ArbG – Urteilsverfahren (2,0 GKG)",
   fees:(g,o)=>{const r=[{nr:"Nr. 3100 VV RVG",lbl:"Verfahrensgebühr",f:1.3,b:1.3*g}];if(o.anr)r.push({nr:"Vorb. 3 Abs. 4 VV",lbl:"Anrechnung Geschäftsgebühr (–0,65)",f:-0.65,b:-0.65*g,anr:true});if(o.term)r.push({nr:"Nr. 3104 VV RVG",lbl:"Terminsgebühr",f:1.2,b:1.2*g});if(o.ein)r.push({nr:"Nr. 1003 VV RVG",lbl:"Einigungsgebühr (gerichtl. Vergleich)",f:1.0,b:1.0*g});return r;},
   note:"§ 12a ArbGG: In der 1. Instanz trägt jede Partei ihre eigenen Anwaltskosten."},
  {id:"ag",label:"Amtsgericht – 1. Instanz (AG)",kurz:"AG",isG:true,hasTerm:true,hasEin:true,hasGKG:true,hasGegner:true,einNr:"Nr. 1003 VV RVG",einF:1.0,
   gF:v=>v?1:3,gL:v=>v?"AG – Vergleich (1,0 GKG)":"AG – Urteilsverfahren (3,0 GKG)",
   fees:(g,o)=>{const r=[{nr:"Nr. 3100 VV RVG",lbl:"Verfahrensgebühr",f:1.3,b:1.3*g}];if(o.anr)r.push({nr:"Vorb. 3 Abs. 4 VV",lbl:"Anrechnung Geschäftsgebühr (–0,65)",f:-0.65,b:-0.65*g,anr:true});if(o.term)r.push({nr:"Nr. 3104 VV RVG",lbl:"Terminsgebühr",f:1.2,b:1.2*g});if(o.ein)r.push({nr:"Nr. 1003 VV RVG",lbl:"Einigungsgebühr (gerichtl. Vergleich)",f:1.0,b:1.0*g});return r;},note:null},
  {id:"lg",label:"Landgericht – 1. Instanz (LG)",kurz:"LG",isG:true,hasTerm:true,hasEin:true,hasGKG:true,hasGegner:true,einNr:"Nr. 1003 VV RVG",einF:1.0,
   gF:v=>v?1:3,gL:v=>v?"LG – Vergleich (1,0 GKG)":"LG – Urteilsverfahren (3,0 GKG)",
   fees:(g,o)=>{const r=[{nr:"Nr. 3100 VV RVG",lbl:"Verfahrensgebühr",f:1.3,b:1.3*g}];if(o.anr)r.push({nr:"Vorb. 3 Abs. 4 VV",lbl:"Anrechnung Geschäftsgebühr (–0,65)",f:-0.65,b:-0.65*g,anr:true});if(o.term)r.push({nr:"Nr. 3104 VV RVG",lbl:"Terminsgebühr",f:1.2,b:1.2*g});if(o.ein)r.push({nr:"Nr. 1003 VV RVG",lbl:"Einigungsgebühr (gerichtl. Vergleich)",f:1.0,b:1.0*g});return r;},note:null},
  {id:"lag",label:"Landesarbeitsgericht – Berufung (LAG)",kurz:"LAG",isG:true,hasTerm:true,hasEin:true,hasGKG:true,hasGegner:true,einNr:"Nr. 1003 VV RVG",einF:1.0,
   gF:v=>v?2:4,gL:v=>v?"LAG – Vergleich (2,0 GKG)":"LAG – Urteilsverfahren (4,0 GKG)",
   fees:(g,o)=>{const r=[{nr:"Nr. 3200 VV RVG",lbl:"Verfahrensgebühr (Berufung)",f:1.6,b:1.6*g}];if(o.anr)r.push({nr:"Vorb. 3 Abs. 4 VV",lbl:"Anrechnung Geschäftsgebühr (–0,65)",f:-0.65,b:-0.65*g,anr:true});if(o.term)r.push({nr:"Nr. 3202 VV RVG",lbl:"Terminsgebühr",f:1.2,b:1.2*g});if(o.ein)r.push({nr:"Nr. 1003 VV RVG",lbl:"Einigungsgebühr (gerichtl. Vergleich)",f:1.0,b:1.0*g});return r;},note:null},
  {id:"olg",label:"Oberlandesgericht – Berufung (OLG)",kurz:"OLG",isG:true,hasTerm:true,hasEin:true,hasGKG:true,hasGegner:true,einNr:"Nr. 1003 VV RVG",einF:1.0,
   gF:v=>v?2:4,gL:v=>v?"OLG – Vergleich (2,0 GKG)":"OLG – Urteilsverfahren (4,0 GKG)",
   fees:(g,o)=>{const r=[{nr:"Nr. 3200 VV RVG",lbl:"Verfahrensgebühr (Berufung)",f:1.6,b:1.6*g}];if(o.anr)r.push({nr:"Vorb. 3 Abs. 4 VV",lbl:"Anrechnung Geschäftsgebühr (–0,65)",f:-0.65,b:-0.65*g,anr:true});if(o.term)r.push({nr:"Nr. 3202 VV RVG",lbl:"Terminsgebühr",f:1.2,b:1.2*g});if(o.ein)r.push({nr:"Nr. 1003 VV RVG",lbl:"Einigungsgebühr (gerichtl. Vergleich)",f:1.0,b:1.0*g});return r;},note:null},
];

function calcR(sw,vf,rvgT,gkgT,opts){
  const{term,ein,mwst,anr}=opts;
  const g1=lkp(sw,rvgT);
  const items=vf.fees(g1,{term,ein,anr});
  const sumG=items.reduce((s,i)=>s+i.b,0);
  const ausl=Math.min(Math.max(sumG,0)*.2,20);
  const netto=sumG+ausl;
  const mwstB=mwst?Math.max(netto,0)*.19:0;
  const total=Math.max(netto,0)+mwstB;
  let agFee=null;
  if(anr&&vf.isG){const agG=1.3*g1,agA=Math.min(agG*.2,20),agN=agG+agA,agM=mwst?agN*.19:0;agFee={betrag:agG,ausl:agA,netto:agN,mwstB:agM,total:agN+agM};}
  let gkgF=0,gkgB=0,gkgL="";
  if(vf.hasGKG){gkgF=vf.gF(ein);gkgB=lkp(sw,gkgT)*gkgF;gkgL=vf.gL(ein);}
  let gegner=null;
  if(vf.hasGegner){const gi=vf.fees(g1,{term,ein:false,anr:false});const gs=gi.reduce((s,i)=>s+i.b,0);const ga=Math.min(gs*.2,20),gn=gs+ga,gm=mwst?gn*.19:0;gegner=gn+gm;}
  return{g1,items,sumG,ausl,netto,mwstB,total,agFee,gkgF,gkgB,gkgL,gegner,gesamt:total+(agFee?.total||0)+gkgB+(gegner||0)};
}

// ─── Tab-Definitionen mit Icon-Namen ────────────────────────────
const TABS=[
  {id:"rechner", icon:"scales",  label:"Gebührenrechner"},
  {id:"teil",    icon:"percent", label:"Teilunterliegen"},
  {id:"honorar", icon:"clock",   label:"Honorarvergleich"},
  {id:"embed",   icon:"link",    label:"Embed-Widget"},
];

export default function App(){
  const[tab,setTab]=useState("rechner");
  const[rawSW,setRawSW]=useState("");
  const[vfId,setVfId]=useState("arbg");
  const[yr,setYr]=useState("2025");
  const[term,setTerm]=useState(true);
  const[ein,setEin]=useState(false);
  const[mwst,setMwst]=useState(true);
  const[anr,setAnr]=useState(false);
  const[unterliegen,setUnterliegen]=useState(50);
  const[stunden,setStunden]=useState("10");
  const[stundensatz,setStundensatz]=useState("250");
  const[pdfLoading,setPdfLoading]=useState(false);
  const[copied,setCopied]=useState(false);

  // Widget-Farbkonfigurator
  const[wHdr,setWHdr]=useState("#7A6528");
  const[wHdrTxt,setWHdrTxt]=useState("#FFFFFF");
  const[wBody,setWBody]=useState("#F0EAD9");
  const[wBodyTxt,setWBodyTxt]=useState("#2C2820");
  const[wBtn,setWBtn]=useState("#7A6528");
  const[wBtnTxt,setWBtnTxt]=useState("#FFFFFF");
  const[wFtr,setWFtr]=useState("#FFFFFF");
  const[wFtrTxt,setWFtrTxt]=useState("#7A6528");

  const sw=useMemo(()=>pSW(rawSW),[rawSW]);
  const vf=VF.find(v=>v.id===vfId);
  const rvgT=yr==="2025"?T25:T21;
  const gkgT=yr==="2025"?G25:G21;
  const R=useMemo(()=>sw>0?calcR(sw,vf,rvgT,gkgT,{term,ein,mwst,anr}):null,[sw,vf,rvgT,gkgT,term,ein,mwst,anr]);

  const TU=useMemo(()=>{
    if(!R||!R.gesamt)return null;
    const q=unterliegen/100;
    const meinAnw=R.total*q+(R.agFee?.total||0)*q;
    const gegnerAnw=R.gegner?(R.gegner*(1-q)):0;
    const gkgMein=R.gkgB*q;
    return{q,meinAnw,gegnerAnw,gkgMein,gesamt:meinAnw+gegnerAnw+gkgMein};
  },[R,unterliegen]);

  const HV=useMemo(()=>{
    if(!R)return null;
    const h=parseFloat(stunden)||0,s=parseFloat(stundensatz)||0;
    const st=h*s*(mwst?1.19:1);
    return{st,rvg:R.total,diff:st-R.total,rvgBesser:st>R.total};
  },[R,stunden,stundensatz,mwst]);


  const exportPDF=useCallback(async()=>{
    if(!R)return;setPdfLoading(true);
    const load=src=>new Promise((res,rej)=>{if(document.querySelector(`script[src="${src}"]`))return res();const s=document.createElement("script");s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s);});
    await load("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    await load("https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js");
    const{jsPDF}=window.jspdf;
    const doc=new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
    const W=210,M=18;let y=0;
    const gold=[122,101,40],cream=[240,234,217],dark=[26,23,20],muted=[107,99,86],white=[255,255,255],bd=[221,213,192];
    doc.setFillColor(...gold);doc.rect(0,0,W,30,"F");
    doc.setFont("helvetica","bold");doc.setFontSize(18);doc.setTextColor(...white);doc.text("RVG Gebührenrechner",M,13);
    doc.setFont("helvetica","normal");doc.setFontSize(8.5);doc.setTextColor(200,185,145);
    doc.text(`${yr==="2025"?"KostBRÄG 2025 (ab 01.06.2025)":"KostRÄG 2021"}  ·  ${new Date().toLocaleDateString("de-DE")}  ·  APOS Legal`,M,21);
    doc.setTextColor(160,140,100);doc.text("www.gekuendigt-abfindung.de",M,27);
    y=37;
    doc.setFillColor(...cream);doc.roundedRect(M,y,W-2*M,22,2,2,"F");doc.setDrawColor(...bd);doc.setLineWidth(.25);doc.roundedRect(M,y,W-2*M,22,2,2,"S");
    doc.setFont("helvetica","bold");doc.setFontSize(8);doc.setTextColor(...gold);doc.text("BERECHNUNGSPARAMETER",M+4,y+6);
    const ps=[[`Streitwert: ${eur(sw)}`,`Verfahren: ${vf.label}`],[`1,0-Gebühr: ${eur(R.g1)}`,`MwSt.: ${mwst?"19% ausgewiesen":"nicht ausgewiesen"}`],[`Terminsgebühr: ${term&&vf.hasTerm?"Ja":"Nein"}`,`Einigungsgebühr: ${ein?"Ja":"Nein"}`]];
    ps.forEach(([a,b],i)=>{doc.setFont("helvetica","normal");doc.setFontSize(8.5);doc.setTextColor(...dark);doc.text(a,M+4,y+12+i*4);doc.text(b,M+90,y+12+i*4);});
    y+=28;
    const aH=t=>{y+=3;doc.setFillColor(...gold);doc.rect(M,y,W-2*M,7,"F");doc.setFont("helvetica","bold");doc.setFontSize(8.5);doc.setTextColor(...white);doc.text(t,M+3,y+4.8);y+=9;};
    const aT=(h,r,ft=null)=>{doc.autoTable({startY:y,margin:{left:M,right:M},head:[h],body:r,foot:ft?[ft]:[],showFoot:ft?"lastPage":"never",theme:"plain",headStyles:{fillColor:cream,textColor:muted,fontSize:7,fontStyle:"bold",cellPadding:{top:2,bottom:2,left:3,right:3},lineWidth:.15,lineColor:bd},bodyStyles:{fontSize:8,cellPadding:{top:2.5,bottom:2.5,left:3,right:3},lineWidth:.1,lineColor:bd,textColor:dark},footStyles:{fillColor:dark,textColor:[255,243,200],fontStyle:"bold",fontSize:9,cellPadding:{top:3,bottom:3,left:3,right:3}},alternateRowStyles:{fillColor:[249,246,240]},columnStyles:{0:{cellWidth:34},2:{halign:"right",cellWidth:14},3:{halign:"right",cellWidth:28,fontStyle:"bold"}}});y=doc.lastAutoTable.finalY+2;};
    if(R.agFee){aH("Ang. 1: Außergerichtliche Tätigkeit (§ 15 RVG)");aT(["Rechtsgrundlage","Position","Satz","Betrag"],[["Nr. 2300 VV RVG","Geschäftsgebühr","1,3",eur(R.agFee.betrag)],["Nr. 7002 VV RVG","Auslagenpauschale (20%, max. 20€)","—",eur(R.agFee.ausl)],...(mwst?[["Nr. 7008 VV RVG","Umsatzsteuer 19%","19%",eur(R.agFee.mwstB)]]:[])]  ,["","Außergerichtl. Angelegenheit gesamt","",eur(R.agFee.total)]);}
    aH((R.agFee?"Ang. 2: ":"")+"Anwaltsgebühren – "+vf.kurz);
    const fr=R.items.map(it=>[it.nr,it.lbl,it.f>0?it.f.toFixed(1):it.f.toFixed(2),eur(it.b)]);
    fr.push(["Nr. 7002 VV RVG","Auslagenpauschale (20%, max. 20€)","—",eur(R.ausl)]);
    if(mwst)fr.push(["Nr. 7008 VV RVG","Umsatzsteuer 19%","19%",eur(R.mwstB)]);
    aT(["Rechtsgrundlage","Gebührenposition","Satz","Betrag"],fr,["","Anwaltsgebühren gesamt (brutto)","",eur(R.total)]);
    if(vf.note){doc.setFontSize(7.5);doc.setTextColor(100,70,0);doc.setFont("helvetica","italic");doc.text("Hinweis: "+vf.note,M,y+3,{maxWidth:W-2*M});y+=10;}
    if(vf.hasGKG){aH("Gerichtskosten (GKG)");aT(["Rechtsgrundlage","Position","Satz","Betrag"],[["Anlage 1 GKG",R.gkgL,R.gkgF.toFixed(1),eur(R.gkgB)]],["","Gerichtskosten gesamt","",eur(R.gkgB)]);}
    if(R.gegner!==null){aH("Gegnerische Anwaltskosten (§ 91 ZPO)");aT(["Rechtsgrundlage","Position","Satz","Betrag"],[["RVG","Verfahrens-/Terminsgebühr"+(mwst?" inkl. MwSt.":""),"—",eur(R.gegner)]],["","Gegnerische Kosten gesamt (geschätzt)","",eur(R.gegner)]);}
    if(TU&&vf.isG){aH(`Teilunterliegen ${unterliegen}% – § 92 ZPO`);aT(["Position","Anteil","Betrag"],[["Eigene Anwaltskosten",unterliegen+"%","~"+eur(TU.meinAnw)],R.gegner!==null&&["Gegneranwaltskosten (zu tragen)",(100-unterliegen)+"%","~"+eur(TU.gegnerAnw)],[`Gerichtskosten (${unterliegen}%)`,unterliegen+"%","~"+eur(TU.gkgMein)]].filter(Boolean),["","Effektive Kostenbelastung gesamt","~"+eur(TU.gesamt)]);}
    y+=4;doc.setFillColor(...dark);doc.roundedRect(M,y,W-2*M,34,2,2,"F");
    doc.setFont("helvetica","bold");doc.setFontSize(10);doc.setTextColor(...white);doc.text("Gesamtprozesskostenrisiko",M+4,y+8);
    doc.setDrawColor(...gold);doc.setLineWidth(.3);doc.line(M+4,y+10.5,W-M-4,y+10.5);
    const si=[R.agFee&&["Außergerichtl.",eur(R.agFee.total)],["Anwaltskosten",eur(R.total)],vf.hasGKG&&["Gerichtskosten",eur(R.gkgB)],R.gegner!==null&&["Gegner §91",eur(R.gegner)]].filter(Boolean);
    const iW=(W-2*M-8)/si.length;
    si.forEach(([l,v],i)=>{const px=M+4+i*(iW+1);doc.setFont("helvetica","normal");doc.setFontSize(6.5);doc.setTextColor(160,140,100);doc.text(l.toUpperCase(),px,y+16);doc.setFont("helvetica","bold");doc.setFontSize(8.5);doc.setTextColor(220,200,120);doc.text(v,px,y+22);});
    doc.setFont("helvetica","bold");doc.setFontSize(7.5);doc.setTextColor(160,140,100);doc.text("GESAMT",M+4,y+30);
    doc.setFontSize(13);doc.setTextColor(255,243,200);doc.text(eur(R.gesamt),M+25,y+30);y+=40;
    const pN=doc.getNumberOfPages();
    for(let i=1;i<=pN;i++){doc.setPage(i);doc.setFillColor(...cream);doc.rect(0,284,W,13,"F");doc.setDrawColor(...bd);doc.setLineWidth(.2);doc.line(M,284.5,W-M,284.5);doc.setFont("helvetica","normal");doc.setFontSize(6.5);doc.setTextColor(...muted);doc.text("APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG  ·  Fachanwalt Fatih Bektas  ·  www.gekuendigt-abfindung.de",M,291);doc.text(`Seite ${i}/${pN}`,W-M,291,{align:"right"});doc.setTextColor(...gold);doc.text("Berechnung unverbindlich gem. § 3a RVG",W/2,291,{align:"center"});}
    doc.save(`RVG_${vf.kurz}_${Math.round(sw)}EUR_${new Date().toISOString().slice(0,10)}.pdf`);
    setPdfLoading(false);
  },[R,vf,sw,yr,term,ein,mwst,anr,TU,unterliegen]);

  const embedCode=`<!-- RVG Rechner Widget – APOS Legal | www.gekuendigt-abfindung.de -->
<div style="border:1px solid #DDD5C0;border-radius:8px;overflow:hidden;font-family:system-ui,sans-serif;max-width:480px;box-shadow:0 2px 12px rgba(0,0,0,.07);">
  <div style="background:${wHdr};padding:14px 18px;">
    <div style="font-size:10px;letter-spacing:.1em;color:${wHdrTxt};opacity:0.7;margin-bottom:3px;text-transform:uppercase;">Kostenloser Gebührenrechner</div>
    <div style="font-size:17px;font-weight:700;color:${wHdrTxt};">RVG Prozesskostenrechner 2025</div>
  </div>
  <div style="padding:16px 18px;background:${wBody};">
    <p style="margin:0 0 6px;font-size:13px;color:${wBodyTxt};line-height:1.6;">
      Berechnen Sie Anwalts- &amp; Gerichtskosten nach <strong>RVG 2025 (KostBRÄG 2025)</strong>.<br>
      Inkl. gegnerischer Kosten, Teilunterliegen &amp; Gesamtprozesskostenrisiko.
    </p>
    <ul style="margin:0 0 14px;padding-left:16px;font-size:12px;color:${wBodyTxt};opacity:0.75;line-height:1.8;">
      <li>ArbG, AG, LG, LAG, OLG &amp; außergerichtlich</li>
      <li>Anrechnung außergerichtlicher Gebühren</li>
      <li>PDF-Export</li>
    </ul>
    <a href="https://www.gekuendigt-abfindung.de/rvg-rechner"
       target="_blank" rel="noopener"
       style="display:inline-block;background:${wBtn};color:${wBtnTxt};padding:10px 20px;border-radius:6px;font-weight:700;font-size:13px;text-decoration:none;">
      Zum kostenlosen RVG-Rechner &rarr;
    </a>
  </div>
  <div style="background:${wFtr};padding:9px 18px;border-top:1px solid #DDD5C0;display:flex;align-items:center;justify-content:space-between;">
    <span style="font-size:10px;color:${wFtrTxt};opacity:0.6;">Powered by</span>
    <a href="https://www.gekuendigt-abfindung.de"
       target="_blank" rel="noopener"
       style="font-size:11px;font-weight:700;color:${wFtrTxt};text-decoration:none;">
      APOS Legal – Fachanwalt für Arbeitsrecht
    </a>
  </div>
</div>`;

  // ── Style helpers ──────────────────────────────────────────────
  const card=(e={})=>({background:D.white,borderRadius:8,border:`1px solid ${D.border}`,boxShadow:`0 1px 8px ${D.shadow}`,overflow:"hidden",...e});
  const cH={background:D.cream,borderBottom:`1px solid ${D.border}`,padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"};
  const sT={fontFamily:"'Playfair Display',Georgia,serif",fontSize:15,fontWeight:700,color:D.dark,display:"flex",alignItems:"center",gap:8};
  const lbl={display:"block",fontSize:10,fontWeight:700,color:D.muted,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5};
  const inp={width:"100%",padding:"9px 13px",fontSize:16,fontWeight:700,color:D.dark,border:`1.5px solid ${D.border}`,borderRadius:6,background:"#FDFAF4",outline:"none",fontFamily:"'IBM Plex Mono',monospace",transition:"border-color .15s",boxSizing:"border-box"};
  const sel={width:"100%",padding:"9px 13px",fontSize:13,color:D.dark,border:`1.5px solid ${D.border}`,borderRadius:6,background:"#FDFAF4",outline:"none",boxSizing:"border-box"};
  const ck={display:"flex",alignItems:"flex-start",gap:8,cursor:"pointer",fontSize:13,color:D.text,userSelect:"none",padding:"3px 0",lineHeight:1.5};
  const th=(r=false)=>({padding:"8px 12px",background:D.cream,borderBottom:`2px solid ${D.border}`,color:D.muted,fontSize:10,fontWeight:700,letterSpacing:".06em",textTransform:"uppercase",textAlign:r?"right":"left",whiteSpace:"nowrap"});
  const td=(r=false,mono=false,gold=false,bold=false,anr=false)=>({padding:"9px 12px",borderBottom:`1px solid ${D.borderL}`,textAlign:r?"right":"left",fontFamily:mono?"'IBM Plex Mono',monospace":"inherit",color:anr?D.amber:gold?D.gold:D.text,fontWeight:bold||anr?700:400,fontSize:mono?12:13,verticalAlign:"middle"});
  const btnG=(sm=false)=>({display:"inline-flex",alignItems:"center",gap:7,background:D.gold,color:D.white,border:"none",borderRadius:6,padding:sm?"7px 14px":"10px 20px",fontSize:sm?12:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"});
  const btnO=(sm=false)=>({display:"inline-flex",alignItems:"center",gap:7,background:"transparent",color:D.gold,border:`1.5px solid ${D.gold}`,borderRadius:6,padding:sm?"6px 13px":"9px 19px",fontSize:sm?12:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"});
  const pill=(a)=>({cursor:"pointer",borderRadius:20,padding:"4px 13px",fontSize:11,fontWeight:a?700:500,background:a?D.gold:"transparent",color:a?D.white:D.muted,border:`1.5px solid ${a?D.gold:D.border}`,transition:"all .15s",whiteSpace:"nowrap",fontFamily:"inherit"});

  // Icon with gold color for section headers
  const GoldIco=({name,size=14})=><span style={{color:D.gold,display:"inline-flex",alignItems:"center"}}><Ico name={name} size={size}/></span>;
  // Icon with muted color for tab bar (inactive) or white (active)
  const TabIco=({name,active})=><span style={{color:active?D.white:"#C4B08A",display:"inline-flex",alignItems:"center"}}><Ico name={name} size={13}/></span>;

  return(
    <div style={{fontFamily:"'Inter',system-ui,sans-serif",background:D.cream,minHeight:"100vh",paddingBottom:56}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;700&display=swap');
        *{box-sizing:border-box;}
        input:focus,select:focus,textarea:focus{border-color:${D.gold}!important;box-shadow:0 0 0 3px rgba(122,101,40,.15)!important;}
        .rh:hover td{background:${D.goldBg}!important;}
        .bg:hover{background:${D.goldH}!important;}
        .bo:hover{background:${D.goldBg}!important;}
        input[type=range]{-webkit-appearance:none;appearance:none;height:6px;background:${D.creamD};border-radius:3px;outline:none;cursor:pointer;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;background:${D.gold};border-radius:50%;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.2);}
        textarea{resize:vertical;font-family:inherit;}
        @keyframes rvg-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @media(max-width:600px){.g2{grid-template-columns:1fr!important;}.gtabs{overflow-x:auto!important;}}
      `}</style>

      {/* ── TAB BAR + PDF ── */}
      <div style={{maxWidth:960,margin:"0 auto",padding:"24px 20px 0"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div className="gtabs" style={{display:"flex",gap:0,overflowX:"auto",borderBottom:`2px solid ${D.border}`,flex:1}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                style={{display:"inline-flex",alignItems:"center",gap:6,padding:"11px 16px",fontSize:13,fontWeight:tab===t.id?700:500,color:tab===t.id?D.gold:D.muted,background:"transparent",border:"none",borderBottom:tab===t.id?`3px solid ${D.gold}`:"3px solid transparent",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",transition:"all .15s",letterSpacing:"0.01em",marginBottom:-2}}>
                <span style={{color:tab===t.id?D.gold:D.muted,display:"inline-flex",alignItems:"center"}}><Ico name={t.icon} size={13}/></span>
                {t.label}
              </button>
            ))}
          </div>
          {R&&(
            <button onClick={exportPDF} disabled={pdfLoading} className="bg" style={{...btnG(),opacity:pdfLoading?.6:1}}>
              {pdfLoading?<Ico name="spinner" size={15} style={{color:D.white}}/>:<Ico name="download" size={15} style={{color:D.white}}/>}
              {pdfLoading?"Generiere…":"PDF exportieren"}
            </button>
          )}
        </div>
      </div>

      <div style={{maxWidth:960,margin:"0 auto",padding:"0 20px"}}>

      {/* ═══ TAB: RECHNER ═══ */}
      {tab==="rechner"&&<>
        <div style={{...card(),marginTop:24}}>
          <div style={cH}>
            <span style={sT}><GoldIco name="sliders"/> Berechnungsparameter</span>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              {[["2025","KostBRÄG 2025"],["2021","KostRÄG 2021"]].map(([y,l])=>(
                <button key={y} onClick={()=>setYr(y)} style={pill(yr===y)}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{padding:"20px 20px 16px"}}>
            <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              <div>
                <label style={lbl}>Streitwert / Gegenstandswert</label>
                <div style={{position:"relative"}}>
                  <input type="text" inputMode="decimal" value={rawSW} onChange={e=>setRawSW(e.target.value.replace(/[^\d,.]/g,""))} placeholder="z. B. 15.000" style={inp}/>
                  <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:D.muted,fontWeight:700}}>€</span>
                </div>
                {R&&<div style={{fontSize:11,color:D.gold,marginTop:4,fontWeight:600}}>1,0-Gebühr ({yr}): {eur(R.g1)}</div>}
              </div>
              <div>
                <label style={lbl}>Verfahrensart / Instanz</label>
                <select value={vfId} onChange={e=>{setVfId(e.target.value);setTerm(true);setEin(false);setAnr(false);}} style={sel}>
                  <optgroup label="── Außergerichtlich"><option value="ag_">Außergerichtliche Tätigkeit</option></optgroup>
                  <optgroup label="── 1. Instanz"><option value="arbg">Arbeitsgericht – 1. Instanz (ArbG)</option><option value="ag">Amtsgericht – 1. Instanz (AG)</option><option value="lg">Landgericht – 1. Instanz (LG)</option></optgroup>
                  <optgroup label="── 2. Instanz"><option value="lag">Landesarbeitsgericht – Berufung (LAG)</option><option value="olg">Oberlandesgericht – Berufung (OLG)</option></optgroup>
                </select>
              </div>
            </div>
            <div style={{borderTop:`1px solid ${D.border}`,paddingTop:14}}>
              <label style={lbl}>Optionen</label>
              <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
                {vf.hasTerm&&<label style={ck}><input type="checkbox" checked={term} onChange={e=>setTerm(e.target.checked)} style={{accentColor:D.gold,marginTop:3}}/> Terminsgebühr (Nr. 3104 VV)</label>}
                {vf.hasEin&&<label style={ck}><input type="checkbox" checked={ein} onChange={e=>setEin(e.target.checked)} style={{accentColor:D.gold,marginTop:3}}/> {vf.isG?`Gerichtl. Vergleich / Einigungsgebühr (${vf.einNr}, ${vf.einF.toFixed(1)})`:` Einigungsgebühr (${vf.einNr}, ${vf.einF.toFixed(1)})`}</label>}
                <label style={ck}><input type="checkbox" checked={mwst} onChange={e=>setMwst(e.target.checked)} style={{accentColor:D.gold,marginTop:3}}/> Umsatzsteuer 19 %</label>
                {vf.isG&&<label style={ck}><input type="checkbox" checked={anr} onChange={e=>setAnr(e.target.checked)} style={{accentColor:D.gold,marginTop:3}}/><span>Vorherige außergerichtl. Tätigkeit <span style={{color:D.muted,fontSize:11}}>(–0,65 Anrechnung, Vorb. 3 Abs. 4 VV)</span></span></label>}
              </div>
            </div>
          </div>
        </div>

        {!R&&<div style={{...card(),marginTop:20,padding:"48px 20px",textAlign:"center"}}>
          <div style={{color:D.gold,marginBottom:12,display:"flex",justifyContent:"center"}}><Ico name="scales" size={40}/></div>
          <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:17,color:D.dark,marginBottom:5}}>Streitwert eingeben</div>
          <div style={{fontSize:13,color:D.muted}}>Gebühren werden sofort berechnet.</div>
        </div>}

        {R&&<>
          {/* Außergerichtlich */}
          {R.agFee&&<div style={{...card(),marginTop:20}}>
            <div style={cH}>
              <span style={sT}><GoldIco name="doc"/> Ang. 1: Außergerichtliche Tätigkeit</span>
              <span style={{fontSize:11,color:D.muted}}>eigene Angelegenheit · § 15 RVG</span>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr>{["Rechtsgrundlage","Position","Satz","Betrag"].map((h,i)=><th key={h} style={th(i>=2)}>{h}</th>)}</tr></thead>
                <tbody>
                  <tr className="rh"><td style={{...td(false,true)}}><small style={{color:D.muted}}>Nr. 2300 VV RVG</small></td><td style={td()}>Geschäftsgebühr</td><td style={td(true,true)}>1,3</td><td style={td(true,true,false,true)}>{eur(R.agFee.betrag)}</td></tr>
                  <tr className="rh"><td style={{...td(false,true)}}><small style={{color:D.muted}}>Nr. 7002 VV RVG</small></td><td style={td()}>Auslagenpauschale (20%, max. 20,00 €)</td><td style={td(true,true)}>—</td><td style={td(true,true,false,true)}>{eur(R.agFee.ausl)}</td></tr>
                  {mwst&&<tr className="rh"><td style={{...td(false,true)}}><small style={{color:D.muted}}>Nr. 7008 VV RVG</small></td><td style={td()}>Umsatzsteuer 19 %</td><td style={td(true,true)}>19 %</td><td style={td(true,true,false,true)}>{eur(R.agFee.mwstB)}</td></tr>}
                  <tr style={{background:D.gold}}><td colSpan={3} style={{padding:"10px 12px",color:D.white,fontWeight:700,fontSize:13}}>Außergerichtliche Angelegenheit gesamt</td><td style={{padding:"10px 12px",textAlign:"right",fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,fontSize:15,color:"#FFF3CC"}}>{eur(R.agFee.total)}</td></tr>
                </tbody>
              </table>
            </div>
            <div style={{padding:"8px 20px",fontSize:11,color:D.muted,background:D.cream}}>Anrechnung gem. Vorb. 3 Abs. 4 VV RVG (0,65) auf Ang. 2 · Auslagenpauschale entsteht je Angelegenheit separat</div>
          </div>}

          {/* Gerichtlich */}
          <div style={{...card(),marginTop:16}}>
            <div style={cH}>
              <span style={sT}><GoldIco name="list"/> {R.agFee?"Ang. 2: ":""}Anwaltsgebühren – {vf.kurz}</span>
              <span style={{fontSize:11,color:D.muted}}>1,0-Gebühr: <strong style={{color:D.gold}}>{eur(R.g1)}</strong></span>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr>{["Rechtsgrundlage","Gebührenposition","Satz","Betrag"].map((h,i)=><th key={h} style={th(i>=2)}>{h}</th>)}</tr></thead>
                <tbody>
                  {R.items.map((it,i)=><tr key={i} className="rh"><td style={{...td(false,true)}}><small style={{color:D.muted,fontFamily:"'IBM Plex Mono',monospace"}}>{it.nr}</small></td><td style={td(false,false,false,false,it.anr)}>{it.lbl}</td><td style={{...td(true,true),color:it.anr?D.amber:D.muted}}>{it.f>0?it.f.toFixed(1):it.f.toFixed(2)}</td><td style={{...td(true,true,false,true),color:it.anr?D.amber:D.dark}}>{eur(it.b)}</td></tr>)}
                  <tr className="rh"><td style={{...td(false,true)}}><small style={{color:D.muted,fontFamily:"'IBM Plex Mono',monospace"}}>Nr. 7002 VV RVG</small></td><td style={td()}>Auslagenpauschale (20%, max. 20,00 €)</td><td style={td(true,true)}>—</td><td style={td(true,true,false,true)}>{eur(R.ausl)}</td></tr>
                  <tr style={{background:D.cream}}><td colSpan={3} style={{padding:"8px 12px",fontWeight:700,color:D.dark,fontSize:13}}>Zwischensumme netto</td><td style={{padding:"8px 12px",textAlign:"right",fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,color:D.dark}}>{eur(R.netto)}</td></tr>
                  {mwst&&<tr className="rh"><td style={{...td(false,true)}}><small style={{color:D.muted,fontFamily:"'IBM Plex Mono',monospace"}}>Nr. 7008 VV RVG</small></td><td style={td()}>Umsatzsteuer 19 %</td><td style={td(true,true)}>19 %</td><td style={td(true,true,false,true)}>{eur(R.mwstB)}</td></tr>}
                  <tr style={{background:D.dark}}><td colSpan={3} style={{padding:"11px 12px",color:D.white,fontWeight:700,fontSize:14}}>Anwaltsgebühren gesamt (brutto)</td><td style={{padding:"11px 12px",textAlign:"right",fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,fontSize:15,color:"#FFF3CC"}}>{eur(R.total)}</td></tr>
                </tbody>
              </table>
            </div>
            {vf.note&&(
              <div style={{margin:"12px 20px",padding:"10px 14px",background:D.amberBg,border:`1px solid #FDE68A`,borderLeft:`4px solid ${D.amber}`,borderRadius:"0 6px 6px 0",fontSize:12,color:"#92400E",display:"flex",gap:8,alignItems:"flex-start"}}>
                <span style={{color:D.amber,flexShrink:0,marginTop:1}}><Ico name="warn" size={14}/></span>{vf.note}
              </div>
            )}
          </div>

          {/* GKG */}
          {vf.hasGKG&&<div style={{...card(),marginTop:14}}>
            <div style={cH}>
              <span style={sT}><GoldIco name="columns"/> Gerichtskosten (GKG)</span>
              <span style={{fontSize:11,color:D.muted}}>1,0-GKG ({yr}): <strong style={{color:D.gold}}>{eur(lkp(sw,gkgT))}</strong></span>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr>{["Rechtsgrundlage","Position","Satz","Betrag"].map((h,i)=><th key={h} style={th(i>=2)}>{h}</th>)}</tr></thead>
                <tbody>
                  <tr className="rh"><td style={{...td(false,true)}}><small style={{color:D.muted,fontFamily:"'IBM Plex Mono',monospace"}}>Anlage 1 GKG</small></td><td style={td()}>{R.gkgL}</td><td style={td(true,true)}>{R.gkgF.toFixed(1)}</td><td style={td(true,true,false,true)}>{eur(R.gkgB)}</td></tr>
                  {R.gkgF===0&&<tr><td colSpan={4} style={{padding:"8px 12px",background:"#F0FFF4",fontSize:12,display:"flex",alignItems:"center",gap:6}}><span style={{color:D.green}}><Ico name="check" size={13}/></span><span style={{color:"#166534"}}>Keine Gerichtsgebühren bei Vergleich in der Güteverhandlung (§ 54 Abs. 2 ArbGG)</span></td></tr>}
                  <tr style={{background:D.dark}}><td colSpan={3} style={{padding:"11px 12px",color:D.white,fontWeight:700,fontSize:14}}>Gerichtskosten gesamt</td><td style={{padding:"11px 12px",textAlign:"right",fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,fontSize:15,color:"#FFF3CC"}}>{eur(R.gkgB)}</td></tr>
                </tbody>
              </table>
            </div>
          </div>}

          {/* Gegner */}
          {R.gegner!==null&&<div style={{...card(),marginTop:14}}>
            <div style={cH}>
              <span style={sT}><GoldIco name="shield"/> Gegnerische Anwaltskosten (§ 91 ZPO)</span>
              <span style={{fontSize:11,color:D.muted}}>bei vollem Unterliegen</span>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr>{["Rechtsgrundlage","Position","Satz","Betrag"].map((h,i)=><th key={h} style={th(i>=2)}>{h}</th>)}</tr></thead>
                <tbody>
                  <tr className="rh"><td style={{...td(false,true)}}><small style={{color:D.muted,fontFamily:"'IBM Plex Mono',monospace"}}>RVG</small></td><td style={td()}>Verfahrens-/Terminsgebühr {mwst?"inkl. MwSt. ":""}(gegnerischer Anwalt)</td><td style={td(true,true)}>—</td><td style={td(true,true,false,true)}>{eur(R.gegner)}</td></tr>
                  <tr style={{background:"#2C3240"}}><td colSpan={3} style={{padding:"11px 12px",color:D.white,fontWeight:700,fontSize:14}}>Gegnerische Kosten gesamt (geschätzt)</td><td style={{padding:"11px 12px",textAlign:"right",fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,fontSize:15,color:"#FFF3CC"}}>{eur(R.gegner)}</td></tr>
                </tbody>
              </table>
            </div>
            <div style={{padding:"7px 20px",fontSize:11,color:D.muted,background:D.cream}}>Einigungsgebühr fällt nur einmal an · Teilunterliegen → Tab &bdquo;Teilunterliegen&ldquo;</div>
          </div>}

          {/* Gesamtübersicht */}
          <div style={{background:D.dark,borderRadius:8,padding:"22px 22px 18px",marginTop:14}}>
            <div style={{fontSize:9,color:"#8B7B5A",letterSpacing:".12em",textTransform:"uppercase",marginBottom:12}}>{vf.isG?"Prozesskostenrisiko – Gesamtübersicht":"Gesamtkosten"}</div>
            <div style={{display:"grid",gridTemplateColumns:`repeat(${[true,R.agFee,vf.hasGKG,R.gegner!==null,true].filter(Boolean).length},1fr)`,gap:10}}>
              {[["Anwaltskosten",eur(R.total),mwst?"inkl. MwSt.":"netto"],R.agFee&&["Außergerichtl.",eur(R.agFee.total),"eigene Ang."],vf.hasGKG&&["Gerichtskosten",eur(R.gkgB),R.gkgF.toFixed(1)+" GKG"],R.gegner!==null&&["Gegner §91",eur(R.gegner),"geschätzt"],[vf.isG?"Gesamtrisiko":"Gesamt",eur(R.gesamt),"alle Positionen",true]].filter(Boolean).map(([l,v,s,big],i)=>(
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{fontSize:8,color:"#8B7B5A",letterSpacing:".1em",textTransform:"uppercase",marginBottom:5}}>{l}</div>
                  <div style={{fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,fontSize:big?20:15,color:big?"#FFF3CC":D.gold}}>{v}</div>
                  <div style={{fontSize:9,color:"#6B5B3E",marginTop:3}}>{s}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{...card(),marginTop:10}}>
            <div style={{padding:"10px 20px",display:"flex",gap:8,alignItems:"flex-start"}}>
              <span style={{color:D.muted,flexShrink:0,marginTop:1}}><Ico name="info" size={13}/></span>
              <p style={{fontSize:10,color:D.muted,lineHeight:1.8,margin:0}}><strong style={{color:D.text}}>Rechtsgrundlagen:</strong> RVG i.d.F. KostBRÄG 2025 (BGBl. 2025 I Nr. 109) ab 01.06.2025 (+6% Wertgebühren) bzw. KostRÄG 2021. Nr. 7002 VV RVG (20%, max. 20€). Einigungsgebühr gerichtl.: Nr. 1003 VV (1,0); außergerichtl.: Nr. 1000 VV (1,5). Anrechnung: Vorb. 3 Abs. 4 VV. Berechnung unverbindlich, § 3a RVG.</p>
            </div>
          </div>
        </>}
      </>}

      {/* ═══ TAB: TEILUNTERLIEGEN ═══ */}
      {tab==="teil"&&<div style={{marginTop:24}}>
        <div style={card()}>
          <div style={cH}><span style={sT}><GoldIco name="percent"/> Teilunterliegen nach § 92 ZPO</span></div>
          <div style={{padding:"24px 20px"}}>
            {!R?<div style={{textAlign:"center",color:D.muted,padding:"32px 0"}}>Bitte zuerst im Tab &bdquo;Gebührenrechner&ldquo; einen Streitwert eingeben.</div>:<>
              <div style={{marginBottom:24}}>
                <label style={lbl}>Mein Unterliegen: <strong style={{color:D.gold,fontSize:16,textTransform:"none",letterSpacing:0}}>{unterliegen} %</strong></label>
                <input type="range" min={0} max={100} step={5} value={unterliegen} onChange={e=>setUnterliegen(+e.target.value)} style={{width:"100%",marginBottom:6}}/>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:D.muted}}>
                  <span>0% – Volles Obsiegen</span><span>50% – Halb/halb</span><span>100% – Volles Unterliegen</span>
                </div>
              </div>
              <div style={{height:20,display:"flex",borderRadius:4,overflow:"hidden",marginBottom:20}}>
                <div style={{width:`${unterliegen}%`,background:D.amber,transition:"width .3s"}}/>
                <div style={{width:`${100-unterliegen}%`,background:D.green,transition:"width .3s"}}/>
              </div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr><th style={th()}>Position</th><th style={th(true)}>Vollbetrag</th><th style={th(true)}>Mein Anteil ({unterliegen}%)</th><th style={th(true)}>Gegner trägt ({100-unterliegen}%)</th></tr></thead>
                  <tbody>
                    <tr className="rh"><td style={td()}>Eigene Anwaltskosten</td><td style={td(true,true)}>{eur(R.total)}</td><td style={{...td(true,true),color:D.amber,fontWeight:700}}>~{eur(R.total*unterliegen/100)}</td><td style={td(true,true)}>—</td></tr>
                    {R.agFee&&<tr className="rh"><td style={td()}>Außergerichtl. Anwaltskosten</td><td style={td(true,true)}>{eur(R.agFee.total)}</td><td style={{...td(true,true),color:D.amber,fontWeight:700}}>~{eur(R.agFee.total*unterliegen/100)}</td><td style={td(true,true)}>—</td></tr>}
                    {R.gegner!==null&&<tr className="rh"><td style={td()}>Gegneranwaltskosten (zu tragen)</td><td style={td(true,true)}>{eur(R.gegner)}</td><td style={{...td(true,true),color:D.amber,fontWeight:700}}>~{eur(R.gegner*(100-unterliegen)/100)}</td><td style={td(true,true)}>~{eur(R.gegner*unterliegen/100)}</td></tr>}
                    {vf.hasGKG&&<tr className="rh"><td style={td()}>Gerichtskosten</td><td style={td(true,true)}>{eur(R.gkgB)}</td><td style={{...td(true,true),color:D.amber,fontWeight:700}}>~{eur(R.gkgB*unterliegen/100)}</td><td style={td(true,true)}>~{eur(R.gkgB*(100-unterliegen)/100)}</td></tr>}
                    <tr style={{background:D.dark}}><td style={{padding:"11px 12px",color:D.white,fontWeight:700}}>Effektive Gesamtbelastung bei {unterliegen}% Unterliegen</td><td style={{padding:"11px 12px",textAlign:"right",fontFamily:"'IBM Plex Mono',monospace",color:"#8B7B5A"}}>{eur(R.gesamt)}</td><td style={{padding:"11px 12px",textAlign:"right",fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,fontSize:15,color:"#FFF3CC"}}>~{eur(TU?.gesamt)}</td><td style={{padding:"11px 12px",textAlign:"right",color:"#8B7B5A"}}>—</td></tr>
                  </tbody>
                </table>
              </div>
              <div style={{marginTop:14,padding:"11px 14px",background:D.amberBg,border:`1px solid #FDE68A`,borderRadius:6,fontSize:12,color:"#92400E",display:"flex",gap:8,alignItems:"flex-start"}}>
                <span style={{color:D.amber,flexShrink:0,marginTop:1}}><Ico name="info" size={13}/></span>
                <span><strong>§ 92 ZPO:</strong> Bei teilweisem Obsiegen werden die Kosten quotal aufgeteilt. Das Gericht kann bei annähernder Gleichheit die Kosten auch gegeneinander aufheben.{vf.id==="arbg"?" Bei ArbG 1. Instanz: § 12a ArbGG schließt Kostenerstattung für Anwaltsgebühren aus — Gerichtskosten folgen § 92 ZPO.":""}</span>
              </div>
            </>}
          </div>
        </div>
      </div>}

      {/* ═══ TAB: HONORARVERGLEICH ═══ */}
      {tab==="honorar"&&<div style={{marginTop:24}}>
        <div style={card()}>
          <div style={cH}><span style={sT}><GoldIco name="clock"/> Stundenhonorar vs. RVG-Regelsatz</span></div>
          <div style={{padding:"24px 20px"}}>
            {!R?<div style={{textAlign:"center",color:D.muted,padding:"32px 0"}}>Bitte zuerst im Tab &bdquo;Gebührenrechner&ldquo; einen Streitwert eingeben.</div>:<>
              <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
                <div>
                  <label style={lbl}>Geschätzte Stunden</label>
                  <input type="number" value={stunden} onChange={e=>setStunden(e.target.value)} min={0.5} step={0.5} style={{...inp,fontSize:18}}/>
                  <div style={{fontSize:11,color:D.muted,marginTop:4}}>Stunden anwaltlicher Tätigkeit</div>
                </div>
                <div>
                  <label style={lbl}>Stundensatz (netto, in €)</label>
                  <div style={{position:"relative"}}>
                    <input type="number" value={stundensatz} onChange={e=>setStundensatz(e.target.value)} min={50} step={10} style={{...inp,fontSize:18}}/>
                    <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:D.muted,fontWeight:700}}>€/h</span>
                  </div>
                  <div style={{fontSize:11,color:D.muted,marginTop:4}}>Vergütungsvereinbarung schriftlich: § 3a RVG</div>
                </div>
              </div>
              {HV&&<>
                <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
                  {[["RVG-Regelsatz",eur(HV.rvg),mwst?"inkl. MwSt.":"netto",D.gold],["Stundenhonorar",eur(HV.st),`${stunden}h × ${stundensatz}€${mwst?" inkl. MwSt.":""}`,D.muted],[HV.rvgBesser?"Vorteil RVG":"Vorteil Stunde",eur(Math.abs(HV.diff)),HV.rvgBesser?"RVG günstiger":"Stunde günstiger",HV.rvgBesser?D.green:D.amber]].map(([l,v,s,c],i)=>(
                    <div key={i} style={{flex:"1 1 140px",background:D.cream,borderRadius:8,border:`1px solid ${D.border}`,padding:"14px",textAlign:"center"}}>
                      <div style={{fontSize:9,color:D.muted,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{l}</div>
                      <div style={{fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,fontSize:16,color:c}}>{v}</div>
                      <div style={{fontSize:10,color:D.muted,marginTop:3}}>{s}</div>
                    </div>
                  ))}
                </div>
                <div style={{marginBottom:4,display:"flex",alignItems:"center",gap:8,fontSize:11,color:D.muted}}><span style={{width:10,height:10,background:D.gold,borderRadius:2,display:"inline-block"}}/>RVG</div>
                <div style={{height:6,background:D.creamD,borderRadius:3,marginBottom:8,overflow:"hidden"}}>
                  <div style={{width:`${Math.min((HV.rvg/Math.max(HV.rvg,HV.st))*100,100)}%`,height:"100%",background:D.gold,transition:"width .4s"}}/>
                </div>
                <div style={{marginBottom:4,display:"flex",alignItems:"center",gap:8,fontSize:11,color:D.muted}}><span style={{width:10,height:10,background:"#4B5563",borderRadius:2,display:"inline-block"}}/>Stundenhonorar</div>
                <div style={{height:6,background:D.creamD,borderRadius:3,marginBottom:16,overflow:"hidden"}}>
                  <div style={{width:`${Math.min((HV.st/Math.max(HV.rvg,HV.st))*100,100)}%`,height:"100%",background:"#4B5563",transition:"width .4s"}}/>
                </div>
                <div style={{padding:"12px 14px",background:HV.rvgBesser?"#F0FDF4":D.amberBg,border:`1px solid ${HV.rvgBesser?"#BBF7D0":"#FDE68A"}`,borderRadius:6,fontSize:13,color:HV.rvgBesser?"#166534":"#92400E",display:"flex",gap:8,alignItems:"flex-start"}}>
                  <span style={{flexShrink:0,marginTop:1,color:HV.rvgBesser?D.green:D.amber}}><Ico name={HV.rvgBesser?"check":"warn"} size={14}/></span>
                  <span>{HV.rvgBesser?`RVG-Regelsatz ist bei diesem Mandat um ${eur(HV.diff)} günstiger. Eine Vergütungsvereinbarung lohnt sich erst ab mehr als ${stunden}h Aufwand.`:`Stundenhonorar ist um ${eur(Math.abs(HV.diff))} günstiger. Eine Vergütungsvereinbarung gem. § 3a RVG wäre hier wirtschaftlich sinnvoller.`}</span>
                </div>
                <div style={{marginTop:12,padding:"11px 14px",background:D.cream,borderRadius:6,fontSize:11,color:D.muted,display:"flex",gap:8,alignItems:"flex-start"}}>
                  <span style={{flexShrink:0,marginTop:1,color:D.muted}}><Ico name="info" size={12}/></span>
                  <span><strong style={{color:D.text}}>Break-even-Stundensatz:</strong> Bei {stunden}h Aufwand rechnet sich der RVG-Regelsatz bis zu einem Stundensatz von <strong style={{color:D.gold}}>{eur(HV.rvg/parseFloat(stunden)/(mwst?1.19:1))}/h</strong> (netto).</span>
                </div>
              </>}
            </>}
          </div>
        </div>
      </div>}


      {/* ═══ TAB: EMBED WIDGET ═══ */}
      {tab==="embed"&&<div style={{marginTop:24}}>
        <div style={card()}>
          <div style={cH}><span style={sT}><GoldIco name="link"/> Embed-Widget &amp; Backlink-Strategie</span></div>
          <div style={{padding:"24px 20px"}}>
            <p style={{fontSize:13,color:D.muted,marginBottom:20,lineHeight:1.7}}>
              Dieses Widget können andere Webseiten einbetten. Jedes Widget enthält zwei Do-follow-Links zu <strong style={{color:D.gold}}>www.gekuendigt-abfindung.de</strong> — für starke, themenrelevante Backlinks.
            </p>

            {/* ── Farbkonfigurator ── */}
            <div style={{background:D.cream,border:`1px solid ${D.border}`,borderRadius:8,padding:"16px 20px",marginBottom:20}}>
              <div style={{fontSize:11,fontWeight:700,color:D.muted,letterSpacing:".08em",textTransform:"uppercase",marginBottom:14,display:"flex",alignItems:"center",gap:6}}>
                <GoldIco name="sliders"/> Farbanpassung
              </div>

              {/* 4 Bereiche, je Hintergrund + Schrift */}
              {[
                {label:"Header",      bg:wHdr, setBg:setWHdr, txt:wHdrTxt, setTxt:setWHdrTxt},
                {label:"Mittelteil",  bg:wBody,setBg:setWBody,txt:wBodyTxt,setTxt:setWBodyTxt},
                {label:"Button",      bg:wBtn, setBg:setWBtn, txt:wBtnTxt, setTxt:setWBtnTxt},
                {label:"Footer",      bg:wFtr, setBg:setWFtr, txt:wFtrTxt, setTxt:setWFtrTxt},
              ].map(({label,bg,setBg,txt,setTxt})=>(
                <div key={label} style={{marginBottom:14}}>
                  <div style={{fontSize:11,fontWeight:700,color:D.dark,marginBottom:8,letterSpacing:".04em"}}>{label}</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    {/* Hintergrund */}
                    <div>
                      <label style={{...lbl,marginBottom:5,fontSize:9}}>Hintergrund</label>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <input type="color" value={bg} onChange={e=>setBg(e.target.value)}
                          style={{width:32,height:32,padding:2,border:`1.5px solid ${D.border}`,borderRadius:5,cursor:"pointer",background:"none",flexShrink:0}}/>
                        <input type="text" value={bg} onChange={e=>{ if(/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) setBg(e.target.value); }}
                          style={{width:"100%",padding:"5px 8px",fontSize:12,fontFamily:"'IBM Plex Mono',monospace",color:D.dark,border:`1.5px solid ${D.border}`,borderRadius:5,background:D.white,outline:"none",boxSizing:"border-box"}}/>
                      </div>
                    </div>
                    {/* Schrift */}
                    <div>
                      <label style={{...lbl,marginBottom:5,fontSize:9}}>Schriftfarbe</label>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <input type="color" value={txt} onChange={e=>setTxt(e.target.value)}
                          style={{width:32,height:32,padding:2,border:`1.5px solid ${D.border}`,borderRadius:5,cursor:"pointer",background:"none",flexShrink:0}}/>
                        <input type="text" value={txt} onChange={e=>{ if(/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) setTxt(e.target.value); }}
                          style={{width:"100%",padding:"5px 8px",fontSize:12,fontFamily:"'IBM Plex Mono',monospace",color:D.dark,border:`1.5px solid ${D.border}`,borderRadius:5,background:D.white,outline:"none",boxSizing:"border-box"}}/>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Presets */}
              <div style={{borderTop:`1px solid ${D.border}`,paddingTop:12,marginTop:4}}>
                <div style={{fontSize:10,color:D.muted,fontWeight:700,letterSpacing:".06em",textTransform:"uppercase",marginBottom:8}}>Schnellauswahl</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {[
                    {name:"APOS Legal",    hdr:"#7A6528",hdrT:"#FFFFFF",body:"#F0EAD9",bodyT:"#2C2820",btn:"#7A6528",btnT:"#FFFFFF",ftr:"#FFFFFF",ftrT:"#7A6528"},
                    {name:"Dunkelblau",    hdr:"#0F172A",hdrT:"#FFFFFF",body:"#F1F5F9",bodyT:"#1E293B",btn:"#1D4ED8",btnT:"#FFFFFF",ftr:"#FFFFFF",ftrT:"#1D4ED8"},
                    {name:"Monochrom",     hdr:"#1A1A1A",hdrT:"#FFFFFF",body:"#F5F5F5",bodyT:"#1A1A1A",btn:"#1A1A1A",btnT:"#FFFFFF",ftr:"#FFFFFF",ftrT:"#1A1A1A"},
                    {name:"Grün",          hdr:"#166534",hdrT:"#FFFFFF",body:"#F0FDF4",bodyT:"#14532D",btn:"#16A34A",btnT:"#FFFFFF",ftr:"#FFFFFF",ftrT:"#166534"},
                    {name:"Hell / Minimal",hdr:"#F8F8F6",hdrT:"#1A1714",body:"#FFFFFF",bodyT:"#2C2820",btn:"#2C2820",btnT:"#FFFFFF",ftr:"#F8F8F6",ftrT:"#6B6356"},
                  ].map(p=>(
                    <button key={p.name} className="bo"
                      onClick={()=>{setWHdr(p.hdr);setWHdrTxt(p.hdrT);setWBody(p.body);setWBodyTxt(p.bodyT);setWBtn(p.btn);setWBtnTxt(p.btnT);setWFtr(p.ftr);setWFtrTxt(p.ftrT);}}
                      style={{...btnO(true),fontSize:11}}>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Live-Vorschau ── */}
            <label style={{...lbl,marginBottom:10}}>Live-Vorschau</label>
            <div style={{border:`2px dashed ${D.border}`,borderRadius:8,padding:20,background:D.creamD,marginBottom:20}}>
              <div style={{border:`1px solid ${D.border}`,borderRadius:8,overflow:"hidden",maxWidth:480,fontFamily:"system-ui,sans-serif",boxShadow:`0 2px 12px ${D.shadow}`}}>
                <div style={{background:wHdr,padding:"14px 18px"}}>
                  <div style={{fontSize:10,letterSpacing:".1em",color:wHdrTxt,opacity:.7,marginBottom:3,textTransform:"uppercase"}}>Kostenloser Gebührenrechner</div>
                  <div style={{fontSize:17,fontWeight:700,color:wHdrTxt}}>RVG Prozesskostenrechner 2025</div>
                </div>
                <div style={{padding:"16px 18px",background:wBody}}>
                  <p style={{margin:"0 0 6px",fontSize:13,color:wBodyTxt,lineHeight:1.6}}>Berechnen Sie Anwalts- &amp; Gerichtskosten nach <strong>RVG 2025 (KostBRÄG 2025)</strong>. Inkl. gegnerischer Kosten, Teilunterliegen &amp; Gesamtprozesskostenrisiko.</p>
                  <ul style={{margin:"0 0 14px",paddingLeft:16,fontSize:12,color:wBodyTxt,opacity:.75,lineHeight:1.8}}>
                    <li>ArbG, AG, LG, LAG, OLG &amp; außergerichtlich</li>
                    <li>Anrechnung außergerichtlicher Gebühren</li>
                    <li>PDF-Export</li>
                  </ul>
                  <span style={{display:"inline-block",background:wBtn,color:wBtnTxt,padding:"10px 20px",borderRadius:6,fontWeight:700,fontSize:13}}>
                    Zum kostenlosen RVG-Rechner →
                  </span>
                </div>
                <div style={{background:wFtr,padding:"9px 18px",borderTop:`1px solid ${D.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontSize:10,color:wFtrTxt,opacity:.6}}>Powered by</span>
                  <span style={{fontSize:11,fontWeight:700,color:wFtrTxt}}>APOS Legal – Fachanwalt für Arbeitsrecht</span>
                </div>
              </div>
            </div>

            {/* ── Code ── */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <label style={lbl}>HTML-Code (mit aktuellen Farben)</label>
              <button onClick={()=>{navigator.clipboard.writeText(embedCode);setCopied(true);setTimeout(()=>setCopied(false),2000);}} className="bg" style={btnG(true)}>
                {copied?<Ico name="check" size={12} style={{color:D.white}}/>:<Ico name="copy" size={12} style={{color:D.white}}/>}
                {copied?"Kopiert":"Code kopieren"}
              </button>
            </div>
            <pre style={{background:D.dark,color:"#D1FAE5",padding:"16px 18px",borderRadius:8,fontSize:10.5,lineHeight:1.8,overflowX:"auto",fontFamily:"'IBM Plex Mono',monospace",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{embedCode}</pre>

            {/* ── Backlink Strategie ── */}
            <div style={{marginTop:20,background:D.goldBg||D.cream,border:`1px solid ${D.border}`,borderRadius:8,padding:"16px 18px"}}>
              <div style={{fontWeight:700,fontSize:13,color:D.dark,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><GoldIco name="target"/> Backlink-Strategie</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,fontSize:12,color:D.muted,lineHeight:1.8}}>
                <div>
                  <strong style={{color:D.text,display:"block",marginBottom:6}}>Zielseiten (themenrelevant):</strong>
                  {["HR-Blogs & Personalmagazine","Gehalts- & Lohnrechner-Seiten","Unternehmensberatungen / Steuerberater","Gewerkschafts- & Betriebsratswebseiten","Andere Kanzleien ohne eigenen RVG-Rechner"].map(t=>(
                    <div key={t} style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                      <span style={{color:D.gold}}><Ico name="check" size={11}/></span>{t}
                    </div>
                  ))}
                </div>
                <div>
                  <strong style={{color:D.text,display:"block",marginBottom:6}}>Was das Widget liefert:</strong>
                  {["2× Do-follow-Links pro Einbettung","Anker: APOS Legal – Fachanwalt","Anker: Zum kostenlosen RVG-Rechner","Themenrelevante Domains (Arbeitsrecht)","Viraler Effekt durch echten Nutzwert"].map(t=>(
                    <div key={t} style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                      <span style={{color:D.gold}}><Ico name="arrow" size={11}/></span>{t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}

      {/* Footer */}
      <div style={{marginTop:28,borderTop:`1px solid ${D.border}`,paddingTop:14,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <div style={{fontSize:11,color:D.muted}}>
          <a href="https://www.gekuendigt-abfindung.de" target="_blank" rel="noopener" style={{color:D.gold,fontWeight:700,textDecoration:"none"}}>APOS Legal Rechtsanwaltsgesellschaft</a>
          {" "}· Fachanwalt für Arbeitsrecht Fatih Bektas · Heidelberg
        </div>
        <div style={{fontSize:11,color:D.muted}}>RVG 2025 (KostBRÄG 2025) · § 3a RVG</div>
      </div>
      </div>
    </div>
  );
}
