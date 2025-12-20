<template>

    <div class="flex flex-row justify-between gap-8">
        <div>
            <img :src="lostItem.img" alt="" class="w-[300px] rounded-md">
            <span>{{ lostItem.itemName }}</span>

            <div class="flex items-center gap-4">
                <div class="avatar">
                    <div class="w-8 rounded-full">
                        <img :src="lostItem.user.profile" />
                    </div>
                </div>

                <p class="text-[12px] font-bold">{{ lostItem.user.name }}</p>
            </div>
        </div>

        <div class="flex-1 bg-base-200 p-2 rounded-md">
            <div class="flex gap-2">
                <input type="text" class="input w-full " placeholder="Comment...">
                <button class="btn">Post</button>
            </div>


            <div class="divider"></div>


            <!-- comments -->
            <div>
                <div class="flex flex-row gap-4">
                    <div class="avatar">
                        <div class="w-10 rounded-full">
                            <img src="https://i.pinimg.com/736x/a8/47/9a/a8479a922b151b03df56a6db105dc5dd.jpg"
                                class="object-cover" alt="">
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-[12px] font-bold">{{ lostItem.user.name }}</p>
                        <span class="text-sm">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum sint modi minus aliquid
                            accusamus facere amet ipsam, ea tempora, possimus sit esse doloremque alias facilis, aperiam
                            ad voluptatem laborum eius.
                        </span>
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
