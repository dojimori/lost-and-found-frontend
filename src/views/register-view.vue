<template>
  <div class="flex items-center p-4 justify-center h-[80vH]" v-motion-fade>
    <form
      @submit.prevent="submitHandler"
      class="flex flex-col gap-1 w-100 p-4 border border-gray-300 shadow-lg"
    >
      <h4 class="mb-4 font-bold">Register</h4>
      <div class="flex flex-col gap-2">
        <label for="" class="floating-label">
          <span>Name</span>
          <input
            v-model="credentials.name"
            type="text"
            class="input w-full"
            placeholder="Name"
          />
        </label>

        <label for="" class="floating-label">
          <span>Email</span>
          <input
            v-model="credentials.email"
            type="text"
            class="input w-full"
            placeholder="Email"
          />
        </label>

        <label for="" class="floating-label">
          <span>Password</span>
          <input
            v-model="credentials.password"
            type="text"
            class="input w-full"
            placeholder="Password"
          />
        </label>

        <label for="" class="floating-label">
          <span>Confirm Password</span>
          <input
            v-model="credentials.confirmPassword"
            type="text"
            class="input w-full"
            placeholder="Confirm Password"
          />
        </label>
      </div>

      <button type="submit" class="btn btn-primary mt-4">Register</button>
    </form>
  </div>
</template>

<script>
import { api } from "../helpers/api";

export default {
  data() {
    return {
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
        if (this.credentials.password != this.credentials.confirmPassword) {
          alert("Password does not match");
          return;
        }

        const response = await api.post("/auth/register", this.credentials);

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
