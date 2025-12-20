<template>

    <div class="flex flex-col justify-center gap-8 items-center">
        <div class="bg-base-200 p-4 rounded-xl flex flex-col gap-3 max-w-sm">

            <!-- Item Image -->
            <img :src="lostItem.img" :alt="lostItem.itemName" class="w-full h-48 object-cover rounded-lg" />

            <!-- Item Name -->
            <h2 class="text-lg font-semibold">
                {{ lostItem.itemName }}
            </h2>

            <!-- Posted By -->
            <div class="flex items-center gap-3">
                <div class="avatar">
                    <div class="w-9 h-9 rounded-full">
                        <img :src="lostItem.user.profile" :alt="lostItem.user.name" />
                    </div>
                </div>

                <div class="flex flex-col leading-tight">
                    <p class="text-sm font-medium">
                        {{ lostItem.user.name }}
                    </p>
                    <span class="text-xs text-base-content/60">
                        Posted a lost item
                    </span>
                </div>
            </div>

        </div>

        <div class="flex-1 bg-base-200 p-2 rounded-md">
            <div class="flex gap-2">
                <input type="text" class="input w-full " placeholder="Comment...">
                <button class="btn">Post</button>
            </div>


            <div class="divider"></div>


            <!-- comments -->
            <div class="flex flex-col gap-6 overflow-y-scroll h-[400px]">
                <div class="flex gap-4 bg-base-300 p-3 rounded-lg">
                    <div class="avatar">
                        <div class="w-12 h-12 rounded-full">
                            <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Maria Cruz">
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <p class="text-sm font-semibold">Maria Cruz</p>
                        <p class="text-xs text-base-content/60">2 hours ago</p>
                        <p class="text-sm mt-1">
                            I think I saw a brown wallet near the jeepney stop by Rizal Ave earlier today.
                            Might be worth checking there.
                        </p>
                    </div>
                </div>

                <!-- Comment -->
                <div class="flex gap-4 bg-base-300 p-3 rounded-lg">
                    <div class="avatar">
                        <div class="w-12 h-12 rounded-full">
                            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Joshua Lim">
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <p class="text-sm font-semibold">Joshua Lim</p>
                        <p class="text-xs text-base-content/60">1 hour ago</p>
                        <p class="text-sm mt-1">
                            I found a wallet last night around 9 PM but not sure if this is the same one.
                            Does it have a UMak ID inside?
                        </p>
                    </div>
                </div>

                <!-- Comment -->
                <div class="flex gap-4 bg-base-300 p-3 rounded-lg">
                    <div class="avatar">
                        <div class="w-12 h-12 rounded-full">
                            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Alyssa Mae">
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <p class="text-sm font-semibold">Alyssa Mae</p>
                        <p class="text-xs text-base-content/60">45 minutes ago</p>
                        <p class="text-sm mt-1">
                            Try asking the security office near the mall. I lost my wallet before
                            and someone returned it there.
                        </p>
                    </div>
                </div>

                <!-- Comment -->
                <div class="flex gap-4 bg-base-300 p-3 rounded-lg">
                    <div class="avatar">
                        <div class="w-12 h-12 rounded-full">
                            <img src="https://randomuser.me/api/portraits/men/12.jpg" alt="Ken Ramirez">
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <p class="text-sm font-semibold">Ken Ramirez</p>
                        <p class="text-xs text-base-content/60">20 minutes ago</p>
                        <p class="text-sm mt-1">
                            Sharing this to our barangay group chat now. Hope you find it soon 🙏
                        </p>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            lostItem: {
                id: 1,
                img:
                    "https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/598274256_867114656251812_6662297040089705085_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEyYvcKYon9WtZ0BIpckYWRWpVuJk4OEElalW4mTg4QSR-UQEzlkmKnTtVf-o3OeuEjmg4G-Tunx0-P_CCrLLi8&_nc_ohc=AZcgVEQu9wIQ7kNvwFTfsgm&_nc_oc=AdmmlJo7RQxwckjwxXeKS95nR7Ttfuv7uUk6IydEIxMtmMu1EEGLxZEp2MQ232l9hhA&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=n0E2T-ez710J8-tiYNDw_g&oh=00_Afnbt2VNgygaVjggaA9ihMmlpqkmzKpBD8JpfREDPCxbIg&oe=694BCDC0",
                itemName: "Wallet",
                lastSeen: "BLDG. 48",
                status: "not found",
                user: {
                    profile: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
                    name: "Alexander Gabriel",
                },
            },
        };
    },
};
</script>
