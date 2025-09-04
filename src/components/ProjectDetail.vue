<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

// Enum for ProProject status
enum ProProject {
  YES = 1,
  NO = 0,
}

// Interface for instruction properties
interface Instruction {
  platform: string; // e.g., 'cloudFormation', 'aws'
  content: string; // Instruction content in README.md style
  github?: string; // Optional github field from Mongoose schema
}

// Type for project categories
type Category = "All" | "Ongoing" | "Completed" | "Internal";

// Interface for project properties, aligned with Mongoose schema
interface ProjectProps {
  id: string;
  title: string;
  pro: ProProject;
  description: string;
  details?: string;
  category: Category;
  backgroundImage?: { public_id: string; url: string };
  logo?: { public_id: string; url: string };
  images?: { public_id: string; url: string }[];
  reviews?: { author: string; comment: string; rating: number }[];
  githubLink?: string;
  instructions: Instruction[];
  time?: string;
  date?: string;
}

// Get project ID from route
const route = useRoute();
const projectId = route.params.id as string;

// Reactive state for project, instructions, carousel, and loading
const project = ref<ProjectProps | null>(null);
const showInstructions = ref<string | null>(null);
const currentImageIndex = ref(0);
const errorMessage = ref<string | null>(null);
const isLoading = ref(true); // Loading state

// Fetch project by ID
const fetchProject = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`https://v3-cn-backend.vercel.app/api/project/v1/${projectId}`);
    if (response.data.success) {
      const apiProject = response.data.project;
      project.value = {
        ...apiProject,
        id: apiProject._id || apiProject.id, // Use _id from MongoDB
        backgroundImage: apiProject.backgroundImage?.url
          ? { public_id: apiProject.backgroundImage.public_id, url: apiProject.backgroundImage.url }
          : undefined,
        logo: apiProject.logo?.url
          ? { public_id: apiProject.logo.public_id, url: apiProject.logo.url }
          : undefined,
        images: apiProject.images?.map((img: any) => ({
          public_id: img.public_id,
          url: img.url,
        })),
      };
    } else {
      errorMessage.value = response.data.message || "Project not found";
    }
  } catch (error) {
    console.error("Error fetching project:", error);
    errorMessage.value = "Failed to load project. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

// Fetch project on mount
onMounted(() => {
  fetchProject();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Toggle instructions visibility
const toggleInstructions = (platform: string) => {
  showInstructions.value = showInstructions.value === platform ? null : platform;
};

// Carousel navigation
const nextImage = () => {
  if (project.value?.images) {
    currentImageIndex.value = (currentImageIndex.value + 1) % project.value.images.length;
  }
};

const prevImage = () => {
  if (project.value?.images) {
    currentImageIndex.value =
      (currentImageIndex.value - 1 + project.value.images.length) % project.value.images.length;
  }
};
 function openUrl(url?: string) {
  if (url) {
    // Ensure the URL has a protocol (http:// or https://)
    const formattedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    window.open(formattedUrl, '_blank', 'noopener,noreferrer');
  }
}

</script>

<template>
  <!-- Loading State -->
  <section
    v-if="isLoading"
    class="container py-24 sm:py-32 text-white bg-gray-900 min-h-screen flex flex-col justify-center items-center"
  >
    <div class="loader"></div>
    <h2 class="text-2xl font-semibold mt-6">Loading Project...</h2>
  </section>

  <!-- Project Details -->
  <section
    v-else-if="project"
    class="relative container py-24 sm:py-32 text-white bg-gray-900 min-h-screen"
  >
    <!-- Background Hero Image -->
    <div
      class="w-full h-80 bg-cover bg-center rounded-xl shadow-lg border border-red-200 p-20"
      :style="{ backgroundImage: `url(${project.backgroundImage?.url || '/default-bg.jpg'})` }"
    ></div>

    <!-- Project Logo -->
    <div class="relative flex justify-center -mt-16">
      <img
        :src="project.logo?.url || '/default-logo.jpg'"
        alt="Project Logo"
        class="w-36 h-36 rounded-full border-4 border-red-600 shadow-xl object-cover"
      />
    </div>

    <!-- Title -->
    <div class="text-center mt-6">
      <h2 class="text-4xl font-extrabold tracking-tight">{{ project.title }}</h2>
      <Badge
        v-if="project.pro === ProProject.YES"
        variant="secondary"
        class="mt-3 bg-red-600 text-white px-3 py-1 rounded-full"
      >
        PRO
      </Badge>
    </div>

    <!-- Modal Instructions -->
    <div
      v-if="showInstructions"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <div
        class="bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-3xl w-[90%] relative"
      >
        <!-- Close Button -->
        <button
          @click="showInstructions = null"
          class="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <!-- Modal Content -->
        <h3 class="text-2xl font-bold mb-4">
          {{ showInstructions }}
        </h3>
   <div
  class="text-gray-300 text-sm whitespace-pre-wrap bg-gray-800/40 p-4 rounded-lg overflow-y-auto max-h-[400px] scrollbar-custom"
  v-html="project.instructions.find(i => i.platform === showInstructions)?.content"
></div>


        <!-- GitHub CTA -->
        <div class="flex justify-end mt-6">
         <!-- GitHub CTA -->
<div class="flex justify-end mt-6">
  <button
    v-if="project.instructions.find(i => i.platform === showInstructions)?.github"
    @click="openUrl(project.instructions.find(i => i.platform === showInstructions)?.github)"
    class="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-500 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all"
  >
    <!-- GitHub Icon (SVG) -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.729.082-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.303-5.466-1.335-5.466-5.932 0-1.31.467-2.382 1.235-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3-.404c1.02.004 2.045.138 3 .404 2.288-1.552 3.294-1.23 3.294-1.23.654 1.652.243 2.873.12 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.803 5.625-5.475 5.921.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.796 24 17.303 24 12c0-6.627-5.373-12-12-12z"
        clip-rule="evenodd"
      />
    </svg>
    View on GitHub
  </button>
</div>

        </div>
      </div>
    </div>

    <!-- Project Description (Short) -->
    <div class="px-6 mt-10 max-w-3xl mx-auto text-center">
        <p class="text-gray-300 text-base leading-relaxed" v-html="project.description"></p>

    </div>

    <!-- Image Carousel -->
    <div
      v-if="project.images && project.images.length"
      class="mt-10 px-1 max-w-7xl mx-auto"
    >
      <div class="relative w-full h-72">
        <img
          :key="currentImageIndex"
          :src="project.images[currentImageIndex].url"
          alt="Project Image"
          class="w-full h-full object-cover rounded-lg shadow-md transition-opacity duration-300 ease-in-out"
        />
        <button
          v-if="project.images.length > 1"
          @click="prevImage"
          type="button"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-0"
        >
          &larr;
        </button>
        <button
          v-if="project.images.length > 1"
          @click="nextImage"
          type="button"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-0"
        >
          &rarr;
        </button>
      </div>
    </div>

    <!-- Project Description (Detailed) -->
    <div class="px-6 mt-10 max-w-3xl mx-auto text-center">
  <p class="text-gray-300 text-base leading-relaxed" v-html="project.details"></p>
    </div>

    <!-- Reviews Section -->
    <div
      v-if="project.reviews && project.reviews.length"
      class="px-6 mt-10 mb-10 max-w-3xl mx-auto"
    >
      <h3 class="text-2xl font-semibold mb-4 text-center">Reviews</h3>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="review in project.reviews"
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

    <!-- Tabs (Centered) -->
    <div class="flex justify-center gap-4 mt-10 flex-wrap">
      <button
        v-for="instruction in project.instructions"
        :key="instruction.platform"
        @click="toggleInstructions(instruction.platform)"
        :class="[
          instruction.platform === 'cloudFormation' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700',
          'text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all'
        ]"
      >
        {{ instruction.platform }}
      </button>
    </div>
  </section>

  <!-- Not Found or Error -->
  <section
    v-else
    class="container py-24 sm:py-32 text-white bg-gray-900 min-h-screen flex flex-col justify-center items-center"
  >
    <h2 class="text-3xl font-bold">Project Not Found</h2>
    <p class="text-gray-300 mt-4">
      {{ errorMessage || "The requested project could not be found." }}
    </p>
  </section>
</template>

<style scoped>
/* Custom styles for black and red theme */
section {
  background-color: #1a1a1a;
}

button:hover {
  transform: translateY(-2px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #2d2d2d;
}

::-webkit-scrollbar-thumb {
  background: #ff0000;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #cc0000;
}

/* Scrollbar for instructions modal */
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

/* Loading animation */
.loader {
  border: 8px solid #2d2d2d;
  border-top: 8px solid #ff0000;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
