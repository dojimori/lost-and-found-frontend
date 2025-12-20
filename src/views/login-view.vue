<template>
    <div class="flex items-center p-4 justify-center h-[80vH] " v-motion-fade>
        <form action="" class="flex flex-col w-100">
            <input type="text" class="input w-full" placeholder="Email">
            <input type="text" class="input w-full mt-2" placeholder="Password">

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