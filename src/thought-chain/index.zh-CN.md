---
category: Components
group:
  title: 确认
  order: 3
title: ThoughtChain
subtitle: 思维链
description: 思维链组件用于可视化和追踪 Agent 对 Actions 和 Tools 的调用链。
cover: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*GaspS5T6proAAAAAAAAAAAAADgCCAQ/original
coverDark: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*siL-Qpl794sAAAAAAAAAAAAADgCCAQ/original
demo:
  cols: 1
---

## 何时使用

- 调试和跟踪复杂 Agent System 中的调用链
- 类似的链式场景中使用

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx" background="grey">基本</code>
<code src="./demo/size.tsx" background="grey">尺寸</code>
<code src="./demo/status.tsx" background="grey">节点状态</code>
<code src="./demo/collapsible.tsx" background="grey">可折叠的</code>
<code src="./demo/customization.tsx" background="grey">客制化</code>
<code src="./demo/nested.tsx" background="grey">嵌套使用</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### ThoughtChainProps

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| collapsible | 是否可折叠 | boolean \| CollapsibleOptions | - | - |
| classNames | 语义化结构的类名 | Record<'item' \| 'itemHeader' \| 'itemContent' \| 'itemFooter', string> | - | - |
| items | 思维节点集合 | ThoughtChainItem[] | - | - |
| prefixCls | 自定义前缀 | string | - | - |
| rootClassName | 自定义根类名 | string | - | - |
| size | 尺寸 | 'large' \| 'middle' \| 'small' | 'middle' | - |
| styles | 语义化结构的样式 | Record<'item' \| 'itemHeader' \| 'itemContent' \| 'itemFooter', React.CSSProperties> | - | - |

### ThoughtChainItem

| 属性        | 说明               | 类型                              | 默认值 | 版本 |
| ----------- | ------------------ | --------------------------------- | ------ | ---- |
| content     | 思维节点内容       | React.ReactNode                   | -      | -    |
| description | 思维节点描述       | React.ReactNode                   | -      | -    |
| extra       | 思维节点额外内容   | React.ReactNode                   | -      | -    |
| footer      | 思维节点脚注       | React.ReactNode                   | -      | -    |
| icon        | 思维节点图标       | React.ReactNode                   | -      | -    |
| key         | 思维节点唯一标识符 | string                            | -      | -    |
| status      | 思维节点状态       | 'pending' \| 'success' \| 'error' | -      | -    |
| title       | 思维节点标题       | React.ReactNode                   | -      | -    |

### CollapsibleOptions

| 属性         | 说明                   | 类型                             | 默认值 | 版本 |
| ------------ | ---------------------- | -------------------------------- | ------ | ---- |
| expandedKeys | 当前展开的节点         | string[]                         | -      | -    |
| onExpand     | 展开节点变化的回调函数 | (expandedKeys: string[]) => void | -      | -    |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）

<ComponentTokenTable component="ThoughtChain"></ComponentTokenTable>
