<template>
    <div class="hero  min-h-[86vh]">

        <div class="hero-content text-center">

            <img :src="LandingPageImage" alt="">
            <div class="max-w-md animate-fade" v-motion-fade>
                <h1 class="text-5xl font-bold text-start">Something lost?</h1>
                <p class="py-6 text-start">
                    A simple place where seekers and finders meet; bring lost items back home!
                </p>
                <router-link to="/register" class=" btn btn-primary animate-bounce ">Get
                    Started</router-link>
            </div>
        </div>
    </div>

</template>

<script setup>
import LandingPageImage from '../assets/landing-page.svg'

</script>