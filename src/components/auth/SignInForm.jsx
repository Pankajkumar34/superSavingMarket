import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { getEmptyFields } from 'get_input_empty_fields';
import OnChangeInput from 'onchangeinput';
import { loginHandler } from "../../utils/thunkApis/auth.api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../../redux/slice/auth.slice";
const validationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: {
      patternMsg: "Invalid email format"
    }
  },

  password: {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    minLength: 4,
    maxLength: 10,
    errorMessage: {
      minLengthMsg: "Password must be at least 4 characters long",
      maxLengthMsg: "Password must not exceed 10 characters"
    }
  },

};

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { values, errors, handleChange, resetForm, setErrors } = OnChangeInput(
    {
      email: "",
      password: "",
    },
    validationRules
  );


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const emptyFields = getEmptyFields(values);
      if (emptyFields.length > 0) {
        emptyFields.forEach(field => {
          setErrors((prev) => ({ ...prev, [field]: `${field} is required` }));
        });
      } else {
        const res = await dispatch(loginHandler(values))
        if (loginHandler.fulfilled.match(res)) {
          dispatch(setUser(res.payload))
          toast.success("Login Successfully");
          sessionStorage.setItem("isAuthenticated", true)

          navigate("/");
        }
        if (res.meta.requestStatus === "rejected") {
          toast.error(res.payload?.response.data?.message)
        }
        console.log(res, "res==>")
        console.log("All values filled:", values);
      }
    } catch (error) {
      console.log(error, "=>")
    }
  };



  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>

            <form>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input onChange={handleChange} value={values.email} name="email" placeholder="info@gmail.com" />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input onChange={handleChange} value={values.password} name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button onClick={handleSubmit} className="w-full" size="sm">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>

            {/* <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
