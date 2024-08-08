import { APIEndpoints, getApiEndpointUrl } from "@/api";

type RegisterUserRequestArgs = {};

export const registerUserRequest = async ({}: RegisterUserRequestArgs) => {
  const payload = {
    email: "emaiaasdasrsdfssadsddasscdweadal@gmail.com",
    name: "name",
    password: "passwo_rD1a",
  };

  const newUser = await fetch(getApiEndpointUrl(APIEndpoints.auth.register), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "emaiasdfssafsadsddassscdweadal@gmail.com",
      name: "name sda",
      password: "passwo_rD1a",
    }),
  });

  //   return await newUser.json();
};
