<template>
  <div>
    <Search
        :songs="songsList"
        @filteredSong="filterSongs"
    ></Search>
    <v-row>
      <v-col>
        <v-card
            class="mx-auto my-12"
            width="500"
            dark
        >
          <v-img v-if="currentSong.cover"
                 class="white--text align-end"
                 contain
                 :src="require('@/assets/cover/'+currentSong.cover)"
          ></v-img>
          <v-card-text align="center" justify="center">
            <v-row v-if="currentSong.cover ">
              <v-col cols="3">{{ formatCurrentTime }}</v-col>
              <v-col cols="6">
                <v-slider
                    color="#1DB954"
                    v-model="currentTime"
                    @change="advanceTime"
                    min="0"
                    :max="duration"
                >
                </v-slider>
              </v-col>
              <v-col cols="3"><p>{{ formatDuration }}</p></v-col>
            </v-row>

            <div v-if="currentSong.title">
              <p>{{ currentSong.title }}</p>
              <p>{{ currentSong.artist }}</p>
            </div>
            <Controls
                ref="controls"
                :is-playing="isPlaying"
                :current-song="currentSong"
                :songs="songsList"
                :player="player"
                :selected-song="selectedSong"
                :repeat="repeat"
                :shuffle="shuffle"
                @playing="changePlaying"
                @selected="changeSelected"
                @current="changeCurrent"
            >
            </Controls>
          </v-card-text>
          <v-card-actions v-if="currentSong.cover">
            <v-row>
              <v-col cols="6">
                <v-btn rounded @click="changeShuffle">
                  <v-icon v-if="!this.shuffle">mdi-shuffle-disabled</v-icon>
                  <v-icon v-else>mdi-shuffle</v-icon>
                </v-btn>
                <v-btn rounded @click="changeRepeat">
                  <v-icon v-if="!this.repeat">mdi-repeat</v-icon>
                  <v-icon v-else>mdi-repeat-once</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-slider
                    color="#1DB954"
                    v-model="volume"
                    prepend-icon="mdi-volume-high"
                    max="10"
                    min="0"
                ></v-slider>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <ListSong
            @song="changeSong"
            @likedSongs="likedSongs"
            :songs="songsList">
        </ListSong>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ListSong from "@/components/ListSong";
import Controls from "@/components/Controls";
import jsonSongs from "@/data/songs.json"
import Search from "@/components/Search";

export default {
  name: "Music",
  components: {Search, Controls, ListSong},
  data() {
    return {
      isPlaying: false,
      selectedSong: {},
      currentSong: {},
      player: new Audio(),
      volume: 10,
      duration: 0,
      currentTime: 0,
      shuffle: false,
      repeat: false,
      songs: jsonSongs,
      filteredSongs: []
    }
  },
  computed: {
    formatDuration() {
      const m = Math.floor(this.duration % 3600 / 60).toString().padStart(2, '0'),
          s = Math.floor(this.duration % 60).toString().padStart(2, '0');

      return m + ':' + s;
    },
    formatCurrentTime() {
      const m = Math.floor(this.currentTime % 3600 / 60).toString().padStart(2, '0'),
          s = Math.floor(this.currentTime % 60).toString().padStart(2, '0');

      return m + ':' + s;
    },
    songsList() {
      if (this.filteredSongs.length > 0) {
        return this.filteredSongs
      } else {
        return this.songs
      }
    }
  },
  methods: {
    filterSongs(newSongs) {
      this.filteredSongs = newSongs
    },
    likedSongs(likedSong) {
      this.filteredSongs = likedSong
    },
    changePlaying(val) {
      this.isPlaying = val
    },
    changeSelected(val) {
      this.selectedSong = val
    },
    changeCurrent(val) {
      this.currentSong = val
    },
    changeSong(songName) {
      this.$refs.controls.pause()
      this.selectedSong = songName
      this.$refs.controls.play()
    },
    advanceTime() {
      this.player.currentTime = this.currentTime
    },
    changeShuffle() {
      this.shuffle = !this.shuffle
    },
    changeRepeat() {
      this.repeat = !this.repeat
    }
  },
  watch: {
    volume(valVolume) {
      this.player.volume = valVolume * 0.1
    },
    duration(val) {
      this.duration = val
    },
    currentTime(val) {
      this.currentTime = val
    }
  },
  mounted() {
    this.player.addEventListener('loadedmetadata', () => {
      this.duration = Math.round(this.player.duration) || 0;
    })
    this.player.addEventListener('timeupdate', () => {
      this.currentTime = this.player.currentTime;
    })
    this.player.addEventListener('ended', () => {
      if (this.repeat) {
        this.player.loop
        this.$refs.controls.play()
      } else {
        this.$refs.controls.next()
      }
    })
  },
  destroyed() {
    this.player.pause()
    this.player.src = ''
  }
}
</script>

<style scoped>

</style>