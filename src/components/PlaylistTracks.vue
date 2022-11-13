<template>
    <!-- <NavComp/> -->
    
    <div class="playlist-tracks-root-div">
        <section class="playlist-tracks-section">
            <div class="spotify-image-div">
                <img src="../assets/Spotify_Logo_CMYK_Green.png" alt="">
            </div>

            <div class="pts-container">
                <div class="pts-content">

                    
                    <!-- <div class="playlist-details">
                        <img id="playlist-image" src="../images/jiokoe.jpg" alt="">

                        <div class="playlist-info">
                            <p class="playlist-name">streetcar</p>
                            <p class="description">chill indie vibes to study with </p>
                            <p class="created-by">Created by:  sierra</p>
                            <p class="playlist-likes">34</p>
                            
                            <div class="view-on-spotify">
                                <p class="track-duration"></p>

                            </div>                            
                            
                        </div>
                    </div> -->

                    

                    <div class="the-playlist-songs">
                        <div class="pt-container">
                            <div class="pt-content">
                                <h1>this playlist's tracks</h1>
                                <div class="pt-songs-div">
                                    <!-- DIV WITH EACH RECENT TRACK -->
            
                                    <!-- <div class="playlist-tracks">
                                        <img id="track-image" src="../images/jiokoe.jpg" alt="">
                                        <div class="song-details">
                                            <a href="" class="song-name">montero</a>
                                            <a href="" class="artist-name">lil nas</a>
                                            <a class="album-name" href="">album name making this paragraph ver ver ver ver long </a>
                                        </div>
                                        <p class="track-duration"></p>
                                    </div> -->

                     
                                    
            
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </div>
</template>

<script>
    // import NavComp from './NavBar.vue'


    export default {
        name:'PlaylistTracksComp',

        components:{
            // NavComp
        },

        data(){

            return{
                thisPlaylistId:'',
                // playlist_url:`https://api.spotify.com/v1/playlists/${thisPlaylistId}`
                // playlist_tracks_url: `https://api.spotify.com/v1/playlists/${thisPlaylistId}/tracks`,
                // playlist_tracks_url: `https://api.spotify.com/v1/playlists/6CEV7QoIq3WKVNhvi7LQLl/tracks`,
                // playlist_url:`https://api.spotify.com/v1/playlists/6CEV7QoIq3WKVNhvi7LQLl`
            }
        },

        inject:['token'],
        created: function() {
            window.addEventListener('load',this.callFuncs());
        },

        // mounted(){
        //     this.getIdFromUrl()
        //     this.getPlaylistsInfo()
        //     this.getPlaylistTracks()
        // },

        methods:{
            callFuncs(){
                this.getIdFromUrl()
                this.getPlaylistsInfo()
                this.getPlaylistTracks()
            },

            millisToMinutesAndSeconds(millis) {
                    var minutes = Math.floor(millis / 60000);
                    var seconds = Math.floor((millis % 60000) / 1000).toFixed(0);
                    return (
                        seconds == 60 ?
                        (minutes+1) + ":00" :
                        minutes + ":" + (seconds < 10 ? "0" : "") + seconds
                    );
            },

            getIdFromUrl(){
                let page_url_string = window.location.search

                let urlParams = new URLSearchParams(page_url_string)

                // let thisPlaylistId = urlParams.get('id')
                this.thisPlaylistId  = urlParams.get('id')
                // console.log(this.thisPlaylistId)
                
            },

            //THIS FUNCTION WILL TAKE THE ID PASSED IN THE URL AND ONLY SHOW
            //PLAYLIST INFO OF THE SPECIFIC PLAYLIST USING THE PLAYLIST ID
            async getPlaylistsInfo(){
                try {
                    let response = await fetch(`https://api.spotify.com/v1/playlists/${this.thisPlaylistId}`,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,
                    }
                })

                let info = await response.json()

                //CREATING THE IMAGE OF THE PLAYLIST
                let playlistImage =document.createElement("img")
                playlistImage.setAttribute('id','playlist-image')
                playlistImage.src = info.images[0].url
        
                //CREATING THE PLAYLIST NAME
                let playlistname = document.createElement('a')
                playlistname.setAttribute('class','playlist-name')
                playlistname.textContent = info.name
        
                //CREATING ELEMENT TO HOLD THE PLAYLIST'S DESCRIPTION
                let playlistDescription = document.createElement('p')
                playlistDescription.setAttribute('class','description')
                playlistDescription.textContent = info.description
        
                //CREATE ELEMENT TO HOLD THE OWNER'S NAME
                let playlistOwner = document.createElement('p')
                playlistOwner.setAttribute('class','created-by')
                playlistOwner.textContent = "Created by: "+ info.owner.display_name
        
                //CREATING ELEMENT TO HOLD THE NUMBER OF LIKES OF THE PLAYLIST
                let playlistLikes = document.createElement('p')
                playlistLikes.setAttribute('class','playlist-likes')
                // playlistLikes.textContent = info.followers.total

                //GET THE TOTAL LIKES OF THE PLAYLIST
                // let playlistTotalLikes = info.followers.total

                //FORMATTING THE USER'S FOLLOWERS SO AS TO PUT COMMAS
                //WHERE NEEDED IN THE NUMBER
                // internationalNumberFormat = new Intl.NumberFormat('en-US')
                // playlistLikes.textContent = internationalNumberFormat.format(playlistTotalLikes) +' likes'

            
                //CREATE EXTERNAML LINK THAT WILL DIRECT TO THE ARTIST'S SPOTIFY 
                let viewPlaylistOnSpotify = document.createElement('a')
                viewPlaylistOnSpotify.setAttribute('class','view-on-spotify-button')
                viewPlaylistOnSpotify.textContent = 'play on spotify'
                viewPlaylistOnSpotify.setAttribute('target','_blank')
                viewPlaylistOnSpotify.href = info.external_urls.spotify
                

                let viewPlaylistOnSpotifyContainer  = document.createElement('div')
                viewPlaylistOnSpotifyContainer.setAttribute('class','view-on-spotify')

                viewPlaylistOnSpotifyContainer.append(viewPlaylistOnSpotify)
        
                //CREATING A DIV THAT WILL HOLD INFO ABOUT EACH PLAYLIST
                let playlistDetails = document.createElement('div')
                playlistDetails.setAttribute('class','playlist-details')
        
                //CREATE DIV THAT WILL HAVE THE PLAYLISTS INFO
                let playlistInfo = document.createElement('div')
                playlistInfo.setAttribute('class','playlist-info')
                playlistInfo.append(playlistname,playlistDescription,playlistOwner,playlistLikes,viewPlaylistOnSpotifyContainer)
        
        
                playlistDetails.append(playlistImage,playlistInfo)
        
                //APPENDING TO THE DOM
                document.querySelector('.pts-content').append(playlistDetails)
        

        
                } catch (error) {
                    console.log(error.message)
                }
                
            },

            //THIS FUNCTION WILL GET, BY THE HELP OF THE PLAYLIST ID, THE TRACKS BELONGING TO
            //THAT PLAYLIST AND THEN DISPLAY THEM 
            async getPlaylistTracks(){
                try {
                    let response = await fetch(`https://api.spotify.com/v1/playlists/${this.thisPlaylistId}/tracks`,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,
                    }
                })

                let info = await response.json()

                let playlistTrack = info.items //WILL RETURN AN ARRAY WITH THE RECENT SONGS


                playlistTrack.forEach((item,index)=>{

                    //ONLY SHOW THIS MUCH
                    if (index<40){

                        //ID TO BE PASSED AS A QUERY TO THE TRACKINFO COMP 
                        //THE ID WILL BE USED TO GET AUDIO INFO ABOUT THE SPECIFIC TRACK
                        let id = item.track.id

                        //GRABBING ARTIST ID: WHEN ARTIST NAME IS CLICKED REDIRECT TO ANOTHER PAGE
                        //WITH THE ARTIST INFO. THE artistID WILL BE USED THERE
                        let artistID = item.track.artists[0].id
            
                        
                        //CREATING THE THUMNAIL IMAGE OF THE TRACK SONG
                        let trackImage = document.createElement('img')
                        trackImage.setAttribute('id','track-image')
                        trackImage.src = item.track.album.images[0].url


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
                        let trackDiv = document.createElement('a')
                        trackDiv.href=`/trackinfo?id=${id}`
                        trackDiv.setAttribute('class','playlist-tracks')

                        let  songDetailsDiv = document.createElement('div')
                        songDetailsDiv.setAttribute('class','song-details')
                        songDetailsDiv.append(songName,artistName,albumName)

                        trackDiv.append(trackImage,songDetailsDiv,trackDuration)
                
                        document.querySelector('.pt-songs-div').append(trackDiv)
                

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
$padding-top:7rem;

$web-color:rgb(14, 14, 15);

body{
    background-color: $web-color;
}



.playlist-tracks-section{
    padding-top: $padding-top;
    width: 100vw;
    padding-left: 20rem;
    padding-bottom:8rem;
    
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
    
    .pts-container{
        .pts-content{
            display: flex;
            flex-direction: column-reverse;

            // flex-direction: column-reverse;
            // border: 2px solid white;

            //THE DIV SHOWING THE PLAYLIST DETAILS  
            .playlist-details{
                display: flex;
                padding-bottom: 1rem;
                border-bottom: 1px solid rgba(255, 255, 255,.5) ;
                align-items: center;
                
                #playlist-image{
                    width: 22rem;
                    height: 20rem;
                    object-fit: cover;
                }

                .playlist-info{
                    padding: 2rem;

                    // border: 2px solid;
                    
                    .playlist-name{
                        font-size: 2rem;
                        font-weight: $bold;
                    }

                    .created-by{

                        font-size: 1.4rem;
                        // text-transform: capitalize;
                        font-weight: $light;
                        opacity: .9;
                        padding: .5rem 0;
                        letter-spacing: .1rem;
                    }

                    .playlist-likes{
                        font-size: 1.4rem;
                        font-weight: $light;
                        opacity: .9;
                        letter-spacing: .13rem;


                    }

                    .description{
                        font-size: 1.6rem;
                        font-weight: $regular;
                        opacity: .8;
                        padding: .4rem 0;
                        padding-top: 1rem;

                    }

                    .view-on-spotify{

                        margin-top: 3rem;
                        .view-on-spotify-button{
                            font-weight: $bold;
                            font-size: 1.1rem;
                            text-transform: uppercase;
                            text-decoration: none;
                            padding: 1.2rem 1.5rem;
                            border-radius: 34rem;
                            background-color: #1d8954;
    
                            &:hover{
                                opacity: .8;
                            }
                        }
                    }

                }
            }

            
            .the-playlist-songs{
                // border: 2px solid red;
                padding-top: 5rem;
                .pt-container{
                    .pt-content{
                        // display: flex;
                        // border: 2px solid red;
                        // flex-direction: column-reverse;
            
                        h1{
                            font-weight: $black;
                            font-size: 1.8rem;
                            text-transform: capitalize;
                            padding: .1rem ;
                        }
                        .pt-songs-div{
                            // border: 2px solid red;
                            .playlist-tracks{
                                display: flex;
                                align-items: center;
                                // margin: 3rem 2rem;
                                margin-top: 3rem;
                                text-decoration: none;
                                position: relative;
                                &:hover{
                                    opacity: .8;
                                    border: 1px solid rgba(245, 245, 245,.4);

                                }
                                #track-image{
                                    width: 6rem;
                                    height: 6rem;
                                    object-fit:cover;
                                    color: white;
                                }

                                .track-duration{
                                    font-size: 1.2rem;
                                    position: absolute;
                                    right: 4rem;
                                    top: 30%;
                                    opacity: .9;
                                    font-weight: $regular;
                                }
            
                                .song-details{
                                    // border: 2px solid red;
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

        }
    }
}




@media screen and (max-width:900px) {
    .playlist-tracks-section{
        padding: unset;
        padding-top: 5rem;
        padding: 3rem 2rem ;
        margin-bottom: 15rem;

         //hiding the spotify attribution icon on smaller screens
         .spotify-image-div{
            display: none;
        }

    }
}

@media screen and (max-width:700px) {
    .playlist-tracks-section{
        padding-top: $padding-top;
 


        .pts-container .pts-content{
            .playlist-details{
                .playlist-info{
                    .playlist-name{
                        font-size: 2rem;                
                    }
                    .description{
                        font-size: 1.5rem;
                    }
                    .created-by{
                        font-size: 1.3rem;
                    }
                }
            }

            .the-playlist-songs .pt-container .pt-content .pt-songs-div .playlist-tracks{
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
}

@media screen and (max-width:650px) {
    .playlist-tracks-section .pts-container .pts-content {
        .playlist-details{
            flex-direction: column;
            #playlist-image{
                margin-bottom: 1rem;
            }

            .playlist-info{
                .playlist-name{
                    font-size: 1.6rem;
                }
                .description{
                    font-size: 1.3rem;
                }
                .created-by{
                    font-size: 1.1rem;

                }
                .view-on-spotify{
                    .view-on-spotify-button{
                        font-size: 0.9rem;
                    }
                }
            }

        }

        .the-playlist-songs{
            .pt-container .pt-content{
                h1{
                    font-size: 1.4rem;
                }

                .pt-songs-div{
                    .playlist-tracks{
                        #track-image{
                            width: 5rem;
                            height: 5rem;
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
    }
}
</style>
