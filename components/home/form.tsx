// Context
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/theme_context";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Mui
import { IconButton } from "@mui/material";
import GithubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";

type Props = {
  ip: string;
};

function Form(props: Props) {
  const { theme } = useContext(ThemeContext);
  const t = useTranslations("Index");
  const [joinedNewsletter, setJoinedNewsletter] = React.useState(false);

  const [agree, setAgree] = useState(false);
  const ip_address = props.ip;

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    firstname: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastname: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    agree: Yup.boolean()
      .required("Agree is required")
      .oneOf([true], "You must accept the terms and conditions"),
  })

  const formOptions = {
    resolver: yupResolver(validationSchema),
  }

  const { handleSubmit, register, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmitHandler = (input: any) => {
    mailerlite(input.email, input.firstname, input.lastname, ip_address)
  }

  async function mailerlite(email: string, firstname: string, lastname: string, ip_address: string) {
    const response = await fetch('/api/mailerlite', {
      method: 'POST',
      body: JSON.stringify({
        groupName: "newsletter",
        firstname,
        lastname,
        email,
        ip_address,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (response.status === 200) {
      setJoinedNewsletter(true);
    }
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto p-5 py-12 lg:py-16">
        <div className="flex justify-center space-x-5">
          <IconButton onClick={() => window.open("https://github.com/walletZkapp")}>
            <GithubIcon
              sx={{
                fontSize: "64px",
                color: `${theme === "light" ? "black" : "white"}`,
              }}
            />
          </IconButton>
          <IconButton onClick={() => window.open("https://t.me/walletZkApp")}>
            <TelegramIcon
              sx={{
                fontSize: "64px",
                color: `${theme === "light" ? "black" : "white"}`,
              }}
            />
          </IconButton>
        </div>
        {joinedNewsletter && <div className="replaceForm"></div>}
        {!joinedNewsletter &&
          <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col space-y-6 mt-10">
            <div className="text-[1.5rem] md:text-[2.5rem] text-center text-light-gd tracking-widest">
              {t("Subscribe to Our Newsletter")}
            </div>
            <input
              className="border p-5 bg-transparent"
              required
              placeholder="First Name"
              {...register('firstname')}
            />
            <div className="invalid-feedback">{errors.firstname?.message}</div>
            <input
              className="border p-5 bg-transparent"
              required
              placeholder="Last Name"
              {...register('lastname')}
            />
            <div className="invalid-feedback">{errors.lastname?.message}</div>
            <input
              className="border p-5 bg-transparent"
              required
              placeholder="Email"
              type="email"
              {...register('email')}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>

            <div className="flex space-x-3 px-1">
              <div>
                <input {...register('agree')} onClick={() => setAgree(!agree)} type="checkbox"></input>
              </div>
              <div>
                {t(
                  "I agree to receive e-mails from your company and your terms and conditions"
                )}
              </div>
              <div className="invalid-feedback">{errors.agree?.message}</div>
            </div>
            <button
              type="submit"
              className="bg-primary hover:brightness-[1.1] py-4 text-white rounded-md"
            >
              Subscribe
            </button>
          </form>
        }
      </div>
    </div>
  );
}

export default Form;
