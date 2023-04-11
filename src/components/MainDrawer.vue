<template>
  <q-header elevated class="bg-cyan-8 flex column" style="heigt: 5vh">
    <q-toolbar>
      <q-toolbar-title>
        수뭉이네 밥집
      </q-toolbar-title>
      <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
    </q-toolbar>
  </q-header>

  <q-drawer
    v-model="drawer"
    show-if-above
    :width="200"
    :breakpoint="400"
  >
    <q-dialog v-model="this.dialog" :position="this.position">
      <q-card style="width: 350px" class="flex column content-center">
        <q-card-section class="row items-center no-wrap">
          <div>
            <q-input outlined v-model="id" label="id입력" />
            <q-btn style="width: 100%;" color="white" text-color="black" label="요청" />
          </div>
          <q-space />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 50px; border-right: 1px solid #ddd">
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>
          <q-item-section>
            내 즐겨찾기 모음
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/article/themes">
          <q-item-section avatar>
            <q-icon name="edit" />
          </q-item-section>
          <q-item-section>
            게시글 작성
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="open('top')">
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>
            친구 추가
          </q-item-section>
        </q-item>
        <div style="margin: 20px;">
          <q-input style="margin: 5px" v-model="hashTagFilter" label="해쉬태그 필터" :dense="true" />
          <q-input style="margin: 5px" v-model="placeFilter" label="지역구 필터" :dense="true" />
        </div>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="casino" />
          </q-item-section>
          <q-item-section>
            나는 오늘 뭘 먹을까
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/mypage/mypage">
          <q-item-section avatar>
            <q-icon name="face"/>
          </q-item-section>
          <q-item-section>
            마이페이지
          </q-item-section>
        </q-item>
      </q-list>

    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useQuasar} from 'quasar';
export default defineComponent({
  name: 'MainDrawer',
  setup () {
    const dialog = ref(false)
    const position = ref('top')
    return {
      drawer: ref(false),
      $q: useQuasar(),
      dialog,
      position,

      open (pos: string) {
        position.value = pos
        dialog.value = true
      }
    }
  },
});
</script>

