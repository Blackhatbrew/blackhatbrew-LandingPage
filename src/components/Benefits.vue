<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Sparkle,
  Tag,
  Paintbrush,
  Blocks,
  LineChart,
  Wallet,
} from "lucide-vue-next";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}
const benefitList: BenefitsProps[] = [
  {
    icon: "blocks",
    title: "Real-World Attack Simulations",
    description:
      "Simulate real-world threat scenarios in isolated environments to assess vulnerabilities, train teams, and improve product defenses.",
  },
  {
    icon: "lineChart",
    title: "Measure Product Resilience",
    description:
      "Use scenario-based CTFs to test and benchmark your cybersecurity tools against practical, evolving attack techniques.",
  },
  {
    icon: "wallet",
    title: "Save Security Spend",
    description:
      "Reduce risk and costs by identifying flaws early. Invest where it matters—before breaches happen.",
  },
  {
    icon: "sparkle",
    title: "Sharpen Red Team Skills",
    description:
      "Empower your red team with hands-on challenges that enhance offensive tactics, lateral movement, and post-exploitation techniques.",
  },
];


const iconMap: Record<
  string,
  | typeof Sparkle
  | typeof Tag
  | typeof Paintbrush
  | typeof Blocks
  | typeof LineChart
  | typeof Wallet
> = {
  sparkle: Sparkle,
  tag: Tag,
  paintbrush: Paintbrush,
  blocks: Blocks,
  lineChart: LineChart,
  wallet: Wallet,
};
</script>

<template>
  <section
    id="benefits"
    class="container py-24 sm:py-32"
  >
    <div class="grid lg:grid-cols-2 place-items-center lg:gap-24">
      <div>
        <h2 class="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Your Shortcut to Success
        </h2>
        <p class="text-xl text-muted-foreground mb-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non ducimus
          reprehenderit architecto rerum similique facere odit deleniti
          necessitatibus quo quae.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-4 w-full">
        <Card
          v-for="({ icon, title, description }, index) in benefitList"
          :key="title"
          class="bg-muted/50 dark:bg-card hover:bg-background dark:hover:bg-background transition-all delay-75 group/number"
        >
          <CardHeader>
            <div class="flex justify-between">
              <component
                class="size-8 mb-6 text-primary"
                :is="iconMap[icon]"
              />

              <span
                class="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30"
                >0{{ index + 1 }}</span
              >
            </div>

            <CardTitle>{{ title }}</CardTitle>
          </CardHeader>

          <CardContent class="text-muted-foreground">
            {{ description }}
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
