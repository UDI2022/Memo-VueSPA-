/**
 * axiosをインストール->インポート
 */
import axios from 'axios';

/**
 * state
 *  管理されているデータの状態
 *  ->初期値はnull,ログインされたユーザー名を設定して管理
 */

const state = {
    name: null
};

/**
 * getters
 *  stateの値を取り出すためのゲッター
 * ・state.nameに値が入っている->名前を取得
 * ・state.nameに値が入っていない->空文字を返す
 */
const getters = {
    name: state => (state.name ? state.name : "")
};

/**
 * ※stateは直接値を代入できない
 * 値を設定するには、mutationsとactionsを使って間接的に設定する
 */
/**
 * mutations
 * ->stateを同期処理でstateを更新するために使用
 * state.nameに値をセットするためのsetNameを定義
 *  第一関数:state, 第二関数:セットする値(name)
 */
const mutations = {
    setName(state, name) {
        state.name = name;
    }
};

/**
 * actinos
 *  ->非同期処理を行える
 * 同期処理で関数を定義↓
 *
*/

const actions = {
    login(context, name) {
        context.commit("setName", name);
    }
};

/**
 * actions
 *  ->非同期処理を行える
 * 非同期処理を行う場合↓
const actions = {
    async login(contect, formData) {
        const response = axios.post("/api/login", formData);
        context.commit("setName", response.data);
    }
};
*/

/**
 * user.jsで定義したVuexの4つのオブジェクトをコンポーネントで使うために
 * state,getters,mutations,actionsを1つのオジェクトにまとめてエクスポートする
 * ->使うjsでインポートする必要がある
 */
export default {
    state,
    getters,
    mutations,
    actions
};