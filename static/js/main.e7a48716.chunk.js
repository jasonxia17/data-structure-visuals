(this["webpackJsonpdata-structure-visuals"]=this["webpackJsonpdata-structure-visuals"]||[]).push([[0],[,,,,,,function(e,t,n){e.exports=n(13)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(5),l=n.n(o),i=(n(11),n(2)),c=n(1),d=n(3),u=function(e){var t=e.nodeID,n=e.nodeMap,o=e.changeData,l=e.onDelete,i=e.handleSelectStub,c=e.currEdgeParent,d=e.currEdgeDir,u=e.createEdge,s=e.onMouseDown,f=n[t],h=f.xCoord,g=f.yCoord,m=f.nodeData,C=f.leftChildId,y=f.rightChildId,p=Object.values(n).every((function(e){var n=e.leftChildId,a=e.rightChildId;return n!==t&&a!==t}));return r.a.createElement(a.Fragment,null,null===C&&!(c===t&&"left"===d)&&r.a.createElement("line",{x1:h,y1:g,x2:h-50,y2:g+50,onClick:function(e){i(t,"left"),e.stopPropagation()}}),null===y&&!(c===t&&"right"===d)&&r.a.createElement("line",{x1:h,y1:g,x2:h+50,y2:g+50,onClick:function(e){i(t,"right"),e.stopPropagation()}}),r.a.createElement("g",{className:p?"valid-child":"",tabIndex:0,onKeyDown:function(e){"Delete"!==e.key?"Backspace"!==e.key?m.length>=4||("0123456789".includes(e.key)||"-"===e.key&&0===m.length||"."===e.key&&!m.includes("."))&&o(t,m+e.key):o(t,""):l()},onClick:function(){p&&u()},onMouseDown:s},r.a.createElement("circle",{cx:h,cy:g,r:45}),r.a.createElement("text",{x:h,y:g},m)))},s=function(e){var t=e.nodeMap,n=e.currEdgeParent,a=e.mousePos;return null===n?null:r.a.createElement("line",{className:"edge-in-creation",x1:t[n].xCoord,y1:t[n].yCoord,x2:a.x,y2:a.y})},f=function(e){var t=e.nodeMap,n=e.parentID,a=e.childID,o=e.onClick;return r.a.createElement("line",{className:"edge",x1:t[n].xCoord,y1:t[n].yCoord,x2:t[a].xCoord,y2:t[a].yCoord,onClick:o})},h=(n(12),function(e,t,n,a,r){var o=e-n,l="left"===r?-1:1;return o*=l,o=Math.max(60,o),{x:n+(o*=l),y:a+125}}),g=function(e,t,n,a){var r=t-a[e].xCoord,o=n-a[e].yCoord;(function e(t,n){return null===t?[]:[t].concat(e(n[t].leftChildId,n)).concat(e(n[t].rightChildId,n))})(e,a).forEach((function(e){a[e].xCoord+=r,a[e].yCoord+=o}))},m=function(){var e=Object(a.useState)({}),t=Object(d.a)(e,2),n=t[0],o=t[1],l=Object(a.useState)(null),m=Object(d.a)(l,2),C=m[0],y=m[1],p=Object(a.useState)("left"),E=Object(d.a)(p,2),b=E[0],v=E[1],O=Object(a.useState)({x:0,y:0}),x=Object(d.a)(O,2),I=x[0],w=x[1],j=Object(a.useState)(null),k=Object(d.a)(j,2),D=k[0],S=k[1],N=Object(a.useState)({x:0,y:0}),J=Object(d.a)(N,2),M=J[0],P=J[1];Object(a.useEffect)((function(){var e=new URL(window.location.href).searchParams.get("data");e&&o(JSON.parse(e))}),[]),Object(a.useEffect)((function(){var e=function(){return S(null)};return document.addEventListener("mouseup",e),function(){return document.removeEventListener("mouseup",e)}}),[]);var T=function(e,t){o(Object(c.a)({},n,Object(i.a)({},e,Object(c.a)({},n[e],{nodeData:t}))))},A=function(e,t){y(e),v(t)},B=null===C?"no-edge-in-creation":"edge-in-creation";return B+=" wrapper",null!==D&&(B+=" drag-in-progress"),r.a.createElement("div",{className:B},r.a.createElement("svg",{onMouseMove:function(e){if(w({x:e.pageX,y:e.pageY}),null!==D){var t=e.pageX+M.x,a=e.pageY+M.y,r=Object.values(n).find((function(e){return e.leftChildId===D||e.rightChildId===D}));if(void 0!==r){var l=r.leftChildId===D?"left":"right",i=h(t,0,r.xCoord,r.yCoord,l);t=i.x,a=i.y}var c=JSON.parse(JSON.stringify(n));g(D,t,a,c),o(c)}},onDoubleClick:function(e){if(e.currentTarget===e.target){for(var t={nodeData:"",xCoord:e.pageX,yCoord:e.pageY,leftChildId:null,rightChildId:null},a=0;a in n;)++a;o(Object(c.a)({},n,Object(i.a)({},a,t)))}},onClick:function(){return y(null)}},Object.keys(n).map((function(e){return parseInt(e)})).map((function(e){var t=n[e],l=t.leftChildId,d=t.rightChildId;return r.a.createElement(a.Fragment,{key:e},null!==l&&r.a.createElement(f,{nodeMap:n,parentID:e,childID:l,onClick:function(){return o(Object(c.a)({},n,Object(i.a)({},e,Object(c.a)({},n[e],{leftChildId:null}))))}}),null!==d&&r.a.createElement(f,{nodeMap:n,parentID:e,childID:d,onClick:function(){return o(Object(c.a)({},n,Object(i.a)({},e,Object(c.a)({},n[e],{rightChildId:null}))))}}))})),r.a.createElement(s,{nodeMap:n,currEdgeParent:C,currEdgeDir:b,mousePos:I}),Object.keys(n).map((function(e){return parseInt(e)})).map((function(e){return r.a.createElement(u,{key:e,nodeID:e,nodeMap:n,currEdgeParent:C,currEdgeDir:b,changeData:T,handleSelectStub:A,onDelete:function(){var t=JSON.parse(JSON.stringify(n));delete t[e],Object.values(t).forEach((function(t){t.leftChildId===e&&(t.leftChildId=null),t.rightChildId===e&&(t.rightChildId=null)})),o(t)},onMouseDown:function(t){if(null===C){S(e);var a=n[e].xCoord-t.pageX,r=n[e].yCoord-t.pageY;P({x:a,y:r})}},createEdge:function(){null!==C&&function(e,t){var a=JSON.parse(JSON.stringify(n));"left"===b?a[e].leftChildId=t:a[e].rightChildId=t,o(JSON.parse(JSON.stringify(a)));var r=a[e],l=a[t],i=h(l.xCoord,l.yCoord,r.xCoord,r.yCoord,b),c=i.x,d=i.y;window.requestAnimationFrame((function e(){var n=c-l.xCoord,r=d-l.yCoord;0===n&&0===r||(0!==n?g(t,l.xCoord+Math.sign(n),l.yCoord,a):0!==r&&g(t,l.xCoord,l.yCoord+Math.sign(r),a),o(JSON.parse(JSON.stringify(a))),window.requestAnimationFrame(e))}))}(C,e)}})}))),r.a.createElement("div",{className:"sidebar"},r.a.createElement("h3",null,"Binary Search / AVL Tree"),r.a.createElement("ul",null,r.a.createElement("li",null,"Double-click anywhere to create a new node"),r.a.createElement("li",null,"Select a node and type to enter data, or BACKSPACE to clear the data"),r.a.createElement("li",null,"To delete a node, select it and hit DELETE"),r.a.createElement("li",null,"To create an edge, click on one of the parent's stubs. Then, click the desired child."),r.a.createElement("li",null,"Click on an edge to delete it"),r.a.createElement("li",null,"Drag a node to move its entire subtree")),r.a.createElement("button",{onClick:function(){var e=window.location.origin+window.location.pathname+"?data="+encodeURIComponent(JSON.stringify(n));navigator.clipboard.writeText(e)}},"Copy permalink to clipboard"),r.a.createElement("button",{onClick:function(){return window.location.href=window.location.origin+window.location.pathname}},"Clear"),r.a.createElement("p",{className:"author"},r.a.createElement("i",null,"Created by ",r.a.createElement("a",{href:"mailto:jasonx3@illinois.edu"},"Jason Xia")))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[6,1,2]]]);
//# sourceMappingURL=main.e7a48716.chunk.js.map