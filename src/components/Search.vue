<template>
  <v-text-field
      dark
      label="Recherche un titre !"
      solo
      dense
      v-model="inputText"
      @change="pushSearch"
      clearable
  ></v-text-field>
</template>

<script>
export default {
  name: "Search",
  props:{
    songs: Array
  },
  data() {
    return {
      inputText: '',
      filterSong: []
    }
  },
  created() {
    this.filterSong= this.songs
  },
  methods: {
    pushSearch() {
      console.log(this.filteredSongs)
      this.$emit('filteredSong', this.filteredSongs)
    }
  },
  computed: {
    filteredSongs(){
      if(!this.inputText){
        return [];
      }
      return this.filterSong.filter(song => {
        return song.title.toLowerCase().indexOf(this.inputText.toLowerCase()) !== -1
      })
    },
  },
}
</script>

<style scoped>

</style>