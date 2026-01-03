<template>
  <div class="mb-6">
    <h1 class="font-bold">Missing Items</h1>
  </div>
  <div class="flex flex-row justify-between flex-wrap gap-8 items-start">
    <div class="flex-1 flex flex-col gap-2">
      <!-- item card -->
      <div
        v-for="item in lostItems"
        class=" p-4 border border-gray-400 flex flex-col justify-center rounded-sm shadow-sm bg-white"
      >
        <div class="flex flex-row gap-2">
          <img :src="defPfp" class="object-cover h-[25px] w-[25px]" :alt="item.name" />
          <div class="flex flex-col">
            <p class="font-bold text-primary text-xs">{{ item.founder.name }}</p>
            <small class="text-gray-400 text-xs">
              {{ format(new Date(item.createdAt)) }}
            </small>
          </div>
        </div>
        <!-- divider -->
        <div class="w-full h-[2px] bg-gray-200 my-2"></div>

        <div>
          <figure class="flex justify-center w-full">
            <img
              :src="`${apiUrl}/public/${item.image}`"
              class="object-cover w-[500px] max-h-[230px]"
              :alt="item.name"
            />
          </figure>

          <span
            :class="[
              'px-2 my-2',
              {
                'bg-green-200 rounded-sm': item.status == 'found',
                'bg-amber-200 rounded-sm': item.status != 'found',
              },
            ]"
            >{{ item.status }}</span
          >
          <h2 class="text-primary font-bold">
            {{ truncate(item.name, 100) }}
          </h2>
          <p class=" text-gray-700 text-sm">{{ truncate(item.description, 100) }}</p>

          <button class="bg-primary w-[100%] text-white font-semibold p-2 mt-2 shadow-md">
            <router-link
              :to="{ name: 'respond', params: { id: item.id } }"
              class="text-xs flex gap-2 items-center justify-center"
              >Respond
              <!-- <ph-paper-plane-tilt></ph-paper-plane-tilt> -->
            </router-link>
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white border border-gray-300 rounded-sm w-1/2">
      <h1 class="text-center bg-primary px-4 py-1 text-white">Create Post</h1>
      <div class="flex flex-col gap-3 p-4">
        <label class="font-bold text-primary">
          <span>Item Name</span>
          <input
            v-model="itemName"
            type="text"
            class="w-full p-2 outline-1 outline-primary shadow-inner"
          />
        </label>
        <fieldset>
          <legend class="text-primary font-bold">Description</legend>
          <textarea
            v-model="description"
            class="w-full p-2 outline-1 outline-primary shadow-inner"
            placeholder=""
          ></textarea>
        </fieldset>
        <label>
          <span class="text-primary font-bold">Item Image</span>
          <input
            @change="onFileChange"
            type="file"
            class="w-full p-2 outline-1 outline-primary shadow-inner"
          />
        </label>
      </div>

      <div
        v-motion-fade
        v-if="showAlert"
        :class="[
          'mx-2 bg-red-100 border border-red-500 rounded-sm mt-2 shadow-sm flex gap-2 p-2 text-red-800',
        ]"
      >
        <svg
          v-if="isError"
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ responseMessage }}</span>
      </div>
      <div class="p-2">
        <button
          @click="postItem"
          class="bg-primary text-white px-4 py-1 shadow-md cursor-pointer"
        >
          Post
        </button>
      </div>
    </div>
  </div>
  <!-- spinner -->
  <transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-0"
    leave-to-class="opacity-100"
  >
    <div
      v-if="isLoading"
      class="flex items-center justify-center fixed z-10 top-0 left-0 bg-white/25 w-[100vw] h-[100vh]"
    >
      <vue-spinner-dots size="48" color="#3c5898"></vue-spinner-dots>
    </div>
  </transition>
</template>

<script>
import { PhPaperPlaneTilt } from "@phosphor-icons/vue";
import defPfp from "@/assets/def_pfp.jpg";
import { apiUrl, api } from "@/helpers/api";
import { format } from "timeago.js";
import { Transition } from "vue";

export default {
  components: {
    PhPaperPlaneTilt,
    Transition,
  },

  data() {
    return {
      format,
      apiUrl,
      defPfp,
      lostItems: [],
      itemName: "",
      description: "",
      itemImage: null,
      isError: false,
      responseMessage: null,
      showAlert: false,
      isLoading: false,
    };
  },

  methods: {
    openModal() {
      this.$refs.postItemModal.showModal();
    },

    truncate(str, maxLength) {
      if (str.length <= maxLength) return str;
      return str.slice(0, maxLength) + "...";
    },

    onFileChange(event) {
      this.itemImage = event.target.files[0];
    },
    async postItem() {
      try {
        this.isLoading = true;
        this.showAlert = false;
        const formData = new FormData();
        formData.append("itemName", this.itemName);
        formData.append("description", this.description);
        formData.append("image", this.itemImage);

        const response = await api.post("/items", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response);

        this.responseMessage = response?.data.message || "Success.";
        this.fetchPostedItems();
        this.itemName = "";
        this.itemImage = null;

        this.description = "";
        this.$refs.postItemModal.close();
      } catch (error) {
        this.isError = true;
        console.log(error);
        this.responseMessage = error.response?.data.message || "Something went wrong.";
      } finally {
        this.showAlert = true;
        this.isLoading = false;
      }
    },

    async fetchPostedItems() {
      try {
        this.isError = false;
        this.showAlert = false;
        const { data } = await api.get("/items");
        const postedItems = data.lostItems;
        this.lostItems = postedItems.map((item) => ({
          ...item,
          status: "lost",
        }));

        console.log(postedItems);
      } catch (error) {
        this.isError = true;
        this.showAlert = true;
        this.responseMessage =
          error.response?.data.message ||
          "Something went wrong. Your session might be expired, please login again.";
      }
    },
  },
  mounted() {
    this.fetchPostedItems();
  },
};
</script>

<style>
button:hover {
  opacity: 0.9;
}
</style>
