import { useEffect, useState } from "react";
import { getCookie, CookieValueTypes } from "cookies-next";
import { decodeUserInfo } from "../utils";
import { UserInfo } from "@/types/entities";

export default function useCredentials() {
  const [credentials, setCredentials] = useState<UserInfo>({
    sub: "",
    email: ""
  });

  useEffect(() => {
    const token: CookieValueTypes = getCookie("access_token");
    if (token) {
      const userInfo =decodeUserInfo(token);
      setCredentials(userInfo);
    } else {
      setCredentials({ sub: "", email: "" });
    }
  }, []);

  return credentials;
}
