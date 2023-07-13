import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = process.env.ZKWALLET_PRODUCTION_BASE_API_URL;
const ADMIN_LOGIN_URL = process.env.ZKWALLET_PRODUCTION_ADMIN_EMAIL_URL;
const GUARDIANS_URL = process.env.ZKWALLET_PRODUCTION_GUARDIANS_URL;
const ADMIN_EMAIL = process.env.ZKWALLET_PRODUCTION_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ZKWALLET_PRODUCTION_ADMIN_PASSWORD;

export async function POST(request: NextRequest) {
  const res = request.json();
  console.log(res);

  const {
    registrationNumber,
    companyName,
    description,
    address,
    city,
    state,
    zip,
    country,
    email,
    phonenumber,
    website,
    wallet,
  } = res;

  // first we need to login to get the token
  const response = await login();
  console.log(response);
  if (response.status === 200 && response.body) {
    const body = {
      registrationNumber,
      email,
      phonenumber,
      website,
      status: {
        id: 1,
        name: "Active",
      },
    };

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${response.body.token}`,
      },
    };

    const url = `${BASE_URL}/${GUARDIANS_URL}`;

    const guardiansResponse = await axios.post(url, body, options);

    const dataResponse = await guardiansResponse.data;
    return NextResponse.json({ dataResponse });
  }

  return NextResponse.json({ res });
}

export async function GET(request: NextRequest) {
  const res = request.json();
  console.log(res);

  // first we need to login to get the token
  const response = await login();
  console.log(response);
  if (response.status === 200) {
  }

  return NextResponse.json({ response });
}

async function login() {
  const body = {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  };

  const options = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };

  const url = `${BASE_URL}/${ADMIN_LOGIN_URL}`;

  const response = await axios.post(url, body, options);

  const dataResponse = await response.data;
  return NextResponse.json({ dataResponse });
}
