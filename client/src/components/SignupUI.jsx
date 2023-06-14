import { useState } from "react";
import SignupIcon from "../assets/images/icon.png";
import baseurl from "../../config";

export default function SignupUI() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseurl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await response.json();

      setFlashMessage(data.msg);
      setFlashType(data.type);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signuppage__container signuppage__container-title mt-3 ">
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
      <div className="signuppage__title mb-2">
        <img src={SignupIcon} alt="SignupiconImage" />
        <span className="signuppage__titlename">Sign UP</span>
      </div>

      <form>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">FirstName</label>
            <input
              type="email"
              name="firstName"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <div className="invalid-feedback"></div>
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">LastName</label>
            <input
              type="email"
              name="lastName"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className="invalid-feedback"></div>
          </div>
        </div>
        <div className="mb-3 ">
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
          className="btn btn-primary form-control mt-3 btn-signup"
          onClick={handleSubmit}
        >
          SignUp
        </button>

        <p className="mt-3 text-center">
          Already Have an Account?{" "}
          <span>
            <a href="/login">Login</a>
          </span>
        </p>
      </form>
    </div>
  );
}
