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
         <h3 class="tc_setting_title" @click="toggle">套餐、道具配置</h3>
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
                                  {{ $t('pay_switch') }}
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
                              <td>5</td>
                              <td>6</td>
                          </tr>
                      </table>
                  </div>
              </div>
              </div>
          </el-tab-pane>
          <el-tab-pane label="道具配置">道具配置</el-tab-pane>
        </el-tabs>
     </div>
     <div class="tc_setting country_setting">
         <i class="num_setting">2</i>
         <h3 class="tc_setting_title">国家配置</h3>
     </div>
     <div class="tc_setting channel_setting">
         <i class="num_setting">3</i>
         <h3 class="tc_setting_title">渠道配置</h3>
     </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
      return {
          pay_switch:true,
          input:'',
          input1:'',
          value: true,
          activeName2: 'first',
          activeNames:['1'],
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
      toggle(){
          alert('aa')
      },
      chang_table(e){
         console.log(e.target)
      }
  }
}
</script>

<style>

@import "style/reset.css";
@import "style/main.css";

</style>
