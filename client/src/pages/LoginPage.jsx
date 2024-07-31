import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onLoginUser = async (data) => {
    console.log(data);
  };

  return (
    <div className="mt-5 px-2">
      <div className="bg-white w-full max-w-md md:max-w-xl  rounded-md overflow-hidden p-4 mx-auto">
        <h2 className="text-xl text-slate-500 font-semibold text-center">
          Login to chat app
        </h2>
        <form
          onSubmit={handleSubmit(onLoginUser)}
          noValidate
          className="grid gap-4 mt-5"
        >
          <div className="flex flex-col gap-1 ">
            <label className="text-sm text-slate-400" htmlFor="email">
              Email
            </label>
            <input
              className="p-2 border rounded-md focus:outline-blue-200"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
              autoComplete="off"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 font-semibold">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 ">
            <label className="text-sm text-slate-400" htmlFor="password">
              Password
            </label>
            <input
              className="p-2 border rounded-md focus:outline-blue-200"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              autoComplete="new-password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500 font-semibold">
                {errors.password.message}
              </p>
            )}
          </div>

          <button className="rounded-md bg-blue-500 p-2 text-white font-semibold uppercase hover:bg-blue-700 ">
            Register
          </button>
        </form>
        <p className="mt-5 ">
          Dont have an account?
          <Link
            className="font-semibold ml-1 text-blue-500 hover:underline hover:font-bold"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
