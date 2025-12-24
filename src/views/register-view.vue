<template>
    <div class="flex items-center justify-center p-12" v-motion-fade>
        <form @submit.prevent="submitHandler" class="card bg-base-100 shadow-md w-full max-w-md">
            <div class="card-body">
                <h2 class="card-title text-2xl font-bold justify-center">Create Account</h2>
                <p class="text-base-content/60 text-center text-sm">Join us today and get started!</p>

                <div class="flex flex-col gap-1">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text label-sm font-medium ">Name</span>
                        </div>
                        <input v-model="credentials.name" type="text"
                            class="input input-bordered w-full focus:input-primary" placeholder="Enter your name"
                            :disabled="isLoading" />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text font-medium">Email</span>
                        </div>
                        <input v-model="credentials.email" type="email"
                            class="input input-bordered w-full focus:input-primary" placeholder="johndoe@gmail.com"
                            :disabled="isLoading" />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text font-medium">Password</span>
                        </div>
                        <input v-model="credentials.password" type="password"
                            class="input input-bordered w-full focus:input-primary" placeholder="••••••••"
                            :disabled="isLoading" />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text font-medium">Confirm Password</span>
                        </div>
                        <input v-model="credentials.confirmPassword" type="password"
                            class="input input-bordered w-full focus:input-primary" placeholder="••••••••"
                            :disabled="isLoading" />
                    </label>
                </div>

                <button type="submit" class="btn btn-primary w-full " :disabled="isLoading">
                    <span v-if="isLoading" class="loading loading-spinner"></span>
                    <span v-else>Create Account</span>
                </button>

                <div v-motion-fade v-if="showAlert"
                    :class="['alert alert-soft', isError ? 'alert-error' : 'alert-success']">
                    <svg v-if="isError" xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-5 w-5"
                        fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-5 w-5" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ responseMessage }}</span>
                </div>

                <!-- <p class="text-center text-sm mt-4 text-base-content/60">
                    Already have an account?
                    <router-link to="/login" class="link link-primary font-medium">Sign in</router-link>
                </p> -->
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
            showAlert: false,
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
                this.showAlert = false;
                if (this.credentials.password != this.credentials.confirmPassword) {
                    this.isError = true;
                    this.responseMessage = "Password does not match.";
                    return;
                }

                const response = await api.post("/auth/register", this.credentials);

                // console.log(response);
                this.responseMessage = response.data.message;
            } catch (error) {
                this.isError = true;
                console.log(error);
                const message =
                    error.response?.data?.message || "Something went terribly wrong here.";
                this.responseMessage = message;
            } finally {
                this.isLoading = false;
                this.showAlert = true;
            }
        },
    },
};
</script>
