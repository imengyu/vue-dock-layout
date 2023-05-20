import DockLayout from './src/DockLayout.vue'
import DockPanelDefaultTab from './src/DockPanelDefaultTab.vue'
import DockPanelHost from './src/DockPanelHost.vue'
import DockSplit from './src/DockSplit.vue'

declare module 'vue-dock-layout' {
}


export * from './src/DockHostData'
export * from './src/DockLayoutData'

export {
  DockLayout,
  DockSplit,
  DockPanelHost,
  DockPanelDefaultTab,
}
