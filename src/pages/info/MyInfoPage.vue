<template>
  <div style="padding-top: 4rem; padding-bottom: 3rem; padding-left: 1rem; padding-right: 1rem">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-btn round>
            <q-avatar>
              <img
                src="https://i.pinimg.com/564x/73/74/53/7374537befb86bdde9a9d57f576b76cb.jpg"
              />
            </q-avatar>
          </q-btn>
        </q-item-section>
        <q-item-section>
          <q-item-label class="flex row justify-between" style="margin: 5px">
            <div style="display: inline-block !important">
              <h6 style="margin: 0; padding: 0">김현중</h6>
            </div>
            <div style="display: inline-block !important">
              <q-btn color="white" text-color="black" label="친구 수 10" />
            </div>
          </q-item-label>
          <q-item-label caption style="margin: 5px">
            <q-btn
              color="white"
              icon="settings"
              text-color="black"
              to="/info/setting"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <div>
        <q-btn
          style="width: 50%"
          color="white"
          icon="star"
          text-color="black"
          to="/info/favorite"
          label="즐겨찾기 모음"
        />
        <q-btn
          style="width: 50%"
          color="white"
          icon="menu_book"
          text-color="black"
          to="/info/theme"
          label="테마 모음"
        />
      </div>
    </q-card>
    <q-card
      style="margin: 5px"
      class="my-card"
      flat
      bordered
      v-for="(locationInfo, index) in locationInfos"
      v-bind:key="index"
    >
      <q-item clickable style="padding: 0 !important">
        <q-card-section horizontal>
          <q-img
            style="width: 20%"
            class="col-5"
            :src="locationInfo.placeImage"
          />
          <q-card-section style="padding: 0">
            <q-card-section>
              {{ locationInfo.post }}
            </q-card-section>
            <q-card-section style="padding-top: 0">
              <q-avatar
                size="sm"
                color="red"
                text-color="white"
                icon="language"
              />
              {{ locationInfo.location }}
            </q-card-section>
          </q-card-section>
          <q-separator vertical />
          <q-card-section class="col">
            <span v-for="(tag, index) in locationInfo.tags" v-bind:key="index"
              >#{{ tag }}</span
            >
          </q-card-section>
        </q-card-section>
      </q-item>
      <q-separator />
    </q-card>
  </div>
</template>

<script lang="ts">
interface LocationInfo {
  placeImage: string;
  post: string;
  location: string;
  tags: string[];
}
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MyInfoPage',
  components: {},
  setup() {
    const locationInfos = ref<LocationInfo[]>([
      {
        post: '내 게시글 1',
        placeImage:
          'https://i.pinimg.com/564x/90/fb/13/90fb1323f3d8545e0f87ae5362763ac9.jpg',
        location: '종로구',
        tags: [
          '종로',
          '언덕싫어',
          '학식싫어',
          '찐맛집',
          '가성비',
        ],
      },
      {
        post: '내 게시글 2',
        placeImage:
          'https://i.pinimg.com/564x/57/d2/9b/57d29ba46331864473199490161727ef.jpg',
        location: '강남구',
        tags: [
          '강남',
          '강남역',
          '사람많아',
          '커피비싸',
          '사진맛집',
        ],
      },
      {
        post: '내 게시글 3',
        placeImage:
          'https://i.pinimg.com/564x/fc/2a/0d/fc2a0da0a5790107aca212d9970f9af5.jpg',
        location: '종로구',
        tags: [
          '종로',
          '종각',
          '종조로종종',
          '로컬맛집',
          '오이시이',
        ],
      },
      // {
      //   post: '게시글 4',
      //   placeImage:
      //     'https://i.pinimg.com/236x/18/b3/3b/18b33b396ba808ef7efeb3a2f195d960.jpg',
      //   location: '양주시',
      //   tags: [
      //     '가성비',
      //     '막걸리',
      //     '튀김',
      //     '김밥',
      //     '가까움',
      //     '친절함',
      //     '학교앞',
      //   ],
      // },
    ]);
    return {
      locationInfos,
    };
  },
});
</script>
