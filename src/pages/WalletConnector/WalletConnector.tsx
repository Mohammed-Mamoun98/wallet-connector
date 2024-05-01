import React, { useEffect } from "react";
import Header from "src/Layout/Header/Header";
import { usePromise } from "src/hooks/usePromise/usePromise";

interface IContractResponse {
  value: number;
}

const getContractValue = () =>
  new Promise<IContractResponse>((res, rej) => {
    setTimeout(() => {
      res({ value: 2000 });
    }, 2000);
  });

type A = Awaited<ReturnType<typeof getContractValue>>;

export default function WalletConnector() {
  const [callGetContract, contractValue, loading, error] =
    usePromise(getContractValue);

  useEffect(() => {
    console.log({ contractValue });
  }, [contractValue?.value]);
  return (
    <div>
      <Header />
      {JSON.stringify({ contractValue, loading, error })}
      WalletConnector
      <button onClick={callGetContract}>call</button>
    </div>
  );
}
