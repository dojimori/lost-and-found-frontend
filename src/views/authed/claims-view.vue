<template>
  <dialog ref="unclaimModal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Are you sure you want to unclaim the item?</h3>
      <div class="modal-action">
        <button class="btn btn-soft btn-warning" @click="unclaimItem">Unclaim</button>
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn btn-soft btn-error">Cancel</button>
        </form>
      </div>
    </div>
  </dialog>

  <dialog ref="claimModal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Are you sure you want to claim the item?</h3>
      <div class="modal-action">
        <button class="btn btn-success btn-soft">Claim</button>
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn btn-soft btn-error">Cancel</button>
        </form>
      </div>
    </div>
  </dialog>
  <small class="text-gray-500"
    >Total counts of items you claimed and items that are claimed from you.</small
  >

  <div class="flex flex-row gap-2 mt-1 ">
    <div class="card card-border w-[300px] shadow-xs">
      <div class="card-body">
        <span class="badge badge-soft badge-sm badge-warning font-bold"
          >Total Claims</span
        >
        <h1 class="card-title">0</h1>
      </div>
    </div>

    <div class="card card-border w-[300px] shadow-xs">
      <div class="card-body">
        <span class="badge badge-soft badge-sm badge-success font-bold"
          >Accepted Claims</span
        >
        <h1 class="card-title">0</h1>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <div class="mb-2">
    <!-- <span class="text-xs text-gray-500">Here are people who claimed your posted items.</span> -->
    <h1 class="font-bold mt-4">Claims</h1>
    <small class="text-gray-500"
      >Here lost items you found that are claimed by others.</small
    >
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
          <th>Claimee's Message</th>
          <th>Clues</th>
          <th>Claimed date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="claim in claimedItems">
          <td>1</td>
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img :src="defPfp" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ claim.claimee.name }}</div>
                <div class="text-sm opacity-50">BSCS</div>
              </div>
            </div>
          </td>
          <td>{{ claim.item.name }}</td>
          <td>
            <img
              :src="`http://localhost:3000/public/${claim.item?.image}`"
              class="w-[50px] h-[50px] rounded-md object-cover"
              :alt="claim.item.name"
            />
          </td>
          <td>
            {{ claim.message }}
          </td>
          <td>
            <ul class="list-disc">
              <li v-if="claim.clue1">
                {{ claim.clue1 }}
              </li>
              <li v-if="claim.clue2">
                {{ claim.clue2 }}
              </li>
              <li v-if="claim.clue3">
                {{ claim.clue3 }}
              </li>
            </ul>
          </td>

          <td>
            {{
              new Date(claim.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })
            }}
          </td>
          <td class="flex gap-2">
            <button class="btn btn-primary" @click="openClaimModal(claim.id)">
              Confirm
            </button>
            <router-link
              :to="{
                name: 'claimMessage',
                params: { id: claim.claimeeId },
              }"
              class="btn btn-secondary"
              >Message</router-link
            >
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
    <small class="text-gray-500">Here are lost item/s that you claimed is yours.</small>
  </div>
  <!-- <div class="divider"></div> -->
  <div class="overflow-x-auto border border-base-content/5 bg-base-100" v-motion-fade>
    <table class="table">
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
          <td>
            {{
              new Date(claimed.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })
            }}
          </td>
          <td class="flex gap-2">
            <router-link
              :to="{
                name: 'claimMessageFounder',
                params: { id: claimed?.founderId },
              }"
              class="btn btn-primary"
              >Message Founder</router-link
            >
            <button class="btn btn-warning btn-soft" @click="openModal(claimed.id)">
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
      selectedUnclaimItem: null,
      claimedItems: null,
    };
  },

  methods: {
    openModal(claimedId) {
      this.$refs.unclaimModal.show();
      this.selectedUnclaimItem = claimedId;
    },
    openClaimModal(itemId) {
      this.$refs.claimModal.show();
    },
    async getMyClaimedItems() {
      try {
        const { data } = await api.get("/claims/my-claimed-items");
        this.myClaimedItems = data;
        console.log("here", data);
      } catch (error) {}
    },

    async getClaimedItems() {
      try {
        const { data } = await api.get("/claims/claimed-items");
        console.log(data);
        this.claimedItems = data;
      } catch (error) {}
    },

    async unclaimItem() {
      let loader = this.$loading.show({
        // Optional parameters
        container: null,
        loader: "spinner",
        // canCancel: true,
        // onCancel: this.onCancel,
      });
      try {
        const response = await api.post("/claims/unclaim", {
          claimId: this.selectedUnclaimItem,
        });
        // this.myClaimedItems = response.data;
        this.getMyClaimedItems();
        console.log(response);
      } catch (error) {
      } finally {
        setTimeout(() => {
          loader.hide();
        }, 1500);
        this.$refs.unclaimModal.close();
      }
    },
  },

  mounted() {
    this.getClaimedItems();
    this.getMyClaimedItems();
  },
};
</script>
