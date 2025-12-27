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
  <router-link to="/feed" class="btn">Back</router-link>
  <div class="flex flex-col lg:flex-row gap-2 justify-center" v-motion-fade>
    <!-- LOST ITEM CARD -->
    <div
      class="px-12 py-4 rounded-sm mt-2 md:w-3xl border-t border-l border-r border-gray-200"
    >
      <!-- Item Image -->
      <div class="md:px-8 py-2" v-if="item">
        <div
          class="mb-2 md:w-full md:max-h-[400px] duration-200 rounded-sm overflow-hidden flex flex-col items-center"
        >
          <img
            :src="`http://localhost:3000/public/${item.image}`"
            :alt="item.name"
            class="rounded-sm md:w-[400px] md:h-[500px] object-contain"
          />
        </div>
        <!-- Item Name -->
        <h2 class="text-xl mb-1 font-bold">
          {{ item.name }}
        </h2>
        <div class="mb-4">
          <p class="text-gray-800 text-sm sm:text-md">
            {{ item.description }}
          </p>
        </div>
      </div>
      <!-- Posted By -->
      <div class="" v-if="item">
        <div class="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <div class="avatar">
              <div class="rounded-full">
                <img :src="defPfp" class="max-w-[33px]" :alt="item.founder.name" />
              </div>
            </div>
            <div class="f lex flex-col leading-tight">
              <p class="text-sm font-medium">
                {{ item.founder.name }}
              </p>
              <span class="text-xs text-base-content/60"> Posted a lost item </span>
            </div>
          </div>
          <button class="btn btn-secondary mt-2" @click="openModal">Claim</button>
        </div>
      </div>
    </div>

    <!-- COMMENTS SECTION -->
    <div class="flex-1 border border-gray-200 shadow-xs p-4 rounded-md md:w-3xl">
      <div class="flex gap-2 mb-2">
        <input
          v-model="comment"
          type="text"
          class="input w-full"
          placeholder="Comment..."
        />
        <button @click="submitComment" class="btn btn-primary">Post</button>
      </div>

      <!-- <div class="divider"></div> -->

      <!-- comments -->
      <div class="flex flex-col gap-1.5 overflow-y-scroll">
        <!-- Comment -->
        <div v-for="comment in comments" class="flex gap-4 bg-gray-50 p-3 rounded-sm">
          <div class="avatar">
            <div class="w-8 h-8 rounded-full">
              <img :src="defPfp" />
            </div>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ comment.user.name }}</p>
            <p class="text-xs text-base-content/60">
              {{
                new Date(comment.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
              }}
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
import { api } from "@/helpers/api";
import defPfp from "@/assets/def_pfp.jpg";

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
    // console.log(this.id)
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
