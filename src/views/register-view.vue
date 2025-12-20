<template>
    <div class="flex items-center p-4 justify-center h-[80vH] " v-motion-fade>

        <form action="" class="flex flex-col gap-1 w-100 bg-gray-100 p-4 border border-gray-300">
            <h4 class="mb-4 font-bold">Register</h4>
            <label for="" class="floating-label">
                <span>Username</span>
                <input type="text" class="input w-full" placeholder="Username">
            </label>

            <label for="" class="floating-label">
                <span>Email</span>
                <input type="text" class="input w-full mt-2" placeholder="Email">
            </label>


            <label for="" class="floating-label">
                <span>Password</span>
                <input type="text" class="input w-full mt-2" placeholder="Password">

            </label>


            <button type="submit" class="btn mt-4">Register</button>

        </form>
    </div>
</template>