import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onRegisterUser = async (data) => {
    const base_url = import.meta.env.VITE_BACKEND_ORIGIN;

    if (data.password !== data.confirmpassword) {
      setError("password", {
        type: "manual",
        message: "Passwords do not match",
      });
      setError("confirmpassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    try {
      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmpassword: data.confirmpassword,
      };

      const response = await axios.post(`${base_url}/auth/register`, user);
      navigate("/login");
      toast.success(response.data.message);
    } catch (error) {
      if (error.response.data.errors) {
        const errorData = error.response.data.errors;

        const fieldSet = new Set();

        errorData.forEach(({ path, msg }) => {
          if (!fieldSet.has(path)) {
            console.log(`Field: ${path}, Message: ${msg}`);
            setError(path, { type: "server", message: msg });
            fieldSet.add(path);
          }
        });
      } else {
        toast.error(error.message || error);
        console.log(error);
      }
    }
  };

  return (
    <div className="mt-5 px-2">
      <div className="bg-white w-full max-w-md md:max-w-xl  rounded-md overflow-hidden p-4 mx-auto">
        <h2 className="text-xl text-slate-500 font-semibold text-center">
          Register to chat app
        </h2>
        <form
          onSubmit={handleSubmit(onRegisterUser)}
          noValidate
          className="grid gap-4 mt-5"
        >
          <div className="flex flex-col gap-1 ">
            <label className="text-sm text-slate-400" htmlFor="name">
              Name
            </label>
            <input
              className="p-2 border rounded-md focus:outline-blue-200"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name..."
              autoComplete="off"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500 font-semibold">
                {errors.name.message}
              </p>
            )}
          </div>

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

          <div className="flex flex-col gap-1 ">
            <label className="text-sm text-slate-400" htmlFor="confirmpassword">
              Confirm password
            </label>
            <input
              className="p-2 border rounded-md focus:outline-blue-200"
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm password..."
              autoComplete="new-password"
              {...register("confirmpassword")}
            />
            {errors.confirmpassword && (
              <p className="text-sm text-red-500 font-semibold">
                {errors.confirmpassword.message}
              </p>
            )}
          </div>

          <button className="rounded-md bg-blue-500 p-2 text-white font-semibold uppercase hover:bg-blue-700">
            Register
          </button>
        </form>
        <p className="mt-5">
          Already have an account?
          <Link
            className="font-semibold ml-1 text-blue-500 hover:underline hover:font-bold"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
