import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

// Extend Vitest expect with jest-axe matchers
expect.extend(toHaveNoViolations);
