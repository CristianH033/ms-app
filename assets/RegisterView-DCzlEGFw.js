import{d as C,f as E,r as P,ba as M,S as V,o,c as u,a as i,b as a,w as l,e,P as r,_ as y,B as f,U as _,j,V as B,N as F,a8 as R,W as A}from"./index-DVOd51A8.js";import{_ as G,a as T,b as h,c as U}from"./CardContent.vue_vue_type_script_setup_true_lang-_m5mB9Nw.js";import{_ as L,a as z}from"./CardFooter.vue_vue_type_script_setup_true_lang-D7Z4ruQV.js";import{_ as c}from"./Input.vue_vue_type_script_setup_true_lang-BXRwYxYR.js";import{C as I,a as O,_ as W}from"./google-CjI3EWVH.js";import{t as Y,o as D,s as p,u as H,F as g,_ as v,a as w,b as x,c as b}from"./vee-validate-zod.esm-DJ9wuxOA.js";const J=["aria-disabled"],K=["disabled"],Q={class:"grid grid-cols-2 gap-6"},X={class:"grid gap-4 sm:grid-cols-2 sm:gap-6"},Z={class:"self-end text-left text-sm text-muted-foreground"},ee=C({__name:"RegisterForm",setup(S){const q=E(),d=P(!1),k=Y(D({firstName:p({required_error:"Nombre es requerido"}).min(3,{message:"Minimo 3 caracteres"}),lastName:p({required_error:"Apellido es requerido"}).min(3,{message:"Minimo 3 caracteres"}),email:p({required_error:"Email es requerido"}).min(5,{message:"Minimo 5 caracteres"}).email({message:"Email invalido"}),password:p({required_error:"Password es requerido"}).min(6,{message:"Minimo 6 caracteres"}),repeatPassword:p({required_error:"Confirmar contraseña es requerido"}).min(6,{message:"Minimo 6 caracteres"})}).refine(n=>n.password===n.repeatPassword,{message:"Las contraseñas no coinciden",path:["repeatPassword"]})),$=H({validationSchema:k}),N=$.handleSubmit(async n=>{d.value=!0,q.register(n.firstName,n.lastName,n.email,n.password).then(()=>{}).catch(s=>{console.log(s),s instanceof M?$.setFieldError("email","Credenciales incorrectas"):console.log("Unknown Error",s)}).finally(()=>{d.value=!1})});return(n,s)=>{const m=V("auto-animate");return o(),u("form",{onSubmit:s[0]||(s[0]=A((...t)=>e(N)&&e(N)(...t),["prevent"])),class:"w-full","aria-disabled":d.value},[i("fieldset",{disabled:d.value},[a(e(U),{class:"w-full"},{default:l(()=>[a(e(G),{class:"space-y-1"},{default:l(()=>[a(e(T),{class:"text-2xl"},{default:l(()=>s[1]||(s[1]=[r(" Crear cuenta ")])),_:1}),a(e(L),null,{default:l(()=>s[2]||(s[2]=[r(" Crea una cuenta para comenzar. ")])),_:1})]),_:1}),a(e(h),{class:"grid gap-4"},{default:l(()=>[i("div",Q,[a(e(y),{type:"button",variant:"outline"},{default:l(()=>[a(e(I),{class:"mr-2 h-4 w-4"}),s[3]||(s[3]=r(" Github "))]),_:1}),a(e(y),{type:"button",variant:"outline"},{default:l(()=>[a(e(O),{class:"mr-2 h-4 w-4"}),s[4]||(s[4]=r(" Google "))]),_:1})]),s[10]||(s[10]=i("div",{class:"relative"},[i("div",{class:"absolute inset-0 flex items-center"},[i("span",{class:"w-full border-t"})]),i("div",{class:"relative flex justify-center text-xs uppercase"},[i("span",{class:"bg-background px-2 text-muted-foreground"}," O continuar con ")])],-1)),i("div",X,[a(e(g),{name:"firstName"},{default:l(({componentField:t})=>[a(e(v),null,{default:l(()=>[a(e(w),null,{default:l(()=>s[5]||(s[5]=[r("Nombres")])),_:1}),a(e(x),null,{default:l(()=>[a(e(c),f({type:"text",placeholder:"john"},t,{required:""}),null,16)]),_:2},1024),_((o(),u("div",null,[a(e(b))])),[[m]])]),_:2},1024)]),_:1}),a(e(g),{name:"lastName"},{default:l(({componentField:t})=>[a(e(v),null,{default:l(()=>[a(e(w),null,{default:l(()=>s[6]||(s[6]=[r("Apellidos")])),_:1}),a(e(x),null,{default:l(()=>[a(e(c),f({type:"text",placeholder:"doe"},t,{required:""}),null,16)]),_:2},1024),_((o(),u("div",null,[a(e(b))])),[[m]])]),_:2},1024)]),_:1})]),a(e(g),{name:"email"},{default:l(({componentField:t})=>[a(e(v),null,{default:l(()=>[a(e(w),null,{default:l(()=>s[7]||(s[7]=[r("Email")])),_:1}),a(e(x),null,{default:l(()=>[a(e(c),f({type:"email",placeholder:"mail@example.com"},t,{required:""}),null,16)]),_:2},1024),_((o(),u("div",null,[a(e(b))])),[[m]])]),_:2},1024)]),_:1}),a(e(g),{name:"password"},{default:l(({componentField:t})=>[a(e(v),null,{default:l(()=>[a(e(w),null,{default:l(()=>s[8]||(s[8]=[r("Contraseña")])),_:1}),a(e(x),null,{default:l(()=>[a(e(c),f({type:"password"},t,{required:""}),null,16)]),_:2},1024),_((o(),u("div",null,[a(e(b))])),[[m]])]),_:2},1024)]),_:1}),a(e(g),{name:"repeatPassword"},{default:l(({componentField:t})=>[a(e(v),null,{default:l(()=>[a(e(w),null,{default:l(()=>s[9]||(s[9]=[r("Repetir contraseña")])),_:1}),a(e(x),null,{default:l(()=>[a(e(c),f({type:"password"},t,{required:""}),null,16)]),_:2},1024),_((o(),u("div",null,[a(e(b))])),[[m]])]),_:2},1024)]),_:1})]),_:1}),a(e(z),{class:"flex-col gap-4"},{default:l(()=>[a(e(y),{type:"submit",class:"w-full"},{default:l(()=>[d.value?(o(),j(e(B),{key:0,class:"mr-2 h-4 w-4"})):F("",!0),s[11]||(s[11]=i("span",null,"Crear cuenta",-1))]),_:1}),a(e(W)),i("p",Z,[s[13]||(s[13]=r(" Ya tienes una cuenta? ")),a(e(R),{class:"underline underline-offset-4",to:{name:"login"}},{default:l(()=>s[12]||(s[12]=[r("Iniciar sesión")])),_:1})])]),_:1})]),_:1})],8,K)],40,J)}}}),ae={class:"flex w-full max-w-md flex-col items-center justify-center gap-4 md:max-w-lg lg:max-w-xl"},oe=C({__name:"RegisterView",setup(S){return(q,d)=>(o(),u("div",ae,[a(ee)]))}});export{oe as default};
