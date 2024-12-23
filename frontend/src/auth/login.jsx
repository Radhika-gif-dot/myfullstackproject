// import { userLogInSchema } from "@/schema/userSchema";

import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userLogInSchema } from "../validators/usercredentials";
import { loginUser } from "../api service/auth.api";
import { useNavigate } from "react-router-dom";
function Login() {
  const [inputValues, setInput] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const authData = localStorage.getItem("authdata");
    if (authData) {
      navigate("/todos");
    }
  }, [navigate]);
  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...inputValues, [name]: value });
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValidated = userLogInSchema.safeParse(inputValues);
    if (!isValidated.success) {
      const fieldErrors = isValidated.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
      return;
    }
    if (isValidated.success) {
      setErrors({});
      setLoading(true);
      try {
        const response = await loginUser(inputValues);
        if (response) {
          navigate("/todos");
        }
      } catch (error) {
        console.error(error);
        setErrors({ login_failed: error.response.data.message });
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <form
          className="md:p-8 w-full md:border border-gray-200 max-w-md rounded-lg mx-4"
          onSubmit={handleSubmit}
        >
          <h3 className="text-3xl font-bold mt-[-60px] text-center">
            Your To-Do
          </h3>
          {errors && errors?.login_failed && (
            <h3 className="text-xs text-start mt-2 text-red-500">
              {errors.login_failed}
            </h3>
          )}
          <div className="mt-4 flex flex-col gap-y-3">
            <div className="relative">
              <Mail className="absolute top-2 left-1 pointer-events-none text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`pl-10 w-full ring-1 ring-gray-300 rounded-sm font-semibold p-2 ${
                  errors.email
                    ? "focus-visible:ring-2 border-red-500 border-2 focus-visible:border-0 focus-visible:ring-red-500"
                    : "focus-visible:ring-1"
                }`}
                value={inputValues.email}
                onChange={handleInput}
              />
              {errors && errors?.email && (
                <h3 className="text-xs text-start mt-2 text-red-500">
                  {errors.email}
                </h3>
              )}
            </div>
            <div className="relative">
              <LockKeyhole className="absolute top-2 left-1 pointer-events-none text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={`pl-10 w-full ring-1 ring-gray-300 rounded-sm font-semibold p-2  ${
                  errors.password
                    ? "focus-visible:ring-2 border-red-500 border-2 focus-visible:border-0 focus-visible:ring-red-500"
                    : "focus-visible:ring-1"
                }`}
                value={inputValues.password}
                onChange={handleInput}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-2 right-2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors && errors?.password && (
                <h3 className="text-xs text-start mt-2 text-red-500">
                  {errors.password}
                </h3>
              )}
            </div>
            {isLoading ? (
              <button
                type="button"
                className="bg-dustyrose flex gap-x-1 rounded-sm p-2 items-center mb-1"
                disabled
              >
                <Loader2 className="animate-spin" size={20} /> Please Wait
              </button>
            ) : (
              <button className="bg-freshbasil rounded-sm p-2 hover:bg-dustyrose active:bg-dustyrose mb-1">
                Login
              </button>
            )}
            <h3 className="font-semibold text-blue-600 text-start  underline">
              <Link to={"/reset/changepassword"}>Forgot Password</Link>
            </h3>
          </div>
          <h3 className="font-semibold text-gray-600 mt-4 text-start">
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="underline active:text-blue-600">
                Create a new account now{" "}
              </span>
            </Link>
          </h3>
          <h3 className="font-semibold text-gray-600 mt-1 text-start">
            It takes less than a minute.
          </h3>
        </form>
      </div>
    </>
  );
}

export default Login;
