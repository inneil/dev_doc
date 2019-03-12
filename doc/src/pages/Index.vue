<template>
    <div id="index">
        <header>
            <div class="header-img">
                <a href="../index.html"><img src="../assets/logo.png" ></a>
            </div>
            <nav class="wrap">
                <ul>
                    <li>首页</li>
                    <li>个人征信平台</li>
                    <li>企业信息查询</li>
                    <li>黑名单信息查询</li>
                    <li>征信平台</li>
                    <li>龚高洪VIP测试账号</li>
                </ul>
            </nav>
        </header>
        <router-view></router-view>
        <footer>
            沪ICP备09004260号 ©2017 上海冰鉴信息科技有限公司
        </footer>
    </div>
</template>
<script>
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    name: 'index',
    data() {
        return {
            active_tab: ''
        }
    },
    mounted() {
        this.active_tab = this.$route.path.replace('/', '')
    },
    methods: {
        stateGo(name) {
            this.$router.push(`/${name}`)
        }
    }
}
</script>
