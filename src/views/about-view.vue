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
                <h1 class="text-5xl font-bold w-full">About</h1>
                <p class="px-4 md:px-0 py-6 text-start">
                    This project was built around a simple idea: lost doesn’t mean gone. It’s a place where seekers and
                    finders can meet with intention, without noise or pressure. By focusing on clarity, trust, and
                    community, the platform helps lost items find their way back to the people they belong to. Whether
                    you’re searching for something meaningful or helping someone else, every post moves something closer
                    to home.
                </p>
                <!-- <button class="btn btn-primary animate-bounce ">Get Started</button> -->
            </div>
        </div>
    </div>

</template>