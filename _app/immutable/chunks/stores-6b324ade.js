import{w as g}from"./index-c239ecf6.js";import{Y as l,Z as p}from"./index-8c0e4016.js";const d=(e,r=null)=>{var c;const o=typeof localStorage!="undefined",u=o?JSON.parse((c=localStorage.getItem(e))!=null?c:""):r,a=g(u),{subscribe:b,set:n}=a,i=(s,t)=>{!o||localStorage.setItem(s,JSON.stringify(t))};return{set(s){i(e,s),n(s)},update(s){const t=s(l(a));i(e,t),n(t)},subscribe:b}},v=["system","light","dark"],_=d("theme","system"),h=g(!1),m=()=>{const e=p("__svelte__");return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:e.navigating.subscribe}},session:e.session,updated:e.updated}},w={subscribe(e){return m().page.subscribe(e)}};export{v as A,h as d,w as p,_ as t};
