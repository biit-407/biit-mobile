import { OauthToken } from "../models/azure";

export interface ResponseJsonType {
  message: string;
  status_code: number; // eslint-disable-line camelcase
}

export interface AuthenticatedResponseJsonType extends ResponseJsonType {
  access_token: string; // eslint-disable-line camelcase
  refresh_token: string; // eslint-disable-line camelcase
}

export type Json = Record<string, unknown>;

export class AuthenticatedRequestHandler {
  private static async request<
    T,
    R extends AuthenticatedResponseJsonType,
    B extends Json
  >(
    method: string,
    url: string,
    responseHandler: (responseJson: R) => T,
    body?: B
  ): Promise<[T, OauthToken]> {
    return await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return [
          responseHandler(responseJson),
          {
            refreshToken: responseJson.refresh_token,
            accessToken: responseJson.access_token,
          },
        ];
      });
  }

  public static async post<
    T,
    R extends AuthenticatedResponseJsonType,
    B extends Json
  >(
    url: string,
    responseHandler: (responseJson: R) => T,
    body?: B
  ): Promise<[T, OauthToken]> {
    return await AuthenticatedRequestHandler.request<T, R, B>(
      "POST",
      url,
      responseHandler,
      body
    );
  }

  public static async get<
    T,
    R extends AuthenticatedResponseJsonType,
    B extends Json
  >(
    url: string,
    responseHandler: (responseJson: R) => T,
    body?: B
  ): Promise<[T, OauthToken]> {
    return await AuthenticatedRequestHandler.request<T, R, B>(
      "GET",
      url,
      responseHandler,
      body
    );
  }

  public static async put<
    T,
    R extends AuthenticatedResponseJsonType,
    B extends Json
  >(
    url: string,
    responseHandler: (responseJson: R) => T,
    body?: B
  ): Promise<[T, OauthToken]> {
    return await AuthenticatedRequestHandler.request<T, R, B>(
      "PUT",
      url,
      responseHandler,
      body
    );
  }

  public static async delete<
    T,
    R extends AuthenticatedResponseJsonType,
    B extends Json
  >(
    url: string,
    responseHandler: (responseJson: R) => T,
    body?: B
  ): Promise<[T, OauthToken]> {
    return await AuthenticatedRequestHandler.request<T, R, B>(
      "DELETE",
      url,
      responseHandler,
      body
    );
  }
}

export class RequestHandler {
  private static async request<T, R extends ResponseJsonType, B extends Json>(
    method: string,
    url: string,
    responseHandler: (responseJson: R) => T,
    body?: B
  ): Promise<T> {
    return await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseHandler(responseJson);
      });
  }

  public static async post<T, R extends ResponseJsonType, B extends Json>(
    url: string,
    responseHandler: (responseJson: R) => T,
    body?: B
  ): Promise<T> {
    return await RequestHandler.request<T, R, B>(
      "POST",
      url,
      responseHandler,
      body
    );
  }

  public static async get<T, R extends ResponseJsonType, B extends Json>(
    url: string,
    responseHandler: (responseJson: R) => T,
    body?: B
  ): Promise<T> {
    return await RequestHandler.request<T, R, B>(
      "GET",
      url,
      responseHandler,
      body
    );
  }

  public static async put<T, R extends ResponseJsonType, B extends Json>(
    url: string,
    responseHandler: (responseJson: R) => T,
    body?: B
  ): Promise<T> {
    return await RequestHandler.request<T, R, B>(
      "PUT",
      url,
      responseHandler,
      body
    );
  }

  public static async delete<T, R extends ResponseJsonType, B extends Json>(
    url: string,
    responseHandler: (responseJson: R) => T,
    body?: B
  ): Promise<T> {
    return await RequestHandler.request<T, R, B>(
      "DELETE",
      url,
      responseHandler,
      body
    );
  }
}
