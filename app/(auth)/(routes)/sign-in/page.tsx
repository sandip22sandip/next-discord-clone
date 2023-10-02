"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LoginPage = () => {
  const session = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          return toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          router.push("/");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1E1F22] text-white">
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
          <h2 className="text-2xl font-semibold mb-4 text-center text-white">
            Welcome Back!
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <label className="text-sm font-medium text-white block mb-1">
                Username
              </label>
              <input
                className="w-full py-2 px-4 rounded-md bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:placeholder-opacity-50"
                type="text"
                required
                disabled={isLoading}
                placeholder="Your username"
                {...register("userId")}
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
                Log In
              </button>
            </div>
            <div className="text-center">
              <Link href="#" className="text-sm text-gray-300">
                Forgot your password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

