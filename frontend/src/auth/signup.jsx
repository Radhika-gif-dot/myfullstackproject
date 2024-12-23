// import { InputState, userSignUpSchema } from "@/schema/userSchema";
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  Plus,
  User2,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { userSignUpSchema } from "../validators/usercredentials";
import { registerUser } from "../api service/auth.api";

function SignUp() {
  const [inputValues, setInput] = useState({
    username: "", // Change to 'username' from 'userName'
    email: "",
    password: "",
    profilePhoto: "", // Change to 'profilePhoto' from 'profilePicture'
  });
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...inputValues, [name]: value });
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const [profilePicSelected, setProfilePic] = useState(null);
  const imageRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const output = reader.result;
        setProfilePic(output);
        setInput({ ...inputValues, profilePhoto: output });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputValues);
    const isValidated = userSignUpSchema.safeParse(inputValues);
    if (!isValidated.success) {
      const fieldErrors = isValidated.error.formErrors.fieldErrors;
      console.log("entered in submit", fieldErrors);
      setErrors(fieldErrors);
      return;
    }
  
    setErrors({});
    setLoading(true);
  
    try {
      console.log(inputValues);
      const response = await registerUser(inputValues);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <form
          className="md:p-8 w-full md:border border-gray-200 max-w-md rounded-lg mx-4"
          onSubmit={handleSubmit}
        >
          <h3 className="text-3xl font-bold mt-[-60px] text-center">Sign Up</h3>
          <div className="mt-5 flex items-center justify-center flex-col">
            <div className="relative">
              <img
                src={profilePicSelected}
                alt={"N/A"}
                className="md:w-32 md:h-32 w-28 h-28 rounded-full text-center font-semibold bg-gray-200"
              />
              <button
                className="bg-gray-200 absolute left-[62px] top-[76px]  md:left-[68px] md:top-24 h-5 px-0 rounded-full active:bg-freshbasil hover:bg-dustyrose"
                type="button"
                onClick={() => imageRef.current?.click()}
              >
                <Plus
                  className="rounded-full text-black hover:text-white "
                  size={20}
                />
              </button>
            </div>
            {errors.profilePhoto && <p className="text-xs text-start mt-2 text-red-500">{errors.profilePhoto}</p>}
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              accept="image/png image/jpeg image/jpg"
              onChange={handleFileChange}
            />
          </div>
          <div className="mt-4 flex flex-col gap-y-3">
            <div className="relative">
              <User2 className="absolute top-2 left-1 pointer-events-none text-gray-500" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className={`pl-10 w-full ring-1 ring-gray-300 rounded-sm font-semibold p-2 ${
                  errors.username
                    ? "focus-visible:ring-2 border-red-500 border-2 focus-visible:border-0 focus-visible:ring-red-500"
                    : "focus-visible:ring-1"
                }`}
                value={inputValues.username}
                onChange={handleInput}
              />
              {errors && errors.username && (
                <h3 className="text-xs text-start mt-2 text-red-500">
                  {errors.username}
                </h3>
              )}
            </div>
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
                className={`pl-10 w-full ring-1 ring-gray-300 rounded-sm font-semibold p-2 ${
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
              {errors && errors.password && (
                <h3 className="text-xs text-start mt-2 text-red-500">
                  {errors.password}
                </h3>
              )}
            </div>
            {isLoading ? (
              <button
                className="bg-dustyrose flex gap-x-1 items-center rounded-sm p-2 mb-2"
                disabled
              >
                <Loader2 className="animate-spin" size={20} /> Please Wait
              </button>
            ) : (
              <button className="bg-freshbasil rounded-sm p-2 hover:bg-dustyrose active:bg-dustyrose mb-1">
                Sign Up
              </button>
            )}
          </div>
          <h3 className="font-semibold text-gray-600 mt-4 text-start">
            Already have an account?{" "}
            <Link to={"/"}>
              <span className="underline active:text-blue-600">Login</span>
            </Link>
          </h3>
        </form>
      </div>
    </>
  );
}

export default SignUp;
