<template>
  <q-layout view="lHh Lpr lFf">
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
