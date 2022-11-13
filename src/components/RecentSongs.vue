<template>

    <!-- <NavComp/> -->
    <div class="recent-songs-root-div">
        
        
        <section class="recently-played-section">
            <!-- spotify attribution logo -->
             <div class="spotify-image-div">
                <img src="../assets/Spotify_Logo_CMYK_Green.png" alt="">
            </div>
            <div class="rp-container">
                <div class="rp-content">
                    <h1 class="rp-h">recently played tracks</h1>
                    <div class="rp-songs-div">
                        <!-- DIV WITH EACH RECENT TRACK -->

                        <!-- <div class="recent-song-div">
                            <img id="recently-played-song-image" src="../images/profile.jpg" alt="">
                            <div class="song-details">
                                <a href="" class="song-name">montero</a>
                                <a href="" class="artist-name">lil nas</a>
                                <a class="album-name" href="">album name</a>
                            </div>
                            <p class="track-duration"></p>
                            
                        </div> -->

                        

                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name:'RecentSongsComp',

        components:{
            // NavComp
        },
        created: function() {
            window.addEventListener('load',this.recentlyPlayed());
        },
        data(){
            return{
                
                recently_played_tracks :`https://api.spotify.com/v1/me/player/recently-played?limit=25`,
                token:localStorage.getItem('access_token')
            }
        },

        //INJECTING THE TOKEN PROVIDED FROM THE APP.VUE COMPONENT
        // inject:['token'],

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
            async recentlyPlayed(){
                try {
                    let response = await fetch(this.recently_played_tracks,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,
                    }
                })
                let info = await response.json()

                let recentSongsArray = info.items //WILL RETURN AN ARRAY WITH THE RECENT SONGS
                // console.log(recentSongsArray);

                recentSongsArray.forEach((item,index)=>{

                    //ONLY SHOW AT LEAST 25 RECENTLY PLAYED SONGS
                    if (index<25){

                        //ID TO BE PASSED AS A QUERY TO THE TRACKINFO COMP 
                        //THE ID WILL BE USED TO GET AUDIO INFO ABOUT THE SPECIFIC TRACK
                        let id = item.track.id

                        //GRABBING ARTIST ID: WHEN ARTIST NAME IS CLICKED REDIRECT TO ANOTHER PAGE
                        //WITH THE ARTIST INFO. THE artistID WILL BE USED THERE
                        let artistID = item.track.artists[0].id


                        // console.log(item)
                        // console.log(item.track.artists[0].id)

                        //CREATING THE THUMNAIL IMAGE OF THE RECENT SONG
                        let recentImage = document.createElement('img')
                        recentImage.setAttribute('id','recently-played-song-image')
                        recentImage.src = item.track.album.images[0].url


                        //CREATING ELEMENT FOR THE ALBUM NAME
                        let albumName = document.createElement('a')
                        albumName.setAttribute('class','album-name')
                        albumName.textContent = item.track.album.name
                
                        //CREATE ELEMENT FOR THE SONG NAME
                        let songName = document.createElement('a')
                        songName.setAttribute('class','song-name')
                        songName.textContent = item.track.name
                        songName.href = `/trackinfo?id=${id}`

                        //CREATING ELEMENT FOR THE ARTIST NAME
                        let artistName = document.createElement('a')
                        artistName.setAttribute('class','artist-name')
                        artistName.textContent = item.track.artists[0].name
                        artistName.href = `./artistInfo?artistID=${artistID}`

                        //CREATING ELEMENT TO HOLD THE TRACK DURATION
                        let trackDuration = document.createElement('p')
                        trackDuration.setAttribute('class','track-duration')
                        let trackDurationInMinutes= this.millisToMinutesAndSeconds(item.track.duration_ms)
            
                        trackDuration.textContent = trackDurationInMinutes



                        //APPENDING TO THE DOM
                        let recentSongDiv = document.createElement('a')
                        recentSongDiv.href = `/trackinfo?id=${id}`
                        recentSongDiv.setAttribute('class','recent-song-div')

                        let  songDetailsDiv = document.createElement('div')
                        songDetailsDiv.setAttribute('class','song-details')
                        songDetailsDiv.append(songName,artistName,albumName, trackDuration)

                        recentSongDiv.append(recentImage,songDetailsDiv)
                
                        document.querySelector('.rp-songs-div').append(recentSongDiv)
                

                    }

                })
        
           
                } catch (error) {
                    console.log(error.message)
                }

            }

        },





        

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

$web-color:rgb(23, 20, 20);
$padding-top:7rem;


.recently-played-section{
    padding-bottom: 8rem;
    width: 100vw;
    padding-left: 20rem;
    padding-top: $padding-top;

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

    .rp-container{
        .rp-content{
            max-width: 1300px;
            width: 100%;
            min-height: 100vh;
            margin: 0 auto;

            h1{
                font-weight: $black;
                font-size: 1.8rem;
                text-transform: capitalize;
                padding: 2rem;
            }
            .rp-songs-div{
                // border: 2px solid red;

                .recent-song-div{
                    display: flex;
                    align-items: center;
                    // border: 2px solid;
                    margin: 3rem 2rem;
                    position: relative;
                    text-decoration: none;
                    &:hover{
                        border: 1px solid rgba(245, 245, 245,.4);
                        opacity: .8;
                    }
                    #recently-played-song-image{
                        width: 6rem;
                        height: 6rem;
                        object-fit:cover;
                        color: white;
                    }
   
                    .track-duration{
                        font-size: 1.2rem;
                        position: absolute;
                        font-weight: $regular;
                        right: 4rem;
                        top:30%;
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

    .recently-played-section{
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
    .recently-played-section{
        padding-top: $padding-top;
        .rp-container .rp-content .rp-songs-div .recent-song-div{
            .song-details{
                width: 65%;
                white-space: nowrap; 
                overflow: hidden;
                text-overflow: ellipsis;
    
            }

            .track-duration{
                right: 1.5rem;
                font-size: 1rem;

            }
        } 
    }

}

@media screen and (max-width:504px) {
    .recently-played-section .rp-container .rp-content {
        h1{
        font-size: 1.4rem;}

        .rp-songs-div {
            .recent-song-div{
                #recently-played-song-image{
                    width: 5rem;
                    height:5rem;
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
}
</style>
