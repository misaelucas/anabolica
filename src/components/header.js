import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();

  const { user, logout } = UserAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="flex text-lg justify-between nav pt-3 w-full h-12 bg-[#17223B] text-white underline underline-offset-4 font-semibold ">
      <div></div>
      <div className="flex bg-[#17223B] space-x-2  ">
        <div className="bg-[#17223B]">
          <Link className="bg-[#17223B] hover:text-gray-200" to="/faq">
            faq
          </Link>
        </div>
        <div>
          <Link className="bg-[#17223B] hover:text-gray-200" to="/contact">
            contact
          </Link>
        </div>
      </div>

      <div className="flex  pr-4 justify-between ">
        {!user ? (
          <Link to="/login" className="text-lg hover:text-gray-200">
            login
          </Link>
        ) : (
          <button onClick={handleLogout} className="mb-2 text-lg">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
