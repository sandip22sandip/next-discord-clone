"use client";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthSocialButton from "../components/AuthSocialButton";
import { Loader2 } from "lucide-react";

type Variant = "LOGIN" | "REGISTER";

const LoginPage = () => {
  const session = useSession();
  const router = useRouter();

  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/main");
    }
  }, [session, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/main");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            return toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/main");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/main`,
    });
  };

  // Use the useEffect hook to listen for changes in the session status
  useEffect(() => {
    if (session?.status === "authenticated") {
      setIsLoading(false);
    }
  }, [session]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1E1F22] text-white">
      {isLoading ? (
        <div className="flex flex-col flex-1 justify-center items-center">
          <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Please Wait...
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-center py-8">
            <Image
              src="/logoipsum.svg"
              width={200}
              height={40}
              alt="Company Logo"
            />
          </div>

          <div className="px-10 py-6">
            <h5 className="text-3xl font-semibold mb-4 text-center text-white">
              {variant === "LOGIN" ? (
                <span className="block">You're Back! Ready to Learn?</span>
              ) : (
                <span className="block">Start Your Learning Journey!</span>
              )}
            </h5>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {variant === "REGISTER" && (
                <div className="relative">
                  <label className="text-sm font-medium text-white block mb-1">
                    Name
                  </label>
                  <input
                    className="w-full py-2 px-4 rounded-md bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:placeholder-opacity-50"
                    type="text"
                    required
                    disabled={isLoading}
                    placeholder="Your Name"
                    {...register("name")}
                  />
                  <i className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400 fas fa-user" />
                </div>
              )}
              <div className="relative">
                <label className="text-sm font-medium text-white block mb-1">
                  E-Mail
                </label>
                <input
                  className="w-full py-2 px-4 rounded-md bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:placeholder-opacity-50"
                  type="text"
                  required
                  disabled={isLoading}
                  placeholder="Your E-Mail"
                  {...register("email")}
                />
                <i className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400 fas fa-user" />
              </div>
              <div className="relative">
                <label className="text-sm font-medium text-white block mb-1">
                  Password
                </label>
                <input
                  className="w-full py-2 px-4 rounded-md bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:placeholder-opacity-50"
                  type="password"
                  {...register("password")}
                  required
                  disabled={isLoading}
                  placeholder="Your password"
                  autoComplete="on"
                />
                <i className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400 fas fa-lock" />
              </div>
              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full py-3 bg-indigo-500/90 text-white rounded-md hover:bg-indigo-500/80 focus:outline-none focus:ring focus:ring-indigo-200 transition duration-300 ease-in-out"
                >
                  {variant === "LOGIN" ? "Log In" : "Register"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <div className="mt-6 text-gray-500 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-gray-800 text-white px-2">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <AuthSocialButton
                  icon={BsGithub}
                  onClick={() => socialAction("github")}
                />
                <AuthSocialButton
                  icon={BsGoogle}
                  onClick={() => socialAction("google")}
                />
              </div>

              <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-white">
                <div>
                  {variant === "LOGIN"
                    ? "New to LMS?"
                    : "Already have an account?"}
                </div>
                <div
                  onClick={toggleVariant}
                  className="underline cursor-pointer"
                >
                  {variant === "LOGIN" ? "Create an account" : "Login"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
