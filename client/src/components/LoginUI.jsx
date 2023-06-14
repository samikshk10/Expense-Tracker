import { useState } from "react";
import LoginIcon from "../assets/images/icon.png";
import baseurl from "../../config";
export default function LoginUI() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="loginpage__container loginpage__container-title mt-5 ">
      {flashMessage && (
        <div
          className={`alert alert-dismissibles alert-${
            (flashType && flashType) || "info"
          }`}
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
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="invalid-feedback"></div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control "
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="invalid-feedback"></div>
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
