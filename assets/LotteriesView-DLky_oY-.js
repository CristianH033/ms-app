import{d as n,o as e,c as t,a as o,F as u,i as c,b as i,w as _,B as d,t as p,e as m,aH as f}from"./index-qB8lAYve.js";const L=n({__name:"LotteriesList",props:{lotteries:{type:Array,required:!0}},setup(s){const a=s;return(l,x)=>(e(),t("div",null,[o("ul",null,[(e(!0),t(u,null,c(a.lotteries,r=>(e(),t("li",{key:r.id},[i(m(f),{to:{name:"lotterie",params:{id:r.id}}},{default:_(()=>[d(p(r.name),1)]),_:2},1032,["to"])]))),128))])]))}}),h=o("h1",null,"Lotteries View",-1),k=n({__name:"LotteriesView",setup(s){return(a,l)=>(e(),t("div",null,[h,i(L,{lotteries:[]})]))}});export{k as default};