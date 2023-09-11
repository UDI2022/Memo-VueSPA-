<template>
    <div>
        <!--v-for
            MemoForm.vueから渡されたメモ一覧を並べて表示-->
        <div v-for="item in items.memos" :key="item.id">
            <span>{{ item.text }}</span>
            <button @click="emitDelete(item.id)">削除</button>
        </div>
    </div>
</template>

<style>
div {
    white-space:pre;
}
</style>

<script>
/**
 * MemoForm.vue内でMemoList.vueコンポーネントを表示、データを渡している
 * ->MemoForm.vueが親でMemoListが子
 * ->親からpropsで渡されたデータは子側で直接操作できない
 * ->操作したい場合は、$emitを使う
 */
export default {
    props: {
        items: {
            type: Object,
            required: false
        }
    },
    methods: {
        emitDelete(memoId){
            this.$emit("delete", memoId);
        }
    }
};
</script>