<template>

    <!-- <NavComp/> -->
    <div class="following-root-div">

        <section class="following-section">

                        <!-- spotify attribution logo -->
             <div class="spotify-image-div">
                <img src="../assets/Spotify_Logo_CMYK_Green.png" alt="">
            </div>

            
            <div class="fs-container">
                <div class="fs-content-parent">
                    <div class="fs-content">
                        <h1>artists you follow</h1>
                        <h3 class="zero-following">You do not follow anyone on Spotify</h3>
                        <div class="following-artists-container">
                            <div class="following-artists-div">
                            
                                <!-- <div class="artist">
                                    <div class="image-and-name">
                                        <img class="artist-image" src="../images/playlist.jpg" alt="">
                                        <a href="" class="artist-name">daniel caesar</a>

                                    </div>
                                </div> -->






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
        name:'FollowingComp',

        components:{
            // NavComp
        },


        data(){
            return{
                following_url:'https://api.spotify.com/v1/me/following?type=artist&after=0I2XqVXqHScXjHhk6AYYRe'
            }
        },

        inject:['token'],
        created: function() {
            window.addEventListener('load',this.getFollowing());
        },
        // mounted(){
        //     this.getFollowing()
        // },

        methods:{
            async getFollowing(){
                try{
                    let response = await fetch(this.following_url,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,
                    }
                })

                let info = await response.json()
             
                //showing the text if the user doesn't follow anyone
                if(info.artists.total==0 && info.artists.items.length==0){
                    document.querySelector('.zero-following').style.display="block"
                }

                let artists = info.artists.items  //RETURNS ARRAY OF THE ARTISTS THAT THE USER IF FOLLOWING


                //ITERATE OVER EACH ARTIST
                artists.forEach((item)=>{


                    //CREATING THE IMAGE OF THE ARTIST
                    let artistImage = document.createElement('img')
                    artistImage.setAttribute('class','artist-image')
                    artistImage.src = item.images[0].url


                    //CREATE ELEMENT TO HOLD NAME OF THE ARTIST
                    let artistName = document.createElement('a')
                    artistName.setAttribute('class','artist-name')
                    artistName.textContent = item.name
                    artistName.href = item.external_urls.spotify
                    artistName.setAttribute('target','_blank')

                    // console.log(item.external_urls.spotify)


                    //APPENDING TO THE DOM
                    let nameAndImageDiv = document.createElement('div')
                    nameAndImageDiv.setAttribute('class','image-and-name')
                    nameAndImageDiv.append(artistImage,artistName)

                    let artistDiv  = document.createElement('div')
                    artistDiv.setAttribute('class','artist')
                    artistDiv.append(nameAndImageDiv)
                    

                    document.querySelector('.following-artists-div').append(artistDiv)



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
//IMPORT THE CSS TO STYLE THE NAVIGATION TAB

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


.following-section{
    width: 100vw;
    padding-left: 16rem;
    padding-top: $padding-top;
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

    
    .fs-container{
        .fs-content-parent{
            max-width: 1000px;
            width: 100%;
            min-height: 100vh;
            margin: 0 auto;
            // border: 2px solid;

            .fs-content{
                h1{
                    text-transform: capitalize;
                    font-weight: $black;
                    font-size: 2rem;
                    padding:2rem 4rem;
                    text-align: center;
                }

                //text to be shown if user doesn't follow anyone
                .zero-following{
                    text-align: center;
                    opacity: .7;
                    font-size: 1.3rem;
                    display: none;
                }
                .following-artists-container{
                    // border: 2px solid;
                    // display: flex;
                    // align-items: center;
                    // justify-content: center;
                    .following-artists-div{
 
                        // border: 2px solid red;
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
                        margin: 0 auto;
                        .artist{
                            width: 20rem;
                            // margin:4rem 1rem;
                            margin: 1rem .2rem;
                            background-color: rgba(6, 10, 6, 0.201);
                            padding: 2rem .2rem;
                            // border: 1px solid red;

                            .image-and-name{
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                // border: 2px solid red;

                                .artist-image{
                                    height: 16rem;
                                    width: 16rem;
                                    object-fit: cover;
                                    border-radius: 50%;
                                    margin-bottom: .5rem;
                                }

                                .artist-name{
                                    font-weight: $black;
                                    text-decoration: none;
                                    font-size: 2rem;
                                    text-transform: capitalize;
                                    // opacity: .8;
                                    padding-bottom: 1rem;
                                    text-align: center;
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
    .following-section{
        // border: 2px solid;
        padding: unset;
        padding-top: 3rem;
        margin-bottom: 15rem;

         //hiding the spotify attribution icon on smaller screens
         .spotify-image-div{
            display: none;
        }
        


        .fs-container .fs-content-parent .fs-content .following-artists-container .following-artists-div {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .artist {
                width: 18rem;
                .image-and-name{
    
                    .artist-image{
                        height: 15rem;
                        width: 15rem;
                    }
                    .artist-name{
                        font-size: 1.5rem;
                        font-weight: $bold;
                    }
                }
            }
        }




    }
}

@media screen and (max-width:700px) {
    .following-section{
        padding-top: $padding-top;
        .fs-container .fs-content-parent .fs-content{
            h1{
                font-size: 1.6rem;
            }
 
        }

    }
}

@media screen and (max-width:503px) {
    .following-section{
        .fs-container .fs-content-parent .fs-content .following-artists-container .following-artists-div .artist {
            width: 13rem;
            .image-and-name{

                .artist-image{
                    height: 12rem;
                    width: 12rem;
                }
                .artist-name{
                    font-size: 1.4rem;
                }
            }
        }




    }
}

</style>