// Context
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/theme_context";
import { useTranslations } from "next-intl";

// Mui
import { Button, Checkbox, IconButton } from "@mui/material";
import GithubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";

function Form() {
  const { theme } = useContext(ThemeContext);
  const t = useTranslations("Index");

  const [agree, setAgree] = useState(false);

  return (
    <div>
      <div className="max-w-7xl mx-auto p-5 py-12 lg:py-16">
        <div className="flex justify-center space-x-5">
          <IconButton onClick={() => window.open("https://www.github.com")}>
            <GithubIcon
              sx={{
                fontSize: "64px",
                color: `${theme === "light" ? "black" : "white"}`,
              }}
            />
          </IconButton>
          <IconButton onClick={() => window.open("https://www.telegram.com")}>
            <TelegramIcon
              sx={{
                fontSize: "64px",
                color: `${theme === "light" ? "black" : "white"}`,
              }}
            />
          </IconButton>
        </div>
        <form className="flex flex-col space-y-6 mt-10">
          <div className="text-[1.5rem] md:text-[2.5rem] text-center text-light-gd font-extralight tracking-widest">
            {t("Subscribe to Our Newsletter")}
          </div>
          <input
            className="border p-5 bg-transparent"
            required
            placeholder="First Name"
          />
          <input
            className="border p-5 bg-transparent"
            required
            placeholder="Last Name"
          />
          <input
            className="border p-5 bg-transparent"
            required
            placeholder="Email"
            type="email"
          />

          <div className="flex space-x-3 px-1">
            <div>
              <input onClick={() => setAgree(!agree)} type="checkbox"></input>
            </div>
            <div>
              {t(
                "I agree to receive e-mails from your company and your terms and conditions"
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary hover:brightness-[1.1] py-4 text-white rounded-md"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
