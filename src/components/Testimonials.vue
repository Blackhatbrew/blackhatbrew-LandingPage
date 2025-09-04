<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Star } from "lucide-vue-next";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

 const reviewList: ReviewProps[] = [
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Sana Ahmad",
    userName: "Red Team Lead, CyShield",
    comment:
      "Black Hat Brew helped us simulate real-world attacks to test our SOC’s readiness. Their CTF engine is elite.",
    rating: 5,
  },
  {
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Usman Raza",
    userName: "CTO, ThreatHive",
    comment:
      "We integrated their challenge platform in under a week. Our internal teams love the hands-on exploit scenarios.",
    rating: 5,
  },
  {
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    name: "Zara Qureshi",
    userName: "Security Consultant, NetFence",
    comment:
      "Their CTF workflows mirror real adversary behavior, which is rare. A solid pick for red team readiness testing.",
    rating: 4.9,
  },
  {
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    name: "Aliya Shah",
    userName: "Incident Response Analyst",
    comment:
      "From social engineering to privilege escalation—every scenario felt grounded in real-world tactics. Highly recommend.",
    rating: 5,
  },
  {
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    name: "Haroon Malik",
    userName: "DevSecOps Engineer, Pentagrid",
    comment:
      "Impressive UX. Easy to deploy, track performance, and tailor challenges to different skill levels.",
    rating: 4.8,
  },
];
</script>

 <template>
  <section id="testimonials" class="container py-24 sm:py-32">
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
        Testimonials
      </h2>
      <h2 class="text-3xl md:text-4xl text-center font-bold mb-4">
        Hear What Our Partners Say
      </h2>
    </div>

    <Carousel
      :opts="{ align: 'start' }"
      class="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
    >
      <CarouselContent>
        <CarouselItem
          v-for="review in reviewList"
          :key="review.name"
          class="md:basis-1/2 lg:basis-1/3"
        >
          <Card class="bg-muted/50 dark:bg-card h-full">
            <CardContent class="pt-6 pb-0">
              <div class="flex gap-1 pb-6">
                <Star
                  v-for="i in Math.floor(review.rating)"
                  :key="i"
                  class="size-4 fill-primary text-primary"
                />
              </div>
              “{{ review.comment }}”
            </CardContent>

            <CardHeader>
              <div class="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage :src="review.image" :alt="review.name" />
                  <AvatarFallback>{{ review.name.charAt(0) }}</AvatarFallback>
                </Avatar>
                <div class="flex flex-col">
                  <CardTitle class="text-lg">{{ review.name }}</CardTitle>
                  <CardDescription>{{ review.userName }}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </section>
</template>

