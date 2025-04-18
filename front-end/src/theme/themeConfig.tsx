import { theme as antdTheme } from "antd";
export const COLORS = {
  primary: "#e61b35",
};

export const theme = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    fontFamily: "Roboto",
    colorPrimary: COLORS.primary,
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  components: {},
};
