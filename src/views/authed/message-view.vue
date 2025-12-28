<template>
  <div class="flex flex-col gap-2">
    <div class="border p-8 border-gray-200 w-full">
      <div class=" flex items-center flex-row gap-8">
        <div>
          <img :src="defPfp" alt="" class="w-[55px]" />
          <span class="font-bold">Username</span>
        </div>
        <div class="flex flex-col">
          <span class="text-gray-500">Course: BSIT</span>
          <span class="text-gray-500">ID Number: 2025300703</span>
          <span class="text-gray-500">Email: asdasd@gmail.com</span>
          <span class="text-gray-500">1st Year</span>
        </div>
      </div>
    </div>
    <div class="flex p-2 shadow-lg rounded-md flex-col justify-between border border-gray-200 w-full h-[500px]">
      <div class="flex-1">

      </div>

      <form class="flex gap-2">
      
      <input type="text" class="input w-full input-primary shadow-inner
      border border-gray-400 focus:border-2 focus:border-blue-400 outline-none  transition-all duration-200" placeholder="Send a message...">
        <button class="btn btn-primary">Send</button>
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
    };
  },
};
</script>
