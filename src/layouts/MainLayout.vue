<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-cyan-8">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar size="40px" style="margin: 10px;">
            <img src="https://i.pinimg.com/564x/6c/ab/38/6cab3803e1d182a6c2e53fc62e821efa.jpg">
          </q-avatar>
        </q-toolbar-title>
        <q-input style="width: 70%;" filled v-model="text" label="Label" :dense="dense">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>
    <q-footer reveal elevated class="bg-cyan-8">
      <q-toolbar>
        <div style="width: 20%;">
          <q-btn flat round color="red" size="1.5rem" icon="favorite" />
          <q-btn flat round color="yellow" size="1.5rem" icon="grade" />
        </div>
        <q-list style="width: 80%;" class="flex row justify-center">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="local_bar" />
            </q-item-section>
            <q-item-section>
              <q-item-label>#가성비</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="local_gas_station" />
            </q-item-section>
            <q-item-section>
              <q-item-label>#분식</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="amber" name="local_movies" />
            </q-item-section>
            <q-item-section>
              <q-item-label>#떡볶이</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="local_bar" />
            </q-item-section>
            <q-item-section>
              <q-item-label>#튀김</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="local_gas_station" />
            </q-item-section>
            <q-item-section>
              <q-item-label>#김밥</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-toolbar>
    </q-footer>
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="400"
      :breakpoint="600"
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>
            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>
          <div style="margin: 20px;">
            <q-input style="margin: 5px" v-model="text" label="해쉬태그 필터" :dense="dense" />
            <q-input style="margin: 5px" v-model="text" label="지역구 필터" :dense="dense" />
          </div>
          <q-card class="side-card" style="margin: 20px;">
            <img src="https://i.pinimg.com/564x/ce/19/82/ce198281144f1ab908872fa81edbdf95.jpg">

            <q-card-section>
              <div class="text-h6">멘야산다이메</div>
              <div class="text-subtitle2">서울 종로구 명륜4가 147-1</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>
          </q-card>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 200px;">
        <div class="flex row no-wrap absolute-bottom bg-transparent">
          <q-avatar size="120px" class="q-mb-sm">
            <img src="https://i.pinimg.com/564x/6c/ab/38/6cab3803e1d182a6c2e53fc62e821efa.jpg">
          </q-avatar>
          <div style="margin: 20px;">
            <div class="text-weight-bold"><h5 style="margin: 0;">농담곰</h5></div>
            <q-btn style="width: 100%; margin-top: 10px;" color="white" text-color="black" label="훔쳐볼 친구 추가하기" />
          </div>

        </div>
      </q-img>
    </q-drawer>
    <div id="map" style="width: 100%; height: 100vh;"></div>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';


export default defineComponent({
  name: 'MainLayout',
  components: {
  },
  setup () {
    return {
      drawer: ref(false)
    }
  },
  data() {
    return {
      map: null,
      infowindow: null,
      ps: null,
      windowHeight: '',
      searchText: '',
      markers: [],
      places: []
    }
  },
  async mounted() {
    if (!window.kakao || !window.kakao.maps) {
      // script 태그 객체 생성
      const script = document.createElement('script');
      // src 속성을 추가하며 .env.local에 등록한 service 키 활용
      // 동적 로딩을 위해서 autoload=false 추가
      script.src =
        '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=' +
        `${process.env.KAKAOMAP_KEY}` +
        '&libraries=services,clusterer,drawing';
      /* global kakao */
      document.head.appendChild(script);
      script.addEventListener('load', () => {
        kakao.maps.load(this.initMap);
      });
    } else {
      this.initMap();
    }
  },
  methods: {
    initMap: function () {
      setTimeout(()=>{
        const container = document.getElementById('map')
        const options = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567),
          level: 5,
        };
        this.map = new kakao.maps.Map(container, options);
        this.infowindow = new kakao.maps.InfoWindow({ zIndex:1 });
        this.ps = new kakao.maps.services.Places();
      }, 100)
    },
  },
});
</script>
