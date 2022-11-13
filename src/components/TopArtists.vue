<template>
    <!-- <NavComp/> -->
    <div class="top-artists-root-div">

        <section class="top-artists-section">

                        <!-- spotify attribution logo -->
             <div class="spotify-image-div">
                <img src="../assets/Spotify_Logo_CMYK_Green.png" alt="">
            </div>
            

            <div class="tas-container">
                <h1>your top artists</h1>
                <h2 class="no-top-artists">You currently have no top artists :(</h2>
                <div class="tas-content">
                    <!-- DIV WITH THE ARTIST DETAILS -->
                    <!-- <div class="artist">
                        <a href=""><img id="artist-image" src="../images/bazzi.jpg" alt=""></a>
                        <a id="artist-link" class="artist-spotify-link" href="">bazzi</a>
                    </div> -->

                    <!-- <router-link to="/artistinfo&:name=this.user" id="artist-link" class="artists-spotify-link rt">bazzi link</router-link> -->



                </div>
            </div>
        </section>
    
    </div>
</template>

<script>
    // import NavComp from './NavBar.vue'
    export default {
        name:'TopArtistsComp',

        components:{
            // NavComp
        },

        data(){
            return{
                artistID:'',
                user:'wase',
                top_artists_url: 'https://api.spotify.com/v1/me/top/artists?limit=20',
            }
        },

        //INJECTING THE TOKEN PROVIDED FROM THE APP.VUE COMPONENT
        inject:['token'],

        created: function() {
            window.addEventListener('load',this.getTopArtists());
        },
        // mounted(){
        //     this.getTopArtists()

        // },

        methods:{
            async getTopArtists(){
                try {
                    let response = await fetch(this.top_artists_url,{
                    headers:{
                        'Authorization':`Bearer ${this.token}`,
                    }
                })

                let info = await response.json()

                // console.log('top artists', info);

                //showing user the text that they have no top artists
                if(info.items.length==0 && info.total==0){
                    document.querySelector('.no-top-artists').style.display = 'block'
                }


                // let rt=document.querySelector('.rt')
                // rt.href = './artistinfo?name=stance&age=323'

                let topArtists = info.items //WILL RETURN AN ARRAY WITH THE RECENT SONGS



                topArtists.forEach((item,index)=>{
                    // console.log(item)

                    //ONLY SHOW AT LEAST 20 TOP ARTISTS
                    if (index<20){


            // ********************************************
            // ********************************************
                        // console.log(item.id)
                        this.artistID = item.id       //THIS ID WILL BE USED TO GET ADDITIONAL INFO ABOUT THE ARTIST 
                                                    //INSIDE THE ARTIST INFO PAGE
            // ********************************************
            // ********************************************
            // ********************************************

                        //CREATING THE IMAGE OF THE ARTIST
                        let artistImage = document.createElement('img')
                        artistImage.setAttribute('id','artist-image')
                        artistImage.src = item.images[0].url

                        //CREATE ANCHOR TAG WHICH WILL CONTAIN THE ARTIST IMAGE
                        let artistImageLink = document.createElement('a')
                        artistImageLink.href = `./artistInfo?artistID=${this.artistID}` 

                        artistImageLink.appendChild(artistImage)  //APPEND CHILD, THE IMAGE WILL BE INSIDE THIS TAG


                        //CREATE ELEMENT TO HOLD NAME OF THE ARTIST
                        let artistName = document.createElement('a')
                        artistName.setAttribute('id','artist-link')
                        artistName.textContent = item.name
                        // artistName.href = `./ArtistInfo.vue?artistID=${this.artistID}` 
                        artistName.href = `./artistInfo?artistID=${this.artistID}` 



                        //APPENDING TO THE DOM
                        let artistDiv  = document.createElement('div')
                        artistDiv.setAttribute('class','artist')
                        artistDiv.append(artistImageLink,artistName)

                        document.querySelector('.tas-content').append(artistDiv)
                
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

$web-color:rgb(23, 20, 20);
$padding-top:7rem;


.top-artists-section{
    padding-top:$padding-top ;
    padding-left: 20rem;
    width: 100vw;
    min-height: 100vh;
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
    
    .tas-container{
        max-width: 1300px;
        width: 100%;
        min-height: 100vh;
        margin: 0 auto;
        // border: 2px solid;

        h1{
            font-size: 2rem;
            font-weight: $black;
            text-transform: capitalize;
            padding: 3rem 2rem;
            // border: 2px solid red;
            text-align: center;
        }

        //text to show if there are no top artists
        .no-top-artists{
            text-align: center;
            display: none;
            opacity:.7;
            font-size: 1.4rem;

        }

        .tas-content{

            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
            //DIV HOLDING THE ARTIST
            .artist{
                text-align: center;
                margin: 1.4rem;
                // border: 2px solid;
                #artist-image{
                    width:18rem;
                    height: 18rem;
                    object-fit: cover;
                    border-radius: 50%;
                    margin: 0.4rem;
                    
                }
                #artist-link{
                    // text-decoration: none;
                    font-size: 2rem;
                    text-transform: capitalize;
                    font-weight: $bold;
                    display: block;
                    text-decoration: none;
 
                }

                
            }

        }
    }
}


//MEDIA QUERIES
@media screen and (max-width:900px) {
    
    .top-artists-section{
        padding: unset;
        padding-top: 3rem;
        margin-bottom: 15rem;

         //hiding the spotify attribution icon on smaller screens
         .spotify-image-div{
            display: none;
        }
        
        .tas-container{

            h1{
                font-size: 1.6rem;
            }
            .tas-content{
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                .artist{
                    #artist-image{
                        width: 13rem;
                        height: 13rem;
                    }
                    #artist-link{
                        font-size: 1.5rem;
                    }
                }
            }
        }
    }


}

@media screen and (max-width:700px) {
    .top-artists-section{
        padding-top: $padding-top;
        .tas-container .tas-content .artist{
            #artist-image{
                width: 11rem;
                height: 11rem;
            }
            #artist-link{
                font-size: 1.3rem;
            }

        }
    }
}
</style>
