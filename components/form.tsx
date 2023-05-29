// Context
import { useContext } from "react";
import { ThemeContext } from "@/context/theme_context";
import { useTranslations } from "next-intl";

// Mui
import { Button, IconButton } from "@mui/material";
import GithubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";

function Form() {
  const { theme } = useContext(ThemeContext);
  const t = useTranslations("Index");

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
          <div className="text-[1.5rem] md:text-[2rem] text-center font-semibold">
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
          <Button
            type="submit"
            variant="contained"
            className="bg-primary hover:bg-primary"
            sx={{ paddingBlock: "10px" }}
          >
            {t("Subscribe")}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Form;
