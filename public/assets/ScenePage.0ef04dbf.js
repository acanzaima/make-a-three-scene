var He=Object.defineProperty;var Fe=(p,n,s)=>n in p?He(p,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):p[n]=s;var l=(p,n,s)=>(Fe(p,typeof n!="symbol"?n+"":n,s),s);import{E as Ue,V as S,M as N,T as j,Q as me,S as fe,a as E,O as z,b as be,c as Be,R as Ze,P as Ve,W as Xe,s as We,d as Ge,D as Ke,e as qe,H as Je,A as Qe,f as ge,g as W,h as Ee,i as ye,j as we,k as Te,l as $e,m as et,n as tt,C as nt,o as V,G as it,p as st}from"./three.module.acb6c336.js";import{d as at,B as ot,C as rt,w as ct,o as lt,k as ht,l as ut,e as dt,n as pt,p as mt}from"./index.e6883975.js";const Se={type:"change"},X={type:"start"},Pe={type:"end"};class ft extends Ue{constructor(n,s){super(),this.object=n,this.domElement=s,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new S,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:N.ROTATE,MIDDLE:N.DOLLY,RIGHT:N.PAN},this.touches={ONE:j.ROTATE,TWO:j.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return r.phi},this.getAzimuthalAngle=function(){return r.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(t){t.addEventListener("keydown",le),this._domElementKeyEvents=t},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(Se),e.update(),o=i.NONE},this.update=function(){const t=new S,a=new me().setFromUnitVectors(n.up,new S(0,1,0)),h=a.clone().invert(),u=new S,g=new me,L=2*Math.PI;return function(){const pe=e.object.position;t.copy(pe).sub(e.target),t.applyQuaternion(a),r.setFromVector3(t),e.autoRotate&&o===i.NONE&&H(Me()),e.enableDamping?(r.theta+=m.theta*e.dampingFactor,r.phi+=m.phi*e.dampingFactor):(r.theta+=m.theta,r.phi+=m.phi);let y=e.minAzimuthAngle,w=e.maxAzimuthAngle;return isFinite(y)&&isFinite(w)&&(y<-Math.PI?y+=L:y>Math.PI&&(y-=L),w<-Math.PI?w+=L:w>Math.PI&&(w-=L),y<=w?r.theta=Math.max(y,Math.min(w,r.theta)):r.theta=r.theta>(y+w)/2?Math.max(y,r.theta):Math.min(w,r.theta)),r.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,r.phi)),r.makeSafe(),r.radius*=P,r.radius=Math.max(e.minDistance,Math.min(e.maxDistance,r.radius)),e.enableDamping===!0?e.target.addScaledVector(T,e.dampingFactor):e.target.add(T),t.setFromSpherical(r),t.applyQuaternion(h),pe.copy(e.target).add(t),e.object.lookAt(e.target),e.enableDamping===!0?(m.theta*=1-e.dampingFactor,m.phi*=1-e.dampingFactor,T.multiplyScalar(1-e.dampingFactor)):(m.set(0,0,0),T.set(0,0,0)),P=1,f||u.distanceToSquared(e.object.position)>d||8*(1-g.dot(e.object.quaternion))>d?(e.dispatchEvent(Se),u.copy(e.object.position),g.copy(e.object.quaternion),f=!1,!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",he),e.domElement.removeEventListener("pointerdown",oe),e.domElement.removeEventListener("pointercancel",re),e.domElement.removeEventListener("wheel",ce),e.domElement.removeEventListener("pointermove",U),e.domElement.removeEventListener("pointerup",B),e._domElementKeyEvents!==null&&e._domElementKeyEvents.removeEventListener("keydown",le)};const e=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=i.NONE;const d=1e-6,r=new fe,m=new fe;let P=1;const T=new S;let f=!1;const b=new E,M=new E,x=new E,O=new E,D=new E,C=new E,k=new E,v=new E,R=new E,c=[],I={};function Me(){return 2*Math.PI/60/60*e.autoRotateSpeed}function _(){return Math.pow(.95,e.zoomSpeed)}function H(t){m.theta-=t}function G(t){m.phi-=t}const K=function(){const t=new S;return function(h,u){t.setFromMatrixColumn(u,0),t.multiplyScalar(-h),T.add(t)}}(),q=function(){const t=new S;return function(h,u){e.screenSpacePanning===!0?t.setFromMatrixColumn(u,1):(t.setFromMatrixColumn(u,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(h),T.add(t)}}(),A=function(){const t=new S;return function(h,u){const g=e.domElement;if(e.object.isPerspectiveCamera){const L=e.object.position;t.copy(L).sub(e.target);let Y=t.length();Y*=Math.tan(e.object.fov/2*Math.PI/180),K(2*h*Y/g.clientHeight,e.object.matrix),q(2*u*Y/g.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(K(h*(e.object.right-e.object.left)/e.object.zoom/g.clientWidth,e.object.matrix),q(u*(e.object.top-e.object.bottom)/e.object.zoom/g.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function F(t){e.object.isPerspectiveCamera?P/=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom*t)),e.object.updateProjectionMatrix(),f=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function J(t){e.object.isPerspectiveCamera?P*=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/t)),e.object.updateProjectionMatrix(),f=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function Q(t){b.set(t.clientX,t.clientY)}function Oe(t){k.set(t.clientX,t.clientY)}function $(t){O.set(t.clientX,t.clientY)}function De(t){M.set(t.clientX,t.clientY),x.subVectors(M,b).multiplyScalar(e.rotateSpeed);const a=e.domElement;H(2*Math.PI*x.x/a.clientHeight),G(2*Math.PI*x.y/a.clientHeight),b.copy(M),e.update()}function xe(t){v.set(t.clientX,t.clientY),R.subVectors(v,k),R.y>0?F(_()):R.y<0&&J(_()),k.copy(v),e.update()}function Ce(t){D.set(t.clientX,t.clientY),C.subVectors(D,O).multiplyScalar(e.panSpeed),A(C.x,C.y),O.copy(D),e.update()}function ke(t){t.deltaY<0?J(_()):t.deltaY>0&&F(_()),e.update()}function ve(t){let a=!1;switch(t.code){case e.keys.UP:A(0,e.keyPanSpeed),a=!0;break;case e.keys.BOTTOM:A(0,-e.keyPanSpeed),a=!0;break;case e.keys.LEFT:A(e.keyPanSpeed,0),a=!0;break;case e.keys.RIGHT:A(-e.keyPanSpeed,0),a=!0;break}a&&(t.preventDefault(),e.update())}function ee(){if(c.length===1)b.set(c[0].pageX,c[0].pageY);else{const t=.5*(c[0].pageX+c[1].pageX),a=.5*(c[0].pageY+c[1].pageY);b.set(t,a)}}function te(){if(c.length===1)O.set(c[0].pageX,c[0].pageY);else{const t=.5*(c[0].pageX+c[1].pageX),a=.5*(c[0].pageY+c[1].pageY);O.set(t,a)}}function ne(){const t=c[0].pageX-c[1].pageX,a=c[0].pageY-c[1].pageY,h=Math.sqrt(t*t+a*a);k.set(0,h)}function Ae(){e.enableZoom&&ne(),e.enablePan&&te()}function Le(){e.enableZoom&&ne(),e.enableRotate&&ee()}function ie(t){if(c.length==1)M.set(t.pageX,t.pageY);else{const h=Z(t),u=.5*(t.pageX+h.x),g=.5*(t.pageY+h.y);M.set(u,g)}x.subVectors(M,b).multiplyScalar(e.rotateSpeed);const a=e.domElement;H(2*Math.PI*x.x/a.clientHeight),G(2*Math.PI*x.y/a.clientHeight),b.copy(M)}function se(t){if(c.length===1)D.set(t.pageX,t.pageY);else{const a=Z(t),h=.5*(t.pageX+a.x),u=.5*(t.pageY+a.y);D.set(h,u)}C.subVectors(D,O).multiplyScalar(e.panSpeed),A(C.x,C.y),O.copy(D)}function ae(t){const a=Z(t),h=t.pageX-a.x,u=t.pageY-a.y,g=Math.sqrt(h*h+u*u);v.set(0,g),R.set(0,Math.pow(v.y/k.y,e.zoomSpeed)),F(R.y),k.copy(v)}function Ne(t){e.enableZoom&&ae(t),e.enablePan&&se(t)}function je(t){e.enableZoom&&ae(t),e.enableRotate&&ie(t)}function oe(t){e.enabled!==!1&&(c.length===0&&(e.domElement.setPointerCapture(t.pointerId),e.domElement.addEventListener("pointermove",U),e.domElement.addEventListener("pointerup",B)),ze(t),t.pointerType==="touch"?_e(t):Re(t))}function U(t){e.enabled!==!1&&(t.pointerType==="touch"?Ye(t):Ie(t))}function B(t){ue(t),c.length===0&&(e.domElement.releasePointerCapture(t.pointerId),e.domElement.removeEventListener("pointermove",U),e.domElement.removeEventListener("pointerup",B)),e.dispatchEvent(Pe),o=i.NONE}function re(t){ue(t)}function Re(t){let a;switch(t.button){case 0:a=e.mouseButtons.LEFT;break;case 1:a=e.mouseButtons.MIDDLE;break;case 2:a=e.mouseButtons.RIGHT;break;default:a=-1}switch(a){case N.DOLLY:if(e.enableZoom===!1)return;Oe(t),o=i.DOLLY;break;case N.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;$(t),o=i.PAN}else{if(e.enableRotate===!1)return;Q(t),o=i.ROTATE}break;case N.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;Q(t),o=i.ROTATE}else{if(e.enablePan===!1)return;$(t),o=i.PAN}break;default:o=i.NONE}o!==i.NONE&&e.dispatchEvent(X)}function Ie(t){switch(o){case i.ROTATE:if(e.enableRotate===!1)return;De(t);break;case i.DOLLY:if(e.enableZoom===!1)return;xe(t);break;case i.PAN:if(e.enablePan===!1)return;Ce(t);break}}function ce(t){e.enabled===!1||e.enableZoom===!1||o!==i.NONE||(t.preventDefault(),e.dispatchEvent(X),ke(t),e.dispatchEvent(Pe))}function le(t){e.enabled===!1||e.enablePan===!1||ve(t)}function _e(t){switch(de(t),c.length){case 1:switch(e.touches.ONE){case j.ROTATE:if(e.enableRotate===!1)return;ee(),o=i.TOUCH_ROTATE;break;case j.PAN:if(e.enablePan===!1)return;te(),o=i.TOUCH_PAN;break;default:o=i.NONE}break;case 2:switch(e.touches.TWO){case j.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ae(),o=i.TOUCH_DOLLY_PAN;break;case j.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Le(),o=i.TOUCH_DOLLY_ROTATE;break;default:o=i.NONE}break;default:o=i.NONE}o!==i.NONE&&e.dispatchEvent(X)}function Ye(t){switch(de(t),o){case i.TOUCH_ROTATE:if(e.enableRotate===!1)return;ie(t),e.update();break;case i.TOUCH_PAN:if(e.enablePan===!1)return;se(t),e.update();break;case i.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ne(t),e.update();break;case i.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;je(t),e.update();break;default:o=i.NONE}}function he(t){e.enabled!==!1&&t.preventDefault()}function ze(t){c.push(t)}function ue(t){delete I[t.pointerId];for(let a=0;a<c.length;a++)if(c[a].pointerId==t.pointerId){c.splice(a,1);return}}function de(t){let a=I[t.pointerId];a===void 0&&(a=new E,I[t.pointerId]=a),a.set(t.pageX,t.pageY)}function Z(t){const a=t.pointerId===c[0].pointerId?c[1]:c[0];return I[a.pointerId]}e.domElement.addEventListener("contextmenu",he),e.domElement.addEventListener("pointerdown",oe),e.domElement.addEventListener("pointercancel",re),e.domElement.addEventListener("wheel",ce,{passive:!1}),this.update()}}class bt extends Be{constructor(){super(...arguments);l(this,"uniforms")}}class gt{constructor(){l(this,"resources");this.resources=new Set}track(n){if(!n)return n;if(Array.isArray(n))return n.forEach(s=>this.track(s)),n;if((n.dispose||n instanceof z)&&this.resources.add(n),n instanceof z)n.geometry&&this.track(n.geometry),n.material&&this.track(n.material),this.track(n.children);else if(n instanceof bt){for(const s of Object.values(n))s instanceof be&&this.track(s);if(n.uniforms){for(const s of Object.values(n.uniforms))if(s){const e=s.value;(e instanceof be||Array.isArray(e))&&this.track(e)}}}return n}untrack(n){this.resources.delete(n)}dispose(){for(const n of this.resources)n instanceof z&&n.parent&&n.parent.remove(n),n.dispose&&n.dispose();this.resources.clear()}}const Et="/make-a-three-scene/assets/earth.8dffbf68.jpg",yt="/make-a-three-scene/assets/earth_outline.477e4b93.png";class wt extends W{constructor(){super(...arguments);l(this,"selfSpeed")}}class Tt extends it{}class St{constructor(n,s){l(this,"sceneDom");l(this,"intersects");l(this,"raycaster");l(this,"pointer");l(this,"hoverSprite");l(this,"hoverColor");l(this,"hoverName");l(this,"clickSprite");l(this,"textData");l(this,"textCount");l(this,"colors");l(this,"speed");l(this,"radius");l(this,"animationId");l(this,"camera");l(this,"renderer");l(this,"scene");l(this,"controls");l(this,"Earth");l(this,"EarthOut");l(this,"group");l(this,"satelliteTrack");l(this,"pointerMoveCopy");l(this,"meshOnclickCopy");typeof n=="string"?this.sceneDom=document.querySelector(n)||document.createElement("div"):this.sceneDom=n;const e={textData:new Array(100).fill("\u9ED8\u8BA4\u6587\u5B57"),colors:[],speed:.001,radius:"width",scaleNum:1};s&&Object.keys(s).forEach(i=>{i in e&&(e[i]=s[i])}),this.intersects=[],this.raycaster=new Ze,this.pointer=new E,this.hoverSprite=null,this.hoverName=null,this.clickSprite=null,this.textData=e.textData,this.textCount=e.textData.length,this.colors=e.colors,this.speed=e.speed,e.radius==="width"?this.radius=this.sceneDom.clientWidth*e.scaleNum/2:e.radius==="height"?this.radius=this.sceneDom.clientHeight*e.scaleNum/2:typeof e.radius=="number"?this.radius=e.radius:this.radius=this.sceneDom.clientHeight*e.scaleNum/2,this.pointerMoveCopy=this.pointerMove.bind(this),this.meshOnclickCopy=this.meshOnclick.bind(this),this.animationId=null,this.satelliteTrack=new gt}init(){const n=this.sceneDom.clientWidth,s=this.sceneDom.clientHeight;this.camera=new Ve(60,n/s,1,1e3),this.camera.position.z=300,this.renderer=new Xe({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(n,s),this.renderer.outputEncoding=We,this.sceneDom.appendChild(this.renderer.domElement),this.scene=new Ge;const e=new Ke(15794175,1);e.position.set(-250,250,100),this.scene.add(e);const i=new qe(15794175,1);i.position.set(-250,250,100),this.scene.add(i);const o=new Je(17771,15794175,1);o.position.set(-250,250,100),this.scene.add(o);const d=new Qe(15794175,.8);this.scene.add(d),this.controls=new ft(this.camera,this.renderer.domElement),this.controls.autoRotate=!0}initEarth(){const n=new ge().load(Et),s=new W(new Ee(this.radius/2,100,100),new ye({map:n}));s.name="\u5730\u7403",this.Earth=s,this.scene.add(s);const e=new ge().load(yt),i=new we(new Te({map:e}));i.scale.x=i.scale.y=i.scale.z=this.radius*1.2,i.name="\u5730\u7403\u5916\u5708",i.position.set(0,0,0),this.EarthOut=i,this.scene.add(i)}initSatellites(){this.group=new Tt,this.group.name="\u6587\u5B57\u5B9E\u4F53";for(let n=0;n<this.textCount;n++){const s=this.initSatellite(this.radius/1.6,{x:-Math.PI*Math.random()*2,y:Math.PI*Math.random()*2,z:0},Math.random()*.005+this.speed,this.textData[n]);this.group.add(s)}this.scene.add(this.group)}initSatellite(n,s,e,i){const o=new W(new $e(n,n+.1,100,1),new et({color:"#51d9ff",transparent:!0,opacity:.3})),d=new wt(new Ee(1,1,1),new ye({transparent:!0,opacity:0})),r=this.initTextCanvas(i);let m;const P=this.colors.length;P>0?m=this.colors[tt.randInt(0,P-1)]:m="rgb("+[Math.round(Math.random()*200+55),Math.round(Math.random()*200+55),Math.round(Math.random()*200+55)].join(",")+")";const T=new Te({map:new nt(r),color:m}),f=new we(T);f.scale.x=90,f.scale.y=20,f.scale.z=20,f.position.set(n,0,0),f.name=i;const b=new z;return b.add(f),b.add(o),d.add(b),d.rotation.set((s==null?void 0:s.x)||0,(s==null?void 0:s.y)||0,(s==null?void 0:s.z)||0),d.name=i,d.selfSpeed=e,d}initTextCanvas(n){const s=document.createElement("canvas");s.width=450,s.height=100;const e=s.getContext("2d");e.fillStyle="#fff";const i=n,o=i.length>13?i.slice(0,13)+"...":i,d=Math.floor(Math.random()*20)+30;return e.font=`700 ${d}px sans-serif`,e.fillText(o,10,50),s}pointerMove(n){const s=this.sceneDom.getBoundingClientRect();if(this.pointer.x=(n.clientX-s.left)/this.sceneDom.offsetWidth*2-1,this.pointer.y=-((n.clientY-s.top)/this.sceneDom.offsetHeight)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera),this.scene.children&&Array.isArray(this.scene.children)){const e=this.scene.children.find(i=>i.name==="\u6587\u5B57\u5B9E\u4F53");this.intersects=this.raycaster.intersectObjects(e?e==null?void 0:e.children:[])}}meshOnclick(){this.intersects[0]&&(this.clickSprite=this.intersects[0].object.name,this.sceneDom.dispatchEvent(new CustomEvent("satellite",{detail:{spriteName:this.clickSprite}})))}resize(){this.camera.aspect=this.sceneDom.clientWidth/this.sceneDom.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.sceneDom.clientWidth,this.sceneDom.clientHeight)}addListeners(){this.sceneDom.addEventListener("pointermove",this.pointerMoveCopy),this.sceneDom.addEventListener("click",this.meshOnclickCopy)}removeListeners(){this.sceneDom.addEventListener("pointermove",this.pointerMoveCopy),this.sceneDom.removeEventListener("click",this.meshOnclickCopy)}animate(){this.animationId=requestAnimationFrame(this.animate.bind(this)),this.render()}render(){var n,s,e,i,o,d;if(this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.EarthOut.material.rotation+=.01,this.intersects.length>0){this.hoverSprite&&(this.hoverSprite.material.color=new V(((n=this.hoverColor)==null?void 0:n.r)||0,((s=this.hoverColor)==null?void 0:s.g)||0,((e=this.hoverColor)==null?void 0:e.b)||0)),this.hoverSprite=this.intersects[0].object;const r=this.intersects[0].object.material.color;this.hoverColor={r:r.r,g:r.g,b:r.b}}else this.hoverSprite&&(this.hoverSprite.material.color=new V(((i=this.hoverColor)==null?void 0:i.r)||0,((o=this.hoverColor)==null?void 0:o.g)||0,((d=this.hoverColor)==null?void 0:d.b)||0)),this.hoverSprite=null,this.hoverColor=null,this.controls.update();this.group.children.forEach(r=>{this.hoverSprite&&this.hoverSprite.uuid===r.children[0].children[0].uuid?r.children[0].children[0].material.color=new V(1,1,1):r.rotation.z-=r.selfSpeed||.01})}run(){this.init(),this.initEarth(),this.initSatellites(),this.satelliteTrack.track(this.camera),this.satelliteTrack.track(this.renderer),this.satelliteTrack.track(this.scene),this.satelliteTrack.track(this.controls),this.addListeners(),this.animate()}stop(){this.removeListeners(),this.satelliteTrack.dispose(),this.animationId&&cancelAnimationFrame(this.animationId)}}const Pt=St,Mt=at({__name:"ScenePage",props:{foldChange:{type:Boolean}},setup(p){const n=p,s=["HTML5","CSS3","Less","Sass","JavaScript","TypeScript","Node.js","npm","yarn","Nuxt.js","next.js","Express","Lodash","Vue 3","Vue 2","React","Angular","Svelte","Threejs","ECharts","AntV","Element Plus","Ant Design","Vant","ESlint","VSCode","webpack","Babel","Vite","Rollup","Python","Taichi","PyCharm","Java","IntelliJ IDEA","Web 3D","qiankun","WuJie","\u5FAE\u524D\u7AEF","\u5927\u524D\u7AEF","\u5C0F\u7A0B\u5E8F","\u73B0\u4EE3 JavaScript \u6559\u7A0B","CSS SECRETS"];let e;ot(()=>{e=new Pt(".oribit-wrapper",{textData:s,radius:"height",scaleNum:.5}),e.run()}),rt(()=>{e.stop()});function i(o){console.log(o.detail.spriteName)}return ct(()=>n.foldChange,()=>{setTimeout(()=>{e.resize()},350)}),(o,d)=>(lt(),ht(st,null,{default:ut(({theme:r})=>[dt("div",{class:pt(["oribit-wrapper",r]),onSatellite:i},null,34)]),_:1}))}});const Ct=mt(Mt,[["__scopeId","data-v-5c129c4c"]]);export{Ct as default};