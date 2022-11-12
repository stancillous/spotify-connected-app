<template>
  <div class="outer-app-div">

    <div v-show="token" class="nav-component">
      <TheNav/>

    </div>

    <div v-show="!token" class="user-login">
      <div>
        <div class="gh-container">
            <div class="gh-div">
                <a class="gh-ex-link" target="_blank" href="https://github.com/stancillous/my-muzik-v4"><i class="fa-brands fa-github"></i></a>
            </div>
        </div>
        <div class="main">
            <div id="login-page">
                <div id="lpc">
                    <h1 class="app-name" id="app-name">My Muzik</h1>

                    <div class="login-btn-container">
                        <!-- <a @click="requestAuthorization" id="login-btn" href="/home">login to spotify</a> -->
                        <p @click="requestAuthorization()" id="login-btn">login to spotify</p>
                    </div>
                    <!-- <button id="login-btn"> <a href="/home">login to spotify</a> </button> -->
                </div>
            </div>
        </div>
    </div>
    </div>
  </div>


    <!-- <router-view/> -->
      
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>



</template>

<script>
import TheNav from './components/NavBar.vue'
export default {
  name: 'App',

  components:{
    TheNav
  },


  data(){
    return {
        AUTHORIZE:'https://accounts.spotify.com/authorize',
         scope:'user-read-private user-read-recently-played playlist-read-private user-follow-read user-top-read',
         redirect_uri : 'https://my-muzik.netlify.app/' ,
         client_id:'11e1eb62cc504e17bce8867bc8a21897',
         token:localStorage.getItem('access_token'),
        }
  },


  provide:{
    //TOKEN TO BE PASSED TO THE OTHER COMPONENTS
    token:localStorage.getItem('access_token'),
    // token:'BQB8IdCb5-breSRlb1cvprs2XBuSZUkRvDD71aURTg74QuMvJBtcfantorf-xOxaqqwmoKQuxyd_AIRpWdtXVHdPNNEhMVXzYOyH4IsnZiff_z5mdDa6Rjg_XtX5v9gFBcOF5v4wJhA5c7Abitmf89b6klf_PaMcTv1YkrgC1OJaIEiYqoICBOoZ50jRJFKWucLm7JkHucbHJzf0cKRBW0mzrC8_C-rlf-Gx'
  },

//   created(){
//     this.checkToken()
//   },

  methods:{
      
    // checkToken(){
    //     console.log('looking')
    //     if(localStorage.getItem('access_token')){
    //         console.log('tooken found') 
    //         console.log('check', localStorage.getItem('access_token'))

    //         // this.showScreen()  



    //     } else{
    //         console.log('no token')
    //     }


    // },
    // showScreen(){
    //     console.log('show screen fun')
    //     // document.querySelector('.user-login').style.display = 'none'
    //         // document.querySelector('.nav-component').style.display = 'block'
    // },

    requestAuthorization(){
        
        let url =this.AUTHORIZE;
        url += "?client_id=" + this.client_id;
        url += "&response_type=code";
        url += "&redirect_uri=" + encodeURI(this.redirect_uri);
        url += "&show_dialog=true";
        url+= `&scope=${this.scope}`
        window.location.href = url; // Show Spotify's authorization screen
        // checkAccessStatus() //FUNCTION TO CHECK WHETHER THE USER GRANTED US AUTHORIZATION
    }
  }


}
</script>

<style lang="scss">
$web-font1:"Satoshi", sans-serif;
$web-font2:"General Sans", sans-serif;
// font weights

$light:300;
$regular:400;
$medium:500;
$bold:700;
$black:900;

// $web-color:rgb(21, 20, 23);
$web-color:rgb(14, 14, 15);



*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html{
    font-size: 10px;
}

body{
    background-color:$web-color;
    font-family: $web-font1,$web-font2;
    overflow-x: hidden;
    color: white;

    a{
        color: white;
    }
    //MODIFY SCROLLBAR
    &::-webkit-scrollbar{
        width: 1rem;  //for vertical scrollbar
        height: 1rem;    //for horizontal scrollbar
    }

    &::-webkit-scrollbar-track {
 
        background:$web-color;

 
      }

      &::-webkit-scrollbar-thumb {
        background-color: #504b4b;
    }
}



*{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html{
            font-size: 11px;
        }


        .gh-container .gh-div{
            position: absolute;
            top: 2rem;
            right: 2rem;
        }
        .gh-container .gh-div .gh-ex-link{
            text-decoration: none;
            color: white;

        }
        .gh-container .gh-div .gh-ex-link:hover{
            opacity: .8;

        }
        .gh-container .gh-div .gh-ex-link i{
            font-size: 2.5rem;
        }

        .main{
            height: 100vh;
            width: 100vw;
        }
        .main #login-page{
            height: 100%;
            width: 100%;
            display: grid;
            place-items: center;

        }
        .main #login-page #lpc{
            text-align: center;

        }

        .main #login-page #lpc #app-name{
            text-transform: capitalize;
            font-weight: 900;
            opacity: .8;
            font-size: 1.9rem;
            margin-bottom: 1.7rem;
        }
        .main #login-page #lpc .login-btn-container{
            margin-top: 3rem;

        }
        .main #login-page #lpc .login-btn-container #login-btn{
            background-color: #1d8954;
            cursor: pointer;
            color: white;
            font-size: 1.1rem;
            border-radius: 23rem;
            border: none;
            text-transform: uppercase;
            font-weight: 700;
            text-decoration: none;
            padding: .8rem 1.2rem;
            padding: 1rem 2rem;
            text-decoration: none;

        }
        .main #login-page #lpc .login-btn-container #login-btn:hover{
            opacity: .8;

        }


</style>

