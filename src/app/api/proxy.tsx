import { getToken } from "@/lib/auth";
import { Headers } from "@/types/index";

export default class ApiProxy {
  static getHeaders(requireAuth: boolean): Headers {
    const authToken = getToken();
    let headers: Headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (authToken && requireAuth) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    return headers;
  }
  static async post(endpoint: string, object: Object, requireAuth: boolean) {
    const jsonData = JSON.stringify(object);
    const requestOptions = {
      method: "POST",
      headers: ApiProxy.getHeaders(requireAuth),
      body: jsonData,
    };
    return await ApiProxy.handleFetch(endpoint, requestOptions);
  }

  static async get(endpoint: string, requireAuth: boolean) {
    const requestOptions = {
      method: "GET",
      headers: ApiProxy.getHeaders(requireAuth),
    };
    return await ApiProxy.handleFetch(endpoint, requestOptions);
  }

  static async handleFetch(endpoint: string, requestOptions: Object) {
    let data = {};
    let status = 500;
    try {
      const response = await fetch(endpoint, requestOptions);
      data = await response.json();
      status = response.status;
    } catch (error) {
      data = { message: `Cannot reach API server`, error: error };
      status = 500;
    }
    return { data, status };
  }
}
