import React, { useEffect } from 'react';

const setupFluid = ()=>{let e=document.getElementById(`fluid`);if(!e)return()=>{};let t={SIM_RESOLUTION:128,DYE_RESOLUTION:1440,CAPTURE_RESOLUTION:1512,DENSITY_DISSIPATION:.5,VELOCITY_DISSIPATION:3,PRESSURE:.1,PRESSURE_ITERATIONS:20,CURL:3,SPLAT_RADIUS:.2,SPLAT_FORCE:6e3,SHADING:!0,COLOR_UPDATE_SPEED:10,PAUSED:!1,BACK_COLOR:{r:.5,g:0,b:0},TRANSPARENT:!0};function n(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[0,0,0]}let r=[];r.push(new n);let{gl:i,ext:a}=o(e);a.supportLinearFiltering||(t.DYE_RESOLUTION=256,t.SHADING=!1);function o(e){let t={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},n=e.getContext(`webgl2`,t),r=!!n;r||(n=e.getContext(`webgl`,t)||e.getContext(`experimental-webgl`,t));let i,a;r?(n.getExtension(`EXT_color_buffer_float`),a=n.getExtension(`OES_texture_float_linear`)):(i=n.getExtension(`OES_texture_half_float`),a=n.getExtension(`OES_texture_half_float_linear`)),n.clearColor(0,0,0,1);let o=r?n.HALF_FLOAT:i.HALF_FLOAT_OES,c,l,u;return r?(c=s(n,n.RGBA16F,n.RGBA,o),l=s(n,n.RG16F,n.RG,o),u=s(n,n.R16F,n.RED,o)):(c=s(n,n.RGBA,n.RGBA,o),l=s(n,n.RGBA,n.RGBA,o),u=s(n,n.RGBA,n.RGBA,o)),{gl:n,ext:{formatRGBA:c,formatRG:l,formatR:u,halfFloatTexType:o,supportLinearFiltering:a}}}function s(e,t,n,r){if(!c(e,t,n,r))switch(t){case e.R16F:return s(e,e.RG16F,e.RG,r);case e.RG16F:return s(e,e.RGBA16F,e.RGBA,r);default:return null}return{internalFormat:t,format:n}}function c(e,t,n,r){let i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,t,4,4,0,n,r,null);let a=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0),e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}class l{constructor(e,t){this.vertexShader=e,this.fragmentShaderSource=t,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(e){let t=0;for(let n=0;n<e.length;n++)t+=qe(e[n]);let n=this.programs[t];if(n==null){let r=p(i.FRAGMENT_SHADER,this.fragmentShaderSource,e);n=d(this.vertexShader,r),this.programs[t]=n}n!=this.activeProgram&&(this.uniforms=f(n),this.activeProgram=n)}bind(){i.useProgram(this.activeProgram)}}class u{constructor(e,t){this.uniforms={},this.program=d(e,t),this.uniforms=f(this.program)}bind(){i.useProgram(this.program)}}function d(e,t){let n=i.createProgram();return i.attachShader(n,e),i.attachShader(n,t),i.linkProgram(n),i.getProgramParameter(n,i.LINK_STATUS)||console.trace(i.getProgramInfoLog(n)),n}function f(e){let t=[],n=i.getProgramParameter(e,i.ACTIVE_UNIFORMS);for(let r=0;r<n;r++){let n=i.getActiveUniform(e,r).name;t[n]=i.getUniformLocation(e,n)}return t}function p(e,t,n){t=m(t,n);let r=i.createShader(e);return i.shaderSource(r,t),i.compileShader(r),i.getShaderParameter(r,i.COMPILE_STATUS)||console.trace(i.getShaderInfoLog(r)),r}function m(e,t){if(t==null)return e;let n=``;return t.forEach(e=>{n+=`#define `+e+`
`}),n+e}let h=p(i.VERTEX_SHADER,`
       precision highp float;
   
       attribute vec2 aPosition;
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform vec2 texelSize;
   
       void main () {
           vUv = aPosition * 0.5 + 0.5;
           vL = vUv - vec2(texelSize.x, 0.0);
           vR = vUv + vec2(texelSize.x, 0.0);
           vT = vUv + vec2(0.0, texelSize.y);
           vB = vUv - vec2(0.0, texelSize.y);
           gl_Position = vec4(aPosition, 0.0, 1.0);
       }
   `);p(i.VERTEX_SHADER,`
       precision highp float;
   
       attribute vec2 aPosition;
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       uniform vec2 texelSize;
   
       void main () {
           vUv = aPosition * 0.5 + 0.5;
           float offset = 1.33333333;
           vL = vUv - texelSize * offset;
           vR = vUv + texelSize * offset;
           gl_Position = vec4(aPosition, 0.0, 1.0);
       }
   `),p(i.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       uniform sampler2D uTexture;
   
       void main () {
           vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
           sum += texture2D(uTexture, vL) * 0.35294117;
           sum += texture2D(uTexture, vR) * 0.35294117;
           gl_FragColor = sum;
       }
   `);let g=p(i.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       uniform sampler2D uTexture;
   
       void main () {
           gl_FragColor = texture2D(uTexture, vUv);
       }
   `),_=p(i.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       uniform sampler2D uTexture;
       uniform float value;
   
       void main () {
           gl_FragColor = value * texture2D(uTexture, vUv);
       }
   `);p(i.FRAGMENT_SHADER,`
       precision mediump float;
   
       uniform vec4 color;
   
       void main () {
           gl_FragColor = color;
       }
   `);let v=p(i.FRAGMENT_SHADER,`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       uniform sampler2D uTarget;
       uniform float aspectRatio;
       uniform vec3 color;
       uniform vec2 point;
       uniform float radius;
   
       void main () {
           vec2 p = vUv - point.xy;
           p.x *= aspectRatio;
           vec3 splat = exp(-dot(p, p) / radius) * color;
           vec3 base = texture2D(uTarget, vUv).xyz;
           gl_FragColor = vec4(base + splat, 1.0);
       }
   `),y=p(i.FRAGMENT_SHADER,`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       uniform sampler2D uVelocity;
       uniform sampler2D uSource;
       uniform vec2 texelSize;
       uniform vec2 dyeTexelSize;
       uniform float dt;
       uniform float dissipation;
   
       vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
           vec2 st = uv / tsize - 0.5;
   
           vec2 iuv = floor(st);
           vec2 fuv = fract(st);
   
           vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
           vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
           vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
           vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
   
           return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
       }
   
       void main () {
       #ifdef MANUAL_FILTERING
           vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
           vec4 result = bilerp(uSource, coord, dyeTexelSize);
       #else
           vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
           vec4 result = texture2D(uSource, coord);
       #endif
           float decay = 1.0 + dissipation * dt;
           gl_FragColor = result / decay;
       }`,a.supportLinearFiltering?null:[`MANUAL_FILTERING`]),b=p(i.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uVelocity;
   
       void main () {
           float L = texture2D(uVelocity, vL).x;
           float R = texture2D(uVelocity, vR).x;
           float T = texture2D(uVelocity, vT).y;
           float B = texture2D(uVelocity, vB).y;
   
           vec2 C = texture2D(uVelocity, vUv).xy;
           if (vL.x < 0.0) { L = -C.x; }
           if (vR.x > 1.0) { R = -C.x; }
           if (vT.y > 1.0) { T = -C.y; }
           if (vB.y < 0.0) { B = -C.y; }
   
           float div = 0.5 * (R - L + T - B);
           gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
       }
   `),x=p(i.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uVelocity;
   
       void main () {
           float L = texture2D(uVelocity, vL).y;
           float R = texture2D(uVelocity, vR).y;
           float T = texture2D(uVelocity, vT).x;
           float B = texture2D(uVelocity, vB).x;
           float vorticity = R - L - T + B;
           gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
       }
   `),S=p(i.FRAGMENT_SHADER,`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform sampler2D uVelocity;
       uniform sampler2D uCurl;
       uniform float curl;
       uniform float dt;
   
       void main () {
           float L = texture2D(uCurl, vL).x;
           float R = texture2D(uCurl, vR).x;
           float T = texture2D(uCurl, vT).x;
           float B = texture2D(uCurl, vB).x;
           float C = texture2D(uCurl, vUv).x;
   
           vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
           force /= length(force) + 0.0001;
           force *= curl * C;
           force.y *= -1.0;
   
           vec2 velocity = texture2D(uVelocity, vUv).xy;
           velocity += force * dt;
           velocity = min(max(velocity, -1000.0), 1000.0);
           gl_FragColor = vec4(velocity, 0.0, 1.0);
       }
   `),C=p(i.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uPressure;
       uniform sampler2D uDivergence;
   
       void main () {
           float L = texture2D(uPressure, vL).x;
           float R = texture2D(uPressure, vR).x;
           float T = texture2D(uPressure, vT).x;
           float B = texture2D(uPressure, vB).x;
           float C = texture2D(uPressure, vUv).x;
           float divergence = texture2D(uDivergence, vUv).x;
           float pressure = (L + R + B + T - divergence) * 0.25;
           gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
       }
   `),w=p(i.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uPressure;
       uniform sampler2D uVelocity;
   
       void main () {
           float L = texture2D(uPressure, vL).x;
           float R = texture2D(uPressure, vR).x;
           float T = texture2D(uPressure, vT).x;
           float B = texture2D(uPressure, vB).x;
           vec2 velocity = texture2D(uVelocity, vUv).xy;
           velocity.xy -= vec2(R - L, T - B);
           gl_FragColor = vec4(velocity, 0.0, 1.0);
       }
   `),T=(i.bindBuffer(i.ARRAY_BUFFER,i.createBuffer()),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),i.STATIC_DRAW),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,i.createBuffer()),i.bufferData(i.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),i.STATIC_DRAW),i.vertexAttribPointer(0,2,i.FLOAT,!1,0,0),i.enableVertexAttribArray(0),(e,t=!1)=>{e==null?(i.viewport(0,0,i.drawingBufferWidth,i.drawingBufferHeight),i.bindFramebuffer(i.FRAMEBUFFER,null)):(i.viewport(0,0,e.width,e.height),i.bindFramebuffer(i.FRAMEBUFFER,e.fbo)),t&&(i.clearColor(0,0,0,1),i.clear(i.COLOR_BUFFER_BIT)),i.drawElements(i.TRIANGLES,6,i.UNSIGNED_SHORT,0)}),E,D,ee,te,ne,re=new u(h,g),ie=new u(h,_),ae=new u(h,v),oe=new u(h,y),se=new u(h,b),O=new u(h,x),k=new u(h,S),ce=new u(h,C),le=new u(h,w),ue=new l(h,`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform sampler2D uTexture;
       uniform sampler2D uDithering;
       uniform vec2 ditherScale;
       uniform vec2 texelSize;
   
       vec3 linearToGamma (vec3 color) {
           color = max(color, vec3(0));
           return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
       }
   
       void main () {
           vec3 c = texture2D(uTexture, vUv).rgb;
   
       #ifdef SHADING
           vec3 lc = texture2D(uTexture, vL).rgb;
           vec3 rc = texture2D(uTexture, vR).rgb;
           vec3 tc = texture2D(uTexture, vT).rgb;
           vec3 bc = texture2D(uTexture, vB).rgb;
   
           float dx = length(rc) - length(lc);
           float dy = length(tc) - length(bc);
   
           vec3 n = normalize(vec3(dx, dy, length(texelSize)));
           vec3 l = vec3(0.0, 0.0, 1.0);
   
           float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
           c *= diffuse;
       #endif
   
           float a = max(c.r, max(c.g, c.b));
           gl_FragColor = vec4(c, a);
       }
   `);function de(){let e=Ge(t.SIM_RESOLUTION),n=Ge(t.DYE_RESOLUTION),r=a.halfFloatTexType,o=a.formatRGBA,s=a.formatRG,c=a.formatR,l=a.supportLinearFiltering?i.LINEAR:i.NEAREST;i.disable(i.BLEND),E=E==null?j(n.width,n.height,o.internalFormat,o.format,r,l):pe(E,n.width,n.height,o.internalFormat,o.format,r,l),D=D==null?j(e.width,e.height,s.internalFormat,s.format,r,l):pe(D,e.width,e.height,s.internalFormat,s.format,r,l),ee=A(e.width,e.height,c.internalFormat,c.format,r,i.NEAREST),te=A(e.width,e.height,c.internalFormat,c.format,r,i.NEAREST),ne=j(e.width,e.height,c.internalFormat,c.format,r,i.NEAREST)}function A(e,t,n,r,a,o){i.activeTexture(i.TEXTURE0);let s=i.createTexture();i.bindTexture(i.TEXTURE_2D,s),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,o),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,o),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.texImage2D(i.TEXTURE_2D,0,n,e,t,0,r,a,null);let c=i.createFramebuffer();return i.bindFramebuffer(i.FRAMEBUFFER,c),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,s,0),i.viewport(0,0,e,t),i.clear(i.COLOR_BUFFER_BIT),{texture:s,fbo:c,width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,attach(e){return i.activeTexture(i.TEXTURE0+e),i.bindTexture(i.TEXTURE_2D,s),e}}}function j(e,t,n,r,i,a){let o=A(e,t,n,r,i,a),s=A(e,t,n,r,i,a);return{width:e,height:t,texelSizeX:o.texelSizeX,texelSizeY:o.texelSizeY,get read(){return o},set read(e){o=e},get write(){return s},set write(e){s=e},swap(){let e=o;o=s,s=e}}}function fe(e,t,n,r,a,o,s){let c=A(t,n,r,a,o,s);return re.bind(),i.uniform1i(re.uniforms.uTexture,e.attach(0)),T(c),c}function pe(e,t,n,r,i,a,o){return e.width==t&&e.height==n?e:(e.read=fe(e.read,t,n,r,i,a,o),e.write=A(t,n,r,i,a,o),e.width=t,e.height=n,e.texelSizeX=1/t,e.texelSizeY=1/n,e)}function me(){let e=[];t.SHADING&&e.push(`SHADING`),ue.setKeywords(e)}me(),de();let he=Date.now(),ge=0,_e;function ve(){let e=ye();be()&&de(),xe(e),Se(),Ce(e),we(null),_e=requestAnimationFrame(ve)}function ye(){let e=Date.now(),t=(e-he)/1e3;return t=Math.min(t,.016666),he=e,t}function be(){let t=Ke(e.clientWidth),n=Ke(e.clientHeight);return e.width!=t||e.height!=n?(e.width=t,e.height=n,!0):!1}function xe(e){ge+=e*t.COLOR_UPDATE_SPEED,ge>=1&&(ge=We(ge,0,1),r.forEach(e=>{e.color=He()}))}function Se(){r.forEach(e=>{e.moved&&(e.moved=!1,Ee(e))})}function Ce(e){i.disable(i.BLEND),O.bind(),i.uniform2f(O.uniforms.texelSize,D.texelSizeX,D.texelSizeY),i.uniform1i(O.uniforms.uVelocity,D.read.attach(0)),T(te),k.bind(),i.uniform2f(k.uniforms.texelSize,D.texelSizeX,D.texelSizeY),i.uniform1i(k.uniforms.uVelocity,D.read.attach(0)),i.uniform1i(k.uniforms.uCurl,te.attach(1)),i.uniform1f(k.uniforms.curl,t.CURL),i.uniform1f(k.uniforms.dt,e),T(D.write),D.swap(),se.bind(),i.uniform2f(se.uniforms.texelSize,D.texelSizeX,D.texelSizeY),i.uniform1i(se.uniforms.uVelocity,D.read.attach(0)),T(ee),ie.bind(),i.uniform1i(ie.uniforms.uTexture,ne.read.attach(0)),i.uniform1f(ie.uniforms.value,t.PRESSURE),T(ne.write),ne.swap(),ce.bind(),i.uniform2f(ce.uniforms.texelSize,D.texelSizeX,D.texelSizeY),i.uniform1i(ce.uniforms.uDivergence,ee.attach(0));for(let e=0;e<t.PRESSURE_ITERATIONS;e++)i.uniform1i(ce.uniforms.uPressure,ne.read.attach(1)),T(ne.write),ne.swap();le.bind(),i.uniform2f(le.uniforms.texelSize,D.texelSizeX,D.texelSizeY),i.uniform1i(le.uniforms.uPressure,ne.read.attach(0)),i.uniform1i(le.uniforms.uVelocity,D.read.attach(1)),T(D.write),D.swap(),oe.bind(),i.uniform2f(oe.uniforms.texelSize,D.texelSizeX,D.texelSizeY),a.supportLinearFiltering||i.uniform2f(oe.uniforms.dyeTexelSize,D.texelSizeX,D.texelSizeY);let n=D.read.attach(0);i.uniform1i(oe.uniforms.uVelocity,n),i.uniform1i(oe.uniforms.uSource,n),i.uniform1f(oe.uniforms.dt,e),i.uniform1f(oe.uniforms.dissipation,t.VELOCITY_DISSIPATION),T(D.write),D.swap(),a.supportLinearFiltering||i.uniform2f(oe.uniforms.dyeTexelSize,E.texelSizeX,E.texelSizeY),i.uniform1i(oe.uniforms.uVelocity,D.read.attach(0)),i.uniform1i(oe.uniforms.uSource,E.read.attach(1)),i.uniform1f(oe.uniforms.dissipation,t.DENSITY_DISSIPATION),T(E.write),E.swap()}function we(e){i.blendFunc(i.ONE,i.ONE_MINUS_SRC_ALPHA),i.enable(i.BLEND),Te(e)}function Te(e){let n=e==null?i.drawingBufferWidth:e.width,r=e==null?i.drawingBufferHeight:e.height;ue.bind(),t.SHADING&&i.uniform2f(ue.uniforms.texelSize,1/n,1/r),i.uniform1i(ue.uniforms.uTexture,E.read.attach(0)),T(e)}function Ee(e){let n=e.deltaX*t.SPLAT_FORCE,r=e.deltaY*t.SPLAT_FORCE;Oe(e.texcoordX,e.texcoordY,n,r,e.color)}function De(e){let t=He();t.r*=10,t.g*=10,t.b*=10;let n=10*(Math.random()-.5),r=30*(Math.random()-.5);Oe(e.texcoordX,e.texcoordY,n,r,t)}function Oe(n,r,a,o,s){ae.bind(),i.uniform1i(ae.uniforms.uTarget,D.read.attach(0)),i.uniform1f(ae.uniforms.aspectRatio,e.width/e.height),i.uniform2f(ae.uniforms.point,n,r),i.uniform3f(ae.uniforms.color,a,o,0),i.uniform1f(ae.uniforms.radius,ke(t.SPLAT_RADIUS/100)),T(D.write),D.swap(),i.uniform1i(ae.uniforms.uTarget,E.read.attach(0)),i.uniform3f(ae.uniforms.color,s.r,s.g,s.b),T(E.write),E.swap()}function ke(t){let n=e.width/e.height;return n>1&&(t*=n),t}let Ae=e=>{let t=r[0];Le(t,-1,Ke(e.clientX),Ke(e.clientY)),De(t)},je=e=>{let t=r[0],n=Ke(e.clientX),i=Ke(e.clientY),a=t.color;Re(t,n,i,a)},Me=e=>{let t=e.targetTouches,n=r[0];for(let e=0;e<t.length;e++){let r=Ke(t[e].clientX),i=Ke(t[e].clientY);Le(n,t[e].identifier,r,i)}},Ne=e=>{let t=e.targetTouches,n=r[0];for(let e=0;e<t.length;e++)Re(n,Ke(t[e].clientX),Ke(t[e].clientY),n.color)},Pe=e=>{let t=e.changedTouches,n=r[0];for(let e=0;e<t.length;e++)ze(n)};window.addEventListener(`mousedown`,Ae);function Fe(e){let t=r[0],n=Ke(e.clientX),i=Ke(e.clientY),a=He();ve(),Re(t,n,i,a),document.body.removeEventListener(`mousemove`,Fe)}document.body.addEventListener(`mousemove`,Fe),window.addEventListener(`mousemove`,je);function Ie(e){let t=e.targetTouches,n=r[0];for(let e=0;e<t.length;e++){let r=Ke(t[e].clientX),i=Ke(t[e].clientY);ve(),Le(n,t[e].identifier,r,i)}document.body.removeEventListener(`touchstart`,Ie)}document.body.addEventListener(`touchstart`,Ie),window.addEventListener(`touchstart`,Me),window.addEventListener(`touchmove`,Ne,!1),window.addEventListener(`touchend`,Pe);function Le(t,n,r,i){t.id=n,t.down=!0,t.moved=!1,t.texcoordX=r/e.width,t.texcoordY=1-i/e.height,t.prevTexcoordX=t.texcoordX,t.prevTexcoordY=t.texcoordY,t.deltaX=0,t.deltaY=0,t.color=He()}function Re(t,n,r,i){t.prevTexcoordX=t.texcoordX,t.prevTexcoordY=t.texcoordY,t.texcoordX=n/e.width,t.texcoordY=1-r/e.height,t.deltaX=Be(t.texcoordX-t.prevTexcoordX),t.deltaY=Ve(t.texcoordY-t.prevTexcoordY),t.moved=Math.abs(t.deltaX)>0||Math.abs(t.deltaY)>0,t.color=i}function ze(e){e.down=!1}function Be(t){let n=e.width/e.height;return n<1&&(t*=n),t}function Ve(t){let n=e.width/e.height;return n>1&&(t/=n),t}function He(){let e=Ue(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}function Ue(e,t,n){let r,i,a,o,s,c,l,u;switch(o=Math.floor(e*6),s=e*6-o,c=n*(1-t),l=n*(1-s*t),u=n*(1-(1-s)*t),o%6){case 0:r=n,i=u,a=c;break;case 1:r=l,i=n,a=c;break;case 2:r=c,i=n,a=u;break;case 3:r=c,i=l,a=n;break;case 4:r=u,i=c,a=n;break;case 5:r=n,i=c,a=l;break}return{r,g:i,b:a}}function We(e,t,n){let r=n-t;return r==0?t:(e-t)%r+t}function Ge(e){let t=i.drawingBufferWidth/i.drawingBufferHeight;t<1&&(t=1/t);let n=Math.round(e),r=Math.round(e*t);return i.drawingBufferWidth>i.drawingBufferHeight?{width:r,height:n}:{width:n,height:r}}function Ke(e){let t=window.devicePixelRatio||1;return Math.floor(e*t)}function qe(e){if(e.length==0)return 0;let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return t}return()=>{cancelAnimationFrame(_e),window.removeEventListener(`mousedown`,Ae),document.body.removeEventListener(`mousemove`,Fe),window.removeEventListener(`mousemove`,je),document.body.removeEventListener(`touchstart`,Ie),window.removeEventListener(`touchstart`,Me),window.removeEventListener(`touchmove`,Ne,!1),window.removeEventListener(`touchend`,Pe)}}

export default function FluidBackground() {
  useEffect(() => {
    const cleanup = setupFluid();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
      <canvas id="fluid" className="fixed top-0 left-0 w-full h-full z-50 pointer-events-none" />
    </div>
  );
}
