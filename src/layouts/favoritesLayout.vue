<template>
  <q-layout view="lHh Lpr lFf">
    <main-drawer/>
    <router-view/>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {useQuasar} from 'quasar';
import MainDrawer from 'components/MainDrawer.vue';


export default defineComponent({
  name: 'favoritesLayout',
  components: {MainDrawer},
  setup () {
    return {
    }
  },
  data() {
    return {
      //
    }
  },
  mounted() {
    //
  },
  methods: {
    //
  },
});
</script>
