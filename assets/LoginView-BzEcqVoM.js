import{d as C,f as q,r as F,bb as B,a2 as N,o,c,a as t,b as a,w as s,e,D as l,_ as m,B as g,v,j as T,a6 as V,ad as j,aP as G,a7 as L}from"./index-BpvGhyvb.js";import{_ as P,a as D,b as I,c as M}from"./CardContent.vue_vue_type_script_setup_true_lang-DCrHivXZ.js";import{_ as R,a as A}from"./CardFooter.vue_vue_type_script_setup_true_lang-BvFGsbgH.js";import{_ as h}from"./Input.vue_vue_type_script_setup_true_lang-C0s0ReV1.js";import{C as z,a as O,_ as U}from"./google-DJrYFMMl.js";import{t as H,o as J,s as b,a as K,F as w,_ as x,b as $,c as y,d as S}from"./vee-validate-zod.esm-DFwib2_T.js";const Q=["aria-disabled"],W=["disabled"],X={class:"grid grid-cols-2 gap-6"},Y=t("div",{class:"relative"},[t("div",{class:"absolute inset-0 flex items-center"},[t("span",{class:"w-full border-t"})]),t("div",{class:"relative flex justify-center text-xs uppercase"},[t("span",{class:"bg-background px-2 text-muted-foreground"}," O continuar con correo electrónico ")])],-1),Z=t("span",null,"Iniciar sesión",-1),ee={class:"self-end text-left text-sm text-muted-foreground"},ae=C({__name:"LoginForm",setup(E){const _=q(),r=F(!1),k=H(J({email:b({required_error:"Email es requerido"}).min(5,{message:"Minimo 5 caracteres"}).email({message:"Email invalido"}),password:b({required_error:"Password es requerido"}).min(6,{message:"Minimo 6 caracteres"})})),d=K({validationSchema:k}),f=d.handleSubmit(async u=>{r.value=!0,d.setFieldError("email",""),await new Promise(i=>setTimeout(i,500)),_.login(u.email,u.password).then(()=>{}).catch(i=>{i instanceof B?d.setFieldError("email","Credenciales incorrectas"):console.log("Unknown Error",i)}).finally(()=>{r.value=!1})});return(u,i)=>{const p=N("auto-animate");return o(),c("form",{onSubmit:i[0]||(i[0]=L((...n)=>e(f)&&e(f)(...n),["prevent"])),class:"w-full","aria-disabled":r.value},[t("fieldset",{disabled:r.value},[a(e(M),{class:"w-full"},{default:s(()=>[a(e(P),{class:"space-y-1"},{default:s(()=>[a(e(D),{class:"text-2xl"},{default:s(()=>[l(" Iniciar Sesión ")]),_:1}),a(e(R),null,{default:s(()=>[l(" Inicia sesión para comenzar. ")]),_:1})]),_:1}),a(e(I),{class:"grid gap-4"},{default:s(()=>[t("div",X,[a(e(m),{type:"button",variant:"outline"},{default:s(()=>[a(e(z),{class:"mr-2 h-4 w-4"}),l(" Github ")]),_:1}),a(e(m),{type:"button",variant:"outline"},{default:s(()=>[a(e(O),{class:"mr-2 h-4 w-4"}),l(" Google ")]),_:1})]),Y,a(e(w),{name:"email"},{default:s(({componentField:n})=>[a(e(x),null,{default:s(()=>[a(e($),null,{default:s(()=>[l("Email")]),_:1}),a(e(y),null,{default:s(()=>[a(e(h),g({type:"email",placeholder:"mail@example.com"},n,{required:""}),null,16)]),_:2},1024),v((o(),c("div",null,[a(e(S))])),[[p]])]),_:2},1024)]),_:1}),a(e(w),{name:"password"},{default:s(({componentField:n})=>[a(e(x),null,{default:s(()=>[a(e($),null,{default:s(()=>[l("Contraseña")]),_:1}),a(e(y),null,{default:s(()=>[a(e(h),g({type:"password"},n,{required:""}),null,16)]),_:2},1024),v((o(),c("div",null,[a(e(S))])),[[p]])]),_:2},1024)]),_:1})]),_:1}),a(e(A),{class:"flex-col gap-4"},{default:s(()=>[a(e(m),{type:"submit",class:"w-full"},{default:s(()=>[r.value?(o(),T(e(V),{key:0,class:"mr-2 h-4 w-4"})):j("",!0),Z]),_:1}),a(e(U)),t("p",ee,[l(" No tienes una cuenta? "),a(e(G),{class:"underline underline-offset-4",to:{name:"register"}},{default:s(()=>[l("Registrarse")]),_:1})])]),_:1})]),_:1})],8,W)],40,Q)}}}),se={class:"flex w-full max-w-md flex-col items-center justify-center gap-4 md:max-w-lg"},ce=C({__name:"LoginView",setup(E){return(_,r)=>(o(),c("div",se,[a(ae)]))}});export{ce as default};