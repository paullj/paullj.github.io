import{Z as u,D as c,_ as l}from"./vendor-df338b46.js";const d=(s,r=null)=>{const o=typeof localStorage!="undefined",g=o?JSON.parse(localStorage.getItem(s)):r,a=c(g),{subscribe:b,set:n}=a;function i(e,t){!o||localStorage.setItem(e,JSON.stringify(t))}return{set(e){i(s,e),n(e)},update(e){const t=e(u(a));i(s,t),n(t)},subscribe:b}},f=["system","light","dark"],m=d("theme","system"),v=c(!1),p=()=>{const s=l("__svelte__");return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:s.navigating.subscribe}},session:s.session}},_={subscribe(s){return p().page.subscribe(s)}};export{f as A,v as d,_ as p,m as t};
