<template>
    <div>
        <div class="main">
            <div id="login-page">
                <div id="lpc">
                    <h1 class="app-name" id="app-name">Spotify Wrapper</h1>

                    <div class="login-btn-container">
                        <!-- <a @click="requestAuthorization" id="login-btn" href="/home">login to spotify</a> -->
                        <p @click="requestAuthorization" id="login-btn">login to spotify</p>
                    </div>
                    <!-- <button id="login-btn"> <a href="/home">login to spotify</a> </button> -->
                </div>
            </div>
        </div>
    </div>

   
</template>

<script>
    export default {
        name:'IndexComp',

        data(){
            return{
                AUTHORIZE:'https://accounts.spotify.com/authorize',
                scope:'user-read-private user-library-read user-read-recently-played playlist-read-private user-follow-read user-top-read',
                redirect_uri:'http://localhost:8080/home',
                client_id:'11e1eb62cc504e17bce8867bc8a21897',

            }
        },

        methods:{
            //FUNCTION TO REQUEST AUTHORIZATION FROM THE USER ONCE THEY CLICK THE LOGIN BUTTON
            requestAuthorization(){
                let url = this.AUTHORIZE;
                url += "?client_id=" + this.client_id;
                url += "&response_type=code";
                url += "&redirect_uri=" + encodeURI(this.redirect_uri);
                //url += "&show_dialog=true";
                url+= `&scope=${this.scope}`
                window.location.href = url; // Show Spotify's authorization screen
                // checkAccessStatus() //FUNCTION TO CHECK WHETHER THE USER GRANTED US AUTHORIZATION
            }

        }




    }
</script>


<style lang="scss" scoped >


  body{
      background-color: black;
      overflow: hidden;
      color: white;
      font-family: "Satoshi", sans-serif,"General Sans", sans-serif;
  }

  .main{
    height: 100vh;
      width: 100vw;
    #login-page{
        height: 100%;
      width: 100%;
      display: grid;
      place-items: center;
        #lpc{
            text-align: center;

            #app-name{
                text-transform: capitalize;
                font-weight: 900;
                opacity: .8;
                font-size: 1.9rem;
                margin-bottom: 1.7rem;
            }

            .login-btn-container{
                margin-top: 3rem;

                #login-btn{
                    background-color: #1db954;
                    cursor: pointer;
                    color: white;
                    font-size: 1.1rem;
                    border-radius: 23rem;
                    border: none;
                    text-transform: uppercase;
                    font-weight: 700;
                    text-decoration: none;
                    padding: .8rem 1.2rem;
                    padding: 1rem 2rem;
                    text-decoration: none;

                    &:hover{
                        background-color: #29d766;

                    }

                }
            }
        }
    }
  }



</style>
