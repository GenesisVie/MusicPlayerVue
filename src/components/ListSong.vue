<template>
  <v-row dense>
    <v-col
        cols="12"
        v-for="(song, index) in songs" :key="index"
    >
      <v-card
          @click="choose(song)"
          dark
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title
                class="headline"
                v-text="song.title"
            ></v-card-title>

            <v-card-subtitle v-text="song.artist"></v-card-subtitle>
          </div>
          <v-avatar
              class="ma-3"
              size="125"
              tile
          >
            <v-img :src="require('@/assets/cover/'+song.cover)"></v-img>
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