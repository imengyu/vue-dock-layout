import DockLayout from './dist/DockLayout.vue'
import DockPanelDefaultTab from './dist/DockPanelDefaultTab.vue'
import DockPanelHost from './dist/DockPanelHost.vue'
import DockSplit from './dist/DockSplit.vue'

declare module 'vue-dock-layout' {
}

export * from './dist/DockHostData'
export * from './dist/DockLayoutData'

export {
  DockLayout,
  DockSplit,
  DockPanelHost,
  DockPanelDefaultTab,
}
