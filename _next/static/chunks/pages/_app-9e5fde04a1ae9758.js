(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[636],{8147:(e,t,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(3099)}])},4993:(e,t,r)=>{"use strict";function n(e,t,r,n){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return n}}),r(5643),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6329:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return v}});let n=r(173),l=r(5105),o=n._(r(8101)),s=r(9499),a=r(5677),i=r(4168),c=r(1002),u=r(4269),f=r(6568),d=r(3258),h=r(4993),p=r(6604),_=r(2691),m=new Set;function j(e,t,r,n){if((0,a.isLocalURL)(t)){if(!n.bypassPrefetchedCheck){let l=t+"%"+r+"%"+(void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0);if(m.has(l))return;m.add(l)}e.prefetch(t,r,n).catch(e=>{})}}function g(e){return"string"==typeof e?e:(0,i.formatUrl)(e)}let v=o.default.forwardRef(function(e,t){let r,n;let{href:i,as:m,children:v,prefetch:x=null,passHref:y,replace:b,shallow:w,scroll:N,locale:M,onClick:k,onMouseEnter:E,onTouchStart:C,legacyBehavior:D=!1,...O}=e;r=v,D&&("string"==typeof r||"number"==typeof r)&&(r=(0,l.jsx)("a",{children:r}));let P=o.default.useContext(f.RouterContext),L=!1!==x,{href:S,as:R}=o.default.useMemo(()=>{if(!P){let e=g(i);return{href:e,as:m?g(m):e}}let[e,t]=(0,s.resolveHref)(P,i,!0);return{href:e,as:m?(0,s.resolveHref)(P,m):t||e}},[P,i,m]),I=o.default.useRef(S),T=o.default.useRef(R);D&&(n=o.default.Children.only(r));let A=D?n&&"object"==typeof n&&n.ref:t,[z,K,U]=(0,d.useIntersection)({rootMargin:"200px"}),H=o.default.useCallback(e=>{(T.current!==R||I.current!==S)&&(U(),T.current=R,I.current=S),z(e)},[R,S,U,z]),B=(0,_.useMergedRef)(H,A);o.default.useEffect(()=>{P&&K&&L&&j(P,S,R,{locale:M})},[R,S,K,M,L,null==P?void 0:P.locale,P]);let F={ref:B,onClick(e){D||"function"!=typeof k||k(e),D&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),P&&!e.defaultPrevented&&function(e,t,r,n,l,o,s,i){let{nodeName:c}=e.currentTarget;"A"===c.toUpperCase()&&(function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!(0,a.isLocalURL)(r))||(e.preventDefault(),(()=>{let e=null==s||s;"beforePopState"in t?t[l?"replace":"push"](r,n,{shallow:o,locale:i,scroll:e}):t[l?"replace":"push"](n||r,{scroll:e})})())}(e,P,S,R,b,w,N,M)},onMouseEnter(e){D||"function"!=typeof E||E(e),D&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),P&&j(P,S,R,{locale:M,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){D||"function"!=typeof C||C(e),D&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),P&&j(P,S,R,{locale:M,priority:!0,bypassPrefetchedCheck:!0})}};if((0,c.isAbsoluteUrl)(R))F.href=R;else if(!D||y||"a"===n.type&&!("href"in n.props)){let e=void 0!==M?M:null==P?void 0:P.locale,t=(null==P?void 0:P.isLocaleDomain)&&(0,h.getDomainLocale)(R,e,null==P?void 0:P.locales,null==P?void 0:P.domainLocales);F.href=t||(0,p.addBasePath)((0,u.addLocale)(R,e,null==P?void 0:P.defaultLocale))}return D?o.default.cloneElement(n,F):(0,l.jsx)("a",{...O,...F,children:r})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3258:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return i}});let n=r(8101),l=r(9179),o="function"==typeof IntersectionObserver,s=new Map,a=[];function i(e){let{rootRef:t,rootMargin:r,disabled:i}=e,c=i||!o,[u,f]=(0,n.useState)(!1),d=(0,n.useRef)(null),h=(0,n.useCallback)(e=>{d.current=e},[]);return(0,n.useEffect)(()=>{if(o){if(c||u)return;let e=d.current;if(e&&e.tagName)return function(e,t,r){let{id:n,observer:l,elements:o}=function(e){let t;let r={root:e.root||null,margin:e.rootMargin||""},n=a.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=s.get(n)))return t;let l=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=l.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:l},a.push(r),s.set(r,t),t}(r);return o.set(e,t),l.observe(e),function(){if(o.delete(e),l.unobserve(e),0===o.size){l.disconnect(),s.delete(n);let e=a.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&a.splice(e,1)}}}(e,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:r})}else if(!u){let e=(0,l.requestIdleCallback)(()=>f(!0));return()=>(0,l.cancelIdleCallback)(e)}},[c,r,t,u,d.current]),[h,u,(0,n.useCallback)(()=>{f(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2691:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useMergedRef",{enumerable:!0,get:function(){return l}});let n=r(8101);function l(e,t){let r=(0,n.useRef)(()=>{}),l=(0,n.useRef)(()=>{});return(0,n.useMemo)(()=>e&&t?n=>{null===n?(r.current(),l.current()):(r.current=o(e,n),l.current=o(t,n))}:e||t,[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3099:(e,t,r)=>{"use strict";r.r(t),r.d(t,{DispatchStore:()=>x,GlobalState:()=>v,default:()=>N,initialState:()=>b,isLoadingDarkmode:()=>y,reducer:()=>w});var n=r(5105),l=r(8101);r(1872);var o=r(8809),s=r.n(o);function a(){return(0,n.jsx)("svg",{viewBox:"0 0 24 24",children:(0,n.jsx)("path",{d:"M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"})})}function i(){return(0,n.jsx)("svg",{viewBox:"0 0 24 24",children:(0,n.jsx)("path",{d:"m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495 1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115 1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96 1.41 1.41 1.79-1.8-1.41-1.41z"})})}let c=[{alias:"resume",name:"Resume",path:"/resume/"},{alias:"archive",name:"Archive",path:"/archive/"},{alias:"about",name:"About",path:"/about/"}],u=e=>{let{isDarkMode:t}=e;return t?(0,n.jsx)(i,{}):(0,n.jsx)(a,{})};function f(){let e=(0,l.useContext)(v),t=(0,l.useContext)(x);return(0,n.jsx)("button",{className:"site-nav__toggle",onClick:function(){t({type:"SET_IS_DARKMODE",payload:!(null==e?void 0:e.isDarkMode)})},title:"Toggle Darkmode",children:(0,n.jsx)(u,{isDarkMode:null==e?void 0:e.isDarkMode})})}let d=e=>{let{alias:t,componentName:r,name:l,path:o}=e;return(0,n.jsx)("li",{className:"".concat(r,"__item ").concat(r,"__item--").concat(t),children:(0,n.jsx)(s(),{className:"".concat(r,"__link ").concat(r,"__link--").concat(t),href:o,children:l})})};function h(e){let{componentName:t,navItems:r}=e;return(0,n.jsx)("ul",{className:"".concat(t,"__items"),children:r.map((e,r)=>{let{alias:l,name:o,path:s}=e;return(0,n.jsx)(d,{alias:l,componentName:t,name:o,path:s},r)})})}let p=function(){return(0,n.jsx)("nav",{id:"site-nav",className:"site-nav",role:"navigation",itemType:"http://schema.org/SiteNavigationElement",children:(0,n.jsxs)("section",{className:"site-nav__container",children:[(0,n.jsx)(s(),{href:"/",className:"logo",children:(0,n.jsx)("h3",{className:"logo__title",children:"j"})}),(0,n.jsxs)("div",{className:"site-nav__links-wrapper",children:[(0,n.jsx)(h,{componentName:"site-nav",navItems:c}),(0,n.jsx)(f,{})]})]})})},_=[{alias:"github",name:"Github",path:"https://github.com/yowainwright",small:!0},{alias:"instagram",name:"Instragram",path:"https://instagram.com/yowainwright",small:!0},{alias:"linkedin",name:"LinkedIn",path:"https://www.linkedin.com/in/jeffrywainwright/",small:!0}],m=e=>{let{items:t=_}=e;return(0,n.jsx)("ul",{className:"social-list",children:t.map((e,t)=>{let{name:r,path:l,small:o}=e;return(0,n.jsx)("li",{className:"social-list__item social-list__item--".concat(o?"showing":"hidden"),children:(0,n.jsx)("a",{href:l,className:"social-list__link",children:r})},t)})})},j=()=>(0,n.jsx)("nav",{className:"social-footer",children:(0,n.jsx)(m,{})}),g=()=>(0,n.jsxs)("footer",{className:"site-footer",role:"contentinfo",itemType:"http://schema.org/WPFooter",children:[(0,n.jsxs)("section",{className:"site-footer__wrapper site-footer__wrapper--main",children:[(0,n.jsxs)("article",{className:"site-footer__col site-footer__col--contact",children:[(0,n.jsx)("h3",{className:"site-footer__title",children:"Contact"}),(0,n.jsxs)("address",{className:"site-footer__address",children:[(0,n.jsx)("p",{className:"site-footer__content",children:"Happy to chat, learn, help!"}),(0,n.jsxs)("p",{className:"site-footer__content",children:[(0,n.jsx)("a",{href:"mailto:yowainwright@gmail.com",children:"yowainwright@gmail.com"}),", Los Angeles, CA"]})]})]}),(0,n.jsxs)("div",{className:"site-footer__col site-footer__col site-footer__col--social",children:[(0,n.jsx)("h3",{className:"site-footer__title",children:"Connect"}),(0,n.jsx)(j,{})]}),(0,n.jsxs)("article",{className:"site-footer__col site-footer__col--self",children:[(0,n.jsx)("h3",{className:"site-footer__title site-footer__title--self",children:"About"}),(0,n.jsxs)("figure",{className:"site-footer__figure",children:[(0,n.jsx)("img",{className:"media--circular site-footer__image",src:"https://yowainwright.imgix.net/portraits/me-smiling.jpg?w=150&h=150&fit=crop&auto=format",height:"100%",width:"100%",alt:"Me smiling with a beard"}),(0,n.jsxs)("figcaption",{className:"site-footer__caption",children:[(0,n.jsxs)(s(),{className:"site-footer__link",href:"/",children:[(0,n.jsx)("strong",{children:"jeffry.in"}),", ",new Date().getFullYear()]}),", is the blog of"," ",(0,n.jsx)(s(),{className:"site-footer__link",href:"/about",children:"Jeffry (Jeff) Wainwright"}),", a software engineer, person, living in Los Angeles."]})]})]})]}),(0,n.jsx)("section",{className:"site-footer__wrapper site-footer__wrapper--last",children:(0,n.jsxs)("h3",{className:"site-footer__title site-footer__title--last",children:[(0,n.jsx)(s(),{className:"site-footer__link",href:"/",children:"jeffry.in"}),", ",new Date().getFullYear()]})})]}),v=(0,l.createContext)(null),x=(0,l.createContext)(null);function y(){return!!window.matchMedia("(prefers-color-scheme: dark)").matches}let b={isDarkMode:!1,isLoaded:!1};function w(e,t){let{payload:r,type:n}=t;switch(n){case"SET_IS_DARKMODE":return{...e,isDarkMode:r};case"SET_IS_LOADED":return{...e,isLoaded:r};default:return e}}function N(e){let{Component:t,pageProps:r}=e,[o,s]=(0,l.useReducer)(w,b);return(0,l.useEffect)(()=>{o.isLoaded||(s({type:"SET_IS_LOADED",payload:!0}),s({type:"SET_IS_DARKMODE",payload:y()}))},[o.isLoaded]),(0,l.useEffect)(()=>{let e=document.querySelector("body");o.isDarkMode?null==e||e.classList.add("js-is-darkmode"):null==e||e.classList.remove("js-is-darkmode")},[o]),(0,n.jsx)(x.Provider,{value:s,children:(0,n.jsxs)(v.Provider,{value:o,children:[(0,n.jsx)(p,{}),(0,n.jsx)(t,{...r}),(0,n.jsx)(g,{})]})})}},1872:()=>{},8809:(e,t,r)=>{e.exports=r(6329)}},e=>{var t=t=>e(e.s=t);e.O(0,[593,792],()=>(t(8147),t(8100))),_N_E=e.O()}]);