<script setup lang="ts">
 import Separator from "./ui/separator/Separator.vue";
</script>

<template>
  <footer
    id="footer"
    class="container py-24 pb-16 sm:py-32 sm:pb-24"
  >
    <div class="p-10 bg-muted/50 dark:bg-card border rounded-2xl">
      <div
        class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8"
      >
        <div class="col-span-full xl:col-span-2">
          <a
            href="#"
            class="flex font-bold items-center"
          >
              <img
                src="/logo.png"
                alt="Beach"
                class="h-14 w-auto rounded-md object-cover"
              />

            <h3 class="text-2xl">Black Hat Brew</h3>
          </a>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Contact</h3>
          <div>
            <a
              href=""
              class="opacity-60 hover:opacity-100"
            >
              Github
            </a>
          </div>

          <div>
            <a
              href="https://www.linkedin.com/company/blackhatbrew"
              class="opacity-60 hover:opacity-100"
            >
              LinkedIn
            </a>
          </div>

        
        </div>

        

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Help</h3>
          <div>
            <a
              href="#contact"
              class="opacity-60 hover:opacity-100"
            >
              Contact Us
            </a>
          </div>

          <div>
            <a
              href="#faq"
              class="opacity-60 hover:opacity-100"
            >
              FAQ
            </a>
          </div>

          <div>
            <a
              href="#projects"
              class="opacity-60 hover:opacity-100"
            >
              Projects
            </a>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Socials</h3>
          

          <div>
            <a
              href="https://discord.gg/mcpx2AanQp"
              class="opacity-60 hover:opacity-100"
            >
              Discord
            </a>
          </div>

         
        </div>
      </div>

      <Separator class="my-6" />
  
    </div>
  </footer>
</template>
