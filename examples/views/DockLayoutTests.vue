<template>
  <div class="full dock-test">
    <div class="test-top">
      <h1>DockLayout</h1>
      <router-link :to="{ name: 'DockLayoutBaseTest' }">Base useage</router-link>
      <router-link :to="{ name: 'DockLayoutThemeTest' }">Light Theme</router-link>
      <router-link :to="{ name: 'DockLayoutExtraTest' }">Extra useage</router-link>
      <router-link :to="{ name: 'DockLayoutCustomTest' }">Custom render</router-link>
      <router-link :to="{ name: 'DockLayoutDataTest' }">Data load and save</router-link>
    </div>
    <div class="test-host">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>

<style lang="scss">
.full {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.dock-test {
  color: #fff;

  .light {
    color: #000;
  }

  .test-host {
    position: absolute;
    top: 50px;
    left: 120px;
    right: 20px;
    bottom: 20px;
    border: 2px solid #1a7ff1;
  }
  .test-top {
    position: absolute;
    top: 0;
    left: 120px;
    right: 20px;
    height: 40px;
    z-index: 10;

    h1 {
      display: inline-block;
      margin: 0;
      color: #000;
    }
    a {
      margin: 0 20px;
      color: #1a7ff1;
      text-decoration: underline;
    }
  }

  img {
    width: 300px;
  }
}
</style>
