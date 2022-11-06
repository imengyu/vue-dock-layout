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
      <template v-else-if="panel.key==='panel4'">
        <h1>Tab Content</h1>
        <span>咏萤虞世南〔唐代〕<br>的历流光小，<br>飘飖弱翅轻。<br>恐畏无人识，<br>独自暗中明。</span>
      </template>
      <template v-else-if="panel.key.indexOf('panelCenter') === 0">
        <h1>Tab {{panel.key}}</h1>
        <span>咏萤虞世南〔唐代〕<br>的历流光小，<br>飘飖弱翅轻。<br>恐畏无人识，<br>独自暗中明。</span>
      </template>
    </template>
    <template #emptyPanel="{ dockData }">
      <div>
        <h1>{{dockData.name}}</h1>
        <h1>This grid won't be removed from layout even when last Tab is closed</h1>
        <h1>This grid is restricted that only panels taged <code>centerTab</code> can be placed</h1>
        <button @click="onAddTab(dockData)">Add a tab</button>
      </div>
    </template>
    <template #tabExtraRender="{ dockData }">
      <template v-if="dockData.tag==='center'">
        <!--We render some custom content in the upper right corner of this grid-->
        <div class="my-addition-buttons">
          <span>Here is custom content -></span>
          <button @click="onAddTab(dockData)">Add a tab</button>
        </div>
      </template>
    </template>
  </DockLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import DockLayout from '../../src/DockLayout.vue';
import { DockData, DockLayoutInterface } from '../../src/DockLayoutData';

export default defineComponent({
  components: {
    DockLayout,
  },
  setup() {
    const dockLayout = ref<DockLayoutInterface>();

    onMounted(() => {
      //Add base layout
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
                acceptPanelTags: [ 'simpleTab' ],
              },
              {
                size: 50,
                name: 'leftB',
                acceptPanelTags: [ 'simpleTab' ],
              },
            ]
          },
          {
            size: 60,
            name: 'center',
            tag: 'center',
            alwaysVisible: true,
            allowDep: false,
            acceptPanelTags: [ 'centerTab' ],
          },
          {
            size: 20,
            name: 'right',
            acceptPanelTags: [ 'simpleTab' ],
          },
        ],
      });

      //Add panels
      dockLayout.value?.addPanels([
        {
          key: 'panel1',
          title: 'panel1',
          tag: 'simpleTab',
        },
        {
          key: 'panel2',
          title: 'panel2',
          tag: 'simpleTab',
        },
      ], 'leftA');
      dockLayout.value?.addPanels([
        {
          key: 'panel3',
          title: 'panel3',
          tag: 'simpleTab',
        },
      ], 'leftB');
      dockLayout.value?.addPanels([
        {
          key: 'panel4',
          title: 'panel14',
          tag: 'simpleTab',
        },
      ], 'right');
      dockLayout.value?.addPanel({
        key: 'panelCenter0',
        title: 'panel5',
        tag: 'centerTab',
        closeable: true,
      }, 'center');

    });

    let panelId = 0;

    function onAddTab(dockData: DockData) {
      panelId++;
      //add new panel
      dockLayout.value?.addPanel({
        key: 'panelCenter' + panelId,
        title: 'panel ' + panelId,
        tag: 'centerTab',
        closeable: true, //this tab can be close
      }, dockData);
      //select it
      dockLayout.value?.activePanel('panelCenter' + panelId);
    }

    return {
      dockLayout,
      onAddTab,
    };
  },
});
</script>

<style lang="scss">
.my-addition-buttons {
  display: inline-block;   
  padding: 2px;
  border: 1px solid #f00;
}
</style>