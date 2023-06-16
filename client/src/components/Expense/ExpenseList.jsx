import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import baseurl from "../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faMoneyCheckDollar,
  faSackDollar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import Card from "../Card";
import Buttons from "../common/Button";

export default function ExpenseList() {
  const navigate = useNavigate();
  const userid = window.localStorage.getItem("userid");
  const [rdata, setrdata] = useState([]);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("");
  const [show, setShow] = useState(false);
  const [budget, setbudget] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeletes = async (itemId) => {
    try {
      const response = await fetch(`${baseurl}/delete-expense/${itemId}`, {
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

  const remainingbudget = () => {
    const rembudget = (budget && budget - gettotalexpense()) || "";
    return rembudget;
  };

  const handlesetBudget = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseurl}/set-budget/${userid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ budget }),
      });
      const data = await response.json();

      setFlashMessage(data?.msg);
      setFlashType(data?.type);

      setbudget(data?.budget);
    } catch (error) {
      console.log(error);
    }
  };

  const gettotalexpense = () => {
    const amounts = rdata.map((e) => e.amount);
    const total = amounts.reduce((a, c) => a + c, 0);
    return total;
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseurl}/get-expense/${userid}`);
      console.log("respnse>>>>" + response);
      const data = await response.json();
      // console.log(...data.data);
      console.log(data.data);
      setrdata(data.data);
      console.log(data?.budget);
      setbudget(data?.budget);
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
      <div className="row mb-4">
        <div className="col-md-4">
          <Card
            icon={faMoneyBill}
            heading={"Total Expense"}
            body={gettotalexpense()}
          />
        </div>
        <div className="col-md-4">
          <Card
            icon={faSackDollar}
            heading={"Total Budget"}
            body={(budget && budget) || ""}
          />
        </div>

        <div className="col-md-4">
          <Card
            icon={faMoneyCheckDollar}
            heading={"Rem Budget"}
            body={remainingbudget()}
          />
        </div>
      </div>
      <div className="d-flex add-button ">
        <Buttons
          handleClick={handleShow}
          buttonlabel={"Set your Budget"}
          className={"btn-primary me-2"}
        />
        <Buttons
          handleClick={() => navigate("/add-expenses")}
          buttonlabel={"Add Expense"}
          className={"btn-primary me-2"}
        />
      </div>
      <div className="table-scrollable">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Expense Title</th>
              <th scope="col">Expense Date </th>
              <th scope="col">Expense Category </th>
              <th scope="col">Expense Amount</th>
              <th scope="col">Expense Note</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>

          <tbody>
            {rdata.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.expensesDate}</td>
                <td>{item.category_name}</td>
                <td>{item.amount}</td>
                <td>{item.note}</td>
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
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set your budget</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-3 col-md-12">
            <input
              type="number"
              name="edate"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your budget"
              value={budget && budget}
              onChange={(e) => setbudget(e.target.value)}
            />
            <div className="invalid-feedback"></div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlesetBudget}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
