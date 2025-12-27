<template>
  <router-link to="/feed" class="btn">Back</router-link>
  <div class="flex flex-col justify-center items-center " v-motion-fade>
    <!-- LOST ITEM CARD -->
    <div class=" px-12 py-4 rounded-sm mt-2 w-3xl border-t border-l border-r  border-gray-200">
        <!-- Item Image -->
        <div class="sm:px-8 py-2" v-if="item">
          <div
            class="mb-2 md:w-full max-h-[400px]  duration-200 rounded-sm overflow-hidden flex flex-col items-center"
          >
            <img
              :src="`http://localhost:3000/public/${item.image}`"
              :alt="item.name"
              class="rounded-sm w-[400px] h-[500px] object-contain"
            />
          </div>
          <!-- Item Name -->
          <h2 class="text-xl mb-1 font-bold">
            {{ item.name }}
          </h2>
          <div class="mb-4">
            <p class="text-gray-800">
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
              <div class="flex flex-col leading-tight">
                <p class="text-sm font-medium">
                  {{ item.founder.name }}
                </p>
                <span class="text-xs text-base-content/60"> Posted a lost item </span>
              </div>
            </div>
            <button class="btn btn-secondary mt-2">Claim</button>
          </div>
        </div>
    </div>

    <!-- COMMENTS SECTION -->
    <div class="flex-1 border border-gray-200  shadow-xs p-4 rounded-md w-3xl">
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
            <!-- TODO!: format this date -->
            <p class="text-xs text-base-content/60">{{ comment.createdAt }}</p>
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
      defPfp,
      item: null as Item | null,
      comment: "",
      comments: [] as Comments[],
    };
  },

  methods: {
    async submitComment() {
      try {
        if (!this.item) return;

        if (!this.comment.trim()) {
          alert('comment something')
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
