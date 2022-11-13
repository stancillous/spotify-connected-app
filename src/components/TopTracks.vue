<template>
    <!-- <NavComp/> -->

    <div class="top-tracks-root-div">


        <section class="top-tracks-section">
                        <!-- spotify attribution logo -->
             <div class="spotify-image-div">
                <img src="../assets/Spotify_Logo_CMYK_Green.png" alt="">
            </div>
            <div class="tts-container">
                <div class="tts-content">
                    <div class="tts-header">
                        <h1 class="tts-h">your top tracks</h1>
                        <h3 class="no-top-tracks">You currently have no top tracks :( </h3>
                        <div class="period">
                            <!-- <a class="last4weeks" href="">last 4 weeks</a>
                            <a href="" class="last6months">last 6 months</a>
                            <a href="" class="alltime">all time</a> -->
                            <!-- <p class="last4weeks">last 4 weeks</p>
                            <p class="last6months">last 6 months</p>
                            <p  class="alltime">all time</p> -->
                        </div>
                    </div>

                    <div class="tt-section-div">
 

                        <!-- DIV WITH EACH RECENT TRACK -->

                        <!-- <div class="top-track">
                            <img id="top-track-image" src="../assets/images.png" alt="">
                            <div class="song-details">
                                <a href="" class="song-name">montero</a>
                                <a href="" class="artist-name">lil nas</a>
                                <a class="album-name" href="">album name</a>
                            </div>
                            <p class="track-duration">2:34</p>
                            <i id="track-info-icon" class="fa-solid fa-ellipsis-vertical"></i>
                        </div> -->
     
                        

                    </div>
                </div>
            </div>
        </section>
 
    </div>
</template>

<script>
    // import NavComp from './NavBar.vue'

    
    export default {
        name:'TopTracksComp',

        components:{
            // NavComp
        },

        data(){
            return{
                top_tracks_url :`https://api.spotify.com/v1/me/top/tracks?limit=25&offset=0&time_range=short_term`
            }
        },

        //INJECTING THE TOKEN PROVIDED FROM THE APP.VUE COMPONENT
        inject:['token'],

        // mounted(){
        //     this.getTopTracks()
        // },
        created: function() {
            window.addEventListener('load',this.getTopTracks());
        },

        methods:{
            millisToMinutesAndSeconds(millis) {
                    var minutes = Math.floor(millis / 60000);
                    var seconds = Math.floor((millis % 60000) / 1000).toFixed(0);
                    return (
                        seconds == 60 ?
                        (minutes+1) + ":00" :
                        minutes + ":" + (seconds < 10 ? "0" : "") + seconds
                    );
                },

            async getTopTracks(){
                try {
                    let response = await fetch(this.top_tracks_url,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,
                    }
                })

                let info = await response.json()

                //the text to be shown if user has no top tracks 
                if(info.total==0 && info.items.length==0){
                    document.querySelector('.no-top-tracks').style.display = "block"
                }
                let recentSongsArray = info.items //WILL RETURN AN ARRAY WITH THE RECENT SONGS
                
                
                recentSongsArray.forEach((item,index)=>{
                    
                    //ONLY SHOW AT LEAST 25 RECENTLY PLAYED SONGS
                    if (index<25){
                        // console.log( 'index of item',item,index)

                        //ID TO BE PASSED AS A QUERY TO THE TRACKINFO COMP 
                        //THE ID WILL BE USED TO GET AUDIO INFO ABOUT THE SPECIFIC TRACK
                        let id = item.id
                        
                        //GRABBING ARTIST ID: WHEN ARTIST NAME IS CLICKED REDIRECT TO ANOTHER PAGE
                        //WITH THE ARTIST INFO. THE artistID WILL BE USED THERE
                        let artistID = item.artists[0].id


                        //CREATING THE THUMNAIL IMAGE OF THE RECENT SONG
                        let recentImage = document.createElement('img')
                        recentImage.setAttribute('id','top-track-image')
                        recentImage.src = item.album.images[0].url


                        //CREATING ELEMENT FOR THE ALBUM NAME
                        let albumName = document.createElement('a')
                        albumName.setAttribute('class','album-name')
                        albumName.textContent = item.album.name
                
                        //CREATE ELEMENT FOR THE SONG NAME
                        let songName = document.createElement('a')
                        songName.setAttribute('class','song-name')
                        songName.textContent = item.name
                        songName.href = `/trackinfo?id=${id}`

                        //CREATING ELEMENT FOR THE ARTIST NAME
                        let artistName = document.createElement('a')
                        artistName.setAttribute('class','artist-name')
                        artistName.textContent = item.artists[0].name
                        artistName.href = `/artistInfo?artistID=${artistID}`

                        //CREATING ELEMENT TO HOLD THE TRACK DURATION
                        let trackDuration = document.createElement('p')
                        trackDuration.setAttribute('class','track-duration')
                        let trackDurationInMinutes= this.millisToMinutesAndSeconds(item.duration_ms)
                        // console.log(trackDuration)
                        // console.log(typeof(trackDurationInMinutes))

                        trackDuration.textContent = trackDurationInMinutes

                        let topTrackDiv = document.createElement('a')
                        topTrackDiv.href = `/trackinfo?id=${id}`
                        topTrackDiv.setAttribute('class','top-track')
               
                        let songDetailsDiv = document.createElement('div')
                        songDetailsDiv.setAttribute('class','song-details')
                        //APPENDING TO THE DOM
                        songDetailsDiv.append(songName,artistName,albumName,trackDuration)

                        topTrackDiv.append(recentImage,songDetailsDiv)
                
                        document.querySelector('.tt-section-div').append(topTrackDiv)
    

                    }

                })

            
                } catch (error) {
                    console.log(error.message)
                }

                
            }
        }

    }
</script>

<style lang="scss" >

$web-font1:"Satoshi", sans-serif;
$web-font2:"General Sans", sans-serif;
// font weights

$light:300;
$regular:400;
$medium:500;
$bold:700;
$black:900;

$web-color:rgb(21, 20, 23);
$padding-top:7rem;



.top-tracks-section{
    width: 100vw;
    padding-bottom: 8rem;
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
    .tts-container{
        .tts-content{
            // border: 2px solid;
            max-width: 1400px;
            width: 100%;
            min-height: 100vh;
            margin: 0 auto;

            .tts-header{
                display: flex;
                // align-items: center;
                flex-direction:column;
                // justify-content: space-between;
                // border: 2px solid;
                padding-right: 4rem;
                
                h1{
                    font-weight: $black;
                    font-size: 2rem;
                    text-transform: capitalize;
                    padding: 2rem;
                }
                
                //the text to be shown if user has no top tracks
                .no-top-tracks{
                    display: none;
                    padding:2rem;
                    opacity:.7;
                    font-size: 1.4rem;

                }

                .period{
                    p{
                        font-size: 1.4rem;
                        font-weight: $medium;
                        text-transform: capitalize;
                        display: inline-block;
                        padding: 0 1rem;
                        cursor: pointer;
                    }
                }

                a{
                    font-size: 1.4rem;
                    font-weight: $medium;
                    text-decoration: none;
                    padding: 1rem;
                    text-transform: capitalize;
                }
                
            }


            .tt-section-div{
                .top-track{
                    
                    display: flex;
                    align-items: center;
                    margin: 3rem 2rem;
                    position: relative;
                    text-decoration: none;

                    &:hover{
                        border: 2px solid rgb(245, 245, 245,.5);
                        opacity: .8;
                    }
                    #top-track-image{
                        width: 6rem;
                        height: 6rem;
                        object-fit:cover;
                        color: white;
                    }
   
                    
                    .track-duration{
                        font-size: 1.2rem;
                        position: absolute;
                        top:30% ;
                        right: 4rem;
                        opacity: .9;
                    }

                    .song-details{
                        padding-left: 1.7rem;
                        .song-name{
                            display: block;
                            font-size: 1.5rem;
                            text-transform: capitalize;
                            font-weight: $bold;
                            text-decoration: none;
                            padding-bottom: .5rem;

                            &:hover{
                                text-decoration: underline;
                            }
                        }

                        .artist-name{
                            opacity: .8;
                            font-size: medium;
                            text-transform: capitalize;
                            font-size:1.3rem;
                            padding-right: .8rem;
                            // letter-spacing: .1rem;
                            text-decoration: none;

                            &:hover{
                                text-decoration: underline;
                            }
                        }
                        .album-name{
                            opacity: .8;
                            font-size: medium;
                            text-transform: capitalize;
                            font-size:1.3rem;
                            padding-right: .8rem;
                            // letter-spacing: .1rem;
                            text-decoration: none;
                        }

                    }
                }
            }
        }
    }
}



@media screen and (max-width:900px) {

    .top-tracks-section{
        padding: unset;
        padding-top: 5rem;
        margin-bottom: 15rem;

         //hiding the spotify attribution icon on smaller screens
         .spotify-image-div{
            display: none;
        }

    }

}

@media screen and (max-width:700px) {
    .top-tracks-section{
        padding-top: $padding-top;

        .tts-container .tts-content .tt-section-div .top-track{
            .track-duration{
                right: 1.5rem;
                font-size: 1rem;
            }
          
            .song-details{

                width: 65%;
                white-space: nowrap; 
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

}

@media screen and (max-width:503px) {
    .top-tracks-section .tts-container .tts-content{
        .tts-header h1{
            font-size: 1.4rem;
        }
        .tt-section-div .top-track{
            #top-track-image{
                width: 5rem;
                height: 5rem;
            }
            .preview-song-button{
                font-size: 1.7rem;
            }
            .song-details{
                .song-name{
                    font-size: 1.2rem;
                }
                .artist-name, .album-name{
                    font-size: 1.1rem;
                }
            }
        }
    }
}
</style>

