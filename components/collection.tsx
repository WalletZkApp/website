import { ThemeContext } from "@/context/theme_context";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";

function Collection() {
  const t = useTranslations("Index");
  const [tickerLength, setTickerLength] = useState(10);
  const { theme } = useContext(ThemeContext);
  const [menu, setMenu] = useState("Collection");

  const menus = [
    {
      label: "NFT",
      tab: "Collection",
    },
    {
      label: "MR20",
      tab: "Ticker",
    },
  ];

  return (
    <div id="collection" className="relative">
      <div
        className={`top-[-200px] hidden lg:block absolute rounded-full left-[-40%] h-[1250px] w-[1250px] circle-gd`}
      ></div>
      <div className="max-w-7xl mx-auto p-5 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
          <div className="text-[1.5rem] md:text-[2rem] font-semibold">MR20</div>
          <div
            className={`flex items-center border rounded-full overflow-hidden ${
              theme === "light" ? "" : "border-gray-700"
            } mt-5 md:mt-0 w-fit`}
          >
            {menus.map((x) => {
              return (
                <div
                  key={x.tab}
                  onClick={() => setMenu(x.tab)}
                  className={`px-10 py-2 ${
                    menu === x.tab ? "bg-primary rounded-full text-white" : ""
                  } transition-all cursor-pointer text-center`}
                >
                  {x.label}
                </div>
              );
            })}
          </div>
        </div>

        {menu === "Collection" ? (
          <div className="w-full overflow-x-auto mt-5">
            <table className="w-full">
              <thead>
                <tr className="uppercase text-right text-gray-400 font-medium">
                  <th className="text-left w-[400px]">Collection</th>
                  <th>{t("Floor Price")}</th>
                  <th>{t("Floor Change")}</th>
                  <th>{t("Volume")}</th>
                  <th>{t("Volume Change")}</th>
                  <th>{t("Items")}</th>
                  <th>{t("Owners")}</th>
                </tr>
              </thead>
              <tbody
                className={`${
                  theme === "light" ? "bg-white border" : "bg-background"
                } drop-shadow-md `}
              >
                {nft.slice(0, tickerLength).map((x, index) => {
                  return (
                    <tr
                      key={x.label}
                      className={`text-right cursor-pointer ${
                        theme === "light"
                          ? "hover:bg-gray-100"
                          : "hover:bg-gray-700"
                      } transition-all`}
                    >
                      <td className="text-left">
                        <div className="flex items-center space-x-8">
                          <div className="w-[20px]">{index + 1}</div>
                          <div className="flex items-center space-x-3">
                            <div className="h-[2.5rem] w-[2.5rem] flex justify-center items-center rounded-md">
                              <img
                                className="object-contain"
                                src={x.avatar}
                                alt=""
                              />
                            </div>
                            <div className="whitespace-nowrap font-semibold">
                              {x.label}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="font-semibold">{x.floorPrice}</span>{" "}
                        <span className="font-light">ETH</span>
                      </td>
                      <td>
                        <div>
                          <span
                            className={`${
                              x.floorChange >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {x.floorChange >= 0 ? "+" : ""}
                            {x.floorChange}%
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="whitespace-nowrap">
                          <span className="font-semibold">{x.volume}</span>{" "}
                          <span className="font-light">ETH</span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span
                            className={`${
                              x.volumeChange >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {x.volumeChange >= 0 ? "+" : ""}
                            {x.volumeChange}%
                          </span>
                        </div>
                      </td>
                      <td className="font-semibold">{x.items}K</td>
                      <td className="font-semibold">{x.owners}K</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto mt-5">
              <table className="w-full">
                <thead>
                  <tr className="uppercase text-right text-gray-400 font-medium">
                    <th className="text-left w-[400px]">Ticker</th>
                    <th>{t("Floor Price")}</th>
                    <th>{t("Floor Change")}</th>
                    <th>{t("Volume")}</th>
                    <th>{t("Volume Change")}</th>
                    <th>{t("Items")}</th>
                    <th>{t("Owners")}</th>
                  </tr>
                </thead>
                <tbody
                  className={`${
                    theme === "light" ? "bg-white border" : "bg-background"
                  } drop-shadow-md `}
                >
                  {collections.slice(0, tickerLength).map((x, index) => {
                    return (
                      <tr
                        key={x.label}
                        className={`text-right cursor-pointer ${
                          theme === "light"
                            ? "hover:bg-gray-100"
                            : "hover:bg-gray-700"
                        } transition-all`}
                      >
                        <td className="text-left">
                          <div className="flex items-center space-x-8">
                            <div className="w-[20px]">{index + 1}</div>
                            <div className="flex items-center space-x-3">
                              <div className="h-[2.5rem] w-[2.5rem] flex justify-center items-center rounded-md">
                                <img
                                  className="object-contain"
                                  src={x.avatar}
                                  alt=""
                                />
                              </div>
                              <div className="whitespace-nowrap font-semibold">
                                {x.label}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="font-semibold">{x.floorPrice}</span>{" "}
                          <span className="font-light">ETH</span>
                        </td>
                        <td>
                          <div>
                            <span
                              className={`${
                                x.floorChange >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {x.floorChange >= 0 ? "+" : ""}
                              {x.floorChange}%
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="whitespace-nowrap">
                            <span className="font-semibold">{x.volume}</span>{" "}
                            <span className="font-light">ETH</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span
                              className={`${
                                x.volumeChange >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {x.volumeChange >= 0 ? "+" : ""}
                              {x.volumeChange}%
                            </span>
                          </div>
                        </td>
                        <td className="font-semibold">{x.items}K</td>
                        <td className="font-semibold">{x.owners}K</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {tickerLength === 10 ? (
              <div
                onClick={() => setTickerLength(collections.length)}
                className={`${
                  theme === "light" ? "bg-gray-100" : "bg-gray-700"
                } mt-8 p-5 rounded-md cursor-pointer hover:brightness-[0.9]`}
              >
                <div
                  className={`w-full font-semibold text-center ${
                    theme === "light" ? "text-gd" : "text-white"
                  }`}
                >
                  {t("View All Tickers")}
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface collection {
  avatar: string;
  label: string;
  floorPrice: number;
  floorChange: number;
  volume: number;
  volumeChange: number;
  items: number;
  owners: number;
}

const collections: collection[] = [
  {
    avatar: "/assets/avatars/avatar_11.png",
    label: "ZKWALLET",
    floorPrice: 3.34,
    floorChange: -2.3,
    volume: 5.089,
    volumeChange: 1.1,
    items: 19.5,
    owners: 10,
  },
  {
    avatar: "/assets/avatars/avatar_1.png",
    label: "Bored Age Yacht Club",
    floorPrice: 57.5,
    floorChange: -8,
    volume: 1.275,
    volumeChange: 625,
    items: 10,
    owners: 6,
  },
  {
    avatar: "/assets/avatars/avatar_2.png",
    label: "Otherdeed",
    floorPrice: 1.568,
    floorChange: 89.2,
    volume: 726.2,
    volumeChange: 88.1,
    items: 100,
    owners: 33.3,
  },
  {
    avatar: "/assets/avatars/avatar_3.png",
    label: "MutantApeYachtClub",
    floorPrice: 12.46,
    floorChange: -3.3,
    volume: 627.3,
    volumeChange: 52.8,
    items: 19.5,
    owners: 11.9,
  },
  {
    avatar: "/assets/avatars/avatar_4.png",
    label: "HV-MTL",
    floorPrice: 1.98,
    floorChange: -2.5,
    volume: 246.2,
    volumeChange: -12.7,
    items: 23.8,
    owners: 8.8,
  },
  {
    avatar: "/assets/avatars/avatar_5.png",
    label: "Wrapped Cryptopunks",
    floorPrice: 74.83,
    floorChange: 0,
    volume: 244.2,
    volumeChange: 0,
    items: 911,
    owners: 110,
  },
  {
    avatar: "/assets/avatars/avatar_6.png",
    label: "V1 Cryptopunks (Wrapped)",
    floorPrice: 4.278,
    floorChange: 4.3,
    volume: 194.3,
    volumeChange: 508.2,
    items: 3.9,
    owners: 982,
  },
  {
    avatar: "/assets/avatars/avatar_7.png",
    label: "Azuki",
    floorPrice: 13.2,
    floorChange: -25.7,
    volume: 188.7,
    volumeChange: 306.3,
    items: 10,
    owners: 5,
  },
  {
    avatar: "/assets/avatars/avatar_8.png",
    label: "MG Land",
    floorPrice: 0.036,
    floorChange: 5.9,
    volume: 162.3,
    volumeChange: 70.3,
    items: 5,
    owners: 2.4,
  },
  {
    avatar: "/assets/avatars/avatar_9.png",
    label: "Nakamigos",
    floorPrice: 0.019,
    floorChange: -52.5,
    volume: 161,
    volumeChange: 110,
    items: 20,
    owners: 4.1,
  },
  {
    avatar: "/assets/avatars/avatar_10.png",
    label: "CloneX",
    floorPrice: 3.34,
    floorChange: -2.3,
    volume: 147.8,
    volumeChange: 1.1,
    items: 19.5,
    owners: 10,
  },
  {
    avatar: "/assets/avatars/avatar_12.png",
    label: "SZBIT",
    floorPrice: 3.34,
    floorChange: -2.3,
    volume: 147.8,
    volumeChange: 1.1,
    items: 19.5,
    owners: 10,
  },
  {
    avatar: "/assets/avatars/avatar_13.png",
    label: "SPEPE",
    floorPrice: 3.34,
    floorChange: -2.3,
    volume: 147.8,
    volumeChange: 1.1,
    items: 19.5,
    owners: 10,
  },
  {
    avatar: "/assets/avatars/avatar_14.png",
    label: "SOSHI",
    floorPrice: 3.34,
    floorChange: -2.3,
    volume: 147.8,
    volumeChange: 1.1,
    items: 19.5,
    owners: 10,
  },
  {
    avatar: "/assets/avatars/avatar_15.png",
    label: "SMAP0",
    floorPrice: 3.34,
    floorChange: -2.3,
    volume: 147.8,
    volumeChange: 1.1,
    items: 19.5,
    owners: 10,
  },
  {
    avatar: "/assets/avatars/avatar_16.png",
    label: "SXING",
    floorPrice: 3.34,
    floorChange: -2.3,
    volume: 147.8,
    volumeChange: 1.1,
    items: 19.5,
    owners: 10,
  },
];

const nft = [
  {
    avatar: "/assets/avatars/avatar_17.png",
    label: "Sub 100k",
    floorPrice: 3.34,
    floorChange: -2.3,
    volume: 147.8,
    volumeChange: 1.1,
    items: 19.5,
    owners: 10,
  },
  {
    avatar: "/assets/avatars/avatar_18.png",
    label: "Pixel Pepes",
    floorPrice: 3.34,
    floorChange: -2.3,
    volume: 147.8,
    volumeChange: 1.1,
    items: 19.5,
    owners: 10,
  },
  {
    avatar: "/assets/avatars/avatar_19.png",
    label: "Bitcoin Frogs",
    floorPrice: 3.34,
    floorChange: -2.3,
    volume: 147.8,
    volumeChange: 1.1,
    items: 19.5,
    owners: 10,
  },
  {
    avatar: "/assets/avatars/avatar_20.png",
    label: "Sat Names",
    floorPrice: 3.34,
    floorChange: -2.3,
    volume: 147.8,
    volumeChange: 1.1,
    items: 19.5,
    owners: 10,
  },
  {
    avatar: "/assets/avatars/avatar_21.png",
    label: "Pepe & Pepita",
    floorPrice: 3.34,
    floorChange: -2.3,
    volume: 147.8,
    volumeChange: 1.1,
    items: 19.5,
    owners: 10,
  },
  {
    avatar: "/assets/avatars/avatar_22.png",
    label: "Sub 10K",
    floorPrice: 3.34,
    floorChange: -2.3,
    volume: 147.8,
    volumeChange: 1.1,
    items: 19.5,
    owners: 10,
  },
];

export default Collection;
