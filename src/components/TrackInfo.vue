<template>

    <!-- <NavComp/> -->

    <div class="song-info-root-div">

                <!-- spotify attribution logo -->
        <div class="spotify-image-div">
            <img src="../assets/Spotify_Logo_CMYK_Green.png" alt="">
        </div>

        <div class="song-info-container">
            <div class="song-info-content">
                <div class="song-info-div">

                    <!-- DISPLAY GRID/FLEX -->
                    <div class="song-image">
                        <img class="song-img" src="" alt="song image">
                        <h1 class="song-name"></h1>
                        <a href="" class="artist-name"></a>
                        
                        <div class="play-song-div">
                            <a target="_blank" class="play-song" href="">play on spotify</a>

                        </div>

                    </div>

                    <div class="song-features">
                        <div>
                            <p class="song-duration audio-features"></p>
                            <h3 class="feature-name">duration</h3>
                        </div>
                        <div>
                            <p class="song-tempo audio-features"></p>
                            <h3 class="feature-name">tempo</h3>
                        </div>
                        <div>
                            <p class="song-key audio-features"></p>
                            <h3 class="feature-name">key</h3>
                        </div>
                        <div>
                            <p class="song-danceability audio-features"></p>
                            <h3 class="feature-name">danceability</h3>
                        </div>
                        <div>
                            <p class="song-energy audio-features"></p>
                            <h3 class="feature-name">energy</h3>
                        </div>
                        <div>
                            <p class="song-beats audio-features"></p>
                            <h3 class="feature-name">beats</h3>
                        </div>
                        <div>
                            <p class="song-segments audio-features"></p>
                            <h3 class="feature-name">segments</h3>
                        </div>
                        <div>
                            <p class="song-bars audio-features"></p>
                            <h3 class="feature-name">bars</h3>
                        </div>
                        <div>
                            <p class="time-signature audio-features"></p>
                            <h3 class="feature-name">time signature</h3>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // import NavComp from './NavBar.vue'

    export default {
        name:'TrackInfoComp',
        
        components:{
            // NavComp
        },
        data(){

            return{
                id:'',
                url:`https://api.spotify.com/v1/audio-features/${this.id}`,
                track_info:`https://api.spotify.com/v1/tracks/${this.id}`
            }
        },

        //INJECTING THE TOKEN PROVIDED FROM THE APP.VUE COMPONENT
        inject:['token'],

        // mounted(){
        //     this.getIdFromUrl()
        //     this.getSongInfo()
        //     this.getTrackInfo()
        // },

        created: function() {
            window.addEventListener('load',this.callFuncs());
        },
        
        methods:{
            callFuncs(){
                this.getIdFromUrl()
                this.getSongInfo()
                this.getTrackInfo()
    
            },
            //FUNCTION TO GET ID FROM THE URL
            getIdFromUrl(){
                let page_url_string = window.location.search

                let urlParams = new URLSearchParams(page_url_string)

                // let thisPlaylistId = urlParams.get('id')
                this.id  = urlParams.get('id')
                // console.log(this.id)
                
            },

            //FUNCTION TO CONVERT THE TRACKS DURATION FROM MS TO MINUTES
            millisToMinutesAndSeconds(millis) {
                var minutes = Math.floor(millis / 60000);
                var seconds = Math.floor((millis % 60000) / 1000).toFixed(0);
                return (
                    seconds == 60 ?
                    (minutes+1) + ":00" :
                    minutes + ":" + (seconds < 10 ? "0" : "") + seconds
                );
            },

            //FUNCTION TO GET AUDIO FEATURES OF THE TRACK
            async getSongInfo(){
                try {
                    let response = await fetch(`https://api.spotify.com/v1/audio-features/${this.id}`,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,
                    }
                })

                let data = await response.json()

                //CREATING ELEMENT FOR THE IMAGE
                let songImage = document.createElement('img')
                songImage.setAttribute('class','song-img')


                //CREATING ELEMENT FOR SONG NAME
                let songName = document.createElement('h1')
                songName.setAttribute('class','song-name')


                //CREATING ELEMENT FOR THE SONG'S LINK TO SPOTIFY
                let songSpotifyLink = document.createElement('a')
                songSpotifyLink.textContent = 'play'

                //CREATING ELEMENT FOR ARTIST NAME
                let artistName = document.createElement('h1')
                artistName.setAttribute('class','artist-name')

                // ELEMENTS FOR THE SONG AUDIO FEATURES

                document.querySelector('.song-duration').textContent = this.millisToMinutesAndSeconds(data.duration_ms)
                document.querySelector('.song-tempo').textContent = Math.round(data.tempo) 
                document.querySelector('.song-danceability').textContent = data.danceability
                document.querySelector('.song-energy').textContent = data.energy
                document.querySelector('.time-signature').textContent = data.time_signature
                document.querySelector('.song-key').textContent = data.key
                
                
                
                //FETCHING THE AUDIO ANALYSIS
                let analysis_url = data.analysis_url
                
                fetch(analysis_url,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,
                    }
                })
                .then((res)=>res.json())
                .then((info)=>{
                    // console.log(info)
                    
                document.querySelector('.song-beats').textContent = info.beats.length
                document.querySelector('.song-bars').textContent = info.bars.length
                document.querySelector('.song-segments').textContent = info.segments.length

                })
                

    
                } catch (error) {
                    console.log(error.message)
                }
                
            },

            //FUNCTION TO GET IMAGE,SONG NAME AND ARTIST NAME OF THE TRACK
            getTrackInfo(){

            fetch(`https://api.spotify.com/v1/tracks/${this.id}`,{
                headers:{
                    'Authorization':`Bearer ${this.token}`,
                }
            })

            .then(res => res.json())
            .then((info)=>{

                document.querySelector('.song-img').src = info.album.images[1].url
                document.querySelector('.song-name').textContent= info.name
                document.querySelector('.artist-name').textContent = info.artists[0].name
                let artistID = info.artists[0].id
                document.querySelector('.artist-name').href =`./artistInfo?artistID=${artistID}` 
                document.querySelector('.play-song').href=info.external_urls.spotify

            })
            }

        },

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

$padding-top:7rem;

$web-color:rgb(14, 14, 15);




* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 10px;
  }
  
  body{
    background-color:$web-color;
    font-family: $web-font1,$web-font2;
    margin-bottom: 10rem;
    overflow-x: hidden;
    color: white;

    a{
        color: white;
        // text-decoration: none;
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

.song-info-root-div{
    // border: 1px solid;
    max-width: 1300px;
    margin: 0 auto;
    width: 100vw;
    // border: 2px solid;
    padding-top: $padding-top;
    padding-left: 20rem;

    //SPOTIFY ATTRIBUTION IMAGE
    .spotify-image-div{
        margin: 0 auto;
        display: flex;
        // border: 2px solid;
        margin-bottom: 3rem;
        padding-left: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        max-width: 1400px;

        img{
            width: 12rem;
        }
    }


    .song-info-container{
        margin: 2rem;
        .song-info-content{
            
            .song-info-div{
                display: grid;
                grid-template-columns: 30% 70%;
                grid-gap: 1rem;

                .song-image{
                    //image of the song
                    .song-img{
                        width: 16rem;
                        object-fit: cover;
                    }
                    //artist name
                    .artist-name{
                        font-size: 1.8rem;
                        font-weight: $bold;
                        opacity: .9;
                        
                    }
                    
                    //song name
                    .song-name{
                        padding-bottom: 0.4rem;
                        font-size: 2.4rem;
                        font-weight: $black;
                        text-transform: capitalize;

                    }

                    .play-song-div{
                        margin: 3rem 0;
                    //button to play the song

                    .play-song{
                        text-decoration: none;
                        border: 1px solid white;
                        font-size: 1.1rem;
                        background-color: black;
                        color: white;
                        font-weight: $bold;
                        padding: .8rem 6rem;
                        text-transform: uppercase;
                        border-radius: 2rem;

                        &:hover{
                            background-color: white;
                            color: black;
                            transition: all .2s ease-in;
                        }

    
                    }
                    }


                }

                .song-features{
                    display: grid;
                    grid-gap: .4rem;
                    // grid-template-columns: 1fr 1fr 1fr;
                    grid-template-columns: repeat(3,1fr);

                    div{
                        border: 1px solid rgba(255, 255, 255,.5);
                        text-align: center;
                        padding: .8rem;

                        .audio-features{
                            font-weight: $black;
                            font-size: 2.5rem;
                            padding: 1rem 0;
                        }
                        
                        .feature-name{
                            opacity: .7;
                            font-weight: $medium;
                            font-size: 1.6rem;
                            text-transform: capitalize;
                        }

                    }
                }
            }
            
        }
    }
}

@media screen and (max-width:900px) {
    .song-info-root-div{
        padding: unset;
        padding-top: 8rem;
        margin-bottom: 15rem;

         //hiding the spotify attribution icon on smaller screens
         .spotify-image-div{
            display: none;
        }
        

        .song-info-container .song-info-content .song-info-div{
            .song-image{
                .artist-name{
                    font-size: 1.5rem;
                }
                .song-name{
                    font-size: 1.8rem;
                }

            }
            .song-features{
                div{
                    .audio-features{
                        font-size: 1.8rem;
                    }
                    .feature-name{
                        font-size: 1.4rem;
                    }

                }

            }
        }



    }

}

@media screen and (max-width:650px) {
    .song-info-root-div .song-info-container .song-info-content .song-info-div{
        display: flex;
        flex-direction: column;

        .song-image{
            .artist-name{
                font-size: 1.2rem;
            }
            .song-name{
                font-size: 1.4rem;
            }
            .play-song-div{
                .play-song{
                    padding: .8rem 1.5rem;
                    font-size: 0.8rem;
                }
            }
        }

        .song-features{
            div{
                .audio-features{
                    font-size: 1.4rem;
                }
                .feature-name{
                    font-size: 1.2rem;
                }
            }
        }
    }
}



</style>
