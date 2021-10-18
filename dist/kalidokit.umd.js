/**
 * @kalidokit v0.1.0
 * Blendshape and kinematics solver for Mediapipe/Tensorflow.js Face, Pose, and Finger tracking models.
 * 
 * @license
 * Copyright (c) 2020-2021 yeemachine
 * SPDX-License-Idntifier: MIT 
 * https://github.com/yeemachine/kalidokit#readme
 */
var it=Object.defineProperty;var nt=(u,x,f)=>x in u?it(u,x,{enumerable:!0,configurable:!0,writable:!0,value:f}):u[x]=f;var P=(u,x,f)=>(nt(u,typeof x!="symbol"?x+"":x,f),f);(function(u,x){typeof exports=="object"&&typeof module!="undefined"?x(exports):typeof define=="function"&&define.amd?define(["exports"],x):(u=typeof globalThis!="undefined"?globalThis:u||self,x(u.Kalidokit={}))})(this,function(u){"use strict";const x=(i,t,e)=>Math.max(Math.min(i,e),t),f=(i,t,e)=>(x(i,t,e)-t)/(e-t),D={Face:{eye:{l:1,r:1},mouth:{x:0,y:0,shape:{A:0,E:0,I:0,O:0,U:0}},head:{x:0,y:0,z:0,width:.3,height:.6,position:{x:.5,y:.5,z:0}},brow:0,pupil:{x:0,y:0}},Pose:{RightUpperArm:{x:0,y:0,z:-1.25},LeftUpperArm:{x:0,y:0,z:1.25},RightLowerArm:{x:0,y:0,z:0},LeftLowerArm:{x:0,y:0,z:0},LeftUpperLeg:{x:0,y:0,z:0},RightUpperLeg:{x:0,y:0,z:0},RightLowerLeg:{x:0,y:0,z:0},LeftLowerLeg:{x:0,y:0,z:0},LeftHand:{x:0,y:0,z:0},RightHand:{x:0,y:0,z:0},Spine:{x:0,y:0,z:0},Hips:{position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0}}},RightHand:{RightWrist:{x:-.13,y:-.07,z:-1.04},RightRingProximal:{x:0,y:0,z:-.13},RightRingIntermediate:{x:0,y:0,z:-.4},RightRingDistal:{x:0,y:0,z:-.04},RightIndexProximal:{x:0,y:0,z:-.24},RightIndexIntermediate:{x:0,y:0,z:-.25},RightIndexDistal:{x:0,y:0,z:-.06},RightMiddleProximal:{x:0,y:0,z:-.09},RightMiddleIntermediate:{x:0,y:0,z:-.44},RightMiddleDistal:{x:0,y:0,z:-.06},RightThumbProximal:{x:-.23,y:-.33,z:-.12},RightThumbIntermediate:{x:-.2,y:-.199,z:-.0139},RightThumbDistal:{x:-.2,y:.002,z:.15},RightLittleProximal:{x:0,y:0,z:-.09},RightLittleIntermediate:{x:0,y:0,z:-.225},RightLittleDistal:{x:0,y:0,z:-.1}},LeftHand:{LeftWrist:{x:-.13,y:-.07,z:-1.04},LeftRingProximal:{x:0,y:0,z:.13},LeftRingIntermediate:{x:0,y:0,z:.4},LeftRingDistal:{x:0,y:0,z:.049},LeftIndexProximal:{x:0,y:0,z:.24},LeftIndexIntermediate:{x:0,y:0,z:.25},LeftIndexDistal:{x:0,y:0,z:.06},LeftMiddleProximal:{x:0,y:0,z:.09},LeftMiddleIntermediate:{x:0,y:0,z:.44},LeftMiddleDistal:{x:0,y:0,z:.066},LeftThumbProximal:{x:-.23,y:.33,z:.12},LeftThumbIntermediate:{x:-.2,y:.25,z:.05},LeftThumbDistal:{x:-.2,y:.17,z:-.06},LeftLittleProximal:{x:0,y:0,z:.17},LeftLittleIntermediate:{x:0,y:0,z:.4},LeftLittleDistal:{x:0,y:0,z:.1}}};var X=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",clamp:x,remap:f,RestingDefault:D});class n{constructor(t,e,r){if(!!t&&t.constructor===Array){this.x=t[0]||0,this.y=t[1]||0,this.z=t[2]||0;return}if(!!t&&t.constructor===Object){this.x=t.x||0,this.y=t.y||0,this.z=t.z||0;return}this.x=t||0,this.y=e||0,this.z=r||0}negative(){return new n(-this.x,-this.y,-this.z)}add(t){return t instanceof n?new n(this.x+t.x,this.y+t.y,this.z+t.z):new n(this.x+t,this.y+t,this.z+t)}subtract(t){return t instanceof n?new n(this.x-t.x,this.y-t.y,this.z-t.z):new n(this.x-t,this.y-t,this.z-t)}multiply(t){return t instanceof n?new n(this.x*t.x,this.y*t.y,this.z*t.z):new n(this.x*t,this.y*t,this.z*t)}divide(t){return t instanceof n?new n(this.x/t.x,this.y/t.y,this.z/t.z):new n(this.x/t,this.y/t,this.z/t)}equals(t){return this.x==t.x&&this.y==t.y&&this.z==t.z}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}cross(t){return new n(this.y*t.z-this.z*t.y,this.z*t.x-this.x*t.z,this.x*t.y-this.y*t.x)}length(){return Math.sqrt(this.dot(this))}distance(t,e=3){return Math.sqrt(e===2?Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2):Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2)+Math.pow(this.z-t.z,2))}lerp(t,e){return t.subtract(this).multiply(e).add(this)}unit(){return this.divide(this.length())}min(){return Math.min(Math.min(this.x,this.y),this.z)}max(){return Math.max(Math.max(this.x,this.y),this.z)}toAngles(){return{theta:Math.atan2(this.z,this.x),phi:Math.asin(this.y/this.length())}}angleTo(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}toArray(t){return[this.x,this.y,this.z].slice(0,t||3)}clone(){return new n(this.x,this.y,this.z)}init(t,e,r){return this.x=t,this.y=e,this.z=r,this}static negative(t,e){return e.x=-t.x,e.y=-t.y,e.z=-t.z,e}static add(t,e,r){return e instanceof n?(r.x=t.x+e.x,r.y=t.y+e.y,r.z=t.z+e.z):(r.x=t.x+e,r.y=t.y+e,r.z=t.z+e),r}static subtract(t,e,r){return e instanceof n?(r.x=t.x-e.x,r.y=t.y-e.y,r.z=t.z-e.z):(r.x=t.x-e,r.y=t.y-e,r.z=t.z-e),r}static multiply(t,e,r){return e instanceof n?(r.x=t.x*e.x,r.y=t.y*e.y,r.z=t.z*e.z):(r.x=t.x*e,r.y=t.y*e,r.z=t.z*e),r}static divide(t,e,r){return e instanceof n?(r.x=t.x/e.x,r.y=t.y/e.y,r.z=t.z/e.z):(r.x=t.x/e,r.y=t.y/e,r.z=t.z/e),r}static cross(t,e,r){return r.x=t.y*e.z-t.z*e.y,r.y=t.z*e.x-t.x*e.z,r.z=t.x*e.y-t.y*e.x,r}static unit(t,e){let r=t.length();return e.x=t.x/r,e.y=t.y/r,e.z=t.z/r,e}static fromAngles(t,e){return new n(Math.cos(t)*Math.cos(e),Math.sin(e),Math.sin(t)*Math.cos(e))}static randomDirection(){return n.fromAngles(Math.random()*Math.PI*2,Math.asin(Math.random()*2-1))}static min(t,e){return new n(Math.min(t.x,e.x),Math.min(t.y,e.y),Math.min(t.z,e.z))}static max(t,e){return new n(Math.max(t.x,e.x),Math.max(t.y,e.y),Math.max(t.z,e.z))}static lerp(t,e,r){return e instanceof n?e.subtract(t).multiply(r).add(t):(e-t)*r+t}static fromArray(t){return!!t&&t.constructor===Array?new n(t[0],t[1],t[2]):new n(t.x,t.y,t.z)}static angleBetween(t,e){return t.angleTo(e)}static angleBetweenVertices(t,e,r){t.subtract(e),r.subtract(e)}static distance(t,e,r){return Math.sqrt(r===2?Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2):Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)+Math.pow(t.z-e.z,2))}static toDegrees(t){return t*(180/Math.PI)}static normalizeAngle(t){let e=Math.PI*2,r=t%e;return r=r>Math.PI?r-e:r<-Math.PI?e+r:r,r/Math.PI}static normalizeRadians(t){return t>=Math.PI/2&&(t-=2*Math.PI),t<=-Math.PI/2&&(t+=2*Math.PI,t=Math.PI-t),t/Math.PI}static find2DAngle(t,e,r,o){var a=o-e,l=r-t,s=Math.atan2(a,l);return s}static findRotation(t,e,r=!0){return r?new n(n.normalizeRadians(n.find2DAngle(t.z,t.x,e.z,e.x)),n.normalizeRadians(n.find2DAngle(t.z,t.y,e.z,e.y)),n.normalizeRadians(n.find2DAngle(t.x,t.y,e.x,e.y))):new n(n.find2DAngle(t.z,t.x,e.z,e.x),n.find2DAngle(t.z,t.y,e.z,e.y),n.find2DAngle(t.x,t.y,e.x,e.y))}static rollPitchYaw(t,e,r){if(!r)return new n(n.normalizeAngle(n.find2DAngle(t.z,t.y,e.z,e.y)),n.normalizeAngle(n.find2DAngle(t.z,t.x,e.z,e.x)),n.normalizeAngle(n.find2DAngle(t.x,t.y,e.x,e.y)));let o=e.subtract(t),a=r.subtract(t),s=o.cross(a).unit(),y=o.unit(),h=s.cross(y),z=Math.asin(s.x)||0,g=Math.atan2(-s.y,s.z)||0,p=Math.atan2(-h.x,y.x)||0;return new n(n.normalizeAngle(g),n.normalizeAngle(z),n.normalizeAngle(p))}static angleBetween3DCoords(t,e,r){t instanceof n||(t=new n(t),e=new n(e),r=new n(r));const o=t.subtract(e),a=r.subtract(e),l=o.unit(),s=a.unit(),y=l.dot(s),h=Math.acos(y);return n.normalizeRadians(h)}}const H=i=>{let t={r:n.findRotation(i[11],i[13]),l:n.findRotation(i[12],i[14])};t.r.y=n.angleBetween3DCoords(i[12],i[11],i[13]),t.l.y=n.angleBetween3DCoords(i[11],i[12],i[14]);let e={r:n.findRotation(i[13],i[15]),l:n.findRotation(i[14],i[16])};e.r.y=n.angleBetween3DCoords(i[11],i[13],i[15]),e.l.y=n.angleBetween3DCoords(i[12],i[14],i[16]),e.r.z=x(e.r.z,-2.14,0),e.l.z=x(e.l.z,-2.14,0);let r={r:n.findRotation(n.fromArray(i[15]),n.lerp(n.fromArray(i[17]),n.fromArray(i[19]),.5)),l:n.findRotation(n.fromArray(i[16]),n.lerp(n.fromArray(i[18]),n.fromArray(i[20]),.5))},o=B(t.r,e.r,r.r,"Right"),a=B(t.l,e.l,r.l,"Left");return{UpperArm:{r:o.UpperArm,l:a.UpperArm},LowerArm:{r:o.LowerArm,l:a.LowerArm},Hand:{r:o.Hand,l:a.Hand},Unscaled:{UpperArm:t,LowerArm:e,Hand:r}}},B=(i,t,e,r="right")=>{const o=r==="Right"?1:-1;return i.z*=-2.3*o,i.y*=Math.PI*o,i.y-=Math.max(t.x),i.y-=-o*Math.max(t.z,0),i.x-=.3*o,t.z*=-2.14*o,t.y*=2.14*o,t.x*=2.14*o,i.x=x(i.x,-.5,Math.PI),t.x=x(t.x,-.3,.3),e.y=x(e.z*2,-.6,.6),e.z=e.z*-2.3*o,{UpperArm:i,LowerArm:t,Hand:e}},U=(i,t)=>{let e=n.fromArray(t[23]),r=n.fromArray(t[24]),o=n.fromArray(t[11]),a=n.fromArray(t[12]),l=e.lerp(r),s=o.lerp(a),y=l.distance(s),h={position:{x:x(-1*(l.x-.65),-1,1),y:0,z:x(y-1,-2,0)},rotation:null};h.rotation=n.rollPitchYaw(i[23],i[24]),h.rotation.y>.5&&(h.rotation.y-=2),h.rotation.y+=.5,h.rotation.z>0&&(h.rotation.z=1-h.rotation.z),h.rotation.z<0&&(h.rotation.z=-1-h.rotation.z);let z=f(Math.abs(h.rotation.y),.2,.4);h.rotation.z*=1-z,h.rotation.x=0;let g=n.rollPitchYaw(i[11],i[12]);g.y>.5&&(g.y-=2),g.y+=.5,g.z>0&&(g.z=1-g.z),g.z<0&&(g.z=-1-g.z);let p=f(Math.abs(g.y),.2,.4);return g.z*=1-p,g.x=0,N(h,g)},N=(i,t)=>(i.rotation.x*=Math.PI,i.rotation.y*=Math.PI,i.rotation.z*=Math.PI,i.worldPosition={x:i.position.x*(.5+1.8*-i.position.z),y:0,z:i.position.z*(.1+i.position.z*-2)},t.x*=Math.PI,t.y*=Math.PI,t.z*=Math.PI,{Hips:i,Spine:t}),C=i=>{let t={r:n.findRotation(i[23],i[25]),l:n.findRotation(i[24],i[26])};t.r.z=x(t.r.z-.5,-.5,0),t.r.y=0,t.l.z=x(t.l.z-.5,-.5,0),t.l.y=0;let e={r:n.findRotation(i[25],i[27]),l:n.findRotation(i[26],i[28])};e.r.x=n.angleBetween3DCoords(i[23],i[25],i[27]),e.r.y=0,e.r.z=0,e.l.x=n.angleBetween3DCoords(i[24],i[26],i[28]),e.l.y=0,e.l.z=0;let r=T(t.r,e.r,"Right"),o=T(t.l,e.l,"Left");return{UpperLeg:{r:r.UpperLeg,l:o.UpperLeg},LowerLeg:{r:r.LowerLeg,l:o.LowerLeg},Unscaled:{UpperArm:t,LowerLeg:e}}},T=(i,t,e="right")=>{let r=e==="Right"?1:-1;return i.z=i.z*-2.3*r,i.x=x(i.z*.1*r,-.5,Math.PI),t.x=t.x*-2.14*1.3,{UpperLeg:i,LowerLeg:t}};class A{constructor(){}static solve(t,e,{runtime:r="mediapipe",video:o=null,imageSize:a=null,enableLegs:l=!0}={}){if(!t&&!e){console.error("Need both World Pose and Pose Landmarks");return}if(o){let c=o;typeof o=="string"&&(c=document.querySelector(o)),a={width:c.videoWidth,height:c.videoHeight}}r==="tfjs"&&a&&(t.forEach((c,m)=>{c.visibility=c.score}),e.forEach((c,m)=>{c.x/=a.width,c.y/=a.height,c.z=0,c.visibility=c.score}));let s=H(t),y=U(t,e),h=C(t),z=t[15].y>-.1||t[15].visibility<.23||.995<e[15].y,g=t[16].y>-.1||t[16].visibility<.23||.995<e[16].y,p=t[23].visibility<.63||y.Hips.position.z>-.4,d=t[24].visibility<.63||y.Hips.position.z>-.4;return s.UpperArm.l=s.UpperArm.l.multiply(g?0:1),s.UpperArm.l.z=g?D.Pose.LeftUpperArm.z:s.UpperArm.l.z,s.UpperArm.r=s.UpperArm.r.multiply(z?0:1),s.UpperArm.r.z=z?D.Pose.RightUpperArm.z:s.UpperArm.r.z,s.LowerArm.l=s.LowerArm.l.multiply(g?0:1),s.LowerArm.r=s.LowerArm.r.multiply(z?0:1),s.Hand.l=s.Hand.l.multiply(g?0:1),s.Hand.r=s.Hand.r.multiply(z?0:1),h.UpperLeg.l=h.UpperLeg.l.multiply(d?0:1),h.UpperLeg.r=h.UpperLeg.r.multiply(p?0:1),h.LowerLeg.l=h.LowerLeg.l.multiply(d?0:1),h.LowerLeg.r=h.LowerLeg.r.multiply(p?0:1),{RightUpperArm:s.UpperArm.r,RightLowerArm:s.LowerArm.r,LeftUpperArm:s.UpperArm.l,LeftLowerArm:s.LowerArm.l,RightHand:s.Hand.r,LeftHand:s.Hand.l,RightUpperLeg:h.UpperLeg.r,RightLowerLeg:h.LowerLeg.r,LeftUpperLeg:h.UpperLeg.l,LeftLowerLeg:h.LowerLeg.l,Hips:y.Hips,Spine:y.Spine}}}P(A,"calcArms",H),P(A,"calcHips",U),P(A,"calcLegs",C);class K{constructor(){}static solve(t,e="Right"){if(!t){console.error("Need Hand Landmarks");return}let r=[new n(t[0]),new n(t[e==="Right"?17:5]),new n(t[e==="Right"?5:17])],o=n.rollPitchYaw(r[0],r[1],r[2]);o.y=o.z,o.y-=.4;let a={};return a[e+"Wrist"]={x:o.x,y:o.y,z:o.z},a[e+"RingProximal"]={x:0,y:0,z:n.angleBetween3DCoords(t[0],t[13],t[14])},a[e+"RingIntermediate"]={x:0,y:0,z:n.angleBetween3DCoords(t[13],t[14],t[15])},a[e+"RingDistal"]={x:0,y:0,z:n.angleBetween3DCoords(t[14],t[15],t[16])},a[e+"IndexProximal"]={x:0,y:0,z:n.angleBetween3DCoords(t[0],t[5],t[6])},a[e+"IndexIntermediate"]={x:0,y:0,z:n.angleBetween3DCoords(t[5],t[6],t[7])},a[e+"IndexDistal"]={x:0,y:0,z:n.angleBetween3DCoords(t[6],t[7],t[8])},a[e+"MiddleProximal"]={x:0,y:0,z:n.angleBetween3DCoords(t[0],t[9],t[10])},a[e+"MiddleIntermediate"]={x:0,y:0,z:n.angleBetween3DCoords(t[9],t[10],t[11])},a[e+"MiddleDistal"]={x:0,y:0,z:n.angleBetween3DCoords(t[10],t[11],t[12])},a[e+"ThumbProximal"]={x:0,y:0,z:n.angleBetween3DCoords(t[0],t[1],t[2])},a[e+"ThumbIntermediate"]={x:0,y:0,z:n.angleBetween3DCoords(t[1],t[2],t[3])},a[e+"ThumbDistal"]={x:0,y:0,z:n.angleBetween3DCoords(t[2],t[3],t[4])},a[e+"LittleProximal"]={x:0,y:0,z:n.angleBetween3DCoords(t[0],t[17],t[18])},a[e+"LittleIntermediate"]={x:0,y:0,z:n.angleBetween3DCoords(t[17],t[18],t[19])},a[e+"LittleDistal"]={x:0,y:0,z:n.angleBetween3DCoords(t[18],t[19],t[20])},a=Z(a,e),a}}const Z=(i,t="Right")=>{const e=t==="Right"?1:-1;let r=["Ring","Index","Little","Thumb","Middle"],o=["Proximal","Intermediate","Distal"];return i[t+"Wrist"].x=x(i[t+"Wrist"].x*2*e,-.3,.3),i[t+"Wrist"].y=x(i[t+"Wrist"].y*2.3,t==="Right"?-1.2:-.6,t==="Right"?.6:1.6),i[t+"Wrist"].z=i[t+"Wrist"].z*-2.3*e,r.forEach(a=>{o.forEach(l=>{let s=i[t+a+l];if(a==="Thumb"){let y={x:l==="Proximal"?2.2:0,y:l==="Proximal"?2.2:l==="Intermediate"?.7:1,z:.5},h={x:l==="Proximal"?1.2:-.2,y:l==="Proximal"?1.1*e:.1*e,z:.2*e},z={x:0,y:0,z:0};l==="Proximal"?(z.z=x(h.z+s.z*-Math.PI*y.z*e,t==="Right"?-.6:-.3,t==="Right"?.3:.6),z.x=x(h.x+s.z*-Math.PI*y.x,-.6,.3),z.y=x(h.y+s.z*-Math.PI*y.y*e,t==="Right"?-1:-.3,t==="Right"?.3:1)):(z.z=x(h.z+s.z*-Math.PI*y.z*e,-2,2),z.x=x(h.x+s.z*-Math.PI*y.x,-2,2),z.y=x(h.y+s.z*-Math.PI*y.y*e,-2,2)),s.x=z.x,s.y=z.y,s.z=z.z}else s.z=x(s.z*-Math.PI*e,t==="Right"?-Math.PI:0,t==="Right"?0:Math.PI)})}),i},G=i=>{let t=new n(i[21]),e=new n(i[251]),r=new n(i[397]),o=new n(i[172]),a=r.lerp(o,.5);return{vector:[t,e,a],points:[t,e,r,o]}},J=i=>{let t=n.rollPitchYaw(i[0],i[1],i[2]),e=i[0].lerp(i[1],.5),r=i[0].distance(i[1]),o=e.distance(i[2]);return t.x*=-1,t.z*=-1,{y:t.y*Math.PI,x:t.x*Math.PI,z:t.z*Math.PI,width:r,height:o,position:e.lerp(i[2],.5),normalized:{y:t.y,x:t.x,z:t.z},degrees:{y:t.y*180,x:t.x*180,z:t.z*180}}},Q=i=>{const t=G(i);return J(t.vector)},w={eye:{left:[130,133,160,159,158,144,145,153],right:[263,362,387,386,385,373,374,380]},brow:{left:[35,244,63,105,66,229,230,231],right:[265,464,293,334,296,449,450,451]},pupil:{right:[468,469,470,471,472],left:[473,474,475,476,477]}},O=(i,t="left")=>{let e=w.brow[t],r=E(i[e[0]],i[e[1]],i[e[2]],i[e[3]],i[e[4]],i[e[5]],i[e[6]],i[e[7]]),o=1.15,a=.125,l=.07,s=r/o-1;return(x(s,l,a)-l)/(a-l)},W=(i,t="left")=>{let e=w.eye[t],r=E(i[e[0]],i[e[1]],i[e[2]],i[e[3]],i[e[4]],i[e[5]],i[e[6]],i[e[7]]),o=.285,a=.85,l=.55,s=x(r/o,0,2);return{norm:f(s,l,a),raw:s}},E=(i,t,e,r,o,a,l,s)=>{i=new n(i),t=new n(t),e=new n(e),r=new n(r),o=new n(o),a=new n(a),l=new n(l),s=new n(s);const y=i.distance(t,2),h=e.distance(a,2),z=r.distance(l,2),g=o.distance(s,2);return(h+z+g)/3/y},q=(i,t="left")=>{const e=new n(i[w.eye[t][0]]),r=new n(i[w.eye[t][1]]),o=e.distance(r,2),a=e.lerp(r,.5),l=new n(i[w.pupil[t][0]]),s=a.x-l.x,y=a.y-o*.075-l.y;let h=s/(o/2),z=y/(o/4);return h*=4,z*=4,{x:h,y:z}},Y=(i,t,e=!1,r=.5)=>{i.r=x(i.r,0,1),i.l=x(i.l,0,1);const o=Math.abs(i.l-i.r),a=e?1.1:.8,l=i.l<.3&&i.r<.3,s=i.l>.6&&i.r>.6;return t>r?{l:i.r,r:i.r}:t<-r?{l:i.l,r:i.l}:{l:o>=a&&!l&&!s?i.l:i.r>i.l?n.lerp(i.r,i.l,.95):n.lerp(i.r,i.l,.05),r:o>=a&&!l&&!s?i.r:i.r>i.l?n.lerp(i.r,i.l,.95):n.lerp(i.r,i.l,.05)}},$=i=>{if(i.length<=468)return{l:1,r:1};const t=W(i,"left"),e=W(i,"right");return{l:t.norm,r:e.norm}},j=i=>{if(i.length<=468)return{x:0,y:0};{const t=q(i,"left"),e=q(i,"right");return{x:(t.x+e.x)*.5,y:(t.y+e.y)*.5}}},v=i=>{if(i.length<=468)return 0;{const t=O(i,"left"),e=O(i,"right");return(t+e)/2}},b=(i,t,e="mediapipe")=>{const r=new n(i[133]),o=new n(i[362]),a=new n(i[130]),l=new n(i[263]),s=r.distance(o),y=a.distance(l),h=new n(i[13]),z=new n(i[14]),g=new n(i[61]),p=new n(i[291]),d=h.distance(z),c=g.distance(p);let m=c/d,I=d/s,L=c/y;I=f(I,.17,.5),L=f(L,.45,.9),L=(L-.3)*2;const R=I,k=e==="facemesh"?1.3:0;let M=f(m,1.3+k*.8,2.6+k)*f(R,.7,1),V=R*.2+R*(1-M)*.8,S=R*f(1-M,0,.3)*.1,tt=f(S,.2,1)*(1-M)*.3,et=(1-M)*f(R,.5,1)*.2;return{x:L,y:I,shape:{A:V,E:tt,I:M,O:et,U:S}}},_=(i,t,e)=>b(i,t,e);class F{constructor(){this.head={x:0,y:0,z:0},this.mouth={x:0,y:0},this.eye={l:1,r:1,indep:{l:1,r:1}},this.brow=0,this.pupil={x:0,y:0}}static solve(t,{runtime:e="mediapipe",smoothBlink:r=!1}={}){if(!t){console.error("Need Face Landmarks");return}let o=Q(t),a=$(t);r&&(a=Y(a,o.y));let l=j(t),s=_(t,o.x,e),y=v(t,o.x);return{head:o,eye:a,brow:y,pupil:l,mouth:s}}}P(F,"stabilizeBlink",Y),u.Face=F,u.Hand=K,u.Pose=A,u.Utils=X,u.Vector=n,Object.defineProperty(u,"__esModule",{value:!0}),u[Symbol.toStringTag]="Module"});
