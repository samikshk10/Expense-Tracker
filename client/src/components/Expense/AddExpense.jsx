import React, { useState } from "react";
import baseurl from "../../../config";
import Inputfield from "../common/inputfield";

export default function AddExpense() {
  const [etitle, setetitle] = useState("");
  const [enote, setenote] = useState("");
  const [edate, setedate] = useState("");
  const [eamount, seteamount] = useState();
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
    "Education",
    "Health",
    "Business",
    "Personal",
    "Tax",
    "Vehicle",
    "Office",
    "Insurance",
    "Medicine",
    "Others",
  ];
  const [ecategory, setecategory] = useState(options[0]);
  const userid = window.localStorage.getItem("userid");
  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();

    // Perform validation checks
    if (eamount == null) {
      console.log("inside amount");
      seterror((prevState) => {
        return { ...prevState, amounterror: "Amount is required" };
      });
    }
    if (etitle.trim() === "") {
      seterror((prevState) => {
        return { ...prevState, titleerror: "Title is required" };
      });
    }
    if (enote.trim() === "") {
      seterror((prevState) => {
        return { ...prevState, noteerror: "Note is required" };
      });
    }

    if (ecategory.trim() === "") {
      seterror((prevState) => {
        return { ...prevState, categoryerror: "Category is required" };
      });
    }

    if (edate.trim() === "") {
      seterror((prevState) => {
        return { ...prevState, dateerror: "Date is required" };
      });
    }

    try {
      const response = await fetch(`${baseurl}/add-expense/${userid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ etitle, enote, eamount, ecategory, edate }),
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
          <span className="signuppage__titlename">Add Expense </span>
        </div>

        <form>
          <div className="mb-3 col-md-6">
            <Inputfield
              label={"Expense Title"}
              type={"text"}
              name={"etitle"}
              className={"form-control"}
              id={"etitle"}
              error={error.titleerror}
              handleChange={(e) => {
                setetitle(e.target.value);
                seterror((prevState) => {
                  return { ...prevState, titleerror: "" };
                });
              }}
            />
          </div>
          <div className="mb-3 col-md-6">
            <Inputfield
              label={"Expense Amount"}
              type={"number"}
              name={"eamount"}
              className={"form-control"}
              id={"eamount"}
              error={error.amounterror}
              handleChange={(e) => {
                seteamount(e.target.value);
                seterror((prevState) => {
                  return { ...prevState, amounterror: "" };
                });
              }}
            />
          </div>
          <div className="mb-3 col-md-6">
            <Inputfield
              label={"Expense Date"}
              type={"date"}
              name={"edate"}
              className={"form-control"}
              id={"edate"}
              error={error.dateerror}
              handleChange={(e) => {
                setedate(e.target.value);
                seterror((prevState) => {
                  return { ...prevState, dateerror: "" };
                });
              }}
            />
          </div>

          <div className="mb-3 col-md-6 ">
            <Inputfield
              label={"Expense Note"}
              type={"text"}
              name={"enote"}
              className={"form-control"}
              error={error.noteerror}
              id={"enote"}
              handleChange={(e) => {
                setenote(e.target.value);
                seterror((prevState) => {
                  return { ...prevState, noteerror: "" };
                });
              }}
            />
          </div>

          <div className="mb-3 col-md-6">
            <label className="form-label">Expense Category</label>
            <div>
              <select
                className={`form-select ${
                  error.categoryerror !== "" && "is-invalid"
                }`}
                onChange={(e) => {
                  setecategory(e.target.value);
                  seterror((prevState) => {
                    return { ...prevState, categoryerror: "" };
                  });
                }}
                defaultValue={ecategory}
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
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
