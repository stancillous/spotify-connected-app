<template>
    <div class="nav-root-div">
        <section>

            <!-- THE DIV THAT WILL SHOW ADDITIONAL ACTIONS LIKE LOGGING OUT -->
            <div class="fd-container">

                <div class="fd">
                    <div class="fd-logout">
                        <a href="https://accounts.spotify.com/en/logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
                        <a @click="logUserOut()" href="">logout</a>
                    </div>

                    <div class="f-developer">
                        <a target="_blank" href="https://github.com/stancillous/spotify-connected-app"><i class="fa-brands fa-github"></i></a>
                        <a target="_blank" href="https://github.com/stancillous/spotify-connected-app">github</a>
                    </div>
                </div>

            </div>

            <!-- THE LOGO AND MY GITHUB TO BE SHOWN WHEN THE SCREENSIZE IS SMALL -->
            <div class="top-page-logo">
            <a href="/"><img src="../assets/images.png" alt=""></a>
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
                        <router-link :to="{name:'home'}">
                            <img class="logo-image" src="../assets/images.png" alt="logo">
                        </router-link>
                        
                        </div>
                        <!-- THE ICONS ALLOWING USER TO NAVIGATE -->
                        <div class="tabs-container">

                        <router-link class="router-link-class" :to="{name:'home'}">

                            <div class="user-profile-div nav-tabs ">
                            <span style="font-size: 2.4rem;" class="iconify" data-icon="carbon:home"></span>
                            <p class="tab-details-text">home</p>

                        </div>
                        </router-link>

                        <router-link class="router-link-class" :to="{name:'toptracks'}">
                            <div class="top-tracks-div nav-tabs">
                            <span style="font-size: 2.4rem;" class="iconify" data-icon="bytesize:music"></span>
                            <p class="tab-details-text">top tracks</p>

                        </div>
                        </router-link>

                        <router-link class="router-link-class" :to="{name:'topartists'}">

                            <div class="top-artists-div nav-tabs">
                            <span style="font-size: 3rem;" class="iconify" data-icon="fad:microphone"></span>
                            <p class="tab-details-text">top artists</p>

                        </div>
                        </router-link>

                        <router-link class="router-link-class" :to="{name:'recent'}">
                            <div class="recents-div nav-tabs">
                            <span style="font-size: 2.3rem;" class="iconify" data-icon="carbon:recently-viewed"></span>
                            <p class="tab-details-text">recent</p>

                        </div>
                        </router-link>

                        <router-link class="router-link-class" :to="{name:'playlists'}">
                            <div class="playlists-div nav-tabs">
                            <span style="font-size: 2.2rem;" class="iconify" data-icon="bi:music-note-list"></span>
                            <p class="tab-details-text">playlists</p>
                        </div>
                        </router-link>

                        </div>

                        <div class="github-div">
                        <a target="_blank" href="https://github.com/stancillous/spotify-connected-app"><span style="font-size: 2.5rem;" class="iconify" data-icon="charm:github"></span></a>

                        </div>


                    </div>
                </div>

            </div>

        </section>


    </div>
</template>

<script>
    export default {
        name:'NavComp',
        

        mounted(){
          this.showMoreInfoDiv()
        },
        
        methods:{
            logUserOut(){
                localStorage.removeItem('access_token')
            },
            
          showMoreInfoDiv(){
            let moreInfoButton = document.querySelector('#more-info-button')
    
            //SHOWING THE DIV WITH MORE DETAILS WHEN THIS ELEMENT IS CLICKED
            moreInfoButton.addEventListener('click',()=>{
                document.querySelector('.fd-container').classList.add('show')
            
            })
            
            //HIDING THE DIV ABOVE WHEN USER CILCKS OUTSIDE OF IT
            window.addEventListener('mouseup',function(event){
                let moreInfoContainer = document.querySelector('.fd-container');
                if(event.target != moreInfoContainer && event.target.parentNode != moreInfoContainer){
            
            
                    moreInfoContainer.classList.remove('show')
                }
            }); 
          }
        }

    }
</script>

<style lang="scss" scoped>

$web-font1:"Satoshi", sans-serif;
$web-font2:"General Sans", sans-serif;
// font weights

$light:300;
$regular:400;
$medium:500;
$bold:700;
$black:900;

$web-color:rgb(21, 20, 23);



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
    top:3%;
    left: 3%;
    display: none;

    img{
        width: 5rem;
        border-radius: 50%;
    }
}

// THE 3 DOTS THAT WILL SHOW THE DIV WITH ADDITIONAL ACTIONS LIKE LOGGING OUT
//WILL ONLY BE VISIBLE ON SMALL SCREENS 
.tpm-info{
    position: absolute;
    top: 2.5rem;
    right: 2rem;
    display: none;
    .tpm-button{
        i{
            font-size: 2.5rem;
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
    z-index: 3239;
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
            width: 9rem;
          }
        }

        .tabs-container{

          .router-link-class{  //REMOVING THE DEFAULT TEXT DECORATION FROM THE ROUTER LINK ELEMENTS
            text-decoration: none;
            text-decoration:dotted;
            opacity: .7;

            &.router-link-exact-active{//ACTIVE ROUTER LINK
              opacity: 1;
             
              div{  
              border-right:1px solid white;
              border-left:1px solid white;
              }
          
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
