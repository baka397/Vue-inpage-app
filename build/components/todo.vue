<template>
    <li>
        <a @click.prevent="onHandleComplete">
            <template v-if="!complete">{{content}}</template>
            <s v-else>{{content}}</s>
        </a>
        <a @click.prevent="onHandleDelete">删除</a>
    </li>
</template>
<script>
    module.exports = {
        props: {
            'content':{
                type: String,
                required: true
            },
            'complete':{
                type: Boolean,
                required: true
            },
            'index':{
                type: Number,
                required: true
            }
        },
        methods:{
            onHandleComplete:function(){
                var data={
                    content:this.content,
                    complete:!this.complete
                }
                this.$emit('onCompleteChange',this.index,data);
            },
            onHandleDelete:function(){
                if(confirm('是否要删除该待办事项')) this.$emit('onDelete',this.index);
            }
        }
    }
</script>