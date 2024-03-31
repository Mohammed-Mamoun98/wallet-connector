/* eslint-disable no-debugger */
// import translate from "services/translate/translate";
import { useState, useEffect, useCallback } from "react";
// import { useDispatch } from "react-redux";
// import { createNotification } from "redux/actions/ui";
// import { wait } from "utils/time";
// import { useTimer } from "./useTimer";
// import { ITimestamp } from "services/dlabService";

/**
 *  const promiseFunc = () => new Promise((resolve,reject) => resolove({ count : 1 }))
 *
 *  const [
 *  getData: fucntion, // initiate the request by calling this func.
 *  data: any,    // the resolved promise data => { count : 1 }
 *  loading: boolean,  // promise resolving loading
 *  error: Error,  // error object in case promise rejected
 * ] = usePromise(promiseFunction)
 *
 */

const DEFAULT_ERROR = "Internal Server Error";

const sleep = (ms = 10) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(null);
    }, ms)
  );

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
  promiseFunction = (..._params: any[]) => null,
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

  //   const alertError = (errorMsg: string) =>
  //     dispatch(
  //       createNotification(
  //         "error",
  //         errorMsg,
  //         baseConfig.deleteNotificationInMs || 3000
  //       )
  //     );

  //   const showSuccessMsg = () =>
  //     dispatch(
  //       createNotification(
  //         "success",
  //         translate(baseConfig.showSuccess, baseConfig.translationMsgParams),
  //         4000
  //       )
  //     );

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

  //   const retry = async () => {
  //     try {
  //       await executePromise(...hookState.paramsArray);
  //     } catch (error) {
  //       console.log();
  //     } finally {
  //       await wait(1000);
  //       updateHookState({ requestRetries: hookState.requestRetries + 1 });
  //     }
  //   };

  // RETRY REQUEST IN CASE OF FAILED REQUESTS
  //   useEffect(() => {
  //     const { requestRetries, loading, error } = hookState;
  //     if (
  //       !error ||
  //       requestRetries >= baseConfig.maxRetries ||
  //       !baseConfig.maxRetries ||
  //       loading
  //     )
  //       return;
  //     retry();
  //   }, [hookState.error, hookState.requestRetries]);

  // RETRY REQUEST IN CASE OF TIMEOUT REQUESTS (CONTRACTS SPECIFIC)
  //   useEffect(() => {
  //     const { loading, response, hadRetried } = hookState;
  //     if (!canCheckTimeout || !loading || !!response || hadRetried) return; // check the execution every (3s) which is the expectedMaxWaitingTime
  //     executePromise(...hookState.paramsArray).then(() =>
  //       updateHookState({ hadRetried: true })
  //     ); // in case if request still loading that means it's going to be timeout request => trigger retry
  //   }, [canCheckTimeout]);

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
