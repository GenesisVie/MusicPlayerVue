<template  >
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
    </v-row>
    <div align="center" justify="center">
      <Music></Music>
    </div>
  </v-container>
</template>

<script>

import Music from "@/components/Music";
export default {
  name: "HelloWorld",
  components: {
    Music
  },
  props: {
    msg: String,
  },
  data: function () {
    return {
    };
  },
};
</script>
