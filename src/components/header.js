import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import saitama from "../assets/saitama.png";

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
    <div className="flex text-lg justify-between nav pt-3 w-full h-14  bg-[#17223B] text-white underline underline-offset-4 font-semibold ">
      <div>
        <Link to="/">
          <img src={saitama} className="pr-2 ml-4 -mt-2 w-16" />
        </Link>
      </div>
      <div className="flex  space-x-2 mt-1  ">
        <div className=" ">
          <Link className=" hover:text-gray-200" to="/faq">
            faq
          </Link>
        </div>
        <div>
          <Link className=" hover:text-gray-200" to="/contact">
            contact
          </Link>
        </div>
      </div>

      <div className="flex  pr-4 mt-1 justify-between ">
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
