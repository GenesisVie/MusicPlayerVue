module.exports = {
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    },
    name: 'Playlistify'
  },
  "transpileDependencies": [
    "vuetify"
  ]
}