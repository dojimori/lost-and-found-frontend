<template>
  <div class="flex flex-col" v-motion-fade>
    <div class="border px-8 py-2 border-gray-200 bg-primary text-white w-full">
      <div class="flex items-center flex-row gap-4">
        <img :src="defPfp" alt="" class="w-[44px] rounded-full" />
        <span class="font-bold"
          >Username <i class="text-sm font-normal">(claimee)</i></span
        >
        <!-- <div class="flex flex-col">
          <span >Course: BSIT</span>
          <span >ID Number: 2025300703</span>
          <span >Email: asdasd@gmail.com</span>
          <span >1st Year</span>
        </div> -->
      </div>
    </div>
    <div
      class="flex p-2 shadow-lg flex-col justify-between border border-gray-200 w-full h-[500px]"
    >
      <div class="flex-1 flex flex-col items-center gap-2">
        <small class="text-gray-500">Messages will appear here.</small>
        <!-- message box -->
        <div class="flex gap-2 items-center w-full rounded-sm">
          <div class="flex w-[88px] flex-col items-center justify-center">
            <img :src="defPfp" alt="" class="w-[33px]" />
            <small class="break-all text-gray-800">Username</small>
          </div>

          <div class="bg-gray-100 p-2 rounded-sm">
            <p class="text-sm">Hey, this is actually mine</p>
            <small class="text-gray-500">June, 26, 2026 5:33AM</small>
          </div>
        </div>

        <div class="flex gap-2 items-center w-full rounded-sm">
          <div class="flex flex-col w-[88px] items-center justify-center">
            <img :src="defPfp" alt="" class="w-[33px]" />
            <small class="break-all text-amber-600 font-medium">Me</small>

          </div>

          <div class="bg-gray-100 p-2 rounded-sm">
            <p class="text-sm">u can meet me at school later</p>
            <small class="text-gray-500">June, 26, 2026 5:33AM</small>
          </div>
        </div>
      </div>

      <form @submit.prevent="sendMessage" class="flex gap-2">
        <input
          v-model="message"
          type="text"
          class="input w-full input-primary shadow-inner border border-gray-400 focus:border-2 focus:border-blue-400 outline-none transition-all duration-200"
          placeholder="Send a message..."
        />

        <button type="submit" class="btn btn-primary">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import defPfp from "@/assets/def_pfp.jpg";

export default {
  data() {
    return {
      defPfp,
      message: "",
      messages: [],
    };
  },
  methods: {
    async sendMessage() {
      this.messages.push(message);
    },
  },
};
</script>
