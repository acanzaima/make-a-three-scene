System.register(["./three.module-legacy.726c44c9.js","./index-legacy.a6c150ae.js"],(function(e,t){"use strict";var i,n,o,s,r,a,h,c,d,u,l,m,p,v,w,g,y,f,M=document.createElement("style");return M.textContent=".wave-wrapper[data-v-2264d074]{width:100%;height:100%}.wave-wrapper.light[data-v-2264d074]{background:linear-gradient(#13194b 0%,#164687 50%,#13194b 100%)}\n",document.head.appendChild(M),{setters:[e=>{i=e.P,n=e.d,o=e.B,s=e.q,r=e.r,a=e.o,h=e.t,c=e.W,d=e.p},e=>{u=e.p,l=e.B,m=e.C,p=e.w,v=e.o,w=e.k,g=e.l,y=e.e,f=e.n}],execute:function(){class t{constructor(e,t,i,n,o){this.sceneDom="string"==typeof e?document.querySelector(e):e,this.amountX=t||50,this.amountY=i||50,this.color=n||"#00bfff",this.top=o||350,this.count=0,this.mouseX=0,this.windowHalfX=window.innerWidth/2,this.camera=null,this.scene=null,this.particles=null,this.renderer=null,this.isInit=!1}init(){const e=100,t=window.innerWidth,d=window.innerHeight,u=document.createElement("div");u.style.position="relative",u.style.top=`${this.top}px`,u.style.height=d-this.top+"px",this.sceneDom.appendChild(u),this.camera=new i(60,t/d,1,1e4),this.camera.position.z=1e3,this.scene=new n;const l=this.amountX*this.amountY,m=new Float32Array(3*l),p=new Float32Array(l);let v=0,w=0;for(let i=0;i<this.amountX;i++)for(let t=0;t<this.amountY;t++)m[v]=i*e-this.amountX*e/2,m[v+1]=0,m[v+2]=t*e-this.amountY*e/2,p[w]=1,v+=3,w++;const g=new o;g.setAttribute("position",new s(m,3)),g.setAttribute("scale",new s(p,1));const y=new r({uniforms:{color:{value:new a(this.color)}},vertexShader:"\n        attribute float scale;\n        void main() {\n          vec4 mvPosition = modelViewMatrix * vec4( position, 2.0 );\n          gl_PointSize = scale * ( 370.0 / - mvPosition.z );\n          gl_Position = projectionMatrix * mvPosition;\n        }\n      ",fragmentShader:"\n        uniform vec3 color;\n        void main() {\n          if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;\n          gl_FragColor = vec4( color, 1.0 );\n        }\n      "});this.particles=new h(g,y),this.scene.add(this.particles),this.renderer=new c({antialias:!0,alpha:!0}),this.renderer.setSize(u.clientWidth,u.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setClearAlpha(0),u.appendChild(this.renderer.domElement),this.onWindowResizeCopy=this.onWindowResize.bind(this),this.onDocumentMouseMoveCopy=this.onDocumentMouseMove.bind(this),this.onDocumentTouchStartCopy=this.onDocumentTouchStart.bind(this),this.onDocumentTouchMoveCopy=this.onDocumentTouchMove.bind(this),this.addListeners()}render(){this.camera.position.x+=.05*(this.mouseX-this.camera.position.x),this.camera.position.y=400,this.camera.lookAt(this.scene.position);const e=this.particles.geometry.attributes.position.array,t=this.particles.geometry.attributes.scale.array;let i=0,n=0;for(let o=0;o<this.amountX;o++)for(let s=0;s<this.amountY;s++)e[i+1]=100*Math.sin(.3*(o+this.count))+100*Math.sin(.5*(s+this.count)),t[n]=8*(Math.sin(.3*(o+this.count))+1)+8*(Math.sin(.5*(s+this.count))+1),i+=3,n++;this.particles.geometry.attributes.position.needsUpdate=!0,this.particles.geometry.attributes.scale.needsUpdate=!0,this.renderer.render(this.scene,this.camera),this.count+=.1}resize(){this.camera.aspect=this.sceneDom.clientWidth/this.sceneDom.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.sceneDom.clientWidth,this.sceneDom.clientHeight)}addListeners(){window.addEventListener("resize",this.onWindowResizeCopy,{passive:!1}),document.addEventListener("mousemove",this.onDocumentMouseMoveCopy,{passive:!1}),document.addEventListener("touchstart",this.onDocumentTouchStartCopy,{passive:!1}),document.addEventListener("touchmove",this.onDocumentTouchMoveCopy,{passive:!1})}removeListeners(){window.removeEventListener("resize",this.onWindowResizeCopy,{passive:!1}),document.removeEventListener("mousemove",this.onDocumentMouseMoveCopy,{passive:!1}),document.removeEventListener("touchstart",this.onDocumentTouchStartCopy,{passive:!1}),document.removeEventListener("touchmove",this.onDocumentTouchMoveCopy,{passive:!1})}onDocumentMouseMove(e){this.mouseX=e.clientX-this.windowHalfX}onDocumentTouchStart(e){1===e.touches.length&&(this.mouseX=e.touches[0].pageX-this.windowHalfX)}onDocumentTouchMove(e){1===e.touches.length&&(e.preventDefault(),this.mouseX=e.touches[0].pageX-this.windowHalfX)}onWindowResize(){this.windowHalfX=window.innerWidth/2,this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}run(){this.isInit||(this.init(),this.isInit=!0),this.intervalFrameId=requestAnimationFrame(this.run.bind(this)),this.render()}stop(){this.removeListeners(),cancelAnimationFrame(this.intervalFrameId)}}const M={__name:"ScenePage",props:{foldChange:{type:Boolean}},setup(e){const i=e;let n={};return l((()=>{n=new t(".wave-wrapper"),n.run()})),m((()=>{n.stop()})),p((()=>i.foldChange),(()=>{setTimeout((()=>{n.resize()}),350)})),(e,t)=>(v(),w(d,null,{default:g((({theme:i})=>[y("div",{class:f(["wave-wrapper",i]),onSatellite:t[0]||(t[0]=(...t)=>e.getSelectName&&e.getSelectName(...t))},null,34)])),_:1}))}};e("default",u(M,[["__scopeId","data-v-2264d074"]]))}}}));
