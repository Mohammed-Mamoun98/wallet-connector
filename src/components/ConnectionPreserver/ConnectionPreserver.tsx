import React, { useEffect } from "react";
import useWalletConnection from "../../hooks/useWalletConnection/useWalletConnection";

export default function ConnectionPreserver() {
  const [walletConnection] = useWalletConnection({});

  useEffect(() => {
    walletConnection.hanldeConnection();
  }, []);

  return <></>;
}
