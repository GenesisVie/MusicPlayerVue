<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: "Controls",
  props:{
    isPlaying: Boolean,
    currentSong: Object,
    songs: Array,
    player: HTMLAudioElement,
    selectedSong: Object,
    shuffle: Boolean,
    repeat: Boolean
  },
  data(){
    return {
      index: 0,
    }
  },
  methods: {
    play() {
      if (typeof this.currentSong.title === 'undefined' || typeof this.selectedSong.title === 'undefined') {
        this.$emit('selected', this.songs[0])
      }
      if (this.currentSong !== this.selectedSong && typeof this.selectedSong.src !== 'undefined') {
        this.player.pause()
        this.player.src = require('@/assets/audio/' + this.selectedSong.src)
      }
      if (this.player.src !== '') {
        this.$emit('current', this.selectedSong)
        this.$emit('playing', true)
        this.player.play()
      }
    },
    pause() {
      this.$emit('playing', false)
      this.player.pause()
    },
    next() {
      if (!this.shuffle) {
        this.index = this.songs.indexOf(this.currentSong)
        this.index++
        if (this.index >= this.songs.length) {
          this.index = 0;
        }
        this.$emit('selected', this.songs[this.index])
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
        this.$emit('selected', this.songs[this.index])
        this.play()
      }
    },
    prev() {
      this.index = this.songs.indexOf(this.currentSong)
      this.index--
      if (this.index < 0) {
        this.index = this.songs.length - 1;
      }
      this.$emit('selected', this.songs[this.index])
      this.play()
    },
  }
}
</script>

<style scoped>

</style>