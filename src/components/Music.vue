<template>
  <v-row>
    <v-col>
      <v-card
          class="mx-auto my-12"
          width="500"
          dark
      >

        <v-img v-if="typeof currentSong.cover !== 'undefined'"
               class="white--text align-end"
               contain
               :src="currentSong.cover"
        ></v-img>
        <v-card-text align="center" justify="center">
          <v-row v-if="typeof currentSong.cover !== 'undefined'">
            <v-col cols="3">{{ formatCurrentTime }}</v-col>
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
            <v-col cols="3"><p>{{ formatDuration }}</p></v-col>
          </v-row>

          <div v-if="typeof currentSong.title !== 'undefined'">
            <p>{{ currentSong.title }}</p>
            <p>{{ currentSong.artist }}</p>
          </div>
          <Controls
              :is-playing="isPlaying"
              :current-song="currentSong"
              :songs="songs"
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
        <v-card-actions v-if="typeof currentSong.cover !== 'undefined'">
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
import Controls from "@/components/Controls";

export default {
  name: "Music",
  components: {Controls, ListSong},
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
      songs: [
        {
          title: 'But en or',
          artist: 'Kalash Criminel X Damso',
          src: require('@/assets/audio/But_en_or.mp3'),
          cover: require('@/assets/cover/But_en_or.jpg')
        },
        {
          title: 'Fler maler',
          artist: 'Oussanousava',
          src: require('@/assets/audio/Fler_maler.mp3'),
          cover: require('@/assets/cover/Fler_maler.jpeg')
        },
        {
          title: 'Horizontal',
          artist: 'Damso',
          src: require('@/assets/audio/Damso_Horizontal.mp3'),
          cover: require('@/assets/cover/qalf.jpg')
        },
        {
          title: 'Rien d\'Spécial',
          artist: 'Nepal',
          src: require('@/assets/audio/Népal_Rien_dSpécial.mp3'),
          cover: require('@/assets/cover/nepal.jpeg')
        },
        {
          title: 'Freeze Raël',
          artist: 'Freeze Corleone',
          src: require('@/assets/audio/Freeze_Raël.mp3'),
          cover: require('@/assets/cover/LMF.jpg')
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
          s = Math.floor(this.currentTime % 60).toString().padStart(2, '0');

      return m + ':' + s;
    }
  },
  methods: {
    changePlaying(val) {
      this.isPlaying = val
      this.$forceUpdate()
    },
    changeSelected(val) {
      this.selectedSong = val
      this.$forceUpdate()
    },
    changeCurrent(val) {
      this.currentSong = val
      this.$forceUpdate()
    },
    changeSong(songName) {
      this.player.pause()
      this.selectedSong = songName
      this.player.play()
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