import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',name: 'home',component:()=> import(/* webpackChunkName: "home" */'../components/HomePage.vue')
  },
  {
    path:'/playlists',name:'playlists',component:()=> import(/* webpackChunkName: "playlists" */ '../components/Playlists.vue')
  },

  {
    path:'/following',  name:'following',component:()=> import(/* webpackChunkName: "following" */ '../components/Following.vue')
  },
  {
    path:'/trackinfo', name:'trackinfo',component:()=> import(/* webpackChunkName: "trackinfo" */ '../components/TrackInfo.vue')
  },
  {
    path:'/topartists', name:'topartists',component:()=> import(/* webpackChunkName: "top artists" */ '../components/TopArtists.vue')
  },
  {
    path:'/discover', name:'discover',component:()=> import(/* webpackChunkName: "discoverArtists" */ '../components/Discover.vue')
  },
  {
    path:'/artistinfo', name:'artistinfo',component:()=> import(/* webpackChunkName: "artistInfo" */ '../components/ArtistInfo.vue')
  },
  {
    path:'/playlisttracks', name:'playlisttracks',component:()=> import(/* webpackChunkName: "playlistTracks" */ '../components/PlaylistTracks.vue')
  },

  {
    path:'/recent',name:'recent',component:()=> import(/* webpackChunkName: "recentSongs" */ '../components/RecentSongs.vue')
  },
  {
    path:'/toptracks', name:'toptracks',component:()=> import(/* webpackChunkName: "topTracks" */ '../components/TopTracks.vue')
  },
  // {
  //   path:"/:pathMatch(.*)*",name:'page not found',component:()=> import(/* webpackChunkName: "page not found" */ '../components/PageNotFound.vue')
  // },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to,from,savedPosition){
    return savedPosition || {top:0}
  }
})

export default router
