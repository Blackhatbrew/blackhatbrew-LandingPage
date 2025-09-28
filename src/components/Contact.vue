<script setup lang="ts">
import { ref, reactive } from "vue";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Phone, Mail } from "lucide-vue-next";

interface ContactFormProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const contactForm = reactive<ContactFormProps>({
  firstName: "",
  lastName: "",
  email: "",
  message: "",
});

const loading = ref(false);
const errorMessage = ref<string | null>(null);

const validateForm = () => {
  const { firstName, lastName, email, message } = contactForm;
  if (!firstName || !lastName || !email  || !message) {
    errorMessage.value = "Please fill out all required fields.";
    return false;
  }
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorMessage.value = "Please enter a valid email address.";
    return false;
  }
  errorMessage.value = null;
  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  loading.value = true;
  errorMessage.value = null;

  try {
    const response = await fetch("https://blackhatbrew-backend.vercel.app/api/contact/v1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactForm),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Your message has been sent successfully!");
      contactForm.firstName = "";
      contactForm.lastName = "";
      contactForm.email = "";
      contactForm.message = "";
    } else {
      throw new Error(result.message || "Failed to send message.");
    }
  } catch (error: unknown) {
    errorMessage.value =
      error instanceof Error ? error.message : "Unable to send your message.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section id="contact" class="container py-24 sm:py-32">
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left Contact Info -->
      <div>
        <div class="mb-4">
          <h2 class="text-lg text-primary mb-2 tracking-wider">Contact</h2>
          <h2 class="text-3xl md:text-4xl font-bold">Connect With Us</h2>
        </div>
        <p class="mb-8 text-muted-foreground lg:w-5/6">
          Got questions about red teaming, CTF customization, or platform integration?
          Reach out and let’s talk security.
        </p>

        <div class="flex flex-col gap-4">
          <div>
            <div class="flex gap-2 mb-1">
              <Phone />
              <div class="font-bold">Call Us</div>
            </div>
            <div>+1 (618) 203-0104</div>
          </div>

          <div>
            <div class="flex gap-2 mb-1">
              <Mail />
              <div class="font-bold">Mail Us</div>
            </div>
            <div>contact@blackhatbrew.com</div>
          </div>
        </div>
      </div>

      <!-- Right Contact Form -->
      <Card class="bg-muted/60 dark:bg-card">
        <CardHeader class="text-primary text-2xl font-semibold">Send a Message</CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmit" class="grid gap-4">
            <div class="flex flex-col md:flex-row gap-8">
              <div class="flex flex-col w-full gap-1.5">
                <Label for="first-name">First Name</Label>
                <Input
                  id="first-name"
                  type="text"
                  placeholder="Jane"
                  v-model="contactForm.firstName"
                />
              </div>

              <div class="flex flex-col w-full gap-1.5">
                <Label for="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  type="text"
                  placeholder="Doe"
                  v-model="contactForm.lastName"
                />
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="info@blackhatbrew.com"
                v-model="contactForm.email"
              />
            </div>

         

            <div class="flex flex-col gap-1.5">
              <Label for="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us what you're looking for..."
                rows="5"
                v-model="contactForm.message"
              />
            </div>

            <Alert v-if="errorMessage" variant="destructive">
              <AlertCircle class="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{{ errorMessage }}</AlertDescription>
            </Alert>

            <Button class="mt-4" :disabled="loading">
              {{ loading ? "Sending..." : "Send Message" }}
            </Button>
          </form>
        </CardContent>
        <CardFooter />
      </Card>
    </section>
  </section>
</template>
 
