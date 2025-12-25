<template>

    <router-link to="/feed" class="btn">Back</router-link>
    <div class="flex flex-col justify-center gap-8 items-center" v-motion-fade>
        <!-- LOST ITEM CARD -->
        <div class="bg-base-200 p-2 rounded-md flex flex-col gap-4 w-[600px] items-center shadow-md">
            <!-- Item Image -->
            <div class="w-full h-[400px] bg-gray-200 border border-gray-800 rounded-sm"></div>
            <!-- <img :src="lostItem.img" :alt="lostItem.itemName" class="w-full max-h-[440px] object-contain rounded-sm" /> -->
            <div class="px-12 py-2">
                <!-- Item Name -->
                <h2 class="text-xl mb-3 font-semibold">
                    {{ lostItem.itemName }}
                </h2>
                <div class="mb-4">
                    <p class="text-gray-800">
                        {{ lostItem.description }}
                    </p>
                </div>

                <!-- Posted By -->
                <div class="flex items-center gap-3">
                    <div class="avatar">
                        <div class="w-10 h-10 rounded-full">
                            <img :src="lostItem.user.profile" :alt="lostItem.user.name" />
                        </div>
                    </div>
                    <div class="flex justify-between w-100">
                        <div class="flex flex-col leading-tight">
                            <p class="text-sm font-medium">
                                {{ lostItem.user.name }}
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

export default {
    data() {
        return {
            lostItem: {
                id: 1,
                img:
                    "",
                itemName: "Wallet",
                lastSeen: "BLDG. 48",
                status: "not found",
                description: "Lorem refers to Lorem Ipsum, the standard placeholder or dummy text used in design (print, web, graphic) to fill space and demonstrate layouts, fonts, or design elements without distracting with meaningful content. Its a scrambled, nonsensical Latin text derived from a Cicero work, giving the appearance of real text but keeping focus on the visual design, with versions available in most design software and online generators",
                user: {
                    profile: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
                    name: "Alexander Gabriel",
                },
            },
        };
    },

    methods: {
        async getItem(id: string) {
            try {
                const response = await api.get(`/items/${id}`);
                console.log(response)
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
