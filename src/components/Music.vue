<template>
  <v-row class="my-auto">
    <v-col>
      <v-card
          class="mx-auto my-12"
          max-width="500"
      >

        <v-img v-if="typeof currentSong.cover !== 'undefined'"
               class="white--text align-end"
               contain
               :src="currentSong.cover"
        ></v-img>
        <v-card-text align="center" justify="center">
          <v-row v-if="typeof currentSong.cover !== 'undefined'">
            <v-col cols="3">{{formatCurrentTime}}</v-col>
            <v-col cols="6">
              <v-slider

                  color="#42b983"
                  v-model="currentTime"
                  @change="advanceTime"
                  min="0"
                  :max="duration"
              >
              </v-slider>
            </v-col>
            <v-col cols="3"><p>{{formatDuration}}</p></v-col>
          </v-row>

          <p v-if="typeof currentSong.title !== 'undefined'">{{ currentSong.title }}</p>
          <v-btn rounded @click="prev">
            <v-icon>mdi-skip-previous-outline</v-icon>
          </v-btn>
          <v-btn v-if="!this.isPlaying" @click="play" rounded>
            <v-icon>mdi-play-outline</v-icon>
          </v-btn>
          <v-btn v-else @click="pause" rounded>
            <v-icon>mdi-pause</v-icon>
          </v-btn>
          <v-btn @click="next" rounded>
            <v-icon>mdi-skip-next-outline</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-actions v-if="typeof currentSong.cover !== 'undefined'">
          <v-row>
            <v-col>
              <v-btn rounded @click="changeShuffle">
                <v-icon v-if="!this.shuffle">mdi-shuffle-disabled</v-icon>
                <v-icon v-else>mdi-shuffle</v-icon>
              </v-btn>
              <v-btn rounded @click="changeRepeat">
                <v-icon v-if="!this.repeat">mdi-repeat</v-icon>
                <v-icon v-else>mdi-repeat-once</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-slider
                  color="#42b983"
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
      <ListSong @song="changeSong" :songs="songs"></ListSong>
    </v-col>
  </v-row>

</template>

<script>
import ListSong from "@/components/ListSong";

export default {
  name: "Music",
  components: {ListSong},
  data() {
    return {
      isPlaying: false,
      index: 0,
      selectedSong: {},
      currentSong: {},
      player: new Audio(),
      volume: 10,
      duration: 0,
      currentTime: 0,
      shuffle: false,
      repeat: false,
      songs: [
        {
          title: 'But en or',
          src: require('@/assets/audio/But_en_or.mp3'),
          cover: require('@/assets/cover/But_en_or.jpg')
        },
        {
          title: 'Fler maler',
          src: require('@/assets/audio/Fler_maler.mp3'),
          cover: require('@/assets/cover/Fler_maler.jpeg')
        },
        {
          title: 'Horizontal',
          src: require('@/assets/audio/Damso_Horizontal.mp3'),
          cover: require('@/assets/cover/qalf.jpg')
        },
        {
          title: 'Rien d\'Spécial',
          src: require('@/assets/audio/Népal_Rien_d_Spécial.mp3'),
          cover: require('@/assets/cover/nepal.jpeg')
        },
        {
          title: 'Atch Memories',
          src: require('@/assets/audio/Atch_Memories.mp3'),
          cover: require('@/assets/cover/cover.jpeg')
        },
      ]
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
          s = Math.floor(this.currentTime% 60).toString().padStart(2, '0');

      return m + ':' + s;
    }
  },
  methods: {
    play() {
      if (typeof this.currentSong.title === 'undefined' || typeof this.selectedSong.title === 'undefined') {
        this.selectedSong = this.songs[0]
      }
      if (this.currentSong !== this.selectedSong && typeof this.selectedSong !== 'undefined') {
        this.player.pause()
        this.player.src = this.selectedSong.src
      }
      if (this.player.src !== '') {
        this.currentSong = this.selectedSong
        this.isPlaying = true
        this.player.play()
      }
    },
    pause() {
      this.isPlaying = false
      this.player.pause()
    },
    next() {
      if (!this.shuffle) {
        this.index = this.songs.indexOf(this.currentSong)
        this.index++
        if (this.index >= this.songs.length) {
          this.index = 0;
        }
        this.selectedSong = this.songs[this.index]
        this.play()
      } else {
        this.index = this.songs.indexOf(this.currentSong)
        for (let ok = false; !ok;) {
          const newIndex = Math.floor(Math.random() * Math.floor(this.songs.length))
          if (newIndex !== this.index) {
            ok = true
            this.index = newIndex
          }
        }
        this.selectedSong = this.songs[this.index]
        this.play()
      }
    },
    prev() {
      this.index = this.songs.indexOf(this.currentSong)
      this.index--
      if (this.index < 0) {
        this.index = this.songs.length - 1;
      }
      this.selectedSong = this.songs[this.index]
      this.play()
    },
    changeSong(songName) {
      this.pause()
      this.selectedSong = songName
      this.play()
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
        this.play()
      } else {
        this.next()
      }
    })
  },
}
</script>

<style scoped>

</style>