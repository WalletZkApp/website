import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.ZK_WALLET_USER_SERVICE;

export async function POST(request: NextRequest) {
  const res = await request.json();
  const response = await axios.post(`${BASE_URL}/guardians`, res);
  return NextResponse.json(response);
}
