import React from "react";

interface INetworkIcon {
  iconUrl?: string;
  icon?: JSX.Element;
}
export default function NetworkIcon({ icon, iconUrl }: INetworkIcon) {
  if (icon) return <>{icon}</>;
  return <img width={24}  height={24} className="max-w-[24px] max-h-[24px] h-auto" src={iconUrl} />;
}
