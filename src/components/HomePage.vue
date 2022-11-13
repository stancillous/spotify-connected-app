<template>
    <div v-if="token" class="homepage-root-div">

        <!-- <NavComp/> -->
        <section class="user-details-info-section">

            <div class="udis-container">
                <!-- the div in the top right corner with the image and user name  -->
                <div class="user-name-img">
                    <!-- spotify attribution logo -->
                    <div class="spotify-image-div">
                        <img src="../assets/Spotify_Logo_CMYK_Green.png" alt="">
                    </div>

                    <div id="name-img">
                        <img id="tiny-user-img" src="" alt="">
                        <p id="tiny-user-name"></p>
                        <!-- <a id="logout-button" href=""><i class="fa-solid fa-ellipsis-vertical"></i></a>  -->
                        <p id="logout-button" ><i class="fa-solid fa-ellipsis-vertical"></i></p> 
                  
                        <!-- THIS DIV CONTAINS THE BUTTON TO ALLOW USER TO LOG OUT -->
                        <div class="logout">
                            <!-- <a class="logout-cta" href="https://accounts.spotify.com/en/logout">logout</a> -->
                            <a href="" @click="logUserOut()" class="logout-cta" >logout</a>
                        </div>
                    </div>
                </div>

                <!-- this has the image, name, followers, following, and playlists of the user -->
                <div class="udis-content">

                    <div class="content-display-flex">

                        <div class="udis-image">
                        <!-- <img id="user-avatar" src="../assets/user.png" alt=""> -->

                            <!-- <img src="../assets/logo.png" alt=""> -->
                            <!-- <img id="user-avatar" src="./images/profile.jpg" alt=""> -->
                        </div>
                        <div class="udis-name">
                            <!-- <a id="username" href="">stancillous</a> -->
                        </div>
                        <div class="udis-following">
                            <div class="following-playlists-followers">
    
                                <div class="following">
                                    <p id="number-of-following">0</p>
                                    <!-- <a class="following-link"  href="">following</a> -->
                                    <router-link class="following-link" :to="{name:'following'}">following</router-link>
                                </div>

                                <div class="following">
                                    <p  id="followers">0</p>
                                    <h3>followers</h3>
                                </div>

                                <div class="playlists">
                                    <p id="user-total-playlists">0</p>
                                    <!-- <a id="playlists" href="./Playlists.vue">playlists</a> -->
                                    <router-link id="playlists" :to="{name:'playlists'}">playlists</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
   

                </div>
            </div>
        </section>

        <section class="top-artists-playlists">
            <div class="tap-container">
                <!-- PLAYLIST SUMMARY DIV HOME PAGE -->
                <div class="your-playlists">
                   
                    <!-- DIV WITH THE TITLE AND THE BUTTON -->
                    <div class="see-more">
                        <h1>your playlists</h1>
                        <!-- <a class="view-all" href="./Playlists.vue">view all</a> -->
                        <router-link  id="playlist-hpv" class="view-all" :to="{name:'playlists'}">view all</router-link>
                    </div>

                <!-- THIS IS WHERE i'LL APPEND THE DIVS FOR THE USER'S PLAYLISTS -->
                </div>

                <div class="home-page-recent-songs-section">
                    <div class="hp-container">
                        <div class="hp-content">
                            <div class="see-more">
                                <h1>recently played</h1>
                                <!-- <a href="./RecentSongs.vue">view all</a> -->
                                <router-link class="view-all" :to="{name:'recent'}">view all</router-link>
                            </div>

                            <div class="hprs-div">
                                <!-- DIV WITH EACH RECENT TRACK -->
        
                                <div class="hp-song">
                                    <!-- <img id="recent-song-image" src="./images/profile.jpg" alt="">
                                    <div class="song-details">
                                        <a href="" class="song-name">montero</a>
                                        <a href="" class="artist-name">lil nas</a>
                                    </div>
                                    <p class="track-duration"></p>

                                    <a title="preview song" class="preview-song-button" href=""><span class="iconify" data-icon="akar-icons:play"></span></a>-->
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

    export default {
        name:'HomePageComp',

        components:{
            // NavComp
        },

        data(){
            return{
                following_url: 'https://api.spotify.com/v1/me/following?type=artist&after=0I2XqVXqHScXjHhk6AYYRe&limit=38',
                user_playlists_url :`https://api.spotify.com/v1/me/playlists?limit=30`,
                user_details_url: 'https://api.spotify.com/v1/me',
                recently_played_tracks_url:`https://api.spotify.com/v1/me/player/recently-played?limit=15`,
                following_artists:'https://api.spotify.com/v1/me/following?type=artist&after=0I2XqVXqHScXjHhk6AYYRe&limit=38'
            }
        },

        //INJECTING THE TOKEN PROVIDED FROM THE APP.VUE COMPONENT
        inject:['token'],
        created: function() {
            // console.log('created')
            // console.log(this.token)
            window.addEventListener('load',this.callFuncs());
        },
  

        methods:{
            callFuncs(){
                setTimeout(() => {
                    this.getFollowing()
                    this.getUserDetails()
                    this.recentlyPlayed()
                    this.getPlaylists()

                    
                }, 2000);
            },

            logUserOut(){
                localStorage.removeItem('access_token')

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
            //log info
            async getUserDetails(){

                try{
                    let response = await fetch(this.user_details_url,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,
                    }
                })
                    let info = await response.json()
                    
                    //CHECKING TO SEE IF THE USER HAS AN AVATAR PRESENT
                    if(info.images.length>0){

                        document.querySelector('#tiny-user-img').src=info.images[0].url
                    } else{
                        document.querySelector('#tiny-user-img').src = 'https://imgs.search.brave.com/EbUF_NRlSuuT7tbrtfSksbcyIE_l2PMHsvyMHKhfmhc/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4z/aWZLLVpZRmRUVFBJ/bTFqaUdJZVp3SGFI/YSZwaWQ9QXBp'
                        
                    }

                    document.querySelector('#tiny-user-img').style.display = 'block'   //showing the image that has a display of none in the css  

                    document.querySelector('#tiny-user-name').textContent = info.display_name
                  
                    //showing the option of logging out when the 3dots are clicked
                    document.querySelector('#logout-button').addEventListener('click',()=>{
                        document.querySelector('.logout').classList.toggle('showLogoutButton')
                    })



                    //CREATING IMAGE FOR THE USER AVATAR
                    let userAvatar = document.createElement('img')
                    userAvatar.setAttribute('id','user-avatar')

                        //CHECKING TO SEE IF THE USER HAS AN AVATAR PRESENT
                    if(info.images.length>0){
                        // document.querySelector('#tiny-user-name').src = info.images[0].url
                        userAvatar.src = info.images[0].url

                    } else{
                        userAvatar.src = 'https://imgs.search.brave.com/EbUF_NRlSuuT7tbrtfSksbcyIE_l2PMHsvyMHKhfmhc/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4z/aWZLLVpZRmRUVFBJ/bTFqaUdJZVp3SGFI/YSZwaWQ9QXBp'

                    }
                    
                        //APPENDING USER AVATAR TO THIS DOM ELEMENT
                    document.querySelector('.udis-image').append(userAvatar)

                    //CREATING ELEMENT TO HOLD THE USERNAME
                    let userName = document.createElement('a')
                        userName.setAttribute('id','username')
                        userName.setAttribute('target','_blank')
                        userName.textContent = info.display_name
                        userName.href = info.external_urls.spotify

                        //APPENDING THE USERNAME TO THIS DOM ELEMENT
                        document.querySelector('.udis-name').append(userName)


                        //APPENDING THE NUMBER OF USER FOLLOWERS TO THIS DOM ELEMEEN
                        document.querySelector('#followers').textContent = info.followers.total


                }
                catch(error){
                    console.log(error.message)
                }

            },

            async recentlyPlayed(){
                try{
                    let response = await fetch(this.recently_played_tracks_url,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,

                    }
                })

                let info = await response.json()
                // console.log(info);
                let recentSongsArray = info.items //WILL RETURN AN ARRAY WITH THE RECENT SONGS

                recentSongsArray.forEach((item,index)=>{

                    //ONLY SHOW AT LEAST 12 RECENTLY PLAYED SONGS
                    if (index<12){

                    //ID TO BE PASSED AS A QUERY TO THE TRACKINFO COMP 
                    //THE ID WILL BE USED TO GET AUDIO INFO ABOUT THE SPECIFIC TRACK
                    let id = item.track.id

                    //GRABBING ARTIST ID: WHEN ARTIST NAME IS CLICKED REDIRECT TO ANOTHER PAGE
                    //WITH THE ARTIST INFO. THE artistID WILL BE USED THERE
                    let artistID = item.track.artists[0].id

                    //CREATING THE THUMNAIL IMAGE OF THE RECENT SONG
                    let recentImage = document.createElement('img')
                    recentImage.setAttribute('id','recent-song-image')
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
                    let recentSongContainer = document.createElement('a')
                    recentSongContainer.href = `/trackinfo?id=${id}`
                    recentSongContainer.setAttribute('class','hp-song')

                    let  songDetailsContainer = document.createElement('div')
                    songDetailsContainer.setAttribute('class','song-details')
                    songDetailsContainer.append(songName,artistName,albumName,trackDuration)

                    recentSongContainer.append(recentImage,songDetailsContainer)
            
                    document.querySelector('.hprs-div').append(recentSongContainer)
            

                        }


                })
                }
                catch(error){
                    console.log(error.message)
                }
            },

            async getPlaylists(){

                try{
                    let response = await fetch(this.user_playlists_url,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,
                        // 'Authorization':`Bearer ` + localStorage.getItem('access_token'),

                    }
                })

                let info = await response.json()
     
                // console.log(info);
                //SETTING THE USER'S TOTAL PLAYLISTS
                if(info.total>0){
                    document.querySelector('#user-total-playlists').textContent = info.total
                }


                let playlists = info.items  //THIS WILL SELECT THE ARRAY WITH THE PLAYLIST DETAILS

                playlists.forEach((item,index)=>{

                    //ONLY SHOW AT LEAST 12 PLAYLISTS
                    if(index <12){
                        let id = item.id;

                        //CREATING THE IMAGE OF THE PLAYLIST
                        let playlistImage =document.createElement("img")
                        playlistImage.setAttribute('id','hp-playlist-image')
                        playlistImage.src = item.images[0].url

                        //CREATING ANCHOR LINK FOR THE PLAYLIST IMAGE SO THAT 
                        //IT WILL BE A LINK TO ANOTHER PAGE
                        let playlistImageLink = document.createElement('a')
                        playlistImageLink.append(playlistImage)

                        playlistImageLink.href = `/playlisttracks?id=${id}`

                        //CREATING THE PLAYLIST NAME
                        let playlistname = document.createElement('a')
                        playlistname.setAttribute('id','hp-playlist-name')
                        playlistname.href = `/playlisttracks?id=${id}`
                        playlistname.textContent = item.name


                        // playlistname.href = `./playlist/playlisttracks.html?id=${id}`

                        //CREATING THE P TAG TO HOLD THE PLAYLIST TOTAL NUMBER OF TRACKS
                        let playlisttracks = document.createElement('p')
                        playlisttracks.setAttribute('id','hp-playlist-total-tracks')
                        playlisttracks.textContent = item.tracks.total + '  SONGS'


                        //CREATING A DIV THAT WILL HOLD INFO ABOUT EACH PLAYLIST
                        let playlistsContainer = document.createElement('a')
                        playlistsContainer.href = `/playlisttracks?id=${id}`
                        playlistsContainer.setAttribute('class','playlists-container')
                    
                        //CREATING THE DIV TO HOLD THE PLAYLIST NAME AND NUMBER OF TRAKCS
                        let playlistInfo = document.createElement('div')
                        playlistInfo.setAttribute('class','playlist-info')

                        //APPENDING TO THE DOM
                        playlistInfo.append(playlistname,playlisttracks)
                        playlistsContainer.append(playlistImageLink,playlistInfo)
                        document.querySelector('.your-playlists').append(playlistsContainer)

                    }


                })
                }
                catch(error){
                    console.log(error.message)
                }
                

            },

            async getFollowing(){
                try{
                    let response =await fetch(this.following_url,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,

                    }
                })

                let item = await response.json()

                // console.log(item);
                //DISPLAYING THE NUMBER OF FOLLOWING TO THIS DOM ELEMENT
                document.querySelector('#number-of-following').textContent = item.artists.items.length
                document.querySelector('.following-link').href = './Following.vue'

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

$web-color:rgb(14, 14, 15);




//SECTION WITH THE USER DETAILS : NAME IMAGE...
.user-details-info-section{
margin-bottom: 8rem;
width: 100vw;
padding-left: 20rem;



    .udis-container{
        // border: 1px solid;
        max-width: 1400px;
        width: 100%;
        // min-height: 100vh;
        margin: 0 auto;

        //THE DIV ON THE TOP RIGHT PART OF THE PAGE
        .user-name-img{
            margin-top: 1.3rem;
            // border: 1px solid red;
            padding: 4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .spotify-image-div{
                // margin-bottom: 3rem;

                img{
                    width: 12rem;
                }
            }

            #name-img{
                display: flex;
                align-items: center;
                border: 1px solid white;
                border-radius: 4rem;
                // padding: 0 1rem;
                // padding:.2rem 1rem .2rem .3rem;
                position: relative;
                

                #tiny-user-img{
                    width: 4rem;
                    height: 4rem;
                    margin: .3rem;
                    object-fit: cover;
                    border-radius: 50%;

                    display: none;  ///
                }
                
                #tiny-user-name{
                    font-size: 1.5rem;
                    margin: .4rem ;
                    margin-right: .8rem;
                    font-weight: $black;
                    // text-transform: lowercase;
                }
                #logout-button{
                    cursor: pointer;
                    margin-right:1rem;
                    color: white;
                    i{
                        font-size: 1.7rem;

                    }

                }
                //THE DIV SHOWING THE LOGOUT BUTTON
                .logout{
                    height: 10rem;
                    width: 10rem;
                    // border: 2px solid blue;
                    height: auto;
            
                    position: absolute;
                    right: 0;
                    bottom: -100%;
                    bottom: -7rem;
                    display: none;
                    
                    
                    a{
                        text-decoration: none;
                        font-size: 1.3rem;
                        font-weight: $bold;
                        border: 1px solid white;
                        padding: 1rem 1.6rem;
                        border-radius: 23rem;
                        background-color: black;
                        text-align: center;
                        
                    }


                    
                }
            }
        }

        //THE REST OF USER INFO :following, follwers, playlists
        .udis-content{
            // border: 1px solid red;
            margin-top: 2rem;
            // display: grid;
            // place-items: center;

            


            .content-display-flex{
                // border: 2px solid wheat;
                //USER IMAGE
                .udis-image{
                    display: grid;
                    place-items: center;
                    #user-avatar{
                        width: 22rem;
                        height: 22rem;
                        object-fit: cover;
                        border-radius: 50%;

                    }
                }
                //USER NAME
                .udis-name{
                    text-align: center;
                    margin: 2rem 0;
                    #username{
                        font-size: 5rem;
                        font-weight: $black;
                        text-decoration: none;
                    }
                }
                .udis-following{
                    display: grid;
                    place-items: center;
                    .following-playlists-followers{
                        display: flex;
                        div{
                            // border: 1px solid ;
                            margin: 0 1rem;
                        }
                        p{
                            padding-bottom: .5rem;
                            font-size: 1.8rem;
                            font-weight: $bold;
                            text-align: center;
                            opacity: .9;
                        }

                        //THE ELEMENT SHOWING THE TOTAL FOLLOWERS
                        h3{
                            font-size: 1.3rem;
                            opacity: .9;
                            font-weight: $medium;
                            text-transform: uppercase;
                        }
                        a{
                            font-size: 1.3rem;
                            opacity: .9;
                            font-weight: $medium;
                            text-transform: uppercase;
                            position: relative;
                            text-decoration: none;
                            position: relative;

                            &::after{
                                content: '';
                                display: block;
                                background-color: white;
                                height: 0.1rem;
                                position: absolute;
                                bottom: -.4rem;
                                left: 0;
                                right: 0;
                            }
                        }
                    }
                }
            }


        }
    }

}

//SECTION SHOWING USER'S PLAYLISTS AND TOP ARTISTS ON THE HOME PAGE
.top-artists-playlists{
    // border: 1px solid red;
    width: 100vw;
    // margin-left: 13vw;
    padding-left: 17rem;
    .tap-container{
        display: grid;
        grid-template-columns: 45% 55%;
        // border: 1px solid white;
        // gap: 5rem;      //GAP BETWEEN THE GRIDS
        // border: 1px solid;
        max-width: 1400px;
        width: 100%;
        margin: 0 auto;

        //PLAYLIST SECTION
        .your-playlists{
            // border: 1px solid red;

            // DIV WITH THE TITLE AND THE BUTTON
            .see-more{
                display: flex;
                // border: 1px solid red;
                align-items: center;
                justify-content: space-between;
                h1{
                    font-weight: $black;
                    margin: 2rem;
                    
                    font-size: 1.8rem;
                    text-transform: capitalize;
                }
                
                .view-all{
                    border: 1px solid rgb(255, 255, 255);
                    background-color: transparent;
                    text-decoration: none;
                    font-size: 1.2rem;
                    font-weight: $black;
                    text-transform: uppercase;
                    border-radius: 5rem;
                    margin: 2rem;
                    padding: .8rem 1.5rem;
                    transition: all .2s ease-in-out;

                    &:hover{
                        background-color: white;
                        color: black;
                    }

                }
            }

            .playlists-container{
                margin: 2rem;
                // border: 1px solid;
                text-decoration: none;
                display: flex;
                align-items: center;
                &:hover{
                    border: 1px solid rgba(245, 245, 245,.4);
                    opacity: .8;
                }
                #hp-playlist-image{
                    width: 6rem;
                    height: 6rem;
                    object-fit: cover;
                    // border-radius: 50%;
                }

                .playlist-info{
                    padding: 0 1rem;
                    #hp-playlist-name{
                        font-size: 1.3rem;
                        text-transform: uppercase;
                        font-weight: $bold;
                        text-decoration: none;

                        &:hover{
                            text-decoration: underline;
                        }
                    }
                    #hp-playlist-total-tracks{
                        font-size: 1rem;
                        text-transform: uppercase;
                        font-weight: $light;
                        padding: .5rem 0;
                    }
                }
            }
        }

        //RECENT SONGS SECTION
        .home-page-recent-songs-section{
            // border: 2px solid;

            .hp-container{
                .hp-content{
        
                                // DIV WITH THE TITLE AND THE BUTTON
                    .see-more{
                        display: flex;
                        // border: 1px solid red;
                        align-items: center;
                        justify-content: space-between;
                        h1{
                            font-weight: $black;
                            margin: 2rem;
                            
                            font-size: 1.8rem;
                            text-transform: capitalize;
                        }
                        
                        .view-all{
                            border: 1px solid rgb(255, 255, 255);
                            text-decoration: none;
                            font-size: 1.2rem;
                            font-weight: $black;
                            text-transform: uppercase;
                            border-radius: 5rem;
                            margin: 2rem;
                            padding: .8rem 1.5rem;
                            transition: all .2s ease-in-out;
        
                            &:hover{
                                background-color: white;
                                color: black;
                            }

                        }
                    }
      

                    .hprs-div{
                    //    border: 1px solid white;
                        .hp-song{
                            display: flex;
                            align-items: center;
                            margin: 2rem;
                            position: relative;
                            text-decoration: none;
                            &:hover{
                                border: 1px solid rgba(245, 245, 245,.4);
                                opacity: .8;
                            }   

                            img{
                                width: 6rem;
                                height: 6rem;
                                object-fit:cover;
                                
                            }
                            
                            .track-duration{
                                font-size: 1.1rem;
                                position: absolute;
                                font-weight: $regular;
                                right: 3rem;
                                opacity: .9;
                                top:40%;
                            }
        
                            .song-details{
                                padding-left: 1.7rem;
                                // border: 2px solid;
                                width: 70%;

                                //HIDE TEXT WRAP
                                white-space: nowrap; 
                                overflow: hidden;
                                text-overflow: ellipsis;
                   

                                .song-name{
                                    display: block;
                                    // border: 2px solid;
                                    font-size: 1.4rem;
                                    text-transform: capitalize;
                                    font-weight: $bold;
                                    text-decoration: none;
                                    padding-bottom: .5rem;

                                    &:hover{
                                        text-decoration: underline;
                                    }
                                }
        
                                .artist-name{
                                    // border: 2px solid;
                                    opacity: .8;
                                    font-size: $medium;
                                    text-transform: capitalize;
                                    font-size:1.2rem;
                                    padding-right: 1rem;
                                    // letter-spacing: .1rem;
                                    text-decoration: none;

                                    &:hover{
                                        text-decoration: underline;
                                    }
                                }
                                .album-name{
                                    // border: 2px solid;
                                    opacity: .8;
                                    font-size: $medium;
                                    text-transform: capitalize;
                                    font-size:1.2rem;
                                    padding-right: 1rem;
                                    // letter-spacing: .1rem;
                                    text-decoration: none;
                                }
                                .artist-name, .album-name{
                                    // border: 2px solid;
                                    opacity: .8;
                                    font-size: $medium;
                                    text-transform: capitalize;
                                    font-size:1.3rem;
                                    padding-right: 1rem;
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


//CLASS TO BE TOGGLED WHEN USER CLICKS THE 3DOTS (ON DESKTOP) TO SHOW THE USER THE OPTION OF LOGGING OUT
.user-details-info-section .udis-container .user-name-img #name-img .logout.showLogoutButton{
    display: block;
}

//MEDIA SCREENS
@media screen and (max-width:900px) {
    .user-details-info-section{
        padding: unset;
        margin-bottom: 6rem;
        .udis-container{
            .user-name-img{
                display: none;

            }
        } 
            
    }

    .top-artists-playlists{
        padding: unset;
        margin-bottom: 15rem;

    }
}

@media screen and (max-width:840px) {

    .user-details-info-section .udis-container .udis-content{
        .content-display-flex{
            //CHANGING USER AVATAR IMAGE SIZE
            .udis-image{
                #user-avatar{
                    width: 18rem;
                    height: 18rem;
                }
            }

            //CHANGING SIZE OF THE USER NAME
            .udis-name{
                #username{
                    font-size: 4rem;
                }
            }
        }
    }

    .top-artists-playlists{
        .tap-container{
            display: flex;
            flex-direction: column-reverse;
            // grid-template-columns: 1fr;
        }
    }
}

@media screen and (max-width:700px) {
    .user-details-info-section{
        padding-top: 7rem;
        .udis-container{
            .user-name-img{
                display: none;
                #name-img{
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                }
            }
        }
    }
}


@media screen and (max-width:503px) {

 
    
    .user-details-info-section .udis-container .udis-content{
        .content-display-flex{
            //CHANGING USER AVATAR IMAGE SIZE
            .udis-image{
                #user-avatar{
                    width: 14rem;
                    height: 14rem;
                }
            }

            //CHANGING SIZE OF THE USER NAME
            .udis-name{
                #username{
                    font-size: 3rem;
                }
            }

            .udis-following{
                .following-playlists-followers{
                    p{
                        font-size: 1.2rem;
                    }

                    h3,a{
                        font-size: 1.1rem;
                    }
                }
            }
        }
    }

    .top-artists-playlists .tap-container{

        //PLAYLISTS PART
        .your-playlists{
            .see-more{
                h1{font-size: 1.4rem;
                }
                .view-all{
                    font-size: .9rem;
                }
            }

            .playlists-container{
                #hp-playlist-image{
                    width: 5rem;
                    height: 5rem;
                }

                .playlist-info{
                    #hp-playlist-name{
                        font-size: 1rem;
                    }
                    #hp-playlist-total-tracks{
                        font-size: .9rem;
                    }
                }
            } 


     
        }

        //RECENT SONGS PART
        .home-page-recent-songs-section .hp-container .hp-content {
            .see-more{
                h1{font-size: 1.4rem;
                }
                .view-all{
                    font-size: .9rem;
                }
            }

            .hprs-div .hp-song{
                img{
                    height: 5rem;
                    width: 5rem;
                }
                .track-duration{
                    font-size: 1rem;
                    right: 1.4rem;
                }

                .song-details{
                    width: 60%;
                    .song-name{
                        font-size: 1.2rem;
                    }
                    .artist-name{
                        font-size: 1.1rem;
                    }
                    .album-name{
                        font-size: 1.1rem;
                    }
                }
            }
        }
    }
 

}



</style>
