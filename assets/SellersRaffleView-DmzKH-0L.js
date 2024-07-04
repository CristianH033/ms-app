import{_ as ie}from"./SellersList.vue_vue_type_script_setup_true_lang-BvJSBpfi.js";import{d as ue,_ as le,a as ce,b as fe,c as de}from"./AlertDialogTitle.vue_vue_type_script_setup_true_lang-DJFGy1Bo.js";import{_ as me}from"./AlertDialogDescription.vue_vue_type_script_setup_true_lang-EllOtSpR.js";import{d as he,P as ge,r as x,p as pe,o as ve,c as we,b as v,w as M,e as y,a as T,t as N,_ as V,s as ye,V as Me}from"./index-2Ipfpp4t.js";import{_ as _e,a as $e,b as be,c as Te}from"./CardContent.vue_vue_type_script_setup_true_lang-BMNjg_0N.js";import{g as De,a as Ze}from"./sellers-CxGqBles.js";import{S as B}from"./add-circle-line-duotone-DLd5Lv4a.js";import{S as Ne}from"./cup-star-line-duotone-pY6kCgXu.js";import{_ as Ye}from"./AddSellerToRaffleForm.vue_vue_type_script_setup_true_lang-B3EU8tDa.js";import"./Input.vue_vue_type_script_setup_true_lang-Bx7BYkUi.js";import"./magnifer-outline-DCS1fyAL.js";import"./FormMessage.vue_vue_type_script_setup_true_lang-CL6OjVhz.js";import"./raffles-C_eAG9sv.js";import"./MoneyInput.vue_vue_type_script_setup_true_lang-CtGxP_sN.js";import"./SelectScrollDownButton.vue_vue_type_script_setup_true_lang-CGAWgdMb.js";import"./createLucideIcon-Doc_pRcw.js";var J=/^([0-9]{4})-([0-1][0-9])(?:-([0-3][0-9]))?(?:[T ]?([0-2][0-9])(?::([0-5][0-9]))?(?::([0-5][0-9]))?)?(?:\.[0-9]+)?(Z|(?:\+|\-)[0-9]{2}:?[0-9]{2})?$/;function xe(e){const t=e.match(J);if(t){const n=Number(t[2]);if(n<1||n>12)return!1;if(typeof t[3]!==void 0){const s=Number(t[3]);if(s<1||s>31)return!1}if(typeof t[4]!==void 0){const s=Number(t[4]);if(s<0||s>23)return!1}return!0}return!1}function Se(e){const t=e.match(J);return t&&typeof t[4]>"u"?e+="T00:00:00":e}function Y(e){if(e||(e=new Date),e instanceof Date){const t=new Date(e);return t.setMilliseconds(0),t}if(e=e.trim(),xe(e))return new Date(Se(e));throw new Error(`Non ISO 8601 compliant date (${e}).`)}function Pe(e){const t=Y(e);return t.setDate(1),t.setMonth(t.getMonth()+1),t.setDate(0),t}function Ce(e){return Pe(e).getDate()}var F="1999-03-04T02:05:01.000Z",I=new Map,E=[["YYYY",{year:"numeric"}],["YY",{year:"2-digit"}],["MMMM",{month:"long"}],["MMM",{month:"short"}],["MM",{month:"2-digit"}],["M",{month:"numeric"}],["DD",{day:"2-digit"}],["D",{day:"numeric"}],["dddd",{weekday:"long"}],["ddd",{weekday:"short"}],["d",{weekday:"narrow"}],["mm",{minute:"2-digit"}],["m",{minute:"numeric"}],["ss",{second:"2-digit"}],["s",{second:"numeric"}],["ZZ",{timeZoneName:"long"}],["Z",{timeZoneName:"short"}]],A=[["HH",{hour:"2-digit"}],["H",{hour:"numeric"}]],L=[["hh",{hour:"2-digit"}],["h",{hour:"numeric"}],["a",{dayPeriod:"narrow"}],["A",{dayPeriod:"narrow"}]],H={DD:2,HH:2,MM:2,YY:2,YYYY:4,hh:2,mm:2,ss:2};function G(e){if(/^[+-]\d{2}:\d{2}/.test(e))return 6;if(/^[+-]\d{4}/.test(e))return 5;throw new Error("Invalid offset format")}var He=["MMMM","MMM","dddd","ddd"],p=new Map([...E,...A,...L].map(e=>[e[0],e])),q=new Map,Q=["full","long","medium","short"],Z=e=>String(e).padStart(2,"0"),k=e=>String(e).padStart(2,"0");function D(e){return e.type==="literal"&&(e.value=e.value.normalize("NFKC")),e}function Ie(e,t,n,s=!1,r=null){const a=ke(e,t,n,s),i=Y(e);function l({partName:c,partValue:d,token:o}){if(c==="literal")return d;const u=a[c];if(c==="hour"&&o==="H")return u.replace(/^0/,"")||"0";if(["mm","ss","MM"].includes(o)&&u.length===1)return`0${u}`;if(c==="dayPeriod"){const h=P(i.getUTCHours()<12?"am":"pm",n);return o==="A"?h.toUpperCase():h.toLowerCase()}return c==="timeZoneName"?r??X(-1*i.getTimezoneOffset(),o):u}return t.map(c=>({...c,value:l(c)}))}function ke(e,t,n,s=!1){const r=Y(e),a=t.filter(o=>o.hour12),i=t.filter(o=>!o.hour12),l=[],c=[];function d(o,u=!1){const h=`${n}-u-hc-${u?"h12":"h23"}`;if(l.push(...new Intl.DateTimeFormat(h,o.reduce((f,m)=>m.partName==="literal"?f:(s&&He.includes(m.token)&&c.push(m),Object.assign(f,m.option)),{timeZone:"UTC"})).formatToParts(r).map(D)),s&&c.length)for(const f of c){let m=[];switch(f.token){case"MMMM":m=new Intl.DateTimeFormat(h,{dateStyle:"long",timeZone:"UTC"}).formatToParts(r).map(D);break;case"MMM":m=new Intl.DateTimeFormat(h,{dateStyle:"medium",timeZone:"UTC"}).formatToParts(r).map(D);break}const g=m.find(w=>w.type===f.partName),_=l.findIndex(w=>w.type===f.partName);g&&_>-1&&(l[_]=g)}}return a.length&&d(a,!0),i.length&&d(i),l.reduce((o,u)=>(o[u.type]=u.value,o),{})}function X(e,t="Z"){const n=String(Math.floor(Math.abs(e/60))).padStart(2,"0"),s=String(Math.abs(e%60)).padStart(2,"0"),r=e<0?"-":"+";return t==="ZZ"?`${r}${n}${s}`:`${r}${n}:${s}`}function Fe(e,t){ee(e,t);const[n,s,r,a]=e.match(/([+-])([0-3][0-9]):?([0-6][0-9])/),i=Number(r)*60+Number(a);return s==="+"?i:-i}function ee(e,t="Z"){if(!(s=>{switch(s){case"Z":return/^([+-])[0-3][0-9]:[0-6][0-9]$/.test(e);case"ZZ":return/^([+-])[0-3][0-9][0-6][0-9]$/.test(e)}})(t))throw new Error(`Invalid offset: ${e}`);return e}function Ee(e){return E.concat(A).concat(L).sort((t,n)=>t[0].length>n[0].length?1:-1).reduce((t,n)=>t.replace(n[0],`\\${n[0]}`),e)}function Ae(e){return["numeric","2-digit"].includes(e.partValue)}function Le(e){let t;for(const n of e){if(n.partName==="literal"&&!isNaN(parseFloat(n.partValue)))throw new Error(`Numbers in format (${n.partValue}).`);if(t&&t.partName!=="literal"&&n.partName!=="literal"&&!(t.token in H)&&!(n.token in H)&&!(Ae(t)&&n.token.toLowerCase()==="a"))throw new Error(`Illegal adjacent tokens (${t.token}, ${n.token})`);t=n}return e}function Ue(e){return typeof e=="string"?e.includes("ZZ")?"ZZ":"Z":"time"in e&&e.time==="full"?"Z":"ZZ"}function P(e,t){const n=q.get(t);if(n&&n[e])return n[e];const s=new Date(F);s.setUTCHours(e==="am"?5:20);const a=new Intl.DateTimeFormat(t,{timeStyle:"full",timeZone:"UTC",hour12:!0}).formatToParts(s).map(D).find(i=>i.type==="dayPeriod");if(a){const i=n||{};return q.set(t,Object.assign(i,{[e]:a.value})),a.value}return e}function je(e,t="+00:00"){const n=Y(e),s=(()=>{switch(G(t)){case 5:return"ZZ";case 6:return"Z"}})(),r=Fe(t,s);return new Date(n.getTime()+r*1e3*60)}function te(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function z(e,t){const n=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZone:t,hourCycle:"h23"}).formatToParts(e).map(D),s={};return n.forEach(r=>{s[r.type]=r.value}),new Date(`${s.year}-${s.month}-${s.day}T${s.hour}:${s.minute}:${s.second}Z`)}function K(e,t="UTC",n="device",s="Z"){var r;n=n==="device"?(r=te())!=null?r:"utc":n;const a=Y(e),i=z(a,t),l=z(a,n),c=Math.round((l.getTime()-i.getTime())/1e3/60);return X(c,s)}function U(e,t){if(Q.includes(e)||typeof e=="object")return Re(e,t);let n=e,s=0;const r=o=>{if(o[2]||(o[2]=new RegExp(`(.)?(${o[0]})`,"g")),o[2].test(n)){let u=0;return n=n.replace(o[2],(h,f,m)=>f==="\\"?m:`${typeof f=="string"?f:""}{!${u++?s:s++}!}`),!!u}return!1};function a(o){const u=o.map(f=>f.partName),h=new Set(u);if(u.length>h.size)throw new Error("Cannot reuse format tokens.");return o}function i(o,[u,h,f]){const m=Object.keys(h)[0],g=h[m];return{option:h,partName:m,partValue:g,token:u,pattern:f,hour12:o}}const l=E.filter(r).concat(A.filter(r)).map(i.bind(null,!1)),c=a(l.concat(L.filter(r).map(i.bind(null,!0)))),d=/^\{!(\d+)!\}$/;return n.split(/(\{!\d+!\})/).map(o=>{const u=o.match(d);return u?c[Number(u[1])]:{option:{literal:o},partName:"literal",partValue:o,token:o,pattern:new RegExp(""),hour12:!1}}).filter(o=>!(o.partName==="literal"&&o.partValue===""))}function Re(e,t){const n={timeZone:"UTC"};typeof e=="string"?n.dateStyle=e:("date"in e&&(n.dateStyle=e.date),"time"in e&&(n.timeStyle=e.time));const s=new Intl.DateTimeFormat(t,n),r=s.formatToParts(new Date(F)).map(D),i=s.formatToParts(new Date("1999-04-05T23:05:01.000Z")).map(D).find(c=>c.type==="hour"),l=i&&i.value==="23"?24:12;return r.map(c=>{const d=c.type,o=We(c.type,c.value,t,c.type==="hour"?l:void 0,n);if(o===void 0)return;const u=o[1][d];if(u)return o[2]||(o[2]=new RegExp(`${o[0]}`,"g")),{option:{[d]:u},partName:d,partValue:u,token:o[0],pattern:o[2],hour12:l===12}}).filter(c=>!!c)}function We(e,t,n,s,r){const a=t.length,i=!isNaN(Number(t));let l;switch(e){case"year":return a===2?p.get("YY"):p.get("YYYY");case"month":if(i)return a===1?p.get("M"):p.get("MM");switch(l=O(n,e,t),l){case"long":return p.get("MMMM");default:return p.get("MMM")}case"day":return a===1?p.get("D"):p.get("DD");case"weekday":switch(l=O(n,e,t),l){case"narrow":return p.get("d");case"short":return p.get("ddd");default:return p.get("dddd")}case"hour":return s===12?a===1?p.get("h"):p.get("hh"):a===1?p.get("H"):p.get("HH");case"minute":return a===1?p.get("m"):p.get("mm");case"second":return a===1?p.get("s"):p.get("ss");case"dayPeriod":return/^[A-Z]+$/u.test(t)?p.get("A"):p.get("a");case"literal":return[t,{literal:t},new RegExp("")];case"timeZoneName":return r.timeStyle==="full"?p.get("Z"):p.get("ZZ");default:return}}function O(e,t,n){if(!I.has(e)){const r=new Date(F),a=[3,8,9,7,6,4,3],i=["weekday","month","dayPeriod"],l=["long","short","narrow"],c={};for(let d=0;d<12;d++){r.setMonth(0+d),d in a&&r.setDate(a[d]),r.setUTCHours(8+d);for(const o of l){const u=new Intl.DateTimeFormat(e,i.reduce((h,f)=>Object.assign(h,{[f]:o}),{hour12:!0,timeZone:"UTC"})).formatToParts(r).map(D);if(o==="long"||o==="short"){const f=new Intl.DateTimeFormat(e,{dateStyle:o==="short"?"medium":"long",timeZone:"UTC"}).formatToParts(r).map(D).find(g=>g.type==="month"),m=u.findIndex(g=>g.type==="month");m>-1&&f&&(u[m]=f)}u.forEach(h=>{if(h.type==="literal")return;const f=h.type;c[f]=Object.assign(c[f]||{},{[h.value]:o})})}}I.set(e,c)}const s=I.get(e);return s?s[t][n]:void 0}function Ve(e,t="+00:00"){const n=t.slice(0,1)==="+";return je(e,t.replace(n?"+":"-",n?"-":"+"))}function Be(){return Intl.DateTimeFormat().resolvedOptions().locale}function S(e,t="long",n="device",s=!1,r){let a,i;return typeof e=="object"&&!(e instanceof Date)&&({date:e,format:t,locale:n,genitive:s,partFilter:r,tz:a}=e),t==="ISO8601"?Y(e).toISOString():(a&&(i=K(e,"utc",a,Ue(t))),a??(a=te()),(a==null?void 0:a.toLowerCase())!=="utc"&&(e=Ve(e,K(e,a,"utc"))),(!n||n==="device")&&(n=Be()),Ie(e,U(t,n).filter(r??(()=>!0)),n,s,i).map(l=>l.value).join(""))}function qe(e,t="en",n=!1,s=()=>!0){return U(e,t).filter(s).reduce((r,a)=>r+=n&&a.partName==="literal"?Ee(a.token):a.token,"").normalize("NFKC")}function ze(e){const t=new Date().getFullYear(),n=t%100,s=Math.floor(t/100),r=Number(e);return(s+(r>n+20?-1:0))*100+r}function re(e,t="en",n=!1){const s=(r,a)=>Array(r).fill("").map((i,l)=>`${a(l)}`);if(e==="M")return s(12,r=>r+1);if(e==="MM")return s(12,r=>{const a=r+1;return a<10?`0${a}`:a});if(e.startsWith("M"))return re("MM").map(r=>S(`2000-${r}-05`,e,t,n));if(e.startsWith("d"))return s(7,r=>`0${r+2}`).map(r=>S(`2022-10-${r}`,e,t));if(e==="a")return[P("am",t).toLowerCase(),P("pm",t).toLowerCase()];if(e==="A")return[P("am",t).toUpperCase(),P("pm",t).toUpperCase()];if(e.startsWith("Y")){const r=new Date().getFullYear();return s(120,a=>a+1).reduce((a,i)=>(i!=="120"&&a.push(S(`${r+Number(i)}-06-06`,e,t)),a.unshift(S(`${r-Number(i)}-06-06`,e,t)),a),[S(`${r}-06-06`,e,t)])}return e.startsWith("D")?s(31,r=>`${e==="DD"&&r<9?"0":""}${r+1}`):e.startsWith("H")?s(24,r=>`${e==="HH"&&r<10?"0":""}${r}`):e.startsWith("h")?s(12,r=>`${e==="hh"&&r<9?"0":""}${r+1}`):e.startsWith("m")||e.startsWith("s")?s(60,r=>`${e.length>1&&r<10?"0":""}${r}`):[]}function Ke(e,t="ISO8601",n="device"){let s=()=>!0,r,a="backward";if(typeof e=="object"?{date:r,format:t="ISO8601",locale:n="device",dateOverflow:a="backward",partFilter:s=()=>!0}=e:r=e,!r)throw new Error("parse() requires a date string.");const i=()=>{throw new Error(`Date (${r}) does not match format (${qe(t,n)})`)};if(t==="ISO8601")return Y(r);const l=Q.includes(t)||typeof t=="object",c=Le(U(t,n).filter(s));if(!c.length)throw new Error("parse() requires a pattern.");let d;try{d=Oe(r,c)}catch{return i()}const o=new Date,u=new Map([["YYYY",o.getFullYear()],["MM",o.getMonth()+1],["DD",o.getDate()],["HH",0],["mm",0],["ss",0]]);let h=null,f="";d.forEach($=>{if($.partName==="literal")return;if($.token===$.value)return i();const C=Number($.value);if(u.has($.token))u.set($.token,C);else if($.token==="YY")u.set("YYYY",ze($.value));else{const b=$.token;if(b.startsWith("d"))return;if(b==="D")u.set("DD",C);else if(b==="H"||b.startsWith("h"))u.set("HH",C);else if(b==="M")u.set("MM",C);else if(b==="a"||b==="A")h=$.value.toLowerCase()===P("am",n).toLowerCase();else if(b==="Z"||b==="ZZ")f=ee($.value,b);else{const W=re(b,n,l).indexOf($.value);if(W!==-1)switch(b){case"MMM":case"MMMM":u.set("MM",W+1);break}}}});let m=u.get("HH")||0;h===!1?(m+=m===12?0:12,u.set("HH",m===24?0:m)):h===!0&&m===12&&u.set("HH",0),u.set("MM",(u.get("MM")||1)-1);let[g,_,w,ne,se,ae]=Array.from(u.values());const j=Ce(new Date(`${k(g)}-${Z(_+1)}-10`));if(j<w&&a==="throw")throw new Error(`Invalid date ${k(g)}-${Z(_+1)}-${Z(w)}`);w=a==="backward"?Math.min(w,j):w;const oe=`${k(g)}-${Z(_+1)}-${Z(w)}T${Z(ne)}:${Z(se)}:${Z(ae)}${f}`,R=new Date(oe);return isFinite(+R)?R:i()}function Oe(e,t){let n=0;const s=l=>[l[n++],l[n]];let r=0;const a=[];let i;do{const[l,c]=s(t);i=c;let d=1;if(l.partName==="literal")d=l.partValue.length;else if(l.partName==="timeZoneName")d=G(e.substring(r));else if(l.token in H)d=H[l.token];else if(c)if(c.partName==="literal"){if(d=e.indexOf(c.partValue,r)-r,d<0)throw new Error}else if(c.partName==="dayPeriod"){for(let o=1;o<=4;o++)if(isNaN(Number(e.charAt(r+o)))){d=o;break}}else{const o=e.substring(r).search(/\d/);o!==-1&&(d=r+o)}else d=e.length;a.push({...l,value:e.substring(r,r+d)}),r+=d}while(i);return a}const Je={class:"w-full flex flex-col items-center gap-4"},Ge={class:"text-2xl font-bold"},Qe={class:"text-xl font-bold"},Xe={class:"text-xs text-muted-foreground"},et={class:"text-xs text-muted-foreground"},tt=T("span",{class:"hidden md:inline"},"Agregar",-1),rt={class:"overflow-y-auto relative p-4"},nt=T("p",null,"No hay vendedores en esta rifa",-1),st=T("span",null,"Agregar venddor a esta rifa",-1),$t=he({__name:"SellersRaffleView",setup(e){const t=ge(),n=x(),s=x([]),r=x([]),a=x(""),i=x(!1),l=x(!1),c=t.currentRoute.value.params.id,d=async()=>{await Me.from("raffle_stats").select("*").eq("raffle_id",c).single().then(f=>{n.value=f.data})},o=async()=>{i.value=!0,De().then(f=>{s.value=f}).catch(f=>{console.error(f)}).finally(()=>{i.value=!1})},u=async()=>{i.value=!0,Ze(Number(c)).then(f=>{r.value=f}).catch(f=>{console.error(f)}).finally(()=>{i.value=!1})},h=async()=>{l.value=!1,await u()};return pe(async()=>{var g;await d(),await o(),await u();const f=Ke((g=n.value)==null?void 0:g.draw_drawn_at,"YYYY-MM-DDTHH:mm:ss"),m=S(f,"YYYY/MM/DD");a.value=m}),(f,m)=>(ve(),we("div",Je,[v(y(Te),{class:"w-full"},{default:M(()=>[v(y(_e),{class:"flex flex-row items-center justify-between space-y-0 pb-2"},{default:M(()=>[v(y($e),{class:"text-lg font-medium"},{default:M(()=>{var g,_,w;return[T("p",Ge,N((g=n.value)==null?void 0:g.raffle_name),1),T("p",null,N((_=n.value)==null?void 0:_.description),1),T("p",null,"Juega con: "+N((w=n.value)==null?void 0:w.draw_name)+" - ("+N(a.value)+")",1)]}),_:1}),v(y(Ne),{class:"w-6 h-6"})]),_:1}),v(y(be),null,{default:M(()=>{var g,_,w;return[T("div",Qe,N((g=n.value)==null?void 0:g.total_tickets)+" boletas",1),T("p",Xe,N((_=n.value)==null?void 0:_.available_tickets)+" Disponibles",1),T("p",et,N((w=n.value)==null?void 0:w.taken_tickets)+" asignadas",1)]}),_:1})]),_:1}),v(ie,{sellers:r.value,isLoading:i.value},{actionButton:M(()=>[v(y(ue),{open:l.value,"onUpdate:open":m[1]||(m[1]=g=>l.value=g)},{default:M(()=>[v(y(le),{"as-child":""},{default:M(()=>[v(y(V),{class:"gap-2"},{default:M(()=>[v(y(B),{class:"w-5 h-5"}),tt]),_:1})]),_:1}),v(y(ce),{class:"transition-[opacity,_transform] gap-0 p-0 max-w-2xl w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] rounded-lg grid-rows-[auto_minmax(0,1fr)_auto]"},{default:M(()=>[v(y(fe),{class:"p-4 border-b"},{default:M(()=>[v(y(de),null,{default:M(()=>[ye("Agregar vendedor")]),_:1}),v(y(me),{class:"mt-4"})]),_:1}),T("div",rt,[v(Ye,{"raffle-id":Number(y(c)),onCancel:m[0]||(m[0]=()=>l.value=!1),onSuccess:h},null,8,["raffle-id"])])]),_:1})]),_:1},8,["open"])]),emptyText:M(()=>[nt]),actionForEmpty:M(()=>[v(y(V),{class:"gap-2",onClick:m[2]||(m[2]=g=>l.value=!0)},{default:M(()=>[v(y(B),{class:"w-5 h-5"}),st]),_:1})]),_:1},8,["sellers","isLoading"])]))}});export{$t as default};
