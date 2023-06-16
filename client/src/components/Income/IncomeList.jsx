import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import baseurl from "../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faTrash } from "@fortawesome/free-solid-svg-icons";
import Card from "../Card";
import Buttons from "../common/Button";
export default function IncomeList() {
  const navigate = useNavigate();
  const userid = window.localStorage.getItem("userid");
  const [rdata, setrdata] = useState([]);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("");
  const handleDeletes = async (itemId) => {
    try {
      const response = await fetch(`${baseurl}/delete-income/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setFlashMessage(data?.msg);
      setFlashType(data?.type);

      setrdata(rdata.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log(error);
    }
  };

  const gettotalincome = () => {
    const amounts = rdata.map((e) => e.income_amount);
    const total = amounts.reduce((a, c) => a + c, 0);
    return total;
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseurl}/get-income/${userid}`);
      console.log("respnse>>>>" + response);
      const data = await response.json();
      // console.log(...data.data);
      console.log(data);
      setrdata(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("this is r data" + rdata);
  //console.log("this is rdata" + JSON.parse([...rdata]));
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="section-layout">
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
      <div className="col-md-4">
        <Card
          icon={faDollarSign}
          heading={"Total Income"}
          body={gettotalincome()}
        />
      </div>
      <div className="d-flex add-button">
        <Buttons
          handleClick={() => navigate("/add-income")}
          buttonlabel={"Add Income"}
          className={"btn-primary me-2"}
        />
      </div>
      <div className="table-scrollable">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Income Title</th>
              <th scope="col">Income Date </th>
              <th scope="col">Income Category </th>
              <th scope="col">Income Amount</th>
              <th scope="col">Income Note</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {rdata.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.income_title}</td>
                <td>{item.income_date}</td>
                <td>{item.income_category}</td>
                <td>{item.income_amount}</td>
                <td>{item.income_note}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeletes(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>{" "}
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>{" "}
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>
            <tr>
              <td scope="col">ID</td>
              <td scope="col">Expense Title</td>
              <td scope="col">Expense Date </td>
              <td scope="col">Expense Amount</td>
              <td scope="col">Expense Note</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
