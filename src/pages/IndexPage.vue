<template>
  <div
    style="height: 100vh"
    class="flex row justify-center items-center content-center"
  >
    <q-btn
      @click="kakao_signin"
      style="margin: auto"
      size="60px"
      round
      color="deep-orange"
      icon="edit_location"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    return {
      alert: ref<boolean>(false),
    };
  },
  mounted() {
    if(Kakao.Auth.getAccessToken() != null) {
      this.$router.push('/main')
    }
  },
  methods: {
    kakao_signin: function () {
      window.Kakao.Auth.authorize({
        // redirectUri: 'http://localhost:9100/auth',
        redirectUri: 'https://smustaurant.com/auth',
      });
    }
  }
});
</script>
