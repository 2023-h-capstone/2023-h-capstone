<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-cyan-8 flex column" style="height: 10vh">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar size="40px" style="margin: 10px;">
            <img src="https://i.pinimg.com/564x/6c/ab/38/6cab3803e1d182a6c2e53fc62e821efa.jpg">
          </q-avatar>
        </q-toolbar-title>
        <q-input style="width: 70%;" filled v-model="searchText" @keydown.enter="search" label="Label" :dense="true">
          <template v-slot:append>
            <q-icon name="search" @click="search" />
          </template>
        </q-input>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>
    <q-footer reveal elevated class="bg-cyan-8">
      <q-toolbar>
        <div style="width: 20%;">
          <q-btn flat round :color="favoriteFlag ? 'red' : 'grey'" @click="favoriteFlag=!favoriteFlag" size="1.5rem" icon="favorite" />
          <q-btn flat round :color="gradeFlag ? 'yellow' : 'grey'" @click="gradeFlag=!gradeFlag" size="1.5rem" icon="grade" />
        </div>
        <q-list style="width: 80%;" class="flex row justify-center">
          <q-item v-for="(item, key) in placeCategory" v-bind:key="key" clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="local_bar" />
            </q-item-section>
            <q-item-section>
              <q-item-label>#{{item}}</q-item-label>
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
            <q-input style="margin: 5px" v-model="hashTagFilter" label="해쉬태그 필터" :dense="true" />
            <q-input style="margin: 5px" v-model="placeFilter" label="지역구 필터" :dense="true" />
          </div>
          <q-card class="side-card" style="margin: 20px;">
            <img src="https://i.pinimg.com/564x/ce/19/82/ce198281144f1ab908872fa81edbdf95.jpg">

            <q-card-section>
              <div class="text-h6">{{placeName}}</div>
              <div class="text-subtitle2">{{placeAddress}}</div>
            </q-card-section>
            <q-space/>
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
    <q-layout id="map" :style="mapStyle"></q-layout>
    <q-layout style="text-align: right; padding-top: 10vh">
      <q-list bordered>
        <q-item @click="showPlace(myplace.id)" v-for="(myplace, key) in myPlaces" v-bind:key="key" class="q-my-sm" clickable v-ripple>
          <q-item-section>
            <q-item-label style="font-size: 20px;">{{ myplace.name }}</q-item-label>
            <q-item-label style="font-size: 15px;" caption lines="1">
              <span v-for="(tag, key) in myplace.tags" v-bind:key="key">
                {{tag}}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="chat_bubble" color="green" />
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
import {myPlaces, placesInfos} from 'assets/ContentModel';


export default defineComponent({
  name: 'MainLayout',
  components: {
  },
  setup () {
    return {
      drawer: ref(false),
      $q: useQuasar(),
      myPlaces: myPlaces,
      placesInfos: placesInfos
    }
  },
  data() {
    return {
      mapStyle: {
        width: '100%',
        height: '100vh',
        display:'none'
      },
      contentStyle: {
        width: '100%',
        height: '100vh',
        display:'block'
      },
      map: ref(null),
      infowindow: ref(null),
      ps: ref(null),
      searchText: ref<string>(''),
      hashTagFilter:ref<string>(''),
      placeFilter:ref<string>(''),
      markers: ref<any>([]),
      places: ref<any>([]),
      placeName:' 멘야산다이메 대학로점',
      placeAddress:'서울 종로구 창경궁로26길 38-2 1층',
      placeCategory: ref<string[]>([]),
      favoriteFlag: false,
      gradeFlag: false
    }
  },
  async mounted() {
    this.$q.loading.show()
    setTimeout(()=>{
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

      this.$q.loading.hide()
    }, 1000)

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
    placesSearchCB: function(data: string | any[], status: any, pagination: any) {
      if (status === kakao.maps.services.Status.OK) {
        // MARK: 기존 마커 삭제
        if(this.markers.length !== 0) {
          if(this.infowindow != null) {
            this.infowindow.close()
          }
          for(let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null)
          }
          this.markers = []
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        this.places = []
        for (let i=0; i<data.length; i++) {
          this.places.push(data[i])
          this.displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        if(this.map != null) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          this.map.setBounds(bounds);
        }
      }
    },
    // 지도에 마커를 표시하는 함수입니다
    displayMarker: function(place: { y: any; x: any; place_name: string; road_address_name:string; category_name: string }) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });
      this.markers.push(marker)
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', () => {
        this.placeName = place.place_name
        this.placeAddress = place.road_address_name
        this.placeCategory = place.category_name.split(' > ')
        if(this.infowindow != null) {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          this.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
          this.infowindow.open(this.map, marker);
        }
      });
    },
    search: function() {
      if(this.ps != null) {
        this.ps.keywordSearch(this.searchText, this.placesSearchCB);
        this.searchText = ''
      }
    },
    addMarker: function (position: any, place: { y: any; x: any; place_name: string; road_address_name:string; category_name: string }) {
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: position
      });
      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.map);
      // 생성된 마커를 배열에 추가합니다
      this.markers.push(marker);
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', () => {
        this.placeName = place.place_name
        this.placeAddress = place.road_address_name
        this.placeCategory = place.category_name.split(' > ')
        if(this.infowindow != null) {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          this.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
          this.infowindow.open(this.map, marker);
        }
      });
    },
    // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
    setMarkers: function(map: any) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    },
    // "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
    showMarkers: function() {
      this.setMarkers(this.map)
    },
    // "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
    hideMarkers: function() {
      this.setMarkers(null);
    },
    showPlace: function (id: number) {
      this.initMap()
      this.mapStyle.display='block'
      this.contentStyle.display='none'
      setTimeout(()=>{
        // MARK: 기존 마커 삭제
        if(this.markers.length !== 0) {
          if(this.infowindow != null) {
            this.infowindow.close()
          }
          for(let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null)
          }
          this.markers = []
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        this.places = []
        this.placesInfos[id].forEach((place: { y: any; x: any; place_name: string; road_address_name:string; category_name: string })=> {
          this.places.push(place)
          this.addMarker(new kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)), place);
          bounds.extend(new kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)));
        })
        if(this.map != null) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          this.map.setBounds(bounds);
        }
      },200)
    }
  },
});
</script>
