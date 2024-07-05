import{d as I,r as h,l as M,p as U,h as P,q as Q,o as t,c as r,a as v,b as a,w as l,e,s as f,D as W,_ as b,Q as $,F as G,i as H,v as p,t as y,j as S,S as J,W as K}from"./index-Cp5NQWbQ.js";import{t as O,z as k,u as X,_ as w,a as C,b as N,c as V,F}from"./FormMessage.vue_vue_type_script_setup_true_lang-CpYijCeX.js";import{g as Y}from"./sellers-CWqGxriN.js";import{b as Z}from"./raffles-_mr8B5UA.js";import{_ as ee}from"./MoneyInput.vue_vue_type_script_setup_true_lang-B2wg69bA.js";import{_ as ae,a as le,b as se,c as te,d as oe,e as ne,f as re}from"./SelectScrollDownButton.vue_vue_type_script_setup_true_lang-f4QIpbPx.js";import{S as q}from"./add-circle-line-duotone-Cf1MKQIB.js";const ie=["disabled"],ue={class:"flex flex-row gap-2"},ce={key:0,class:"p-4",value:""},de={style:{position:"relative"}},me={key:0,role:"alert",id:"radix-136-form-item-message",class:"text-sm font-medium text-destructive",type:"error"},_e=v("span",null,"Cancelar",-1),fe=v("span",null,"Asignar",-1),ke=I({__name:"AddSellerToRaffleForm",props:{raffleId:{default:1}},emits:["submit","cancel","success","error"],setup(E,{emit:D}){const L=E,c=D,i=h(!1),d=h([]),R=M(()=>i.value),m=h(null),A=O(k.object({seller_id:k.string({required_error:"El vendedor es requerido"}).refine(s=>{var o;return(o=d.value)==null?void 0:o.some(g=>g.id.toString()===s)},{message:"El vendedor no existe"}),ticket_price:k.string({required_error:"El valor es requerido"}).transform(s=>parseFloat(s)).refine(s=>!isNaN(s)&&s>=1,{message:"El valor debe ser un número mayor o igual a 1"})})),{handleSubmit:B}=X({validationSchema:A,initialValues:{}}),T=()=>{c("cancel")},x=B(async s=>{c("submit"),i.value=!0,m.value=null,await Z(L.raffleId,Number(s.seller_id),Number(s.ticket_price)).then(o=>{c("success"),console.log(o)}).catch(o=>{c("error"),console.error(o),m.value=o.message}).finally(()=>{i.value=!1})},({errors:s})=>{console.log(s)}),j=async()=>{i.value=!0,Y().then(s=>{d.value=s}).catch(s=>{console.error(s)}).finally(()=>{i.value=!1})};return U(async()=>{await j()}),(s,o)=>{const g=P("RouterLink"),_=Q("auto-animate");return t(),r("form",{onSubmit:o[0]||(o[0]=K((...u)=>e(x)&&e(x)(...u),["prevent"]))},[v("fieldset",{disabled:R.value},[a(e(F),{name:"seller_id"},{default:l(({componentField:u})=>[a(e(w),null,{default:l(()=>[a(e(C),null,{default:l(()=>[f("Vendedor")]),_:1}),a(e(ae),W(u,{required:""}),{default:l(()=>[a(e(N),null,{default:l(()=>[v("div",ue,[a(e(le),null,{default:l(()=>[a(e(se),{placeholder:"Elige un vendedor"})]),_:1}),a(g,{to:{name:"sellers"}},{default:l(({navigate:n})=>[a(e(b),{variant:"outline",type:"button",onClick:n},{default:l(()=>[a(e(q),{class:"w-6 h-6"})]),_:2},1032,["onClick"])]),_:1})])]),_:1}),a(e(te),null,{default:l(()=>[a(e(oe),null,{default:l(()=>[a(e(ne),null,{default:l(()=>[f("Vendedores")]),_:1}),d.value.length===0?(t(),r("div",ce,"No hay vendedores")):$("",!0),(t(!0),r(G,null,H(d.value,n=>(t(),S(e(re),{key:n.id,value:n.id.toString(),class:"capitalize"},{default:l(()=>[f(y(n.name)+" - "+y(n.phone),1)]),_:2},1032,["value"]))),128))]),_:1})]),_:1})]),_:2},1040),p((t(),r("div",null,[a(e(V))])),[[_]])]),_:2},1024)]),_:1}),a(e(F),{name:"ticket_price"},{default:l(({value:u,handleChange:n})=>[a(e(w),null,{default:l(()=>[a(e(C),null,{default:l(()=>[f("Establezca el valor del bono para el vendedor")]),_:1}),a(e(N),null,{default:l(()=>[a(ee,{"model-value":u,"onUpdate:modelValue":z=>n(z,!0),required:""},null,8,["model-value","onUpdate:modelValue"])]),_:2},1024),p((t(),r("div",null,[a(e(V))])),[[_]])]),_:2},1024)]),_:1}),p((t(),r("div",de,[m.value!==null?(t(),r("p",me,y(m.value),1)):$("",!0)])),[[_]]),a(e(w),{class:"space-y-0 w-full py-2 flex flex-col-reverse md:flex-row items-center justify-end gap-2"},{default:l(()=>[a(e(b),{type:"button",class:"w-full gap-2",variant:"outline",onClick:T},{default:l(()=>[_e]),_:1}),a(e(b),{type:"submit",class:"w-full gap-2"},{default:l(()=>[p((t(),r("div",null,[i.value?(t(),S(e(J),{key:0,class:"h-6 w-6"})):(t(),S(e(q),{key:1,class:"w-6 h-6"}))])),[[_]]),fe]),_:1})]),_:1})],8,ie)],32)}}});export{ke as _};