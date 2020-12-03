Introduction
--------------
Detail for attributes of all workflow components, the formation like `ml-render.json`. There are four Level-1 modules:
1. `dataio`: contain all data input components
2. `preprocess`: contain all data preprocessing components
3. `algorithm`: contain all machine learning components implemented by `scikit-learning` (include DL?)
4. `evaluation`: contain all metric evaluated components

Meanwhile, there are two main modules in `preprocess`:
1. Normalization: contain all data standard methods
2. FeatureProcess: contain all feature dimension reduction and feature importance calculated methods

There are three main modules in `algorithm`:
1. Classfication: contain all classification algorithms
2. Regression: contain all regression algorithms
3. Cluster: contain all clustering algorithms

There are three main modules in `evaluation`:
1. Classification: contain all classification metrics
2. Regression: contain all regression metrics
3. Cluster: contain all clustering metrics


Component Attributes
--------------------
Currently, there will be three level: Level-1, Level-2 and Level-3, and we will introduce these different level as follows:
1. Attributes in Level-1
1.1. `desc`: the presented name in web front. `type: str`
1.2. `children`: the sub-directory of current level. `type: list`
1.3. `name`: the varible name. `type: str`
2. Attributes in Level-2 (Note: some attributes may be None or Empty)
2.1. `hint`: the prompt information for user. `type: str`
2.2. `desc`: the presented name in web front. `type: str`
2.3. `ptype`: the type of current element. `type: str`
2.4. `is_required`: whether required or not. `type: bool`
2.5. `default`: the default value of current element. `type: defined by @type`
2.6. `enum`: the candidate value. `type: list`
2.7. `min_value`: the minimum value of current element. `type: defined by @type`
2.8. `max_value`: the maximum value of current element. `type: defined by @type`
2.9. `validate`: a defined validator for current element. `type: str` (deprecated)
2.10. `front`: the corresponding front html component. `type: str`
2.11. `item_type`: the type of each item in collection when @type is `List`. `type: str`
3. Attributes in Level-3
TODO


Attributes Detail
-------------------
As follows, we will introduce the candidation of some attributes in each level.
1. `type` in Level-2
`Unicode`, `Integer`, `Float`, `List`, `Boolean`
2. `is_required` in Level-2
`true`, `false`
3. `validate` in Level-2 (deprecated)
3.1. `IP`: web front will check whether the element is validated IP address.
3.2. `Password`: web front will hidden the element when user input a password.
4. `front` in Level-2
`TextBox`, `DropRadioBox`, `DropCheckBox`, `FeatureCheckBox`


Graph Json Detail
-------------------
There will generate a graph json file when user submit a workflow job, the formation like as `ml-graph.json`
it will contain some import features as follows:
1. `nodes`
1.1. `uuid`: the unique flag corresponding components. `type: str`
1.2. `name`: the component name for logger. `type: str`
1.3. `in`: the input ports of current component. `type: list`
1.4. `out`: the output ports of current component. `type: list`
1.5. `props`: the properties filled by user corresponding component. `type: dict`
1.6. `period`: the period in machine-learning or deep-learning pipeline. `type: str`
2. `edges`
2.1. `uuid`: the unique flag corresponding components. `type: str`
2.2. `source`: the source of current edge. `type: str`
    2.2.1. `uuid`: the uuid of source node
    2.2.2. `port`: the port name of source node
2.3. `target`: the target of current edge. `type: str`
    2.3.1. `uuid`: the uuid of target node
    2.3.2. `port`: the port name of target node
2.4. `name`: the edge name for logger. `type: str`
3. `props`
3.1. `job_id`: the id of the submitted job. `type: str`
3.2. `ai_type`: the framework used by current job. `type: str`

