<template>
  <div class="navbar bg-base-100 shadow-sm">
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
          <li>
            <router-link to="/feed"><ph-app-window></ph-app-window>Feed</router-link>
          </li>
          <li>
            <router-link to="/claims"
              ><ph-bell-ringing></ph-bell-ringing>Claims</router-link
            >
          </li>
          <!-- <li>
        <details>
          <summary>Parent</summary>
          <ul class="p-2 bg-base-100 w-40 z-1">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li> -->
          <li>
            <router-link to="/profile"><ph-user></ph-user>Profile</router-link>
          </li>
        </ul>
      </div>
      <router-link class="btn btn-ghost text-xl">
        <img :src="logo" alt="" class="w-[50px]" />
      </router-link>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <router-link to="/feed"><ph-app-window></ph-app-window>Feed</router-link>
        </li>
        <li>
          <router-link to="/claims"
            ><ph-bell-ringing></ph-bell-ringing>Claims</router-link
          >
        </li>
        <!-- <li>
        <details>
          <summary>Parent</summary>
          <ul class="p-2 bg-base-100 w-40 z-1">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li> -->
        <li>
          <router-link to="/profile"><ph-user></ph-user>Profile</router-link>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <button class="btn btn-ghost" @click="logoutHandler">Logout</button>
    </div>
  </div>
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
