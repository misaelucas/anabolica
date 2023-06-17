import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

export const NewProtocolButton = () => {
  const [user, loading, error] = useAuthState(auth);
  const goToCreateProtocol = () => {
    navigate("/new");
  };
  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <p></p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div className="flex justify-center">
        <button
          onClick={goToCreateProtocol}
          className="bg-[#17223B] font-mono text-lg drop-shadow-xl rounded  drop-shadow hover:bg-[#030617]  p-3 mt-6 text-white"
        >
          Create a new protocol!
        </button>
      </div>
    );
  }
  return <p></p>;
};
