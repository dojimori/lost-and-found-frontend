<template>
  <div class="flex items-center p-4 justify-center h-[80vH]" v-motion-fade>
    <form
      action=""
      class="flex flex-col gap-1 w-100 p-4 border border-gray-300 shadow-lg"
    >
      <h4 class="mb-4 font-bold">Register</h4>
      <div class="flex flex-col gap-2">
        <label for="" class="floating-label">
          <span>Username</span>
          <input type="text" class="input w-full" placeholder="Username" />
        </label>

        <label for="" class="floating-label">
          <span>Email</span>
          <input type="text" class="input w-full" placeholder="Email" />
        </label>

        <label for="" class="floating-label">
          <span>Password</span>
          <input type="text" class="input w-full" placeholder="Password" />
        </label>
      </div>

      <button type="submit" class="btn btn-primary mt-4">Register</button>
    </form>
  </div>
</template>
