import { Link, useNavigate } from "react-router";
import logoItAcademy from "../../assets/LogoItAcademy.svg";
import addIcon from "../../assets/add.svg";
import settingsIcon from "../../assets/settings.svg";
import userIcon from "../../assets/user2.svg";
import searchIcon from "../../assets/search.svg";
import ButtonComponent from "../atoms/ButtonComponent";
import { useCtxUser } from "../../hooks/useCtxUser";

const HeaderComponent = () => {
  const { user } = useCtxUser();
  const navigate = useNavigate();

  const goToResourcesPage = () => {
    navigate("/resource/add");
  };
  return (
    <header className="bg-[#ebebeb] p-6 pt-0 px-0 flex items-center justify-between">
      <Link to="/">
        <img src={logoItAcademy} alt="logo" width={"116px"} />
      </Link>
      <div className="flex">
        <div className="relative mr-[120px] cursor-pointer">
          <input
            type="text"
            placeholder="Buscar recurso"
            className="bg-white pl-10 pr-4 py-2 border border-white font-semibold text-base rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-[#808080]"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#808080] ">
            <svg
              xmlns={searchIcon}
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.42-1.42l4.83 4.83a1 1 0 01-1.42 1.42l-4.83-4.83zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {user && (
          <ButtonComponent
            icon={addIcon}
            variant="icon"
            onClick={goToResourcesPage}
          />
        )}
        <div className="flex justify-center items-center mx-2">
          <select
            id="languages"
            name="languages"
            title="lang"
            className="bg-white py-2 px-4 text-[#808080] rounded-lg border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#808080] focus:border-transparent"
          >
            <option value="es">ES</option>
            <option value="es">EN</option>
          </select>
        </div>
        <ButtonComponent icon={settingsIcon} variant="icon" />
        <div className="mr-[-10px]">
          <ButtonComponent icon={userIcon} variant="icon" />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
