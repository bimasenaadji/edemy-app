import microsoftLogo from "../../assets/microsoft_logo.svg";
import wallmartLogo from "../../assets/walmart_logo.svg";
import accentureLogo from "../../assets/accenture_logo.svg";
import adobeLogo from "../../assets/adobe_logo.svg";
import paypallLogo from "../../assets/paypal_logo.svg";

const Companies = () => {
  return (
    <div className="pt-16">
      <p className="text-base text-desc text-center">
        Trusted by learners from
      </p>
      <div className="flex items-center flex-wrap gap-6 md:gap-16 mt-5 md:mt-10  ">
        <img
          src={microsoftLogo}
          alt="Microsoft Logo"
          className="w-20 md:w-28"
        />
        <img src={wallmartLogo} alt="Walmart Logo" className="w-20 md:w-28" />
        <img
          src={accentureLogo}
          alt="Accenture Logo"
          className="w-20 md:w-28"
        />
        <img src={adobeLogo} alt="Adobe Logo" className="w-20 md:w-28" />
        <img src={paypallLogo} alt="PayPal Logo" className="w-20 md:w-28" />
      </div>
    </div>
  );
};

export default Companies;
