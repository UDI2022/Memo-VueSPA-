<template>
    <div>
        <h5>ようこそ、{{ name }}さん</h5>
        <form @submit.prevent="postMemo">
            <div>
                <!--v-modal
                    コンポーネントが持つデータとフォームをマッピング
                    テキストエリアとmemo.textをマッピング-->
                <textarea id="memo" cols="30" raws="10" v-model="memo.text"></textarea>
            </div>
                <!--v-if
                    invalid=trueの時、「メモを入力してください」を表示する
                    -->
                <span v-if="error.inValid">メモを入力してください</span>
            <div>
                <button type="submit">メモる</button>
            </div>
        </form>
        <!--インポートしたMemoListというコンポーネントにdata()のmemoListとdeleteMemoを渡す-->
        <!--
            １．子コンポーネントのボタンがクリックされる
            ２．子コンポーネントは'delete'イベントを発火
            ３．親コンポーネントはその'delete'イベントをキャッチして、'deleteMemo'メソッドを実行
        -->
        <MemoList :items="this.memoList" @delete="deleteMemo"/>
        <RouterLink to="/">トップに戻る</RouterLink>
    </div>
</template>

<script>
import MemoList from "./MemoList.vue";
export default {
    components: {
        MemoList
    },
    /**
     * computed:算出プロパティ
     *  ->計算や加工を行った値を返す
     */
    computed: {
        name() {
            return this.$store.getters["name"];
        }
    },
    /**
     * 各コンポーネントは固有のデータを持つ
     * memo
     *  id:メモを識別する
     *  text:パラメータ
     *  error:メモが何も入力されずに送られたらtrue
     * memoList:今まで入力されたメモの一覧が配列
     */
    data() {
        return {
            memo: {
                id: null,
                text: ""
            },
            error: {
                inValid: false
            },
            memoList: {
                memos: []
            }
        };
    },
    /**
     * コンポーネントがマウントされた直後にローカルストレージに保存しているメモ一覧を取得してdata().memoListに代入
     * $nextTikck:画面全体が読み込まれた後で処理を実行するためのメソッド
     */
    mounted: function() {
        this.$nextTick(() => {
            const memosFromStorage = JSON.parse(localStorage.getItem(this.name));

            // 存在チェックと初期値の確認
            if (this.memoList && memosFromStorage) {
                this.memoList.memos = memosFromStorage;
            }
        });
    },
    methods: {
        /**
         * postMemo()
         * text === "" の場合、invalid=true
         * を格納する。
         * ->template内のv-ifで使用
         */
        postMemo() {
            if(this.memo.text === "") {
                this.error.inValid = true;
                return;
            } else {
                this.error.inValid = false;
            }
            const text = this.memo.text;
            const memosLength = this.memoList.memos.length;
            this.memoList.memos.push({
                id: memosLength === 0 ? 0 : this.memoList.memos[memosLength - 1 ].id + 1,
                text: text
            });
            this.memo.text = "";
        },
        deleteMemo(memoId) {
            const afterMemos = this.memoList.memos.filter(memo => {
                return memo.id !== memoId;
            });
            this.memoList.memos = afterMemos;
        }
    },
    /**
     * watch->特定のデータの監視を行うためのメソッド
     * メモ一覧を監視するために使用
     * 新しいメモが追加される
     * ->ローカルストレージにも保存する処理（非同期）
     * deep.true
     * ->ネストされたプロパティも監視できる
     *  ※ネスト
     * data() {
            return {
                person: {
                name: 'Alice',<-ここがwatchされる
                address: {
                    city: 'Tokyo',<-ネストされていて、deep.trueでないと監視できない
                    zip: '123-4567'<-ネストされていて、deep.trueでないと監視できない
                }
                }
            };
            }
     */
    watch: {
        memoList: {
            handler(newVal) {
                localStorage.setItem(this.name, JSON.stringify(newVal.memos));
            },
            deep: true
        }
    }
};
</script>