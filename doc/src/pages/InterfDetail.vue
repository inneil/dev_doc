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
    .layout-ceiling{
        background: #337ab7;
        padding:10px 30px;  
        color: #ffffff;   
        display:flex;
        justify-content: space-between;
    }
    .ceilingtext{
        font-size:150%;        
    }
    .content{
        font-size:100%; 
        padding:10px 30px;  
    }
    .content-top{
        display:flex;
        justify-content: space-between;
    }
    .disp_url{
        display:flex;
        border-bottom: 1px solid #d7dde4;
    }
    ._1{ 
          background: #337ab7;
          color:#ffffff;
          padding:5px 8px;
          flex-grow: 0;
          }
    ._2{  
          background: #fff;
          padding:5px 8px;
          flex-grow: 1;
          }
    ._3{
    background: #d7dde4;
    padding:5px 8px;
    flex-grow:0;
    }
</style>
<template>
    <div class="layout">
        <div class="layout-content">
            <div class="layout-ceiling">
              <div class="ceilingtext" v-text="docurl"></div>
              <div class="ceilingtext" v-text="docdesp"></div>
            </div>

          <div class="content">
               <div class="content-top">
                  <div style="font-size:120%">Method:<span style="color:#337ab7" v-text="method"></span></div>
                  <div style="font-size:120%">Parameters-Type:<span style="color:#337ab7" v-text="paraType"></span></div>
               </div>

                <!-- 类型为json，显示模块 -->
               <div style="margin:10px 0; display:flex" v-if="type_json"> 
               <div style="width:50%"><Table :columns="interf.columns_json" :data="interf.data"></Table></div>
                 <textarea v-model="json_text" style="background: #f8f8f9;padding:10px;border:1px solid #dddee1;margin-left: 10px;width:50%"></textarea>
               </div>

                <!-- 类型为x-www-from-urlencoded，显示模块 -->
               <Table :columns="interf.columns" :data="interf.data" style="margin:10px 0" v-if="type_coded"></Table>

                <!-- 类型为form-data，显示模块 -->
               <Table :columns="interf.form_columns" :data="interf.data" style="margin:10px 0" v-if="type_form"></Table>

               <div style="color:#337ab7;margin:5px 0;">response_code:</div>
               
                 <Table :columns="interf.columns1" :data="interf.data1"></Table><br/><br/>
                 <Table :columns="interf.columns2" :data="interf.data2"></Table><br/>
            <Button type="primary" @click="text_response">Try it out</Button>

            <div style="background: #f5f7f9;border:1px solid #C1C1C1;margin:10px 0"> 
            <div class="disp_url">
            <div class="_1">url</div>
            <div class="_2" v-text="url"> </div>
            <div class="_3" v-text="response_status"></div>
            </div>

           <pre v-text="text_response_display" v-highlight style="padding: 0 10px"></pre>

            </div>
          </div> 
        </div>
       
    </div>
</template>

<script>
    export default {
     data () {
       return { 
               type_coded: false, 
               type_json: false,
               type_form: false,
               text_response_display: '',
               json_text: '',
               response_status: 'status',
               url: '',
               method: '',
               paraType: '',
               docurl: '',
               docdesp: '',
               interf: { 
                data: [],
                data1: [],  
                data2: [],
                columns: [
                    {
                        title: 'key',
                        key: 'key'
                    },
                    {
                        title: 'type',
                        key: 'type'
                    },
                    {
                        title: 'value',
                        render: (h, params) => {
                          return h('input', {
                              attrs: {
                                id: params.row.key
                              },
                              on: {
                                blur: ()=> {
                                  this.interf.data[params.index].value = document.getElementById(params.row.key).value
                                  // console.log(this.interf.data)                                  
                                }
                              }
                          })
                        }
                    },
                    {
                        title: 'description',
                        key: 'description'
                    }
                   ],

                columns1: [
                    {
                        title: 'response_code',
                        key: 'code'
                    },
                    {
                        title: 'description',
                        key: 'description'
                    }
                ],
                
                columns2: [
                    {
                        title: 'key',
                        key: 'key'
                    },
                    {
                        title: 'description',
                        key: 'type'
                    },
                    {
                        title: 'description',
                        key: 'description'
                    }
                   ],
                form_columns: [
                    {
                        title: 'key',
                        key: 'key'
                    },
                    {
                        title: 'type',
                        key: 'type',
                    },
                    {
                      
                        title: 'value',
                        render: (h, params) => {
                           if(params.row.type == 'File')
                             return h('input', {
                              attrs: {
                                id: params.row.key,
                                type: 'file'
                                // multiple: 'multiple'
                              },
                              on: {
                                blur: ()=> {
                                  this.interf.data[params.index].value = document.getElementById(params.row.key).files[0]
                                  // console.log(document.getElementById(params.row.key).files[0])
                                }
                              }
                            })
                          else
                             return h('input', {
                                attrs: {
                                  id: params.row.key 
                                },
                                on: {
                                   blur: ()=> {
                                  this.interf.data[params.index].value = document.getElementById(params.row.key).value
                                  // console.log(this.interf.data)                                  
                                }
                                }
                            })
                          }
                    },
                    {
                        title: 'description',
                        key: 'description'
                    }
                   ],
                   columns_json: [
                    {
                        title: 'key',
                        // width: 120,
                        key: 'key'
                    },
                    {
                        title: 'type',
                        // width: 130,
                        key: 'type'
                    },
                    {
                        title: 'description',
                        width: '50%',
                        key: 'description'
                    }
                   ]
                  }
            }
        },
    mounted() {   
        this.getInterfaceDetail(this.$route.params.id)
    },
    methods: {
        getInterfaceDetail(id) {
            this.service.getInterfaceDetail(id).then((response) => {
                if (response.response_code == '00') {
                   this.docurl = response.content.uri;
                   this.docdesp = response.content.description;
                   this.paraType = response.content.request.type;
                   this.method = response.content.request.method;
                   this.interf.data = response.content.request.parameters;
                   this.interf.data1 = response.content.response.codes;
                   this.interf.data2 = response.content.response.parameters;
                   this.host = response.content.host;
                   this.url = response.content.host + response.content.uri+"?";

                   //  判断显示
                   let pattern = /x-www-from-urlencoded/;
                   let form = /form/i;
                   if(pattern.test(this.paraType))
                     {                     
                      this.type_coded = true;
                   }
                   else if(form.test(this.paraType)||this.paraType == 'binary')
                     {
                      this.type_form = true;
                   }
                   else if(this.paraType == "application/json")
                     {
                      this.type_json = true;
                   }
                   else ;
                   
                   // console.log(response)

                  } 

                else {
                    this.$Message.error(response.message)
                }
              })
          },

        text_response(){
              let pattern = /x-www-from-urlencoded/;
              let form = /form/i;
              if(pattern.test(this.paraType))
              { 
                  if(this.docurl == "/doc/detail/{id}"){ 
                    this.paramid = this.interf.data[0].value;  
                    this.url = this.host + "/doc/detail/" + this.paramid + "?";
                    this.service.getInterfaceDetail(this.paramid).then((response) => {
                     if (response.response_code == '00') {
                       this.text_response_display = response; 
                       this.response_status = 200;
                    } else {
                       this.text_response_display = response;
                       if(response.response_code.length > 3)
                           this.response_status = 200
                        else this.response_status = response.response_code;
                    }
                   })       
                  }
                 else
                  {
                   this._parameters = [];
                   this.interf.data.forEach((i)=> {
                   this._parameters.push(i.key + '=' + i.value)
                   });

                   this.posturl = this.docurl+"?"+ this._parameters.join('&');
                   // console.log(this.posturl)
                   if(this.method == 'GET')
                    this.service.getURL(this.posturl).then((response) => {
                    if (response.response_code == '00') {
                       this.text_response_display = response; 
                       this.response_status = 200;
                    } else {
                       this.text_response_display = response;
                       if(response.response_code.length > 3)
                           this.response_status = 200
                        else this.response_status = response.response_code;

                    }
                   })
                   else 
                    this.service.postURL(this.posturl).then((response) => {        
                    if (response.response_code == '00') {
                       this.text_response_display = response; 
                       this.response_status = 200;
                    } else {
                       this.text_response_display = response;
                       if(response.response_code.length > 3)
                           this.response_status = 200
                        else this.response_status = response.response_code;
                    }
                  })
                }
               }

            else if(form.test(this.paraType))
            {
              this.posturl = this.docurl+"?";
              var data = new FormData()
                   this.interf.data.forEach((i)=> {
                   data.append(i.key,i.value)
                   });
              // console.log(data)   
              this.service.postForm(this.posturl,data).then((response) => {
              if (response.response_code == '00') {
                       this.text_response_display = response; 
                       this.response_status = 200;
                    } else {
                       this.text_response_display = response;
                       this.response_status = response.status;
                    }
            })
           }
           else if(this.paraType == "application/json")
           {
             this.posturl = this.docurl+"?";    
             let data_ = this.json_text;
             // console.log(typeof data_)
             // console.log(data_)
             this.service.postJson(this.posturl,data_).then((response) => {
             if (response.response_code == '00') {
                       this.text_response_display = response; 
                       this.response_status = 200;
                    } else {
                       this.text_response_display = response;
                       if(response.status)
                        this.response_status = response.status
                       else{
                            if(response.response_code.length > 3)
                               this.response_status = 200
                            else this.response_status = response.response_code;
                       }
                    }
             })
            }

           else          
            {
              this.posturl = this.docurl+"?";
              this.service.getURL(this.posturl).then((response) => {
                 if (response.response_code == '00') {
                       this.text_response_display = response; 
                       this.response_status = 200;
                    } else {
                       this.text_response_display = response;
                        if(response.response_code.length > 3)
                           this.response_status = 200
                        else this.response_status = response.response_code;
                    }         
              })
         }
      }
     }
  } 
</script>