<template>

    <!-- <NavComp/> -->

    <div class="discover-root-div">
        <section class="related-artists-section">

                        <!-- spotify attribution logo -->
             <div class="spotify-image-div">
                <img src="../assets/Spotify_Logo_CMYK_Green.png" alt="">
            </div>


            <div class="ras-container">
                <div class="ras-content-parent">
                    <h1 class="pageTitle"></h1>
                    <div class="ras-content">

                        <!-- <div class="rel-artist">
                            <img id="rel-artist-img" src="../images/jiokoe.jpg" alt="">
                            
                            <div class="rel-artist-info">
                                <p class="rel-artist-name">dfsdg ljkjacob musembi</p>
                                <p class="rel-artist-followers">34,434 followers</p>
                              
                                <div class="rel-artist-link-div">
                                    <a href="" id="rel-artist-spotify-link">check on spotify</a>
                                </div>

                            </div> 
                      
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
        name:'DiscoverArtistsComp',

        components:{
            // NavComp
        },


        
        data(){
            return{
                artistID:'',
                artistName:'',

            }
        },

        inject:['token'],
        created: function() {
            window.addEventListener('load',this.callFuncs());
        },

        // mounted(){
        //     this.getIdFromUrl()
        //     this.getRelatedArtists()

        // },

        methods:{
            callFuncs(){
                this.getIdFromUrl()
                this.getRelatedArtists()
            },
            
            getIdFromUrl(){
                    //GET THE ARTISTS ID FROM THE URL
                let windowUrl = location.search

                //INSTANCE OF URLSEARCHPARAMS
                let urlParams = new URLSearchParams(windowUrl)

                this.artistID = urlParams.get('id')
                this.artistName = urlParams.get('name')

                // console.log(this.artistID)
                // console.log(this.artistName)
                // this.$router.push({path:'/discover'})  //REMOVING THE QUERIES FROM THE URL
            },
            async getRelatedArtists(){
                try{
                    let response = await fetch(`https://api.spotify.com/v1/artists/${this.artistID}/related-artists?limit=9`,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,                    }
                })
                let data = await response.json()
                
            
                // console.log(data.artists)
                let artists = data.artists  //WILL RETURN AN ARRAY OF THE ARTISTS

                artists.forEach((item)=>{

                    //SETTING THE PAGE HEADER
                    document.querySelector('.pageTitle').textContent = `artists like ${this.artistName}`


                    //CREATING ELEMENT THAT WILL HOLD THE ARTIST IMAGE
                    let relArtistImage = document.createElement('img')
                    relArtistImage.setAttribute('id','rel-artist-img')
                    relArtistImage.src = item.images[0].url
                    // console.log(relArtistImage)

                    //CREATING ELEMENT THAT WILL HOLD THE ARTIST NAME
                    let relArtistName = document.createElement('p')
                    relArtistName.textContent = item.name
                    relArtistName.setAttribute('class','rel-artist-name')
                    // console.log(relArtistName)

                    //CREATING ELEMENT THAT WILL HOLD THE ARTIST FOLLOWERS TOTA
                    let relArtistFollowers = document.createElement('p')
                    relArtistFollowers.setAttribute('class','rel-artist-followers')
                    // relArtistFollowers.textContent = item.followers.total
                    // console.log(relArtistFollowers)


                    //GET THE TOTAL FOLLOWERS OF THE ARTIST
                    let relArtistFollowersFormated = item.followers.total
                    //FORMATTING THE USER'S FOLLOWERS SO AS TO PUT COMMAS
                    //WHERE NEEDED IN THE NUMBER
                    let internationalNumberFormat = new Intl.NumberFormat('en-US')
                    relArtistFollowers.textContent = internationalNumberFormat.format(relArtistFollowersFormated) +' followers'


                    //CREATING ELEMENT THAT WILL HOLD THE ARTIST SPOTIFY LINK
                    let relArtistSpotifyLink = document.createElement('a')
                    relArtistSpotifyLink.setAttribute('target','_blank')
                    relArtistSpotifyLink.setAttribute('class','rel-artist-link')
                    relArtistSpotifyLink.textContent = 'play on spotify'
                    relArtistSpotifyLink.style.fontSize = '13px'
                    relArtistSpotifyLink.style.fontWeight = 'bold'
                    relArtistSpotifyLink.style.opacity = 0.9

                    relArtistSpotifyLink.href = item.external_urls.spotify


                    //ADDING TO THE DOM
                    let relArtistInfo = document.createElement('div')
                    relArtistInfo.setAttribute('class','rel-artist-info')
                    relArtistInfo.append(relArtistName,relArtistFollowers)


                    let artistLinkDiv = document.createElement('div')
                    artistLinkDiv.setAttribute('class','rel-artist-link-div')
                    artistLinkDiv.append(relArtistSpotifyLink)

                    let relArtistDiv = document.createElement('div')
                    relArtistDiv.setAttribute('class','rel-artist')
                    relArtistDiv.append(relArtistImage,relArtistInfo,artistLinkDiv)


                    document.querySelector('.ras-content').append(relArtistDiv)
                })





            
                }

                catch(error){
                    console.log(error.message)
                }

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

$padding-top:7rem;
$web-color:rgb(14, 14, 15);

body{
    background-color: $web-color;
}


.related-artists-section{
    padding-bottom: 8rem;
    width: 100vw;
    padding-left: 17rem;
    padding-top: $padding-top;
    min-height: 100vh;

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


    .ras-container{
        .ras-content-parent{
            max-width: 1000px;
            width: 100%;
            min-height: 100vh;
            margin: 0 auto;


            .pageTitle{
                font-size: 2rem;
                font-weight: $black;
                text-align: center;
                padding-bottom: 2rem;
                text-transform: capitalize;
            }
            .ras-content{
                // margin-top: 3rem;
                // align-items: center;
                // display: grid;
                // grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
                // gap: 4rem;
                // row-gap:9rem;


                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
                margin: 0 auto;
                //DIV HOLDING THE ARTIST
                .rel-artist{
                    // width:22rem;
                    text-align: center;
                    // border: 2px solid;
                    margin: 2rem .7rem;
                    #rel-artist-img{
                        width: 15rem;
                        height: 15rem;
                        object-fit: cover;
                        border-radius: 50%;
                        
                    }


                    .rel-artist-info{
                        .rel-artist-name{
                            font-weight: $medium;
                            opacity: .9;
                            font-size: 1.7rem;
                            padding: 1rem 0;
                            text-transform: capitalize;
                            text-align: center;

                        }
                        .rel-artist-followers{
                            font-size: 1rem;
                            padding-bottom: 1rem;
                            letter-spacing: .05rem;
                            font-weight: $light;
                            text-transform: uppercase;
                            opacity: .9;
                            text-align: center;
                        }

                        .rel-artist-link-div{
                            // margin-top: 1rem;
                            text-align: center;
                            .rel-artist-link{
                                text-decoration: none;
                                font-size: 1.3rem;
                                text-transform: capitalize;
                                font-weight: $medium;
                                position: relative;
                                opacity: .8;
                                &::after{
                                    content: '';
                                    position: absolute;
                                    display: block;
                                    height: 0.1rem;
                                    background-color: white;
                                    left: 0;
                                    right: 0;
                                    bottom: -.5rem;
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
    .related-artists-section{
        padding: unset;
        margin-bottom: 15rem;
        padding-top: 8rem;
        
         //hiding the spotify attribution icon on smaller screens
         .spotify-image-div{
            display: none;
        }
        
        .ras-container .ras-content-parent {
            .pageTitle{
                font-size: 1.6rem;
            }
        }.ras-content {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            .rel-artist{
                #rel-artist-img{
                    width: 13rem;
                    height: 13rem;
                }
            }
        }
    }
}

@media screen and (max-width:512px) {
    .related-artists-section .ras-container .ras-content-parent .ras-content .rel-artist{
        width: auto;
        margin: 3rem 2rem;
        #rel-artist-img{
            height: 10rem;
            width: 10rem;

        }
        .rel-artist-info{
            .rel-artist-name{
                font-size: 1.4rem;
            }
        }
    }
}
</style>