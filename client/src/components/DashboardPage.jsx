import {
  faDollarSign,
  faMoneyBill,
  faMoneyBill1,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import baseurl from "../../config";
import Card from "./Card";

export default function DashboardPage() {
  const userid = window.localStorage.getItem("userid");
  const [income, setincome] = useState([]);
  const [expense, setexpense] = useState([]);
  const [budget, setbudget] = useState("");

  const fetchIncome = async () => {
    try {
      const response = await fetch(`${baseurl}/get-income/${userid}`);
      console.log("respnse>>>>" + response);
      const data = await response.json();
      console.log(data);
      setincome(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpense = async () => {
    try {
      const response = await fetch(`${baseurl}/get-expense/${userid}`);
      console.log("respnse>>>>" + response);
      const data = await response.json();
      console.log(data);
      setexpense(data?.data);
      setbudget(data?.budget);
    } catch (error) {
      console.log(error);
    }
  };

  const gettotalexpense = () => {
    const amounts = expense.map((e) => e.amount);
    const total = amounts.reduce((a, c) => a + c, 0);
    return total;
  };
  const remainingbudget = () => {
    const rembudget = (budget && budget - gettotalexpense()) || "";
    return rembudget;
  };
  const gettotalincome = () => {
    const amounts = income.map((e) => e.income_amount);
    const total = amounts.reduce((a, c) => a + c, 0);
    return total;
  };

  useEffect(() => {
    fetchIncome();
    fetchExpense();
  }, []);
  return (
    <div className="section-layout dashboard">
      <div className="row">
        <div className="col-md-4">
          <Card
            icon={faDollarSign}
            heading={"Total Income"}
            body={gettotalincome()}
          />
        </div>
        <div className="col-md-4">
          <Card
            icon={faMoneyBill1}
            heading={"Total Expense"}
            body={gettotalexpense()}
          />
        </div>
        <div className="col-md-4">
          <Card
            icon={faSackDollar}
            heading={"Total Budget"}
            body={budget && budget}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h3 className="table-heading">Table Expense History</h3>
          <div className="table-scrollable">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Expense Title</th>
                  <th scope="col">Expense Date </th>
                  <th scope="col">Expense Category </th>
                  <th scope="col">Expense Amount</th>
                </tr>
              </thead>
              <tbody>
                {expense.reverse().map(
                  (item, index) =>
                    index < 8 && (
                      <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.expensesDate}</td>
                        <td>{item.category_name}</td>
                        <td>{item.amount}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-6">
          <h3 className="table-heading">Table Income History</h3>
          <div className="table-scrollable">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Income Title</th>
                  <th scope="col">Income Date </th> 
                  <th scope="col">Income Category </th>
                  <th scope="col">Income Amount</th>
                </tr>
              </thead>
              <tbody>
                {income.reverse().map(
                  (item, index) =>
                    index < 8 && (
                      <tr key={index}>
                        <td>{item.income_title}</td>
                        <td>{item.income_date}</td>
                        <td>{item.income_category}</td>
                        <td>{item.income_amount}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
