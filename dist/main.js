!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s="mEWr")}({NmDg:function(t,e,n){"use strict";e.a={name:"vue-slide-toggle",props:{active:{type:Boolean,default:!1},duration:{type:[Number,String],default:500}},data:function(){return{maxHeight:0,isAbsolute:!1}},mounted:function(){this.checkIfAbsolutelyPositioned()},updated:function(){this.checkIfAbsolutelyPositioned()},computed:{durationNormalized:function(){return"string"==typeof this.duration?this.duration:this.duration+"ms"},containerClassMap:function(){return{"vue-slide-toggle":!0,"vue-slide-toggle--active":this.active}},contentClassMap:function(){return{"vue-slide-toggle__content":!0}},containerStyleMap:function(){return this.isAbsolute?{overflow:"hidden"}:{overflow:"hidden","max-height":this.maxHeight+"px","transition-property":"max-height","transition-duration":this.durationNormalized}},contentStyleMap:function(){return this.isAbsolute?{transform:"translateY("+(this.active?"0":"-100%")+")","transition-property":"transform","transition-duration":this.durationNormalized}:null}},methods:{checkIfAbsolutelyPositioned:function(){if("undefined"==typeof window)return!1;var t=this.$refs.container;if(!t)return!1;var e=window.getComputedStyle(t),n=["absolute","fixed"];this.isAbsolute=n.includes(e.position)}},watch:{active:function(t,e){if(!this.isAbsolute&&t!==e){if(!t)return void(this.maxHeight=0);var n=this.$refs.content;this.maxHeight=n.offsetHeight}}}}},"VU/8":function(t,e){t.exports=function(t,e,n,i,r){var o,s=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(o=t,s=t.default);var u="function"==typeof s?s.options:s;e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns),i&&(u._scopeId=i);var c;if(r?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},u._ssrRegister=c):n&&(c=n),c){var l=u.functional,d=l?u.render:u.beforeCreate;l?u.render=function(t,e){return c.call(e),d(t,e)}:u.beforeCreate=d?[].concat(d,c):[c]}return{esModule:o,exports:s,options:u}}},"VbU/":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"container",class:t.containerClassMap,style:t.containerStyleMap},[n("div",{ref:"content",class:t.contentClassMap,style:t.contentStyleMap},[t._t("default")],2)])},r=[],o={render:i,staticRenderFns:r};e.a=o},mEWr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("NmDg"),r=n("VbU/"),o=n("VU/8"),s=o(i.a,r.a,null,null,null);e.default=s.exports}});