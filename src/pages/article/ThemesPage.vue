<template>
  <q-layout style="text-align: right; padding-top: 5vh">
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
  <q-footer reveal elevated class="bg-cyan-8 justify-end">
    <q-toolbar class="justify-between">
      <div class="flex items-center" style="width: 100%;">
        <q-btn icon="add" color="white" text-color="black" @click="fixed = true" label="추가하기" />
      </div>
      <div class="flex items-center justify-end" style="width: 100%;">
        <q-btn to="/article/write" icon="keyboard_tab" color="white" text-color="black" label="계속 작성하기" />
      </div>
    </q-toolbar>
    <q-dialog v-model="fixed">
      <q-card style="width: 90%;">
        <q-card-section>
          <div class="text-h6">태그 추가하기</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh; height: 50vh" class="scroll">
          <q-input outlined v-model="title" label="제목" />
          <q-input bottom-slots v-model="tag" counter maxlength="12">
            <template v-slot:hint>
              태그를 추가해주세요
            </template>
            <template v-slot:after>
              <q-btn
                @click="() => { this.tags.push('#'+this.tag); this.tag = '' }"
                round dense flat icon="send" />
            </template>
          </q-input>
          <q-list>
            <q-item clickable v-for="(tag, idx) in tags" @click="this.tags.splice(idx, 1)" v-bind:key="idx">
              <q-item-section avatar>
                <q-icon color="primary" name="local_bar" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{tag}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="추가" color="primary" @click="addTag" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-footer>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import {myPlaces} from 'assets/ContentModel';

export default defineComponent({
  name: 'ArticlePage',
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
