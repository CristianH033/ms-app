import{d as ue,P as fe,r as c,l as Y,p as pe,q as me,o as n,c as x,a,t as u,e as s,U as _e,F as O,i as B,b as r,w as l,s as v,_ as m,v as P,j as g,S as U,M as b,V as ve,n as ge,Q as he}from"./index-XnMAgjIh.js";import{S as z}from"./ticket-line-duotone-CMp6XBgY.js";import{S as H}from"./add-circle-line-duotone-Cph3MIjB.js";import{_ as Q,a as Z,b as J,c as K}from"./AlertDialogTitle.vue_vue_type_script_setup_true_lang-CqpO9Kok.js";import{_ as W}from"./AlertDialogDescription.vue_vue_type_script_setup_true_lang-n6a3Geue.js";import{_ as X,a as ee}from"./AlertDialogCancel.vue_vue_type_script_setup_true_lang-BuCAFo1d.js";import{n as be}from"./strings-BzWVocVB.js";import{O as we}from"./index-z2IFTw9J.js";const xe={class:"p-4 rounded-md mx-auto"},ke={class:"flex justify-between items-center mb-4"},ye={class:"text-primary text-2xl font-bold uppercase"},Te={class:"text-2xl font-bold uppercase"},Se={class:"text-right max-w-80"},Ce={class:"capitalize"},De={class:"space-y-4"},$e={class:"tabular-nums flex flex-row justify-center items-center self-start print:self-center print:w-32"},Ee={class:"text-7xl text-primary print:text-7xl"},Re={class:"flex flex-wrap gap-2"},qe={class:"pointer-events-none"},Ne={class:"flex items-center gap-4 border p-4 rounded-md"},je=a("h3",{class:"font-extrabold text-3xl text-primary"},"POOL",-1),Me={class:"flex flex-row flex-wrap gap-2"},Oe={class:"flex flex-row gap-2 justify-start items-center"},Be=a("span",null," Asignar Boletas ",-1),Ie={class:"px-6 py-4 overflow-y-auto relative max-h-[55dvh]"},Le={className:"w-full max-w-3xl grid grid-cols-5 md:grid-cols-10 gap-x-2 gap-y-2 place-items-center"},Ve=a("span",null,"Asignar",-1),Ae={class:"flex flex-row gap-2 justify-start items-center"},Fe=a("span",null," Remover Boleta ",-1),Ge={class:"flex flex-row gap-2 justify-center items-center p-4"},Ye=a("span",null,"Remover",-1),Pe=a("header",{class:"hidden print:block print:!fixed print:top-0"},"SÁNCHEZ INVERSIONES",-1),es=ue({__name:"SellerRaffleView",setup(Ue){const I=fe(),k=I.currentRoute.value.params.id,y=I.currentRoute.value.params.seller_id,T=c(),E=c(),L=c(),V=c([]),R=c([]),h=c(null),S=c(!1),C=c(!1),i=c(!1),D=c(""),q=c(null),se=Y(()=>{const e=Array.from(new Set(R.value.map(d=>d.number[0]))).map(d=>({group:d,sellerTickets:R.value.filter(f=>f.number[0]===d)}));return[{group:"0",sellerTickets:[]},{group:"1",sellerTickets:[]},{group:"2",sellerTickets:[]},{group:"3",sellerTickets:[]},{group:"4",sellerTickets:[]},{group:"5",sellerTickets:[]},{group:"6",sellerTickets:[]},{group:"7",sellerTickets:[]},{group:"8",sellerTickets:[]},{group:"9",sellerTickets:[]}].map(d=>{const f=e.find(w=>w.group===d.group);return f==null||f.sellerTickets.sort((w,$)=>Number(w.number)-Number($.number)),f||d})}),te=Y(()=>(console.log(D.value),D.value?V.value.filter(t=>t.number[0]===D.value):[])),ae=t=>{D.value=t,he(()=>{S.value=!0})},le=t=>{var e,_;(e=h.value)!=null&&e.includes(t.id)?h.value=(_=h.value)==null?void 0:_.filter(d=>d!==t.id):h.value=[...h.value??[],t.id]},re=t=>{var e;return(e=h.value)==null?void 0:e.includes(t.id)},oe=async()=>{const{data:t,error:e}=await b.from("raffle_stats").select("*").eq("raffle_id",k).single();if(e)throw new Error(e.message);T.value=t},ne=async()=>{const{data:t,error:e}=await b.from("sellers").select("*").eq("id",y).single();if(e)throw new Error(e.message);E.value=t},N=async()=>{const{data:t,error:e}=await b.from("tickets").select("*").eq("raffle_id",k).eq("seller_id",y);if(e)throw new Error(e.message);R.value=t},j=async()=>{const{data:t,error:e}=await b.from("tickets").select("*").eq("raffle_id",k).is("seller_id",null);if(e)throw new Error(e.message);V.value=t},M=async()=>{const{data:t,error:e}=await b.from("raffles_sellers").select("*").eq("raffle_id",k).eq("seller_id",y).single();if(e)throw new Error(e.message);L.value=t},ie=async()=>{var e;i.value=!0;const{error:t}=await b.from("tickets").update({seller_id:Number(y)}).in("id",(e=h.value)==null?void 0:e.map(_=>Number(_)));if(t)throw new Error(t.message);M(),j(),N(),i.value=!1,S.value=!1},de=async t=>{i.value=!0;const{error:e}=await b.from("tickets").update({seller_id:null}).eq("id",t);if(e)throw new Error(e.message);M(),j(),N(),i.value=!1,C.value=!1},A=t=>{C.value=!0,q.value=t};return pe(()=>{oe(),ne(),M(),N(),j()}),(t,e)=>{var d,f,w,$,F,G;const _=me("auto-animate");return n(),x("div",xe,[a("div",ke,[a("div",null,[a("h1",ye,u((d=T.value)==null?void 0:d.raffle_name),1),a("h2",Te,u((f=E.value)==null?void 0:f.name),1),a("p",null,u((w=E.value)==null?void 0:w.phone),1)]),a("div",Se,[a("p",null,u(s(be)(($=L.value)==null?void 0:$.ticket_price)),1),a("p",null,u((F=T.value)==null?void 0:F.lottery_name),1),a("p",Ce,u(s(_e)(new Date(Date.parse((G=T.value)==null?void 0:G.draw_drawn_at)),"dddd DD [de] MMMM [de] YYYY")),1)])]),a("div",De,[(n(!0),x(O,null,B(se.value,o=>(n(),x("div",{key:o.group,class:"flex items-center gap-4 print:gap-1 border p-4 print:p-2 rounded-md break-before-auto"},[a("div",$e,[a("h3",Ee,u(o.group),1)]),a("div",Re,[(n(!0),x(O,null,B(o.sellerTickets,p=>(n(),g(s(we),{key:p.id,as:"button",class:"ml-2 button small",onTrigger:ce=>A(p)},{default:l(()=>[r(s(m),{variant:"ghost",onContextmenu:ve(ce=>A(p),["prevent"]),class:"border-primary print:min-w-10 print:min-h-10 print:w-10 print:h-10 print:text-sm print:font-extrabold print:rounded-md text-lg min-w-14 min-h-14 w-14 h-14 border rounded-full flex-col justify-center items-center"},{default:l(()=>[a("span",qe,u(p.number),1)]),_:2},1032,["onContextmenu"])]),_:2},1032,["onTrigger"]))),128)),r(s(m),{onClick:p=>ae(o.group),variant:"ghost",class:"print:hidden text-lg w-14 h-14 border rounded-full"},{default:l(()=>[v(" + ")]),_:2},1032,["onClick"])])]))),128)),a("div",Ne,[je,a("div",Me,[r(s(m),{variant:"ghost",class:"print:hidden text-lg w-14 h-14 border"},{default:l(()=>[v(" + ")]),_:1})])])]),r(s(K),{open:S.value,"onUpdate:open":e[0]||(e[0]=o=>S.value=o)},{default:l(()=>[r(s(Q),{class:"transition-[opacity,_transform] gap-0 p-0 max-w-2xl w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] rounded-lg grid-rows-[auto_minmax(0,1fr)_auto]"},{default:l(()=>[r(s(Z),{class:"p-6 pb-4 border-b"},{default:l(()=>[r(s(J),null,{default:l(()=>[a("div",Oe,[r(s(z),{class:"w-8 h-8"}),Be])]),_:1}),r(s(W),null,{default:l(()=>[v(" Seleccione una o más boletas para asignarlas a este vendedor ")]),_:1})]),_:1}),a("div",Ie,[a("div",Le,[(n(!0),x(O,null,B(te.value,o=>(n(),g(s(m),{key:o.id,variant:"ghost",class:ge(["text-lg w-14 h-14 border rounded-full",{"bg-green-600 hover:bg-green-700":re(o)}]),onClick:p=>le(o),disabled:i.value},{default:l(()=>[v(u(o.number),1)]),_:2},1032,["class","onClick","disabled"]))),128))])]),r(s(X),{class:"p-6 pt-4 border-t gap-2"},{default:l(()=>[r(s(ee),{"as-child":""},{default:l(()=>[r(s(m),{variant:"secondary",type:"button",disabled:i.value},{default:l(()=>[v("Cancelar")]),_:1},8,["disabled"])]),_:1}),P((n(),g(s(m),{onClick:ie,class:"gap-3",form:"raffle-form",type:"submit",disabled:i.value},{default:l(()=>[i.value?(n(),g(s(U),{key:0,class:"h-6 w-6"})):(n(),g(s(H),{key:1,class:"w-6 h-6"})),Ve]),_:1},8,["disabled"])),[[_]])]),_:1})]),_:1})]),_:1},8,["open"]),r(s(K),{open:C.value,"onUpdate:open":e[2]||(e[2]=o=>C.value=o)},{default:l(()=>[r(s(Q),{class:"transition-[opacity,_transform] gap-0 p-0 max-w-2xl w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] rounded-lg grid-rows-[auto_minmax(0,1fr)_auto]"},{default:l(()=>[r(s(Z),{class:"p-6 pb-4 border-b"},{default:l(()=>[r(s(J),null,{default:l(()=>[a("div",Ae,[r(s(z),{class:"w-8 h-8"}),Fe])]),_:1}),r(s(W),null,{default:l(()=>[v(" Esta acción removerá la boleta de este vendedor ")]),_:1})]),_:1}),a("div",Ge,[r(s(m),{variant:"ghost",class:"text-4xl w-32 h-32 border rounded-full",disabled:i.value},{default:l(()=>{var o;return[v(u((o=q.value)==null?void 0:o.number),1)]}),_:1},8,["disabled"])]),r(s(X),{class:"p-6 pt-4 border-t gap-2"},{default:l(()=>[r(s(ee),{"as-child":""},{default:l(()=>[r(s(m),{variant:"secondary",type:"button",disabled:i.value},{default:l(()=>[v("Cancelar")]),_:1},8,["disabled"])]),_:1}),P((n(),g(s(m),{onClick:e[1]||(e[1]=o=>{var p;return de((p=q.value)==null?void 0:p.id)}),class:"gap-3",form:"raffle-form",type:"button",variant:"destructive",disabled:i.value},{default:l(()=>[i.value?(n(),g(s(U),{key:0,class:"h-6 w-6"})):(n(),g(s(H),{key:1,class:"w-6 h-6"})),Ye]),_:1},8,["disabled"])),[[_]])]),_:1})]),_:1})]),_:1},8,["open"]),Pe])}}});export{es as default};
