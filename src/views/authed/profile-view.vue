<template>
    <div class="flex items-center justify-center">
        <div class="card card-border shadow-sm w-[700px]">
            <div class="card-body">
                <div class="card-title mb-4">
                    <button class="btn btn-primary"><ph-pencil-simple size="16"></ph-pencil-simple></button>
                    <button disabled class="btn btn-secondary"><ph-floppy-disk size="16"></ph-floppy-disk></button>
                </div>
                <div class="flex flex-row gap-4">

                    <div class="avatar">
                        <div class="w-24">
                            <img :src="defPfp" alt="" class="max-h-24">
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col gap-2">

                        <!-- <h1 class="font-semibold text-2xl">Jyn Christopher</h1> -->
                        <label for="" class="input w-full  outline-none shadow-inner input-primary">
                            <span class="font-bold">Name</span>
                            <input type="text" class="" disabled :value="'Jyn Christopher'">
                        </label>

                        <label for="" class="input w-full  outline-none shadow-inner input-primary">
                            <span class="font-bold">Email</span>
                            <input type="text" class="" disabled :value="'jhndoe.ustp@edu.ph'">
                        </label>

                        <label for="" class="input w-full  outline-none shadow-inner input-primary">
                            <span class="font-bold">Course</span>
                            <input type="text" class="" disabled :value="'BSCS'">
                        </label>

                        <label for="" class="input w-full  outline-none shadow-inner input-primary">
                            <span class="font-bold">Year</span>
                            <input type="text" class="" disabled :value="'1st Year'">
                        </label>
                    </div>

                </div>

            </div>
        </div>
    </div>

</template>

<script lang="ts">
import defPfp from '@/assets/def_pfp.jpg'
import { PhPencilSimple, PhFloppyDisk } from '@phosphor-icons/vue';
export default {
    components: {
        PhPencilSimple,
        PhFloppyDisk
    },
    data() {
        return {
            defPfp
        }
    },



}     
</script>