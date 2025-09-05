<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What is Black Hat Brew?",
    answer:
      "Black Hat Brew is a cybersecurity platform that offers red-team focused, scenario-based Capture The Flag (CTF) challenges to help organizations test and improve their product security posture.",
    value: "item-1",
  },
  {
    question: "Who should use Black Hat Brew's CTFs?",
    answer:
      "Our CTFs are designed for security professionals, red teams, penetration testers, and developers who want to validate their systems against real-world attack simulations.",
    value: "item-2",
  },
  {
    question: "Are the CTFs customizable for our organization's products?",
    answer:
      "Yes, we provide tailored CTF scenarios that reflect your tech stack and potential threat vectors, enabling hands-on product security testing.",
    value: "item-3",
  },
  {
    question: "Do I need to be an expert to participate?",
    answer:
      "Not necessarily. We offer challenges for various skill levels, from beginner to advanced, including guided learning for teams looking to grow their red team capabilities.",
    value: "item-4",
  },
  {
    question: "Can we integrate these CTFs into internal training programs?",
    answer:
      "Absolutely. Our platform supports integration with your internal security training or onboarding workflows to enhance cyber readiness.",
    value: "item-5",
  },
];


</script>

<template>
  <section
    id="faq"
    class="container md:w-[700px] py-24 sm:py-32"
  >
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">FAQS</h2>

      <h2 class="text-3xl md:text-4xl text-center font-bold">
        Common Questions
      </h2>
    </div>

    <Accordion
      type="single"
      collapsible
      class="AccordionRoot"
    >
      <AccordionItem
        v-for="{ question, answer, value } in FAQList"
        :key="value"
        :value="value"
      >
        <AccordionTrigger class="text-left"> {{ question }} </AccordionTrigger>

        <AccordionContent>{{ answer }}</AccordionContent>
      </AccordionItem>
    </Accordion>

    <h3 class="font-medium mt-4">
      Still have questions?
      <a
        href="#contact"
        class="text-muted-foreground underline"
      >
      Contact us
      </a>
    </h3>
  </section>
</template>
