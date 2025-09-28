<script setup>
const certificates = [
  { id: 1, title: "Web Development", image: "/Public/PNPT.png" },
  { id: 2, title: "JavaScript Mastery", image: "/Public/PT1.png" },
  { id: 3, title: "Cybersecurity", image: "/certificates/cyber.png" },
  { id: 4, title: "AI & ML", image: "/certificates/ai.png" },
  { id: 5, title: "Cloud Computing", image: "/certificates/cloud.png" },
]
</script>

<template>
  <section class="bg-gray-950 text-white py-10 px-6">
    <h2 class="text-2xl md:text-3xl font-bold mb-6 text-center">
      📜 Team Certificates
    </h2>

    <!-- Scrollable container -->
    <div class="overflow-x-auto scrollbar-hide">
      <div
        class="flex space-x-6 snap-x snap-mandatory scroll-smooth"
      >
        <div
          v-for="cert in certificates"
          :key="cert.id"
          class="min-w-[250px] md:min-w-[320px] bg-gray-900 rounded-2xl p-4 flex-shrink-0 
                 shadow-lg transform hover:scale-105 transition duration-300 snap-center"
        >
          <img
            :src="cert.image"
            :alt="cert.title"
            class="rounded-lg w-full h-40 object-cover"
          />
          <h3 class="mt-4 text-lg font-semibold text-center">
            {{ cert.title }}
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* Hide scrollbar but keep scroll functionality */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
