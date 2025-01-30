import React from "react";
import { SigninInput } from "@100xdevs/medium-common";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
export default function SignupFormDemo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [postInputs, setPostInputs] = useState<SigninInput>({
    username: "",
    password: "",
  });

  async function sendrequest() {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/signin`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      alert("Error signing in");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Disaster Relief Coordination Platform
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Signin to Disaster Relief Coordination Platform for the realtime updates
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {/* <LabelInputContainer className="mb-4">
          <Label htmlFor="Name">Name</Label>
          <Input
            id="name"
            placeholder="Aditya Singh"
            type="text"
            onChange={(e) =>
              setPostInputs((c) => ({
                ...c,
                name: e.target.value,
              }))
            }
          />
        </LabelInputContainer> */}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            onChange={(e) =>
              setPostInputs((c) => ({
                ...c,
                username: e.target.value,
              }))
            }
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            onChange={(e) =>
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              })
            }
          />
        </LabelInputContainer>
        <button
          onClick={sendrequest}
          type="button"
          className="text-white w-full mt-3 bg-blue-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <svg
              className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.59C100 78.2 77.6 100.6 50 100.6C22.4 100.6 0 78.2 0 50.59C0 22.98 22.4 0.59 50 0.59C77.6 0.59 100 22.98 100 50.59ZM9.081 50.59C9.081 74.2 26.4 91.6 50 91.6C73.6 91.6 90.9 74.2 90.9 50.59C90.9 26.98 73.6 9.59 50 9.59C26.4 9.59 9.081 26.98 9.081 50.59Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.04C96.393 38.36 97.8624 35.84 97.0079 33.42C95.2932 28.63 92.871 24.17 89.8167 20.23C85.9962 15.03 80.9436 10.94 75.0013 8.44C69.059 5.94 62.4446 5.09 55.9665 5.96C53.4516 6.32 51.9969 8.85 52.6763 11.28C53.3557 13.7 55.8578 15.13 58.3601 14.83C63.8041 14.18 69.2898 14.97 74.2395 17.15C79.1892 19.33 83.4293 22.8 86.5636 27.21C88.7991 30.2 90.5081 33.58 91.646 37.2C92.33 39.62 94.682 40.31 97.0079 39.04H93.9676Z"
                fill="currentFill"
              />
            </svg>
          ) : null}
          Sign in
        </button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div className="mt-4 text-center text-sm">
          Dont have an account?{" "}
          <a href="/signup" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
