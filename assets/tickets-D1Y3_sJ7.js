import{L as s}from"./index-B4iZ3EM6.js";const o=async r=>{const{data:t,error:e}=await s.from("tickets").select("*").eq("raffle_id",r).order("id",{ascending:!0});if(e)throw new Error(e.message);return t};export{o as g};