<template>
    <div class="hero bg-base-200 min-h-[86vh]">
        <div class="hero-content text-center">
            <div class="max-w-md" v-motion :initial="{
                y: 100,
                opacity: 0,
            }" :enter="{
                y: 0,
                opacity: 1,
                transition: {
                    duration: 700,
                    type: 'tween',
                    ease: 'easeInOut',
                }
            }">
                <h1 class="text-5xl font-bold w-full">Developer</h1>
                <p class="px-4 md:px-0 py-6 text-start">
                    Connect with me!
                </p>
                <div class="flex gap-2">
                    <div
                        class="cursor-pointer hover:-translate-y-1 hover:scale-105 duration-200  bg-white/90 hover:bg-white rounded-md p-2 w-fit">
                        <img class="w-7"
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" />
                        <!-- <button class="btn btn-primary animate-bounce ">Get Started</button> -->
                    </div>

                    <div
                        class="cursor-pointer hover:-translate-y-1 hover:scale-105 duration-200  bg-white/90 hover:bg-white rounded-md p-2 w-fit">
                        <img class="w-7"
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" />
                        <!-- <button class="btn btn-primary animate-bounce ">Get Started</button> -->
                    </div>
                </div>



            </div>
        </div>
    </div>

</template>