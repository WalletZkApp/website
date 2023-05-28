import { useTranslations } from "use-intl";

function Hero() {
  const t = useTranslations("Index");
  return (
    <div id="Hero" className="py-5 md:py-12 lg:py-16">
      <div className="flex flex-col md:items-center md:flex-row max-w-7xl mx-auto p-5">
        <div className="w-full lg:w-[60%] text-center md:text-left">
          <div className="text-[2rem] lg:text-[3.5rem] font-semibold">
            {t("Welcome to")}
          </div>
          <div className="text-gd text-[2rem] lg:text-[3.5rem] font-semibold">
            {t("ZK WALLET !")}
          </div>
          <div className="mt-5 md:max-w-[80%]">
            {t(
              "With a ZK wallet, the transaction details are encrypted and the zero-knowledge proof ensures that the transaction is valid"
            )}
          </div>
          <form className="flex flex-col md:flex-row md:items-center md:space-x-5 mt-8">
            <input
              className="bg-white px-5 py-3 drop-shadow-lg w-full md:w-[20rem] rounded-md text-black"
              placeholder={t("Enter your email")}
              required
            />
            <button className="button-gd px-8 py-3 drop-shadow-md rounded-md text-white font-semibold mt-5 md:mt-0">
              {t("Join Waitlist")}
            </button>
          </form>
          <div className="mt-10 md:hidden">
            <img
              className="drop-shadow-xl border"
              src="/assets/mockup.png"
              alt=""
            />
          </div>
        </div>
        <div className="hidden md:block w-full lg:w-[40%] mt-12 md:mt-0">
          <img
            className="h-[20rem] object-contain drop-shadow-xl"
            src="/zkwallet.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
