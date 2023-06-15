import { type NextRequest, NextResponse } from "next/server";
// import { headers } from "next/headers";
import axios from "axios";

const API_KEY = process.env.MAILERLITE_PRODUCTION_API_KEY;
const BASE_URL = process.env.MAILERLITE_PRODUCTION_BASE_API_URL;
const JOIN_WAITLIST_GROUP_ID =
  process.env.MAILERLITE_PRODUCTION_JOIN_WAITLIST_GROUP_ID;
const NEWSLETTER_GROUP_ID =
  process.env.MAILERLITE_PRODUCTION_NEWSLETTER_GROUP_ID;

export async function POST(request: NextRequest) {
  const res = await request.json();

  const { ip_address, email, firstname, lastname, groupName } = res;

  let groupId;
  if (groupName === "joinlist") {
    groupId = JOIN_WAITLIST_GROUP_ID;
  } else {
    groupId = NEWSLETTER_GROUP_ID;
  }

  const body = {
    email: email,
    ip_address: ip_address,
    fields: {
      name: firstname,
      last_name: lastname,
    },
    groups: [`${groupId}`],
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const url = `${BASE_URL}/subscribers`;

  const response = await axios.post(url, body, options);

  const dataResponse = await response.data;
  return NextResponse.json({ dataResponse });
}
