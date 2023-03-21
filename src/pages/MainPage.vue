<template>
  <q-page class="row items-center justify-evenly">
    <router-view></router-view>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainPage',
  components: { },
  setup () {
    return {};
  }
});
</script>
