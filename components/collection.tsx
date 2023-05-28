import { ThemeContext } from "@/context/theme_context";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useContext } from "react";

function Collection() {
  const t = useTranslations("Index");
  const { theme } = useContext(ThemeContext);
  return (
    <div id="collection" className="max-w-7xl mx-auto p-5 py-12 lg:py-16">
      <div className="text-[1.5rem] md:text-[2rem] font-semibold">MR20</div>
      <div className="w-full overflow-x-auto mt-5">
        <table className="w-full">
          <thead>
            <tr className="uppercase text-right text-gray-400 font-medium">
              <th className="text-left">{t("Collection")}</th>
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
            {collections.map((x, index) => {
              return (
                <tr
                  key={index}
                  className={`text-right cursor-pointer ${
                    theme === "light"
                      ? "hover:bg-gray-100"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <td className="text-left">
                    <div className="flex items-center space-x-8">
                      <div>{index + 1}</div>
                      <div className="flex items-center space-x-3">
                        <img src={x.avatar} alt="" />
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
                          x.floorChange >= 0 ? "text-green-500" : "text-red-500"
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
        <div
          className={`${
            theme === "light" ? "bg-gray-100" : "bg-gray-700"
          } mt-8 p-5 rounded-md cursor-pointer hover:brightness-[0.99]`}
        >
          <div
            className={`w-full font-semibold text-center ${
              theme === "light" ? "text-gd" : "text-white"
            }`}
          >
            View All Collections
          </div>
        </div>
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
    avatar: "/assets/avatars/avatar_1.png",
    label: "Otherdeed",
    floorPrice: 1.568,
    floorChange: 89.2,
    volume: 726.2,
    volumeChange: 88.1,
    items: 100,
    owners: 33.3,
  },
  {
    avatar: "/assets/avatars/avatar_1.png",
    label: "MutantApeYachtClub",
    floorPrice: 12.46,
    floorChange: -3.3,
    volume: 627.3,
    volumeChange: 52.8,
    items: 19.5,
    owners: 11.9,
  },
  {
    avatar: "/assets/avatars/avatar_1.png",
    label: "HV-MTL",
    floorPrice: 1.98,
    floorChange: -2.5,
    volume: 246.2,
    volumeChange: -12.7,
    items: 23.8,
    owners: 8.8,
  },
  {
    avatar: "/assets/avatars/avatar_1.png",
    label: "Wrapped Cryptopunks",
    floorPrice: 74.83,
    floorChange: 0,
    volume: 244.2,
    volumeChange: 0,
    items: 911,
    owners: 110,
  },
  {
    avatar: "/assets/avatars/avatar_1.png",
    label: "V1 Cryptopunks (Wrapped)",
    floorPrice: 4.278,
    floorChange: 4.3,
    volume: 194.3,
    volumeChange: 508.2,
    items: 3.9,
    owners: 982,
  },
  {
    avatar: "/assets/avatars/avatar_1.png",
    label: "Azuki",
    floorPrice: 13.2,
    floorChange: -25.7,
    volume: 188.7,
    volumeChange: 306.3,
    items: 10,
    owners: 5,
  },
  {
    avatar: "/assets/avatars/avatar_1.png",
    label: "MG Land",
    floorPrice: 0.036,
    floorChange: 5.9,
    volume: 162.3,
    volumeChange: 70.3,
    items: 5,
    owners: 2.4,
  },
  {
    avatar: "/assets/avatars/avatar_1.png",
    label: "Nakamigos",
    floorPrice: 0.019,
    floorChange: -52.5,
    volume: 161,
    volumeChange: 110,
    items: 20,
    owners: 4.1,
  },
  {
    avatar: "/assets/avatars/avatar_1.png",
    label: "CloneX",
    floorPrice: 3.34,
    floorChange: -2.3,
    volume: 147.8,
    volumeChange: 1.1,
    items: 19.5,
    owners: 10,
  },
];

export default Collection;
