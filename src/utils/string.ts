export const formatAddress = (address = "") => ({
  showed: [
    address?.substring?.(0, 4),
    address?.substring?.(address?.length - 5, address?.length),
  ].join("..."),
  fullString: address,
});
