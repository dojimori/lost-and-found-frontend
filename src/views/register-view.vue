<template>
  <div class="flex items-center p-4 justify-center h-[80vH]" v-motion-fade>
    <form
      @submit.prevent="submitHandler"
      class="flex flex-col gap-1 w-100 p-4 border border-gray-300 shadow-lg"
    >
      <h4 class="font-bold">Register</h4>

      <div class="flex flex-col gap-2">
        <label for="" class="floating-label">
          <span>Name</span>
          <input
            v-model="credentials.name"
            type="text"
            class="input w-full"
            placeholder="Name"
            :disabled="isLoading"
          />
        </label>

        <label for="" class="floating-label">
          <span>Email</span>
          <input
            v-model="credentials.email"
            type="text"
            class="input w-full"
            placeholder="Email"
            :disabled="isLoading"
          />
        </label>

        <label for="" class="floating-label">
          <span>Password</span>
          <input
            v-model="credentials.password"
            type="text"
            class="input w-full"
            placeholder="Password"
            :disabled="isLoading"
          />
        </label>

        <label for="" class="floating-label">
          <span>Confirm Password</span>
          <input
            v-model="credentials.confirmPassword"
            type="text"
            class="input w-full"
            placeholder="Confirm Password"
            :disabled="isLoading"
          />
        </label>
      </div>

      <button type="submit" class="btn btn-primary mt-4" :disabled="isLoading">
        <span v-if="isLoading" class="loading loading-dots loading-lg"></span>
        <span v-else>Register</span>
      </button>
      <!-- mt-2 alert alert-error alert-soft -->
      <div
        v-motion-fade
        role="alert"
        :class="[
          'mt-2 alert alert-soft',
          { 'alert-error': isError, 'alert-success': !isError },
        ]"
      >
        <span>{{ responseMessage }}</span>
      </div>
    </form>
  </div>
</template>

<script>
import { api } from "../helpers/api";

export default {
  data() {
    return {
      isLoading: false,
      isError: false,
      responseMessage: "",
      credentials: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },

  methods: {
    async submitHandler() {
      try {
        this.isLoading = true;
        this.isError = false;
        if (this.credentials.password != this.credentials.confirmPassword) {
          alert("Password does not match");
          return;
        }

        const response = await api.post("/auth/register", this.credentials);

        // console.log(response);
        this.responseMessage = response.data.message;
      } catch (error) {
        this.isError = true;
        console.log(error);
        const message =
          error.response.data.message || "Something wen't terribly wrong here.";
        this.responseMessage = message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
