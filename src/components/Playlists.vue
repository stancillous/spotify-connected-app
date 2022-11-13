<template>
    <!-- <NavComp/> -->

    <div class="playlists-root-div">

        <section class="your-playlists-section">

            <!-- spotify attribution logo -->
             <div class="spotify-image-div">
                <img src="../assets/Spotify_Logo_CMYK_Green.png" alt="">
            </div>


            <div class="yp-container">
                <h1>your playlists</h1>
                <h3 class="zero-playlists">You do not have any saved playlists</h3>
                <div class="yp-content">
                    <!-- DIV WITH THE PLAYLIST DETAILS-->
                    <!-- <div class="playlist">
                        <a href="./playlisttracks.html"><img id="playlist-image" src="../images/playlist.jpg" alt=""></a>
                        <a id="playlist-name" class="artist-spotify-link" href="./playlisttracks.html">street car</a>

                        <p class="playlist-track-number">43 tracks</p>
                    </div> -->





                </div>
            </div>
        </section>

    </div>
</template>

<script>
    // import NavComp from './NavBar.vue'


    export default {
        name:'PlaylistsComp',
        
        components:{
            // NavComp
        },
        created: function() {
            window.addEventListener('load',this.getPlaylists());
        },

        data(){
            return{
                user_playlists_url:`https://api.spotify.com/v1/me/playlists?limit=25`,

            }
        },

        //INJECTING THE TOKEN PROVIDED FROM THE APP.VUE COMPONENT
        inject:['token'],

        // mounted(){
        //     this.getPlaylists()
        // },

        methods:{
             async getPlaylists(){

                try{
                    let response = await fetch(this.user_playlists_url,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,
                    }
                })
                let info = await response.json()


                //text to be shown if user doesn't have any playlists
                if(info.total==0 && info.items.length==0){
                    document.querySelector('.zero-playlists').style.display = "block"
                }

                let playlists = info.items  //THIS WILL SELECT THE ARRAY WITH THE PLAYLIST DETAILS
                // console.log(playlists);
                playlists.forEach((item,index)=>{
                    // console.log(item);

                    let playlist_id;  //THIS PLAYLIST ID WILL HELP TO FIND
                                        //THE TRAKCS OF THAT PLAYLIST
                    
                    if(index <20){

                        //THIS PLAYLIST ID WILL BE PASSED AS A PARAMETER TO THE PLAYLIST TRACKS PAGE
                        //WHICH WILL TEHN SHOW TRACKS OF THIS PLAYLIST'S ID
                        playlist_id = item.id
                    

                        //CREATING THE IMAGE OF THE PLAYLIST
                        let playlistImage =document.createElement("img")
                        playlistImage.setAttribute('id','playlist-image')
                        playlistImage.src = item.images[0].url

                        //CREATING THE PLAYLIST NAME
                        let playlistname = document.createElement('a')
                        playlistname.setAttribute('id','playlist-name')
                        playlistname.textContent = item.name
                        playlistname.href = `./playlisttracks?id=${playlist_id}`




                        //CREATING AN ANCHOR TAG THAT WILL CONTAIN THEPLAYLIST IMAGE
                        //INSIDE IT
                        let playlistImageLink = document.createElement('a')
                        // playlistImageLink.href = `./PlaylistTracks.vue?id=${playlist_id}`
                        playlistImageLink.href = `./playlisttracks?id=${playlist_id}`
                        playlistImageLink.appendChild(playlistImage)


                        //CREATING THE P TAG TO HOLD THE PLAYLIST TOTAL NUMBER OF TRACKS
                        let playlisttracks = document.createElement('p')
                        playlisttracks.setAttribute('id','playlist-track-number')
                        playlisttracks.textContent = item.tracks.total + '  SONGS'


                        //CREATING A DIV THAT WILL HOLD INFO ABOUT EACH PLAYLIST
                        let playlistsContainer = document.createElement('div')
                        playlistsContainer.setAttribute('class','playlist')
                        playlistsContainer.append(playlistImageLink,playlistname,playlisttracks)

                        //APPENDING TO THE DOM
                        document.querySelector('.yp-content').append(playlistsContainer)


                    }

                })

            
                }
                catch(error){
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

$web-color:rgb(23, 20, 20);
$padding-top:7rem;


.your-playlists-section{
    padding-top:$padding-top ;
    width: 100vw;
    margin-right: 5rem;
    padding-left: 18rem;
    padding-bottom: 8rem;

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


    
    .yp-container{
        max-width: 1400px;
        width: 100%;
        min-height: 100vh;
        margin: 0 auto;


        h1{
            font-size: 2rem;
            font-weight: $black;
            text-transform: capitalize;
            padding: 3rem 2rem;
            text-align: center;
        }

        //the text to be shown if use doesn't have any playlists
        .zero-playlists{
            opacity: .7;
            text-align: center;
            font-size: 1.3rem;
            display: none;

        }

        .yp-content{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    

            .playlist{
                text-align: center;
                width: 22rem;
                margin: 3rem;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;

                &:hover{
                    opacity: .8;
                }
                #playlist-image{
                    width:22rem;
                    text-align: center;
                    height: 20rem;
                    object-fit: cover;
                    margin: 0.4rem;
                    
                }
                #playlist-name{
                    // text-decoration: none;
                    font-size: 1.5rem;
                    // text-transform: capitalize;
                    font-weight: $medium;
                    text-decoration: none;
                    display: block;
                    padding: .4rem 0;
                    &:hover{
                        text-decoration: underline;
                    }
                }

                #playlist-track-number{
                   padding-top: .8rem;
                    text-decoration: none;
                    text-transform: uppercase;
                    font-weight: $light;
                    font-size: 1.1rem;
                }

                
            }

        }
    }
}

//MEDIA QUERIES FOR SMALL SCREENS
@media screen and (max-width:900px) {

    .your-playlists-section{
        padding: unset;
        margin-bottom: 15rem;

        // padding: 3rem;
        // border: 2px solid;

        //hiding the spotify attribution icon on smaller screens
        .spotify-image-div{
            display: none;
        }

        .yp-container .yp-content{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .playlist{
                width: 20rem;

            }
        } 
    }

}

@media screen and (max-width:700px) {
    .your-playlists-section{
        padding-top: $padding-top;

        .yp-container .yp-content{
            .playlist #playlist-image{
                width: 18rem;
            }
        } 
    }

}


@media screen and (max-width:555px) {
    .your-playlists-section{
        padding-top: $padding-top;

        .yp-container{
            h1{
                font-size: 1.4rem;
            }
        } .yp-content .playlist{
            width: 15rem;
            margin: unset;
            margin:3rem .3rem;
            #playlist-image{
                width: 12rem;
                height: 12rem;
                
            }
            #playlist-name{
                font-size: 1.9rem;
            }

        } 
    }

}

</style>
