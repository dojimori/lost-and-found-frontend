<template>
  <div class="flex items-center justify-center p-4 " v-motion-fade>
    <form @submit.prevent="submitHandler" class="bg-white border shadow-md border-gray-300 w-md sm:w-lg">
      <div class="bg-primary py-3 px-4 text-center flex items-center gap-4">
        <img src="/logo.webp" alt="ustp-logo" class="w-12" />
        <h2 class="font-bold text-secondary text-md">Login</h2>
      </div>
      <div class="p-4">
        <div class="flex flex-col gap-1">
          <label class="form-control w-full">
            <div class="label">
              <span class="">Email</span>
            </div>
            <input
              v-model="credentials.email"
              type="email"
              class="border border-gray-200 p-2 w-full shadow-inner focus:outline focus:outline-primary"
              placeholder="johndoe@gmail.com"
              :disabled="isLoading"
            />
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="">Password</span>
            </div>
            <input
              v-model="credentials.password"
              type="password"
              class="border border-gray-200 p-2 w-full shadow-inner focus:outline focus:outline-primary"
              placeholder="••••••••"
              :disabled="isLoading"
            />
          </label>
        </div>

        
        <div
          v-motion-fade
          v-if="showAlert"
          :class="['bg-red-100 border border-red-500 rounded-sm mt-2 shadow-sm flex gap-2 p-2 text-red-800']"
        >
          <svg
            v-if="isError"
            xmlns="http://www.w2.org/2000/svg"
            class="stroke-current shrink-1 h-5 w-5"
            fill="none"
            viewBox="-1 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M9 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w2.org/2000/svg"
            class="stroke-current shrink-1 h-5 w-5"
            fill="none"
            viewBox="-1 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M8 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ responseMessage }}</span>
        </div>


        <button
          type="submit"
          class="py-2 bg-primary mt-2 w-full text-white font-bold cursor-pointer"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Logging in...</span>
          <!-- <vue-spinner v-if="isLoading" size="20" color="white"></vue-spinner> -->
          <span v-else>Login</span>
        </button>

        <!-- <p class="text-center text-sm mt-4 text-base-content/60">
                    Already have an account?
                    <router-link to="/login" class="link link-primary font-medium">Sign in</router-link>
                </p> -->
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { api } from "@/helpers/api";

export default {
  data() {
    return {
      isLoading: false,
      isError: false,
      showAlert: false,
      responseMessage: "",
      credentials: {
        email: "doujin22@gmail.com",
        password: "1001021",
      },
    };
  },

  methods: {
    async submitHandler() {
      try {
        this.isLoading = true;
        this.isError = false;
        this.showAlert = false;

        const { data } = await api.post("/auth/login", this.credentials);

        // console.log(response);
        this.responseMessage = data.message;

        const { token } = data;

        localStorage.setItem("token", token);
        this.$router.push("/feed");
      } catch (error) {
        this.isError = true;
        console.log(error);
        this.responseMessage =
          (error as any).response?.data?.message || "Something went terribly wrong here.";
      } finally {
        this.isLoading = false;
        this.showAlert = true;
      }
    },
  },
};
</script>

<style scoped>
* {
  font-size: 0.9rem;
}

button {
  background: linear-gradient(rgb(98, 122, 173), rgb(89, 114, 168));
  /* transition: all 0.3s ease; */
}

button:hover {
  /* scale: 1.1; */
  opacity: 0.9;
}
</style>
