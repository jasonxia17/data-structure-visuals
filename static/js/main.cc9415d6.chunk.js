(this["webpackJsonpdata-structure-visuals"]=this["webpackJsonpdata-structure-visuals"]||[]).push([[0],{13:function(e,t,n){e.exports=n(21)},18:function(e,t,n){},19:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(11),l=n.n(o),i=(n(18),n(4)),c=n(3),d=n(7),u=n(24),s=function(e){var t=e.nodeID,n=e.nodeMap,o=e.changeData,l=e.onBackspace,i=e.handleSelectStub,c=e.currEdgeParent,d=e.currEdgeDir,u=e.createEdge,s=e.onMouseDown,f=n[t],h=f.xCoord,m=f.yCoord,C=f.nodeData,p=f.leftChildId,b=f.rightChildId,y=Object.values(n).every((function(e){var n=e.leftChildId,a=e.rightChildId;return n!==t&&a!==t}))&&null!==c&&g(h,m,n[c].xCoord,n[c].yCoord,d).isPositionValid;return r.a.createElement(a.Fragment,null,null===p&&!(c===t&&"left"===d)&&r.a.createElement("line",{x1:h,y1:m,x2:h-50,y2:m+50,onClick:function(e){i(t,"left"),e.stopPropagation()}}),null===b&&!(c===t&&"right"===d)&&r.a.createElement("line",{x1:h,y1:m,x2:h+50,y2:m+50,onClick:function(e){i(t,"right"),e.stopPropagation()}}),r.a.createElement("g",{className:y?"valid-child":"",tabIndex:0,onKeyDown:function(e){"Backspace"!==e.key?C.length>=4||("0123456789".includes(e.key)||"-"===e.key&&0===C.length||"."===e.key&&!C.includes("."))&&o(t,C+e.key):l()},onClick:function(){y&&u()},onMouseDown:s},r.a.createElement("circle",{cx:h,cy:m,r:45}),r.a.createElement("text",{x:h,y:m},C)))},f=function(e){var t=e.nodeMap,n=e.currEdgeParent,a=e.currEdgeDir,o=e.mousePos;if(null===n)return null;var l=t[n],i=l.xCoord,c=l.yCoord,d=g(o.x,o.y,i,c,a),u=d.x,s=d.y;return r.a.createElement("line",{className:"edge-in-creation",x1:t[n].xCoord,y1:t[n].yCoord,x2:u,y2:s})},h=function(e){var t=e.nodeMap,n=e.parentID,a=e.childID,o=e.onClick;return r.a.createElement("line",{className:"edge",x1:t[n].xCoord,y1:t[n].yCoord,x2:t[a].xCoord,y2:t[a].yCoord,onClick:o})},g=(n(19),function(e,t,n,a,r){var o=[e-n,t-a],l="left"===r?[[-.96,-.28],[.28,.96]]:[[.96,.28],[.28,.96]],i=u.c(u.b(l),o),c=i.map((function(e){return Math.max(e,0)}));c=u.c(l,c),c=u.a(c,[n,a]);var d=i.every((function(e){return e>0}));return{x:c[0],y:c[1],isPositionValid:d}}),m=function(){var e=Object(a.useState)({}),t=Object(d.a)(e,2),n=t[0],o=t[1],l=Object(a.useState)(null),u=Object(d.a)(l,2),m=u[0],C=u[1],p=Object(a.useState)("left"),b=Object(d.a)(p,2),y=b[0],E=b[1],v=Object(a.useState)({x:0,y:0}),O=Object(d.a)(v,2),j=O[0],x=O[1],I=Object(a.useState)(null),k=Object(d.a)(I,2),w=k[0],D=k[1],S=Object(a.useState)({x:0,y:0}),M=Object(d.a)(S,2),N=M[0],P=M[1];Object(a.useEffect)((function(){var e=new URL(window.location.href).searchParams.get("data");e&&o(JSON.parse(e))}),[]),Object(a.useEffect)((function(){var e=function(){return D(null)};return document.addEventListener("mouseup",e),function(){return document.removeEventListener("mouseup",e)}}),[]);var J=function(e,t){o(Object(c.a)({},n,Object(i.a)({},e,Object(c.a)({},n[e],{nodeData:t}))))},B=function(e,t){C(e),E(t)},T=null===m?"no-edge-in-creation":"edge-in-creation";return T+=" wrapper",null!==w&&(T+=" drag-in-progress"),r.a.createElement("div",{className:T},r.a.createElement("svg",{onMouseMove:function(e){if(x({x:e.pageX,y:e.pageY}),null!==w){var t=e.pageX+N.x,a=e.pageY+N.y,r=Object.values(n).find((function(e){return e.leftChildId===w||e.rightChildId===w}));if(void 0!==r){var l=r.leftChildId===w?"left":"right",i=g(t,a,r.xCoord,r.yCoord,l);t=i.x,a=i.y}var c=t-n[w].xCoord,d=a-n[w].yCoord,u=JSON.parse(JSON.stringify(n));(function e(t){return null===t?[]:[t].concat(e(n[t].leftChildId)).concat(e(n[t].rightChildId))})(w).forEach((function(e){u[e].xCoord+=c,u[e].yCoord+=d})),o(u)}},onDoubleClick:function(e){if(e.currentTarget===e.target){for(var t={nodeData:"",xCoord:e.pageX,yCoord:e.pageY,leftChildId:null,rightChildId:null},a=0;a in n;)++a;o(Object(c.a)({},n,Object(i.a)({},a,t)))}},onClick:function(){return C(null)}},Object.keys(n).map((function(e){return parseInt(e)})).map((function(e){var t=n[e],l=t.leftChildId,d=t.rightChildId;return r.a.createElement(a.Fragment,{key:e},null!==l&&r.a.createElement(h,{nodeMap:n,parentID:e,childID:l,onClick:function(){return o(Object(c.a)({},n,Object(i.a)({},e,Object(c.a)({},n[e],{leftChildId:null}))))}}),null!==d&&r.a.createElement(h,{nodeMap:n,parentID:e,childID:d,onClick:function(){return o(Object(c.a)({},n,Object(i.a)({},e,Object(c.a)({},n[e],{rightChildId:null}))))}}))})),r.a.createElement(f,{nodeMap:n,currEdgeParent:m,currEdgeDir:y,mousePos:j}),Object.keys(n).map((function(e){return parseInt(e)})).map((function(e){return r.a.createElement(s,{key:e,nodeID:e,nodeMap:n,currEdgeParent:m,currEdgeDir:y,changeData:J,handleSelectStub:B,onBackspace:function(){var t=JSON.parse(JSON.stringify(n));delete t[e],Object.values(t).forEach((function(t){t.leftChildId===e&&(t.leftChildId=null),t.rightChildId===e&&(t.rightChildId=null)})),o(t)},onMouseDown:function(t){if(null===m){D(e);var a=n[e].xCoord-t.pageX,r=n[e].yCoord-t.pageY;P({x:a,y:r})}},createEdge:function(){if(null!==m){var t=Object(c.a)({},n[m]);"left"===y?Object.assign(t,{leftChildId:e}):Object.assign(t,{rightChildId:e}),o(Object(c.a)({},n,Object(i.a)({},m,t)))}}})}))),r.a.createElement("div",{className:"sidebar"},r.a.createElement("h3",null,"Binary Search / AVL Tree"),r.a.createElement("ul",null,r.a.createElement("li",null,"Double-click anywhere to create a new node"),r.a.createElement("li",null,"Select a node and type to enter data"),r.a.createElement("li",null,"To delete a node, select it and hit BACKSPACE"),r.a.createElement("li",null,"To create an edge, click on one of the parent's stubs. Then, click the desired child. (Child must be positioned properly relative to parent for edge to be created.)"),r.a.createElement("li",null,"Click on an edge to delete it"),r.a.createElement("li",null,"Drag a node to move its entire subtree")),r.a.createElement("button",{onClick:function(){var e=window.location.origin+window.location.pathname+"?data="+encodeURIComponent(JSON.stringify(n));navigator.clipboard.writeText(e)}},"Copy permalink to clipboard"),r.a.createElement("button",{onClick:function(){return window.location.href=window.location.origin+window.location.pathname}},"Clear"),r.a.createElement("p",{className:"author"},r.a.createElement("i",null,"Created by ",r.a.createElement("a",{href:"mailto:jasonx3@illinois.edu"},"Jason Xia")))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[13,1,2]]]);
//# sourceMappingURL=main.cc9415d6.chunk.js.map