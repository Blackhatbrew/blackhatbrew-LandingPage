<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast/index"; // assume you have a toast system
import { Loader2 } from "lucide-vue-next"; // optional spinner icon
const { toast } = useToast();

interface BlogPost {
  title: string;
  content: string;
  blog: string;
  author: string;
  date: string;
  image: {
    url: string;
    public_id?: string;
  };
  tags: string[];
}

const route = useRoute();
const blog = ref<BlogPost | null>(null);
const loading = ref(true);
const notFound = ref(false);

onMounted(async () => {
  try {
    const id = route.params.slug;
     if (!id) throw new Error("Blog ID not found in route.");

    const response = await fetch(`https://blackhatbrew-backend.vercel.app/api/blog/v1/${id}`);
    const result = await response.json();

    if (result.success) {
      blog.value = result.blog;
    } else {
      notFound.value = true;
      toast({ title: "Blog not found", description: result.message || "No blog found with this ID", type: "success" });
    }
  } catch (error: any) {
    notFound.value = true;
    toast({
      title: "Error fetching blog",
      description: error.message || "An unexpected error occurred.",
      type: "error",
    });
  } finally {
    loading.value = false;
  }
});
</script>


 <template>
  <!-- Loader -->
  <section v-if="loading" class="text-center py-32 flex justify-center items-center">
    <Loader2 class="animate-spin w-10 h-10 text-primary" />
  </section>

  <!-- Blog Content -->
  <section v-else-if="blog" class="container lg:w-[70%] py-24 sm:py-32 space-y-6">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-2">{{ blog.title }}</h1>
      <p class="text-muted-foreground text-sm">
        By {{ blog.author ?blog.author :'Admin'}} — {{ blog.date }}
      </p>
    </div>

    <img
      :src="blog.image.url"
      class="rounded-xl w-full max-h-[400px] object-cover"
      alt="Blog banner"
    />

 <div
  class="prose dark:prose-invert max-w-none text-justify text-base sm:text-lg leading-relaxed"
>
  <div
    v-html="blog.blog"
    class="blog-html"
  ></div>
</div>



<h4 class="mb-3 mt-6 text-2xl font-bold text-white">Tags:</h4>
    <div class="flex flex-wrap gap-2 mt-6">
      <Badge
        v-for="tag in blog.tags"
        :key="tag"
        class="bg-primary text-lg"
      >
        {{ tag }}
      </Badge>
    </div>
  </section>

  <!-- Not Found -->
  <section v-else class="text-center py-32">
    <p class="text-lg text-destructive">Blog not found.</p>
  </section>
</template>
