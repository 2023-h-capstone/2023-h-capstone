<template>
<q-layout style="text-align: center; padding-top: 1vh; padding-left:25rem;">
  <q-item style="text-align: center;">
    <q-avatar clickable v-ripple size="250px" style="text-align: center;">
        <img src='../assets/profileTest.jpg'>
    </q-avatar>
      
      <q-item-section style="text-align: left; font-size: 2em; font-weight: bolder;padding-bottom: 2em;">my_account_hello</q-item-section>
  

  <div style="padding-right: 16vh; padding-top: 14vh;" class="q-pa-md">
    <div class="q-gutter-y-md column">
      
      <q-toolbar class="text-black rounded-borders">

        <q-separator dark vertical inset />

        <q-btn style="font-weight: bolder;" stretch flat label="내 친구" />

        <q-separator dark vertical />

        <q-btn style="font-weight: bolder;" stretch flat label="새 게시글 작성" />

        <q-separator dark vertical />

        <q-btn style="font-weight: bolder;" stretch flat label="내 테마 모음" />

        <q-separator dark vertical />

        <q-btn style="font-weight: bolder;" stretch flat label="내 즐겨찾기 모음" />
      </q-toolbar>
    </div>
  </div>
</q-item>
    

<q-layout style="text-align: right; ">
    <q-list bordered>
      <q-item v-for="(place, key) in places" v-bind:key="key" class="q-my-sm" clickable v-ripple>
        <q-item-section>
          <q-item-label style="font-size: 20px;">{{ place.name }}</q-item-label>
          <q-item-label style="font-size: 15px;" caption lines="1">
              <span v-for="(tag, key) in place.tags" v-bind:key="key">
                {{tag}}
              </span>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-radio v-model="shape" :val="key"/>
        </q-item-section>
      </q-item>
      <q-separator/>
    </q-list>
  </q-layout>


</q-layout>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import {useQuasar} from 'quasar';
  import {myPlaces} from 'assets/ContentModel';

  
  
  export default defineComponent({
    name: 'MypagePage',
    components: { },
  setup () {
    return {
      shape: ref(null),
      fixed: ref(false),
    }
  },
  data() {
    return {
      contentStyle: {
        width: '100%',
        height: '100vh',
        display:'block',
      },
      places: ref<[{
        id: number,
        name: string,
        tags: [],
      }] | any>(),
      title: ref<string>(''),
      tag: ref<string>(''),
      tags: ref<string[]>([])
    }
  },
  async mounted() {
    this.places = [...myPlaces]
    this.$q.loading.show()
    this.$q.loading.hide()

  },
  methods: {
    addTag: function () {
      if(this.tags.length == 0) {
        return
      }
      this.places.push({
        id: 0,
        name: this.title,
        tags: this.tags
      })
      this.tags = []
      this.title = ''
    },
  },
});
  </script>