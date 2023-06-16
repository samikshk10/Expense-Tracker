import { useState } from "react";
import LoginIcon from "../assets/images/icon.png";
import baseurl from "../../config";
import { useNavigate } from "react-router-dom";
import Inputfield from "./common/inputfield";
export default function LoginUI() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("info");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [error, seterror] = useState({
    emailerror: "",
    passworderror: "",
  });

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      seterror((prevState) => {
        return { ...prevState, emailerror: "Email is required" };
      });
    }
    if (password.trim() === "") {
      seterror((prevState) => {
        return { ...prevState, passworderror: "Password is required" };
      });
    }
    try {
      const response = await fetch(`${baseurl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      setFlashMessage(data.msg);
      setFlashType(data.type);
      setisLoggedIn(data.isLoggedIn);

      if (isLoggedIn) {
        localStorage.setItem("jwttoken", data.token);
        localStorage.setItem("userid", data.userid);
        localStorage.setItem("username", data.userName);
        Navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="loginpage__container loginpage__container-title mt-5 ">
      {flashMessage && (
        <div
          className={`alert alert-dismissibles alert-${flashType && flashType}`}
          role="alert"
        >
          {" "}
          {flashMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className="loginpage__title mb-2">
        <img src={LoginIcon} alt="LoginIconImage" />
        <span className="loginpage__titlename">Login</span>
      </div>

      <form>
        <div className="mb-3">
          <Inputfield
            label={"Email Address"}
            type={"email"}
            name={"email"}
            className={"form-control"}
            id={"email"}
            error={error.emailerror}
            handleChange={(e) => {
              setEmail(e.target.value);
              seterror((prevState) => {
                return { ...prevState, emailerror: "" };
              });
            }}
          />
        </div>
        <div className="mb-3">
          <Inputfield
            label={"Password"}
            type={"password"}
            name={"password"}
            className={"form-control"}
            id={"password"}
            error={error.passworderror}
            handleChange={(e) => {
              setEmail(e.target.value);
              seterror((prevState) => {
                return { ...prevState, passworderror: "" };
              });
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary form-control mt-3 btn-login"
          onClick={handleSubmit}
        >
          Login
        </button>

        <p className="mt-3 text-center">
          Don&apos;t Have an Account?{" "}
          <span>
            <a href="/signup"> SignUp</a>
          </span>
        </p>
      </form>
    </div>
  );
}
