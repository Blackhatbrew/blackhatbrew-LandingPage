<script setup lang="ts">
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

interface BlogPost {
  id: number;
  _id: number;
  title: string;
  excerpt: string;
image: {
  url: string;
  public_id: string;
},
  author: string;
  date: string;
  url: string;
}

 
 const blogPosts = ref<BlogPost[]>([]);
const errorMessage = ref<string | null>(null);
const loading = ref(true);


onMounted(async () => {
  try {
    const response = await fetch("https://v3-cn-backend.vercel.app/api/blog/v1", {
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

const router = useRouter();

</script>

<template>
  <section id="blog" class="container lg:w-[75%] py-24 sm:py-32">
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary tracking-wider">Blog</h2>
      <h2 class="text-3xl md:text-4xl font-bold">From Our Knowledge Center</h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card
        v-for="post in blogPosts"
        :key="post.id"
        class="bg-muted/60 dark:bg-card flex flex-col overflow-hidden group"
      >
        <CardHeader class="p-0">
          <img
            :src="post.image.url"
            alt="Blog Cover"
            class="w-full aspect-video object-cover saturate-0 group-hover:saturate-100 group-hover:scale-[1.01] transition-all duration-200"
          />
        </CardHeader>

        <CardContent class="p-6 space-y-2" @click="router.push(`/blogs/${post._id}`)">
          <CardTitle class="text-xl font-bold hover:text-primary transition cursor-pointer">
            <a :href="post.url">{{ post.title }}</a>
          </CardTitle>
          <p class="text-muted-foreground text-sm">{{ post.excerpt }}</p>
        </CardContent>

        <CardFooter class="flex justify-between items-center px-6 pb-4 mt-auto">
          <div class="text-sm text-muted-foreground">
            By {{ post.author }} — {{ post.date }}
          </div>
          <Button size="sm" variant="link" @click="router.push(`/blogs/${post._id}`)">
            Read More →
          </Button>
        </CardFooter>
      </Card>
    </div>

    <!-- More Button -->
    <div class="text-center mt-12">
      <Button
        size="lg"
        variant="default"
        class="bg-primary text-primary-foreground hover:opacity-90 transition-all"
        as="a"
  @click="router.push(`/blogs`)"
        >
        More from our Blog →
      </Button>
    </div>
  </section>
</template>
