import React, { useEffect, useState } from "react";

function ClientDetails({
  clientDetails,
  setOpenModal,
  accountNumberHidden,
  nationalInsuranceHidden,
  sortCodeHidden,
}) {
  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="client-modal-header">
            <h2 className=" pt-3">Client Details</h2>
            <button
              className="close-button"
              onClick={() => setOpenModal(false)}
            >
              ×
            </button>
          </span>
          <div className="client-info">
            <div className="">
              <img
                src={clientDetails.avatar}
                className="client-avatar"
                alt="Avatar"
              />
            </div>
            <div className="client-details">
              <h3>
                {clientDetails.firstName}
                {"  "}
                {clientDetails.lastName}
              </h3>
              <span className="client-email">{clientDetails.email}</span>
              <div className="contact-info">
                <div>
                  <i className="fa-solid fa-clipboard-user"></i>
                  <strong className="px-1">NI number</strong>
                  <p> {nationalInsuranceHidden}</p>
                </div>
                <div>
                  <i className="fa-regular fa-calendar-days"></i>
                  <strong className="px-1">Date of birth</strong>
                  <p> {clientDetails.dateOfBirth}</p>
                </div>
                <div>
                  <i className="fa-solid fa-globe"></i>
                  <strong className="px-1">Country</strong>
                  <p>{clientDetails.address.country}</p>
                </div>
                <div>
                  <i className="fa-solid fa-city"></i>
                  <strong className="px-1">City</strong>
                  <p>{clientDetails.address.city}</p>
                </div>
                <div>
                  <i className="fa-solid fa-square-phone"></i>
                  <strong className="px-1">Phone number</strong>
                  <p>{clientDetails.phoneNumber}</p>
                </div>
                <div>
                  <i className="fa-solid fa-house-user"></i>
                  <strong className="px-1">Street address</strong>
                  <p>
                    {clientDetails.address.addressLine1}{" "}
                    {clientDetails.address.addressLine2}{" "}
                    {clientDetails.address.addressLine3}
                  </p>
                </div>
                <div>
                  <i className="fa-solid fa-location-dot"></i>
                  <strong className="px-1">Postcode</strong>
                  <p>{clientDetails.address.postCode}</p>
                </div>
              </div>
              <div className="contact-info">
                <div>
                  <i className="fa-solid fa-money-check-dollar"></i>
                  <strong className="px-1">Account type</strong>
                  <p>{clientDetails.paymentDetails.accountType}</p>
                </div>
                <div>
                  <i className="fa-solid fa-id-card"></i>
                  <strong className="px-1">Account name</strong>
                  <p>{clientDetails.paymentDetails.accountName}</p>
                </div>
                <div>
                  <i className="fa-solid fa-money-check"></i>
                  <strong className="px-1">Account number</strong>
                  <p>{accountNumberHidden}</p>
                </div>
                <div>
                  <i className="fa-solid fa-credit-card"></i>
                  <strong className="px-1">Sort code</strong>
                  <p>{sortCodeHidden}</p>
                </div>

                {clientDetails.paymentDetails.rollNumber && (
                  <div>
                    <i className="fa-solid fa-hashtag"></i>
                    <strong className="px-1">Roll number</strong>
                    <p>{clientDetails.paymentDetails.rollNumber}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetails;
