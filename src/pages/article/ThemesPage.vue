<template>
  <q-layout style="text-align: left; padding-top: 4rem; padding-left: 1rem; padding-right: 1rem">
    <q-list bordered>
      <q-item
        v-for="(place, key) in places"
        v-bind:key="key"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label style="font-size: 20px">{{ place.name }}</q-item-label>
          <q-item-label style="font-size: 15px" caption lines="1">
            <span v-for="(tag, key) in place.tags" v-bind:key="key">
              {{ tag }}
            </span>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-radio v-model="shape" :val="key" />
        </q-item-section>
      </q-item>
      <q-separator />
    </q-list>
  </q-layout>
  <q-footer reveal elevated class="bg-black justify-end">
    <q-toolbar class="justify-between">
      <div class="flex items-center justify-end" style="width: 100%">
        <q-btn
          to="/article/write"
          icon="keyboard_tab"
          color="white"
          text-color="black"
          label="계속 작성하기"
        />
      </div>
    </q-toolbar>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { myPlaces } from 'assets/ContentModel';

export default defineComponent({
  name: 'ArticlePage',
  components: {},
  setup() {
    return {
      shape: ref(null),
      fixed: ref(false),
    };
  },
  data() {
    return {
      contentStyle: {
        width: '100%',
        height: '100vh',
        display: 'block',
      },
      places: ref<
        | [
            {
              id: number;
              name: string;
              tags: [];
            }
          ]
        | any
      >(),
      title: ref<string>(''),
      tag: ref<string>(''),
      tags: ref<string[]>([]),
    };
  },
  async mounted() {
    this.places = [...myPlaces];
    this.$q.loading.show();
    this.$q.loading.hide();
  },
  methods: {
    addTag: function () {
      if (this.tags.length == 0) {
        return;
      }
      this.places.push({
        id: 0,
        name: this.title,
        tags: this.tags,
      });
      this.tags = [];
      this.title = '';
    },
  },
});
</script>
