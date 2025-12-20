<template>
    <div class="flex items-center p-4 justify-center h-[80vH] " v-motion-fade>

        <form action="" class="flex flex-col w-100 bg-base-200  p-4 border border-gray-300">
            <h4 class="mb-4 font-bold">Login</h4>
            <label for="" class="floating-label">
                <span>Email</span>
                <input type="text" class="input w-full " placeholder="Email">
            </label>

            <label class="floating-label  mt-2">
                <span>Password</span>
                <input type="text" class="input w-full" placeholder="Password">
            </label>

            <button type="submit" class="btn mt-4">Login</button>

        </form>
    </div>
</template>

<script>
import { PhEnvelope } from '@phosphor-icons/vue';

export default {
    components: {
        PhEnvelope
    }
}

</script>