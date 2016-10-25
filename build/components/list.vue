<template>
    <div>
        <ul>
            <todo v-for="(item, index) in list" :key="index" :index="index" :content="item.content" :complete="item.complete" @onCompleteChange="onEdit" @onDelete="onDelete"></todo>
        </ul>
        <form @submit.prevent="onFormSubmit">
            <input type="text" name="content" ref="content" placeholder="请输入待办内容" />
            <button type="submit">新增</button>
        </form>
    </div>
</template>
<script>
    import Vue from 'Vue'; //载入vue
    import Todo from './todo.vue'; //载入组件
    function getLocalstorge(){
        if(!localStorage){
            return {list:[]};
        }
        var todoList=localStorage.getItem('todoList');
        if(todoList){
            return JSON.parse(todoList);
        }else{
            return {list:[]};
        }
    }
    function setLocalstorge(data){
        if(!localStorage){
            return false;
        }
        localStorage.setItem('todoList',JSON.stringify(data));
    }
    var todoData = getLocalstorge();
    module.exports = {
        data(){
            return todoData
        },
        components:{
            Todo
        },
        methods:{
            onFormSubmit:function(){
                var $content=this.$refs.content;
                var contentValue=$content?$content.value:'';
                if(contentValue){
                    this.onAdd({
                        content:contentValue
                    });
                    setLocalstorge(todoData);
                }else{
                    alert('请输入待办内容')
                }
            },
            onAdd:function(data){
                this.list.push(Object.assign({'complete':false},data));
                this.onSave();
            },
            onEdit:function(index,data){
                Vue.set(this.list, index, Object.assign({},data));
                this.onSave();
            },
            onDelete:function(index){
                this.list.splice(index,1);
                this.onSave();
            },
            onSave:function(){
                setLocalstorge(todoData);
            }
        }
    }
</script>