<template>
    <nav class="navbar bg-base-100 shadow-sm">
        <div class="navbar-start">
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
            <router-link to="/" class="btn btn-ghost text-xl">Seekr</router-link>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li><router-link to="/feed">Feed</router-link></li>
                <li><router-link to="/feed">Responses</router-link></li>
                <li><router-link to="/feed">My Posts</router-link></li>
            </ul>
        </div>
        <div class="navbar-end">
            <router-link to="/feed" class="btn mr-2">Logout</router-link>
        </div>
    </nav>
    <main class="p-8">


        <router-view></router-view>
    </main>
</template>