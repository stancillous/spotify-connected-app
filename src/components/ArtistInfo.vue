<template>

    <!-- <NavComp/> -->
    <div class="artist-info-root-div">
        <section class="artist-info-section">

                        <!-- spotify attribution logo -->
             <div class="spotify-image-div">
                <img src="../assets/Spotify_Logo_CMYK_Green.png" alt="">
            </div>

            <div class="ais-container">
                <div class="ais-content-parent">
                    <div class="ais-content">
                        <div class="artist-image">
                            <!-- <img id="artist-image" src="../images/bazzi.jpg" alt=""> -->
                        </div>
    
                        <div class="artist-name-container">
                            <!-- <h1 class="artist-name">bazzi</h1> -->
                        </div>
                        <div class="artist-details">
                            <!-- <p class="artist-details-p" id="followers-number">followers : 4,345,092</span></p> -->
                            <!-- <p class="artist-details-p" id="popularity">popularity : 88% </p> -->
                        </div>
    
                        <div class="view-on-spotify">
                            
                            <!-- <a class="view-on-spotify-button" href="">view on spotify</a> -->
                        </div>
                        <div class="related-artists">
                            <!-- <a id="check-related-artists" href="./discover.html">see related artists</a> -->
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
        name:'ArtistInfoComp',

        components:{
            // NavComp
        },

        data(){
            return{
                artistID:''
            }
        },

        inject:['token'],
        created: function() {
            window.addEventListener('load',this.callFuncs());
        },

        // mounted(){
        //     this.getIdFromUl()
        //     this.getArtistInfo()
            
        // },
        methods:{ 
            
            callFuncs(){
                this.getIdFromUl()
                this.getArtistInfo()
            },
            getIdFromUl(){
                //GET THE ARTISTS ID FROM THE URL
                let windowUrl = location.search

                //INSTANCE OF URLSEARCHPARAMS
                let urlParams = new URLSearchParams(windowUrl)

                this.artistID = urlParams.get('artistID')
                // console.log(this.artistID)

                // this.$router.push({path:'/discover'})  //REMOVING THE QUERIES FROM THE URL


            },
            async getArtistInfo(){

                try{
                    let response = await fetch(`https://api.spotify.com/v1/artists/${this.artistID}`,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,
                    }
                })

                let info = await response.json()

                //CREATING THE ARTIST IMAGE
                let artistImage = document.createElement('img')
                artistImage.setAttribute('id','artist-image')
                artistImage.src= info.images[0].url


                //CREATING THE ARTIST NAME
                let artistName = document.createElement('p')
                artistName.setAttribute('class','artist-name')
                artistName.textContent =info.name
                
                //STORING THE ARTIST NAME AND PASSING IT TO THE PAGE SHOWING THE ARTISTS RELATED LIKE THIS ARTIST
                //SENDING IT IN THE HREF BELOW
                let thisArtistName = info.name

                //CREATING ELEMENT TO HOLD THE FOLLOWERS OF THE ARTIST
                let artistFollowers = document.createElement('p')
                artistFollowers.setAttribute('class','artist-details-p')

            //GET THE TOTAL FOLLOWERS OF THE ARTIST
                let artistFollowersFormated = info.followers.total
                //FORMATTING THE USER'S FOLLOWERS SO AS TO PUT COMMAS
                //WHERE NEEDED IN THE NUMBER
                let internationalNumberFormat = new Intl.NumberFormat('en-US')
                artistFollowers.textContent = internationalNumberFormat.format(artistFollowersFormated) +' followers'


                //ELEMENT THAT WILL HOLD POPULARITY OF THE ARTIST
                let artistPopularity = document.createElement('p')
                artistPopularity.setAttribute ('class','artist-details-p')
                artistPopularity.textContent = info.popularity +"% popular"

                //CREATE EXTERNAML LINK THAT WILL DIRECT TO THE ARTIST'S SPOTIFY 
                let artistSpotify = document.createElement('a')
                artistSpotify.setAttribute('class','view-on-spotify-button')
                artistSpotify.textContent = 'play on spotify'
                artistSpotify.setAttribute('target','_blank')
                artistSpotify.href = `https://open.spotify.com/artist/${this.artistID}`

                //CREATING LINK TO THE ARTIST'S RELATED ARTISTS

                let relatedArtistsLink = document.createElement('a')
                relatedArtistsLink.setAttribute('id','check-related-artists')
                relatedArtistsLink.textContent = 'recommended artists'
                //SETTING THE HREF TO THE PAGE THAT CONTAINS RELATED ARTISTS
                // relatedArtistsLink.href =`./Discover.vue?id=${this.artistID}&name=${thisArtistName}`
                relatedArtistsLink.href =`./discover?id=${this.artistID}&name=${thisArtistName}`


                //APPENDING TO THE DOM
                document.querySelector('.artist-image').append(artistImage)
                document.querySelector('.artist-name-container').append(artistName)
                document.querySelector('.artist-details').append(artistFollowers,artistPopularity)
                document.querySelector('.view-on-spotify').append(artistSpotify)
                document.querySelector('.related-artists').append(relatedArtistsLink)
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

$padding-top:7rem;
$web-color:rgb(14, 14, 15);

body{
    background-color: $web-color;
}



.artist-info-section{
    width: 100vw;
    padding-left: 20rem;
    padding-top: $padding-top;
    padding-bottom: 8rem;
    // border: 2px solid;

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

    .ais-container{
        // border: 2px solid;
        display: grid;
        place-items: center;
        .ais-content-parent{
            // border: 2px solid red;
            padding: 1rem;
            .ais-content{
                
                // border: 1px solid ;
                width: 35rem;

                .artist-image{
                    text-align: center;
                    // border: 1px solid;
                    #artist-image{
                        width: 25rem;
                        height: 25rem;
                        object-fit: cover;
                        border-radius: 50%;
                    }
                }
                .artist-name-container{
                    // border: 1px solid;
                    .artist-name{

                        font-weight: $medium;
                        font-size: 4rem;
                        padding: 1rem 0;
                        font-weight: $black;
                        text-transform: capitalize;
                        text-align: center;
                    }
                }
                .artist-details{
                    // border: 1px solid;
                    text-align: center;

                    .artist-details-p{
                        font-size: 1.2rem;
                        letter-spacing: .1rem;
                        font-weight: $light;
                        text-transform: uppercase;
                        padding: 1rem 0;
                        opacity: .9;

                    }
                    

 
                }

                //the button
                .view-on-spotify{
                    // border: 1px solid;
                    margin-top: 3rem;
                    text-align: center;
                    .view-on-spotify-button{
                        background-color: #1d8954;
                        font-size: 1.2rem;
                        font-weight: $black;
                        letter-spacing: .1rem;
                        text-transform: uppercase;
                        text-decoration: none;
                        padding: 1.4rem 2rem ;
                        border-radius: 34rem;

                        &:hover{
                            opacity: .8;
                        }

                    }
    
                }

                //LINK TO CHECK RELATED ARTISTS
                .related-artists{
                    margin-top: 4rem;
                    text-align: center;
                    // border: 1px solid;
                    #check-related-artists{
                        text-decoration: none;
                        font-size: 1.5rem;
                        text-transform: capitalize;
                        font-weight: $medium;
                        position: relative;

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

@media screen and (max-width:900px) {
    .artist-info-section{
        padding: unset;
        padding: 3rem 2rem;
        margin-bottom: 15rem;

        //hiding the spotify attribution icon on smaller screens
        .spotify-image-div{
            display: none;
        }


    }
}

@media screen and (max-width:700px) {
    .artist-info-section{
        padding-top: $padding-top;

        .ais-container .ais-content-parent .ais-content{
            .artist-image{
                #artist-image{
                    width: 20rem;
                    height: 20rem;
                }
    
            }

            .artist-name-container{
                .artist-name{
                    font-size: 4rem;
                }
            }

            .artist-details{
                .artist-details-p{
                    font-size: 1.3rem;
                }
            }
        } 
    }
}

@media screen and (max-width:505px) {
    .artist-info-section{
        padding-top: $padding-top;

        .ais-container .ais-content-parent .ais-content{
            width: 25rem;
            .artist-image{
                #artist-image{
                    width: 16rem;
                    height: 16rem;
                }
    
            }

            .artist-name-container{
                .artist-name{
                    font-size: 1.8rem;
                }
            }

            .artist-details{
                .artist-details-p{
                    font-size: 1.1rem;
                    letter-spacing: unset;
                }
            }

            .view-on-spotify .view-on-spotify-button{
                font-size: .8rem;
                padding: 1.2rem 1.5rem;
            }
            .related-artists{
                #check-related-artists{
                    font-size: 1.2rem;
                }
            }
        } 
    }
}


</style>
