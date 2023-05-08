<template>
  <div style="padding-top: 4rem; padding-bottom: 3rem">
    <q-card class="my-card">
      <q-item clickable class="flex justify-center items-center column">
        <q-item-section style="padding: 0" avatar>
          <q-avatar rounded size="96px">
            <img
              src="https://i.pinimg.com/564x/73/74/53/7374537befb86bdde9a9d57f576b76cb.jpg"
            />
            <q-badge floating color="teal"
              ><q-avatar rounded icon="edit" size="24px"
            /></q-badge>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label style="font-size: 18px">김현중</q-item-label>
        </q-item-section>
      </q-item>
      <q-list bordered separator>
        <q-item clickable v-ripple>
          <q-item-section>이름</q-item-section>
          <q-item-section side style="margin: 10px">김현중</q-item-section>
          <q-btn round icon="edit" />
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>닉네임</q-item-section>
          <q-item-section side style="margin: 10px">its_me</q-item-section>
          <q-btn round icon="edit" />
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>내 친구코드</q-item-section>
          <q-item-section side>#ab12rt</q-item-section>
        </q-item>
        <q-item clickable v-ripple> </q-item>
        <q-item clickable v-ripple> </q-item>
        <q-separator />
        <q-item>
          <q-btn
            class="text-red"
            style="width: 100%"
            label="계정 삭제하기"
          ></q-btn>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'InfoSettingPage',
  components: {},
  setup() {
    return {};
  },
});
</script>
