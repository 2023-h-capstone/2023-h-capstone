<template>
  <q-layout id="map" :style="mapStyle"></q-layout>
  <q-footer reveal elevated class="bg-cyan-8 justify-end">
    <h5 style="margin: 1.5%">{{ myPlaces[0].name }}</h5>
    <q-input
      color="white"
      filled
      bottom-slots
      v-model="tag"
      label="태그를 추가해주세요"
      counter
      maxlength="12"
    >
      <template v-slot:after>
        <q-btn
          @click="
            () => {
              this.placeCategory.push('#' + this.tag);
              this.tag = '';
            }
          "
          round
          dense
          flat
          icon="send"
        />
      </template>
    </q-input>
    <q-toolbar class="justify-between">
      <q-list style="width: 100%" class="flex row justify-start">
        <q-item v-for="(item, key) in placeCategory" v-bind:key="key" clickable>
          <q-item-section>
            <q-item-label>{{ item }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-btn
        to="/main"
        style="width: 10%"
        icon="check"
        color="white"
        text-color="black"
      />
    </q-toolbar>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { myPlaces, placesInfos } from 'assets/ContentModel';

export default defineComponent({
  name: 'WritePage',
  components: {},
  setup() {
    return {
      myPlaces: myPlaces,
      placesInfos: placesInfos,
    };
  },
  data() {
    return {
      mapStyle: {
        width: '100%',
        height: '100vh',
        display: 'block',
      },
      map: ref(null),
      infowindow: ref(null),
      ps: ref(null),
      searchText: ref<string>(''),
      hashTagFilter: ref<string>(''),
      placeFilter: ref<string>(''),
      markers: ref<any>([]),
      places: ref<any>([]),
      placeCategory: ref<string[]>([]),
      favoriteFlag: false,
      gradeFlag: false,
      tag: ref<string>(''),
      placeName: ref<string>(''),
      placeAddress: ref<string>(''),
    };
  },
  async mounted() {
    this.placeCategory = myPlaces[0].tags;
    this.$q.loading.show();
    setTimeout(() => {
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
      this.showPlace(0);
      this.$q.loading.hide();
    }, 1000);
  },
  methods: {
    initMap: function () {
      setTimeout(() => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567),
          level: 5,
        };
        this.map = new kakao.maps.Map(container, options);
        this.infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        this.ps = new kakao.maps.services.Places();
      }, 100);
    },
    placesSearchCB: function (
      data: string | any[],
      status: any,
      pagination: any
    ) {
      if (status === kakao.maps.services.Status.OK) {
        // MARK: 기존 마커 삭제
        if (this.markers.length !== 0) {
          if (this.infowindow != null) {
            this.infowindow.close();
          }
          for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
          }
          this.markers = [];
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        this.places = [];
        for (let i = 0; i < data.length; i++) {
          this.places.push(data[i]);
          this.displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        if (this.map != null) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          this.map.setBounds(bounds);
        }
      }
    },
    // 지도에 마커를 표시하는 함수입니다
    displayMarker: function (place: {
      y: any;
      x: any;
      place_name: string;
      road_address_name: string;
      category_name: string;
    }) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      this.markers.push(marker);
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', () => {
        this.placeName = place.place_name;
        this.placeAddress = place.road_address_name;
        if (this.infowindow != null) {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          this.infowindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              place.place_name +
              '</div>'
          );
          this.infowindow.open(this.map, marker);
        }
      });
    },
    search: function () {
      if (this.ps != null) {
        this.ps.keywordSearch(this.searchText, this.placesSearchCB);
        this.searchText = '';
      }
    },
    addMarker: function (
      position: any,
      place: {
        y: any;
        x: any;
        place_name: string;
        road_address_name: string;
        category_name: string;
      }
    ) {
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: position,
      });
      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.map);
      // 생성된 마커를 배열에 추가합니다
      this.markers.push(marker);
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', () => {
        this.placeName = place.place_name;
        this.placeAddress = place.road_address_name;
        let placeTheme = '';
        place.category_name.split(' > ').forEach((e) => {
          placeTheme += `#${e}`;
        });
        if (this.infowindow != null) {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          this.infowindow.setContent(
            `<div style="padding:5px;font-size:12px;margin: auto;">
                    <p>${place.place_name}</p>
                    <p>${placeTheme}</p>
                    </div>`
          );
          this.infowindow.open(this.map, marker);
        }
      });
    },
    // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
    setMarkers: function (map: any) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    },
    // "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
    showMarkers: function () {
      this.setMarkers(this.map);
    },
    // "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
    hideMarkers: function () {
      this.setMarkers(null);
    },
    showPlace: function (id: number) {
      this.initMap();
      setTimeout(() => {
        // MARK: 기존 마커 삭제
        if (this.markers.length !== 0) {
          if (this.infowindow != null) {
            this.infowindow.close();
          }
          for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
          }
          this.markers = [];
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        this.places = [];
        this.placesInfos[id].forEach(
          (place: {
            y: any;
            x: any;
            place_name: string;
            road_address_name: string;
            category_name: string;
          }) => {
            this.places.push(place);
            this.addMarker(
              new kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)),
              place
            );
            bounds.extend(
              new kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x))
            );
          }
        );
        if (this.map != null) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          this.map.setBounds(bounds);
        }
      }, 200);
    },
  },
});
</script>
