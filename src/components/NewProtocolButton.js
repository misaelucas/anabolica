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
          className="bg-color text-white drop-shadow-xl rounded drop-shadow hover:text-pink-700 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300	cursive  hover:bg-color  p-4 mt-6"
        >
          Create a new protocol
        </button>
      </div>
    );
  }
  return <p></p>;
};
