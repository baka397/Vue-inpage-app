import Vue from 'Vue'; //载入vue
import List from './components/list.vue'; //载入hello组件

var vm = new Vue({
  el:'#render', //根节点
  render:createElement=>createElement(List)
});