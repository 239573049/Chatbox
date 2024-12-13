import{aK as f,aL as A,aM as I,aN as i,aO as E,aP as a,aQ as C,aR as j,aS as S,aT as W,aU as F,aV as N,aW as H,aX as q,aY as P,aZ as x,a_ as v,a$ as D,b0 as _,b1 as R,b2 as O,b3 as Q,b4 as U,b5 as V,b6 as G,b7 as K}from"./index-CoMJwQ8t.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=f("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=f("ListRestart",[["path",{d:"M21 6H3",key:"1jwq7v"}],["path",{d:"M7 12H3",key:"13ou7f"}],["path",{d:"M7 18H3",key:"1sijw9"}],["path",{d:"M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14",key:"qth677"}],["path",{d:"M11 10v4h4",key:"172dkj"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=f("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);var z,$,J=A(function(e,t){var n=e.css,s=e.token,r=e.cx,o=t.type,l=n(z||(z=I([`
      background-color: `,`;
      border: 1px solid `,`;
    `])),o==="block"?s.colorFillTertiary:s.colorFillQuaternary,o==="block"?"transparent":s.colorBorder);return{container:r(o!=="pure"&&l,n($||($=I([`
          position: relative;
          padding: 2px;
          border-radius: `,`px;
        `])),s.borderRadius))}}),ee=["type","items","placement","direction","dropdownMenu","onActionClick","size"],b=i.memo(function(e){var t=e.type,n=t===void 0?"block":t,s=e.items,r=s===void 0?[]:s,o=e.placement,l=e.direction,u=l===void 0?"row":l,y=e.dropdownMenu,m=y===void 0?[]:y,c=e.onActionClick,g=e.size,h=g===void 0?"small":g,M=E(e,ee),d=J({type:n}),L=d.styles,w=o||(u==="column"?"right":"top");return a.jsxs(C,j(j({className:L.container,horizontal:u==="row"},M),{},{children:[(r==null?void 0:r.length)>0&&r.map(function(p){return a.jsx(S,{disable:p.disable,icon:p.icon,onClick:c?function(){return c==null?void 0:c({item:p,key:p.key,keyPath:[p.key]})}:void 0,placement:w,size:h,title:p.label},p.key)}),(m==null?void 0:m.length)>0&&a.jsx(W,{menu:{items:m.map(function(p){return p.type?p:j(j({},p),{},{disabled:p.disable,icon:a.jsx(F,{icon:p.icon,size:h}),onClick:c?function(T){return c({item:p,key:T.key,keyPath:T.keyPath})}:void 0})})},trigger:["click"],children:a.jsx(S,{icon:X,placement:w,size:h},"more")})]}))});const k=({hasThread:e}={})=>i.useMemo(()=>({copy:{icon:N,key:"copy",label:"复制"},del:{danger:!0,disable:e,icon:H,key:"del",label:"删除"},delAndRegenerate:{disable:e,icon:Y,key:"delAndRegenerate",label:"删除并重新生成"},divider:{type:"divider"},edit:{icon:Z,key:"edit",label:"编辑"},regenerate:{icon:q,key:"regenerate",label:"重新生成"}}),[e]),te=i.memo(({onActionClick:e})=>{const{regenerate:t,del:n}=k();return a.jsx(b,{items:[t,n],onActionClick:e,type:"ghost"})}),ne=i.memo(({onActionClick:e,error:t,tools:n,id:s})=>{const{regenerate:r,edit:o,delAndRegenerate:l,copy:u,divider:y,del:m}=k({}),c=!!n,h=i.useContext(P),M=i.useMemo(()=>c?[l,u]:[o,u].filter(Boolean),[h,c]);return t?a.jsx(te,{onActionClick:e}):a.jsx(b,{dropdownMenu:[o,u,y,y,r,l,m],items:M,onActionClick:e,type:"ghost"})}),se=i.memo(({onActionClick:e})=>{const{del:t}=k();return a.jsx(b,{dropdownMenu:[t],items:[],onActionClick:e,type:"ghost"})}),oe=i.memo(({id:e})=>{const{regenerate:t,del:n}=k(),[s,r]=x(o=>[o.reInvokeToolMessage,o.deleteToolMessage]);return a.jsx(b,{items:[t,n],onActionClick:async o=>{switch(o.key){case"regenerate":{await s(e);break}case"del":await r(e)}},type:"ghost"})}),ae=i.memo(({onActionClick:e})=>{const{regenerate:t,edit:n,copy:s,divider:r,del:o}=k({}),u=i.useContext(P),y=i.useMemo(()=>[t,n].filter(Boolean),[u]);return a.jsx(b,{dropdownMenu:[n,s,r,t,o],items:y,onActionClick:e,type:"ghost"})}),re={assistant:ne,system:se,tool:oe,user:ae},ie=i.memo(e=>{const{regenerate:t,edit:n,copy:s,divider:r,del:o}=k();return a.jsx(b,{dropdownMenu:[n,s,t,r,o],items:[t,n],type:"ghost",...e})}),ce=i.memo(({id:e,inPortalThread:t})=>{const n=x(v.getMessageById(e),D),[s,r,o,l,u,y,m,c]=x(d=>[d.deleteMessage,d.regenerateMessage,d.delAndRegenerateMessage,d.copyMessage,d.openThreadCreator,d.resendThreadMessage,d.delAndResendThreadMessage,d.toggleMessageEditing]),{message:g}=_.useApp(),h=i.useCallback(async d=>{switch(d.key){case"edit":c(e,!0)}if(n){switch(d.key){case"copy":{await l(e,n.content),g.success("复制成功");break}case"branching":{u(e);break}case"del":{s(e);break}case"regenerate":{t?y(e):r(e),n.error&&s(e);break}case"delAndRegenerate":{t?m(e):o(e);break}}d.keyPath.at(-1)}},[n]),M=re[(n==null?void 0:n.role)||""]??ie;return a.jsx(M,{...n,onActionClick:h})}),le=A(({css:e,token:t,isDarkMode:n})=>{const s=n?t.colorFillSecondary:t.colorFillTertiary;return{end:e`
      &::after {
        inset-inline-end: 36px;
        border-inline-end: 2px solid ${s};
        border-end-end-radius: 8px;
      }
    `,line:e`
      &::after {
        content: '';

        position: absolute;
        inset-block: 56px 50px;

        width: 32px;

        border-block-end: 2px solid ${s};
      }
    `,start:e`
      &::after {
        inset-inline-start: 36px;
        border-inline-start: 2px solid ${s};
        border-end-start-radius: 8px;
      }
    `}}),de=i.memo(({id:e,index:t})=>{const{styles:n,cx:s}=le(),[r]=R(c=>[c.displayMode]),o=x(c=>{var g;return(g=v.getMessageById(e)(c))==null?void 0:g.role}),l=r==="chat"&&o==="user"?"end":"start",[u]=x(c=>[v.mainDisplayChatIDs(c).length]),y=R(c=>{const g=O.currentAgentChatConfig(c);return g.enableHistoryCount&&u>(g.historyCount??0)&&g.historyCount===u-t}),m=i.useMemo(()=>a.jsx(ce,{id:e}),[e]);return a.jsx(Q,{actionBar:m,className:s(n.line,n[l]),enableHistoryDivider:y,id:e,index:t})}),pe=A(({css:e,responsive:t})=>({container:e`
    align-items: center;
    margin-top: 64px;
    ${t.mobile} {
      align-items: flex-start;
    }
  `,desc:e`
    font-size: 14px;
    text-align: center;
    ${t.mobile} {
      text-align: start;
    }
  `,title:e`
    margin-block: 0.2em 0;
    font-size: 32px;
    font-weight: bolder;
    line-height: 1;
    ${t.mobile} {
      font-size: 24px;
    }
  `})),B=i.memo(()=>{const{styles:e}=pe();return a.jsx(U,{padding:16,width:"100%",children:a.jsxs(C,{className:e.container,gap:16,style:{maxWidth:800},width:"100%",children:[a.jsxs(C,{align:"center",gap:8,horizontal:!0,children:[a.jsx(V,{emoji:"👋",size:40,type:"anim"}),a.jsx("h1",{className:e.title,children:"欢迎使用 TokenAI"})]}),a.jsx(G,{className:e.desc,variant:"chat",children:"您好我是您的私人智能助手！"})]})})}),ue=i.memo(()=>x(v.showInboxWelcome)?a.jsx(B,{}):a.jsx(B,{})),ge=i.memo(({mobile:e})=>{const[t,n]=x(o=>[o.content.messagesMap,o.activeSessionId]),s=t[n||""],r=i.useCallback((o,l)=>a.jsx(de,{id:l,index:o}),[e]);return!s||s.length===0?a.jsx(ue,{}):a.jsx(K,{dataSource:s==null?void 0:s.map(o=>o.id),itemContent:r,mobile:e})});ge.displayName="ChatListRender";export{ge as default};
