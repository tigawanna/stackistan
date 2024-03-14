import { oneClickOauthLogin } from "@/lib/pb/auth";
import { tryCatchWrapper } from "@/utils/helpers/async";
import {
  useLocation,
  useMutation,
  usePageContext,
  useQuery,
  useQueryClient,
} from "rakkasjs";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import { Loader } from "lucide-react";
import { navigate } from "rakkasjs";
import { Button } from "@/components/shadcn/ui/button";
import { toast } from "sonner";

interface OAuthprovidersProps {}

export function OAuthproviders({}: OAuthprovidersProps) {
  const qc = useQueryClient();
  const { locals } = usePageContext();
  const { current } = useLocation();

  const mutation = useMutation(
    ({ provider }: { provider: "github" | "google" | "oidc" }) => {
      return tryCatchWrapper(
        oneClickOauthLogin({
          pb: locals.pb,
          collection: "stackistan_users",
          oauth_config: {
            provider,
            scopes: ["openid", "profile", "email"],
          },
        }),
      );
    },
    {
      invalidateTags: ["viewer"],
      onSuccess(data) {
        console.log(" === data === ", data);
        if (data && data?.data) {
          toast.success("Welcome " + data?.data?.username);
          qc.invalidateQueries(["viewer"]);
          // window.location.reload();
          // const navigate_to = current.searchParams.get("return_to");
          const return_to = current.searchParams.get("return_to");
          navigate(return_to ?? "/");
        }
        if (data.error) {
          toast.error("Something went wrong: " + data?.error?.message);
        }
      },
    },
  );

  return (
    <div className="flex  w-full flex-col items-center justify-center gap-5">
      <h2>login with</h2>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <div className="flex w-full items-center justify-center gap-2 p-2">
          <Button
            variant={"outline"}
            onClick={() => mutation.mutate({ provider: "github" })}
            disabled={mutation.isLoading}
            className="btn btn-wide flex gap-4 rounded-md text-lg"
          >
            <FaGithub />
            Github
          </Button>
          <Button
            variant={"outline"}
            onClick={() => mutation.mutate({ provider: "google" })}
            disabled={mutation.isLoading}
            className="btn btn-wide flex gap-4 rounded-md text-lg"
          >
            <FaGoogle />
            Google
          </Button>
          {/* <Button
            variant={"outline"}
            onClick={() => mutation.mutate({ provider: "oidc" })}
            disabled={mutation.isLoading}
            className="btn btn-wide flex gap-4 rounded-md text-lg"
          >
            <FaLinkedin />
            Linkedin
          </Button> */}
        </div>
        {mutation.isLoading && <Loader className="animate-spin" />}
      </div>
    </div>
  );
}
