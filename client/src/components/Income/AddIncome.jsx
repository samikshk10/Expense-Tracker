import React, { useState } from "react";
import baseurl from "../../../config";
import Inputfield from "../common/inputfield";

export default function AddIncome() {
  const [ititle, setititle] = useState("");
  const [inote, setinote] = useState("");
  const [idate, setidate] = useState("");
  const [iamount, setiamount] = useState();
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("");
  const [error, seterror] = useState({
    amounterror: "",
    titleerror: "",
    dateerror: "",
    categoryerror: "",
    noteerror: "",
  });
  const options = [
    "Salary",
    "Business",
    "Sales of Goods",
    "Commission",
    "Interest",
    "Pocket Money",
    "Others",
  ];
  const [icategory, seticategory] = useState(options[0]);
  const userid = window.localStorage.getItem("userid");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation checks
    if (iamount == null) {
      console.log("inside amount");
      seterror((prevState) => {
        return { ...prevState, amounterror: "Amount is required" };
      });
    }
    if (ititle.trim() === "") {
      seterror((prevState) => {
        return { ...prevState, titleerror: "Title is required" };
      });
    }
    if (inote.trim() === "") {
      seterror((prevState) => {
        return { ...prevState, noteerror: "Note is required" };
      });
    }

    if (icategory.trim() === "") {
      seterror((prevState) => {
        return { ...prevState, categoryerror: "Category is required" };
      });
    }

    if (idate.trim() === "") {
      seterror((prevState) => {
        return { ...prevState, dateerror: "Date is required" };
      });
    }

    try {
      const response = await fetch(`${baseurl}/add-income/${userid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ititle, inote, iamount, icategory, idate }),
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
    <div className="section-layout">
      <div className="  mt-3 ">
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
          <span className="signuppage__titlename">Add Income </span>
        </div>

        <form>
          <div className="mb-3 col-md-6">
            <Inputfield
              label={"Income Title"}
              type={"text"}
              name={"ititle"}
              className={"form-control"}
              id={"ititle"}
              error={error.titleerror}
              handleChange={(e) => {
                setititle(e.target.value);
                seterror((prevState) => {
                  return { ...prevState, titleerror: "" };
                });
              }}
            />
          </div>
          <div className="mb-3 col-md-6">
            <Inputfield
              label={"Income Amount"}
              type={"number"}
              name={"iamount"}
              className={"form-control"}
              id={"iamount"}
              error={error.amounterror}
              handleChange={(e) => {
                setiamount(e.target.value);
                seterror((prevState) => {
                  return { ...prevState, amounterror: "" };
                });
              }}
            />
          </div>
          <div className="mb-3 col-md-6">
            <Inputfield
              label={"Income Date"}
              type={"date"}
              name={"idate"}
              className={"form-control"}
              id={"idate"}
              error={error.dateerror}
              handleChange={(e) => {
                setidate(e.target.value);
                seterror((prevState) => {
                  return { ...prevState, dateerror: "" };
                });
              }}
            />
          </div>

          <div className="mb-3 col-md-6 ">
            <Inputfield
              label={"Income Note"}
              type={"text"}
              name={"inote"}
              className={"form-control"}
              error={error.noteerror}
              id={"inote"}
              handleChange={(e) => {
                setinote(e.target.value);
                seterror((prevState) => {
                  return { ...prevState, noteerror: "" };
                });
              }}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Income Category</label>
            <div>
              <select
                className={`form-select ${error.categoryerror && "is-invalid"}`}
                onChange={(e) => {
                  seticategory(e.target.value);
                  seterror((prevState) => {
                    return { ...prevState, categoryerror: "" };
                  });
                }}
                defaultValue={icategory}
              >
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {error.categoryerror && (
              <p className="text-danger">{error.categoryerror}</p>
            )}
          </div>

          <div className="col-md-3">
            <button
              type="submit"
              className="btn btn-primary form-control mt-3 btn-signup "
              onClick={handleSubmit}
            >
              Add Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
