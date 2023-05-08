<template>
  <div
    style="height: 100vh"
    class="flex row justify-center items-center content-center"
  >
    <router-link to="/main">
      <q-btn
        style="margin: auto"
        size="60px"
        round
        color="deep-orange"
        icon="edit_location"
      />
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    return {};
  },
});
</script>
