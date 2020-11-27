<template>
  <v-container
  >
    <v-card
        elevation="24"
        outlined
        class="mx-auto my-12"
        width="1000"
        tile
        dark
    >
      <v-card-title
          align="center"
      >
        {{ this.artist.artist }}
      </v-card-title>
      <v-avatar
          class="ma-3"
          size="300"
          tile
      >
        <v-img :src="require('@/assets/artistCover/'+this.artist.artistCover)"></v-img>
      </v-avatar>
      <v-spacer></v-spacer>
      <v-card-text>
        <p
            class="text-justify">
          {{this.artist.description}}
        </p>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import songsJsons from "../data/songs.json"

export default {
  name: "MusicDetail",
  data() {
    return {
      songs: songsJsons,
      artist: {}
    }
  },
  created() {
    this.artist = this.songs[this.$route.params.id]
  }
}
</script>

<style scoped>

</style>