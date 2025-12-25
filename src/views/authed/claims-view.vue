<template>
    <div class="flex flex-row gap-2 p-4 border-b border-gray-200">

        <div class="card card-border w-[300px] shadow-xs">
            <div class="card-body">
                <span class="badge  badge-soft badge-sm badge-warning">Total Claims</span>
                <h1 class="card-title">
                    12
                </h1>
            </div>
        </div>

        <div class="card card-border w-[300px] shadow-xs">
            <div class="card-body">
                <span class="badge badge-soft badge-sm badge-success">Accepted claims</span>
                <h1 class="card-title">
                    8
                </h1>
            </div>
        </div>
    </div>


    <div class="mb-2">
        <!-- <span class="text-xs text-gray-500">Here are people who claimed your posted items.</span> -->
        <h1 class="font-bold mt-4">Claims</h1>
    </div>
    <!-- <div class="divider"></div> -->
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100" v-motion-fade>
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Item</th>
                    <th>Image</th>
                    <th>Claimed date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>

                <tr>
                    <td>Najid Badji Ali</td>
                    <td>Wallet</td>
                    <td><img src="https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/598274256_867114656251812_6662297040089705085_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEyYvcKYon9WtZ0BIpckYWRWpVuJk4OEElalW4mTg4QSR-UQEzlkmKnTtVf-o3OeuEjmg4G-Tunx0-P_CCrLLi8&_nc_ohc=AZcgVEQu9wIQ7kNvwFTfsgm&_nc_oc=AdmmlJo7RQxwckjwxXeKS95nR7Ttfuv7uUk6IydEIxMtmMu1EEGLxZEp2MQ232l9hhA&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=n0E2T-ez710J8-tiYNDw_g&oh=00_Afnbt2VNgygaVjggaA9ihMmlpqkmzKpBD8JpfREDPCxbIg&oe=694BCDC0"
                            class="max-w-[50px] rounded-md object-cover" />
                    </td>
                    <td>6/26/2026</td>
                    <td>
                        <button class="btn btn-primary">Confirm</button>
                    </td>
                </tr>

                <tr>
                    <td>Najid Badji Ali</td>
                    <td>Wallet</td>
                    <td><img src="https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/598274256_867114656251812_6662297040089705085_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEyYvcKYon9WtZ0BIpckYWRWpVuJk4OEElalW4mTg4QSR-UQEzlkmKnTtVf-o3OeuEjmg4G-Tunx0-P_CCrLLi8&_nc_ohc=AZcgVEQu9wIQ7kNvwFTfsgm&_nc_oc=AdmmlJo7RQxwckjwxXeKS95nR7Ttfuv7uUk6IydEIxMtmMu1EEGLxZEp2MQ232l9hhA&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=n0E2T-ez710J8-tiYNDw_g&oh=00_Afnbt2VNgygaVjggaA9ihMmlpqkmzKpBD8JpfREDPCxbIg&oe=694BCDC0"
                            class="max-w-[50px] rounded-md object-cover" />
                    </td>
                    <td>6/26/2026</td>
                    <td>
                        <button class="btn btn-primary">Confirm</button>
                    </td>
                </tr>

                <tr>
                    <td>Najid Badji Ali</td>
                    <td>Wallet</td>
                    <td><img src="https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/598274256_867114656251812_6662297040089705085_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEyYvcKYon9WtZ0BIpckYWRWpVuJk4OEElalW4mTg4QSR-UQEzlkmKnTtVf-o3OeuEjmg4G-Tunx0-P_CCrLLi8&_nc_ohc=AZcgVEQu9wIQ7kNvwFTfsgm&_nc_oc=AdmmlJo7RQxwckjwxXeKS95nR7Ttfuv7uUk6IydEIxMtmMu1EEGLxZEp2MQ232l9hhA&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=n0E2T-ez710J8-tiYNDw_g&oh=00_Afnbt2VNgygaVjggaA9ihMmlpqkmzKpBD8JpfREDPCxbIg&oe=694BCDC0"
                            class="max-w-[50px] rounded-md object-cover" />
                    </td>
                    <td>6/26/2026</td>
                    <td>
                        <button class="btn btn-primary">Confirm</button>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>


</template>