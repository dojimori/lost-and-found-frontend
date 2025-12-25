<template>
    <!-- Open the modal using ID.showModal() method -->
    <button class="btn" onclick="post_item_modal.showModal()">Post Item</button>
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

    <div class="flex flex-row flex-wrap gap-8 items-center justify-center">
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

                    <p class="text-[12px] font-bold">{{ item.user.name }}</p>
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
                // {
                //     id: 1,
                //     itemImage: 'https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/598274256_867114656251812_6662297040089705085_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEyYvcKYon9WtZ0BIpckYWRWpVuJk4OEElalW4mTg4QSR-UQEzlkmKnTtVf-o3OeuEjmg4G-Tunx0-P_CCrLLi8&_nc_ohc=AZcgVEQu9wIQ7kNvwFTfsgm&_nc_oc=AdmmlJo7RQxwckjwxXeKS95nR7Ttfuv7uUk6IydEIxMtmMu1EEGLxZEp2MQ232l9hhA&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=n0E2T-ez710J8-tiYNDw_g&oh=00_Afnbt2VNgygaVjggaA9ihMmlpqkmzKpBD8JpfREDPCxbIg&oe=694BCDC0',
                //     itemName: 'Wallet',
                //     lastSeen: 'BLDG. 48',
                //     status: 'not found',
                //     user: {
                //         profile: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
                //         name: 'Alexander Gabriel'
                //     }
                // },
                // {
                //     id: 2,
                //     itemImage: 'https://scontent.fcgy1-3.fna.fbcdn.net/v/t39.30808-6/600215270_1872124793404801_1242119322575631170_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeFBcWREs8mj8wQILfpgrQcGv-DCcCfJmHy_4MJwJ8mYfOe5VE8YoJb1XlO2xYKBi1iesFoK8UEc6CS6eOTd3wJO&_nc_ohc=iQLBdsUI5u4Q7kNvwF68zNj&_nc_oc=AdnHDho1ipGX6ROVUW95FeZN_2DS_UlsOgVg5UbZQ8R_WiitlKHr-0Ehv4Vrv7oC2OU&_nc_zt=23&_nc_ht=scontent.fcgy1-3.fna&_nc_gid=mXg8C0_m0Kpw73VNBvgjhw&oh=00_AfmuEMnsKyGVfkWuVDAHLVgVJM0r9QdvDvICTZWgrNkmRg&oe=694BDF68',
                //     itemName: 'Phone',
                //     lastSeen: 'BLDG. 48',
                //     status: 'found',
                //     user: {
                //         profile: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
                //         name: 'Rhudd Lawrence'
                //     }
                // },
                // {
                //     id: 3,
                //     itemImage: 'https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/598274256_867114656251812_6662297040089705085_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEyYvcKYon9WtZ0BIpckYWRWpVuJk4OEElalW4mTg4QSR-UQEzlkmKnTtVf-o3OeuEjmg4G-Tunx0-P_CCrLLi8&_nc_ohc=AZcgVEQu9wIQ7kNvwFTfsgm&_nc_oc=AdmmlJo7RQxwckjwxXeKS95nR7Ttfuv7uUk6IydEIxMtmMu1EEGLxZEp2MQ232l9hhA&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=n0E2T-ez710J8-tiYNDw_g&oh=00_Afnbt2VNgygaVjggaA9ihMmlpqkmzKpBD8JpfREDPCxbIg&oe=694BCDC0',
                //     itemName: 'Wallet',
                //     lastSeen: 'BLDG. 48',
                //     status: 'not found',
                //     user: {
                //         profile: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
                //         name: 'Jc James'
                //     }
                // }
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
