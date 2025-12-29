<template>
  <nav class="navbar bg-base-100 shadow-xs sticky top-0 z-10">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li><a>Item 1</a></li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <router-link to="/feed" class="flex items-center gap-2">
        <img :src="logo" alt="ustp-logo" class="w-18 h-14" />
        <!-- Campus -->
      </router-link>
    </div>
    <div class="navbar-center hidden lg:flex">
    <router-link to="/feed" class="btn btn-ghost" >
      <h1 class="font-medium text-xl text-primary">Lost and Found</h1>
    </router-link>
    </div>
    <div class="navbar-end">
      <router-link class="mr-1 btn btn-primary" to="/feed"
        ><ph-app-window></ph-app-window>Feed</router-link
      >
      <router-link class="mr-1 btn btn-primary" to="/claims"
        ><ph-bell-ringing></ph-bell-ringing>Claims</router-link
      >
      <router-link class="mr-1 btn btn-primary" to="/profile"
        ><ph-user></ph-user
      ></router-link>
      <button @click="logoutHandler" to="/feed" class="btn mr-2">Logout</button>
    </div>
  </nav>
  <main class="p-2 md:p-8">
    <router-view></router-view>
  </main>
</template>

<script>
import { PhUser, PhAppWindow, PhBellRinging } from "@phosphor-icons/vue";
import logo from "../assets/logo.png";

export default {
  components: {
    PhUser,
    PhAppWindow,
    PhBellRinging,
  },
  data() {
    return {
      logo,
    };
  },
  methods: {
    logoutHandler() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>
