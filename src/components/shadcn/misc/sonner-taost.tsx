import { Check, Info, TriangleAlert, XCircle } from "lucide-react";
import { toast,ToastT,ExternalToast } from "sonner";



interface SonnerToastProps {
  title?:string;
  type?: ToastT["type"];
  options?:ExternalToast
}
export function sonnerToast({
  title,
  type,
  options,
}: SonnerToastProps) {
  if (!type || type === "success") {
    return toast.success(title ?? "Success", {
      icon: <Check className="h-5 w-5 text-success " />,
      closeButton: true,
      ...options,
    });
  }
  if (type === "error") {
    return toast.error(title ?? "Something went wrong", {
      icon: <XCircle className="h-5 w-5 text-error " />,
      closeButton: true,
      important: true,
      duration: 5000,
      ...options,
    });
  }
  if (type === "warning") {
    return toast.warning(title ?? "Something went wrong", {
      icon: <TriangleAlert className="h-5 w-5 text-warning " />,
      closeButton: true,
      important: true,
      duration: 4000,
      ...options,
    });
  }
  if (type === "info") {
    return toast.info(title??"Something went wrong", {
        icon:<Info className="h-5 w-5 text-info " />,

        closeButton: true,
        ...options
    });
  }

}
