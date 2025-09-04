<script setup lang="ts">
import { Badge } from "@/components/ui/badge";

</script>

<template>
  <section class="container">
    <div class="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
      <div class="text-center space-y-8">
        <Badge variant="outline" class="text-sm py-2">
          <span class="mr-2 text-primary">
            <Badge>New</Badge>
          </span>
          <span>Challenge Platform is Live!</span>
        </Badge>

        <div class="max-w-screen-md mx-auto text-center text-5xl md:text-6xl font-bold">
          <h1>
            Enter the world of
            <span class="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              Black Hat Brew
            </span>
            Red Team Scenarios
          </h1>
        </div>

        <p class="max-w-screen-sm mx-auto text-xl text-muted-foreground">
          Black Hat Brew offers cutting-edge, scenario-based CTFs crafted to test your offensive security skills and real-world red team techniques. Perfect for security teams and product stress-testing.
        </p>

     
      </div>

      <div class="relative group mt-14">
        <div
          class="absolute -top-6 right-12 w-[90%] h-12 lg:h-[80%] bg-primary/50 blur-3xl rounded-full img-shadow-animation"
        ></div>

        <!-- Placeholder for image or demo preview -->
        <!-- Replace with actual image/video when available -->

        <div
          class="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"
        ></div>
      </div>
    </div>
  </section>
</template>
