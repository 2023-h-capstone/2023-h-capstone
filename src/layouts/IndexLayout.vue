<template>
  <q-layout view="lHh Lpr lFf" class="column justify-center items-center">
    <div class="q-pa-md q-gutter-sm">
      <router-link to="/main">
        <q-btn size="60px" round color="deep-orange" icon="edit_location" />
      </router-link>
    </div>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'IndexLayout',
  components: {},

  setup() {
    return {
      $q: useQuasar(),
    };
  },
});
</script>
