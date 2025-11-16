<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Paintbrush,
  MessageCircle,
  TabletSmartphone,
  BadgeCheck,
  Goal,
  PictureInPicture,
  MousePointerClick,
  Newspaper,
} from "lucide-vue-next";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

 const featureList: FeaturesProps[] = [
  {
    icon: "terminal",
    title: "Red Team CTF Labs",
    description:
      "Access your red team training environment anywhere—designed for desktop and mobile devices without compromising performance.",
  },
  {
    icon: "badgeCheck",
    title: "Realistic Scenarios",
    description:
      "Each CTF mimics real-world infrastructure and attack chains, from initial access to lateral movement and data exfiltration.",
  },
  {
    icon: "goal",
    title: "Skill-Based Objectives",
    description:
      "Every challenge is mapped to red team techniques (MITRE ATT&CK) to help you sharpen specific offensive skills.",
  },
  {
    icon: "pictureInPicture",
    title: "Interactive Environments",
    description:
      "Hands-on, immersive labs that simulate live environments—giving you space to test, break, and learn.",
  },
  {
    icon: "mousePointerClick",
    title: "Instant Deployment",
    description:
      "Spin up scenarios with one click—no need for manual VM setup or infrastructure configuration.",
  },
  {
    icon: "newspaper",
    title: "Detailed Reporting",
    description:
      "Generate exportable reports and insights on CTF performance, tactics used, and vulnerabilities identified.",
  },
];

const iconMap: Record<
  string,
  | typeof TabletSmartphone
  | typeof BadgeCheck
  | typeof Goal
  | typeof PictureInPicture
  | typeof Paintbrush
  | typeof MousePointerClick
  | typeof MessageCircle
  | typeof Newspaper
> = {
  tabletSmartphone: TabletSmartphone,
  badgeCheck: BadgeCheck,
  goal: Goal,
  pictureInPicture: PictureInPicture,
  paintbrush: Paintbrush,
  mousePointerClick: MousePointerClick,
  messageCircle: MessageCircle,
  newspaper: Newspaper,
};
</script>

<template>
  <section
    id="features"
    class="container py-24 sm:py-32"
  >
    <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
      Features
    </h2>

 <h2 class="text-3xl md:text-4xl text-center font-bold mb-4">
  What Sets Black Hat Brew Apart?
</h2>

<h3 class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
  Built for red teamers, security researchers, and blue teams wanting to stay a step ahead. From real-world simulations to on-demand deployment—our features deliver what others can’t.
</h3>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="{ icon, title, description } in featureList"
        :key="title"
      >
        <Card class="h-full bg-background border-0 shadow-none">
          <CardHeader class="flex justify-center items-center">
            <div
              class="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4"
            >
              <component
                :is="iconMap[icon]"
                class="size-6 text-primary"
              />
            </div>

            <CardTitle>
              {{ title }}
            </CardTitle>
          </CardHeader>

          <CardContent class="text-muted-foreground text-center">
            {{ description }}
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped></style>
