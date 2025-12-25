<template>

    <div class="card card-border">
        <div class="card-body">
            <div class="flex flex-row gap-4">

                <div class="avatar">
                    <div class="w-24">
                        <img :src="defPfp" alt="">
                    </div>
                </div>

                <!-- <h1 class="font-semibold text-2xl">Jyn Christopher</h1> -->
                <label for="" class="input">
                    <span class="font-bold">Name</span>
                    <input type="text" class=" outline-none shadow-inner input-primary" disabled
                        :value="'Jyn Christopher'">
                </label>
            </div>

        </div>
    </div>

</template>

<script lang="ts">
import defPfp from '@/assets/def_pfp.jpg'

export default {
    data() {
        return {
            defPfp
        }
    },



}     
</script>