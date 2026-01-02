<template>
  <div class="flex border justify-between p-4 border-gray-300 ">
    <div>
      <h1>lost&found</h1>
    </div>
    <div class="">
      <ul class="flex gap-4">
        <li>
          <router-link to="/feed" class="flex items-center"><ph-app-window></ph-app-window>feed</router-link>
        </li>
        <li>
          <router-link to="/claims"
          class="flex items-center"
            ><ph-bell-ringing></ph-bell-ringing >claims</router-link
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
          <router-link to="/profile" class="flex items-center"><ph-user></ph-user>profile</router-link>
        </li>
      </ul>
    </div>
    <!-- <div class="navbar-end">
      <button class="btn btn-ghost" @click="logoutHandler">Logout</button>
    </div> -->
  </div>
  <main class="p-2 md:p-8">
    <router-view></router-view>
  </main>
</template>

<style scoped>
* {
  font-size: 14px;
}
</style>

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
