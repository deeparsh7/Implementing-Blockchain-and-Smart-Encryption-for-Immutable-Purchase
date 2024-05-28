require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/rKjXZtRkvxutrAWxZK7VR0Swhm31eCLz',
      accounts: ['d49392cdf11efadd46523c047f8499eab6dac902a627181d5f82f643d7feab55'],
    },
  },
};