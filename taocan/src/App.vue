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
         <i-switch @on-change="kaiguan" v-model="kaiguan_kg">
            <span slot="open">开</span>
            <span slot="close">关</span>
         </i-switch>
         <Tooltip content="支付页面预览">
               <span class="ivu-icon ivu-icon-eye" :class="{ no_view : view_pay_web }"></span>
         </Tooltip>
     </div>
     <div class="tc_setting pack_setting tc_setting_done">
         <i class="num_setting">1</i>
         <h3 class="tc_setting_title">套餐、道具配置</h3>
         <div class="copy_pack">
             <span>复制套餐：</span>
             <a class="el-button el-button--info el-button--small" @click="copy_pack">FB</a>
             <a class="el-button el-button--info el-button--small" @click="copy_pack">Google</a>
             <a class="el-button el-button--info el-button--small" @click="copy_pack">IOS</a>
             <a class="el-button el-button--info el-button--small" @click="copy_pack">Steam</a>
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
                              <th>游戏币</th>
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
                          <tr class="ivu-table-row" v-for="(item,index) in pack_list">
                              <td>
                                  <span v-if="pack_edit[index]">{{ item.name }}</span>
                                  <Input type="text" v-if="!pack_edit[index]" v-bind:value="item.name" v-model="item.name"></Input>
                              </td>
                              <td>
                                  <span v-if="pack_edit[index]">{{ item.description }}</span>
                                  <Input type="text" v-if="!pack_edit[index]" v-bind:value="item.description" v-model="item.description"></Input>
                              </td>
                              <td>
                                  <span v-if="pack_edit[index]">{{ item.gamecoin }}</span>
                                  <Input type="text" v-if="!pack_edit[index]" v-bind:value="item.gamecoin" v-model="item.gamecoin"></Input>
                              </td>
                              <td>
                                  <span v-if="pack_edit[index]">{{ item.priciCurrency }}</span>
                                  <Input type="text" v-if="!pack_edit[index]" v-bind:value="item.priciCurrency" v-model="item.priciCurrency"></Input>
                              </td>
                              <td>
                                  <el-upload v-if="!pack_edit[index]" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"><Button type="ghost" icon="images"></Button></el-upload>
                                  <img v-if="pack_edit[index]" v-bind:src="item.pic" />
                              </td>
                              <td>
                                  <Icon type="edit" @click.native="edit_pack(index,pack_edit)" v-if="pack_edit[index]"></Icon>
                                  <Icon type="trash-a" @click.native="del_list(index,pack_list)" v-if="pack_edit[index]"></Icon>
                                  <!--<Icon type="ios-copy" @click.native="copy_tr(index)" v-if="item.name"></Icon>-->
                                  <Icon type="plus-round" @click.native="add_tr(index,pack_list,pack_edit)" v-if="pack_edit[index]"></Icon>
                                  <Icon type="ivu-icon ivu-icon-android-list" @click.native="save_pack(index,pack_edit)" v-if="!pack_edit[index]"></Icon>
                                  <Icon type="close-round" @click.native="emp_pcak(index,pack_list)" v-if="!pack_edit[index]" ></Icon>
                              </td>
                          </tr>
                      </table>
                  </div>
              </div>
              </div>
              <div class="table_bottom">
                  套餐在支付页面的显示顺序：
                  <Tooltip content="按照游戏币的顺序（由小到大）排序" placement="top">
                      <Icon type="arrow-up-c" @click.native="sort_list(pack_list,1)"></Icon>
                  </Tooltip>
                  <Tooltip content="按照游戏币的倒序（由大到小）排序" placement="top">
                      <Icon type="arrow-down-c" @click.native="sort_list(pack_list,0)"></Icon>
                  </Tooltip>
                  <Button type="primary">确认提交</Button>
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
                          <tr class="ivu-table-row" v-for="(item,index) in props_list">
                              <td>
                                  <span v-if="props_edit[index]">{{ item.name }}</span>
                                  <Input type="text" v-if="!props_edit[index]" v-bind:value="item.name" v-model="item.name"></Input>
                              </td>
                              <td>
                                  <span v-if="props_edit[index]">{{ item.description }}</span>
                                  <Input type="text" v-if="!props_edit[index]" v-bind:value="item.description" v-model="item.description"></Input>
                              </td>
                              <td>
                                  <span v-if="props_edit[index]">{{ item.gamecoin }}</span>
                                  <Input type="text" v-if="!props_edit[index]" v-bind:value="item.gamecoin" v-model="item.gamecoin"></Input>
                              </td>
                              <td>
                                  <span v-if="props_edit[index]">{{ item.priciCurrency }}</span>
                                  <Input type="text" v-if="!props_edit[index]" v-bind:value="item.priciCurrency" v-model="item.priciCurrency"></Input>
                              </td>
                              <td>
                                  <el-upload v-if="!props_edit[index]" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"><Button type="ghost" icon="images"></Button></el-upload>
                                  <img v-if="props_edit[index]" v-bind:src="item.pic" />
                              </td>
                              <td>
                                  <Icon type="edit" @click.native="edit_pack(index)" v-if="props_edit[index]"></Icon>
                                  <Icon type="trash-a" @click.native="del_list(index)" v-if="props_edit[index]"></Icon>
                                  <Icon type="ios-copy" @click.native="copy_tr(index,props_list)" v-if="!props_edit[index]"></Icon>
                                  <Icon type="plus-round" @click.native="add_tr(index,props_list,props_edit)" v-if="!props_edit[index]"></Icon>
                                  <Icon type="ivu-icon ivu-icon-android-list" @click.native="save_pack(index)" v-if="props_edit[index]"></Icon>
                                  <Icon type="close-round" @click.native="emp_pcak(index)" v-if="props_edit[index]" ></Icon>
                              </td>
                          </tr>
                      </table>
                  </div>
              </div>
              </div>
              <div class="table_bottom">
                  套餐在支付页面的显示顺序：
                  <Tooltip content="按照游戏币的顺序（由小到大）排序" placement="top">
                      <Icon type="arrow-up-c"></Icon>
                  </Tooltip>
                  <Tooltip content="按照游戏币的倒序（由大到小）排序" placement="top">
                      <Icon type="arrow-down-c"></Icon>
                  </Tooltip>
                  <Button type="primary">确认提交</Button>
              </div>
          </el-tab-pane>
        </el-tabs>

     </div>
     <div class="tc_setting country_setting">
         <i class="num_setting">2</i>
         <h3 class="tc_setting_title">国家配置</h3>
         <div class="already_chose" >
             <b v-if="country_data_already.length > 0">已选国家：</b>
             <Tag v-for="(item,index) in country_data_already" v-if="item.name" closable @on-close="handleClose(index)">{{ item.name }}</Tag>
             <a class="el-button el-button--info el-button--small">西语地区</a>
         </div>
         <div class="search_country">
             <el-input v-model="search_country" placeholder="请输入内容"  @input="updateMessage"></el-input>
             <div class="country_list">
                 <ul>
                     <li class="clearfix" v-for="(item,index) in country_data">
                         <span>{{item.area}}</span>
                         <div class="country_list_main">
                             <Button v-for="(countrys,index_) in item.country" :class="{ get : countrys.get , chose : countrys.chose}" @click="chose_country(countrys,index,index_)">{{countrys.name}}</Button>
                         </div>
                     </li>
                 </ul>
             </div>
         </div>
         <div class="channel_chose" v-if="chose_country_data.length > 0">
            <b>渠道选择：</b>
            <el-tabs v-model="get_country_tabs">
                <el-tab-pane :label="item.name" :name="item.name" v-for="(item,index) in chose_country_data">
                    <Div class="channel_list_main">
                    <ul>
                        <li class="clearfix" v-for="(way,num) in item.payways">
                            <span>{{way.name}}:</span>
                            <div class="channel_list">
                                <Button v-for="(btn,nums) in way.channel_payways">{{btn.name}}</Button>
                            </div>
                        </li>
                    </ul>
                    </Div>
                </el-tab-pane>
            </el-tabs>
         </div>
         <div class="stencil_chose" v-if="chose_country_data.length > 0">
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
                 <div class="ivu-table-body" v-for="(item,index) in channel_set_data">
                     <table>
                         <tr class="ivu-table-row" :class="{ now_tr : item.show_detail}">
                             <td><Checkbox label=""></Checkbox></td>
                             <td @dblclick="toggle_detail(index)">渠道名称</td>
                             <td></td>
                             <td>
                                 <span v-if="!item.edit_switch">{{item.showname}}</span>
                                 <Icon type="edit" @click.native="edit_channel(index)" v-if="!item.edit_switch"></Icon>
                                 <div v-if="item.edit_switch">
                                     <Input :value="item.showname"></Input>
                                     <Icon type="checkmark-round" @click.native="save_show_name(index)"></Icon>
                                     <Icon type="close-round" @click.native="cannel_show_name(index)"></Icon>
                                 </div>
                             </td>
                             <td></td>
                             <td><i-switch v-model="switch1" @on-change="change"></i-switch></td>
                             <td><Icon type="android-star"></Icon></td>
                         </tr>
                         <tr v-if="item.show_detail">
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
     <Modal title="提示" v-model="modal" class-name="vertical-center-modal" :loading="loading" @on-ok="asyncOK" @on-cancel="cancel" ok-text="OK" cancel-text="Cancel">
        <p>确认{{alert_message}}支付页面吗?</p>
    </Modal>
    <Modal title="提示" v-model="copy_pack1" class-name="vertical-center-modal" :loading="loading" @on-ok="copy_pack_ok" @on-cancel="cancel" ok-text="OK" cancel-text="Cancel">
       <p>确认复制当前支付类型的套餐吗?</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
      return {
          view_pay_web:true,
          pack_edit:{
              0:true,
              1:true
          },
          props_edit:false,
          copy_pack1:false,
          modal:false,
          loading:true,
          kaiguan_kg:false,
          show:true,
          pay_switch:false,
          input:'',
          input1:'',
          search_country:'',
          single:'',
          phone: 'apple',
          value: true,
          country_select:true,
          activeName2: 'first',
          activeNames:['1'],
          switch1:true,
          get_country:false,
          get_channel:false,
          fileList:[],
          alert_message:'',
          get_country_tabs:'',
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
          }],
          pack_list:[{
              name: '名字',
              description:'描述',
              gamecoin:'10',
              priciCurrency:'USD',
              pic:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2812136344,465892702&fm=58'
          },{
              name: '名字1',
              description:'描述1',
              gamecoin:'11',
              priciCurrency:'USD',
              pic:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2812136344,465892702&fm=58'
          }],
          props_list:[{}],
          country_data_already:[],
          country_data:[{
              area:'亚洲',
              country:[{
                  name:'中国',
                  payways:[{
                      name:'电子钱包',
                      channel_payways:[{
                          name:'skrill'
                      },
                      {
                          name:'skrill1'
                      },
                      {
                          name:'skrill2'
                      }]
                  },
                  {
                      name:'支付宝',
                      channel_payways:[{
                          name:'skrill2'
                      },
                      {
                          name:'skrill12'
                      },
                      {
                          name:'skrill22'
                      }]
                  }]
              },
              {
                  name:'日本',
                  payways:[{
                      name:'电子钱包',
                      channel_payways:[{
                          name:'skrill3'
                      },
                      {
                          name:'skrill13'
                      },
                      {
                          name:'skrill23'
                      }]
                  }]
              }]
          },
          {
              area:'美洲',
              country:[{
                  name:'美国',
                  payways:[{
                      name:'电子钱包',
                      channel_payways:[{
                          name:'skrill4'
                      },
                      {
                          name:'skrill14'
                      },
                      {
                          name:'skrill24'
                      }]
                  }]
              },
              {
                  name:'加拿大',
                  payways:[{
                      name:'电子钱包',
                      channel_payways:[{
                          name:'skrill5'
                      },
                      {
                          name:'skrill15'
                      },
                      {
                          name:'skrill25'
                      }]
                  }]
              }]
          }],
          chose_country_data:[],
          channel_set_data:[{
              show_detail:false,
              showname:'asdasd',
              edit_switch:false
          },
          {
              show_detail:false,
              showname:'123123123',
              edit_switch:false
          },
          {
              show_detail:false,
              showname:'asdasd',
              edit_switch:false
          }]
      }
  },
  watch:{
      channel_set_data:{
          handler:(val,oldVal)=>{
              return oldVal
          },
          deep:true
      }
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab.name);
    },
    handleClose (index) {
        this.country_data_already[index].name = ''
    },
    change (status) {
        this.$Message.info('您选择' + status);
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    },
    kaiguan(status){
        this.modal = true;
        if(status){
            this.alert_message = '开启';
        }else{
            this.alert_message = '关闭';
        }
    },
    asyncOK(params){
        this.$api.get('topics', params, function(r) {
            this.modal = false;
        })
    },
    copy_pack_ok(){

    },
    cancel(){
        this.kaiguan_kg = false;
    },
    copy_pack(e){
        this.copy_pack1 = true;
    },
    del_list(index,item){
        console.log(item)
        item.splice(index,1)
    },
    copy_tr(index,data){
        console.log(data)
        var copy = this.pack_list.slice(index,index+1)
        this.pack_list.splice(index+1,0,copy[0])
    },
    add_tr(index,model,status){
        var new_list = {}
        for(var key in model[index]){
            new_list[key] = ''
        }
        model.splice(index+1,0,new_list)
        for(var key in model){
            if(model[key]){
                status[key] = true
            }else{
                status[key] = false
            }
        }
        status[index + 1] = false;

    },
    save_pack(index,model){
        this.$Message.success('保存成功！');
        model[index] = true
    },
    edit_pack(index,model){
        model[index] = false
    },
    emp_pcak(index,model){
        //console.log(JSON.stringify(model))
        console.log(model[index])
        for(var key in model[index]){
            model[index][key] = ''
        }
    },
    sort_list(model,status){
        if(status>0){

        }else{

        }
        for(var key in model){
            console.log(model[key].gamecoin)
        }
    },
    updateMessage(){
        var _this = this;
        for(var i = 0;i<_this.country_data.length;i++){
            for(var s = 0;s<_this.country_data[i].country.length;s++){
                _this.country_data[i].country[s].get = false
                if(_this.country_data[i].country[s].name.indexOf(_this.search_country) >= 0 && _this.search_country!=''){
                    _this.country_data[i].country[s].get = true
                }
            }
        }
    },
    chose_country(item,index,index_){
        this.get_country = true
        var _this = this
        for(var i=0;i<_this.chose_country_data.length;i++){
            if(item.name == _this.chose_country_data[i].name){
                _this.chose_country_data.splice(i,1)
                _this.country_data_already.splice(i,1)
                this.country_data[index].country[index_].chose = false
                if(_this.chose_country_data.length != 0){
                    _this.get_country_tabs = _this.chose_country_data[0].name
                }else{
                    _this.get_country_tabs = ''
                }
                return false;
            }
        }
        this.chose_country_data.push(item)
        this.country_data_already.push(item)
        this.get_country_tabs = item.name
        this.country_data[index].country[index_].chose = true
    },
    toggle_detail(index){
        this.channel_set_data[index].show_detail = !this.channel_set_data[index].show_detail
    },
    edit_channel(index){
        this.channel_set_data[index].edit_switch = !this.channel_set_data[index].edit_switch
    },
    save_show_name(index){
        this.channel_set_data[index].edit_switch = false
    },
    cannel_show_name(index){
        this.channel_set_data[index].edit_switch = false
    }
  }
}
</script>

<style>

@import "style/reset.css";
@import "style/main.css";

</style>
