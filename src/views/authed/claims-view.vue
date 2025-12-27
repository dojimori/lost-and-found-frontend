<template>
  <button class="btn" onclick="">open modal</button>
<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Are you sure you want to unclaim the item?</h3>
    <div class="modal-action">
        <button class="btn btn-soft btn-warning">Unclaim</button>
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-soft btn-error">Cancel</button>
      </form>
    </div>
  </div>
</dialog>

  <div class="flex flex-row gap-2 p-4 border-b border-gray-200">
    <div class="card card-border w-[300px] shadow-xs">
      <div class="card-body">
        <span class="badge badge-soft badge-sm badge-warning font-bold"
          >Total Claims</span
        >
        <h1 class="card-title">12</h1>
      </div>
    </div>

    <div class="card card-border w-[300px] shadow-xs">
      <div class="card-body">
        <span class="badge badge-soft badge-sm badge-success font-bold"
          >Accepted Claims</span
        >
        <h1 class="card-title">8</h1>
      </div>
    </div>
  </div>

  <div class="mb-2">
    <!-- <span class="text-xs text-gray-500">Here are people who claimed your posted items.</span> -->
    <h1 class="font-bold mt-4">Claims</h1>
  </div>
  <!-- <div class="divider"></div> -->
  <div
    class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
    v-motion-fade
  >
    <table class="table table-md">
      <!-- head -->
      <thead>
        <tr>
          <th>#</th>
          <th>Claimee</th>
          <th>Item</th>
          <th>Image</th>
          <th>Claimed date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img
                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div class="font-bold">Hart Hagerty</div>
                <div class="text-sm opacity-50">BSCS</div>
              </div>
            </div>
          </td>
          <td>Wallet</td>
          <td>
            <img
              src="https://placehold.co/80x80"
              class="max-w-[50px] rounded-md object-cover"
            />
          </td>
          <td>June 26, 2025</td>
          <td class="flex gap-2">
            <button class="btn btn-primary">Confirm</button>
            <button class="btn btn-secondary">Message</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-4">
    <div class="join">
      <button class="join-item btn">«</button>

      <button class="join-item btn">Page 1</button>

      <button class="join-item btn">»</button>
    </div>
  </div>

  <!-- my claims -->

  <div class="mb-2 mt-12">
    <!-- <span class="text-xs text-gray-500">Here are people who claimed your posted items.</span> -->
    <h1 class="font-bold mt-4">My Claimed Items</h1>
  </div>
  <!-- <div class="divider"></div> -->
  <div
    class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
    v-motion-fade
  >
    <table class="table table-md">
      <!-- head -->
      <thead>
        <tr>
          <th>#</th>
          <th>Founder</th>
          <th>Item</th>
          <th>Image</th>
          <th>Claimed date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(claimed, index) in myClaimedItems" :key="index">
          <td>{{ index }}</td>
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img :src="defPfp" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ claimed.item.founder?.name }}</div>
                <!-- <div class="text-sm opacity-50">BSCS</div> -->
              </div>
            </div>
          </td>
          <td>{{ claimed.item.name }}</td>
          <td>
            <img
              :src="`http://localhost:3000/public/${claimed.item?.image}`"
              class="w-[50px] h-[50px] rounded-md object-cover"
              :alt="claimed.item.name"
            />
          </td>
          <td>June 26, 2025</td>
          <td class="flex gap-2">
            <button class="btn btn-primary">Message Founder</button>
            <button class="btn btn-error btn-soft" onclick="my_modal_5.showModal()">
              Unclaim
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
import defPfp from "@/assets/def_pfp.jpg";
import { api } from "@/helpers/api";

export default {
  data() {
    return {
      defPfp,
      myClaimedItems: null,
    };
  },

  methods: {
    async getMyClaimedItems() {
      try {
        const response = await api.get("/claims/my-claimed-items");
        this.myClaimedItems = response.data;
        console.log(response);
      } catch (error) {}
    },
  },

  mounted() {
    this.getMyClaimedItems();
  },
};
</script>
