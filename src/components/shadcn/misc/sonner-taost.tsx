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
      icon: <Check className="text-success " />,
      action: {
        label: "dismiss",

        onClick: () => {},
      },
      position: "top-center",
      duration: 2000,

      ...options,
    });
  }
  if (type === "error") {
    return toast.error(title ?? "Something went wrong", {
      icon: <XCircle className="h-10 w-10 text-error " />,
      position: "top-center",
      duration: 20000,
      dismissible: false,
      action: {
        label: "dismiss",

        onClick: () => {},
      },
      ...options,
    });
  }
  if (type === "warning") {
    return toast.warning(title ?? "Something went wrong", {
      icon: <TriangleAlert className="h-10 w-10 text-warning " />,
      position: "top-center",
      important: true,
      duration: 10000,
      action: {
        label: "dismiss",

        onClick: () => {},
      },
      ...options,
    });
  }
  if (type === "info") {
    return toast.info(title ?? "Something went wrong", {
      position: "top-center",
      action: {
        label: "dismiss",

        onClick: () => {},
      },
      icon: <Info className="h-10 w-10 text-info " />,
      ...options,
    });
  }
}
