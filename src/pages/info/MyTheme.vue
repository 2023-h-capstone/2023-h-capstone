<template>
  <div style="padding-top: 4rem; padding-bottom: 3rem; padding-left: 1rem; padding-right: 1rem">
    <add-theme-modal />
    <q-card
      class="my-card"
      flat
      bordered
      v-for="(friendInfo, index) in friendsInfo"
      v-bind:key="index"
    >
      <q-separator />
      <q-item clickable style="padding: 0 !important" to="article/write">
        <q-card-section horizontal>
<!--          <q-img-->
<!--            style="width: 20%"-->
<!--            class="col-5"-->
<!--            :src="friendInfo.placeImage"-->
<!--          />-->
          <q-card-section style="padding: 0">
            <q-card-section>
              {{ friendInfo.post }}
            </q-card-section>
            <q-card-section style="padding-top: 0">
              <q-avatar
                size="sm"
                color="red"
                text-color="white"
                icon="language"
              />
              {{ friendInfo.location }}
            </q-card-section>
          </q-card-section>
          <q-separator vertical />
          <q-card-section class="col">
            <span v-for="(tag, index) in friendInfo.tags" v-bind:key="index"
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
interface FriendInfo {
  avatar: string;
  name: string;
  relationship: string;
  placeImage: string;
  post: string;
  location: string;
  tags: string[];
}

import { defineComponent, ref } from 'vue';
import AddThemeModal from 'components/AddThemeModal.vue';

export default defineComponent({
  name: 'MyTheme',
  components: {
    AddThemeModal,
  },
  setup() {
    const friendsInfo = ref<FriendInfo[]>([
      {
        avatar:
          'https://i.pinimg.com/564x/f4/13/d0/f413d09e8b1b08b0138f63c033dd9237.jpg',
        name: '고양고양이',
        relationship: '친구',
        post: '상명대 맛집모듬.zip',
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
        avatar:
          'https://i.pinimg.com/564x/22/4f/e2/224fe2ab3b0bab7ba2a7ef5827d6fcd7.jpg',
        name: '멈뭄미',
        relationship: '친구',
        post: '강남핫플 카페',
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
        avatar:
          'https://i.pinimg.com/564x/73/74/53/7374537befb86bdde9a9d57f576b76cb.jpg',
        name: '농담곰',
        relationship: '친구',
        post: '종로 밥집',
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
      //   avatar:
      //     'https://i.pinimg.com/736x/62/84/72/6284726829422cabd0db92197df953ed.jpg',
      //   name: '동글보스',
      //   relationship: '친구',
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
      friendsInfo,
    };
  },
});
</script>
