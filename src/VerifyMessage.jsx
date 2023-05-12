import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

const verifyMessage = async ({ message, address, signature }) => {
  try {
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default function VerifyMessage() {
  const [error, setError] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const handleVerification = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setSuccessMsg();
    setError();
    const isValid = await verifyMessage({
      setError,
      message: data.get("message"),
      address: data.get("address"),
      signature: data.get("signature"),
    });

    if (isValid) {
      setSuccessMsg("Signature is valid!");
    } else {
      setError("Invalid signature");
    }
  };

  return (
    <form className="v" onSubmit={handleVerification}>
      <div className="v-div">
        <main>
          <h1 className="v-text">Verify signature</h1>
          <div className="">
            <div>
              <textarea
                rows={3}
                required
                type="text"
                name="message"
                className="textarea"
                placeholder="Message"
              />
            </div>
            <div>
              <textarea
                rows={3}
                required
                type="text"
                name="signature"
                className="textarea"
                placeholder="Signature"
              />
            </div>
            <div>
              <textarea
                rows={3}
                required
                type="text"
                name="address"
                className="textarea"
                placeholder="Signer address"
              />
            </div>
          </div>
        </main>
        <button type="submit" className="btn">
          Verify signature
        </button>
        <div className="">
          <ErrorMessage message={error} />
          <SuccessMessage message={successMsg} />
        </div>
      </div>
    </form>
  );
}
