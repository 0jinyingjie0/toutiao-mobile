(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b7941a0c"],{"7d00":function(t,a,n){},9639:function(t,a,n){"use strict";n.r(a);var s=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"my-container"},[t.$store.state.user?n("div",{staticClass:"user-info-wrap"},[n("div",{staticClass:"base-info-wrap"},[n("div",{staticClass:"avatar-title-wrap",on:{click:function(a){return t.$router.push("/user/"+t.user.id)}}},[n("van-image",{staticClass:"avatar",attrs:{round:"",fit:"cover",src:"https://img.yzcdn.cn/vant/cat.jpeg"}}),n("div",{staticClass:"title"},[t._v("黑马程序员")])],1),n("van-button",{attrs:{round:"",size:"mini"},on:{click:function(a){return t.$router.push("/user/profile")}}},[t._v("编辑资料")])],1),n("van-grid",{staticClass:"data-info",attrs:{border:!1}},[n("van-grid-item",[n("span",{staticClass:"count"},[t._v("123")]),n("span",{staticClass:"text"},[t._v("头条")])]),n("van-grid-item",[n("span",{staticClass:"count"},[t._v("123")]),n("span",{staticClass:"text"},[t._v("关注")])]),n("van-grid-item",[n("span",{staticClass:"count"},[t._v("123")]),n("span",{staticClass:"text"},[t._v("粉丝")])]),n("van-grid-item",[n("span",{staticClass:"count"},[t._v("123")]),n("span",{staticClass:"text"},[t._v("获赞")])])],1)],1):n("div",{staticClass:"not-login",on:{click:function(a){return t.$router.push("/login")}}},[n("div",{staticClass:"mobile"}),n("div",{staticClass:"text"},[t._v("点击登录")])]),n("van-grid",{attrs:{clickable:"","column-num":3}},[n("van-grid-item",{attrs:{text:"我的收藏"}},[n("van-icon",{attrs:{slot:"icon",name:"star-o",color:"#eb5253"},slot:"icon"})],1),n("van-grid-item",{attrs:{text:"浏览历史"}},[n("van-icon",{attrs:{slot:"icon",name:"browsing-history-o",color:"#ffa023"},slot:"icon"})],1),n("van-grid-item",{attrs:{text:"作品"}},[n("van-icon",{attrs:{slot:"icon",name:"edit",color:"#678eff"},slot:"icon"})],1)],1),n("van-cell-group",{attrs:{border:!1}},[n("van-cell",{attrs:{title:"消息通知","is-link":""}}),n("van-cell",{attrs:{title:"小智同学","is-link":""},on:{click:function(a){return t.$router.push("/user/chat")}}})],1),t.$store.state.user?n("van-cell-group",{on:{click:t.onLogout}},[n("van-cell",{staticStyle:{"text-align":"center"},attrs:{title:"退出登录",clickable:""}})],1):t._e()],1)},e=[],r=(n("96cf"),n("1da1")),i=n("c24f"),c={name:"MyPage",components:{},props:{},data:function(){return{user:{}}},computed:{},watch:{},created:function(){this.$store.state.user&&this.loadUser()},mounted:function(){},methods:{onLogout:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(1),t.next=3,this.$dialog.confirm({title:"退出提示",message:"您确认退出吗"});case 3:this.$store.commit("setUser",null);case 4:case"end":return t.stop()}}),t,this)})));function a(){return t.apply(this,arguments)}return a}(),loadUser:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(i["e"])();case 3:a=t.sent,n=a.data,this.user=n.data,t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0),this.$toast("获取数据有错");case 12:case"end":return t.stop()}}),t,this,[[0,8]])})));function a(){return t.apply(this,arguments)}return a}()}},o=c,l=(n("a6d6"),n("2877")),u=Object(l["a"])(o,s,e,!1,null,"4b7d28bb",null);a["default"]=u.exports},a6d6:function(t,a,n){"use strict";var s=n("7d00"),e=n.n(s);e.a}}]);
//# sourceMappingURL=chunk-b7941a0c.ade9410a.js.map