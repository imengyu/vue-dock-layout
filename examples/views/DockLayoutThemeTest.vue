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
      <template v-else-if="panel.key==='panel4'">
        <h1>Tab Content</h1>
        <span>咏萤虞世南〔唐代〕<br>的历流光小，<br>飘飖弱翅轻。<br>恐畏无人识，<br>独自暗中明。</span>
      </template>
      <template v-else-if="panel.key==='panel5'">
        <codemirror
          v-model="code"
          placeholder="Code goes here..."
          :style="{ height: '100%' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="extensions"
        />
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
import { DockLayoutInterface } from '../../src/DockLayoutData';
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'

export default defineComponent({
  components: {
    DockLayout,
    Codemirror,
  },
  setup() {
    const dockLayout = ref<DockLayoutInterface>();

    const code = ref(`console.log('Hello, world!')`)
    const extensions = [javascript()];

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
      dockLayout.value?.addPanels([
        {
          key: 'panel3',
          title: 'panel3',
        },
      ], 'leftB');
      dockLayout.value?.addPanels([
        {
          key: 'panel4',
          title: 'panel14',
        },
      ], 'right');
      dockLayout.value?.addPanel({
        key: 'panel5',
        title: 'panel5',
      }, 'center');

    });

    return {
      dockLayout,
      code,
      extensions,
    };
  },
});
</script>