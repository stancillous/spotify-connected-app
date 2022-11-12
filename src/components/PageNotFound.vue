
<template>
    <div id="root">
        <div class="pnfc">
            <h1>Page not found :(  Return <a href="https://my-muzik.netlify.app/">home</a></h1>
        </div>

    </div>
</template>

<script>
    export default {
        name:'PageNotFoundComp'
    }
</script>

<style lang="scss" scoped>



$light:300;
$regular:400;
$medium:500;
$bold:700;
$black:900;
body{
    font-family: "Satoshi", sans-serif,"General Sans", sans-serif;
    background-color: rgb(21, 20, 23);
}


#root{
    #pnfc{
        h1{
            font-size: 2rem;
            font-weight: bold;

            a{
                color: white;

            }
        }


    }
}

</style>