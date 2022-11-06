<template>
  <DockLayout ref="dockLayout" theme="light" class="full">
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
      <template v-else-if="panel.key==='panelControl'">
        <div style="flex:row">
          <button @click="saveLayout">Save Dock data to JSON</button>
          <button @click="loadLayout">Load Dock data from JSON and appily</button>
        </div>
        <codemirror
          v-model="code"
          placeholder="Code goes here..."
          :style="{ height: '90%' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="extensions"
        />
      </template>
      <template v-else-if="panel.key.indexOf('CenterPanel') === 0">
        <h1>Tab {{panel.key}}</h1>
        <span>咏萤虞世南〔唐代〕<br>的历流光小，<br>飘飖弱翅轻。<br>恐畏无人识，<br>独自暗中明。</span>
      </template>
    </template>
    <template #emptyPanel="{ dockData }">
      <div>
        <h1>{{dockData.name}}</h1>
        <h1>This grid won't be removed from layout even when last Tab is closed</h1>
      </div>
    </template>
  </DockLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import DockLayout from '../../src/DockLayout.vue';
import { DockLayoutInterface, IDockGrid } from '../../src/DockLayoutData';
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'

export default defineComponent({
  components: {
    DockLayout,
    Codemirror,
  },
  setup() {
    const dockLayout = ref<DockLayoutInterface>();

    const code = ref(`console.log('Hello, world!')`)
    const extensions = [json()];

    onMounted(() => {
      //加载基础布局
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
            alwaysVisible: true,
          },
          {
            size: 20,
            name: 'right',
          },
        ],
      });

      //加载面板
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
      dockLayout.value?.addPanel({
        key: 'panel3',
        title: 'panel3',
      }, 'leftB');
      dockLayout.value?.addPanel({
        key: 'panelControl',
        title: 'data control',
      }, 'right');
      dockLayout.value?.addPanels(new Array(15).fill(null).map((_, j) => ({
        key: 'CenterPanel' + j,
        title: 'Center Panel ' + j,
      })), 'center');

      saveLayout();
    });

    function saveLayout() {
      code.value = JSON.stringify(dockLayout.value?.getSaveData(), null, 2);
    }
    function loadLayout() {
      let layoutData : null|IDockGrid = null;
      try {
        layoutData = JSON.parse(code.value) as IDockGrid;
      } catch(e) {
        // eslint-disable-next-line no-alert
        alert('JSON.parse failed: ' + e);
      }
      if (layoutData) {
        dockLayout.value?.setData(layoutData);
      }
    }

    return {
      dockLayout,
      code,
      extensions,
      saveLayout,
      loadLayout,
    };
  },
});
</script>
