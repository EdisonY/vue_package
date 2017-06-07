<template>
  <div id="app">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane name="first">
            <span slot="label">web<i class="el-icon-circle-check"></i></span>
        </el-tab-pane>
        <el-tab-pane name="second">
            <span slot="label">Facebook<i class="el-icon-circle-check"></i></span>
        </el-tab-pane>
        <el-tab-pane name="third">
            <span slot="label">Google<i class="el-icon-circle-check"></i></span>
        </el-tab-pane>
        <el-tab-pane name="fourth">
            <span slot="label">IOS<i class="el-icon-circle-check"></i></span>
        </el-tab-pane>
        <el-tab-pane name="fives">
            <span slot="label">Android<i class="el-icon-circle-check"></i></span>
        </el-tab-pane>
        <el-tab-pane name="six">
            <span slot="label">Steam<i class="el-icon-circle-check"></i></span>
        </el-tab-pane>
      </el-tabs>
     <h3 class="tc_title">手游-装甲突袭-全球包</h3>
     <div class="tc_right_btn">
         <strong>{{ $t('pay_switch') }}</strong>
         <el-switch v-model="pay_switch" on-color="#13ce66" off-color="#ff4949"></el-switch>
         <a href="javascript:void(0)" class="ivu-icon ivu-icon-eye"></a>
     </div>
     <div class="tc_setting pack_setting tc_setting_done">
         <i class="num_setting">1</i>
         <h3 class="tc_setting_title">套餐、道具配置</h3>
         <div class="copy_pack">
             <span>复制套餐：</span>
             <a class="el-button el-button--info el-button--small">FB</a>
             <a class="el-button el-button--info el-button--small">Google</a>
             <a class="el-button el-button--info el-button--small">IOS</a>
             <a class="el-button el-button--info el-button--small">Steam</a>
         </div>
         <div class="clear"></div>
         <div class="proportion_pack_tc">
             <span>传递比例：</span>
             <span class="red">1USD=300 游戏币</span>
             <span class="dj_proportion">定价比例：</span>
             1
             <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
             </el-select>
             =
             <el-input v-model="input" placeholder="游戏币数量"></el-input>
             <el-input v-model="input1" placeholder="游戏币名称"></el-input>
         </div>
         <el-tabs>
          <el-tab-pane label="套餐配置">
              <div class="ivu-table-wrapper">
              <div class="ivu-table ivu-table-border">
                  <div class="ivu-table-header">
                      <table>
                          <tr>
                              <th>{{ $t('pay_switch') }}</th>
                              <th>{{ $t('pay_switch') }}</th>
                              <th>{{ $t('pay_switch') }}</th>
                              <th>{{ $t('pay_switch') }}</th>
                              <th>
                                  钻石logo
                                  <Tooltip content="这里是提示文字">
                                        <Icon type="help-circled"></Icon>
                                  </Tooltip>
                              </th>
                              <th>操作</th>
                          </tr>
                      </table>
                  </div>
                  <div class="ivu-table-body">
                      <table>
                          <tr class="ivu-table-row">
                              <td @dblclick="chang_table($event)" value="1">1</td>
                              <td>2</td>
                              <td>3</td>
                              <td>4</td>
                              <td>
                                  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"><Button type="ghost" icon="images"></Button></el-upload>
                              </td>
                              <td>
                                  <Icon type="trash-a"></Icon>
                                  <Icon type="ios-copy"></Icon>
                                  <Icon type="plus-round"></Icon>
                              </td>
                          </tr>
                      </table>
                  </div>
              </div>
              </div>
          </el-tab-pane>
          <el-tab-pane label="道具配置">
              <div class="ivu-table-wrapper">
              <div class="ivu-table ivu-table-border">
                  <div class="ivu-table-header">
                      <table>
                          <tr>
                              <th>{{ $t('pay_switch') }}</th>
                              <th>{{ $t('pay_switch') }}</th>
                              <th>{{ $t('pay_switch') }}</th>
                              <th>{{ $t('pay_switch') }}</th>
                              <th>
                                  钻石logo
                                  <Tooltip content="这里是提示文字">
                                        <Icon type="help-circled"></Icon>
                                  </Tooltip>
                              </th>
                              <th>操作</th>
                          </tr>
                      </table>
                  </div>
                  <div class="ivu-table-body">
                      <table>
                          <tr class="ivu-table-row">
                              <td @dblclick="chang_table($event)" value="1">11</td>
                              <td>22</td>
                              <td>33</td>
                              <td>44</td>
                              <td>
                                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                                    <Button type="ghost" icon="image"></Button>
                                  </Upload>
                              </td>
                              <td>
                                  <Icon type="trash-a"></Icon>
                                  <Icon type="ios-copy"></Icon>
                                  <Icon type="plus-round"></Icon>
                              </td>
                          </tr>
                      </table>
                  </div>
              </div>
              </div>
          </el-tab-pane>
        </el-tabs>
        <div class="table_bottom">
            套餐在支付页面的显示顺序：<Icon type="arrow-up-c"></Icon><Icon type="arrow-down-c"></Icon>
            <Button type="primary">确认提交</Button>
        </div>
     </div>
     <div class="tc_setting country_setting">
         <i class="num_setting">2</i>
         <h3 class="tc_setting_title">国家配置</h3>
         <div class="already_chose">
             <b>已选国家：</b>
             <Tag v-if="show" closable @on-close="handleClose">国家一</Tag>
             <Tag v-if="show" closable @on-close="handleClose">国家二</Tag>
             <a class="el-button el-button--info el-button--small">西语地区</a>
         </div>
         <div class="search_country">
             <el-input v-model="input2" placeholder="请输入内容"></el-input>
             <div class="country_list">
                 <ul>
                     <li class="clearfix">
                         <span>亚洲</span>
                         <div class="country_list_main">
                             <Button>Default</Button>
                             <Button>Default</Button>
                         </div>
                     </li>
                     <li class="clearfix">
                         <span>北美洲</span>
                         <div class="country_list_main">
                             <Button>Default</Button>
                             <Button>Default</Button>
                         </div>
                     </li>
                     <li class="clearfix">
                         <span>亚洲</span>
                         <div class="country_list_main">
                             <Button>Default</Button>
                             <Button>Default</Button>
                         </div>
                     </li>
                     <li class="clearfix">
                         <span>北美洲</span>
                         <div class="country_list_main">
                             <Button>Default</Button>
                             <Button>Default</Button>
                         </div>
                     </li>
                 </ul>
             </div>
         </div>
         <div class="channel_chose">
            <b>渠道选择：</b>
            <el-tabs>
                <el-tab-pane label="美国">
                    <Div class="channel_list_main">
                    <ul>
                        <li class="clearfix">
                            <span>手机钱包:</span>
                            <div class="channel_list">
                                <Button>Default</Button>
                                <Button>Default</Button>
                            </div>
                        </li>
                        <li class="clearfix">
                            <span>手机支付:</span>
                            <div class="channel_list">
                                <Button>Default</Button>
                                <Button>Default</Button>
                            </div>
                        </li>
                        <li class="clearfix">
                            <span>手机钱包:</span>
                            <div class="channel_list">
                                <Button>Default</Button>
                                <Button>Default</Button>
                            </div>
                        </li>
                        <li class="clearfix">
                            <span>手机支付:</span>
                            <div class="channel_list">
                                <Button>Default</Button>
                                <Button>Default</Button>
                            </div>
                        </li>
                    </ul>
                    </Div>
                </el-tab-pane>
                <el-tab-pane label="俄罗斯"></el-tab-pane>
            </el-tabs>
         </div>
         <div class="stencil_chose">
             <b>相应模版：</b>
             <Radio-group v-model="phone">
             <ul class="clearfix">
                 <li>
                     <label>
                         <img src="https://www.baidu.com/img/gaokao_index_1f1d5fb43b95ca4ab0061ba43b887c22.png" />
                         <Radio label="apple">火影忍者</Radio>
                     </label>
                 </li>
                 <li>
                     <label>
                         <img src="https://www.baidu.com/img/gaokao_index_1f1d5fb43b95ca4ab0061ba43b887c22.png" />
                         <Radio label="apple1">火影忍者</Radio>
                     </label>
                 </li>
                 <li>
                     <label>
                         <img src="https://www.baidu.com/img/gaokao_index_1f1d5fb43b95ca4ab0061ba43b887c22.png" />
                         <Radio label="apple2">火影忍者</Radio>
                     </label>
                 </li>
             </ul>
             </Radio-group>

         </div>
         <p class="clearfix">
             <Button type="primary">确认提交</Button>
         </p>
     </div>
     <div class="tc_setting channel_setting">
         <i class="num_setting">3</i>
         <h3 class="tc_setting_title">渠道配置</h3>
         <div class="channel_main">
             <div class="channel_search">
                 国家：
                 <el-select v-model="country_select" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                 </el-select>
                 启用状态：
                 <el-select v-model="country_select" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                 </el-select>
                 渠道选择：
                 <el-select v-model="country_select" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                 </el-select>
                 渠道分类：
                 <el-select v-model="country_select" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                 </el-select>
                 <Button type="info">查询配置</Button>
             </div>
             <div class="ivu-table-wrapper">
             <div class="ivu-table ivu-table-border">
                 <div class="ivu-table-header">
                     <table>
                         <tr>
                             <th><Checkbox>全选</Checkbox></th>
                             <th>渠道名称</th>
                             <th>渠道分类</th>
                             <th>
                                 支付前台显示名称
                                 <Tooltip content="这里是提示文字">
                                       <Icon type="help-circled"></Icon>
                                 </Tooltip>
                             </th>
                             <th>国家地区</th>
                             <th>启用状态</th>
                             <th>推荐状态</th>
                         </tr>
                     </table>
                 </div>
                 <div class="ivu-table-body">
                     <table>
                         <tr class="ivu-table-row">
                             <td><Checkbox label=""></Checkbox></td>
                             <td></td>
                             <td></td>
                             <td><Icon type="edit"></Icon></td>
                             <td></td>
                             <td><i-switch v-model="switch1" @on-change="change"></i-switch></td>
                             <td><Icon type="android-star"></Icon></td>
                         </tr>
                         <tr>
                             <td colspan="7">
                                 <Div class="more_info ivu-table-wrapper">
                                     <table>
                                         <tr>
                                             <th>套餐名称</th>
                                             <th>套餐描述</th>
                                             <th>游戏币</th>
                                             <th>定价货币</th>
                                             <th>定价价格</th>
                                             <th>显示货币</th>
                                             <th>显示价格</th>
                                             <th>支付货币</th>
                                             <th>支付价格</th>
                                             <th>传递货币</th>
                                             <th>传递价格</th>
                                             <th>运营商</th>
                                             <th>product_id</th>
                                             <th>奖励钻石</th>
                                             <th style="width:200px;">操作</th>
                                         </tr>
                                         <tr>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>
                                                 <Icon type="edit"></Icon>
                                                 <Icon type="trash-a"></Icon>
                                                 <i-switch v-model="switch1" @on-change="change"></i-switch>
                                                 <Icon type="android-star"></Icon>
                                                 <Icon type="plus-round"></Icon>
                                             </td>
                                         </tr>
                                         <tr>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>
                                                 <Icon type="android-list"></Icon>
                                                 <Icon type="close-round"></Icon>
                                             </td>
                                         </tr>
                                     </table>
                                 </Div>
                                 <Div class="more_info ivu-table-wrapper">
                                     <table>
                                         <tr>
                                             <th>道具类型</th>
                                             <th>道具名称</th>
                                             <th>道具名称（外文)</th>
                                             <th>道具图片</th>
                                             <th>道具描述</th>
                                             <th>奖励道具图片</th>
                                             <th>游戏币</th>
                                             <th>定价货币</th>
                                             <th>定价价格</th>
                                             <th>显示货币</th>
                                             <th>显示价格</th>
                                             <th>支付货币</th>
                                             <th>支付价格</th>
                                             <th>传递货币</th>
                                             <th>传递价格</th>
                                             <th>运营商</th>
                                             <th>product_id</th>
                                             <th>奖励钻石</th>
                                             <th style="width:200px;">操作</th>
                                         </tr>
                                         <tr>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>
                                                 <Icon type="edit"></Icon>
                                                 <Icon type="trash-a"></Icon>
                                                 <i-switch v-model="switch1" @on-change="change"></i-switch>
                                                 <Icon type="plus-round"></Icon>
                                             </td>
                                         </tr>
                                         <tr>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>
                                                 <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"><Button type="ghost" icon="images"></Button></el-upload>
                                             </td>
                                             <td>800</td>
                                             <td>
                                                 <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"><Button type="ghost" icon="images"></Button></el-upload>
                                             </td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>USD</td>
                                             <td>800</td>
                                             <td>800</td>
                                             <td>USD</td>
                                             <td>
                                                 <Icon type="android-list"></Icon>
                                                 <Icon type="close-round"></Icon>
                                             </td>
                                         </tr>
                                     </table>
                                 </Div>
                             </td>
                         </tr>
                         <tr class="ivu-table-row">
                             <td><Checkbox label=""></Checkbox></td>
                             <td></td>
                             <td></td>
                             <td><Icon type="edit"></Icon></td>
                             <td></td>
                             <td><i-switch v-model="switch1" @on-change="change"></i-switch></td>
                             <td><Icon type="android-star"></Icon></td>
                         </tr>
                         <tr class="ivu-table-row">
                             <td><Checkbox label=""></Checkbox></td>
                             <td></td>
                             <td></td>
                             <td><Icon type="edit"></Icon></td>
                             <td></td>
                             <td><i-switch v-model="switch1" @on-change="change"></i-switch></td>
                             <td><Icon type="android-star"></Icon></td>
                         </tr>
                     </table>
                 </div>
             </div>
             </div>
             <p>
                 <Button type="info">开关批处理</Button>
                 <Button type="warning">排序</Button>
                 /
                 <Icon type="android-list"></Icon>
                 <Icon type="close-round"></Icon>
             </p>
         </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
      return {
          show:true,
          pay_switch:true,
          input:'',
          input1:'',
          input2:'',
          single:'',
          phone: 'apple',
          value: true,
          country_select:true,
          activeName2: 'first',
          activeNames:['1'],
          switch1:true,
          fileList:[],
          options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
          }]
      }
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab.name);
      },
      chang_table(e){
         console.log(e)
      },
      handleClose () {
         this.show = false;
     },
     change (status) {
        this.$Message.info('您选择' + status);
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
  }
}
</script>

<style>

@import "style/reset.css";
@import "style/main.css";

</style>
