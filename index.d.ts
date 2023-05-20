import DockLayout from './lib/DockLayout.vue'
import DockPanelDefaultTab from './lib/DockPanelDefaultTab.vue'
import DockPanelHost from './lib/DockPanelHost.vue'
import DockSplit from './lib/DockSplit.vue'

declare module 'vue-dock-layout' {
}

export * from './lib/DockHostData'
export * from './lib/DockLayoutData'

export {
  DockLayout,
  DockSplit,
  DockPanelHost,
  DockPanelDefaultTab,
}

export default DockLayout;