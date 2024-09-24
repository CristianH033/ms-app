import{d as p,o as d,c as u,v as f,n as c,e as t,C as _,aY as h,a as i,m as w,g as b,b as a,w as l,O as o}from"./index-B4iZ3EM6.js";const v=p({__name:"Alert",props:{class:{},variant:{}},setup(r){const s=r;return(e,n)=>(d(),u("div",{class:c(t(_)(t(k)({variant:e.variant}),s.class)),role:"alert"},[f(e.$slots,"default")],2))}}),m=p({__name:"AlertTitle",props:{class:{}},setup(r){const s=r;return(e,n)=>(d(),u("h5",{class:c(t(_)("mb-1 font-medium leading-none tracking-tight",s.class))},[f(e.$slots,"default")],2))}}),g=p({__name:"AlertDescription",props:{class:{}},setup(r){const s=r;return(e,n)=>(d(),u("div",{class:c(t(_)("text-sm [&_p]:leading-relaxed",s.class))},[f(e.$slots,"default")],2))}}),k=h("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}}),C=p({__name:"SeparatorLine",props:{variant:{default:"horizontal"}},setup(r){const s=r;return(e,n)=>(d(),u("div",{class:c(["relative flex items-center py-5",s.variant==="horizontal"?"flex-row":"flex-col"])},[n[0]||(n[0]=i("div",{class:"flex-grow border-t"},null,-1)),i("span",{class:c(["mx-4 flex-shrink",{orientation:s.variant==="horizontal"}])},[f(e.$slots,"default")],2),n[1]||(n[1]=i("div",{class:"flex-grow border-t"},null,-1))],2))}}),$={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"};function M(r,s){return d(),u("svg",$,s[0]||(s[0]=[i("g",{fill:"none",stroke:"currentColor","stroke-width":"1.5"},[i("path",{"stroke-linecap":"round",d:"M5 15h1.394c.786 0 1.18 0 1.511.177c.332.178.55.505.986 1.159l.16.24c.422.633.633.95.92.933c.286-.017.459-.356.803-1.036l1.966-3.877c.359-.706.538-1.06.831-1.071c.293-.012.5.326.914 1.001l.637 1.04c.43.701.644 1.051.985 1.243c.342.19.752.19 1.573.19H19"}),i("path",{d:"M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z",opacity:".5"})],-1)]))}const y=w({name:"solar-pulse-line-duotone",render:M}),V={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"};function z(r,s){return d(),u("svg",V,s[0]||(s[0]=[b('<g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 22v-6a8 8 0 1 0-16 0v6" opacity=".5"></path><path stroke-linecap="round" d="M14.29 11.5a4 4 0 0 1 2.21 2.21M2 22h20M12 2v3m9 1l-1.5 1.5M3 6l1.5 1.5"></path><path d="M13.5 17.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Z"></path><path stroke-linecap="round" d="M12 19v3" opacity=".5"></path></g>',1)]))}const x=w({name:"solar-siren-rounded-line-duotone",render:z}),A={class:"flex w-full flex-col items-center gap-4"},S={class:"flex w-full max-w-3xl flex-col gap-4"},N=p({__name:"NotificationsView",setup(r){return(s,e)=>(d(),u("div",A,[i("div",S,[a(t(v),{class:"[&>svg~*]:pl-10"},{default:l(()=>[a(t(y),{class:"h-8 w-8"}),a(t(m),null,{default:l(()=>e[0]||(e[0]=[o("Cambios pendientes!")])),_:1}),a(t(g),null,{default:l(()=>e[1]||(e[1]=[o(" Hay cambios pendientes para aplicar en la base de datos. ")])),_:1})]),_:1}),a(t(v),{variant:"destructive",class:"[&>svg~*]:pl-10"},{default:l(()=>[a(t(x),{class:"h-8 w-8"}),a(t(m),null,{default:l(()=>e[2]||(e[2]=[o("Error")])),_:1}),a(t(g),null,{default:l(()=>e[3]||(e[3]=[o(" Algo salió mal mientras se sincronizaba la base de datos. ")])),_:1})]),_:1}),a(C,null,{default:l(()=>e[4]||(e[4]=[o("Ayer")])),_:1}),a(t(v),{variant:"destructive",class:"[&>svg~*]:pl-10"},{default:l(()=>[a(t(x),{class:"h-8 w-8"}),a(t(m),null,{default:l(()=>e[5]||(e[5]=[o("Error")])),_:1}),a(t(g),null,{default:l(()=>e[6]||(e[6]=[o(" Algo salió mal mientras se sincronizaba la base de datos. ")])),_:1})]),_:1})])]))}});export{N as default};