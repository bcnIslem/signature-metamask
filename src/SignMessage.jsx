import { useState, useRef } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";

const signMessage = async ({ setError, message }) => {
  try {
    console.log({ message });
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address,
    };
  } catch (err) {
    setError(err.message);
  }
};

export default function SignMessage() {
  const resultBox = useRef();
  const [signatures, setSignatures] = useState([]);
  const [error, setError] = useState();

  const handleSign = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    const sig = await signMessage({
      setError,
      message: data.get("message"),
    });
    if (sig) {
      setSignatures([...signatures, sig]);
    }
  };

  return (
    <form className="sig" onSubmit={handleSign}>
      <div className="sig-div">
        <main className="sig-main">
          <h1 className="sig-text">Sign messages</h1>
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
          </div>
        </main>
        {/* <footer className="p-4"> */}
        <button type="submit" className="btn">
          Sign message
        </button>
        <ErrorMessage message={error} />
        {/* </footer> */}
        {signatures.map((sig, idx) => {
          return (
            <div className="sig-div" key={sig}>
              <div>
                <p className="sig-text">
                  Message {idx + 1}: {sig.message}
                </p>
                <p className="sig-signer">Signer: {sig.address}</p>
                <textarea
                  type="text"
                  readOnly
                  ref={resultBox}
                  className="textarea"
                  placeholder="Generated signature"
                  value={sig.signature}
                />
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}
