import React from "react";

function ErrorMsgModal({ errMsg, setShowErrMsg }) {
  return (
    <div className="modal-overlay">
      <div className="network-modal">
        <h3 className="text-center">
          {errMsg ? (
            errMsg
          ) : (
            <>
              Network Error: An error has occurred.<br></br>Please try again.
            </>
          )}
        </h3>
        <div className=" text-center ">
          <button
            className="btn btn-warning w-50"
            onClick={() => setShowErrMsg(false)}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorMsgModal;
