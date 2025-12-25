<template>
    <!-- Open the modal using ID.showModal() method -->
    <dialog id="post_item_modal" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Post Item</h3>
            <div class="divider"></div>
            <!-- <p class="py-4">Press ESC key or click the button below to close</p> -->


            <div class="flex flex-col gap-3">
                <label class="floating-label">
                    <span>Item Name</span>
                    <input v-model="itemName" type="text" class="input w-full" placeholder="Item Name" />
                </label>
                <label class="floating-label">
                    <span>Description</span>
                    <input v-model="description" type="text" class="input w-full" placeholder="Description" />
                </label>
                <label>
                    <span class="text-sm">Item Image</span>
                    <input @change="onFileChange" type="file" class="file-input file-input-primary w-full" />
                </label>
            </div>

            <div class="modal-action">
                <button @click="postItem" class="btn btn-primary">Submit</button>
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
    <!-- <div class="divider"></div> -->
    <div class='flex gap-2 mb-12'>
        <button class="btn btn-primary" onclick="post_item_modal.showModal()">Post Item</button>

        <label class="input input-primary outline-none shadow-inner">
            <svg class=" h-[1.2em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>
            <input type="search" class="grow" placeholder="Search" />
        </label>
    </div>

    <div class="flex flex-row flex-wrap gap-4 items-center justify-start">
        <div v-for="item in lostItems" v-motion-fade
            class="border border-gray-400 card bg-base-200 rounded-none w-[250px] shadow-sm transition-all  duration-500 hover:shadow-md">
            <figure class="max-w-[280px] max-h-[200px]">
                <img :src="`http://localhost:3000/public/${item.image}`" class="    object-cover" :alt="item.name" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">
                    {{ truncate(item.name) }}
                    <span :class="[
                        'badge badge-sm ',
                        {
                            'badge-success': item.status == 'found',
                            'badge-warning': item.status != 'found',
                        },
                    ]">{{ item.status }}</span>
                </h2>
                <p>{{ item.description }}</p>

                <div class="flex items-center gap-4">
                    <div class="avatar">
                        <div class="w-8 rounded-full">
                            <img :src="item.user.profile" />
                        </div>
                    </div>

                    <p class="text-[12px] font-bold">{{ item.founder.name }}</p>
                </div>

                <div class="card-actions justify-center">
                    <router-link :to="{ name: 'respond', params: { id: item.id } }" class="btn btn-primary">Respond
                        <ph-paper-plane-tilt></ph-paper-plane-tilt>
                    </router-link>

                    <!-- <div class="badge badge-outline">Fashion</div> -->
                    <!-- <div class="badge badge-outline">Products</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { PhPaperPlaneTilt } from "@phosphor-icons/vue";
import axios from "axios";

export default {
    components: {
        PhPaperPlaneTilt,
    },

    data() {
        return {
            lostItems: [
            ],
            itemName: "",
            description: "",
            itemImage: null,
        };
    },

    methods: {
        truncate(str) {
            const maxLength = 12;
            if (str.length <= maxLength) return str;
            return str.slice(0, 10) + '...'
        },

        onFileChange(event) {
            this.itemImage = event.target.files[0];
        },
        async postItem() {
            try {
                const token = localStorage.getItem('token')
                const formData = new FormData();
                formData.append("itemName", this.itemName);
                formData.append("description", this.description);
                formData.append("image", this.itemImage);

                const response = await axios.post("http://localhost:3000/api/items/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`
                    },
                });

                console.log(response);
                // console.log(this.itemName);
                // console.log(this.description)
                // console.log(this.itemImage)
                this.fetchPostedItems();
            } catch (error) {
                alert(JSON.stringify(error));
            } finally {
                this.itemName = "";
                this.description = "";
                this.itemImage = null;
            }
        },

        async fetchPostedItems() {
            try {
                const token = localStorage.getItem('token')
                // TODO: replace this with real db later
                const { data } = await axios.get("http://localhost:3000/api/items", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const postedItems = data.lostItems;
                // this.lostItems.push(...postedItems.map((item) => ({
                //     id: crypto.randomUUID(),
                //     ...item,
                //     user: {
                //         profile: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
                //         name: 'Rhudd Lawrence'
                //     }
                // })))

                this.lostItems = postedItems.map((item) => ({
                    ...item,
                    status: "not found",
                    user: {
                        profile: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
                        name: "Rhudd Lawrence",
                    },
                }));

                console.log(postedItems);
            } catch (error) {
                console.log(error);
                alert(JSON.stringify(error));
            }
        },
    },

    mounted() {
        this.fetchPostedItems();
    },
};
</script>
