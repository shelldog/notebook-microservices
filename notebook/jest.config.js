/* Copyright(c) 2022-2023 Hajime - Kha Tran.
 *
 * Configuration file for Jest.
 * */

module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/utils/__mocks__/assetMock.js',
    '\\.(css|less)$': '<rootDir>/utils/__mocks__/styleMock.js',
  },
  testEnvironment: 'jsdom',
}
