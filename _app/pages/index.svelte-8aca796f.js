var _e=Object.defineProperty,me=Object.defineProperties;var ve=Object.getOwnPropertyDescriptors;var te=Object.getOwnPropertySymbols;var be=Object.prototype.hasOwnProperty,we=Object.prototype.propertyIsEnumerable;var se=(a,e,t)=>e in a?_e(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,le=(a,e)=>{for(var t in e||(e={}))be.call(e,t)&&se(a,t,e[t]);if(te)for(var t of te(e))we.call(e,t)&&se(a,t,e[t]);return a},ae=(a,e)=>me(a,ve(e));import{S as Ee,i as ge,s as ke,V as Ae,e as p,t as O,k as T,c as _,a as m,h as x,d as c,m as j,b as f,g as C,H as i,j as W,w as Ie,x as Se,M as ye,y as Le,W as oe,I as re,X as Ne,q as Pe,o as De,B as Oe,Y as Te,Z as xe,_ as je,$ as Ce}from"../chunks/vendor-ef2c2dc6.js";import{S as ne,a as Be,D as Me,b as Re}from"../chunks/siteConfig-5e3680e5.js";function ie(a,e,t){const s=a.slice();return s[4]=e[t].title,s[5]=e[t].slug,s[6]=e[t].publishedAt,s[7]=e[t].reactions,s[8]=e[t].comments,s[9]=e[t].category,s}function ce(a){let e,t;return{c(){e=p("li"),t=O("No posts.")},l(s){e=_(s,"LI",{});var n=m(e);t=x(n,"No posts."),n.forEach(c)},m(s,n){C(s,e,n),i(e,t)},d(s){s&&c(e)}}}function fe(a){let e,t;return{c(){e=p("span"),t=O("Draft"),this.h()},l(s){e=_(s,"SPAN",{class:!0});var n=m(e);t=x(n,"Draft"),n.forEach(c),this.h()},h(){f(e,"class","ml-2 text-xs uppercase font-mono font-bold border-2 px-1 rounded-md text-yellow-500")},m(s,n){C(s,e,n),i(e,t)},d(s){s&&c(e)}}}function ue(a){let e,t=a[7]+"",s,n,v,w;return{c(){e=p("a"),s=O(t),n=T(),v=p("span"),this.h()},l(l){e=_(l,"A",{class:!0,href:!0,"sveltekit:prefetch":!0});var o=m(e);s=x(o,t),n=j(o),v=_(o,"SPAN",{class:!0}),m(v).forEach(c),o.forEach(c),this.h()},h(){f(v,"class","i-teenyicons-heart-solid h-3 ml-1"),f(e,"class","flex flex-row items-center hover:underline"),f(e,"href",w="/posts/"+a[5]+"#reactions"),f(e,"sveltekit:prefetch","")},m(l,o){C(l,e,o),i(e,s),i(e,n),i(e,v)},p(l,o){o&1&&t!==(t=l[7]+"")&&W(s,t),o&1&&w!==(w="/posts/"+l[5]+"#reactions")&&f(e,"href",w)},d(l){l&&c(e)}}}function he(a){let e,t=a[8]+"",s,n,v,w;return{c(){e=p("a"),s=O(t),n=T(),v=p("span"),this.h()},l(l){e=_(l,"A",{class:!0,href:!0,"sveltekit:prefetch":!0});var o=m(e);s=x(o,t),n=j(o),v=_(o,"SPAN",{class:!0}),m(v).forEach(c),o.forEach(c),this.h()},h(){f(v,"class","i-teenyicons-chat-solid h-3 ml-1"),f(e,"class","flex flex-row items-center hover:underline"),f(e,"href",w="/posts/"+a[5]+"#comments"),f(e,"sveltekit:prefetch","")},m(l,o){C(l,e,o),i(e,s),i(e,n),i(e,v)},p(l,o){o&1&&t!==(t=l[8]+"")&&W(s,t),o&1&&w!==(w="/posts/"+l[5]+"#comments")&&f(e,"href",w)},d(l){l&&c(e)}}}function de(a){let e,t,s=a[6].toLocaleDateString("en-GB",{weekday:"short",year:"2-digit",month:"short",day:"numeric"})+"",n,v,w=a[9].toLowerCase().includes("draft"),l,o,u,I=a[4]+"",M,L,U,E,R,P,A=w&&fe(),g=a[7]>0&&ue(a),d=a[8]>0&&he(a);return{c(){e=p("li"),t=p("span"),n=O(s),v=T(),A&&A.c(),l=T(),o=p("span"),u=p("a"),M=O(I),U=T(),E=p("div"),g&&g.c(),R=T(),d&&d.c(),P=T(),this.h()},l(k){e=_(k,"LI",{class:!0});var h=m(e);t=_(h,"SPAN",{class:!0});var F=m(t);n=x(F,s),F.forEach(c),v=j(h),A&&A.l(h),l=j(h),o=_(h,"SPAN",{class:!0});var V=m(o);u=_(V,"A",{class:!0,href:!0,"sveltekit:prefetch":!0});var D=m(u);M=x(D,I),D.forEach(c),V.forEach(c),U=j(h),E=_(h,"DIV",{class:!0});var B=m(E);g&&g.l(B),R=j(B),d&&d.l(B),B.forEach(c),P=j(h),h.forEach(c),this.h()},h(){f(t,"class","leading-none text-gray-400 uppercase tracking-wide text-sm font-extrabold"),f(u,"class","hover:underline decoration-2px"),f(u,"href",L="/posts/"+a[5]),f(u,"sveltekit:prefetch",""),f(o,"class","ml-2 align-middle"),f(E,"class","self-end flex flex-row text-gray-400 font-bold decoration-2 font-mono text-xs ml-4 gap-x-2"),f(e,"class","flex flex-row w-full items-center justify-start mb-4")},m(k,h){C(k,e,h),i(e,t),i(t,n),i(e,v),A&&A.m(e,null),i(e,l),i(e,o),i(o,u),i(u,M),i(e,U),i(e,E),g&&g.m(E,null),i(E,R),d&&d.m(E,null),i(e,P)},p(k,h){h&1&&s!==(s=k[6].toLocaleDateString("en-GB",{weekday:"short",year:"2-digit",month:"short",day:"numeric"})+"")&&W(n,s),h&1&&(w=k[9].toLowerCase().includes("draft")),w?A||(A=fe(),A.c(),A.m(e,l)):A&&(A.d(1),A=null),h&1&&I!==(I=k[4]+"")&&W(M,I),h&1&&L!==(L="/posts/"+k[5])&&f(u,"href",L),k[7]>0?g?g.p(k,h):(g=ue(k),g.c(),g.m(E,R)):g&&(g.d(1),g=null),k[8]>0?d?d.p(k,h):(d=he(k),d.c(),d.m(E,null)):d&&(d.d(1),d=null)},d(k){k&&c(e),A&&A.d(),g&&g.d(),d&&d.d()}}}function Ge(a){let e,t,s,n=ne.replace(" ",`
`)+"",v,w,l,o,u,I,M,L,U,E,R,P,A,g,d,k,h,F,V,D,B,X,z;e=new Ae({props:{title:ne,description:Be,image:Me,url:Re}});let G=a[0],S=[];for(let r=0;r<G.length;r+=1)S[r]=de(ie(a,G,r));let y=null;return G.length||(y=ce()),{c(){Ie(e.$$.fragment),t=T(),s=p("h1"),v=O(n),w=T(),l=p("form"),o=p("div"),u=p("select"),I=p("option"),M=O("Newest"),L=p("option"),U=O("Oldest"),E=p("option"),R=O("Loved"),P=p("option"),A=O("Popular"),g=T(),d=p("span"),k=T(),h=p("label"),F=O("Posts"),V=T(),D=p("ul");for(let r=0;r<S.length;r+=1)S[r].c();y&&y.c(),this.h()},l(r){Se(e.$$.fragment,r),t=j(r),s=_(r,"H1",{class:!0});var N=m(s);v=x(N,n),N.forEach(c),w=j(r),l=_(r,"FORM",{class:!0});var b=m(l);o=_(b,"DIV",{class:!0});var q=m(o);u=_(q,"SELECT",{name:!0,id:!0,class:!0});var H=m(u);I=_(H,"OPTION",{class:!0});var J=m(I);M=x(J,"Newest"),J.forEach(c),L=_(H,"OPTION",{class:!0});var K=m(L);U=x(K,"Oldest"),K.forEach(c),E=_(H,"OPTION",{class:!0});var Q=m(E);R=x(Q,"Loved"),Q.forEach(c),P=_(H,"OPTION",{class:!0});var $=m(P);A=x($,"Popular"),$.forEach(c),H.forEach(c),g=j(q),d=_(q,"SPAN",{class:!0});var pe=m(d);pe.forEach(c),q.forEach(c),k=j(b),h=_(b,"LABEL",{for:!0});var ee=m(h);F=x(ee,"Posts"),ee.forEach(c),b.forEach(c),V=j(r),D=_(r,"UL",{class:!0});var Y=m(D);for(let Z=0;Z<S.length;Z+=1)S[Z].l(Y);y&&y.l(Y),Y.forEach(c),this.h()},h(){f(s,"class","py-12 font-bold text-4xl whitespace-pre-line leading-none"),I.__value="newest",I.value=I.__value,f(I,"class","bg-white pr-2"),I.selected=!0,L.__value="oldest",L.value=L.__value,f(L,"class","bg-white pr-2"),E.__value="loved",E.value=E.__value,f(E,"class","bg-white pr-4"),P.__value="popular",P.value=P.__value,f(P,"class","bg-white pr-4"),f(u,"name","posts-filter"),f(u,"id","posts-filter"),f(u,"class","appearance-none bg-transparent leading-none"),a[1]===void 0&&ye(()=>a[3].call(u)),f(d,"class","inline-block absolute bottom-0 right-0 i-teenyicons-down-solid w-2 h-full pointer-events-none"),f(o,"class","relative inline-block mr-2"),f(h,"for","posts-filter"),f(l,"class","text-xl mb-2 inline-block border-b-2 border-dotted hover:border-solid"),f(D,"class","text-lg leading-none")},m(r,N){Le(e,r,N),C(r,t,N),C(r,s,N),i(s,v),C(r,w,N),C(r,l,N),i(l,o),i(o,u),i(u,I),i(I,M),i(u,L),i(L,U),i(u,E),i(E,R),i(u,P),i(P,A),oe(u,a[1]),i(o,g),i(o,d),i(l,k),i(l,h),i(h,F),C(r,V,N),C(r,D,N);for(let b=0;b<S.length;b+=1)S[b].m(D,null);y&&y.m(D,null),B=!0,X||(z=[re(u,"change",a[3]),re(l,"submit",Ne(a[2]))],X=!0)},p(r,[N]){if(N&2&&oe(u,r[1]),N&1){G=r[0];let b;for(b=0;b<G.length;b+=1){const q=ie(r,G,b);S[b]?S[b].p(q,N):(S[b]=de(q),S[b].c(),S[b].m(D,null))}for(;b<S.length;b+=1)S[b].d(1);S.length=G.length,G.length?y&&(y.d(1),y=null):y||(y=ce(),y.c(),y.m(D,null))}},i(r){B||(Pe(e.$$.fragment,r),B=!0)},o(r){De(e.$$.fragment,r),B=!1},d(r){Oe(e,r),r&&c(t),r&&c(s),r&&c(w),r&&c(l),r&&c(V),r&&c(D),Te(S,r),y&&y.d(),X=!1,xe(z)}}}const He=!0,We=!0,Xe=async({fetch:a})=>{const e=await a("/posts.json");return e.status===200?{props:{posts:(await e.json()).posts.map(s=>ae(le({},s),{createdAt:new Date(s.createdAt),publishedAt:new Date(s.publishedAt),updatedAt:new Date(s.updatedAt)}))},maxage:60}:{status:e.status,error:await e.text()}};function Ue(a,e,t){let s="newest",{posts:n=[]}=e;function v(l){je.call(this,a,l)}function w(){s=Ce(this),t(1,s)}return a.$$set=l=>{"posts"in l&&t(0,n=l.posts)},a.$$.update=()=>{if(a.$$.dirty&3)switch(s){case"loved":t(0,n=n.sort((l,o)=>o.reactions-l.reactions));break;case"popular":t(0,n=n.sort((l,o)=>o.comments-l.comments));break;case"oldest":t(0,n=n.sort((l,o)=>l.publishedAt-o.publishedAt));break;case"newest":default:t(0,n=n.sort((l,o)=>o.publishedAt-l.publishedAt));break}},[n,s,v,w]}class Ye extends Ee{constructor(e){super();ge(this,e,Ue,Ge,ke,{posts:0})}}export{Ye as default,We as hydrate,Xe as load,He as prerender};