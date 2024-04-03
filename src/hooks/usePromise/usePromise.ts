import { useState, useEffect, useCallback } from "react";

const DEFAULT_ERROR = "Internal Server Error";

export type STATUS_TYPES = "success" | "idle" | "error";
interface IBaseConfig {
  initReq?: boolean;
  defaultRes?: any;
  showError?: boolean;
  showSuccess?: string;
  sleep?: number;
  maxRetries?: number;
  expectedMaxWaitingTime?: number; // in ms
  onSuccess?: (res?: any) => void;
  onError?: (err?: any) => void;
  cachedResponse?: boolean;
  deleteNotificationInMs?: number;
  translationMsgParams?: Record<string, any>;
}

interface IHookState<Response = any> {
  response?: Response;
  loading?: boolean;
  error?: string;
  paramsArray?: any[];
  requestRetries?: number;
  hadRetried?: boolean;
  status?: STATUS_TYPES;
}

export const usePromise = <ResponseType = any, TParams extends any[] = any>(
  promiseFunction: (..._params: any[]) => Promise<ResponseType>,
  baseConfig: IBaseConfig = {}
): [
  (...params: TParams) => Promise<ResponseType>,
  ResponseType | undefined,
  boolean,
  string,
  any,
  STATUS_TYPES,
  () => void
] => {
  const defaultHookState: IHookState<ResponseType> = {
    response: baseConfig?.defaultRes,
    loading: false || baseConfig?.initReq,
    error: "",
    paramsArray: [],
    requestRetries: 0,
    hadRetried: false,
    status: "idle",
  };

  const [hookState, setHookState] =
    useState<IHookState<ResponseType>>(defaultHookState);

  const updateHookState = (newState = {}) => {
    setHookState((prevState) => {
      return {
        ...prevState,
        ...newState,
      };
    });
  };

  const resetHookState = () => {
    setHookState(defaultHookState);
  };

  const updateResponse = (res: any) => {
    updateHookState({ response: res });
  };

  const executePromise = (...params: any[]): Promise<ResponseType> => {
    const appendedResponse = baseConfig.cachedResponse
      ? { response: hookState.response }
      : { response: baseConfig.defaultRes };

    updateHookState({
      loading: true,
      paramsArray: [...params],
      status: "idle",
      error: "",
      ...appendedResponse,
    });
    return new Promise((resolve, reject) => {
      try {
        if (!params) return;
        return (
          // @ts-ignore
          promiseFunction(...(params as any))
            .then(async (value: any) => {
              updateHookState({
                response: value,
                loading: false,
                status: "success",
              });
              // if (baseConfig.showSuccess) showSuccessMsg();
              resolve(value);
            })
            .catch((err: any) => {
              const errorMessage =
                err?.error?.message || err?.message || err || DEFAULT_ERROR;
              // if (baseConfig.showError) alertError(errorMessage);

              updateHookState({
                error: errorMessage,
                loading: false,
                status: "error",
              });
              reject(err);
            })
        );
      } catch (error: any) {
        updateHookState({
          error: error?.message,
          loading: false,
          status: "error",
        });
        reject(error);
      }
    });
  };

  useEffect(() => {
    if (baseConfig.initReq) executePromise();
  }, []);

  const { response, loading, error, status } = hookState;
  return [
    executePromise,
    response,
    loading || false,
    error || "",
    updateResponse,
    status || "idle",
    resetHookState,
  ];
};
