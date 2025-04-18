"use client";

import React from "react";
import { ConfigProvider, App } from "antd";
import { theme } from "../../theme/themeConfig";

export default function AntdApp({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
