!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app-compat"),require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app-compat","@firebase/app"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).firebase,e.firebase.INTERNAL.modularAPIs)}(this,function(A,C){"use strict";try{!(function(){function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var a,t,n=e(A);class o extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,o.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,r.prototype.create)}}class r{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){var r,n=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],s=s?(r=n,s.replace(c,(e,t)=>{var n=r[t];return null!=n?String(n):`<${t}?>`})):"Error",s=`${this.serviceName}: ${s} (${i}).`;return new o(i,s,n)}}const c=/\{\$([^}]+)}/g;function i(e){return e&&e._delegate?e._delegate:e}class s{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}function p(e,t){const n={};for(const r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r]));return n}function f(e){if(null==e)return e;if(e["@type"])switch(e["@type"]){case"type.googleapis.com/google.protobuf.Int64Value":case"type.googleapis.com/google.protobuf.UInt64Value":var t=Number(e.value);if(isNaN(t))throw new Error("Data cannot be decoded from JSON: "+e);return t;default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map(e=>f(e)):"function"==typeof e||"object"==typeof e?p(e,e=>f(e)):e}const u="functions",l={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class g extends o{constructor(e,t,n){super(`${u}/${e}`,t||""),this.details=n}}function m(e,t){let n=function(e){if(200<=e&&e<300)return"ok";switch(e){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}(e),r=n,i=void 0;try{var s=t&&t.error;if(s){const e=s.status;if("string"==typeof e){if(!l[e])return new g("internal","internal");n=l[e],r=e}var a=s.message;"string"==typeof a&&(r=a),i=s.details,void 0!==i&&(i=f(i))}}catch(e){}return"ok"===n?null:new g(n,r,i)}class h{constructor(e,t,n){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then(e=>this.auth=e,()=>{}),this.messaging||t.get().then(e=>this.messaging=e,()=>{}),this.appCheck||n.get().then(e=>this.appCheck=e,()=>{})}async getAuthToken(){if(this.auth)try{var e=await this.auth.getToken();return null==e?void 0:e.accessToken}catch(e){return}}async getMessagingToken(){if(this.messaging&&"Notification"in self&&"granted"===Notification.permission)try{return this.messaging.getToken()}catch(e){return}}async getAppCheckToken(){if(this.appCheck){var e=await this.appCheck.getToken();return e.error?null:e.token}return null}async getContext(){return{authToken:await this.getAuthToken(),messagingToken:await this.getMessagingToken(),appCheckToken:await this.getAppCheckToken()}}}const d="us-central1";class v{constructor(e,t,n,r,i=d,s){this.app=e,this.fetchImpl=s,this.emulatorOrigin=null,this.contextProvider=new h(t,n,r),this.cancelAllRequests=new Promise(e=>{this.deleteService=()=>Promise.resolve(e())});try{var a=new URL(i);this.customDomain=a.origin,this.region=d}catch(e){this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){var t=this.app.options.projectId;return null===this.emulatorOrigin?null!==this.customDomain?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`:`${this.emulatorOrigin}/${t}/${this.region}/${e}`}}function w(t,n,r){return e=>async function(e,t,n,r){const i=e._url(t),s={data:n=function t(e){if(null==e)return null;if("number"==typeof(e=e instanceof Number?e.valueOf():e)&&isFinite(e))return e;if(!0===e||!1===e)return e;if("[object String]"===Object.prototype.toString.call(e))return e;if(e instanceof Date)return e.toISOString();if(Array.isArray(e))return e.map(e=>t(e));if("function"==typeof e||"object"==typeof e)return p(e,e=>t(e));throw new Error("Data cannot be encoded in JSON: "+e)}(n)},a={},o=await e.contextProvider.getContext();o.authToken&&(a.Authorization="Bearer "+o.authToken);o.messagingToken&&(a["Firebase-Instance-ID-Token"]=o.messagingToken);null!==o.appCheckToken&&(a["X-Firebase-AppCheck"]=o.appCheckToken);const c=r.timeout||7e4,u=function(n){let r=null;return{promise:new Promise((e,t)=>{r=setTimeout(()=>{t(new g("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{r&&clearTimeout(r)}}}(c),l=await Promise.race([async function(e,t,n,r){n["Content-Type"]="application/json";let i;try{i=await r(e,{method:"POST",body:JSON.stringify(t),headers:n})}catch(e){return{status:0,json:null}}let s=null;try{s=await i.json()}catch(e){}return{status:i.status,json:s}}(i,s,a,e.fetchImpl),u.promise,e.cancelAllRequests]);if(u.cancel(),!l)throw new g("cancelled","Firebase Functions instance was deleted.");var h=m(l.status,l.json);if(h)throw h;if(!l.json)throw new g("internal","Response is not valid JSON object.");let d=l.json.data;void 0===d&&(d=l.json.result);if(void 0===d)throw new g("internal","Response is missing data field.");h=f(d);return{data:h}}(t,n,e,r||{})}const y="@firebase/functions",E="0.7.8";function I(e,t,n){i(e).emulatorOrigin=`http://${t}:${n}`}a=fetch.bind(self),C._registerComponent(new s(u,(e,{instanceIdentifier:t})=>{var n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("messaging-internal"),s=e.getProvider("app-check-internal");return new v(n,r,i,s,t,a)},"PUBLIC").setMultipleInstances(!0)),C.registerVersion(y,E,t),C.registerVersion(y,E,"esm2017");var T;class b{constructor(e,t){this.app=e,this._delegate=t,this._region=this._delegate.region,this._customDomain=this._delegate.customDomain}httpsCallable(e,t){return w(i(this._delegate),e,t)}useFunctionsEmulator(e){var t=e.match("[a-zA-Z]+://([a-zA-Z0-9.-]+)(?::([0-9]+))?");if(null==t)throw new o("functions","No origin provided to useFunctionsEmulator()");if(null==t[2])throw new o("functions","Port missing in origin provided to useFunctionsEmulator()");return I(this._delegate,t[1],Number(t[2]))}useEmulator(e,t){return I(this._delegate,e,t)}}const k="us-central1",N=(e,{instanceIdentifier:t})=>{var n=e.getProvider("app-compat").getImmediate(),r=e.getProvider("functions").getImmediate({identifier:null!=t?t:k});return new b(n,r)};T={Functions:b},n.default.INTERNAL.registerComponent(new s("functions-compat",N,"PUBLIC").setServiceProps(T).setMultipleInstances(!0)),n.default.registerVersion("@firebase/functions-compat","0.1.9")}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-functions-compat.js - be sure to load firebase-app.js first.")}});
//# sourceMappingURL=firebase-functions-compat.js.map
