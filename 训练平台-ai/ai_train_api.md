
 <h1 class="curproject-name"> visualmodule </h1> 
 可视化组件


# 【全局响应参数】

## 【全局响应参数】
<a id=【全局响应参数】> </a>
### 基本信息

**Path：** /visualmodule/

**Method：** HEAD

**接口描述：**
<p>【状态码说明】</p>
<table>
<thead>
<tr>
<th>状态码</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><span class="colour" style="color:rgb(94, 110, 94)">2xx</span></td>
<td><span class="colour" style="color:rgb(94, 110, 94)">请求正常处理并返回</span></td>
</tr>
<tr>
<td><span class="colour" style="color:rgb(94, 110, 94)">3xx</span></td>
<td><span class="colour" style="color:rgb(94, 110, 94)">重定向，请求的资源位置发生变化</span></td>
</tr>
<tr>
<td><span class="colour" style="color:rgb(94, 110, 94)">4xx</span></td>
<td><span class="colour" style="color:rgb(94, 110, 94)">客户端发送请求有误</span></td>
</tr>
<tr>
<td><span class="colour" style="color:rgb(94, 110, 94)">5xx</span></td>
<td><span class="colour" style="color:rgb(94, 110, 94)">服务端错误</span></td>
</tr>
</tbody>
</table>


### 请求参数

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> status</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">状态码</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> msg</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">结果说明</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> timeCost</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">耗时</span></td><td key=5></td></tr><tr key=0-3><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> obj</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">响应信息</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
# 组件管理

## 获取组件结构
<a id=获取组件结构> </a>
### 基本信息

**Path：** /visualmodule/component/structure

**Method：** GET

**接口描述：**
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>frameId</td>
<td>1-sklearn / 2-tensorflow / 3-mxnet / 4-pytorch</td>
</tr>
</tbody>
</table>


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| frameId | 是  |   |  框架ID |

### 返回数据

```javascript
[
   {
      "name": "dataio",
      "desc": "数据读取",
      "children": [
         {
            "name": "default",
            "desc": "默认",
            "operators": [
               {
                  "uuid": "<算子唯一ID>",
                  "clazzname": "<算子的类名称>",
                  "desc": "算子在前端展示的中文名称",
                  "ports": {
                     "in": [
                        {
                           "name": "入端端口名",
                           "dtype": "端口类型"
                        }
                     ],
                     "out": [
                        {
                           "name": "出端端口名",
                           "dtype": "端口类型"
                        }
                     ]
                  },
                  "params": [
                     {
                        "name": "<算子中定义的参数变量名称>",
                        "hint": "<参数在前端的提示信息>",
                        "desc": "<参数在前端展示的中文名称>",
                        "ptype": "<返回给引擎的参数类型>",
                        "default": "<参数的默认值>",
                        "is_required": "<参数是否必填>",
                        "front": "<参数对应于前端的控件类型>",
                        "choice": "<参数的可选值>",
                        "item_type": "<如果参数为集合类型,集合中每个元素的类型>",
                        "min_val": "<参数最小值>",
                        "max_val": "<参数最大值>"
                     }
                  ]
               }
            ]
         }
      ]
   },
   {
      "name": "preprocess",
      "desc": "数据预处理",
      "children": [
         {
            "name": "default",
            "desc": "默认",
            "operators": []
         },
         {
            "name": "normalization",
            "desc": "归一化处理",
            "operators": [
               {
                  "uuid": "<算子唯一ID>",
                  "clazzname": "<算子的类名称>",
                  "desc": "算子在前端展示的中文名称",
                  "ports": {
                     "in": [],
                     "out": []
                  },
                  "params": []
               }
            ]
         },
         {
            "name": "featureprocess",
            "desc": "特征处理",
            "operators": [
               {
                  "uuid": "<算子唯一ID>",
                  "clazzname": "<算子的类名称>",
                  "desc": "算子在前端展示的中文名称",
                  "ports": {
                     "in": [],
                     "out": []
                  },
                  "params": []
               }
            ]
         }
      ]
   },
   {
      "name": "algorithm",
      "desc": "机器学习算法",
      "children": [
         {
            "name": "default",
            "desc": "默认",
            "operators": []
         },
         {
            "name": "classification",
            "desc": "分类算法",
            "operators": [
               {
                  "uuid": "<算子唯一ID>",
                  "clazzname": "<算子的类名称>",
                  "desc": "算子在前端展示的中文名称",
                  "ports": {
                     "in": [],
                     "out": []
                  },
                  "params": []
               }
            ]
         },
         {
            "name": "regression",
            "desc": "回归算法",
            "operators": [
               {
                  "uuid": "<算子唯一ID>",
                  "clazzname": "<算子的类名称>",
                  "desc": "算子在前端展示的中文名称",
                  "ports": {
                     "in": [],
                     "out": []
                  },
                  "params": []
               }
            ]
         },
         {
            "name": "cluster",
            "desc": "聚类算法",
            "operators": [
               {
                  "uuid": "<算子唯一ID>",
                  "clazzname": "<算子的类名称>",
                  "desc": "算子在前端展示的中文名称",
                  "ports": {
                     "in": [],
                     "out": []
                  },
                  "params": []
               }
            ]
         }
      ]
   },
   {
      "name": "evaluation",
      "desc": "模型评估",
      "children": [
         {
            "name": "default",
            "desc": "默认",
            "operators": []
         },
         {
            "name": "classification",
            "desc": "分类算法评估",
            "operators": [
               {
                  "uuid": "<算子唯一ID>",
                  "clazzname": "<算子的类名称>",
                  "desc": "算子在前端展示的中文名称",
                  "ports": {
                     "in": [],
                     "out": []
                  },
                  "params": []
               }
            ]
         },
         {
            "name": "regression",
            "desc": "回归算法评估",
            "operators": [
               {
                  "uuid": "<算子唯一ID>",
                  "clazzname": "<算子的类名称>",
                  "desc": "算子在前端展示的中文名称",
                  "ports": {
                     "in": [],
                     "out": []
                  },
                  "params": []
               }
            ]
         },
         {
            "name": "cluster",
            "desc": "聚类算法评估",
            "operators": [
               {
                  "uuid": "<算子唯一ID>",
                  "clazzname": "<算子的类名称>",
                  "desc": "算子在前端展示的中文名称",
                  "ports": {
                     "in": [],
                     "out": []
                  },
                  "params": []
               }
            ]
         }
      ]
   }
]
```
## 获取组件属性
<a id=获取组件属性> </a>
### 基本信息

**Path：** /visualmodule/component/attribute

**Method：** GET

**接口描述：**
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>frameId</td>
<td>1-sklearn / 2-tensorflow / 3-mxnet / 4-pytorch</td>
</tr>
</tbody>
</table>


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| frameId | 是  |   |  框架ID |
| portTypes | 是  |  {type1},... |  端口类型 |

### 返回数据

```javascript
[
   {
      "portType": "sklearn_model",
      "attribute": [
         {
            "name": "downloadModel",
            "describe": "下载训练模型"
         }
      ]
   },
   {
      "portType": "pipeline_model",
      "attribute": [
         {
            "name": "downloadPipeline",
            "describe": "下载工作流"
         }
      ]
   }
]
```
# 框架管理

## 获取框架列表
<a id=获取框架列表> </a>
### 基本信息

**Path：** /visualmodule/framework/list

**Method：** GET

**接口描述：**
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>learnType</td>
<td>1-机器学习 / 2-深度学习</td>
</tr>
</tbody>
</table>


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| learnType | 否  |   |  学习类型 |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object []</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-0-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> frameId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">框架ID</span></td><td key=5></td></tr><tr key=0-0-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> frameName</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">框架名称</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
# 实验管理

## 获取实验列表
<a id=获取实验列表> </a>
### 基本信息

**Path：** /visualmodule/experiment/list

**Method：** GET

**接口描述：**
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>expPattern</td>
<td>1-拖拽式 / 9-全自动</td>
</tr>
<tr>
<td>expStatus</td>
<td>0-准备中 / 1-等待中 / 2-运行中 / 3-已中止 / 4-成功 / 5-失败</td>
</tr>
</tbody>
</table>


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| expName | 否  |   |  实验名称 |
| expPattern | 否  |   |  实验模式 |
| expStatus | 否  |   |  实验状态 |
| page | 否  |   |  当前页数 |
| limit | 否  |   |  每页限制条数 |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object []</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">结果集合</span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-0-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> expId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验ID</span></td><td key=5></td></tr><tr key=0-0-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> expName</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验名称</span></td><td key=5></td></tr><tr key=0-0-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> expPattern</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验模式</span></td><td key=5></td></tr><tr key=0-0-3><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> expStatus</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验状态</span></td><td key=5></td></tr><tr key=0-0-4><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> description</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验描述</span></td><td key=5></td></tr><tr key=0-0-5><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> createTime</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">创建时间</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> page</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">当前页数</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> limit</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">当前数据量</span></td><td key=5></td></tr><tr key=0-3><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> total</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">总数据量</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 获取实验详情
<a id=获取实验详情> </a>
### 基本信息

**Path：** /visualmodule/experiment/{expId}

**Method：** GET

**接口描述：**
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>expPattern</td>
<td>1-拖拽式 / 9-全自动</td>
</tr>
<tr>
<td>expStatus</td>
<td>0-准备中 / 1-等待中 / 2-运行中 / 3-已中止 / 4-成功 / 5-失败</td>
</tr>
<tr>
<td>learnType</td>
<td>1-机器学习 / 2-深度学习</td>
</tr>
<tr>
<td>frameId</td>
<td>1-sklearn / 2-tensorflow / 3-mxnet / 4-pytorch</td>
</tr>
</tbody>
</table>


### 请求参数
**路径参数**

| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ |
| expId |   |   |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> expId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验ID</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> expName</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验名称</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> expPattern</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验模式</span></td><td key=5></td></tr><tr key=0-3><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> expStatus</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验状态</span></td><td key=5></td></tr><tr key=0-4><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> learnType</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">学习类型</span></td><td key=5></td></tr><tr key=0-5><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> frameId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">框架ID</span></td><td key=5></td></tr><tr key=0-6><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> description</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验描述</span></td><td key=5></td></tr><tr key=0-7><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> createTime</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">创建时间</span></td><td key=5></td></tr><tr key=0-8><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> updateTime</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">更新时间</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 添加实验
<a id=添加实验> </a>
### 基本信息

**Path：** /visualmodule/experiment

**Method：** POST

**接口描述：**
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>expPattern</td>
<td>1-拖拽式 / 9-全自动</td>
</tr>
<tr>
<td>learnType</td>
<td>1-机器学习 / 2-深度学习</td>
</tr>
<tr>
<td>frameId</td>
<td>1-sklearn / 2-tensorflow / 3-mxnet / 4-pytorch</td>
</tr>
</tbody>
</table>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> expName</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验名称</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> expPattern</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验模式</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> learnType</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">学习类型</span></td><td key=5></td></tr><tr key=0-3><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> frameId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">框架ID</span></td><td key=5></td></tr><tr key=0-4><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> description</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验描述</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> expId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验ID</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 编辑实验 
<a id=编辑实验 > </a>
### 基本信息

**Path：** /visualmodule/experiment

**Method：** PUT

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> expId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验ID</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> expName</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验名称</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> description</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验描述</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>
            
## 删除实验
<a id=删除实验> </a>
### 基本信息

**Path：** /visualmodule/experiment/{expId}

**Method：** DELETE

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/x-www-form-urlencoded | 是  |   |   |
**路径参数**

| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ |
| expId |   |   |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>
            
## 获取实验模式列表
<a id=获取实验模式列表> </a>
### 基本信息

**Path：** /visualmodule/experiment/pattern/list

**Method：** GET

**接口描述：**


### 请求参数

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object []</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-0-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> expPattern</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验模式</span></td><td key=5></td></tr><tr key=0-0-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> patternName</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">模式名称</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 获取实验状态列表
<a id=获取实验状态列表> </a>
### 基本信息

**Path：** /visualmodule/experiment/status/list

**Method：** GET

**接口描述：**


### 请求参数

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object []</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-0-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> expStatus</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">实验状态</span></td><td key=5></td></tr><tr key=0-0-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> statusName</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">状态名称</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 获取学习类型列表
<a id=获取学习类型列表> </a>
### 基本信息

**Path：** /visualmodule/experiment/learnType/list

**Method：** GET

**接口描述：**


### 请求参数

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object []</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-0-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> learnType</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">学习类型</span></td><td key=5></td></tr><tr key=0-0-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> typeName</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">类型名称</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
# 任务管理

## 获取任务列表
<a id=获取任务列表> </a>
### 基本信息

**Path：** /visualmodule/job/list

**Method：** GET

**接口描述：**
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>jobStatus</td>
<td>0-准备中 / 1-等待中 / 2-运行中 / 3-已中止 / 4-成功 / 5-失败</td>
</tr>
</tbody>
</table>


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| expId | 是  |   |  实验ID |
| page | 否  |   |  当前页数 |
| limit | 否  |   |  每页限制条数 |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object []</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">结果集合</span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-0-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> jobId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">任务ID</span></td><td key=5></td></tr><tr key=0-0-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> jobStatus</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">任务状态</span></td><td key=5></td></tr><tr key=0-0-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> createTime</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">创建时间</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> page</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">当前页数</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> limit</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">当前数据量</span></td><td key=5></td></tr><tr key=0-3><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> total</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">总数据量</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 获取任务详情
<a id=获取任务详情> </a>
### 基本信息

**Path：** /visualmodule/job/{jobId}

**Method：** GET

**接口描述：**
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>jobStatus</td>
<td>0-准备中 / 1-等待中 / 2-运行中 / 3-已中止 / 4-成功 / 5-失败</td>
</tr>
<tr>
<td>jobPattern</td>
<td>0-预测 / 1-训练</td>
</tr>
<tr>
<td>nodeStatus</td>
<td>1-等待中 / 2-运行中 / 3-已中止 / 4-成功 / 5-失败</td>
</tr>
</tbody>
</table>


### 请求参数
**路径参数**

| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ |
| jobId |   |   |

### 返回数据

```javascript
{
   "jobId": 10,
   "jobStatus": 1,
   "jobPattern": 1,
   "expId": 1,
   "createTime": "",
   "updateTime": "",
   "graph": [
      {
         "topPx": 100,
         "leftPx": 100,
         "nodeId": 20,
         "nodeStatus": 1,
         "nodeEdge": [
            {
               "from_id": "",
               "from_port": "",
               "to_id": "",
               "to_port": ""
            }
         ],
         "nodeAttr": [
            {
               "key": "",
               "value": ""
            },
            {
               "key": "data_id",
               "value": null
            }
         ],
         "cpntInfo": {
            "period": "",
            "clazzname": "",
            "uuid": "",
            "desc": "",
            "ports": {
               "in": [
                  {
                     "name": "",
                     "dtype": ""
                  }
               ],
               "out": [
                  {
                     "name": "",
                     "dtype": ""
                  }
               ]
            },
            "params": [
               {
                  "name": "",
                  "hint": "",
                  "desc": "",
                  "ptype": "",
                  "default": "",
                  "is_required": true,
                  "front": "",
                  "is_edit": true
               }
            ]
         }
      }
   ]
}
```
## 获取任务状态
<a id=获取任务状态> </a>
### 基本信息

**Path：** /visualmodule/job/status/{jobId}

**Method：** GET

**接口描述：**
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><span class="colour" style="color:rgb(85, 85, 85)">jobStatus</span></td>
<td>0-准备中 / 1-等待中 / 2-运行中 / 3-已中止 / 4-成功 / 5-失败</td>
</tr>
<tr>
<td><span class="colour" style="color:rgb(85, 85, 85)">nodeStatus</span></td>
<td>1-等待中 / 2-运行中 / 3-已中止 / 4-成功 / 5-失败</td>
</tr>
</tbody>
</table>


### 请求参数
**路径参数**

| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ |
| jobId |   |   |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> jobId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">任务ID</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> jobStatus</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">任务状态</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> graph</span></td><td key=1><span>object []</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-2-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> nodeId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">节点ID</span></td><td key=5></td></tr><tr key=0-2-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> nodeStatus</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">节点状态</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 获取任务指标
<a id=获取任务指标> </a>
### 基本信息

**Path：** /visualmodule/job/index

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| jobId | 是  |   |  任务ID |
| nodeId | 是  |   |  节点ID |
| portName | 是  |   |  端口名称 |

### 返回数据

```javascript
[
   {
      "data": {
         "x": [
            1,
            2,
            3,
            4,
            5
         ],
         "y": [
            0.1,
            0.2,
            0.3,
            0.4,
            0.5
         ],
         "x_label": "epochs",
         "y_label": "accuracy",
         "title": "epochs-accuracy"
      },
      "front": "curve"
   },
   {
      "data": {
         "col1": [
            1,
            2,
            3
         ],
         "col2": [
            3,
            4,
            5
         ]
      },
      "front": "table"
   },
   {
      "data": {
         "x": [
            1,
            2,
            3,
            4,
            5
         ],
         "y": {
            "train": [
               0.2,
               0.3,
               0.4,
               0.5,
               0.6
            ],
            "val": [
               0.1,
               0.2,
               0.3,
               0.4,
               0.5
            ]
         },
         "x_label": "epochs",
         "y_label": "accuracy",
         "title": "epochs-accuracy"
      },
      "front": "multi_curve"
   }
]
```
## 获取任务统计数据
<a id=获取任务统计数据> </a>
### 基本信息

**Path：** /visualmodule/job/statistic

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| jobId | 是  |   |  任务ID |
| nodeId | 是  |   |  节点ID |
| portName | 是  |   |  端口名称 |

### 返回数据

```javascript
[]
```
## 查看任务日志
<a id=查看任务日志> </a>
### 基本信息

**Path：** /visualmodule/job/log

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| jobId | 是  |   |  任务ID |
| offset | 是  |   |  偏移量 |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> jobId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">任务ID</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> content</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">日志内容</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> offset</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">偏移量</span></td><td key=5></td></tr><tr key=0-3><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> isEnd</span></td><td key=1><span>boolean</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">结束标识</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 下载任务模型
<a id=下载任务模型> </a>
### 基本信息

**Path：** /visualmodule/job/download/model

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| jobId | 是  |   |  任务ID |
| nodeId | 是  |   |  节点ID |
| portName | 是  |   |  端口名称 |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>
            
## 下载任务工作流
<a id=下载任务工作流> </a>
### 基本信息

**Path：** /visualmodule/job/download/pipeline

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| jobId | 是  |   |  任务ID |
| nodeId | 是  |   |  节点ID |
| portName | 是  |   |  端口名称 |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>
            
## 添加任务
<a id=添加任务> </a>
### 基本信息

**Path：** /visualmodule/job

**Method：** POST

**接口描述：**
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>jobPattern</td>
<td>0-预测 / 1-训练</td>
</tr>
</tbody>
</table>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "expId": 1,
   "jobPattern": 1,
   "graph": [
      {
         "topPx": 100,
         "leftPx": 100,
         "nodeEdge": [
            {
               "from_id": "",
               "from_port": "",
               "to_id": "",
               "to_port": ""
            }
         ],
         "nodeAttr": [
            {
               "key": "",
               "value": ""
            },
            {
               "key": "data_id",
               "value": null
            }
         ],
         "cpntInfo": {
            "period": "",
            "clazzname": "",
            "uuid": "",
            "desc": "",
            "ports": {
               "in": [
                  {
                     "name": "",
                     "dtype": ""
                  }
               ],
               "out": [
                  {
                     "name": "",
                     "dtype": ""
                  }
               ]
            },
            "params": [
               {
                  "name": "",
                  "hint": "",
                  "desc": "",
                  "ptype": "",
                  "default": "",
                  "is_required": true,
                  "front": "",
                  "is_edit": true
               }
            ]
         }
      }
   ]
}
```
### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> jobId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">任务ID</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 编辑任务
<a id=编辑任务> </a>
### 基本信息

**Path：** /visualmodule/job

**Method：** PUT

**接口描述：**
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><span class="colour" style="color: rgb(85, 85, 85);">jobPattern</span></td>
<td><span class="colour" style="color: rgb(85, 85, 85);">0-预测 / 1-训练</span></td>
</tr>
</tbody>
</table>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
  "jobId": 1,
  "jobPattern": 1,
  "graph": [
    {
      "topPx": 100, //新增必填，更新必填，删除为空
      "leftPx": 100, //新增必填，更新必填，删除为空
      "nodeId": 20, //新增为空，更新必填，删除必填
      "isDelete": true, //必填项
      "nodeEdge": [ //新增必填，更新必填，删除为空
        {
          "from_id": "",
          "from_port": "",
          "to_id": "",
          "to_port": ""
        }
      ],
      "nodeAttr": [ //新增必填，更新必填，删除为空
        {
          "key": "",
          "value": ""
        },
        {
          "key": "data_id",
          "value": null
        }
      ],
      "cpntInfo": { //新增必填，更新必填，删除为空
        "period": "",
        "clazzname": "",
        "uuid": "",
        "desc": "",
        "ports": {
          "in": [
            {
              "name": "",
              "dtype": ""
            }
          ],
          "out": [
            {
              "name": "",
              "dtype": ""
            }
          ]
        },
        "params": [
          {
            "name": "",
            "hint": "",
            "desc": "",
            "ptype": "",
            "default": "",
            "is_required": true,
            "front": "",
            "is_edit": true
          }
        ]
      }
    }
  ]
}
```
### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>
            
## 删除任务
<a id=删除任务> </a>
### 基本信息

**Path：** /visualmodule/job/{jobId}

**Method：** DELETE

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/x-www-form-urlencoded | 是  |   |   |
**路径参数**

| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ |
| jobId |   |   |
**Body**

```javascript
{"type":"object","title":"empty object","properties":{"expId":{"type":"integer","description":"实验ID"}},"required":["expId"]}
```
### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>
            
## 运行任务
<a id=运行任务> </a>
### 基本信息

**Path：** /visualmodule/job/run

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> jobId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">任务ID</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 停止任务
<a id=停止任务> </a>
### 基本信息

**Path：** /visualmodule/job/stop

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> jobId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">任务ID</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>
            
# 数据集管理

## 添加数据集
<a id=添加数据集> </a>
### 基本信息

**Path：** /visualmodule/dataset

**Method：** POST

**接口描述：**
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>dataType</td>
<td>1-图片 / 2-CSV</td>
</tr>
<tr>
<td>dataSource</td>
<td>0-预置 / 1-自定义</td>
</tr>
</tbody>
</table>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> dataType</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">数据类型</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> dataSource</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">数据来源</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> dataId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">数据集ID</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 清空数据集
<a id=清空数据集> </a>
### 基本信息

**Path：** /visualmodule/dataset/clear

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> dataId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">数据集ID</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>
            
## 删除数据集
<a id=删除数据集> </a>
### 基本信息

**Path：** /visualmodule/dataset/{dataId}

**Method：** DELETE

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/x-www-form-urlencoded | 是  |   |   |
**路径参数**

| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ |
| dataId |   |  数据集ID |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>
            
### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>
            
## 上传数据集文件
<a id=上传数据集文件> </a>
### 基本信息

**Path：** /visualmodule/dataset/file

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  multipart/form-data | 是  |   |   |
**Body**

| 参数名称  | 参数类型  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| dataId | text  |  是 |    |  数据集ID |
| file | file  |  是 |    |  文件 |
| fileMd5 | text  |  是 |    |  文件MD5 |
| fileName | text  |  是 |    |  文件名称 |
| fragmentMd5 | text  |  是 |    |  文件分片MD5 |
| fragmentName | text  |  是 |    |  文件分片名称 |
| fragmentIndex | text  |  是 |    |  文件分片下标 |
| fragmentCount | text  |  是 |    |  文件分片数量 |



### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>
            
## 获取数据集文件下一个分片下标
<a id=获取数据集文件下一个分片下标> </a>
### 基本信息

**Path：** /visualmodule/dataset/file/nextIndex

**Method：** GET

**接口描述：**
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><span class="colour" style="color:rgb(94, 110, 94)">nextIndex</span></td>
<td><span class="colour" style="color:rgb(94, 110, 94)">0-未上传 / -1-上传完毕 / x-下标</span></td>
</tr>
</tbody>
</table>


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| dataId | 是  |   |  数据集ID |
| fileMd5 | 是  |   |  文件MD5 |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> nextIndex</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">下一个分片下标</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 获取数据状态列表
<a id=获取数据状态列表> </a>
### 基本信息

**Path：** /visualmodule/dataset/status/list

**Method：** GET

**接口描述：**


### 请求参数

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object []</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-0-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> dataStatus</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">数据状态</span></td><td key=5></td></tr><tr key=0-0-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> statusName</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">状态名称</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 获取数据类型列表
<a id=获取数据类型列表> </a>
### 基本信息

**Path：** /visualmodule/dataset/type/list

**Method：** GET

**接口描述：**


### 请求参数

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object []</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-0-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> dataType</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">数据类型</span></td><td key=5></td></tr><tr key=0-0-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> typeName</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">类型名称</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 获取数据集详情
<a id=获取数据集详情> </a>
### 基本信息

**Path：** /visualmodule/dataset/{dataId}

**Method：** GET

**接口描述：**
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>dataStatus</td>
<td>1-未上传 / 2-上传中 / 3-已上传 / 4-处理中</td>
</tr>
<tr>
<td>dataType</td>
<td>1-图片 / 2-CSV</td>
</tr>
<tr>
<td>dataSource</td>
<td>0-预置 / 1-自定义</td>
</tr>
</tbody>
</table>


### 请求参数
**路径参数**

| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ |
| dataId |   |  数据集ID |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> dataId</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">数据集ID</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> dataSize</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">数据大小</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> dataName</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">数据名称</span></td><td key=5></td></tr><tr key=0-3><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> dataStatus</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">数据状态</span></td><td key=5></td></tr><tr key=0-4><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> dataType</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">数据类型</span></td><td key=5></td></tr><tr key=0-5><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> dataSource</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">数据来源</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 获取数据来源列表
<a id=获取数据来源列表> </a>
### 基本信息

**Path：** /visualmodule/dataset/source/list

**Method：** GET

**接口描述：**


### 请求参数

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object []</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap"></span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-0-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> dataSource</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">数据来源</span></td><td key=5></td></tr><tr key=0-0-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> sourceName</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">来源名称</span></td><td key=5></td></tr>
               </tbody>
              </table>
            
## 查看CSV文件内容
<a id=查看CSV文件内容> </a>
### 基本信息

**Path：** /visualmodule/dataset/csv

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| dataId | 是  |   |  数据集ID |
| page | 否  |   |  当前页数 |
| limit | 否  |   |  每页限制条数 |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>array []</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">结果集合</span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>array</span></p></td></tr><tr key=array-4><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> </span></td><td key=1><span></span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">行数据集</span></td><td key=5></td></tr><tr key=array-3><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> </span></td><td key=1><span></span></td><td key=2>非必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">行数据</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> page</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">当前页数</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> limit</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">当前数据量</span></td><td key=5></td></tr><tr key=0-3><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> total</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span style="white-space: pre-wrap">总数据量</span></td><td key=5></td></tr>
               </tbody>
              </table>
            