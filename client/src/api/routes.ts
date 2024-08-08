export const APIEndpoints = {
  auth: {
    register: "/auth/register",
  },
};

export const getApiEndpointUrl = (endpoint: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}${
    endpoint.startsWith("/") ? "" : "/"
  }${endpoint}`;
};
