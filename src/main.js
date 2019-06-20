import Icon from './icon.jpg';
import Vue from 'vue';
import App from './App.vue';
import 'mint-ui/lib/style.css';
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

import MintUI from 'mint-ui';
Vue.use(MintUI);
import router from './router.js';
import VueResource from 'vue-resource';
Vue.use(VueResource);

import Vuex from 'vuex'
Vue.use(Vuex)
//每次进入网站，肯定调用main.js时，在刚调用的时候，先从本地存储中，把购物车的数据读出来
var car = JSON.parse(localStorage.getItem('car') || '[]' )

var store = new Vuex.Store({
	state: {//this.$store.state.***
		car: car,//将购物车中的商品的数据，用一个数组存储起来，在car数组中，存储一些商品的对象，可以暂时将这个商品对象，设计成这个样子 { id：商品id, count:要购买的数量， price: 商品的单价，selected：false//商品是否被选中  }	
	},
	mutations: { //this.$store.commit('方法的名称'，'按需传递唯一的参数')
		
		addToCar(state, goodsinfo) {
			var flag = false;
			state.car.some(item => {
				if ( item.id == goodsinfo.id ) {
					item.count += parseInt(goodsinfo.count);
					flag = true;
					return true
				}
			})
			if (!flag) {
			state.car.push(goodsinfo)	
		}
			//将car数组存储到本地localStorage
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateGoodsInfo(state, goodsinfo){
			//修改购物车中商品的数量值
			//同步到store中
			state.car.some(item => {
				if (item.id == goodsinfo.id) {
					item.count = parseInt(goodsinfo.count);
					return true;
				} 
			})
			//console.log(goodsinfo);
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateGoodsSelected(state, info) {//同步商品的勾选状态
			state.car.some(item => {
				if (item.id == info.id) {
					item.selected = info.selected;
				}
			})
		localStorage.setItem('car', JSON.stringify(state.car))
		},
		removeFormCar(state, id) {
			state.car.some((item, i) => {
				if (item.id == id) {
					state.car.splice(i, 1)
					return true;
				}
			})
			localStorage.setItem('car', JSON.stringify(state.car))
		}
	},
	getters: {//this.$store.getters.***
		getAllCount(state) {
			var c = 0;
			state.car.forEach(item=> {
				c += item.count
			})
			return c
		},
		getGoodsSelected(state) {
			//创建一个数组，以商品的id为健，商品的选中状态为值
			var o = {};
			state.car.forEach(item => {
				o[item.id] = item.selected
			})
			return o
		},
		getGoodsCountAndAmount(state) {
			var o = {
				count: 0, //勾选的数量
				amount:0 //勾选的单价
			}
			state.car.forEach(item => {
				if(item.selected) {
					o.count += item.count;
					o.amount += item.price * item.count;
				}
			})
			return o;
		}
	}
})

//设置请求的根路径
Vue.http.options.root = 'http://47.89.21.179:8080';
//全局设置post时候表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;
import './rem.js';
var vm = new Vue({
	el:'#app',
	data:{
		msg:'123456'
	},
	render:c => c(App),
	router,
	store
})