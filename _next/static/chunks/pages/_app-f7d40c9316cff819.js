(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{1929:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(5751)}])},5182:function(e,t){"use strict";var n,r;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{PrefetchKind:function(){return n},ACTION_REFRESH:function(){return o},ACTION_NAVIGATE:function(){return l},ACTION_RESTORE:function(){return i},ACTION_SERVER_PATCH:function(){return a},ACTION_PREFETCH:function(){return s},ACTION_FAST_REFRESH:function(){return c},ACTION_SERVER_ACTION:function(){return u},isThenable:function(){return f}});let o="refresh",l="navigate",i="restore",a="server-patch",s="prefetch",c="fast-refresh",u="server-action";function f(e){return e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then}(r=n||(n={})).AUTO="auto",r.FULL="full",r.TEMPORARY="temporary",("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3893:function(e,t,n){"use strict";function r(e,t,n,r){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return r}}),n(5067),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4312:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return v}});let r=n(1351)._(n(959)),o=n(1002),l=n(5640),i=n(4558),a=n(7708),s=n(2115),c=n(7559),u=n(6703),f=n(2765),d=n(3893),h=n(6563),p=n(5182),_=new Set;function m(e,t,n,r,o,i){if(i||(0,l.isLocalURL)(t)){if(!r.bypassPrefetchedCheck){let o=t+"%"+n+"%"+(void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0);if(_.has(o))return;_.add(o)}Promise.resolve(i?e.prefetch(t,o):e.prefetch(t,n,r)).catch(e=>{})}}function j(e){return"string"==typeof e?e:(0,i.formatUrl)(e)}let v=r.default.forwardRef(function(e,t){let n,i;let{href:_,as:v,children:g,prefetch:x=null,passHref:y,replace:b,shallow:N,scroll:w,locale:E,onClick:k,onMouseEnter:C,onTouchStart:M,legacyBehavior:O=!1,...T}=e;n=g,O&&("string"==typeof n||"number"==typeof n)&&(n=r.default.createElement("a",null,n));let A=r.default.useContext(c.RouterContext),P=r.default.useContext(u.AppRouterContext),S=null!=A?A:P,R=!A,L=!1!==x,D=null===x?p.PrefetchKind.AUTO:p.PrefetchKind.FULL,{href:I,as:z}=r.default.useMemo(()=>{if(!A){let e=j(_);return{href:e,as:v?j(v):e}}let[e,t]=(0,o.resolveHref)(A,_,!0);return{href:e,as:v?(0,o.resolveHref)(A,v):t||e}},[A,_,v]),K=r.default.useRef(I),F=r.default.useRef(z);O&&(i=r.default.Children.only(n));let U=O?i&&"object"==typeof i&&i.ref:t,[H,V,B]=(0,f.useIntersection)({rootMargin:"200px"}),G=r.default.useCallback(e=>{(F.current!==z||K.current!==I)&&(B(),F.current=z,K.current=I),H(e),U&&("function"==typeof U?U(e):"object"==typeof U&&(U.current=e))},[z,U,I,B,H]);r.default.useEffect(()=>{S&&V&&L&&m(S,I,z,{locale:E},{kind:D},R)},[z,I,V,E,L,null==A?void 0:A.locale,S,R,D]);let Y={ref:G,onClick(e){O||"function"!=typeof k||k(e),O&&i.props&&"function"==typeof i.props.onClick&&i.props.onClick(e),S&&!e.defaultPrevented&&function(e,t,n,o,i,a,s,c,u){let{nodeName:f}=e.currentTarget;if("A"===f.toUpperCase()&&(function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!u&&!(0,l.isLocalURL)(n)))return;e.preventDefault();let d=()=>{let e=null==s||s;"beforePopState"in t?t[i?"replace":"push"](n,o,{shallow:a,locale:c,scroll:e}):t[i?"replace":"push"](o||n,{scroll:e})};u?r.default.startTransition(d):d()}(e,S,I,z,b,N,w,E,R)},onMouseEnter(e){O||"function"!=typeof C||C(e),O&&i.props&&"function"==typeof i.props.onMouseEnter&&i.props.onMouseEnter(e),S&&(L||!R)&&m(S,I,z,{locale:E,priority:!0,bypassPrefetchedCheck:!0},{kind:D},R)},onTouchStart(e){O||"function"!=typeof M||M(e),O&&i.props&&"function"==typeof i.props.onTouchStart&&i.props.onTouchStart(e),S&&(L||!R)&&m(S,I,z,{locale:E,priority:!0,bypassPrefetchedCheck:!0},{kind:D},R)}};if((0,a.isAbsoluteUrl)(z))Y.href=z;else if(!O||y||"a"===i.type&&!("href"in i.props)){let e=void 0!==E?E:null==A?void 0:A.locale,t=(null==A?void 0:A.isLocaleDomain)&&(0,d.getDomainLocale)(z,e,null==A?void 0:A.locales,null==A?void 0:A.domainLocales);Y.href=t||(0,h.addBasePath)((0,s.addLocale)(z,e,null==A?void 0:A.defaultLocale))}return O?r.default.cloneElement(i,Y):r.default.createElement("a",{...T,...Y},n)});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2765:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return s}});let r=n(959),o=n(6670),l="function"==typeof IntersectionObserver,i=new Map,a=[];function s(e){let{rootRef:t,rootMargin:n,disabled:s}=e,c=s||!l,[u,f]=(0,r.useState)(!1),d=(0,r.useRef)(null),h=(0,r.useCallback)(e=>{d.current=e},[]);return(0,r.useEffect)(()=>{if(l){if(c||u)return;let e=d.current;if(e&&e.tagName)return function(e,t,n){let{id:r,observer:o,elements:l}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=a.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=i.get(r)))return t;let o=new Map;return t={id:n,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e),elements:o},a.push(n),i.set(n,t),t}(n);return l.set(e,t),o.observe(e),function(){if(l.delete(e),o.unobserve(e),0===l.size){o.disconnect(),i.delete(r);let e=a.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&a.splice(e,1)}}}(e,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:n})}else if(!u){let e=(0,o.requestIdleCallback)(()=>f(!0));return()=>(0,o.cancelIdleCallback)(e)}},[c,n,t,u,d.current]),[h,u,(0,r.useCallback)(()=>{f(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5751:function(e,t,n){"use strict";n.r(t),n.d(t,{DispatchStore:function(){return x},GlobalState:function(){return g},default:function(){return w},initialState:function(){return b},isLoadingDarkmode:function(){return y},reducer:function(){return N}});var r=n(1527),o=n(959);n(3874);var l=n(8685),i=n.n(l);function a(){return(0,r.jsx)("svg",{viewBox:"0 0 24 24",children:(0,r.jsx)("path",{d:"M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"})})}function s(){return(0,r.jsx)("svg",{viewBox:"0 0 24 24",children:(0,r.jsx)("path",{d:"m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495 1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115 1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96 1.41 1.41 1.79-1.8-1.41-1.41z"})})}let c=[{alias:"resume",name:"Resume",path:"/resume/"},{alias:"archive",name:"Archive",path:"/archive/"},{alias:"about",name:"About",path:"/about/"}],u=e=>{let{isDarkMode:t}=e;return t?(0,r.jsx)(s,{}):(0,r.jsx)(a,{})};function f(){let e=(0,o.useContext)(g),t=(0,o.useContext)(x);return(0,r.jsx)("button",{className:"site-nav__toggle",onClick:function(){t({type:"SET_IS_DARKMODE",payload:!(null==e?void 0:e.isDarkMode)})},title:"Toggle Darkmode",children:(0,r.jsx)(u,{isDarkMode:null==e?void 0:e.isDarkMode})})}let d=e=>{let{alias:t,componentName:n,name:o,path:l}=e;return(0,r.jsx)("li",{className:"".concat(n,"__item ").concat(n,"__item--").concat(t),children:(0,r.jsx)(i(),{className:"".concat(n,"__link ").concat(n,"__link--").concat(t),href:l,children:o})})};function h(e){let{componentName:t,navItems:n}=e;return(0,r.jsx)("ul",{className:"".concat(t,"__items"),children:n.map((e,n)=>{let{alias:o,name:l,path:i}=e;return(0,r.jsx)(d,{alias:o,componentName:t,name:l,path:i},n)})})}var p=function(){return(0,r.jsx)("nav",{id:"site-nav",className:"site-nav",role:"navigation",itemType:"http://schema.org/SiteNavigationElement",children:(0,r.jsxs)("section",{className:"site-nav__container",children:[(0,r.jsx)(i(),{href:"/",className:"logo",children:(0,r.jsx)("h3",{className:"logo__title",children:"j"})}),(0,r.jsxs)("div",{className:"site-nav__links-wrapper",children:[(0,r.jsx)(h,{componentName:"site-nav",navItems:c}),(0,r.jsx)(f,{})]})]})})};let _=[{alias:"github",name:"Github",path:"https://github.com/yowainwright",small:!0},{alias:"instagram",name:"Instragram",path:"https://instagram.com/yowainwright",small:!0},{alias:"linkedin",name:"LinkedIn",path:"https://www.linkedin.com/in/jeffrywainwright/",small:!0}];var m=e=>{let{items:t=_}=e;return(0,r.jsx)("ul",{className:"social-list",children:t.map((e,t)=>{let{name:n,path:o,small:l}=e;return(0,r.jsx)("li",{className:"social-list__item social-list__item--".concat(l?"showing":"hidden"),children:(0,r.jsx)("a",{href:o,className:"social-list__link",children:n})},t)})})};let j=()=>(0,r.jsx)("nav",{className:"social-footer",children:(0,r.jsx)(m,{})});var v=()=>(0,r.jsxs)("footer",{className:"site-footer",role:"contentinfo",itemType:"http://schema.org/WPFooter",children:[(0,r.jsxs)("section",{className:"site-footer__wrapper site-footer__wrapper--main",children:[(0,r.jsxs)("article",{className:"site-footer__col site-footer__col--contact",children:[(0,r.jsx)("h3",{className:"site-footer__title",children:"Contact"}),(0,r.jsxs)("address",{className:"site-footer__address",children:[(0,r.jsx)("p",{className:"site-footer__content",children:"Happy to chat, learn, help!"}),(0,r.jsxs)("p",{className:"site-footer__content",children:[(0,r.jsx)("a",{href:"mailto:yowainwright@gmail.com",children:"yowainwright@gmail.com"}),", Los Angeles, CA"]})]})]}),(0,r.jsxs)("div",{className:"site-footer__col site-footer__col site-footer__col--social",children:[(0,r.jsx)("h3",{className:"site-footer__title",children:"Connect"}),(0,r.jsx)(j,{})]}),(0,r.jsxs)("article",{className:"site-footer__col site-footer__col--self",children:[(0,r.jsx)("h3",{className:"site-footer__title site-footer__title--self",children:"About"}),(0,r.jsxs)("figure",{className:"site-footer__figure",children:[(0,r.jsx)("img",{className:"media--circular site-footer__image",src:"https://yowainwright.imgix.net/portraits/me-smiling.jpg?w=150&h=150&fit=crop&auto=format",height:"100%",width:"100%",alt:"Me smiling with a beard"}),(0,r.jsxs)("figcaption",{className:"site-footer__caption",children:[(0,r.jsxs)(i(),{className:"site-footer__link",href:"/",children:[(0,r.jsx)("strong",{children:"jeffry.in"}),", ",new Date().getFullYear()]}),", is the blog of"," ",(0,r.jsx)(i(),{className:"site-footer__link",href:"/about",children:"Jeffry (Jeff) Wainwright"}),", a software engineer, person, living in Los Angeles."]})]})]})]}),(0,r.jsx)("section",{className:"site-footer__wrapper site-footer__wrapper--last",children:(0,r.jsxs)("h3",{className:"site-footer__title site-footer__title--last",children:[(0,r.jsx)(i(),{className:"site-footer__link",href:"/",children:"jeffry.in"}),", ",new Date().getFullYear()]})})]});let g=(0,o.createContext)(null),x=(0,o.createContext)(null);function y(){return!!window.matchMedia("(prefers-color-scheme: dark)").matches}let b={isDarkMode:!1,isLoaded:!1};function N(e,t){let{payload:n,type:r}=t;switch(r){case"SET_IS_DARKMODE":return{...e,isDarkMode:n};case"SET_IS_LOADED":return{...e,isLoaded:n};default:return e}}function w(e){let{Component:t,pageProps:n}=e,[l,i]=(0,o.useReducer)(N,b);return(0,o.useEffect)(()=>{l.isLoaded||(i({type:"SET_IS_LOADED",payload:!0}),i({type:"SET_IS_DARKMODE",payload:y()}))},[l.isLoaded]),(0,o.useEffect)(()=>{let e=document.querySelector("body");l.isDarkMode?null==e||e.classList.add("js-is-darkmode"):null==e||e.classList.remove("js-is-darkmode")},[l]),(0,r.jsx)(x.Provider,{value:i,children:(0,r.jsxs)(g.Provider,{value:l,children:[(0,r.jsx)(p,{}),(0,r.jsx)(t,{...n}),(0,r.jsx)(v,{})]})})}},3874:function(){},8685:function(e,t,n){e.exports=n(4312)}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(1929),t(4369)}),_N_E=e.O()}]);