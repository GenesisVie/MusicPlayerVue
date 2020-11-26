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
        <v-btn
            color="white"
            icon
            @click="goDetail(index)"
        >
          <v-icon>mdi-information</v-icon>
        </v-btn>
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
        <v-btn
            color="white"
            icon
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
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
    },
    goDetail(id) {
      this.$router.push({name: 'Detail',
        params: {id: id}})
    }
  }
}
</script>

<style scoped>

</style>