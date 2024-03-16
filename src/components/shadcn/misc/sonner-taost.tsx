import { Check, Info, TriangleAlert, XCircle } from "lucide-react";
import { toast, ToastT, ExternalToast } from "sonner";

interface SonnerToastProps {
  title?: string;
  type?: ToastT["type"];
  options?: ExternalToast;
}
export function sonnerToast({ title, type, options }: SonnerToastProps) {
  if (!type || type === "success") {
    return toast.success(title ?? "Success", {
      icon: <Check className="h-q0 w-q0 text-success " />,
      action: {
        label: "dismiss",
        onClick: () => {},
      },

      ...options,
    });
  }
  if (type === "error") {
    return toast.error(title ?? "Something went wrong", {
      icon: <XCircle className="h-10 w-10 text-error " />,

      important: true,
      duration: 5000,
      ...options,
    });
  }
  if (type === "warning") {
    return toast.warning(title ?? "Something went wrong", {
      icon: <TriangleAlert className="h-10 w-10 text-warning " />,

      important: true,
      duration: 4000,
      ...options,
    });
  }
  if (type === "info") {
    return toast.info(title ?? "Something went wrong", {
      icon: <Info className="h-10 w-10 text-info " />,...options,
    });
  }
}
