import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

import HomePageComp from '../components/HomePage.vue'
import PlaylistsComp from '../components/Playlists.vue'
import FollowingComp from '../components/Following.vue'
import RecentSongsComp from '../components/RecentSongs.vue'
import TopArtistsComp from '../components/TopArtists.vue'
import TopTracksComp from '../components/TopTracks.vue'

import ArtistInfoComp from '../components/ArtistInfo.vue'
import PlaylistTracksComp from '../components/PlaylistTracks.vue'
import DiscoverArtistsComp from '../components/Discover.vue'
import TrackInfoComp from '../components/TrackInfo.vue'

// import IndexComp from '../components/Index.vue'


const routes = [
  {
    path:'/playlists', //PLAYLISTS ROUTE
    name:'playlists',
    component:PlaylistsComp
  },
  // {
  //   path: '/',  //INDEX ROUTE
  //   name: 'indexcomp',
  //   component: IndexComp
  // },
  {
    path: '/',  //HOMEPAGE ROUTE
    name: 'home',
    component: HomePageComp
  },

  {
    path:'/following',  //ROUTE FOR ARTISTS THAT USER IS FOLLOWING 
    name:'following',
    component:FollowingComp
  },
  {
    path:'/trackinfo', //ROUTE FOR GETTING MORE ABOUT A TRACK'S INFO
    name:'trackinfo',
    component:TrackInfoComp
  },
  {
    path:'/topartists',  //TOP ARTISTS ROUTE
    name:'topartists',
    component:TopArtistsComp,

  },
  {
    path:'/discover', //RELATED ARTISTS ROUTE
    name:'discover',
    component:DiscoverArtistsComp
  },
  {
    path:'/artistinfo', //ARTIST INFO ROUTE
    name:'artistinfo',
    component:ArtistInfoComp
  },
  {
    path:'/playlisttracks',  //PLAYLIST TRACKS ROUTE
    name:'playlisttracks',
    component:PlaylistTracksComp
  },

  {
    path:'/recent',  //RECENT SONGS ROUTE
    name:'recent',
    component:RecentSongsComp

  },
  {
    path:'/toptracks', //TOP TRACKS ROUTE
    name:'toptracks',
    component:TopTracksComp

  },





  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
