import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path:'/playlists',
    name:'playlists',
    component:()=> import('../components/Playlists.vue')
  },

  {
    path: '/',  
    name: 'home',
    component:()=> import('../components/HomePage.vue')
  },

  {
    path:'/following',  
    name:'following',
    component:()=> import('../components/Following.vue')

  },
  {
    path:'/trackinfo', 
    name:'trackinfo',
    component:()=> import('../components/TrackInfo.vue')

  },
  {
    path:'/topartists', 
    name:'topartists',
    component:()=> import('../components/TopArtists.vue')


  },
  {
    path:'/discover', 
    name:'discover',
    component:()=> import('../components/Discover.vue')

  },
  {
    path:'/artistinfo', 
    name:'artistinfo',
    component:()=> import('../components/ArtistInfo.vue')

  },
  {
    path:'/playlisttracks', 
    name:'playlisttracks',
    component:()=> import('../components/PlaylistTracks.vue')

  },

  {
    path:'/recent',  
    name:'recent',
    component:()=> import('../components/RecentSongs.vue')


  },
  {
    path:'/toptracks', 
    name:'toptracks',
    component:()=> import('../components/TopTracks.vue')

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
