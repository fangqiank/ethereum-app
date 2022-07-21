export const shortenAddress = (address) => {
  if (!address) return ''
  const shorten = `${address.slice(0, 5)}...${address.slice(
    address.length - 4,
  )}`
  return shorten
}
