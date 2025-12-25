<template>

    <router-link to="/feed" class="btn">Back</router-link>
    <div class="flex flex-col justify-center gap-8 items-center" v-motion-fade>
        <!-- LOST ITEM CARD -->
        <div class="bg-base-200 p-2 rounded-md flex flex-col gap-4 w-[600px] items-center shadow-md">
            <!-- Item Image -->
            <div class="px-12 py-2" v-if="item">
                <div
                    class="mb-2 w-full h-[400px] bg-gray-200 border border-gray-800 hover:border-blue-800 duration-200 rounded-sm">
                    <img :src="`http://localhost:3000/public/${item.image}`" :alt="item.name"
                        class="rounded-sm h-[100%] w-[100%] object-contain " />
                </div>
                <!-- Item Name -->
                <h2 class="text-xl mb-3 font-semibold">
                    {{ item.name }}
                </h2>
                <div class="mb-4">
                    <p class="text-gray-800">
                        {{ item.description }}
                    </p>
                </div>

                <!-- Posted By -->
                <div class="flex items-center gap-3">
                    <div class="avatar">
                        <div class="w-10 h-10 rounded-full">
                            <img :src="defPfp" :alt="item.founder.name" />
                        </div>
                    </div>
                    <div class="flex justify-between w-100">
                        <div class="flex flex-col leading-tight">
                            <p class="text-sm font-medium">
                                {{ item.founder.name }}
                            </p>
                            <span class="text-xs text-base-content/60">
                                Posted a lost item
                            </span>
                        </div>

                        <button class="btn btn-secondary">Claim</button>
                    </div>
                </div>
            </div>

        </div>

        <!-- COMMENTS SECTION -->
        <div class="flex-1 bg-base-200 p-4 rounded-md w-full max-w-3xl">
            <div class="flex gap-2">
                <input type="text" class="input w-full" placeholder="Comment..." />
                <button class="btn btn-primary">Post</button>
            </div>

            <div class="divider"></div>

            <!-- comments -->
            <div class="flex flex-col gap-6 overflow-y-scroll h-[400px]">

                <!-- Comment -->
                <div class="flex gap-4 bg-base-300 p-3 rounded-lg">
                    <div class="avatar">
                        <div class="w-12 h-12 rounded-full">
                            <img src="https://randomuser.me/api/portraits/women/32.jpg" />
                        </div>
                    </div>
                    <div>
                        <p class="text-sm font-semibold">Maria Cruz</p>
                        <p class="text-xs text-base-content/60">2 hours ago</p>
                        <p class="text-sm mt-1">
                            I think I saw a brown wallet near the jeepney stop by Rizal Ave earlier today.
                        </p>
                    </div>
                </div>

                <div class="flex gap-4 bg-base-300 p-3 rounded-lg">
                    <div class="avatar">
                        <div class="w-12 h-12 rounded-full">
                            <img src="https://randomuser.me/api/portraits/men/45.jpg" />
                        </div>
                    </div>
                    <div>
                        <p class="text-sm font-semibold">Joshua Lim</p>
                        <p class="text-xs text-base-content/60">1 hour ago</p>
                        <p class="text-sm mt-1">
                            I found a wallet last night around 9 PM. Does it have a UMak ID inside?
                        </p>
                    </div>
                </div>

                <div class="flex gap-4 bg-base-300 p-3 rounded-lg">
                    <div class="avatar">
                        <div class="w-12 h-12 rounded-full">
                            <img src="https://randomuser.me/api/portraits/women/68.jpg" />
                        </div>
                    </div>
                    <div>
                        <p class="text-sm font-semibold">Alyssa Mae</p>
                        <p class="text-xs text-base-content/60">45 minutes ago</p>
                        <p class="text-sm mt-1">
                            Try asking the security office near the mall.
                        </p>
                    </div>
                </div>

                <div class="flex gap-4 bg-base-300 p-3 rounded-lg">
                    <div class="avatar">
                        <div class="w-12 h-12 rounded-full">
                            <img src="https://randomuser.me/api/portraits/men/12.jpg" />
                        </div>
                    </div>
                    <div>
                        <p class="text-sm font-semibold">Ken Ramirez</p>
                        <p class="text-xs text-base-content/60">20 minutes ago</p>
                        <p class="text-sm mt-1">
                            Sharing this to our barangay group chat now 🙏
                        </p>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>


<script lang="ts">
import { api } from '@/helpers/api'
import defPfp from '@/assets/def_pfp.jpg'

interface Founder {
    name: string;
    profile?: string;
}

interface Item {
    id: string;
    name: string;
    description: string;
    status?: string;
    img?: string;
    founder: Founder;
}

export default {
    data() {
        return {
            defPfp,
            item: null as Item | null
        };
    },

    methods: {
        async getItem(id: string) {
            try {
                const { data } = await api.get(`/items/${id}`);
                this.item = data.item as Item;
            } catch (error) {
                console.log(error)
            }
        }


    },

    computed: {
        id(): string | null {
            return this.$route.params.id as string | null;
        }
    },

    mounted() {
        // console.log(this.id)
        if (this.id) {
            this.getItem(this.id);
        }
    },
    watch: {
        id(newId) {
            if (newId) {
                this.getItem(newId);
            }
        }
    }


};
</script>
