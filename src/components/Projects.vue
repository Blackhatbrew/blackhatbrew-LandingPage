<script setup lang="ts">
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// Enum for ProProject status 
enum ProProject {
  YES = 1,
  NO = 0,
}

// Type for project categories
type Category = "All" | "Ongoing" | "Completed" | "Internal";
const tabs: Category[] = ["All", "Ongoing", "Completed", "Internal"];

// Interface for project properties, aligned with Mongoose schema
interface ProjectProps {
  id: string;
  title: string;
  pro: ProProject;
  description: string;
  category: Category;
  details?: string;
  backgroundImage?: { public_id: string; url: string };
  logo?: { public_id: string; url: string };
  images?: { public_id: string; url: string }[];
  reviews?: { author: string; comment: string; rating: number }[];
  labLink?: string;
  githubLink?: string;
}

// Reactive state for projects, selected tab, modal, and carousel
const projects = ref<ProjectProps[]>([]);
const selectedTab = ref<Category>("All");
const showModal = ref(false);
const selectedProject = ref<ProjectProps | null>(null);
const currentImageIndex = ref(0);
const router = useRouter();

// Computed property to filter projects based on selected tab
const filteredProjects = computed(() =>
  selectedTab.value === "All"
    ? projects.value
    : projects.value.filter((proj) => proj.category === selectedTab.value)
);

// Function to fetch projects from the API
const fetchProjects = async () => {
  try {
    const response = await axios.get("https://v3-cn-backend.vercel.app/api/project/v1"); // Adjust URL as needed
    projects.value = response.data.projects.map((project: any) => ({
      ...project,
      id: project._id || project.id, // Use _id from MongoDB or fallback to id
      backgroundImage: project.backgroundImage?.url
        ? { public_id: project.backgroundImage.public_id, url: project.backgroundImage.url }
        : undefined,
      logo: project.logo?.url
        ? { public_id: project.logo.public_id, url: project.logo.url }
        : undefined,
      images: project.images?.map((img: any) => ({
        public_id: img.public_id,
        url: img.url,
      })),
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

// Fetch projects when component mounts
fetchProjects();

// Function to open modal with project details
const openModal = (project: ProjectProps) => {
  selectedProject.value = project;
  currentImageIndex.value = 0; // Reset carousel index
  showModal.value = true;
};

// Function to close modal
const closeModal = () => {
  showModal.value = false;
  selectedProject.value = null;
};

// Carousel navigation
const nextImage = () => {
  if (selectedProject.value?.images) {
    currentImageIndex.value = (currentImageIndex.value + 1) % selectedProject.value.images.length;
  }
};

const prevImage = () => {
  if (selectedProject.value?.images) {
    currentImageIndex.value =
      (currentImageIndex.value - 1 + selectedProject.value.images.length) % selectedProject.value.images.length;
  }
};

// Navigate to project detail page
const goToProjectDetail = (id: string) => {
  router.push(`/project/${id}`);
};
</script>

<template>
  <section id="projects" class="container py-24 sm:py-32 text-white">
    <h2 class="text-lg text-red-500 text-center mb-2 tracking-wider font-semibold">
      Projects
    </h2>

    <h2 class="text-3xl md:text-4xl text-center font-bold mb-4">
      What We’ve Built
    </h2>

    <h3 class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
      Dive into our red team operations, realistic CTF environments, and custom scenario-based simulations—crafted to challenge, train, and test.
    </h3>

    <!-- Tabs -->
    <div class="flex justify-center mb-8 flex-wrap gap-2">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="selectedTab = tab"
        :class="[
          'px-4 py-2 rounded-full font-medium',
          selectedTab === tab
            ? 'bg-primary text-white'
            : 'bg-muted text-muted-foreground hover:bg-primary/10',
        ]"
      >
        {{ tab }}
      </button>
    </div>

 <!-- Projects Flex Grid -->
<div
  class="flex flex-wrap justify-center gap-6 w-full lg:w-[80%] mx-auto"
>
  <div
    v-for="project in filteredProjects"
    :key="project.id"
    @click="openModal(project)"
    class="cursor-pointer w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"
  >
    <Card
      class="bg-muted/60 dark:bg-card text-white h-full relative border border-gray-700 rounded-xl shadow-xl hover:shadow-red-500/50 transition-shadow duration-300"
    >
      <CardHeader>
        <CardTitle class="text-xl font-bold">{{ project.title }}</CardTitle>
        <CardDescription class="text-gray-300">{{ project.description }}</CardDescription>
      </CardHeader>
      <Badge
        v-if="project.pro === ProProject.YES"
        variant="secondary"
        class="absolute -top-3 -right-3 bg-red-600 text-white"
      >PRO</Badge>
    </Card>
  </div>
</div>


    <!-- Modal -->
    <div
      v-if="showModal && selectedProject"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-gray-900 text-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] overflow-y-auto relative scrollbar-custom"
      >
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-300 hover:text-red-500 text-2xl z-10"
        >
          &times;
        </button>

        <!-- Background Image -->
        <div
          class="w-full h-48 bg-cover bg-center"
          :style="{ backgroundImage: `url(${selectedProject.backgroundImage?.url || '/default-bg.jpg'})` }"
        ></div>

        <!-- Logo -->
        <div class="relative flex justify-center -mt-16">
          <img
            :src="selectedProject.logo?.url || '/default-logo.jpg'"
            alt="Project Logo"
            class="w-32 h-32 rounded-full border-4 border-red-900 shadow-lg object-cover"
          />
        </div>

        <!-- Title -->
        <div class="text-center mt-4">
          <h2 class="text-3xl font-bold">{{ selectedProject.title }}</h2>
          <Badge
            v-if="selectedProject.pro === ProProject.YES"
            variant="secondary"
            class="mt-2 bg-red-600 text-white"
          >PRO</Badge>
        </div>

        <!-- Image Carousel -->
        <div
          v-if="selectedProject.images && selectedProject.images.length"
          class="mt-6 px-6"
        >
          <div class="relative w-full h-64">
            <img
              :key="currentImageIndex"
              :src="selectedProject.images[currentImageIndex].url"
              alt="Project Image"
              class="w-full h-full object-cover rounded-lg shadow-md transition-opacity duration-300 ease-in-out"
            />
            <button
              v-if="selectedProject.images.length > 1"
              @click="prevImage"
              type="button"
              class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-0"
            >
              &larr;
            </button>
            <button
              v-if="selectedProject.images.length > 1"
              @click="nextImage"
              type="button"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-0"
            >
              &rarr;
            </button>
          </div>
        </div>

        <!-- Description -->
        <div class="px-6 mt-6">
          <h3 class="text-xl font-semibold mb-2">Description</h3>
          <p class="text-gray-300 text-sm">{{ selectedProject.description }}</p>
        </div>

        <!-- Reviews Section -->
        <div
          v-if="selectedProject.reviews && selectedProject.reviews.length"
          class="px-6 mt-8 mb-8"
        >
          <h3 class="text-xl font-semibold mb-4">Reviews</h3>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="review in selectedProject.reviews"
              :key="review.author"
              class="p-5 rounded-xl bg-gray-800/40 border border-gray-700 hover:shadow-lg transition-all"
            >
              <div class="flex items-center justify-between mb-2">
                <p class="font-semibold text-sm text-white">{{ review.author }}</p>
                <p class="text-yellow-400 text-xs font-medium">⭐ {{ review.rating }}/5</p>
              </div>
              <p class="text-gray-300 text-sm leading-relaxed">
                {{ review.comment }}
              </p>
            </div>
          </div>
        </div>

        <!-- Take Me to Lab Button -->
        <div class="px-6 pb-6 text-center">
          <button
            @click="goToProjectDetail(selectedProject.id)"
            class="inline-block bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-colors duration-300"
          >
            Take Me to Lab
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Same styles as provided */
section {
  background-color: #1a1a1a;
}

button:hover {
  transform: translateY(-2px);
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(255, 0, 0, 0.2);
}

/* Modal styles */
.modal {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Custom scrollbar */
.scrollbar-custom::-webkit-scrollbar {
  width: 8px;
}

.scrollbar-custom::-webkit-scrollbar-track {
  background: #2d2d2d;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background: #ff0000;
  border-radius: 4px;
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background: #cc0000;
}
</style>
