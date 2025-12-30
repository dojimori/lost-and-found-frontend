<template>
  <div class="flex border border-gray-200" v-motion-fade>
    <div class="flex-1 card card-border">
      <div class="card-body">
        <div class="card-title mb-4">
          <button class="btn btn-primary" @click="toggleEdit">
            Edit <ph-pencil-simple size="16"></ph-pencil-simple>
          </button>
          <button @click="saveUpdate" :disabled="isEditing" class="btn btn-secondary">
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
                v-model="name"
              />
            </div>

            <div>
              <span class="font-medium">Email</span>
              <input
                type="text"
                class="input w-full outline-none shadow-inner input-primary transition-all duration-200"
                :disabled="isEditing"
                v-model="email"
              />
            </div>

            <div>
              <span class="font-medium">Profile Picture</span>
              <input
                type="file"
                class="file-input file-input-primary w-full transition-all duration-200"
                :disabled="isEditing"
                @change="onFileChange"
              />
            </div>

            <div>
              <span class="font-medium">Department</span>
              <select
                :disabled="isEditing"
                name=""
                id=""
                class="select w-full outline-none shadow-inner input-primary transition-all duration-200"
                v-model="department"
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
                v-model="yearLevel"
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
                v-model="moreInfo"
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

              <input
                type="text"
                class="grow"
                placeholder="Link"
                v-model="fbLink"
                :disabled="isEditing"
              />
            </label>
            <small class="text-gray-500"
              >Attach your Facebook link for people to know you better.</small
            >
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
      profilePicture: null,
      department: "",
      moreInfo: "",
      fbLink: "",
      name: "",
      email: "",
      yearLevel: "",
    };
  },
  methods: {
    onFileChange(event: any) {
      const file = event.target.files[0];
      this.profilePicture = file;
    },

    toggleEdit() {
      this.isEditing = !this.isEditing;
    },

    async getCurrentUser() {
      try {
        const { data } = await api.get("/user/getme");
        // console.log(data)
        const { user } = data;
        // console.log(user);
        this.user = user;
        this.name = user.name;
        this.email = user.email;
      } catch (error) {
        console.log(error)
      }
    },

    async saveUpdate() {
      // console.log(this.profilePicture)
      // console.log(this.department)
      // console.log(this.moreInfo)
      // console.log(this.fbLink)
      // console.log(this.name)
      // console.log(this.email)
      // console.log(this.yearLevel)

      try {
        const formData = new FormData();
        if (this.profilePicture) {
          formData.append('profilePicture', this.profilePicture);
        }

        formData.append('name', this.name);
        formData.append('email', this.email);
        formData.append('department', this.department);
        formData.append('moreInfo', this.moreInfo);
        formData.append('fbLink', this.fbLink);
        formData.append('yearLevel', this.yearLevel);

        const { data } = await api.post('/user/update-profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        console.log(data)
      } catch(error ) {
        console.log(error)
      }

    }
  },
  mounted() {
    this.getCurrentUser();
  },
};
</script>
