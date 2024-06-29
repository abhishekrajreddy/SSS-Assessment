import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import ClientDetails from "./ClientDetails";
import ErrorMsgModal from "../Shared/ErrorMsgModal";
import SpinerLoader from "../Shared/SpinerLoader";
import { ClientApi } from "../../Services/Api";

function Clients() {
  const [allClients, setAllClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [listLimit, setListLimit] = useState(15);
  const [listCount, setListCount] = useState(15);
  const [loading, setLoading] = useState(true);
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [clientDetails, setClientDetails] = useState({});
  const [accountNumberHidden, setAccountNumberHidden] = useState("");
  const [nationalInsuranceHidden, setNationalInsuranceHidden] = useState("");
  const [sortCodeHidden, setSortCodeHidden] = useState("");

  const getAllClients = async (page) => {
    // Fetch All Clients
    setLoading(true);
    await axios
      .get(`${ClientApi}?page=${page}&limit=${listLimit}`)
      .then((res) => {
        setAllClients(res.data.results);
        setLoading(false);
        setTotalPages(res.data.metadata.numPages);
        setListCount(res.data.metadata.count);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setShowErrMsg(true);
        setErrMsg(err.message);
      });
  };

  const onViewDetails = (data) => {
    // OnClick View Individual Client Details with Modal
    getClientDetails(data.id);
    obfuscateDetails(data);
    setLoading(true);
  };

  const getClientDetails = async (id) => {
    // Fetch Client Details by ID
    await axios
      .get(`${ClientApi}/${id}`)
      .then((res) => {
        setLoading(false);
        setClientDetails(res.data);
        setOpenModal(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setShowErrMsg(true);
        setErrMsg(err.message);
      });
  };

  function obfuscateDetails(data) {
    // Function to replace characters information details of Clients
    const accNumber = data.paymentDetails.accountNumber;
    const niNumber = data.nino;
    const sortCode = data.paymentDetails.sortCode;

    const replaceAccNumber =
      accNumber.slice(0, -3).replace(/\d/g, "*") + accNumber.slice(-3);
    setAccountNumberHidden(replaceAccNumber);

    const replaceSortCode =
      sortCode.slice(0, -3).replace(/\d|-/g, "*") + sortCode.slice(-2);
    setSortCodeHidden(replaceSortCode);

    const replaceNINumber =
      niNumber.slice(0, 2) +
      niNumber.slice(2, -2).replace(/./g, "*") +
      niNumber.slice(-2);
    setNationalInsuranceHidden(replaceNINumber);
  }

  useEffect(() => {
    // Initial Render to fetch all Clients
    getAllClients(currentPage);
    setOpenModal(false);
    setLoading(true);
  }, [currentPage, listLimit]);

  useEffect(() => {
    // Prevent Overflow Y scroll when Modal Opens by adding Class to the Body
    if (openModal) {
      document.body.classList.add("overflowY");
    }
    return () => {
      document.body.classList.remove("overflowY");
    };
  }, [openModal]);

  return (
    <>
      {openModal && (
        <ClientDetails
          clientDetails={clientDetails}
          setOpenModal={setOpenModal}
          accountNumberHidden={accountNumberHidden}
          nationalInsuranceHidden={nationalInsuranceHidden}
          sortCodeHidden={sortCodeHidden}
        />
      )}
      {loading && <SpinerLoader />}
      {showErrMsg && (
        <ErrorMsgModal errMsg={errMsg} setShowErrMsg={setShowErrMsg} />
      )}
      <div className="table-container">
        <h1 className="text-center">Client List</h1>

        <div className="">
          {allClients.length > 0 ? (
            <>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Phone Number</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allClients.map((d, index) => (
                    <tr key={index}>
                      <td className="user-info">
                        <img
                          src={d.avatar}
                          className="user-avatar"
                          alt="Avatar"
                        />

                        <div className="user-details">
                          <div className="user-name">
                            {d.firstName}
                            {"  "}
                            {d.lastName}
                          </div>
                          <div className="user-email">{d.email}</div>
                        </div>
                      </td>
                      <td>
                        <div className="user-phone">{d.phoneNumber}</div>
                      </td>
                      <td>
                        <div className="user-phone">{d.address.city}</div>
                        <div className="user-country">{d.address.country}</div>
                      </td>
                      <td>
                        <button
                          className="btn btn-light"
                          title="View Details"
                          onClick={() => onViewDetails(d)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            className="bi bi-eye"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination w-100">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Clients;
