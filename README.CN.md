vue-dock-layout
---

一个Vue3的可拖拽网格布局组件(类似Visual studio)

![Screenshot](./demo.jpg)

---

[查看文档](https://imengyu.top/pages/vue-dock-layout-doc/zh)

[查看在线示例](https://imengyu.top/pages/vue-dock-layout-demo/)

> **本项目目前还处于早期发布阶段，可能会存在不少问题，如果遇到问题，欢迎在 [Github](https://github.com/imengyu/vue-dock-layout/issues) 提出 Issue，我会尽量为你解决！**

## 特性

* 体积小，易用
* 可自定义

### 安装

```
npm install -save @imengyu/vue-dock-layout
```

## 使用方法

### 先导入

```ts
import { DockLayout, DockLayoutInterface } from '@imengyu/vue-dock-layout';   
```

### 制作布局

要使用 vue-dock-layout ，你需要先在您的界面中添加一个容器组件，这是您的应用的内容承载区域。

```html
<template>
  <DockLayout ref="dockLayout" class="full">
    <template #panelRender="{ panel }">
      <template v-if="panel.key==='panel1'">
        <h1>Tab Content</h1>
        <span>This is first tab</span>
      </template>
      <template v-else-if="panel.key==='panel2'">
        <h1>Tab Content</h1>
        <span>This is second tab</span>
      </template>
      <template v-else-if="panel.key==='panel3'">
        <h1>Tab Content</h1>
        <span>This is third tab</span>
        <img src="https://imengyu.top/assets/images/test/1.jpg" />
      </template>
    </template>
  </DockLayout>
</template>
```

布局组件的布局是以网格为布局方式的，每个分割区域为一个网格，网格中嵌入您的自定义内容。

组件提供了一些接口，允许您以编程方式快速设置界面布局：

```ts
const dockLayout = ref<DockLayoutInterface>();

onMounted(() => {
  nextTick(() => {
    //这里先设置界面布局
    //这里先添加了一个横向布局，中有三个区域，left/center/right，宽度占比为20%：60%：20%
    //然后left区域又被分割为了leftA/leftB两个区域，宽度为50%：50%
    dockLayout.value?.setData({
      name: 'root',
      size: 0,
      grids: [
        {
          size: 20,
          name: 'left',
          grids: [
            {
              size: 50,
              name: 'leftA',
            },
            {
              size: 50,
              name: 'leftB',
            },
          ]
        },
        {
          size: 60,
          name: 'center',
          //这里设置了中心区域没有面板时不会被自动移除
          alwaysVisible: true,
        },
        {
          size: 20,
          name: 'right',
        },
      ],
    });
    //下方代码向面板添加内容窗口
    //每个内容窗口以key作为标识符，在 DockLayout 的 panelRender 插槽中可以从 panel 参数中读取。
    dockLayout.value?.addPanels([
      {
        key: 'panel1',
        title: 'panel1',
      },
      {
        key: 'panel2',
        title: 'panel2',
      },
    ], 'leftA');
    dockLayout.value?.addPanels([
      {
        key: 'panel3',
        title: 'panel3',
      },
    ], 'leftB');
  })
});
```

以上示例可以在 [在线示例](https://imengyu.top/pages/vue-dock-layout-demo/) 中的第一个示例找到。

用户可以自定义拖拽界面。因此在程序离开时，如果您需要保存用户的自定义设置，可读取当前网格布局数据，
在下次程序加载时设置到组件中。

```js
onBeforeUnmount(() => {
  const layoutData = dockLayout.value?.getSaveData()
  //Save layoutData to anywhere...

  //Next time, load and set to dockLayout
  dockLayout.value?.setData(layoutData);
})
```

### 自定义

#### 主题

组件默认提供了 亮色（`light`）与 暗色 （`dark`）两个主题供您使用，主题可以使用 `DockLayout` 组件的 `theme` 属性指定。

```html
<DockLayout ref="dockLayout" theme="light">
  ...
</DockLayout>
```

两个主题效果如下图所示：

|light|dark|
|---|---|
|![Screenshot](./demo.light.jpg)|![Screenshot](./demo.jpg)|

#### 自定义渲染

组件提供了一些位置的渲染插槽，你可以进行自定义渲染。

具体示例和源码请[查看在线示例](https://imengyu.top/pages/vue-dock-layout-demo/#/DockLayoutThemeTest)

##### tabItemRender

用于面板标题的自定义渲染。

```vue
<DockLayout ref="dockLayout" class="full">
  <template #tabItemRender="{ dockData, panel, onTabItemMouseDown, onTabItemDragStart, onTabItemDragEnd }">
    <div
      :class="'my-custom-tab drag-target-tab ' + (dockData.activeTab === panel ? 'active' : '')"
      draggable="true" 
      @mousedown="onTabItemMouseDown($event, panel)"
      @dragstart="onTabItemDragStart($event, panel)"
      @dragend="onTabItemDragEnd($event)"
    >
      {{ panel.title }}
    </div>
  </template>
</DockLayout>
```

##### emptyPanel

用于渲染面板没有内容窗口时显示的底板。

```vue
<DockLayout ref="dockLayout" class="full">
  <template #emptyPanel="{ dockData }">
    <div>
      <h1>{{dockData.name}}</h1>
      <h1>This grid won't be removed from layout even when last Tab is closed</h1>
    </div>
  </template>
</DockLayout>
```

## 支持

作者开发不易，如果这个项目对您有帮助，希望你可以帮我点个 ⭐ ，这将是对我极大的鼓励。谢谢啦 (●'◡'●)

## Changelog

[Changelog](./CHANGELOG.md)

## 作者的其他项目

* [vue3-context-menu 一个简洁美观简单的Vue3右键菜单组件](https://github.com/imengyu/vue3-context-menu/)
* [vue-dynamic-form 一款Vue3动态表单渲染库](https://github.com/imengyu/vue-dynamic-form)
