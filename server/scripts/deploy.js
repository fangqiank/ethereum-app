const hre = require('hardhat')
const main = async () => {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS

  // const lockedAmount = hre.ethers.utils.parseEther('1')

  const transactionsFactory = await hre.ethers.getContractFactory(
    'Transactions',
  )
  const transactionsContract = await transactionsFactory.deploy()

  await transactionsContract.deployed()

  console.log('Transacions deployed to:', transactionsContract.address)
}

const runMain = async () => {
  try {
    await main()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()
