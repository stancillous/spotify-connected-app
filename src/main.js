import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')



//SHOWING THE DIV WITH THE ADDITIONAL ACTIONS ie LOGOUT AND ABOUT DEVELOPER
// function showMoreInfoDiv(){
    
//     let moreInfoButton = document.querySelector('#more-info-button')
    
//     //SHOWING THE DIV WITH MORE DETAILS WHEN THIS ELEMENT IS CLICKED
//     moreInfoButton.addEventListener('click',()=>{
//         document.querySelector('.fd-container').classList.add('show')
    
//     })
    
//     //HIDING THE DIV ABOVE WHEN USER CILCKS OUTSIDE OF IT
//     window.addEventListener('mouseup',function(event){
//         let moreInfoContainer = document.querySelector('.fd-container');
//         if(event.target != moreInfoContainer && event.target.parentNode != moreInfoContainer){
     
    
//             moreInfoContainer.classList.remove('show')
//         }
//     });  

// }

// showMoreInfoDiv()


// let redirect_uri = "https://my-muzik.netlify.app/"
let redirect_uri = "http://localhost:8080/"
let client_id='11e1eb62cc504e17bce8867bc8a21897'



var access_token = null;
var refresh_token = null;


const TOKEN = "https://accounts.spotify.com/api/token";


window.addEventListener('DOMContentLoaded',()=>{
    // console.log(window.location.search.length)
    // console.log('laoded')
    if ( window.location.search.length > 0 ){
        handleRedirect();
    }
    else{
        getUserProfile()
    }
    
    // setTimeout(() => {
    //     if ( window.location.search.length > 0 ){
    //         handleRedirect();
    //     }
    //     else{
    //         // console.log('none')
    //         getUserProfile()
    //     }
    // }, 1500);

})


function onPageLoad(){
    // client_id = localStorage.getItem("client_id");
    // client_secret = localStorage.getItem("client_secret");
    // console.log('on page load functon')
    if ( window.location.search.length > 0 ){
        handleRedirect();
    }

}

//FUNCTION TO CALL BOTH THE GET AUTH CODE AND ACCESS TOKEN FUNCTIONS
function handleRedirect(){
    let code = getCode();
    fetchAccessToken( code );
    window.history.pushState("", "", redirect_uri); // remove param from url
}

//function to get code from the url which is then used to the the access token
function getCode(){
    let code = null;
    const queryString = window.location.search;

    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);

        if(urlParams.has('error')){
            window.location.href = "https://spotify-wrapper.netlify.app/login.html"
        }
        else{
            code = urlParams.get('code')
            // console.log(code)
            
        }
    }
    return code;
}


//FUNCTION TO FETCH THE ACCESS TOKEN
function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    // body += "&client_id=" + client_id;
    // body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}



// ENCODED BASIC OAUTH
let authBody = 'Basic MTFlMWViNjJjYzUwNGUxN2JjZTg4NjdiYzhhMjE4OTc6ZGUzNGIzYWIzNmY2NDFiZTkzY2RkNjNkMTVmNTMxMTg='



//FUNCTION TO POST THE ACCESS TOKEN REQUEST
function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.setRequestHeader('Authorization', authBody)
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

//FUNCTION TO HANDLE THE RESPONSE AFTER POSTING THE ACCESS TOKEN REQUEST
function handleAuthorizationResponse(){
    // console.log('okay')
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        // console.log(data);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();

    }

    // else if(this.status==401){
    //     refreshAccessToken()
    // }
    else {
        // console.log(this.responseText);
        // alert(this.responseText);
    }
    // console.log(localStorage.getItem('access_token'))


}

//function to get refresh token when the access token expires
function refreshAccessToken(){
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}


let token = localStorage.getItem('access_token')
console.log(token.indexOf('a'))
// console.log(token)


//function to get user profile and call refreshAccessToken()
async function getUserProfile(){
    try {
        let response = await fetch('https://api.spotify.com/v1/me',{
            headers:{
                'Authorization':`Bearer ${token}`,
            }
        })
        let info = await response.json()
        // console.log(info)
        if(info.error.status===401 || info.error.message==="The access token has expiredd"){
            console.log('getting refresh token')
            refreshAccessToken()
        }
    } catch (error) {
        console.log(error.message)
        
    }

}
// getUserProfile()


