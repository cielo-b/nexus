"use client";

import { isBrowser } from "@/config";
import axios from "axios";

export const PUBLIC_API = axios.create({
  baseURL: isBrowser ? `${document.location.origin}/api/v1`: 'http://localhost:3000/api/v1',
});