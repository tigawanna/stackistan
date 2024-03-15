import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader, VerifiedIcon } from "lucide-react";
import { usePageContext } from "rakkasjs";
import { toast } from "sonner";

interface VeriifyEmailModalProps {
  email: string;
}

export function VerifyEmailModal({ email }: VeriifyEmailModalProps) {
  const qc = useQueryClient();
  const { locals } = usePageContext();

  const request_verfication_mutation = useMutation({
    mutationFn: () => {
      return pbTryCatchWrapper(
        locals.pb.collection("sherpa_user").requestVerification(email),
      );
    },
    onSuccess(data, variables, context) {
      // console.log("data === ",data)
      if (data.data) {
        qc.invalidateQueries({ queryKey: ["sherpa_user"] });
        locals.pb.collection("sherpa_user").authRefresh();
        toast.success("Success", { description: "Verification email sent" });
      }
      if (data.error) {
        toast.error("Something went wrong", {
          description: data.error.message,
          duration: 10000,
        });
      }
    },
    onError(error, variables, context) {
      toast.error("Something went wrong", {
        description: error.message,
        duration: 10000,
      });
    },
  });
  // const confirm_verfication_mutation = useMutation({
  //     mutationFn:(vars:{token:string})=>{
  //         return tryCatchWrapper(locals.pb.collection('sherpa_user').confirmVerification(vars.token))
  //     },
  //     onSuccess(data, variables, context) {
  //     if(data.data){
  //      qc.invalidateQueries({ queryKey: ["sherpa_user"] });
  //      toast("Successfully verified ", {type: "success"});
  //     setOpen(false);
  //     }
  //     if(data.error){
  //     toast(data.error.message, {type: "error",autoClose: false});
  //     }
  //     },
  //     onError(error, variables, context) {
  //     toast(error.message, { type: "error", autoClose: false });
  //     },
  // })

  return (
    <button
      className="btn btn-outline btn-sm flex text-xs gap-2 h-2 "
      onClick={() => request_verfication_mutation.mutate()}
    >
      <h3>verify email</h3>
      <VerifiedIcon className="h-4 w-4 text-red-600" />
      {request_verfication_mutation.isPending && (
        <Loader className="animate-spin" />
      )}
    </button>
  );
}
