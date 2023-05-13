<template>
<<<<<<< HEAD:src/pages/MypagePage.vue
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      expand-separator
      icon="perm_identity"
      label="Account settings"
      caption="John Doe"
    >
      <q-card>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius
          reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum
          officiis modi facere maiores architecto suscipit iste eveniet
          doloribus ullam aliquid.
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      expand-separator
      icon="signal_wifi_off"
      label="Wifi settings"
    >
      <q-card>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius
          reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum
          officiis modi facere maiores architecto suscipit iste eveniet
          doloribus ullam aliquid.
        </q-card-section>
      </q-card>
    </q-expansion-item>
=======
<q-layout style="text-align: center; padding-top: 1vh; padding-left:25rem;">
  <q-item style="text-align: center;">
    <q-avatar clickable v-ripple size="250px" style="text-align: center;">
        <img src='src/assets/profileTest.jpg'>
    </q-avatar>

      <q-item-section style="text-align: left; font-size: 2em; font-weight: bolder;padding-bottom: 2em;">my_account_hello</q-item-section>


  <div style="padding-right: 16vh; padding-top: 14vh;" class="q-pa-md">
    <div class="q-gutter-y-md column">

      <q-toolbar class="text-black rounded-borders">
>>>>>>> 13d73f8077a713e3f10f07711b989ccdbadc2d69:src/pages/mypage/MypagePage.vue

    <q-expansion-item
      expand-separator
      icon="drafts"
      label="Drafts"
      header-class="text-purple"
    >
      <q-card>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius
          reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum
          officiis modi facere maiores architecto suscipit iste eveniet
          doloribus ullam aliquid.
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item icon="assessment" label="Disabled" disable>
      <q-card>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius
          reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum
          officiis modi facere maiores architecto suscipit iste eveniet
          doloribus ullam aliquid.
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

<<<<<<< HEAD:src/pages/MypagePage.vue
export default defineComponent({
  name: 'MypagePage',
  setup() {
    return {};
=======
        <q-btn style="font-weight: bolder;" stretch flat label="새 게시글 작성" />

        <q-separator dark vertical />

        <q-btn style="font-weight: bolder;" stretch flat label="내 테마 모음" />

        <q-separator dark vertical />

        <q-btn style="font-weight: bolder;" stretch flat label="내 즐겨찾기 모음" />
      </q-toolbar>
    </div>
  </div>
</q-item>


<q-layout style="text-align: right; ">
    <q-list bordered>
      <q-item v-for="(place, key) in places" v-bind:key="key" class="q-my-sm" clickable v-ripple>
        <q-item-section>
          <q-item-label style="font-size: 20px;">{{ place.name }}</q-item-label>
          <q-item-label style="font-size: 15px;" caption lines="1">
              <span v-for="(tag, key) in place.tags" v-bind:key="key">
                {{tag}}
              </span>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-radio v-model="shape" :val="key"/>
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
  import {myPlaces} from 'assets/ContentModel';



  export default defineComponent({
    name: 'MypagePage',
    components: { },
  setup () {
    return {
      shape: ref(null),
      fixed: ref(false),
    }
>>>>>>> 13d73f8077a713e3f10f07711b989ccdbadc2d69:src/pages/mypage/MypagePage.vue
  },
  data() {
    return {
      //
    };
  },
  mounted() {
    //
  },
  methods: {
    //
  },
});
<<<<<<< HEAD:src/pages/MypagePage.vue
</script>
=======
  </script>
>>>>>>> 13d73f8077a713e3f10f07711b989ccdbadc2d69:src/pages/mypage/MypagePage.vue
