import path from "path";

const config = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    }
  },
  babel: {
    plugins: [["@emotion/babel-plugin"]]
  }
};

export default config;
