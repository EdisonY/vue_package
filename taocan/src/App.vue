<template>
  <div id="app">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <div v-for="(item,index) in tab_data">
            <el-tab-pane :name="item" :label="item">
                <span slot="label">{{ item }}<i class="el-icon-circle-check"></i></span>
            </el-tab-pane>
        </div>
      </el-tabs>
     <h3 class="tc_title">手游-装甲突袭-全球包</h3>
     <div class="tc_right_btn">
         <strong>{{ $t('Hello World') }}</strong>
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
          <el-tab-pane label="套餐配置"  v-loading.body="pack_loading">
              <div class="ivu-table-wrapper">
              <div class="ivu-table ivu-table-border">
                  <div class="ivu-table-header">
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
                              <th>
                                  奖励钻石
                                  <Tooltip content="这里是提示文字">
                                        <Icon type="help-circled"></Icon>
                                  </Tooltip>
                              </th>
                              <th>
                                  钻石logo
                                  <Tooltip content="这里是提示文字">
                                        <Icon type="help-circled"></Icon>
                                  </Tooltip>
                              </th>
                              <th>
                                   奖励钻石logo
                                  <Tooltip content="这里是提示文字">
                                        <Icon type="help-circled"></Icon>
                                  </Tooltip>
                              </th>
                              <th>操作</th>
                          </tr>
                      </table>
                  </div>
                  <div class="ivu-table-body" v-for="(item,index) in pack_list">
                      <form @submit.prevent="save_pack(index,item,item.amount_id)">
                      <table>
                          <tr class="ivu-table-row">
                              <td>
                                  <span v-if="item.extra_tag">{{ item.package_name }}</span>
                                  <input v-if="!item.extra_tag" :value="item.package_name" v-model="item.package_name" required type="name" class="my_input"></input>
                              </td>
                              <td>
                                  <span v-if="item.extra_tag">{{ item.package_description }}</span>
                                  <input v-if="!item.extra_tag" :value="item.package_description" v-model="item.package_description" class="my_input" required type="name"></input>
                              </td>
                              <td>
                                  <span v-if="item.extra_tag">{{ item.virtual_goods }}</span>
                                  <input v-if="!item.extra_tag" :value="item.virtual_goods" v-model="item.virtual_goods" class="my_input" required type="number" min="0" ></input>
                              </td>
                              <td>
                                  <span v-if="item.extra_tag">{{ item.price_currency }}</span>
                                  <input v-if="!item.extra_tag" :value="item.price_currency" v-model="item.price_currency" class="my_input" required type="name"  ></input>
                              </td>
                              <td>
                                  <span v-if="item.extra_tag">{{ item.price }}</span>
                                  <input v-if="!item.extra_tag" :value="item.price" v-model="item.price" class="my_input" required type="name"  ></input>
                              </td>
                              <td>
                                  <span v-if="item.extra_tag">{{ item.show_currency }}</span>
                                  <input v-if="!item.extra_tag" :value="item.show_currency" v-model="item.show_currency" class="my_input" required type="name"  ></input>
                              </td>
                              <td>
                                  <span v-if="item.extra_tag">{{ item.show_price }}</span>
                                  <input v-if="!item.extra_tag" :value="item.show_price" v-model="item.show_price" class="my_input" required type="name"  ></input>
                              </td>
                              <td>
                                  <span v-if="item.extra_tag">{{ item.pay_currency }}</span>
                                  <input v-if="!item.extra_tag" :value="item.pay_currency" v-model="item.pay_currency" class="my_input" required type="name"  ></input>
                              </td>
                              <td>
                                  <span v-if="item.extra_tag">{{ item.pay_price }}</span>
                                  <input v-if="!item.extra_tag" :value="item.pay_price" v-model="item.pay_price" class="my_input" required type="name"  ></input>
                              </td>
                              <td>
                                  <span v-if="item.extra_tag">{{ item.transfer_currency }}</span>
                                  <input v-if="!item.extra_tag" :value="item.transfer_currency" v-model="item.transfer_currency" class="my_input" required type="name"  ></input>
                              </td>
                              <td>
                                  <span v-if="item.extra_tag">{{ item.transfer_price }}</span>
                                  <input v-if="!item.extra_tag" :value="item.transfer_price" v-model="item.transfer_price" class="my_input" required type="name"  ></input>
                              </td>
                              <td>
                                  <span v-if="item.extra_tag">{{ item.virtual_goods_reward }}</span>
                                  <input v-if="!item.extra_tag" :value="item.virtual_goods_reward" v-model="item.virtual_goods_reward" class="my_input" required type="name"  ></input>
                              </td>

                              <td>
                                  <el-upload v-if="!item.extra_tag" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"><Button type="ghost" icon="images"></Button></el-upload>
                                  <img v-if="item.extra_tag" :src="item.object_url" />
                              </td>
                              <td>
                                  <el-upload v-if="!item.extra_tag" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"><Button type="ghost" icon="images"></Button></el-upload>
                                  <img v-if="item.extra_tag" :src="item.object_url_reward" />
                              </td>
                              <td>
                                  <Icon type="edit" @click.native="edit_pack(index,pack_list)" v-if="item.extra_tag"></Icon>
                                  <Icon type="trash-a" @click.native="del_list(index,item,item.amount_id)" v-if="item.extra_tag && index != 0"></Icon>
                                  <button type="submit" class="ivu-icon ivu-icon-android-list my_submit" v-if="!item.extra_tag"></button>
                                  <Icon type="close-round" @click.native="emp_pcak(index,item)" v-if="!item.extra_tag" ></Icon>
                              </td>
                          </tr>
                      </table>
                      </form>
                  </div>
                  <div class="ivu-table-body" v-if="pack_list.length == 0" >
                      <form @submit.prevent="created_base('package')">
                          <table>
                              <tr v-for="(item,index) in temporary">
                                  <td>
                                      <input v-model="item.package_name" required type="name" class="my_input"></input>
                                  </td>
                                  <td>
                                      <input v-model="item.package_description" class="my_input" required type="name"></input>
                                  </td>
                                  <td>
                                      <input v-model="item.virtual_goods" class="my_input" required type="number" min="0" ></input>
                                  </td>
                                  <td>
                                      <input v-model="item.price_currency" class="my_input" required type="name"  ></input>
                                  </td>
                                  <td>
                                      <input v-model="item.price" class="my_input" required type="name"  ></input>
                                  </td>
                                  <td>
                                      <input v-model="item.show_currency" class="my_input" required type="name"  ></input>
                                  </td>
                                  <td>
                                      <input v-model="item.show_price" class="my_input" required type="name"  ></input>
                                  </td>
                                  <td>
                                      <input v-model="item.pay_currency" class="my_input" required type="name"  ></input>
                                  </td>
                                  <td>
                                      <input v-model="item.pay_price" class="my_input" required type="name"  ></input>
                                  </td>
                                  <td>
                                      <input v-model="item.transfer_currency" class="my_input" required type="name"  ></input>
                                  </td>
                                  <td>
                                      <input v-model="item.transfer_price" class="my_input" required type="name"  ></input>
                                  </td>
                                  <td>
                                      <input v-model="item.virtual_goods_reward" class="my_input" required type="name"  ></input>
                                  </td>

                                  <td>
                                      <el-upload  class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"><Button type="ghost" icon="images"></Button></el-upload>
                                  </td>
                                  <td>
                                      <el-upload  class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"><Button type="ghost" icon="images"></Button></el-upload>
                                  </td>
                                  <td>
                                      <Icon type="trash-a" @click.native="del_list(index,temporary)" v-if="index != 0"></Icon>
                                      <Icon type="ios-copy" @click.native="copy_tr(index,item,temporary)"></Icon>
                                      <Icon type="plus-round" @click.native="add_tr(index,temporary)"></Icon>
                                  </td>
                              </tr>
                          </table>
                          <button type="submit" class="my_btn tijiao_btn" v-if="pack_list.length == 0">确认提交</button>
                      </form>
                  </div>

                  <div class="errors" v-if="myform.$submitted">
                      <p class="bg-danger text-center" v-if="myform.name.$error.required">请输入用户名.</p>
                      <p class="bg-danger text-center" v-if="myform.email.$error.email">请输入正确的邮箱.</p>
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

                  <Button type="primary" v-if="pack_list.length != 0" @click.native="add_tr(pack_list.length - 1,pack_list)">新增套餐</Button>
              </div>

          </el-tab-pane>
          <el-tab-pane label="道具配置">
              <form @submit.prevent="onSubmit('sss')">
              <div class="ivu-table-wrapper">
              <div class="ivu-table ivu-table-border">
                  <div class="ivu-table-header">
                      <table>
                          <tr>
                              <th>{{ $t('Hello World') }}</th>
                              <th>{{ $t('Hello World') }}</th>
                              <th>游戏币</th>
                              <th>{{ $t('Hello World') }}</th>
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
                                  <span v-if="item.kg">{{ item.name }}</span>
                                  <input v-if="!item.kg" :value="item.name" v-model="item.name" required type="number" min="0" class="my_input"></input>
                              </td>
                              <td>
                                  <span v-if="item.kg">{{ item.description }}</span>
                                  <input v-if="!item.kg" :value="item.description" v-model="item.description" class="my_input" required type="name"></input>
                              </td>
                              <td>
                                  <span v-if="item.kg">{{ item.gamecoin }}</span>
                                  <input v-if="!item.kg" :value="item.gamecoin" v-model="item.gamecoin" class="my_input" required type="number" min="0" ></input>
                              </td>
                              <td>
                                  <span v-if="item.kg">{{ item.priciCurrency }}</span>
                                  <input v-if="!item.kg" :value="item.priciCurrency" v-model="item.priciCurrency" class="my_input" required type="number" min="0" ></input>
                              </td>
                              <td>
                                  <el-upload v-if="!item.kg" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"><Button type="ghost" icon="images"></Button></el-upload>
                                  <img v-if="item.kg" v-bind:src="item.pic" />
                              </td>
                              <td>
                                  <Icon type="edit" @click.native="edit_pack(index,pack_list)" v-if="item.kg"></Icon>
                                  <Icon type="trash-a" @click.native="del_list(index,pack_list)" v-if="item.kg && pack_list.length > 1"></Icon>
                                  <!-- <Icon type="ios-copy" @click.native="copy_tr(index,item,pack_list)" v-if="item.kg"></Icon>
                                  <Icon type="plus-round" @click.native="add_tr(index,pack_list)" v-if="item.kg"></Icon> -->
                                  <button class="ivu-icon ivu-icon-android-list my_submit" @click.native="save_pack(index,item)" v-if="!item.kg" type="submit"></button>
                                  <Icon type="close-round" @click.native="emp_pcak(index,item)" v-if="!item.kg" ></Icon>
                              </td>
                          </tr>
                          <tr v-if="pack_list.length == 0" v-for="(item,index) in temporary">
                              <td>
                                  <input required type="number" v-model="item.name" min="0" class="my_input"></input>
                              </td>
                              <td>
                                  <input class="my_input" v-model="item.description" required type="name"></input>
                              </td>
                              <td>
                                  <input class="my_input" v-model="item.gamecoin" required type="number" min="0" ></input>
                              </td>
                              <td>
                                  <input class="my_input" v-model="item.priciCurrency" required type="number" min="0" ></input>
                              </td>
                              <td>
                                  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"><Button type="ghost" icon="images"></Button></el-upload>
                              </td>
                              <td>
                                  <Icon type="trash-a" @click.native="del_list(index,temporary)" v-if="index != 0"></Icon>
                                  <Icon type="ios-copy" @click.native="copy_tr(index,item,temporary)"></Icon>
                                  <Icon type="plus-round" @click.native="add_tr(index,temporary)"></Icon>
                              </td>
                          </tr>
                      </table>
                      <div class="errors" v-if="myform.$submitted">
                          <p class="bg-danger text-center" v-if="myform.name.$error.required">请输入用户名.</p>
                          <p class="bg-danger text-center" v-if="myform.email.$error.email">请输入正确的邮箱.</p>
                      </div>
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
                  <button type="submit" class="my_btn" v-if="pack_list.length == 0">确认提交</button>
                  <Button type="primary" v-if="pack_list.length != 0" @click.native="add_tr(pack_list.length - 1,pack_list)">新增套餐</Button>
              </div>
              </form>
          </el-tab-pane>
        </el-tabs>

     </div>
     <div class="tc_setting country_setting">
         <i class="num_setting">2</i>
         <h3 class="tc_setting_title">国家配置</h3>
         <div class="already_chose" >
             <b v-if="country_data_already.length > 0">已选国家：</b>
             <Tag v-for="(item,index) in country_data_already" v-if="item.name" closable @on-close="handleClose(item,index)">{{ item.name }}</Tag>
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
                                <Button v-for="(btn,nums) in way.channel_payways" :class="{chose : btn.chose }"  @click.native="chose_way(way.channel_payways,btn)">{{btn.name}}</Button>
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
             <Button type="primary" @click="show_load()" :disabled="chose_country_data.length == 0" v-loading.fullscreen.lock="fullscreenLoading">确认提交</Button>
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
                             <th>
                                 <Checkbox @click.native="checkAll()" v-model="checkall">全选</Checkbox>
                             </th>
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

                <div class="ivu-table-body" v-for="(item,indexs) in channel_set_data" v-if="!sort_gk">
                    <table>
                        <tr class="ivu-table-row" :class="{ now_tr : item.show_detail}">
                            <td>
                                <Checkbox v-model="item.check" @click.native="check(indexs)"></Checkbox>
                            </td>
                            <td @dblclick="toggle_detail(indexs)">{{item.showname}}</td>
                            <td></td>
                            <td>
                                <span v-if="!item.edit_switch">{{item.showname}}</span>
                                <Icon type="edit" @click.native="edit_channel(indexs)" v-if="!item.edit_switch"></Icon>
                                <div v-if="item.edit_switch" class="edit_div">
                                    <Input :value="item.showname"></Input>
                                    <Icon type="checkmark-round" @click.native="save_show_name(indexs)"></Icon>
                                    <Icon type="close-round" @click.native="cannel_show_name(indexs)"></Icon>
                                </div>
                            </td>
                            <td></td>
                            <td>
                                <i-switch v-model="item.enabled_stats" @on-change="change"></i-switch>
                            </td>
                            <td>
                                <Icon type="android-star" :class="{ recommend : item.recommend}" @click.native="change_recommend(indexs)"></Icon>
                            </td>
                        </tr>
                        <tr v-if="item.show_detail">
                            <td colspan="7">
                                <Div class="more_info ivu-table-wrapper">
                                    <form @submit.prevent="onSubmit('sss')">
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
                                        <tr v-for="(items,index) in item.pack">
                                            <td>
                                                <span v-if="!items.kg">{{items.name}}</span>
                                                <input class="my_input" required type="name" v-if="items.kg" :value="items.name"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.miaoshu}}</span>
                                                <input class="my_input" required type="name" v-if="items.kg" :value="items.miaoshu"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.gamecoin}}</span>
                                                <input class="my_input" required type="name" v-if="items.kg" :value="items.gamecoin"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.dingjia}}</span>
                                                <input class="my_input" required type="name" v-if="items.kg" :value="items.dingjia"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.xianshi}}</span>
                                                <input class="my_input" required type="name" v-if="items.kg" :value="items.xianshi"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.zhichi}}</span>
                                                <input class="my_input" required type="name" v-if="items.kg" :value="items.zhichi"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.zhifu}}</span>
                                                <input class="my_input" required type="name" v-if="items.kg" :value="items.zhifu"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.chuanti}}</span>
                                                <input class="my_input" required type="name" v-if="items.kg" :value="items.chuanti"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.chuandi}}</span>
                                                <input class="my_input" required type="name" v-if="items.kg" :value="items.chuandi"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.yunying}}</span>
                                                <input class="my_input" required type="name" v-if="items.kg" :value="items.yunying"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.id}}</span>
                                                <input class="my_input" required type="name" v-if="items.kg" :value="items.id"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.jiangli}}</span>
                                                <input class="my_input" required type="name" v-if="items.kg" :value="items.jiangli"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.name1}}</span>
                                                <input class="my_input" required type="name" v-if="items.kg" :value="items.name1"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.name2}}</span>
                                                <input class="my_input" required type="name" v-if="items.kg" :value="items.name2"></input>
                                            </td>
                                            <td>
                                                <Icon type="edit" @click.native="edit_pack(index,item.pack)" v-if="!items.kg"></Icon>
                                                <Icon type="trash-a" v-if="!items.kg"></Icon>
                                                <i-switch v-model="switch1" @on-change="change" v-if="!items.kg"></i-switch>
                                                <Icon type="android-star" v-if="!items.kg"></Icon>
                                                <Icon type="plus-round" @click.native="add(index,item.pack)" v-if="!items.kg"></Icon>
                                                <button class="ivu-icon ivu-icon-android-list my_submit" @click.native="save_pack(index,items)" v-if="items.kg" type="submit"></button>
                                                <Icon type="close-round" @click.native="comeback(index,items)" v-if="items.kg" ></Icon>
                                            </td>
                                        </tr>
                                    </table>
                                    </form>
                                </Div>
                                <Div class="more_info ivu-table-wrapper">
                                    <form @submit.prevent="onSubmit('sss')">
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
                                        <tr v-for="(items,index) in item.tool">
                                            <td>
                                                <span v-if="!items.kg">{{items.name}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.name"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.miaoshu}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.miaoshu"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.gamecoin}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.gamecoin"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.dingjia}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.dingjia"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.xianshi}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.xianshi"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.zhichi}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.zhichi"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.zhifu}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.zhifu"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.chuanti}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.chuanti"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.chuandi}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.chuandi"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.yunying}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.yunying"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.id}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.id"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.jiangli}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.jiangli"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.name1}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.name1"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.name2}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.name2"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.name1}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.name1"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.name2}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.name3"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.name1}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.name4"></input>
                                            </td>
                                            <td>
                                                <span v-if="!items.kg">{{items.name2}}</span>
                                                <input class="my_input" required type="name"v-if="items.kg" :value="items.name5"></input>
                                            </td>
                                            <td>
                                                <Icon type="edit" @click.native="edit_pack(index,item.tool)" v-if="!items.kg"></Icon>
                                                <Icon type="trash-a" v-if="!items.kg"></Icon>
                                                <i-switch v-model="switch1" @on-change="change" v-if="!items.kg"></i-switch>
                                                <Icon type="android-star" v-if="!items.kg"></Icon>
                                                <Icon type="plus-round" @click.native="add(index,item.tool)" v-if="!items.kg"></Icon>
                                                <button class="ivu-icon ivu-icon-android-list my_submit" type="submit" @click.native="save_pack(index,items)" v-if="items.kg"></button>
                                                <Icon type="close-round" @click.native="comeback(index,items)" v-if="items.kg" ></Icon>
                                            </td>
                                        </tr>
                                    </table>
                                    </form>
                                </Div>
                            </td>
                        </tr>
                    </table>
                </div>
                <draggable @update="datadragEnd" v-model="channel_set_data" v-if="sort_gk">
                <div class="ivu-table-body sort_table" v-for="(item,index) in channel_set_data">
                    <table>
                        <tr class="ivu-table-row" :class="{ now_tr : item.show_detail}">
                            <td>
                                <Checkbox v-model="item.check" @click.native="check(index)"></Checkbox>
                            </td>
                            <td>{{item.showname}}</td>
                            <td></td>
                            <td>
                                <span v-if="!item.edit_switch">{{item.showname}}</span>
                                <Icon type="edit" @click.native="edit_channel(index)" v-if="!item.edit_switch"></Icon>
                                <div v-if="item.edit_switch" class="edit_div">
                                    <Input :value="item.showname"></Input>
                                    <Icon type="checkmark-round" @click.native="save_show_name(index)"></Icon>
                                    <Icon type="close-round" @click.native="cannel_show_name(index)"></Icon>
                                </div>
                            </td>
                            <td></td>
                            <td>
                                <i-switch v-model="item.enabled_stats" @on-change="change"></i-switch>
                            </td>
                            <td>
                                <Icon type="android-star" :class="{ recommend : item.recommend}" @click.native="change_recommend(index)"></Icon>
                            </td>
                        </tr>
                    </table>
                </div>
               </draggable>
             </div>
             </div>
             <p>
                 <Button type="info" v-if="!sort_gk" @click="switch_batch = true">开关批处理</Button>
                 <Button type="warning" @click="sort_data" v-if="!sort_gk">排序</Button>
                 <Icon type="android-list" v-if="sort_gk" @click.native="sort_gk = !sort_gk"></Icon>
                 <Icon type="close-round" v-if="sort_gk" @click.native="cannle_sort"></Icon>
             </p>
         </div>
     </div>
     <Modal title="提示" v-model="modal" class-name="vertical-center-modal" :loading="loading" @on-ok="asyncOK" @on-cancel="cancel" ok-text="OK" cancel-text="Cancel">
        <p>确认{{alert_message}}支付页面吗?</p>
    </Modal>
    <Modal title="提示" v-model="copy_pack1" class-name="vertical-center-modal" :loading="loading" @on-ok="copy_pack_ok" @on-cancel="cancel" ok-text="OK" cancel-text="Cancel">
       <p>确认复制当前支付类型的套餐吗?</p>
    </Modal>
    <Modal title="提示" v-model="switch_batch" class-name="vertical-center-modal" :loading="loading" @on-ok="switch_batch_ok" @on-cancel="cancel" ok-text="OK" cancel-text="Cancel">
       <p>确认开启全部渠道吗?</p>
    </Modal>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import VueForm from 'vue-form';
export default {
  components:{
      draggable
  },
  name: 'basic-example',
  data(){
      return {
          access_token: {
              token:''
          },
          tab_data:{},
          myform: {},
          model: {},
          view_pay_web:true,
          pack_edit:{
              0:true,
              1:true
          },
          temporary:[{}],//临时数组，存放新建表单
          switch_batch:false,
          sort_gk:false,
          props_edit:false,
          copy_pack1:false,
          modal:false,
          loading:true,
          pack_loading:false,
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
          switch1:true,
          get_country:false,
          get_channel:false,
          fileList:[],
          alert_message:'',
          get_country_tabs:'',
          checkall:false,
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
          pack_list:[],
          props_list:[{}],
          country_data_already:[],
          country_data:[{
              area:'亚洲',
              country:[{
                  name:'中国',
                  payways:[{
                      name:'电子钱包',
                      channel_payways:[{
                          name:'skrill',
                          chose:false
                      },
                      {
                          name:'skrill1',
                          chose:false
                      },
                      {
                          name:'skrill2',
                          chose:false
                      }]
                  },
                  {
                      name:'支付宝',
                      channel_payways:[{
                          name:'skrill2',
                          chose:false
                      },
                      {
                          name:'skrill12',
                          chose:false
                      },
                      {
                          name:'skrill22',
                          chose:false
                      }]
                  }]
              },
              {
                  name:'日本',
                  payways:[{
                      name:'电子钱包',
                      channel_payways:[{
                          name:'skrill3',
                          chose:false
                      },
                      {
                          name:'skrill13',
                          chose:false
                      },
                      {
                          name:'skrill23',
                          chose:false
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
                          name:'skrill4',
                          chose:false
                      },
                      {
                          name:'skrill14',
                          chose:false
                      },
                      {
                          name:'skrill24',
                          chose:false
                      }]
                  }]
              },
              {
                  name:'加拿大',
                  payways:[{
                      name:'电子钱包',
                      channel_payways:[{
                          name:'skrill5',
                          chose:false
                      },
                      {
                          name:'skrill15',
                          chose:false
                      },
                      {
                          name:'skrill25',
                          chose:false
                      }]
                  }]
              }]
          }],
          chose_country_data:[],
          channel_set_data:[{
              show_detail:false,
              showname:'0000000',
              edit_switch:false,
              enabled_stats:false,
              check:false,
              recommend:true,
              pack:[{
                  name:'800',
                  miaoshu:'描述',
                  gamecoin:'20',
                  dingjia:'20',
                  xianshi:'20',
                  zhichi:'30',
                  zhifu:'30',
                  chuanti:'20',
                  chuandi:'10',
                  yunying:'usd',
                  id:'123241',
                  jiangli:'50',
                  kg:false
              },{
                  name:'801',
                  miaoshu:'描述',
                  gamecoin:'20',
                  dingjia:'20',
                  xianshi:'20',
                  zhichi:'30',
                  zhifu:'30',
                  chuanti:'20',
                  chuandi:'10',
                  yunying:'usd',
                  id:'123241',
                  jiangli:'50',
                  kg:false
              }],
              tool:[{
                  name:'800',
                  miaoshu:'描述',
                  gamecoin:'20',
                  dingjia:'20',
                  xianshi:'20',
                  zhichi:'30',
                  zhifu:'30',
                  chuanti:'20',
                  chuandi:'10',
                  yunying:'usd',
                  id:'123241',
                  jiangli:'50',
                  kg:false
              }]
          },
          {
              show_detail:false,
              showname:'111111',
              edit_switch:false,
              enabled_stats:true,
              check:true,
              recommend:false,
              pack:[{
                  name:'802',
                  miaoshu:'描述',
                  gamecoin:'20',
                  dingjia:'20',
                  xianshi:'20',
                  zhichi:'30',
                  zhifu:'30',
                  chuanti:'20',
                  chuandi:'10',
                  yunying:'usd',
                  id:'123241',
                  jiangli:'50',
                  kg:false
              },{
                  name:'803',
                  miaoshu:'描述',
                  gamecoin:'20',
                  dingjia:'20',
                  xianshi:'20',
                  zhichi:'30',
                  zhifu:'30',
                  chuanti:'20',
                  chuandi:'10',
                  yunying:'usd',
                  id:'123241',
                  jiangli:'50',
                  kg:false
              },{
                  name:'804',
                  miaoshu:'描述',
                  gamecoin:'20',
                  dingjia:'20',
                  xianshi:'20',
                  zhichi:'30',
                  zhifu:'30',
                  chuanti:'20',
                  chuandi:'10',
                  yunying:'usd',
                  id:'123241',
                  jiangli:'50',
                  kg:false
              }],
              tool:[{
                  name:'800',
                  miaoshu:'描述',
                  gamecoin:'20',
                  dingjia:'20',
                  xianshi:'20',
                  zhichi:'30',
                  zhifu:'30',
                  chuanti:'20',
                  chuandi:'10',
                  yunying:'usd',
                  id:'123241',
                  jiangli:'50',
                  kg:false
              },{
                  name:'800',
                  miaoshu:'描述',
                  gamecoin:'20',
                  dingjia:'20',
                  xianshi:'20',
                  zhichi:'30',
                  zhifu:'30',
                  chuanti:'20',
                  chuandi:'10',
                  yunying:'usd',
                  id:'123241',
                  jiangli:'50',
                  kg:false
              }]
          },
          {
              show_detail:false,
              showname:'22222',
              edit_switch:false,
              enabled_stats:false,
              check:false,
              recommend:true,
              pack:[{
                  name:'805',
                  miaoshu:'描述',
                  gamecoin:'20',
                  dingjia:'20',
                  xianshi:'20',
                  zhichi:'30',
                  zhifu:'30',
                  chuanti:'20',
                  chuandi:'10',
                  yunying:'usd',
                  id:'123241',
                  jiangli:'50',
                  kg:false
              }],
              tool:[{
                  name:'800',
                  miaoshu:'描述',
                  gamecoin:'20',
                  dingjia:'20',
                  xianshi:'20',
                  zhichi:'30',
                  zhifu:'30',
                  chuanti:'20',
                  chuandi:'10',
                  yunying:'usd',
                  id:'123241',
                  jiangli:'50',
                  kg:false
              },{
                  name:'800',
                  miaoshu:'描述',
                  gamecoin:'20',
                  dingjia:'20',
                  xianshi:'20',
                  zhichi:'30',
                  zhifu:'30',
                  chuanti:'20',
                  chuandi:'10',
                  yunying:'usd',
                  id:'123241',
                  jiangli:'50',
                  kg:false
              }]
          }],
          old_data:[],
          old_pack_data:[],
          fullscreenLoading:false
      }
  },
  watch:{
      channel_set_data:{
          handler:function(val,oldVal){
              console.log(oldVal)
          },
          deep:true
      }
  },
  created:function(){
       var self = this
       this.access_token.token = sessionStorage.token
       this.$nextTick(function (){
           var data = {
               merchant_shop_code : 'loes',
               sign : 'e4505cd13fe2578dfaa9ade80f516261',
               sign_type : 'shop',
               time : '2222'
           };
           if(!sessionStorage.token){
               this.$api.post('sign/verification', data, function(r) {
                   self.access_token.token = r.result.access_token;
                   sessionStorage.setItem('token',r.result.access_token)
                   self.next_ajax(r.result.access_token)
               })
           }else{
               self.next_ajax(sessionStorage.token)
           }
	   })
  },
  methods: {
    next_ajax(token){
        var self = this
        //获取平台列表
        this.$api.get('verification/package/get_platform', {token:token} , function(r) {
            for(var i=0;i<r.result.length;i++){
                self.$set(self.tab_data,i,r.result[i])
            }
            self.activeName2 = r.result[0]
        })
        //查询基础套餐
        this.$api.get('verification/package/list_package_base', {token:token,platform:'google',type:'package'} , function(r) {
            for(var i=0;i<r.result.lists.length;i++){
                self.$set(self.pack_list,i,r.result.lists[i])
            }
        })
    },
    handleClick(tab, event) {
        console.log('1');
    },
    handleClose (item,index) {
        var _this = this
        for(var i=0;i<_this.chose_country_data.length;i++){
            if(item.name == _this.chose_country_data[i].name){
                _this.chose_country_data.splice(i,1)
                _this.country_data_already.splice(i,1)
            }
        }
        item.chose = false
        if(this.chose_country_data.length == 0){
            this.get_country_tabs = ''
        }else{
            this.get_country_tabs = this.chose_country_data[0].name
        }
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
        //console.log("%c%s","color: red; background: yellow; font-size: 24px;","系统语言为：" + navigator.language)
    },
    copy_pack_ok(){

    },
    cancel(){
        this.kaiguan_kg = false;
    },
    copy_pack(e){
        this.copy_pack1 = true;
    },
    del_list(index,item,id){
        this.$api.get('verification/package/remove_package_base', {token:this.access_token.token,amount_id:id} , function(r) {
            item.splice(index,1)
        })
    },
    copy_tr(index,data,model){
        // var copy = this.pack_list.slice(index,index+1)
        // this.pack_list.splice(index+1,0,copy[0])
        var new_list = {}
        for(var key in model[index]){
            new_list[key] = model[index][key]
        }
        model.splice(index+1,0,new_list)
        // model.push(data)
    },
    add_tr(index,model,status){
        var new_list = {}
        for(var key in model[index]){
            new_list[key] = ''
        }
        model.splice(index+1,0,new_list)
        if(status){
            for(var key in model){
                if(model[key]){
                    status[key] = true
                }else{
                    status[key] = false
                }
            }
            status[index + 1] = false;
        }
    },
    save_pack(index,model,id){
        var self = this
        model.token = this.access_token.token
        model.type = 'package'
        var new_data = {}
        for(var key in model){
            new_data[key] = model[key]
        }
        console.log(model)
        this.pack_loading = !this.pack_loading
        if(id){
            this.$api.get('verification/package/edit_package_base', new_data , function(r) {
                self.pack_loading = !self.pack_loading
                model.extra_tag = !model.extra_tag
            })
        }else{
            this.$api.get('verification/package/create_package_base', new_data , function(r) {
                self.pack_loading = !self.pack_loading
                model.extra_tag = !model.extra_tag
            })
        }
        // this.$Message.success('保存成功！');
    },
    created_base(type){
        var self = this
        var new_list = {}

        for(var i=0;i<this.temporary.length;i++){

            new_list.token = this.access_token.token
            new_list.type = type
            new_list.platform = 'google'
            new_list.operator = 'renzengpeng@oasgames.com'

            for(var key in this.temporary[i]){
                new_list[key] = []
                new_list[key][i] = this.temporary[i][key]
            }
        }
        console.log(new_list)
        //console.log(this.temporary,this.temporary.length)
        this.$api.get('verification/package/create_package_base', new_list , function(r) {
            console.log(r)
        })
    },
    edit_pack(index,model){
        // for(var i=0;i<this.channel_set_data.length;i++){
        //     this.old_pack_data[i] = [{}]
        //     for(var s=0;s<this.channel_set_data.length;s++){
        //         this.old_pack_data[i][s] = ''
        //     }
        // }
        // this.old_pack_data[indexs][index] = data
        model[index].extra_tag = !model[index].extra_tag
    },
    add(index,model){
        var new_list = {}
        for(var key in model[index]){
            new_list[key] = ''
        }
        model.splice(index+1,0,new_list)
        model[index + 1].kg = true;
        console.log(model)
    },
    emp_pcak(index,model){
        for(var key in model){
            if(key != 'amount_id'){
                model[key] = ''
            }
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
        if(this.channel_set_data[index].show_detail){
            this.channel_set_data[index].show_detail = false
        }else{
            for(var i=0;i<this.channel_set_data.length;i++){
                this.channel_set_data[i].show_detail = false
            }
            this.channel_set_data[index].show_detail = !this.channel_set_data[index].show_detail
        }
    },
    edit_channel(index){
        this.channel_set_data[index].edit_switch = !this.channel_set_data[index].edit_switch
    },
    save_show_name(index){
        this.channel_set_data[index].edit_switch = false
    },
    cannel_show_name(index){
        this.channel_set_data[index].edit_switch = false
    },
    checkAll(){
        var s = 0;
        for(var i=0;i<this.channel_set_data.length;i++){
            if(this.channel_set_data[i].check){
                s++
            }
        }
        if(s == this.channel_set_data.length){
            for(var i=0;i<this.channel_set_data.length;i++){
                this.channel_set_data[i].check = false
                this.checkall = false
            }
        }else{
            for(var i=0;i<this.channel_set_data.length;i++){
                this.channel_set_data[i].check = true
                this.checkall = true
            }
        }
    },
    check(index){
        this.channel_set_data[index].check = !this.channel_set_data[index].check
        var s = 0;
        for(var i=0;i<this.channel_set_data.length;i++){
            if(this.channel_set_data[i].check){
                s++
            }
        }
        if(s == this.channel_set_data.length){
            this.checkall = true
        }else{
            this.checkall = false
        }
    },
    change_recommend(index){
        this.channel_set_data[index].recommend = !this.channel_set_data[index].recommend
    },
    datadragEnd:function(evt){
        console.log('拖动前的索引：'+evt.oldIndex);
        console.log('拖动后的索引：'+evt.newIndex);
        console.log(evt)
    },
    sort_data(){
        this.sort_gk = !this.sort_gk
        this.old_data = this.channel_set_data
    },
    cannle_sort(){
        this.sort_gk = !this.sort_gk
        this.channel_set_data = this.old_data
    },
    comeback(index,model){
        model.kg = !model.kg
    },
    show_load(){
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 3000);
    },
    switch_batch_ok(){
        this.switch_batch = false
        for(var i=0;i<this.channel_set_data.length;i++){
            if(this.channel_set_data[i].check){
                this.channel_set_data[i].enabled_stats = true
            }else{
                this.channel_set_data[i].enabled_stats = false
            }
        }
    },
    onSubmit(model){
        console.log("%c%s","color: red; background: yellow; font-size: 24px;","Ajax提交中....");
    },
    chose_way(btn,nums){
        for(var key in btn){
            btn[key].chose = false
        }
        nums.chose = true
    }
  }
}
</script>

<style>

@import "style/reset.css";
@import "style/main.css";

</style>
