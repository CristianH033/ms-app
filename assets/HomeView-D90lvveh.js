import{_ as Te}from"./RafflesList.vue_vue_type_script_setup_true_lang-DWyDgINH.js";import{S as Y,_ as Se,a as Pe,b as Be,c as Ve,d as Ie}from"./AlertDialogDescription.vue_vue_type_script_setup_true_lang-DQqHHk9L.js";import{c as re,a as Oe,g as je}from"./createLucideIcon-HLaaCR7D.js";import{d as x,o as l,c as _,l as B,e,n as le,m as D,s as ue,a as m,p as He,q as k,v as Ge,x as We,y as P,z as ie,j as p,w as t,b as a,i as K,F as X,A as w,P as Ze,B as y,t as J,C as H,I as Ke,D as de,V as Xe,E as Ye,G as Q,H as se,J as Je,O as Qe,M as ea,K as aa,L as ta,$ as sa,N as la,Q as oa,S as na,U as ra,W as ua,X as ia,r as U,Y as da,Z as _e,a0 as ce,a1 as fe,_ as j,a2 as he,a3 as ca,a4 as fa,a5 as me,a6 as Fe,a7 as ma,a8 as ge,a9 as pa,aa as _a,ab as ha,ac as ne,ad as ga}from"./index-Dsy3Kz98.js";import{u as va,t as ze,z as S,a as De,_ as z,b as N,c as L,d as M,F as R}from"./FormMessage.vue_vue_type_script_setup_true_lang-Br2DQ7Ma.js";import{_ as te}from"./Input.vue_vue_type_script_setup_true_lang-CNOVHztH.js";import{_ as qe,a as Ee,b as Ne,c as Le,d as Me,e as Re,f as Ue,g as ve}from"./MoneyInput.vue_vue_type_script_setup_true_lang-D-svLGtx.js";import{_ as be}from"./ImageInput.vue_vue_type_script_setup_true_lang-DVN3Uzlo.js";import{S as ba}from"./cup-star-line-duotone-Cj4mYlA1.js";import{_ as Ae}from"./AlertDialogTrigger.vue_vue_type_script_setup_true_lang-BIjtWrxo.js";import{v as ye,u as ya}from"./storage-Cijg-E7V.js";import{S as wa}from"./magnifer-outline-8OTH2XWC.js";import{S as xa}from"./ticket-line-duotone-CPAxiKfH.js";import{_ as $a,a as ka}from"./AlertDialogCancel.vue_vue_type_script_setup_true_lang-CQWaLaFV.js";import"./Skeleton.vue_vue_type_script_setup_true_lang-WC-No4VE.js";import"./CardContent.vue_vue_type_script_setup_true_lang-DK9KbNkA.js";import"./CardFooter.vue_vue_type_script_setup_true_lang-BBbXFtvq.js";import"./user-speak-line-duotone-ChkpCatM.js";import"./LazyImg-CEhR14wU.js";import"./thumbHash-Ci89Ad7b.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const Ca=["id"],we=x({__name:"FormDescription",props:{class:{}},setup(u){const s=u,{formDescriptionId:n}=va();return(c,o)=>(l(),_("p",{id:e(n),class:le(e(D)("text-sm text-muted-foreground",s.class))},[B(c.$slots,"default")],10,Ca))}}),xe=async()=>{const{data:u,error:s}=await ue.from("draws").select("*");if(s)throw new Error(s.message);return u},Sa=async u=>{const{error:s}=await ue.from("draws").insert(u);if(s)throw new Error(s.message);return!0};const Pa=re("CalendarIcon",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);const Ba=re("ChevronLeftIcon",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);const Va=re("ChevronRightIcon",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),Fa={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},za=m("g",{fill:"none",stroke:"currentColor","stroke-width":"1.5"},[m("path",{d:"M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z",opacity:".5"}),m("path",{"stroke-linecap":"round",d:"m14.5 9.5l-5 5m0-5l5 5"})],-1),Da=[za];function qa(u,s){return l(),_("svg",Fa,[...Da])}const Ea={name:"solar-close-square-line-duotone",render:qa},Na=x({__name:"Textarea",props:{class:{},defaultValue:{},modelValue:{}},emits:["update:modelValue"],setup(u,{emit:s}){const n=u,o=He(n,"modelValue",s,{passive:!0,defaultValue:n.defaultValue});return(i,d)=>k((l(),_("textarea",{"onUpdate:modelValue":d[0]||(d[0]=C=>We(o)?o.value=C:null),class:le(e(D)("flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",n.class))},null,2)),[[Ge,e(o)]])}}),La={class:"flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0"},Ma=x({__name:"Calendar",props:{modelValue:{},multiple:{type:Boolean},defaultValue:{},defaultPlaceholder:{},placeholder:{},pagedNavigation:{type:Boolean},preventDeselect:{type:Boolean},weekStartsOn:{},weekdayFormat:{},calendarLabel:{},fixedWeeks:{type:Boolean},maxValue:{},minValue:{},locale:{},numberOfMonths:{},disabled:{type:Boolean},readonly:{type:Boolean},initialFocus:{type:Boolean},isDateDisabled:{type:Function},isDateUnavailable:{type:Function},dir:{},nextPage:{type:Function},prevPage:{type:Function},asChild:{type:Boolean},as:{},class:{}},emits:["update:modelValue","update:placeholder"],setup(u,{emit:s}){const n=u,c=s,o=P(()=>{const{class:d,...C}=n;return C}),i=ie(o,c);return(d,C)=>(l(),p(e(Ze),w({class:e(D)("p-3",n.class)},e(i)),{default:t(({grid:G,weekDays:W})=>[a(e(ja),null,{default:t(()=>[a(e(Wa)),a(e(Ha)),a(e(Ga))]),_:1}),m("div",La,[(l(!0),_(X,null,K(G,E=>(l(),p(e(Aa),{key:E.value.toString()},{default:t(()=>[a(e(Ia),null,{default:t(()=>[a(e($e),null,{default:t(()=>[(l(!0),_(X,null,K(W,V=>(l(),p(e(Oa),{key:V},{default:t(()=>[y(J(V),1)]),_:2},1024))),128))]),_:2},1024)]),_:2},1024),a(e(Ta),null,{default:t(()=>[(l(!0),_(X,null,K(E.rows,(V,$)=>(l(),p(e($e),{key:`weekDate-${$}`,class:"mt-2 w-full"},{default:t(()=>[(l(!0),_(X,null,K(V,F=>(l(),p(e(Ra),{key:F.toString(),date:F},{default:t(()=>[a(e(Ua),{day:F,month:E.value},null,8,["day","month"])]),_:2},1032,["date"]))),128))]),_:2},1024))),128))]),_:2},1024)]),_:2},1024))),128))])]),_:1},16,["class"]))}}),Ra=x({__name:"CalendarCell",props:{date:{},asChild:{type:Boolean},as:{},class:{}},setup(u){const s=u,n=P(()=>{const{class:o,...i}=s;return i}),c=H(n);return(o,i)=>(l(),p(e(Ke),w({class:e(D)("relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-accent [&:has([data-selected][data-outside-month])]:bg-accent/50",s.class)},e(c)),{default:t(()=>[B(o.$slots,"default")]),_:3},16,["class"]))}}),Ua=x({__name:"CalendarCellTrigger",props:{day:{},month:{},asChild:{type:Boolean},as:{},class:{}},setup(u){const s=u,n=P(()=>{const{class:o,...i}=s;return i}),c=H(n);return(o,i)=>(l(),p(e(Xe),w({class:e(D)(e(de)({variant:"ghost"}),"h-9 w-9 p-0 font-normal","[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground","data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground","data-[disabled]:text-muted-foreground data-[disabled]:opacity-50","data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through","data-[outside-month]:pointer-events-none data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground [&[data-outside-month][data-selected]]:opacity-30",s.class)},e(c)),{default:t(()=>[B(o.$slots,"default")]),_:3},16,["class"]))}}),Aa=x({__name:"CalendarGrid",props:{asChild:{type:Boolean},as:{},class:{}},setup(u){const s=u,n=P(()=>{const{class:o,...i}=s;return i}),c=H(n);return(o,i)=>(l(),p(e(Ye),w({class:e(D)("w-full border-collapse space-y-1",s.class)},e(c)),{default:t(()=>[B(o.$slots,"default")]),_:3},16,["class"]))}}),Ta=x({__name:"CalendarGridBody",props:{asChild:{type:Boolean},as:{}},setup(u){const s=u;return(n,c)=>(l(),p(e(Je),Q(se(s)),{default:t(()=>[B(n.$slots,"default")]),_:3},16))}}),Ia=x({__name:"CalendarGridHead",props:{asChild:{type:Boolean},as:{}},setup(u){const s=u;return(n,c)=>(l(),p(e(Qe),Q(se(s)),{default:t(()=>[B(n.$slots,"default")]),_:3},16))}}),$e=x({__name:"CalendarGridRow",props:{asChild:{type:Boolean},as:{},class:{}},setup(u){const s=u,n=P(()=>{const{class:o,...i}=s;return i}),c=H(n);return(o,i)=>(l(),p(e(ea),w({class:e(D)("flex",s.class)},e(c)),{default:t(()=>[B(o.$slots,"default")]),_:3},16,["class"]))}}),Oa=x({__name:"CalendarHeadCell",props:{asChild:{type:Boolean},as:{},class:{}},setup(u){const s=u,n=P(()=>{const{class:o,...i}=s;return i}),c=H(n);return(o,i)=>(l(),p(e(aa),w({class:e(D)("w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground",s.class)},e(c)),{default:t(()=>[B(o.$slots,"default")]),_:3},16,["class"]))}}),ja=x({__name:"CalendarHeader",props:{asChild:{type:Boolean},as:{},class:{}},setup(u){const s=u,n=P(()=>{const{class:o,...i}=s;return i}),c=H(n);return(o,i)=>(l(),p(e(ta),w({class:e(D)("relative flex w-full items-center justify-between pt-1",s.class)},e(c)),{default:t(()=>[B(o.$slots,"default")]),_:3},16,["class"]))}}),Ha=x({__name:"CalendarHeading",props:{asChild:{type:Boolean},as:{},class:{}},setup(u){const s=u,n=P(()=>{const{class:o,...i}=s;return i}),c=H(n);return(o,i)=>(l(),p(e(sa),w({class:e(D)("text-sm font-medium",s.class)},e(c)),{default:t(({headingValue:d})=>[B(o.$slots,"default",{headingValue:d},()=>[y(J(d),1)])]),_:3},16,["class"]))}}),Ga=x({__name:"CalendarNextButton",props:{step:{},nextPage:{type:Function},asChild:{type:Boolean},as:{},class:{}},setup(u){const s=u,n=P(()=>{const{class:o,...i}=s;return i}),c=H(n);return(o,i)=>(l(),p(e(la),w({class:e(D)(e(de)({variant:"outline"}),"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",s.class)},e(c)),{default:t(()=>[B(o.$slots,"default",{},()=>[a(e(Va),{class:"h-4 w-4"})])]),_:3},16,["class"]))}}),Wa=x({__name:"CalendarPrevButton",props:{step:{},prevPage:{type:Function},asChild:{type:Boolean},as:{},class:{}},setup(u){const s=u,n=P(()=>{const{class:o,...i}=s;return i}),c=H(n);return(o,i)=>(l(),p(e(oa),w({class:e(D)(e(de)({variant:"outline"}),"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",s.class)},e(c)),{default:t(()=>[B(o.$slots,"default",{},()=>[a(e(Ba),{class:"h-4 w-4"})])]),_:3},16,["class"]))}}),Za=x({__name:"Popover",props:{defaultOpen:{type:Boolean},open:{type:Boolean},modal:{type:Boolean}},emits:["update:open"],setup(u,{emit:s}){const o=ie(u,s);return(i,d)=>(l(),p(e(na),Q(se(e(o))),{default:t(()=>[B(i.$slots,"default")]),_:3},16))}}),Ka=x({__name:"PopoverTrigger",props:{asChild:{type:Boolean},as:{}},setup(u){const s=u;return(n,c)=>(l(),p(e(ra),Q(se(s)),{default:t(()=>[B(n.$slots,"default")]),_:3},16))}}),Xa=x({inheritAttrs:!1,__name:"PopoverContent",props:{forceMount:{type:Boolean},trapFocus:{type:Boolean},side:{},sideOffset:{default:4},align:{default:"center"},alignOffset:{},avoidCollisions:{type:Boolean},collisionBoundary:{},collisionPadding:{},arrowPadding:{},sticky:{},hideWhenDetached:{type:Boolean},updatePositionStrategy:{},prioritizePosition:{type:Boolean},asChild:{type:Boolean},as:{},disableOutsidePointerEvents:{type:Boolean},class:{}},emits:["escapeKeyDown","pointerDownOutside","focusOutside","interactOutside","openAutoFocus","closeAutoFocus"],setup(u,{emit:s}){const n=u,c=s,o=P(()=>{const{class:d,...C}=n;return C}),i=ie(o,c);return(d,C)=>(l(),p(e(ia),null,{default:t(()=>[a(e(ua),w({...e(i),...d.$attrs},{class:e(D)("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",n.class)}),{default:t(()=>[B(d.$slots,"default")]),_:3},16,["class"])]),_:3}))}}),Ya=async()=>{const{data:u,error:s}=await ue.from("lotteries").select("*");if(s)throw new Error(s.message);return u},Ja=["aria-disabled"],Qa=["disabled"],et=m("input",{hidden:""},null,-1),at=m("span",null,"Cancelar",-1),tt=m("span",null,"Crear",-1),st=x({__name:"DrawForm",emits:["submit","success","error","cancel"],setup(u,{emit:s}){const n=U("idle"),c=U([]),o=s,i=P(()=>n.value==="pending"),d=P(()=>n.value==="pending"||i.value),C=new da("es-CO",{dateStyle:"long"}),G=ze(S.object({lottery_id:S.string({required_error:"Lotería es requerida"}).refine(g=>{var A;return(A=c.value)==null?void 0:A.some(T=>T.id.toString()===g)},{message:"El Sorteo no existe"}),name:S.string().refine(g=>g,{message:"La descripción es requerida"}),drawn_at:S.string().refine(g=>g,{message:"La fecha es requerida"})})),{handleSubmit:W,setFieldValue:E,values:V}=De({validationSchema:G,initialValues:{}}),$=P({get:()=>V.drawn_at?ma(V.drawn_at):void 0,set:g=>g}),F=()=>{Ya().then(g=>{c.value=g}).catch(g=>{console.error(g)}).finally(()=>{})},Z=W(g=>{n.value="pending",Sa({...g,lottery_id:parseInt(g.lottery_id)}).then(()=>{n.value="success"}).catch(()=>{n.value="error"}).finally(()=>{setTimeout(()=>{n.value="idle"},500)})}),O=()=>{o("cancel")};return _e($,g=>{g&&(!V.name||V.name.startsWith("Sorteo del "))&&E("name",`Sorteo del ${C.format(he(g))}`)}),_e(n,g=>{g==="success"&&o("success"),g==="error"&&o("error"),g==="pending"&&o("submit",V)}),ce(async()=>{F()}),(g,A)=>{const T=fe("auto-animate");return l(),_("form",{onSubmit:A[2]||(A[2]=Fe((...q)=>e(Z)&&e(Z)(...q),["prevent"])),class:"@container/form w-full flex flex-col gap-2","aria-disabled":d.value},[m("fieldset",{disabled:d.value},[a(e(R),{name:"lottery_id"},{default:t(({componentField:q})=>[a(e(z),null,{default:t(()=>[a(e(N),null,{default:t(()=>[y("Lotería")]),_:1}),a(e(qe),Q(se(q)),{default:t(()=>[a(e(L),null,{default:t(()=>[a(e(Ee),null,{default:t(()=>[a(e(Ne),{placeholder:"Elige una loteria"})]),_:1})]),_:1}),a(e(Le),null,{default:t(()=>[a(e(Me),null,{default:t(()=>[a(e(Re),null,{default:t(()=>[y("Loterías")]),_:1}),(l(!0),_(X,null,K(c.value,ee=>(l(),p(e(Ue),{key:ee.id,value:ee.id.toString()},{default:t(()=>[y(J(ee.name),1)]),_:2},1032,["value"]))),128))]),_:1})]),_:1})]),_:2},1040),k((l(),_("div",null,[a(e(M))])),[[T]])]),_:2},1024)]),_:1}),a(e(R),{name:"name"},{default:t(({componentField:q})=>[a(e(z),null,{default:t(()=>[a(e(N),null,{default:t(()=>[y("Descripción del sorteo")]),_:1}),a(e(L),null,{default:t(()=>[a(e(te),w({type:"text",placeholder:"Descripción corta del sorteo"},q,{required:""}),null,16)]),_:2},1024),a(e(we),null,{default:t(()=>[y(' Descripción corta del sorteo, e.j. "Sorteo del 10 de Mayo de 2024". ')]),_:1}),k((l(),_("div",null,[a(e(M))])),[[T]])]),_:2},1024)]),_:1}),a(e(R),{name:"drawn_at"},{default:t(()=>[a(e(z),{class:"flex flex-col"},{default:t(()=>[a(e(N),null,{default:t(()=>[y("Fecha del sorteo")]),_:1}),a(e(Za),null,{default:t(()=>[a(e(Ka),{"as-child":""},{default:t(()=>[a(e(L),null,{default:t(()=>[a(e(j),{variant:"outline",class:le(e(D)("w-full ps-3 text-start font-normal",!$.value&&"text-muted-foreground"))},{default:t(()=>[m("span",null,J($.value?e(C).format(e(he)($.value)):"Seleccione una fecha"),1),a(e(Pa),{class:"ms-auto h-4 w-4 opacity-50"})]),_:1},8,["class"]),et]),_:1})]),_:1}),a(e(Xa),{class:"w-auto p-0"},{default:t(()=>[a(e(Ma),{modelValue:$.value,"onUpdate:modelValue":[A[0]||(A[0]=q=>$.value=q),A[1]||(A[1]=q=>{q?e(E)("drawn_at",q.toString()):e(E)("drawn_at",void 0)})],"calendar-label":"Date of birth","initial-focus":"","min-value":e(ca)(e(fa)())},null,8,["modelValue","min-value"])]),_:1})]),_:1}),a(e(we),null,{default:t(()=>[y(" Fecha del sorteo. ")]),_:1}),k((l(),_("div",null,[a(e(M))])),[[T]])]),_:1})]),_:1}),a(e(z),{class:"space-y-0 w-full py-2 flex flex-col-reverse md:flex-row items-center justify-end gap-2"},{default:t(()=>[a(e(j),{type:"button",class:"w-full gap-2 @xl/form:w-auto",variant:"outline",onClick:O},{default:t(()=>[at]),_:1}),k((l(),p(e(j),{type:"submit",class:"w-full gap-2 @xl/form:w-auto"},{default:t(()=>[i.value?(l(),p(e(me),{key:0,class:"h-6 w-6"})):(l(),p(e(Y),{key:1,class:"w-6 h-6"})),tt]),_:1})),[[T]])]),_:1})],8,Qa)],40,Ja)}}}),lt=["aria-disabled"],ot=["disabled"],nt={class:"flex flex-row gap-2"},rt={key:0,class:"p-4",value:""},ut={class:"grid gap-4 sm:grid-cols-2 sm:gap-6"},it={class:"border col-span-2 rounded-md p-4 flex flex-col gap-4"},dt={class:"text-lg font-medium flex gap-2"},ct=m("span",null,"Premios",-1),ft=["onClick"],mt={class:"w-full border p-4 rounded-md"},pt={class:"text-lg font-medium"},_t={class:"w-full py-2 flex flex-row items-center justify-end"},ht=m("span",null,"Agregar premio",-1),gt=m("span",null,"Crear",-1),ke=1,Ce=5e6,vt=x({__name:"RaffleForm",props:ge({withoutActions:{type:[Boolean,String],default:!1}},{isSubmiting:{type:Boolean,required:!1,default:!1},isSubmitingModifiers:{}}),emits:ge(["success"],["update:isSubmiting"]),setup(u,{emit:s}){const n=["image/jpeg","image/jpg","image/png","image/webp"],c=u,o=pa(u,"isSubmiting"),i=U([]),d=U({draw_id:void 0,name:"",description:"",image_path:null,thumb_hash:null,number_of_tickets:1e3,ticket_price:"",prizes:[{key:ye().slice(-10),name:"",prize_value:"",image:null,thumb_hash:null}]}),C=_a(async()=>await xe()),G=ha(()=>{console.log("Clearing cache"),C.clear()},3e4),W=ze(S.object({draw_id:S.string({required_error:"Sorteo es requerido"}).refine(async r=>{try{G()}catch(f){console.error(f)}return await C().then(f=>f==null?void 0:f.some(h=>h.id.toString()===r))},{message:"El Sorteo no existe"}),name:S.string({required_error:"Nombre es requerido"}).min(3,{message:"Nombre debe tener al menos 3 caracteres"}),description:S.string({required_error:"La descripción es requerida"}).min(3,{message:"La descripción debe tener al menos 3 caracteres"}),number_of_tickets:S.number({required_error:"El numero de tickets es requerido"}).min(100,{message:"El numero de tickets debe ser mayor o igual a 100"}),ticket_price:S.string({required_error:"El valor es requerido"}).transform(r=>parseFloat(r)).refine(r=>!isNaN(r)&&r>=1,{message:"El valor debe ser un número mayor o igual a 1"}),prizes:S.array(S.object({name:S.string({required_error:"Nombre es requerido"}).min(3,{message:"Nombre debe tener al menos 3 caracteres"}),prize_value:S.string({required_error:"El valor es requerido"}).transform(r=>parseFloat(r)).refine(r=>!isNaN(r)&&r>=1,{message:"El valor debe ser un número mayor o igual a 1"}),image:S.instanceof(File).refine(r=>r instanceof File,{message:"Debe seleccionar una imagen"}).refine(r=>n.includes(r.type),{message:"Tipo de archivo no aceptado"}).refine(r=>r.size>=ke,{message:"El archivo está vacío"}).refine(r=>r.size<=Ce,{message:"El archivo es demasiado grande"})})).min(1),image:S.instanceof(File).refine(r=>r instanceof File,{message:"Debe seleccionar una imagen"}).refine(r=>n.includes(r.type),{message:"Tipo de archivo no aceptado"}).refine(r=>r.size>=ke,{message:"El archivo está vació"}).refine(r=>r.size<=Ce,{message:"El archivo es demasiado grande"})})),E=De({validationSchema:W,initialValues:{number_of_tickets:d.value.number_of_tickets}}),V=s,$=()=>{d.value.prizes.push({key:ye().slice(-10),name:"",prize_value:"",image:null,thumb_hash:null})},F=r=>{d.value.prizes.length>1&&d.value.prizes.find(h=>h.key===r)&&(d.value.prizes=d.value.prizes.filter(h=>h.key!==r))},Z=async r=>{const f=await ya(r,r.name);return f==null?void 0:f.fullPath},O=async r=>{const f=await{draw_id:parseInt(r.draw_id),name:r.name,description:r.description,image_path:await Z(r.image),thumb_hash:d.value.thumb_hash,number_of_tickets:r.number_of_tickets,ticket_price:r.ticket_price,prizes:[]};return await r.prizes.forEach(async(h,v)=>{await Z(h.image).then(b=>{f.prizes.push({name:h.name,prize_value:h.prize_value,thumb_hash:d.value.prizes[v].thumb_hash,image_path:b})})}),f},g=E.handleSubmit(async r=>{o.value=!0,E.setErrors({}),o.value=!1;const f=await O(r);Oe(f).then(h=>{console.log(h),V("success")}).catch(h=>{console.log(h)}).finally(()=>{o.value=!1})},({errors:r})=>{const f=Object.keys(r)[0].replace("[",".").replace("]",""),h=document.querySelector(`[name="${f}"]`);h&&h.scrollIntoView({behavior:"smooth",block:"center"})}),A=P(()=>c.withoutActions===""||c.withoutActions===!0),T=U(!1),q=()=>{T.value=!1},ee=async()=>{q(),await pe()},pe=async()=>{o.value=!0,await xe().then(r=>i.value=r).finally(()=>o.value=!1),console.log(i.value)};return ce(async()=>{await pe()}),(r,f)=>{const h=fe("auto-animate");return l(),_("form",{onSubmit:f[7]||(f[7]=Fe((...v)=>e(g)&&e(g)(...v),["prevent"])),class:"@container/form w-full flex flex-col gap-2","aria-disabled":o.value},[m("fieldset",{disabled:o.value},[a(e(R),{name:"name"},{default:t(({componentField:v})=>[a(e(z),null,{default:t(()=>[a(e(N),null,{default:t(()=>[y("Nombre")]),_:1}),a(e(L),null,{default:t(()=>[a(e(te),w({type:"text",placeholder:"Nombre de la Rifa"},v,{"model-value":d.value.name,"onUpdate:modelValue":f[0]||(f[0]=b=>d.value.name=b),required:""}),null,16,["model-value"])]),_:2},1024),k((l(),_("div",null,[a(e(M))])),[[h]])]),_:2},1024)]),_:1}),a(e(R),{name:"draw_id"},{default:t(({componentField:v})=>[a(e(z),null,{default:t(()=>[a(e(N),null,{default:t(()=>[y("Sorteo")]),_:1}),a(e(qe),w(v,{"model-value":d.value.draw_id,"onUpdate:modelValue":f[2]||(f[2]=b=>d.value.draw_id=b)}),{default:t(()=>[a(e(L),null,{default:t(()=>[m("div",nt,[a(e(Ee),null,{default:t(()=>[a(e(Ne),{placeholder:"Elige un sorteo"})]),_:1}),a(e(Se),{open:T.value,"onUpdate:open":f[1]||(f[1]=b=>T.value=b)},{default:t(()=>[a(e(Ae),{"as-child":""},{default:t(()=>[a(e(j),{variant:"outline",type:"button"},{default:t(()=>[a(e(Y),{class:"w-6 h-6"})]),_:1})]),_:1}),a(e(Pe),null,{default:t(()=>[a(e(Be),null,{default:t(()=>[a(e(Ve),null,{default:t(()=>[y("Crear nuevo sorteo")]),_:1}),a(st,{onSuccess:ee,onCancel:q})]),_:1})]),_:1})]),_:1},8,["open"])])]),_:1}),a(e(Le),null,{default:t(()=>[a(e(Me),null,{default:t(()=>[a(e(Re),null,{default:t(()=>[y("Sorteos")]),_:1}),i.value.length===0?(l(),_("div",rt,"No hay sorteos")):ne("",!0),(l(!0),_(X,null,K(i.value,b=>(l(),p(e(Ue),{key:b.id,value:b.id.toString()},{default:t(()=>[y(J(b.name),1)]),_:2},1032,["value"]))),128))]),_:1})]),_:1})]),_:2},1040,["model-value"]),k((l(),_("div",null,[a(e(M))])),[[h]])]),_:2},1024)]),_:1}),a(e(R),{name:"description"},{default:t(({componentField:v})=>[a(e(z),null,{default:t(()=>[a(e(N),null,{default:t(()=>[y("Descripción")]),_:1}),a(e(L),null,{default:t(()=>[a(e(Na),w({type:"text",placeholder:"Descripción de la Rifa"},v,{"model-value":d.value.description,"onUpdate:modelValue":f[3]||(f[3]=b=>d.value.description=b),required:""}),null,16,["model-value"])]),_:2},1024),k((l(),_("div",null,[a(e(M))])),[[h]])]),_:2},1024)]),_:1}),a(e(R),{name:"number_of_tickets"},{default:t(({componentField:v})=>[a(e(z),null,{default:t(()=>[a(e(N),null,{default:t(()=>[y("Número de Bonos:")]),_:1}),a(e(L),null,{default:t(()=>[a(e(te),w({type:"number",inputmode:"numeric",placeholder:"Nombre de la Rifa"},v,{"model-value":d.value.number_of_tickets,"onUpdate:modelValue":f[4]||(f[4]=b=>d.value.number_of_tickets=b),required:""}),null,16,["model-value"])]),_:2},1024),k((l(),_("div",null,[a(e(M))])),[[h]])]),_:2},1024)]),_:1}),a(e(R),{name:"ticket_price"},{default:t(({value:v,handleChange:b})=>[a(e(z),null,{default:t(()=>[a(e(N),null,{default:t(()=>[y("Costo del Bono")]),_:1}),a(e(L),null,{default:t(()=>[a(ve,{"model-value":v,"onUpdate:modelValue":[I=>b(I,!0),f[5]||(f[5]=I=>d.value.ticket_price=I)],modelValue:d.value.ticket_price,required:""},null,8,["model-value","onUpdate:modelValue","modelValue"])]),_:2},1024),k((l(),_("div",null,[a(e(M))])),[[h]])]),_:2},1024)]),_:1}),a(e(R),{name:"image"},{default:t(({componentField:v})=>[a(e(z),null,{default:t(()=>[a(e(N),null,{default:t(()=>[y("Portada de la rifa")]),_:1}),a(e(L),null,{default:t(()=>[a(be,w(v,{base64ThumbHash:d.value.thumb_hash,"onUpdate:base64ThumbHash":f[6]||(f[6]=b=>d.value.thumb_hash=b)}),null,16,["base64ThumbHash"])]),_:2},1024),k((l(),_("div",null,[a(e(M))])),[[h]])]),_:2},1024)]),_:1}),m("div",ut,[k((l(),_("fieldset",it,[m("legend",dt,[a(e(ba),{class:"w-8 h-8"}),ct]),(l(!0),_(X,null,K(d.value.prizes,(v,b)=>(l(),_("div",{class:"w-full relative",key:v.key},[d.value.prizes.length>1?(l(),_("button",{key:0,type:"button",class:"bg-background rounded-xl absolute right-0 top-0",onClick:I=>F(v.key)},[a(e(Ea),{class:"w-8 h-8"})],8,ft)):ne("",!0),m("fieldset",mt,[m("legend",pt,"Premio "+J(b+1),1),a(e(R),{name:"prizes."+b+".name"},{default:t(({componentField:I})=>[a(e(z),null,{default:t(()=>[a(e(N),null,{default:t(()=>[y("Nombre")]),_:1}),a(e(L),null,{default:t(()=>[a(e(te),w({type:"text",placeholder:"Nombre del premio",ref_for:!0},I,{"model-value":v.name,"onUpdate:modelValue":ae=>v.name=ae,required:""}),null,16,["model-value","onUpdate:modelValue"])]),_:2},1024),k((l(),_("div",null,[a(e(M))])),[[h]])]),_:2},1024)]),_:2},1032,["name"]),a(e(R),{name:"prizes."+b+".prize_value"},{default:t(({value:I,handleChange:ae})=>[a(e(z),null,{default:t(()=>[a(e(N),null,{default:t(()=>[y("Valor del premio")]),_:1}),a(e(L),null,{default:t(()=>[a(ve,{"model-value":I,"onUpdate:modelValue":[oe=>ae(oe,!0),oe=>v.prize_value=oe],modelValue:v.prize_value,required:""},null,8,["model-value","onUpdate:modelValue","modelValue"])]),_:2},1024),k((l(),_("div",null,[a(e(M))])),[[h]])]),_:2},1024)]),_:2},1032,["name"]),a(e(R),{name:"prizes."+b+".image"},{default:t(({componentField:I})=>[a(e(z),null,{default:t(()=>[a(e(N),null,{default:t(()=>[y("Imagen")]),_:1}),a(e(L),null,{default:t(()=>[a(be,w({ref_for:!0},I,{base64ThumbHash:v.thumb_hash,"onUpdate:base64ThumbHash":ae=>v.thumb_hash=ae}),null,16,["base64ThumbHash","onUpdate:base64ThumbHash"])]),_:2},1024),k((l(),_("div",null,[a(e(M))])),[[h]])]),_:2},1024)]),_:2},1032,["name"])])]))),128)),m("div",_t,[a(e(j),{variant:"outline",type:"button",class:"w-full gap-2 @xl/form:w-auto",onClick:$},{default:t(()=>[a(e(Y),{class:"w-6 h-6"}),ht]),_:1})])])),[[h]])]),A.value?ne("",!0):B(r.$slots,"actions",Q(w({key:0},{isSubmiting:o.value})),()=>[a(e(z),{class:"w-full py-2 flex flex-row items-center justify-end"},{default:t(()=>[k((l(),p(e(j),{type:"submit",class:"w-full gap-2 @xl/form:w-auto"},{default:t(()=>[o.value?(l(),p(e(me),{key:0,class:"h-6 w-6"})):(l(),p(e(Y),{key:1,class:"w-6 h-6"})),gt]),_:1})),[[h]])]),_:1})])],8,ot)],40,lt)}}}),bt={class:"w-full flex flex-col items-center"},yt={class:"flex flex-col w-full max-w-3xl gap-4"},wt={class:"grow relative"},xt=m("span",{class:"hidden md:inline"},"Nueva rifa",-1),$t={class:"flex flex-row gap-2 justify-start items-center"},kt=m("span",null," Nueva Rifa ",-1),Ct={class:"px-6 py-4 overflow-y-auto relative"},St=m("span",null,"Crear",-1),Pt={class:"w-full flex flex-col gap-4 items-center"},Bt=m("div",{class:"w-full flex flex-col items-center"},null,-1),Xt=x({__name:"HomeView",setup(u){const s=U(!1),n=U(!1),c=U(""),o=U([]),i=U(!1),d=U(!1),C=U(null),G=P(()=>o.value.filter($=>$.name.toLowerCase().includes(c.value.toLowerCase())));ga(C,([{isIntersecting:$}])=>{d.value=!$},{rootMargin:"-65px",threshold:1});const W=()=>{i.value=!1},E=async()=>{W(),await V()},V=async()=>{s.value=!0,await je().then($=>{o.value=$}).catch($=>{console.log($)}).finally(()=>{s.value=!1})};return ce(async()=>{await V()}),($,F)=>{const Z=fe("auto-animate");return l(),_("div",bt,[m("div",{ref_key:"sentinal",ref:C,class:"w-full h-0"},null,512),m("div",yt,[m("div",{class:le(["flex flex-row gap-4 transition-all duration-300 bg-background-elevated/90 backdrop-blur px-4 py-3 border rounded-lg sticky top-16 z-10",{"!bg-background/90 @3xl/main:!bg-background-elevated/90 rounded-none @3xl/main:rounded-b-lg border-t-0 border-x-0 @3xl/main:border-x -mx-4":d.value}])},[m("div",wt,[a(e(wa),{class:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"}),a(te,{type:"text",modelValue:c.value,"onUpdate:modelValue":F[0]||(F[0]=O=>c.value=O),autocomplete:"off",placeholder:"Buscar",class:"w-full pl-11 pr-4 py-2 text-sm"},null,8,["modelValue"])]),a(e(Se),{open:i.value,"onUpdate:open":F[2]||(F[2]=O=>i.value=O)},{default:t(()=>[a(e(Ae),{asChild:""},{default:t(()=>[a(e(j),{class:"gap-2"},{default:t(()=>[a(e(Y),{class:"w-5 h-5"}),xt]),_:1})]),_:1}),a(e(Pe),{class:"transition-[opacity,_transform] gap-0 p-0 max-w-2xl w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] rounded-lg grid-rows-[auto_minmax(0,1fr)_auto]"},{default:t(()=>[a(e(Be),{class:"p-6 pb-4 border-b"},{default:t(()=>[a(e(Ve),null,{default:t(()=>[m("div",$t,[a(e(xa),{class:"w-8 h-8"}),kt])]),_:1}),a(e(Ie),null,{default:t(()=>[y(" Crea una nueva rifa ")]),_:1})]),_:1}),m("div",Ct,[a(vt,{withoutActions:"",id:"raffle-form",isSubmiting:n.value,"onUpdate:isSubmiting":F[1]||(F[1]=O=>n.value=O),onSuccess:E},null,8,["isSubmiting"])]),a(e($a),{class:"p-6 pt-4 border-t gap-2"},{default:t(()=>[a(e(ka),{"as-child":""},{default:t(()=>[a(e(j),{variant:"secondary",type:"button",disabled:n.value},{default:t(()=>[y("Cancelar")]),_:1},8,["disabled"])]),_:1}),k((l(),p(e(j),{class:"gap-3",form:"raffle-form",type:"submit",disabled:n.value},{default:t(()=>[n.value?(l(),p(e(me),{key:0,class:"h-6 w-6"})):(l(),p(e(Y),{key:1,class:"w-6 h-6"})),St]),_:1},8,["disabled"])),[[Z]])]),_:1})]),_:1})]),_:1},8,["open"])],2),m("div",Pt,[a(Te,{raffles:G.value,loading:s.value},null,8,["raffles","loading"])])]),Bt])}}});export{Xt as default};