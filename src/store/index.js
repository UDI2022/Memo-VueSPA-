/**
 * user.jsでエクスポートしたオブジェクトをindex.jsでインポート
 */
import { createApp } from 'vue';
import { createStore } from "vuex";

import user from "./user";

/**
 * Vuexの使用を宣言し、インスタンスを作成
 * ->getters,state,mutations,actions
 * storeに格納
 * ->main.jsに渡して使用
 */

const store = createStore({
    modules: {
        user
    }
})

export default store;