<template>
  <v-row dense>
    <v-col
    cols="12"
    >

      <v-checkbox
        label="Afficher les sons likés uniquement"
        v-model="onlyLikes"
        color="#1DB954"
      >
      </v-checkbox>
    </v-col>
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
            @click="addLike(index)"
        >
          <v-icon v-if="!isLiked(index)">mdi-heart-outline</v-icon>
          <v-icon style="color: #1DB954" v-else >mdi-heart</v-icon>
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
  data(){
    return{
      likedSongs: [],
      onlyLikes: false
    }
  },
  methods: {
    choose(songName) {
      this.$emit('song', songName)
    },
    goDetail(id) {
      this.$router.push({name: 'Detail',
        params: {id: id}})
    },
    addLike(id) {
      if (!this.isLiked(id)){
        this.likedSongs.push(this.songs[id])
      }else{
        this.likedSongs.splice(id,1)
      }
    },
    isLiked(id) {
      if (this.likedSongs.length > 0) {
        return this.likedSongs.includes(this.songs[id], 0)
      }
    },
  },
  watch: {
    onlyLikes(){
      if (this.onlyLikes){
        this.$emit('likedSongs', this.likedSongs)
      }else{
        this.$emit('likedSongs', [])
      }
    }
  }
}
</script>

<style scoped>

</style>