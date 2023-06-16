import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Card({ icon, heading, body }) {
  return (
    <div>
      <div className={`total-card me-4`}>
        <div className="card">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex card-total">
                <div className="align-self-center">
                  <FontAwesomeIcon
                    icon={icon && icon}
                    className="warning font-large-2 float-left total-card-icon"
                  />
                </div>
                <div className="media-body total-card-amount text-right">
                  <h3> {body && body}</h3>
                  <span>{heading && heading}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
