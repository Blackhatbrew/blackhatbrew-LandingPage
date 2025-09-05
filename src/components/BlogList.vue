<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-vue-next";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
image: {
  url: string;
  public_id: string;
},  author: string;
  date: string;
  tags: string[];
}

const router = useRouter();
const blogPosts = ref<BlogPost[]>([]);
const errorMessage = ref<string | null>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch("https://blackhatbrew-backend.vercel.app/api/blog/v1", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (response.ok) {
      blogPosts.value = result.blogs;
    } else {
      throw new Error(result.message || "Failed to fetch blogs");
    }
  } catch (error: unknown) {
    errorMessage.value =
      error instanceof Error ? error.message : "Unable to fetch blog posts.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="container lg:w-[75%] py-24 sm:py-32">
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary tracking-wider">Our Blog</h2>
      <h2 class="text-3xl md:text-4xl font-bold">All Blog Posts</h2>
    </div>

    <Alert v-if="errorMessage" variant="destructive" class="mb-8">
      <AlertCircle class="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{{ errorMessage }}</AlertDescription>
    </Alert>

    <div v-if="loading" class="text-center text-muted-foreground">
      Loading blog posts...
    </div>

    <div v-else-if="blogPosts.length === 0" class="text-center text-muted-foreground">
      No blog posts available.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card
        v-for="post in blogPosts"
        :key="post.slug"
        class="bg-muted/60 dark:bg-card flex flex-col group"
      >
        <CardHeader class="p-0">
          <img
            :src="post.image.url || '/default-blog.jpg'"
            class="w-full aspect-video object-cover saturate-0 group-hover:saturate-100 transition-all"
            alt="Blog post image"
          />
        </CardHeader>

        <CardContent class="p-6 space-y-2" @click="router.push(`/blogs/${post._id}`)">
          <CardTitle class="text-xl font-bold hover:text-primary transition cursor-pointer">
            {{ post.title }}
          </CardTitle>
          <p class="text-muted-foreground text-sm">{{ post.excerpt }}</p>
        </CardContent>

        <CardFooter class="flex justify-between items-center px-6 pb-4 mt-auto">
          <div class="text-sm text-muted-foreground">
            By {{ post.author? post.author:'Admin' }} — {{ new Date(post.date).toLocaleDateString() }}
          </div>
          <Button size="sm" variant="link" @click="router.push(`/blogs/${post._id}`)">
            Read More →
          </Button>
        </CardFooter>
      </Card>
    </div>
  </section>
</template>
