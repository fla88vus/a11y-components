import type { Preview } from "@storybook/react";
import "../src/atoms/Button/Button.module.css";
import "../src/atoms/Input/Input.module.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // Disable color-contrast rule for now (will be handled by custom theme)
            id: "color-contrast",
            enabled: false,
          },
        ],
      },
    },
  },
};

export default preview;
