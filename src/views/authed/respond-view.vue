<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog id="post_item_modal" class="modal" ref="postItemModal">
    <div class="modal-box" ref="modalBox">
      <h3 class="text-lg font-bold">Claim Confirmation</h3>
      <div class="flex flex-col gap-3">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Say a message to the founder (required)</legend>
          <textarea v-model="claimData.message" class="textarea h-24 w-full"></textarea>
        </fieldset>

        <small class="text-xs text-gray-500">
          List at least 1 characteristic of the item (optional).
        </small>

        <input
          v-model="claimData.clue1"
          type="text"
          class="input w-full"
          placeholder="Clue 1"
        />

        <input
          v-model="claimData.clue2"
          type="text"
          class="input w-full"
          placeholder="Clue 2"
        />

        <input
          v-model="claimData.clue3"
          type="text"
          class="input w-full"
          placeholder="Clue 3"
        />

        <label>
          <small class="text-xs text-gray-500"> Provide a photo proof (optional). </small>
          <input
            type="file"
            class="file-input file-input-primary w-full"
            @change="handleFileUpload"
          />
        </label>
      </div>

      <div
        v-motion-fade
        v-if="showAlert"
        :class="['alert alert-soft mt-2', isError ? 'alert-error' : 'alert-success']"
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
        <button class="btn btn-primary mr-2" @click="claimItem">Submit</button>

        <form method="dialog">
          <button class="btn btn-error btn-soft">Cancel</button>
        </form>
      </div>
      <!-- <p class="py-4">Press ESC key or click the button below to close</p> -->
    </div>
  </dialog>
  <router-link to="/feed" class="btn btn-ghost">Back</router-link>
  <div class="flex flex-col gap-2 items-center justify-center" v-motion-fade>
    <!-- LOST ITEM CARD -->
    <div class="md:px-12 py-4 rounded-sm md:w-3xl">
      <!-- Item Image -->
      <div class="" v-if="item">
        <div class="flex flex-row gap-2">
          <img :src="defPfp" class="object-cover w-[55px]" :alt="item.name" />

          <div class="flex flex-col ">
            <p class="text-md font-medium text-gray-600">{{ item.founder.name }}</p>
            <span class="text-xs text-base-content/60">
              {{ format(new Date(item.createdAt)) }}
            </span>
          </div>
        </div>

        <div class="divider"></div>
        <div class="mb-2 md:w-full flex flex-col items-center">
          <img
            :src="`${apiUrl}/public/${item.image}`"
            :alt="item.name"
            class="sm:w-[400px] sm:h-[500px] object-contain"
          />
        </div>
        <!-- Item Name -->
        <h2 class="text-xl mt-6 mb-1 font-bold">
          {{ item.name }}
        </h2>
        <div class="mb-1">
          <p class="text-gray-800 text-sm sm:text-md">
            {{ item.description }}
          </p>
        </div>
      </div>
      <!-- claim btn -->
      <div class="mt-4" v-if="item">
        <button class="btn btn-secondary" @click="openModal">Claim</button>
      </div>
    </div>

    <!-- COMMENTS SECTION -->
    <div class="flex-1 md:p-4 rounded-md w-full md:w-3xl">
      <form @submit.prevent="submitComment" class="flex bg-gray-50 p-2  flex-col md:flex-row gap-2 mb-2">
      <div class="flex w-full gap-2">
        <img
            :src="defPfp"
            class="w-[30px] h-[30px] md:w-[40px] h-[40px] object-cover"
          />
        <textarea
          v-model="comment"
          type="text"
          class="textarea w-full outline-none"
          placeholder="Comment something..."
        ></textarea>
      </div>

        <button type="submit" class="btn btn-primary bt-">Post</button>
      </form>

      <!-- <div class="divider"></div> -->

      <!-- comments -->
      <div class="flex flex-col gap-4 mt-6">
        <!-- Comment -->
        <div
          v-for="comment in comments"
          v-motion-slide-fade
          class="flex gap-4 px-1 py-2"
        >
          <img
            :src="defPfp"
            class="w-[45px] h-[45px] md:w-[50px] h-[50px] object-cover"
          />
          <div>
            <p class="text-sm font-semibold text-gray-600">
              {{ comment.user.name }}
              -
              <span class="text-xs text-base-content/60">
                {{ format(new Date(comment.createdAt)) }}
              </span>
            </p>

            <p class="text-sm mt-1">
              {{ comment.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { api, apiUrl } from "@/helpers/api";
import defPfp from "@/assets/def_pfp.jpg";
import { format } from "timeago.js";

interface User {
  name: string;
  id: string;
}

interface Founder {
  name: string;
  profile?: string;
}

interface Item {
  id: string;
  name: string;
  description: string;
  status?: string;
  image?: string;
  founder: Founder;
  createdAt: string;
}

interface Comments {
  id: string;
  content: string;
  createdAt: string;
  user: User;
}

export default {
  data() {
    return {
      format,
      apiUrl,
      isLoading: false,
      isError: false,
      showAlert: false,
      responseMessage: "",
      defPfp,
      item: null as Item | null,
      comment: "",
      comments: [] as Comments[],
      claimData: {
        message: "",
        clue1: "",
        clue2: "",
        clue3: "",
        proofImage: null as File | null,
      },
      fullPage: false,
    };
  },

  methods: {
    async claimItem() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.modalBox,
        loader: "spinner",
        // canCancel: true,
        // onCancel: this.onCancel,
      });
      try {
        if (!this.item) return;
        this.isLoading = true;
        this.isError = false;
        this.showAlert = false;
        const formData = new FormData();

        formData.append("postId", this.item.id);
        formData.append("message", this.claimData.message);
        formData.append("clue1", this.claimData.clue1);
        formData.append("clue2", this.claimData.clue2);
        formData.append("clue3", this.claimData.clue3);

        if (this.claimData.proofImage) {
          formData.append("proofImage", this.claimData.proofImage);
        }

        const response = await api.post("/claims", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response);

        // close modal after submit
        // (this.$refs.postItemModal as any).close();
        this.responseMessage = response.data.message;
        // this.responseMessage = "";
      } catch (error) {
        this.isError = true;
        console.log(error);
        const message =
          error.response?.data?.message || "Something went terribly wrong here.";
        this.responseMessage = message;
      } finally {
        setTimeout(() => {
          loader.hide();
        }, 2000);
        this.isLoading = false;
        this.showAlert = true;
      }
    },

    handleFileUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        (this.claimData.proofImage as any) = target.files[0];
      }
    },

    async submitComment() {
      try {
        if (!this.item) return;

        if (!this.comment.trim()) {
          alert("comment something");
        }

        const response = await api.post("/comments", {
          content: this.comment,
          postId: this.item.id,
        });

        console.log(response);

        this.getComments(this.item.id);
        this.comment = "";
      } catch (error) {
        console.log(error);
      }
    },

    openModal() {
      (this.$refs.postItemModal as any).showModal();
    },

    async getItem(id: string) {
      try {
        const { data } = await api.get(`/items/${id}`);
        this.item = data.item as Item;
      } catch (error) {
        console.log(error);
      }
    },

    async getComments(postId: string) {
      try {
        const { data } = await api.get(`/comments/${postId}`);
        console.log(data);

        this.comments = data.comments;
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    id(): string | null {
      return this.$route.params.id as string | null;
    },
  },

  mounted() {
    if (this.id) {
      this.getItem(this.id);
      this.getComments(this.id);
    }
  },
  watch: {
    id(newId) {
      if (newId) {
        this.getItem(newId);
      }
    },
  },
};
</script>
