import { baseUrl } from "../main";

// refreshes current authToken with a new one using refreshToken.
// returns null if function fails to do so
async function refreshToken() {
  const oldToken = localStorage.getItem("authToken");
  const refToken = localStorage.getItem("refreshToken");
  console.log("fetching new token with following tokens: ", oldToken, refToken);
  if (oldToken == null || refToken == null) {
    return null;
  }
  const response = await fetch(`http://${baseUrl}:8080/api/auth/refreshToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: refToken,
    }),
  });
  console.log("response: ", response);

  if (!response.ok) return null;
  const newToken = await response.json();
  localStorage.setItem("authToken", newToken.accessToken);
  console.log("Sucessfully fetched new token with your old token: ", newToken);
  return newToken.accessToken;
}

export default refreshToken;