import{d as p,o as n,j as h,w as f,l as u,n as g,e,m as w,aQ as B,A as $,aR as S,G as V,H as C,aS as z,aT as k,c as d,g as L,r as v,y as j,ad as N,a as r,b as c,aU as A,ac as F,F as M,i as P,B as b,t as _}from"./index-Dsy3Kz98.js";import{_ as R}from"./Input.vue_vue_type_script_setup_true_lang-CNOVHztH.js";import{S as T}from"./magnifer-outline-8OTH2XWC.js";import{a as U}from"./strings-BzWVocVB.js";const D=p({__name:"Avatar",props:{class:{},size:{default:"sm"},shape:{default:"circle"}},setup(o){const s=o;return(t,i)=>(n(),h(e(B),{class:g(e(w)(e(O)({size:t.size,shape:t.shape}),s.class))},{default:f(()=>[u(t.$slots,"default")]),_:3},8,["class"]))}}),E=p({__name:"AvatarImage",props:{src:{},asChild:{type:Boolean},as:{}},setup(o){const s=o;return(t,i)=>(n(),h(e(S),$(s,{class:"h-full w-full object-cover"}),null,16))}}),I=p({__name:"AvatarFallback",props:{delayMs:{},asChild:{type:Boolean},as:{}},setup(o){const s=o;return(t,i)=>(n(),h(e(z),V(C(s)),{default:f(()=>[u(t.$slots,"default")]),_:3},16))}}),O=k("inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden",{variants:{size:{sm:"h-10 w-10 text-xs",base:"h-16 w-16 text-2xl",lg:"h-32 w-32 text-5xl"},shape:{circle:"rounded-full",square:"rounded-md"}}}),q=p({__name:"Badge",props:{variant:{},class:{}},setup(o){const s=o;return(t,i)=>(n(),d("div",{class:g(e(w)(e(G)({variant:t.variant}),s.class))},[u(t.$slots,"default")],2))}}),G=k("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}}),H={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},Q=L('<g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="6" r="4"></circle><path d="M14 20.834c-.634.108-1.305.166-2 .166c-3.866 0-7-1.79-7-4s3.134-4 7-4c1.713 0 3.283.352 4.5.936" opacity=".5"></path><circle cx="17" cy="18" r="4"></circle><path stroke-linecap="round" stroke-linejoin="round" d="m15.667 16.667l2.666 2.666m0-2.666l-2.666 2.666"></path></g>',1),J=[Q];function K(o,s){return n(),d("svg",H,[...J])}const W={name:"solar-user-cross-rounded-line-duotone",render:K},X={class:"flex flex-col w-full max-w-3xl"},Y={class:"grow relative"},Z={class:"flex-1 overflow-auto rounded-b-lg border border-t-0"},ee={class:""},se={key:0,class:"px-4 py-4 flex flex-col justify-center items-center gap-2"},te={key:1,class:"px-4 py-4 flex flex-col justify-center items-center gap-2"},ae=r("p",{class:"text-lg"},"No hay vendedores",-1),re=r("div",{class:"w-full border-t flex flex-col items-center justify-center my-4"},null,-1),oe={class:"divide-y"},ne={class:"flex-1"},le={class:"font-medium capitalize"},ce={class:"text-sm text-foreground/60"},pe=p({__name:"SellersList",props:{sellers:{default:()=>[]},isLoading:{type:Boolean,default:!1},sortBy:{},filterBy:{}},setup(o){const s=o,t=v(!1),i=v(""),x=v(null),y=j(()=>{let a=s.sellers.filter(m=>m.name.toLowerCase().includes(i.value.toLowerCase()));return s.filterBy&&(a=a.filter(s.filterBy)),s.sortBy&&a.sort(s.sortBy),a});return N(x,([{isIntersecting:a}])=>{t.value=!a},{rootMargin:"-65px"}),(a,m)=>(n(),d("div",X,[r("div",{ref_key:"sentinal",ref:x,class:"w-full h-0"},null,512),r("div",{class:g(["flex flex-row gap-4 transition-all duration-300 bg-background-elevated/90 backdrop-blur px-4 py-3 border rounded-lg rounded-b-none sticky top-16 z-10",{"!bg-background/90 @3xl/main:!bg-background-elevated/90 rounded-none @3xl/main:rounded-b-lg border-t-0 border-x-0 @3xl/main:border-x -mx-4":t.value}])},[r("div",Y,[c(e(T),{class:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"}),c(e(R),{type:"text",modelValue:i.value,"onUpdate:modelValue":m[0]||(m[0]=l=>i.value=l),autocomplete:"off",placeholder:"Buscar",class:"w-full pl-11 pr-4 py-2 text-sm"},null,8,["modelValue"])]),u(a.$slots,"actionButton")],2),r("div",Z,[r("div",ee,[a.isLoading?(n(),d("div",se,[c(A,{class:"my-12"})])):y.value.length===0?(n(),d("div",te,[c(e(W),{class:"w-16 h-16"}),u(a.$slots,"emptyText",{},()=>[ae]),re,u(a.$slots,"actionForEmpty")])):F("",!0),r("div",oe,[(n(!0),d(M,null,P(y.value,l=>(n(),d("div",{key:l.id,class:"px-4 py-3 flex items-center gap-4"},[c(e(D),{class:"w-10 h-10"},{default:f(()=>[c(e(E),{class:"",src:l.avatar_url||""},null,8,["src"]),c(e(I),null,{default:f(()=>[b(_(e(U)(l.name)),1)]),_:2},1024)]),_:2},1024),r("div",ne,[r("div",le,_(l.name),1),r("div",ce,_(l.phone),1)]),c(e(q),null,{default:f(()=>[b(_(l.total_tickets),1)]),_:2},1024),u(a.$slots,"itemAction",{seller:l})]))),128))])])])]))}});export{pe as _};