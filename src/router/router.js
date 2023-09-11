import { createRouter, createWebHistory } from "vue-router";
import Top from "../components/Top.vue";
import MemoForm from "../components/MemoForm.vue";
/*Vuex-storeの有効化 */
import store from "../store"

const routes = [
    /**
     * path->URLのpass
     * component->指定したpathにアクセスされたときに表示するVueコンポーネント
     *              ※事前にimport文でインポートしておく必要がある。
     */
    {
        path: "/",
        component: Top
    },
    {
        path: "/memo",
        component: MemoForm,
        /**
         * beforeEnter:ナビゲーションガード関数、特定のルートへの移動的に実行される
         * @param {Object} to:移動先のルートオブジェクト 
         * @param {Object} from :移動元のうーとオブジェクト
         * @param {Function} next ：ナビゲーションを続行または中止するための関数。
         *                      ->ルートＵＲＬにアクセス
         * ->storeで管理しているユーザー情報の名前が空の場合にトップページへ戻す処理
         */
        beforeEnter(to, from, next) {
            if (store.getters["name"] === ""){
                next("/");
            } else {
                next();
            }
        }
    }
];

/**
 * mode: "history"を描くことで本来のURLの形でルーティンが行われる
 * ->この部分を省くと、/#/,/memo#/のようにハッシュがパスに含まれる
 */
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;