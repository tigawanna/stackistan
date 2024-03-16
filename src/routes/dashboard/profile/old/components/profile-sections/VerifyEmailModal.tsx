import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader, VerifiedIcon } from "lucide-react";
import { usePageContext } from "rakkasjs";

interface VeriifyEmailModalProps {
  email: string;
}

export function VerifyEmailModal({ email }: VeriifyEmailModalProps) {
  const qc = useQueryClient();
  const {
    locals: { pb },
  } = usePageContext();
  const request_verfication_mutation = useMutation({
    mutationFn: () => {
      return pbTryCatchWrapper(
        pb.collection("sherpa_user").requestVerification(email),
      );
    },
    onSuccess(data, variables, context) {
      // console.log("data === ",data)
      if (data.data) {
        qc.invalidateQueries({ queryKey: ["sherpa_user"] });
        pb.collection("sherpa_user").authRefresh();
        sonnerToast({
          options: {
            description: "Verification email sent",
          },
        });
      }
      if (data.error) {
        sonnerToast({
          type: "error",
          options: {
            description: data.error.message,
          },
        });
      }
    },
    onError(error, variables, context) {
      sonnerToast({
        type: "error",
        options: {
          description: error.message,
        },
      });
    },
  });
  // const confirm_verfication_mutation = useMutation({
  //     mutationFn:(vars:{token:string})=>{
  //         return tryCatchWrapper(pb.collection('sherpa_user').confirmVerification(vars.token))
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
