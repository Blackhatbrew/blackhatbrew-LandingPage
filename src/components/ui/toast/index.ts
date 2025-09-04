import { ref } from "vue";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

const toasts = ref<Toast[]>([]);

export function useToast() {
  function toast({
    title,
    description = "",
    type = "info",
    duration = 3000,
  }: Omit<Toast, "id">) {
    const id = Date.now();
    toasts.value.push({ id, title, description, type, duration });

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, duration);
  }

  return { toast, toasts };
}
