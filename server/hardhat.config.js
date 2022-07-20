require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url:
        'https://eth-goerli.g.alchemy.com/v2/r0BE2W12JThRMC5tbUUZ8srXAi5wbol1',
      accounts: [
        'f3ef3575f439d34795a5345263d563cda63e9416ee1a2590e76a73cc274a5ac8',
      ],
    },
  },
}
