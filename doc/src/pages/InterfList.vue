<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    .layout-content{
        min-height: 200px;
        margin: 50px auto;
        background: #fff;
        border-radius: 4px;
        width: 80%;
    }

    .content{
        font-size:100%; 
        padding:10px 30px;  
    }
    .content-top{
     margin:15px 0 20px;
     color: #337ab7;
 }

 

</style>
<template>
    <div class="layout">

      <div class="layout-content">
         
        <div class="content">
          
          <div class="search-table">
              <h2 class="content-top"> 企业接口文档系统 </h2>

              <c-table :datas="interface.datas" :columns="interface.columns" :query="interface.query"></c-table>
          </div>

      </div>
      
      
  </div>
  
</div>
</template>
<script>
    import cTable from "../components/table";
    export default { 
        name: 'done',
        components: {
            cTable
        },
        data() {
            return {
                interface: {
                    query: '',
                    datas: [],
                    columns: [{
                        title: '编号',
                        width: 80,
                        key: 'id'
                    }, {
                        title: '接口名称',
                        width: 180,
                        key: 'description'
                    }, {
                        title: '接口路径',
                        width: 180,
                        key: 'uri'
                    }, {
                        title: '操作',
                        width: 100,
                        render: (h, params) => {
                            return h('span', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            window.open(`#/interfdetail/${params.row.id}`)
                                        }
                                    }
                                }, '查看')
                                ])
                        }
                    }]
                }
            }
        },
        mounted() {
            this.getInterfaceList()
        },
        methods: {
            getInterfaceList() {
                this.service.getInterfaceList().then((response) => {
                    if (response.response_code == '00') {
                        this.interface.datas = response.content
                    } else {
                        this.$Message.error(response.response_msg)
                    }
                })
            }
        }
    }
</script>
