<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog id="post_item_modal" class="modal" ref="postItemModal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Post Item</h3>

      <div class="divider"></div>
      <!-- <p class="py-4">Press ESC key or click the button below to close</p> -->

      <div class="flex flex-col gap-3">
        <label class="floating-label">
          <span>Item Name</span>
          <input
            v-model="itemName"
            type="text"
            class="input w-full"
            placeholder="Item Name"
          />
        </label>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Description</legend>
          <textarea
            v-model="description"
            class="textarea h-24 w-full"
            placeholder=""
          ></textarea>
        </fieldset>
        <label>
          <span class="text-sm">Item Image</span>
          <input
            @change="onFileChange"
            type="file"
            class="file-input file-input-primary w-full"
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

      <div class="modal-action">
        <button @click="postItem" class="btn btn-primary">Submit</button>
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
  <!-- <div class="divider"></div> -->
  <div class="flex gap-2 mb-4 mt-2">
    <button class="btn btn-primary" @click="openModal">Post Item</button>

    <label class="input input-primary outline-none shadow-inner">
      <svg
        class="h-[1.2em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input type="search" class="grow" placeholder="Search" />
    </label>
  </div>

  <div class="flex flex-col flex-wrap gap-8 justify-center items-center">
    <!-- item card -->
    <div
      v-for="item in lostItems"
      class="p-2 border md:border-none border-gray-200 flex flex-col md:flex-row justify-center gap-2 md:gap-8"
    >
      <div class="flex flex-row md:flex-col gap-2 md:items-center">
        <figure>
          <img :src="defPfp" class="object-cover w-[55px]" :alt="item.name" />
        </figure>
        <div class="flex flex-col">
          <p class="text-[14px]">{{ item.founder.name }}</p>
          <span class="text-xs text-base-content/60">
            {{ format(new Date(item.createdAt)) }}
          </span>
        </div>
      </div>

      <div>
        <h2 class="text-gray-700 font-bold mb-2">
          {{ truncate(item.name, 100) }}
        </h2>

        <figure class="">
          <img
            :src="`http://localhost:3000/public/${item.image}`"
            class="object-cover w-[500px] max-h-[230px] rounded-xs"
            :alt="item.name"
          />
        </figure>

        <span
          :class="[
            'badge badge-sm my-2',
            {
              'badge-success': item.status == 'found',
              'badge-warning': item.status != 'found',
            },
          ]"
          >{{ item.status }}</span
        >
        <p class="text-gray-700">{{ truncate(item.description, 100) }}</p>

        <div class="mt-2">
          <router-link
            :to="{ name: 'respond', params: { id: item.id } }"
            class="btn btn-primary"
            >Respond
            <ph-paper-plane-tilt></ph-paper-plane-tilt>
          </router-link>
        </div>
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
  </div>
  <div class="mt-4">
    <div class="join">
      <button class="join-item btn">«</button>
      <button class="join-item btn">Page 1</button>
      <button class="join-item btn">»</button>
    </div>
  </div>
</template>

<script>
import { PhPaperPlaneTilt } from "@phosphor-icons/vue";
import defPfp from "@/assets/def_pfp.jpg";
import { api } from "@/helpers/api";
import { format } from "timeago.js";
export default {
  components: {
    PhPaperPlaneTilt,
  },

  data() {
    return {
      format,
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

        const response = await api.post("/items/", formData, {
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
