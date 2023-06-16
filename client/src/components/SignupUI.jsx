import { useState } from "react";
import SignupIcon from "../assets/images/icon.png";
import baseurl from "../../config";
import Inputfield from "./common/inputfield";

export default function SignupUI() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [email, setEmail] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("");
  const [pwerror, setpwerror] = useState();
  const [error, seterror] = useState({
    fnameerror: "",
    lnameerror: "",
    emailerror: "",
    passworderror: "",
    cpassworderror: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstName.trim() === "") {
      seterror((prevState) => {
        return { ...prevState, fnameerror: "FirstName is required" };
      });
    }
    if (lastName.trim() === "") {
      seterror((prevState) => {
        return { ...prevState, lnameerror: "LastName is required" };
      });
    }
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
    if (cpassword.trim() === "") {
      seterror((prevState) => {
        return { ...prevState, cpassworderror: "ConfirmPassword is required" };
      });
    } else {
      if (password && password != cpassword) {
        seterror((prevState) => {
          return {
            ...prevState,
            cpassworderror: "Password Confirmation Doesnt Match",
          };
        });
      }
    }

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
            <Inputfield
              label={"First Name"}
              type={"text"}
              name={"fname"}
              className={"form-control"}
              id={"fname"}
              error={error.fnameerror}
              handleChange={(e) => {
                setFirstName(e.target.value);
                seterror((prevState) => {
                  return { ...prevState, fnameerror: "" };
                });
              }}
            />
          </div>
          <div className="mb-3 col-md-6">
            <Inputfield
              label={"Last Name"}
              type={"text"}
              name={"lname"}
              className={"form-control"}
              id={"lname"}
              error={error.lnameerror}
              handleChange={(e) => {
                setLastName(e.target.value);
                seterror((prevState) => {
                  return { ...prevState, lnameerror: "" };
                });
              }}
            />
          </div>
        </div>
        <div className="mb-3 ">
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
              setPassword(e.target.value);
              seterror((prevState) => {
                return { ...prevState, passworderror: "" };
              });
            }}
          />
        </div>
        <div className="mb-3">
          <Inputfield
            label={"Confirm Password"}
            type={"password"}
            name={"cpassword"}
            className={"form-control"}
            id={"cpassword"}
            error={error.cpassworderror}
            handleChange={(e) => {
              setcpassword(e.target.value);
              seterror((prevState) => {
                return { ...prevState, cpassworderror: "" };
              });
            }}
          />
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
