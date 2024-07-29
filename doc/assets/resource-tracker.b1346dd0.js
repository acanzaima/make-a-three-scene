var Se=Object.defineProperty;var Ie=(b,o,u)=>o in b?Se(b,o,{enumerable:!0,configurable:!0,writable:!0,value:u}):b[o]=u;var Z=(b,o,u)=>(Ie(b,typeof o!="symbol"?o+"":o,u),u);import{E as Ye,f as g,g as N,h as j,Q as fe,i as he,V as f,O as F,j as me,k as Ce}from"./three.module.cd558234.js";const de={type:"change"},X={type:"start"},be={type:"end"};class ze extends Ye{constructor(o,u){super(),this.object=o,this.domElement=u,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new g,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:N.ROTATE,MIDDLE:N.DOLLY,RIGHT:N.PAN},this.touches={ONE:j.ROTATE,TWO:j.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return r.phi},this.getAzimuthalAngle=function(){return r.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(t){t.addEventListener("keydown",re),this._domElementKeyEvents=t},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(de),e.update(),s=i.NONE},this.update=function(){const t=new g,n=new fe().setFromUnitVectors(o.up,new g(0,1,0)),c=n.clone().invert(),l=new g,p=new fe,k=2*Math.PI;return function(){const pe=e.object.position;t.copy(pe).sub(e.target),t.applyQuaternion(n),r.setFromVector3(t),e.autoRotate&&s===i.NONE&&_(ge()),e.enableDamping?(r.theta+=h.theta*e.dampingFactor,r.phi+=h.phi*e.dampingFactor):(r.theta+=h.theta,r.phi+=h.phi);let m=e.minAzimuthAngle,d=e.maxAzimuthAngle;return isFinite(m)&&isFinite(d)&&(m<-Math.PI?m+=k:m>Math.PI&&(m-=k),d<-Math.PI?d+=k:d>Math.PI&&(d-=k),m<=d?r.theta=Math.max(m,Math.min(d,r.theta)):r.theta=r.theta>(m+d)/2?Math.max(m,r.theta):Math.min(d,r.theta)),r.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,r.phi)),r.makeSafe(),r.radius*=x,r.radius=Math.max(e.minDistance,Math.min(e.maxDistance,r.radius)),e.enableDamping===!0?e.target.addScaledVector(T,e.dampingFactor):e.target.add(T),t.setFromSpherical(r),t.applyQuaternion(c),pe.copy(e.target).add(t),e.object.lookAt(e.target),e.enableDamping===!0?(h.theta*=1-e.dampingFactor,h.phi*=1-e.dampingFactor,T.multiplyScalar(1-e.dampingFactor)):(h.set(0,0,0),T.set(0,0,0)),x=1,S||l.distanceToSquared(e.object.position)>K||8*(1-p.dot(e.object.quaternion))>K?(e.dispatchEvent(de),l.copy(e.object.position),p.copy(e.object.quaternion),S=!1,!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",ce),e.domElement.removeEventListener("pointerdown",ae),e.domElement.removeEventListener("pointercancel",ie),e.domElement.removeEventListener("wheel",se),e.domElement.removeEventListener("pointermove",H),e.domElement.removeEventListener("pointerup",z),e._domElementKeyEvents!==null&&e._domElementKeyEvents.removeEventListener("keydown",re)};const e=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=i.NONE;const K=1e-6,r=new he,h=new he;let x=1;const T=new g;let S=!1;const E=new f,y=new f,M=new f,P=new f,O=new f,A=new f,w=new f,L=new f,R=new f,a=[],I={};function ge(){return 2*Math.PI/60/60*e.autoRotateSpeed}function Y(){return Math.pow(.95,e.zoomSpeed)}function _(t){h.theta-=t}function V(t){h.phi-=t}const W=function(){const t=new g;return function(c,l){t.setFromMatrixColumn(l,0),t.multiplyScalar(-c),T.add(t)}}(),q=function(){const t=new g;return function(c,l){e.screenSpacePanning===!0?t.setFromMatrixColumn(l,1):(t.setFromMatrixColumn(l,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(c),T.add(t)}}(),D=function(){const t=new g;return function(c,l){const p=e.domElement;if(e.object.isPerspectiveCamera){const k=e.object.position;t.copy(k).sub(e.target);let C=t.length();C*=Math.tan(e.object.fov/2*Math.PI/180),W(2*c*C/p.clientHeight,e.object.matrix),q(2*l*C/p.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(W(c*(e.object.right-e.object.left)/e.object.zoom/p.clientWidth,e.object.matrix),q(l*(e.object.top-e.object.bottom)/e.object.zoom/p.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function v(t){e.object.isPerspectiveCamera?x/=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom*t)),e.object.updateProjectionMatrix(),S=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function G(t){e.object.isPerspectiveCamera?x*=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/t)),e.object.updateProjectionMatrix(),S=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function B(t){E.set(t.clientX,t.clientY)}function Ee(t){w.set(t.clientX,t.clientY)}function Q(t){P.set(t.clientX,t.clientY)}function ye(t){y.set(t.clientX,t.clientY),M.subVectors(y,E).multiplyScalar(e.rotateSpeed);const n=e.domElement;_(2*Math.PI*M.x/n.clientHeight),V(2*Math.PI*M.y/n.clientHeight),E.copy(y),e.update()}function Pe(t){L.set(t.clientX,t.clientY),R.subVectors(L,w),R.y>0?v(Y()):R.y<0&&G(Y()),w.copy(L),e.update()}function Oe(t){O.set(t.clientX,t.clientY),A.subVectors(O,P).multiplyScalar(e.panSpeed),D(A.x,A.y),P.copy(O),e.update()}function Te(t){t.deltaY<0?G(Y()):t.deltaY>0&&v(Y()),e.update()}function Me(t){let n=!1;switch(t.code){case e.keys.UP:D(0,e.keyPanSpeed),n=!0;break;case e.keys.BOTTOM:D(0,-e.keyPanSpeed),n=!0;break;case e.keys.LEFT:D(e.keyPanSpeed,0),n=!0;break;case e.keys.RIGHT:D(-e.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),e.update())}function J(){if(a.length===1)E.set(a[0].pageX,a[0].pageY);else{const t=.5*(a[0].pageX+a[1].pageX),n=.5*(a[0].pageY+a[1].pageY);E.set(t,n)}}function $(){if(a.length===1)P.set(a[0].pageX,a[0].pageY);else{const t=.5*(a[0].pageX+a[1].pageX),n=.5*(a[0].pageY+a[1].pageY);P.set(t,n)}}function ee(){const t=a[0].pageX-a[1].pageX,n=a[0].pageY-a[1].pageY,c=Math.sqrt(t*t+n*n);w.set(0,c)}function Ae(){e.enableZoom&&ee(),e.enablePan&&$()}function we(){e.enableZoom&&ee(),e.enableRotate&&J()}function te(t){if(a.length==1)y.set(t.pageX,t.pageY);else{const c=U(t),l=.5*(t.pageX+c.x),p=.5*(t.pageY+c.y);y.set(l,p)}M.subVectors(y,E).multiplyScalar(e.rotateSpeed);const n=e.domElement;_(2*Math.PI*M.x/n.clientHeight),V(2*Math.PI*M.y/n.clientHeight),E.copy(y)}function ne(t){if(a.length===1)O.set(t.pageX,t.pageY);else{const n=U(t),c=.5*(t.pageX+n.x),l=.5*(t.pageY+n.y);O.set(c,l)}A.subVectors(O,P).multiplyScalar(e.panSpeed),D(A.x,A.y),P.copy(O)}function oe(t){const n=U(t),c=t.pageX-n.x,l=t.pageY-n.y,p=Math.sqrt(c*c+l*l);L.set(0,p),R.set(0,Math.pow(L.y/w.y,e.zoomSpeed)),v(R.y),w.copy(L)}function Le(t){e.enableZoom&&oe(t),e.enablePan&&ne(t)}function De(t){e.enableZoom&&oe(t),e.enableRotate&&te(t)}function ae(t){e.enabled!==!1&&(a.length===0&&(e.domElement.setPointerCapture(t.pointerId),e.domElement.addEventListener("pointermove",H),e.domElement.addEventListener("pointerup",z)),xe(t),t.pointerType==="touch"?je(t):ke(t))}function H(t){e.enabled!==!1&&(t.pointerType==="touch"?Re(t):Ne(t))}function z(t){le(t),a.length===0&&(e.domElement.releasePointerCapture(t.pointerId),e.domElement.removeEventListener("pointermove",H),e.domElement.removeEventListener("pointerup",z)),e.dispatchEvent(be),s=i.NONE}function ie(t){le(t)}function ke(t){let n;switch(t.button){case 0:n=e.mouseButtons.LEFT;break;case 1:n=e.mouseButtons.MIDDLE;break;case 2:n=e.mouseButtons.RIGHT;break;default:n=-1}switch(n){case N.DOLLY:if(e.enableZoom===!1)return;Ee(t),s=i.DOLLY;break;case N.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;Q(t),s=i.PAN}else{if(e.enableRotate===!1)return;B(t),s=i.ROTATE}break;case N.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;B(t),s=i.ROTATE}else{if(e.enablePan===!1)return;Q(t),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&e.dispatchEvent(X)}function Ne(t){switch(s){case i.ROTATE:if(e.enableRotate===!1)return;ye(t);break;case i.DOLLY:if(e.enableZoom===!1)return;Pe(t);break;case i.PAN:if(e.enablePan===!1)return;Oe(t);break}}function se(t){e.enabled===!1||e.enableZoom===!1||s!==i.NONE||(t.preventDefault(),e.dispatchEvent(X),Te(t),e.dispatchEvent(be))}function re(t){e.enabled===!1||e.enablePan===!1||Me(t)}function je(t){switch(ue(t),a.length){case 1:switch(e.touches.ONE){case j.ROTATE:if(e.enableRotate===!1)return;J(),s=i.TOUCH_ROTATE;break;case j.PAN:if(e.enablePan===!1)return;$(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(e.touches.TWO){case j.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ae(),s=i.TOUCH_DOLLY_PAN;break;case j.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;we(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&e.dispatchEvent(X)}function Re(t){switch(ue(t),s){case i.TOUCH_ROTATE:if(e.enableRotate===!1)return;te(t),e.update();break;case i.TOUCH_PAN:if(e.enablePan===!1)return;ne(t),e.update();break;case i.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Le(t),e.update();break;case i.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;De(t),e.update();break;default:s=i.NONE}}function ce(t){e.enabled!==!1&&t.preventDefault()}function xe(t){a.push(t)}function le(t){delete I[t.pointerId];for(let n=0;n<a.length;n++)if(a[n].pointerId==t.pointerId){a.splice(n,1);return}}function ue(t){let n=I[t.pointerId];n===void 0&&(n=new f,I[t.pointerId]=n),n.set(t.pageX,t.pageY)}function U(t){const n=t.pointerId===a[0].pointerId?a[1]:a[0];return I[n.pointerId]}e.domElement.addEventListener("contextmenu",ce),e.domElement.addEventListener("pointerdown",ae),e.domElement.addEventListener("pointercancel",ie),e.domElement.addEventListener("wheel",se,{passive:!1}),this.update()}}class _e extends Ce{constructor(){super(...arguments);Z(this,"uniforms")}}class Ue{constructor(){Z(this,"resources");this.resources=new Set}track(o){if(!o)return o;if(Array.isArray(o))return o.forEach(u=>this.track(u)),o;if((o.dispose||o instanceof F)&&this.resources.add(o),o instanceof F)o.geometry&&this.track(o.geometry),o.material&&this.track(o.material),this.track(o.children);else if(o instanceof _e){for(const u of Object.values(o))u instanceof me&&this.track(u);if(o.uniforms){for(const u of Object.values(o.uniforms))if(u){const e=u.value;(e instanceof me||Array.isArray(e))&&this.track(e)}}}return o}untrack(o){this.resources.delete(o)}dispose(){for(const o of this.resources)o instanceof F&&o.parent&&o.parent.remove(o),o.dispose&&o.dispose();this.resources.clear()}}export{ze as O,Ue as R};
