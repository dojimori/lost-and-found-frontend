<template>
  <div class="flex border border-gray-200" v-motion-fade>
    <div class="flex-1 card card-border">
      <div class="card-body">
        <div class="card-title mb-4">
          <button class="btn btn-primary" @click="toggleEdit">
            Edit <ph-pencil-simple size="16"></ph-pencil-simple>
          </button>
          <button :disabled="isEditing" class="btn btn-secondary">
            Save <ph-floppy-disk size="16"></ph-floppy-disk>
          </button>
        </div>
        <div class="flex flex-col md:flex-row gap-4" v-if="user">
          <div class="avatar">
            <div class="w-24">
              <img :src="defPfp" alt="" class="max-h-24" />
            </div>
          </div>
          <div class="flex-1 flex flex-col gap-2">
            <!-- <h1 class="font-semibold text-2xl">Jyn Christopher</h1> -->
            <div>
              <span class="font-medium">Name</span>
              <input
                type="text"
                class="input w-full outline-none shadow-inner input-primary transition-all duration-200"
                :disabled="isEditing"
                :value="user.name"
              />
            </div>

            <div>
              <span class="font-medium">Email</span>
              <input
                type="text"
                class="input w-full outline-none shadow-inner input-primary transition-all duration-200"
                :disabled="isEditing"
                :value="user.email"
              />
            </div>

            <div>
              <span class="font-medium">Profile Picture</span>
              <input
                type="file"
                class="file-input file-input-primary w-full transition-all duration-200"
                :disabled="isEditing"
              />
            </div>

            <div>
              <span class="font-medium">Department</span>
              <select
                :disabled="isEditing"
                name=""
                id=""
                class=" select w-full outline-none shadow-inner input-primary transition-all duration-200"
              >
                <option value="" selected disabled>Please select your deparment</option>
                <option value="CITC">CITC</option>
                <option value="COT">COT</option>
                <option value="CEA">CEA</option>
                <option value="CSM">CSM</option>
              </select>
            </div>

            <div>
              <span class="font-medium">Year</span>
              <select
                :disabled="isEditing"
                name=""
                id=""
                class="input w-full outline-none shadow-inner input-primary transition-all duration-200"
              >
                <option value="" selected disabled>Please select your year level</option>
                <option value="Freshman">Freshman (1st year)</option>
                <option value="Sophomore">Sophomore (2nd year)</option>
                <option value="Junior">Junior (3rd year)</option>
                <option value="Senior">Senior (4th year)</option>
              </select>
            </div>

            <fieldset class="fieldset" :disabled="isEditing">
              <legend class="fieldset-legend">More info...</legend>
              <textarea
                class="textarea h-24 w-full transition-all duration-200"
                placeholder=""
              ></textarea>
              <div class="label">Optional</div>
            </fieldset>

            <small>Facebook link</small>
            <label
              class="input w-full outline-none border border-gray-400 input-primary transition-all duration-200"
            >
              <img
                class="w-[16px]"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg"
              />

              <input type="text" class="grow" placeholder="Link" :disabled="isEditing" />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import defPfp from "@/assets/def_pfp.jpg";
import { api } from "@/helpers/api";
import { PhPencilSimple, PhFloppyDisk } from "@phosphor-icons/vue";
export default {
  components: {
    PhPencilSimple,
    PhFloppyDisk,
  },
  data() {
    return {
      defPfp,
      isEditing: true,
      user: null as any,
    };
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },

    async getCurrentUser() {
      try {
        const { data } = await api.get("/user/getme");
        // console.log(data);
        this.user = data.user;
      } catch (error) {}
    },
  },
  mounted() {
    this.getCurrentUser();
  },
};
</script>
