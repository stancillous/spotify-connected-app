<template>

  <router-view/>

  <section>

    <!-- THE DIV THAT WILL SHOW ADDITIONAL ACTIONS LIKE LOGGING OUT -->
    <div class="fd-container">

        <div class="fd">
            <div class="fd-logout">
                <a href="https://accounts.spotify.com/en/logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
                <a href="https://accounts.spotify.com/en/logout">logout</a>
            </div>

            <div class="f-developer">
                <a target="_blank" href="https://github.com/stancillous"><i class="fa-brands fa-github"></i></a>
                <a target="_blank" href="https://github.com/stancillous">about developer</a>
            </div>
        </div>
    </div>

    <!-- THE LOGO AND MY GITHUB TO BE SHOWN WHEN THE SCREENSIZE IS SMALL -->
    <div class="top-page-logo">
    <a href="/home"><img src="./assets/logo.png" alt=""></a>
    </div>

    <!-- THE 3 DOTS THAT WILL SHOW THE DIV WITH ADDITIONAL ACTIONS LIKE LOGGING OUT -->
    <div class="tpm-info">
    <div class="tpm-button">
        <i id="more-info-button" class="fa-solid fa-ellipsis-vertical"></i>
    </div>
    </div>

    <!-- DIV HOLDING THE NAVIGATION TABS -->
    <div class="app-root-div">
        <div class="app-container">
            <div class="app-container-content">
                <!-- LOGO IMAGE -->
                <div class="image-div">
                <router-link to="/">
                    <img class="logo-image" src="./assets/logo.png" alt="logo">
                </router-link>
                
                </div>
                <!-- THE ICONS ALLOWING USER TO NAVIGATE -->
                <div class="tabs-container">

                <router-link class="router-link-class" to="/">

                    <div class="user-profile-div nav-tabs active-nav-tab">
                    <span style="font-size: 2.4rem;" class="iconify" data-icon="carbon:home"></span>
                    <p class="tab-details-text">home</p>

                </div>
                </router-link>

                <router-link class="router-link-class" to="/toptracks">
                    <div class="top-tracks-div nav-tabs">
                    <span style="font-size: 2.4rem;" class="iconify" data-icon="bytesize:music"></span>
                    <p class="tab-details-text">top tracks</p>

                </div>
                </router-link>

                <router-link class="router-link-class" to="/topartists">

                    <div class="top-artists-div nav-tabs">
                    <span style="font-size: 3rem;" class="iconify" data-icon="fad:microphone"></span>
                    <p class="tab-details-text">top artists</p>

                </div>
                </router-link>

                <router-link class="router-link-class" to="/recent">
                    <div class="recents-div nav-tabs">
                    <span style="font-size: 2.3rem;" class="iconify" data-icon="carbon:recently-viewed"></span>
                    <p class="tab-details-text">recent</p>

                </div>
                </router-link>

                <router-link class="router-link-class" to="/playlists">
                    <div class="playlists-div nav-tabs">
                    <span style="font-size: 2.2rem;" class="iconify" data-icon="bi:music-note-list"></span>
                    <p class="tab-details-text">playlists</p>
                </div>
                </router-link>

                </div>

                <div class="github-div">
                <a target="_blank" href="https://github.com/stancillous/"><span style="font-size: 2.5rem;" class="iconify" data-icon="charm:github"></span></a>

                </div>


            </div>
        </div>

    </div>

  </section>


  <!-- <IndexComp  /> -->

</template>

<script>
// import IndexComp from './components/Index.vue'

export default {
  name: 'App',

  components:{
    // IndexComp
  },


  data(){
    return {
      // access:''  //INITIALLY SETTING ACCESS TOKEN TO AN EMPTY STRING
    }
  },


  //CHECKING FOR THE TOKEN WHEN MOUNTED
  mounted(){
    let token = localStorage.getItem('access_token')

  },

  provide:{
    //TOKEN TO BE PASSED TO THE OTHER COMPONENTS
    token:localStorage.getItem('access_token'),
    // token:'BQA0llKrcJj2TE1YO-3PrD8JE9Tvkz0p1WrDAgfT2CTHqn2Fez-uPzU_QpioTFu6QTSYJLLIVNTkz-UOFqZJYfCbHg1fiYiBRaL0DX7IqjgwRBplVEqNAwTs8TmRUqJsm1oDU6XZzyP5crggMvF8dJ4pYodB1ueP6bRIvG5M9ouEcrJCbWIQquD7-pvhQ5CW62d2mIDkfDU3I-8u0d2kRQppcWAIM5xiAshXpEOEGCr3oulWzw'
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

$web-color:rgb(21, 20, 23);

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


// THE DIV THAT WILL SHOW ADDITIONAL ACTIONS LIKE LOGGING OUT 
.fd-container{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: black;
    z-index: 199;
    height: 16rem;
    width: 100%;
    display: grid;
    place-items: center;
    transition: all .3s ease-in-out;
    clip-path: inset(0 0 100% 0);


    .fd{
        div{
            margin: 2rem 0;
        }
        i{
            margin-right: 1.3rem;
            font-size: 2rem;
            opacity: .9;
        }
        a{
            font-weight: $medium;
            text-transform: capitalize;
            text-decoration: none;
            color: white;
            opacity: .9;
            font-size: 1.4rem;
        }
    }
}

//HIDING THE ABOVE DIV AND ONLY SHOWING IT WHEN THE 3 DOTS ARE CLICKED
.fd-container.show{
    clip-path: inset(0 0 0 0);

}


//THE LOGO AND MY GITHUB TO BE SHOWN WHEN THE SCREENSIZE IS SMALL
.top-page-logo{
    position: absolute;
    top:.1rem;
    left: .1rem;
    display: none;

    img{
        width: 6rem;
    }
}

// THE 3 DOTS THAT WILL SHOW THE DIV WITH ADDITIONAL ACTIONS LIKE LOGGING OUT
//WILL ONLY BE VISIBLE ON SMALL SCREENS 
.tpm-info{
    position: absolute;
    top: 2rem;
    right: 2rem;
    display: none;
    .tpm-button{
        i{
            font-size: 3rem;
            padding: 0 1rem;    
            cursor: pointer;
        }
    }
}


  .app-root-div{
    position: fixed;
    height: 100vh;
    width: 15rem;
    left: 0;
    bottom: 0;
    background-color: black;
    white-space: nowrap;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    .app-container{
      // padding-left: 3rem;
      height: 100%;
      width: 100%;
      .app-container-content{
        text-align: center;
        height: 100%;
        padding: 0 .5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        //LOGO
        .image-div{
          img{
            width: 7rem;
          }
        }

        .tabs-container{

          .router-link-class{  //REMOVING THE DEFAULT TEXT DECORATION FROM THE ROUTER LINK ELEMENTS
            text-decoration: none;
            
            .nav-tabs{
              opacity: .8;
              &:hover{
                border-left: 1px solid whitesmoke;
                border-right: 1px solid whitesmoke;
              }

            }

            .active-nav-tab{
              opacity: 1;
              border-left: 1px solid whitesmoke;
              border-right: 1px solid whitesmoke;
              transition: all .2s ease-in;
            }
          }


        }
        div{
          // border: 1px solid;
          padding: .5rem;
        }
        //THE TEXTS UNDER THE ICONS
        .tab-details-text{
          font-weight: $medium;
          text-transform: capitalize;
          font-size: 1.1rem;
          padding: 1rem 0;     
          text-decoration: none;     
        }

        .github-div{
          border: 1px solid;
          padding: 1rem;
          opacity: .8;
          border-radius: 50%;
        }

        
      }
    }


  }

  @media screen and (max-width:900px) {
        //SHOWING THE LOGO AND MY GITHUB IMAGE ON THE TOP 
    //AND HIDING THEM FROM THE NAVBAR
    .top-page-logo{
        display: block;
    }

    .tpm-info{
        display: block;
    }


    .app-root-div{
      position: fixed;
      height: 10rem;
      width: 100vw;
      left: 0;
      bottom: 0;
      right: 0;

      .app-container{
        .app-container-content{
          display: flex;
          align-items: center;
          flex-direction: row;

          .image-div,.github-div{
            display: none;
          }

          .tabs-container{
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
          }
        }
      }
    }
  }


</style>

