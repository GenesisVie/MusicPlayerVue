<template>
  <v-row dense>
    <v-col
        cols="12"
        v-for="(song, index) in songs" :key="index"
    >
      <v-card
          @click="choose(song)"
          :img="song.cover"
          class="mx-auto"
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div class="ma-3">
            <v-card-title style="color:whitesmoke" v-text="song.title">
            </v-card-title>
          </div>
          <v-avatar
              class="ma-3"
              size="125"
              tile
          >
            <v-img
                src="song.cover"
            ></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ListSong",
  props: {
    songs: Array
  },
  methods: {
    choose(songName) {
      this.$emit('song', songName)
    }
  }
}
</script>

<style scoped>

</style>