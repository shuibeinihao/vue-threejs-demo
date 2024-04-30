# 技术栈
vue3 + vite4 + vite4 + tailwindcss h5模版

# 安装依赖
npm install

# 运行项目
npm run dev

# 打包发布
开发环境：npm run build:dev
测试环境：npm run build:test
生产环境：npm run build

# git commit规范 以下type用于说明 commit 的类型
feat：新功能（feature）
fix：修补bug
docs：文档
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
revert: 回滚到上一个版本

## 全局组件(components)使用说明
# VantFieldDate组件 实现选择年月日
页面直接引入示例
<vant-field-date v-model="xxx" :labelText="'xxx'"></vant-field-date>
接收如下参数
最小时间：minDateValue type Date
最大时间：maxDateValue type Date
labelText:labelText   type String
是否必须: isRequired   type Boolean
是否只读: isReadonly   type Boolean

# VantPicker组件 实现选择单挑数据多条数据级联数据
页面直接引入示例
<vant-picker v-model="xxx" :labelText="'xxx'" :columns="columns"></vant-picker>
接收如下参数
数据源：  columns      type Array  
labelText:labelText   type String
是否必须: isRequired   type Boolean
是否只读: isReadonly   type Boolean

# VantPopType组件 实现风险类型选择 以及各种弹窗单选
页面直接引入示例
<vant-pop-type v-model="xxx" :labelText="'xxx'" :orgData="[]"></vant-pop-type>
接收如下参数
类型：    orgType     type Number   默认为1  兼容以前为3
标题:     title       type String
数据源：  orgData     type Array
indexList：indexList  type Array     当orgType=3是使用
是否必须: isRequired   type Boolean
是否只读: isReadonly   type Boolean

# VantSelectPersonnel组件 实现弹出框员工搜索并选择
页面直接引入示例
<vant-select-personnel v-model="xxx" :labelText="'xxx'"></vant-select-personnel>
接收如下参数
labelText:labelText   type String
是否必须: isRequired   type Boolean
是否只读: isReadonly   type Boolean

# VantUploadPic组件 实现图片上传
页面直接引入示例
<vant-upload-pic></vant-upload-pic>
接收如下参数
是否必须: isRequired   type Boolean