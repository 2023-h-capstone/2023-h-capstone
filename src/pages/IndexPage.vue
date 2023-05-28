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
    };
  },
  mounted() {
    if(Kakao.Auth.getAccessToken() != null) {
      this.$router.push('/main')
    }
  },
  methods: {
    kakao_signin: function () {
      Kakao.Auth.authorize(
      { redirectUri: 'https://xa3kge3eskjrhwxaefosvqa3kq0ugcth.lambda-url.us-east-2.on.aws' }
      );
    }
  }
});
</script>
