<template>
  <div style="padding-top: 4rem; padding-bottom: 3rem; padding-left: 1rem; padding-right: 1rem">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-btn round to="/info/friend">
            <q-avatar>
              <img
                src="https://i.pinimg.com/564x/f4/13/d0/f413d09e8b1b08b0138f63c033dd9237.jpg"
              />
            </q-avatar>
          </q-btn>
        </q-item-section>
        <q-item-section>
          <q-item-label class="flex row justify-between" style="margin: 5px">
            <span>
              <h6 style="margin: 0; padding: 0">고양고양이</h6>
            </span>
            <q-btn color="white" text-color="black" label="친구 수 10" />
          </q-item-label>
          <q-item-label caption style="margin: 5px"> 친구 </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-btn
        style="width: 100%"
        color="white"
        text-color="black"
        icon="content_cut"
        label="친구 추가 취소하기"
      />
      <q-separator />
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
  name: 'FriendInfoPage',
  components: {},
  setup() {
    const locationInfos = ref<LocationInfo[]>([
      {
        post: '게시글 1',
        placeImage:
          'https://i.pinimg.com/564x/90/fb/13/90fb1323f3d8545e0f87ae5362763ac9.jpg',
        location: '종로구',
        tags: [
          '가성비',
          '막걸리',
          '튀김',
          '김밥',
          '가까움',
          '친절함',
          '학교앞',
        ],
      },
      {
        post: '게시글 2',
        placeImage:
          'https://i.pinimg.com/564x/57/d2/9b/57d29ba46331864473199490161727ef.jpg',
        location: '강남구',
        tags: [
          '가성비',
          '막걸리',
          '튀김',
          '김밥',
          '가까움',
          '친절함',
          '학교앞',
        ],
      },
      {
        post: '게시글 3',
        placeImage:
          'https://i.pinimg.com/564x/fc/2a/0d/fc2a0da0a5790107aca212d9970f9af5.jpg',
        location: '서초구',
        tags: [
          '가성비',
          '막걸리',
          '튀김',
          '김밥',
          '가까움',
          '친절함',
          '학교앞',
        ],
      },
      {
        post: '게시글 4',
        placeImage:
          'https://i.pinimg.com/236x/18/b3/3b/18b33b396ba808ef7efeb3a2f195d960.jpg',
        location: '양주시',
        tags: [
          '가성비',
          '막걸리',
          '튀김',
          '김밥',
          '가까움',
          '친절함',
          '학교앞',
        ],
      },
    ]);
    return {
      locationInfos,
    };
  },
});
</script>
