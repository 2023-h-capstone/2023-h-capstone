<template>
  <q-layout view="lHh Lpr lFf">
    <router-view />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import MainDrawer from 'components/MainDrawer.vue';

export default defineComponent({
  name: 'IndexLayout',

  setup() {
    return {
      $q: useQuasar(),
    };
  },
});
</script>
