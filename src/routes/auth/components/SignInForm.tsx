import { OAuthproviders } from "./OAuthProviders";
import { Button } from "@/components/shadcn/ui/button";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { useFormHook } from "@/components/form/useForm";
import { useState } from "react";
import { Loader, Unlock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { emailPasswordLogin, resetPassword } from "@/lib/pb/auth";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { Label } from "@/components/shadcn/ui/label";
import { usePageContext, navigate, Link } from "rakkasjs";
import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { TSigninformSchema, signinformSchema } from "./schema.auth";

interface SignInFormProps {
  current: URL;
}

export function SignInForm({ current }: SignInFormProps) {
  const page_ctx = usePageContext();
  const [show, setShow] = useState(false);

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<TSigninformSchema>({
      initialValues: {
        password: "",
        usernameOrEmail: "",
      },
    });

  const email_login_mutation = useMutation({
    mutationFn: (vars: { usernameOrEmail: string; password: string }) => {
      return emailPasswordLogin({
        pb: page_ctx.locals.pb,
        collection: "stackistan_users",
        identity: vars.usernameOrEmail,
        password: vars.password,
      });
    },
    meta: {
      invalidates: ["viewer"],
    },
    onSuccess(data) {
      if (data && data?.data) {
        // qc.invalidateQueries({ queryKey: ["viewer"] });
        const return_to = current.searchParams.get("return_to");
        navigate(return_to ?? "/");
        sonnerToast({
          title: "welcome",
          options: {
            description: `${data?.data?.record?.username}`,
          },
        });
      }
      if (data && data?.error) {
        console.log(" === data === ", data.error.message);
        sonnerToast({
          type: "error",
          options: {
            description: `${data?.error?.message}`,
          },
        });
      }
    },
    onError(error: any) {
      sonnerToast({
        type: "error",
        options: {
          description: error?.message,
        },
      });
    },
  });

  const pw_reset_request_mutation = useMutation({
    mutationFn: (vars: { email: string }) => {
      return resetPassword({
        pb: page_ctx.locals.pb,
        email: vars.email,
        collection: "stackistan_users",
      });
    },
    meta: {
      invalidates: ["viewer"],
    },
    onError(error: any) {
      sonnerToast({
        type: "error",
        options: {
          description: error?.message,
        },
      });
    },
    onSuccess(data) {
      if (data && data?.data) {
        sonnerToast({
          title: "success",
          options: {
            description: `Password reset request sent, check your email`,
          },
        });
      }
      if (data && data?.error) {
        sonnerToast({
          type: "error",
          options: {
            description: data?.error?.message,
          },
        });
      }
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    email_login_mutation.mutate(signinformSchema.parse(input));
  }

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center p-5 gap-5">
      <div className="w-full h-full md:w-[60%] lg:w-[40%] flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Sign In</h1>

        <form
          className="w-full h-full  flex flex-col items-center justify-center gap-4"
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
          <div className="flex gap-2 items-center justify-center">
            <Label htmlFor="show-password">show password</Label>
            <Checkbox
              id="show-password"
              name="show-password"
              className="h-5 w-5"
              checked={show}
              onCheckedChange={(e) => {
                e.valueOf() ? setShow(true) : setShow(false);
              }}
            />
          </div>
          <Button
            type="submit"
            disabled={email_login_mutation.isPending}
            className="btn btn-wide min-w-[50%]"
            size={"sm"}
          >
            {" "}
            Sign in{" "}
            {email_login_mutation.isPending && (
              <Loader className="animate-spin" />
            )}
          </Button>
        </form>

        <div className="w-full flex items-center justify-center">
          <span className="w-full border-t" />
          <span className="px-2 text-muted-foreground min-w-fit">
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
          disabled={pw_reset_request_mutation.isPending}
          onClick={() =>
            pw_reset_request_mutation.mutate({
              email: input.usernameOrEmail,
            })
          }
        >
          <h3>Forgot password</h3>
          <Unlock className="h-4 w-4 text-red-600" />
          {pw_reset_request_mutation.isPending && (
            <Loader className="animate-spin" />
          )}
        </button>
      </div>
    </div>
  );
}
