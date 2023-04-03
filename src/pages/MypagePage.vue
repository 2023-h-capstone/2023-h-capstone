<template>
<q-layout style="text-align: center; padding-top: 5vh; padding-left:25rem;">
  <q-avatar size="250px" style="text-align: center;">
      <img src='../assets/profileTest.jpg'>
    </q-avatar>
    <div style="font-size: 2em; font-weight: bolder;padding-bottom: 2em;">사용자 닉네임1</div>

    <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>

        <q-item-section>Icon as avatar(여기부터는)</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="teal" text-color="white" icon="bluetooth" />
        </q-item-section>

        <q-item-section>Avatar-type icon(테스트)</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar rounded color="purple" text-color="white" icon="bluetooth" />
        </q-item-section>

        <q-item-section>Rounded avatar-type icon(내용입니다)</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            R
          </q-avatar>
        </q-item-section>

        <q-item-section>Letter avatar-type(진행 중)</q-item-section>
      </q-item>

      <q-separator />


</q-layout>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import {useQuasar} from 'quasar';
  
  
  export default defineComponent({
    name: 'MypagePage',
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