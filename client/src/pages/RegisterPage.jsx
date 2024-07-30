export default function RegisterPage() {
  return (
    <div className="mt-5 px-2">
      <div className="bg-white w-full max-w-md md:max-w-xl  rounded-md overflow-hidden p-4 mx-auto">
        <h2 className="text-xl text-slate-500 font-semibold text-center">
          Register to chat app
        </h2>
        <form noValidate className="grid gap-4 mt-5">
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
            />
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
            />
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
            />
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
            />
          </div>

          <button className="rounded-md bg-blue-500 p-2 text-white font-semibold uppercase">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
