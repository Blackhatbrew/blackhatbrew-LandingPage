<script setup>
const certificates = [
  { id: 1, title: "Practical Network Penetration Testing", image: "/certificates/PNPT.png" },
  { id: 2, title: "Tryhackme PT1", image: "/certificates/PT1.png" },
  { id: 3, title: "CRTO", image: "/certificates/CRTO.jpg" },
  { id: 4, title: "AI & ML", image: "/certificates/ai.png" },
  { id: 5, title: "Cloud Computing", image: "/certificates/cloud.png" },
];
</script>

<template>
  <section
    id="certificate"
    class="relative py-20 px-6 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden"
  >
    <!-- Subtle background gradient -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.05),transparent_70%)]"
    ></div>

    <!-- Title -->
    <div class="relative text-center mb-12">
      <h2
        class="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[hsl(var(--foreground))] to-[hsl(var(--muted-foreground))] bg-clip-text text-transparent"
      >
         Team Certificates
      </h2>
      <p class="text-[hsl(var(--muted-foreground))] mt-3 text-sm md:text-base">
        Recognizing excellence in cybersecurity, AI, and innovation.
      </p>
    </div>

    <!-- Horizontal scroll container -->
    <div class="relative overflow-x-auto scrollbar-hide">
      <div
        class="flex space-x-8 snap-x snap-mandatory scroll-smooth pb-6 px-2"
      >
        <div
          v-for="cert in certificates"
          :key="cert.id"
          class="relative min-w-[270px] md:min-w-[360px] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] 
                 border border-[hsl(var(--border))] rounded-2xl p-5 flex-shrink-0 
                 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 transform 
             "
        >
          <!-- Certificate Image -->
          <div class="relative flex justify-center items-center h-48 mb-4 overflow-hidden rounded-xl ">
            <img
              :src="cert.image"
              :alt="cert.title"
              class="max-w-full max-h-full object-contain transition-transform duration-500 "
            />
          </div>

          <!-- Title -->
          <h3 class="text-lg font-semibold text-center">
            {{ cert.title }}
          </h3>

          <!-- Accent underline -->
          <div
            class="mt-2 h-[2px] w-16 mx-auto rounded-full bg-[hsl(var(--primary))]"
          ></div>
        </div>
      </div>
    </div>

    <!-- Bottom subtle line -->
    <div
      class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--border))] to-transparent"
    ></div>
  </section>
</template>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
