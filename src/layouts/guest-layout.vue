<template>
    <nav class="border w-full flex border-gray-400 p-4 gap-4 items-center">
        <!-- <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul tabindex="-1"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><a>Item 1</a></li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <router-link to="/" class="text-xl">
                <img :src="logo" alt="ustp-logo" class="w-18 h-14">
            </router-link>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/developer">Developer</router-link></li>
            </ul>
        </div>
        <div class="navbar-end">
            <router-link to="/login" class="btn btn-primary mr-2">Login</router-link>
            <router-link to="/register" class="btn btn-ghost mr-2">Register</router-link>
        </div> -->

        <div>
            <img :src="logo" alt="ustp-logo" class="w-12">
        </div>

        <div>
          <!-- <ul class="flex  gap-4">
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/developer">Developer</router-link></li>
            </ul> -->
        </div>

    </nav>

    <router-view></router-view>
</template>


<style >
    * {
        font-size: .9rem;
    }
</style>

<script setup>
import logo from '../assets/logo.png'
</script>