function g(){}const X=t=>t;function ht(t,e){for(const n in e)t[n]=e[n];return t}function Y(t){return t()}function J(){return Object.create(null)}function b(t){t.forEach(Y)}function R(t){return typeof t=="function"}function Bt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let N;function zt(t,e){return N||(N=document.createElement("a")),N.href=e,t===N.href}function mt(t){return Object.keys(t).length===0}function Z(t,...e){if(t==null)return g;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Ft(t){let e;return Z(t,n=>e=n)(),e}function Gt(t,e,n){t.$$.on_destroy.push(Z(e,n))}function It(t,e,n,i){if(t){const r=tt(t,e,n,i);return t[0](r)}}function tt(t,e,n,i){return t[1]&&i?ht(n.ctx.slice(),t[1](i(e))):n.ctx}function Wt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const o=[],c=Math.max(e.dirty.length,r.length);for(let l=0;l<c;l+=1)o[l]=e.dirty[l]|r[l];return o}return e.dirty|r}return e.dirty}function Jt(t,e,n,i,r,o){if(r){const c=tt(e,n,i,o);t.p(c,r)}}function Kt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Qt(t,e,n){return t.set(n),e}function Ut(t){return t&&R(t.destroy)?t.destroy:g}const et=typeof window!="undefined";let nt=et?()=>window.performance.now():()=>Date.now(),F=et?t=>requestAnimationFrame(t):g;const x=new Set;function it(t){x.forEach(e=>{e.c(t)||(x.delete(e),e.f())}),x.size!==0&&F(it)}function rt(t){let e;return x.size===0&&F(it),{promise:new Promise(n=>{x.add(e={c:t,f:n})}),abort(){x.delete(e)}}}let D=!1;function pt(){D=!0}function yt(){D=!1}function gt(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function xt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let u=0;u<e.length;u++){const f=e[u];f.claim_order!==void 0&&s.push(f)}e=s}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let s=0;s<e.length;s++){const u=e[s].claim_order,f=(r>0&&e[n[r]].claim_order<=u?r+1:gt(1,r,_=>e[n[_]].claim_order,u))-1;i[s]=n[f]+1;const a=f+1;n[a]=s,r=Math.max(a,r)}const o=[],c=[];let l=e.length-1;for(let s=n[r]+1;s!=0;s=i[s-1]){for(o.push(e[s-1]);l>=s;l--)c.push(e[l]);l--}for(;l>=0;l--)c.push(e[l]);o.reverse(),c.sort((s,u)=>s.claim_order-u.claim_order);for(let s=0,u=0;s<c.length;s++){for(;u<o.length&&c[s].claim_order>=o[u].claim_order;)u++;const f=u<o.length?o[u]:null;t.insertBefore(c[s],f)}}function bt(t,e){t.appendChild(e)}function st(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function $t(t){const e=G("style");return wt(st(t),e),e.sheet}function wt(t,e){bt(t.head||t,e)}function vt(t,e){if(D){for(xt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Et(t,e,n){t.insertBefore(e,n||null)}function kt(t,e,n){D&&!n?vt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function j(t){t.parentNode.removeChild(t)}function Vt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function G(t){return document.createElement(t)}function At(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function I(t){return document.createTextNode(t)}function Xt(){return I(" ")}function Yt(){return I("")}function Zt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function te(t){return function(e){return e.preventDefault(),t.call(this,e)}}function ee(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Nt(t){return Array.from(t.childNodes)}function ct(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function ot(t,e,n,i,r=!1){ct(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const l=t[c];if(e(l)){const s=n(l);return s===void 0?t.splice(c,1):t[c]=s,r||(t.claim_info.last_index=c),l}}for(let c=t.claim_info.last_index-1;c>=0;c--){const l=t[c];if(e(l)){const s=n(l);return s===void 0?t.splice(c,1):t[c]=s,r?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,l}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function Tt(t,e,n,i){return ot(t,r=>r.nodeName===e,r=>{const o=[];for(let c=0;c<r.attributes.length;c++){const l=r.attributes[c];n[l.name]||o.push(l.name)}o.forEach(c=>r.removeAttribute(c))},()=>i(e))}function ne(t,e,n){return Tt(t,e,n,G)}function St(t,e){return ot(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>I(e),!0)}function ie(t){return St(t," ")}function K(t,e,n){for(let i=n;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===e)return i}return t.length}function re(t,e){const n=K(t,"HTML_TAG_START",0),i=K(t,"HTML_TAG_END",n);if(n===i)return new Q(void 0,e);ct(t);const r=t.splice(n,i-n+1);j(r[0]),j(r[r.length-1]);const o=r.slice(1,r.length-1);for(const c of o)c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new Q(o,e)}function se(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function ce(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function oe(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];if(i.__value===e){i.selected=!0;return}}t.selectedIndex=-1}function le(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}function Ct(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function ue(t,e=document.body){return Array.from(e.querySelectorAll(t))}class jt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=At(n.nodeName):this.e=G(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Et(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(j)}}class Q extends jt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)kt(this.t,this.n[n],e)}}const M=new Map;let q=0;function Mt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function qt(t,e){const n={stylesheet:$t(e),rules:{}};return M.set(t,n),n}function lt(t,e,n,i,r,o,c,l=0){const s=16.666/i;let u=`{
`;for(let m=0;m<=1;m+=s){const A=e+(n-e)*o(m);u+=m*100+`%{${c(A,1-A)}}
`}const f=u+`100% {${c(n,1-n)}}
}`,a=`__svelte_${Mt(f)}_${l}`,_=st(t),{stylesheet:d,rules:h}=M.get(_)||qt(_,t);h[a]||(h[a]=!0,d.insertRule(`@keyframes ${a} ${f}`,d.cssRules.length));const p=t.style.animation||"";return t.style.animation=`${p?`${p}, `:""}${a} ${i}ms linear ${r}ms 1 both`,q+=1,a}function B(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?o=>o.indexOf(e)<0:o=>o.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),q-=r,q||Ht())}function Ht(){F(()=>{q||(M.forEach(t=>{const{stylesheet:e}=t;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.rules={}}),M.clear())})}let E;function v(t){E=t}function L(){if(!E)throw new Error("Function called outside component initialization");return E}function ae(t){L().$$.on_mount.push(t)}function fe(t){L().$$.after_update.push(t)}function _e(t,e){return L().$$.context.set(t,e),e}function de(t){return L().$$.context.get(t)}function he(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const w=[],U=[],S=[],V=[],ut=Promise.resolve();let z=!1;function at(){z||(z=!0,ut.then(ft))}function me(){return at(),ut}function k(t){S.push(t)}const P=new Set;let T=0;function ft(){const t=E;do{for(;T<w.length;){const e=w[T];T++,v(e),Rt(e.$$)}for(v(null),w.length=0,T=0;U.length;)U.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];P.has(n)||(P.add(n),n())}S.length=0}while(w.length);for(;V.length;)V.pop()();z=!1,P.clear(),v(t)}function Rt(t){if(t.fragment!==null){t.update(),b(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(k)}}let $;function _t(){return $||($=Promise.resolve(),$.then(()=>{$=null})),$}function H(t,e,n){t.dispatchEvent(Ct(`${e?"intro":"outro"}${n}`))}const C=new Set;let y;function pe(){y={r:0,c:[],p:y}}function ye(){y.r||b(y.c),y=y.p}function Dt(t,e){t&&t.i&&(C.delete(t),t.i(e))}function ge(t,e,n,i){if(t&&t.o){if(C.has(t))return;C.add(t),y.c.push(()=>{C.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}}const dt={duration:0};function xe(t,e,n){let i=e(t,n),r=!1,o,c,l=0;function s(){o&&B(t,o)}function u(){const{delay:a=0,duration:_=300,easing:d=X,tick:h=g,css:p}=i||dt;p&&(o=lt(t,0,1,_,a,d,p,l++)),h(0,1);const m=nt()+a,A=m+_;c&&c.abort(),r=!0,k(()=>H(t,!0,"start")),c=rt(O=>{if(r){if(O>=A)return h(1,0),H(t,!0,"end"),s(),r=!1;if(O>=m){const W=d((O-m)/_);h(W,1-W)}}return r})}let f=!1;return{start(){f||(f=!0,B(t),R(i)?(i=i(),_t().then(u)):u())},invalidate(){f=!1},end(){r&&(s(),r=!1)}}}function be(t,e,n){let i=e(t,n),r=!0,o;const c=y;c.r+=1;function l(){const{delay:s=0,duration:u=300,easing:f=X,tick:a=g,css:_}=i||dt;_&&(o=lt(t,1,0,u,s,f,_));const d=nt()+s,h=d+u;k(()=>H(t,!1,"start")),rt(p=>{if(r){if(p>=h)return a(0,1),H(t,!1,"end"),--c.r||b(c.c),!1;if(p>=d){const m=f((p-d)/u);a(1-m,m)}}return r})}return R(i)?_t().then(()=>{i=i(),l()}):l(),{end(s){s&&i.tick&&i.tick(1,0),r&&(o&&B(t,o),r=!1)}}}function $e(t,e){const n={},i={},r={$$scope:1};let o=t.length;for(;o--;){const c=t[o],l=e[o];if(l){for(const s in c)s in l||(i[s]=1);for(const s in l)r[s]||(n[s]=l[s],r[s]=1);t[o]=l}else for(const s in c)r[s]=1}for(const c in i)c in n||(n[c]=void 0);return n}function we(t){return typeof t=="object"&&t!==null?t:{}}function ve(t){t&&t.c()}function Ee(t,e){t&&t.l(e)}function Lt(t,e,n,i){const{fragment:r,on_mount:o,on_destroy:c,after_update:l}=t.$$;r&&r.m(e,n),i||k(()=>{const s=o.map(Y).filter(R);c?c.push(...s):b(s),t.$$.on_mount=[]}),l.forEach(k)}function Ot(t,e){const n=t.$$;n.fragment!==null&&(b(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Pt(t,e){t.$$.dirty[0]===-1&&(w.push(t),at(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ke(t,e,n,i,r,o,c,l=[-1]){const s=E;v(t);const u=t.$$={fragment:null,ctx:null,props:o,update:g,not_equal:r,bound:J(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(s?s.$$.context:[])),callbacks:J(),dirty:l,skip_bound:!1,root:e.target||s.$$.root};c&&c(u.root);let f=!1;if(u.ctx=n?n(t,e.props||{},(a,_,...d)=>{const h=d.length?d[0]:_;return u.ctx&&r(u.ctx[a],u.ctx[a]=h)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](h),f&&Pt(t,a)),_}):[],u.update(),f=!0,b(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){pt();const a=Nt(e.target);u.fragment&&u.fragment.l(a),a.forEach(j)}else u.fragment&&u.fragment.c();e.intro&&Dt(t.$$.fragment),Lt(t,e.target,e.anchor,e.customElement),yt(),ft()}v(s)}class Ae{$destroy(){Ot(this,1),this.$destroy=g}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!mt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{R as $,we as A,Ot as B,ht as C,me as D,g as E,X as F,nt as G,rt as H,vt as I,Gt as J,Qt as K,Zt as L,te as M,Vt as N,b as O,he as P,k as Q,xe as R,Ae as S,be as T,It as U,Jt as V,Kt as W,Wt as X,Ft as Y,de as Z,Ut as _,Nt as a,oe as a0,le as a1,Q as a2,re as a3,ue as a4,zt as a5,ee as b,ne as c,j as d,G as e,ce as f,kt as g,St as h,ke as i,se as j,Xt as k,Yt as l,ie as m,pe as n,ge as o,ye as p,Dt as q,_e as r,Bt as s,I as t,fe as u,ae as v,ve as w,Ee as x,Lt as y,$e as z};
