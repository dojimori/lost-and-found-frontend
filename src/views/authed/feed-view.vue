<template>
  <div>
    <h1 class="font-bold my-2">Missing Items</h1>
  </div>
  <div class="flex flex-row justify-between flex-wrap gap-8 items-start">
    <!-- item card -->
    <div
      v-for="item in lostItems"
      class="p-4 border border-gray-400 flex flex-col justify-center rounded-sm shadow-sm bg-white"
    >
      <div class="flex flex-row gap-2">
        <img :src="defPfp" class="object-cover w-[40px]" :alt="item.name" />
        <div class="flex flex-col">
          <p class="font-bold text-primary">{{ item.founder.name }}</p>
          <small class="text-gray-400">
            {{ format(new Date(item.createdAt)) }}
          </small>
        </div>
      </div>
      <!-- divider -->
      <div class="w-full h-[2px] bg-gray-200 my-2"></div>

      <div>
        <figure class="">
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
              'bg-green-100': item.status == 'found',
              'bg-amber-100': item.status != 'found',
            },
          ]"
          >{{ item.status }}</span
        >
        <h2 class="text-primary font-bold">
          {{ truncate(item.name, 100) }}
        </h2>
        <p class="text-gray-700 text-sm">{{ truncate(item.description, 100) }}</p>

        <button class="bg-primary w-[100%] text-white font-semibold p-2 mt-2 shadow-md">
          <router-link
            :to="{ name: 'respond', params: { id: item.id } }"
            class="flex gap-2 items-center justify-center"
            >Respond
            <ph-paper-plane-tilt></ph-paper-plane-tilt>
          </router-link>
        </button>
      </div>
    </div>

    <!-- <div
      v-for="item in lostItems"
      v-motion-fade
      class="border border-gray-400 card bg-base-200 rounded-none w-[328px] shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-700"
    >
      <figure class="max-w-[100%] max-h-[300px]">
        <img
          :src="`http://localhost:3000/public/${item.image}`"
          class="object-cover"
          :alt="item.name"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          {{ truncate(item.name, 12) }}
          <span
            :class="[
              'badge badge-sm ',
              {
                'badge-success': item.status == 'found',
                'badge-warning': item.status != 'found',
              },
            ]"
            >{{ item.status }}</span
          >
        </h2>
        <p>{{ truncate(item.description, 33) }}</p>

        <div class="flex items-center gap-4">
          <div class="avatar">
            <div class="w-6 rounded-full">
              <img :src="item.founder.profile ?? defPfp" />
            </div>
          </div>

          <p class="text-[12px] font-bold">{{ item.founder.name }}</p>
        </div>

        <div class="card-actions justify-center">
          <router-link
            :to="{ name: 'respond', params: { id: item.id } }"
            class="btn btn-primary"
            >Respond
            <ph-paper-plane-tilt></ph-paper-plane-tilt>
          </router-link>

        </div>
      </div>
    </div> -->
    <div class="bg-white border border-gray-300 rounded-sm w-1/2">
      <h1 class="text-center bg-primary px-4 py-1 text-white">Create Post</h1>
      <div class="flex flex-col gap-3 p-4 ">
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
        :class="['alert alert-soft  mt-2', isError ? 'alert-error' : 'alert-success']"
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
      <button
        @click="postItem"
        class="bg-primary text-white p-2 mt-4 shadow-md cursor-pointer"
      >
        Post
      </button>
    </div>
  </div>
  <!-- <div class="mt-4">
    <div class="join">
      <button class="join-item btn">«</button>
      <button class="join-item btn">Page 1</button>
      <button class="join-item btn">»</button>
    </div>
  </div> -->
</template>

<script>
import { PhPaperPlaneTilt } from "@phosphor-icons/vue";
import defPfp from "@/assets/def_pfp.jpg";
import { apiUrl, api } from "@/helpers/api";
import { format } from "timeago.js";
export default {
  components: {
    PhPaperPlaneTilt,
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
