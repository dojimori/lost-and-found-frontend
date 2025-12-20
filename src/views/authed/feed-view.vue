<template>
    <div class="my-4">
        <h2 class="font-bold text-lg">Lost Items</h2>
    </div>

    <div class="flex flex-row flex-wrap gap-8 items-center justify-center">

        <div v-for="item in lostItems"
            class="card bg-base-200 w-96 shadow-sm transition-all  hover:-translate-y-1 duration-500 hover:shadow-lg">
            <figure>
                <img :src="item.img" class="max-w-[440]" alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">
                    {{ item.itemName }}
                    <span class="badge badge-warning badge-sm">{{ item.status }}</span>
                </h2>
                <p>Last seen: {{ item.lastSeen }}</p>

                <div class="flex items-center gap-4">
                    <div class="avatar">
                        <div class="w-8 rounded-full">
                            <img :src="item.user.profile" />
                        </div>
                    </div>

                    <p class="text-[12px] font-bold">{{ item.user.name }}</p>
                </div>

                <div class="card-actions justify-end">
                    <button class="btn">Respond</button>

                    <!-- <div class="badge badge-outline">Fashion</div> -->
                    <!-- <div class="badge badge-outline">Products</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lostItems: [
                {
                    img: 'https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/598274256_867114656251812_6662297040089705085_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEyYvcKYon9WtZ0BIpckYWRWpVuJk4OEElalW4mTg4QSR-UQEzlkmKnTtVf-o3OeuEjmg4G-Tunx0-P_CCrLLi8&_nc_ohc=AZcgVEQu9wIQ7kNvwFTfsgm&_nc_oc=AdmmlJo7RQxwckjwxXeKS95nR7Ttfuv7uUk6IydEIxMtmMu1EEGLxZEp2MQ232l9hhA&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=n0E2T-ez710J8-tiYNDw_g&oh=00_Afnbt2VNgygaVjggaA9ihMmlpqkmzKpBD8JpfREDPCxbIg&oe=694BCDC0',
                    itemName: 'Wallet',
                    lastSeen: 'BLDG. 48',
                    status: 'not found',
                    user: {
                        profile: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
                        name: 'Alexander Gabriel'
                    }
                }
            ]
        }
    }
}

</script>