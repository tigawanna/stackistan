import { OAuthproviders } from "./OAuthProviders";
import { Button } from "@/components/shadcn/ui/button";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { useFormHook } from "@/components/form/useForm";
import { useState } from "react";
import { Loader, Unlock } from "lucide-react";

import {
  Link,
  navigate,
  useLocation,
  useMutation,
  usePageContext,
  useQueryClient,
} from "rakkasjs";
import { emailPasswordLogin, resetPassword } from "@/lib/pb/auth";
import { toast } from "sonner";

interface SignInFormProps {}

export function SignInForm({}: SignInFormProps) {
  const page_ctx = usePageContext();
  const [show, setShow] = useState(false);
  const { current } = useLocation();
  const qc = useQueryClient();

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<{ usernameOrEmail: string; password: string }>({
      initialValues: {
        password: "",
        usernameOrEmail: "",
      },
    });

  const email_login_mutation = useMutation(
    (vars: { usernameOrEmail: string; password: string }) => {
      return emailPasswordLogin({
        pb: page_ctx.locals.pb,
        collection: "stackistan_users",
        identity: vars.usernameOrEmail,
        password: vars.password,
      });
    },
    {
      invalidateTags: ["viewer"],
      onError(error: any) {
        toast.error("Something went wrong", {
          description: error?.message,
        });
      },
      onSuccess(data) {
        if (data && data?.data) {
          qc.invalidateQueries(["viewer"]);
          const return_to = current.searchParams.get("return_to");
          navigate(return_to ?? "/");
          toast.success(`Welcome`, {
            description: `${data?.data?.record?.username}`,
          });
        }
        if (data && data?.error) {
          toast.error("Something went wrong", {
            description: data?.error?.message,
          });
        }
      },
    },
  );

  const pw_reset_request_mutation = useMutation(
    (vars: { email: string }) => {
      return resetPassword({
        pb: page_ctx.locals.pb,
        email: vars.email,
        collection: "stackistan_users",
      });
    },
    {
      invalidateTags: ["viewer"],
      onError(error: any) {
        toast.error("Something went wrong", {
          description: error?.message,
        });
      },
      onSuccess(data) {
        if (data && data?.data) {
          toast.success(`Success`, {
            description: `Password reset request sent, check your email`,
          });
        }
        if (data && data?.error) {
          toast.error("Something went wrong", {
            description: data?.error?.message,
          });
        }
      },
    },
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    email_login_mutation.mutate(input);
  }
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center p-5 gap-5">
      <div className="w-full h-full md:w-[60%] lg:w-[40%] flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Sign In</h1>

        <form
          className="w-full h-full  flex flex-col items-center justify-center gap-4"
          // method="POST"
          onSubmit={handleSubmit}
        >
          <TheTextInput
            field_key={"usernameOrEmail"}
            field_name="usernameOrEmail"
            onChange={handleChange}
            required
            val={input.usernameOrEmail}
          />

          <TheTextInput
            field_key={"password"}
            field_name="password"
            type={show ? "text" : "password"}
            required
            min={8}
            onChange={handleChange}
            val={input.password}
          />
          <TheTextInput
            field_key={"show"}
            field_name={"show password"}
            onChange={(e) => setShow(e.target.checked)}
            type="checkbox"
            className="border border-secondary checkbox h-5 w-5 bg-secondary/30"
            container_classname="border-none  flex flex-row justify-center items-center gap-3"
            label_classname="min-w-fit "
          />
          <Button
            type="submit"
            disabled={email_login_mutation.isLoading}
            className="btn btn-sm btn-outline min-w-[50%]"
            variant={"ghost"}
            size={"sm"}
          >
            {" "}
            Sign in{" "}
            {email_login_mutation.isLoading && (
              <Loader className="animate-spin" />
            )}
          </Button>
        </form>

        <div className="w-full flex items-center justify-center">
          <span className="w-full border-t" />
          <span className="bg-background px-2 text-muted-foreground min-w-fit">
            Or continue with
          </span>
          <span className="w-full border-t" />
        </div>

        <OAuthproviders />
      </div>

      <div className="flex flex-col gap-2">
        <p className=" ">
          New here ? Create an account ?{" "}
          <Link href="/auth/signup" className="text-accent">
            Sign up
          </Link>
        </p>
        <button
          className="btn btn-outline btn-sm flex text-xs gap-2 h-2 "
          disabled={pw_reset_request_mutation.isLoading}
          onClick={() =>
            pw_reset_request_mutation.mutate({
              email: input.usernameOrEmail,
            })
          }
        >
          <h3>Forgot password</h3>
          <Unlock className="h-4 w-4 text-red-600" />
          {pw_reset_request_mutation.isLoading && (
            <Loader className="animate-spin" />
          )}
        </button>
      </div>
    </div>
  );
}
