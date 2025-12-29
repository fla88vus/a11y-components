import { describe, it, expect } from "vitest";
import {
  combineClassNames,
  isButtonDisabled,
  getLoadingLabel,
} from "./Button.utils";

describe("Button Utils - Unit Tests", () => {
  describe("combineClassNames", () => {
    it("combines multiple class names", () => {
      expect(combineClassNames("btn", "primary", "large")).toBe(
        "btn primary large"
      );
    });

    it("filters out falsy values", () => {
      expect(combineClassNames("btn", false, "primary", undefined, null)).toBe(
        "btn primary"
      );
    });

    it("handles empty input", () => {
      expect(combineClassNames()).toBe("");
    });

    it("handles all falsy values", () => {
      expect(combineClassNames(false, undefined, null)).toBe("");
    });

    it("handles single class name", () => {
      expect(combineClassNames("btn")).toBe("btn");
    });

    it("handles conditional classes", () => {
      const isActive = true;
      const isDisabled = false;
      expect(
        combineClassNames("btn", isActive && "active", isDisabled && "disabled")
      ).toBe("btn active");
    });
  });

  describe("isButtonDisabled", () => {
    it("returns true when disabled is true", () => {
      expect(isButtonDisabled({ disabled: true, loading: false })).toBe(true);
    });

    it("returns true when loading is true", () => {
      expect(isButtonDisabled({ disabled: false, loading: true })).toBe(true);
    });

    it("returns true when both disabled and loading are true", () => {
      expect(isButtonDisabled({ disabled: true, loading: true })).toBe(true);
    });

    it("returns false when both disabled and loading are false", () => {
      expect(isButtonDisabled({ disabled: false, loading: false })).toBe(false);
    });

    it("returns false when props are undefined", () => {
      expect(isButtonDisabled({})).toBe(false);
    });

    it("handles undefined disabled prop", () => {
      expect(isButtonDisabled({ loading: false })).toBe(false);
    });

    it("handles undefined loading prop", () => {
      expect(isButtonDisabled({ disabled: false })).toBe(false);
    });
  });

  describe("getLoadingLabel", () => {
    it("returns default label when no custom label provided", () => {
      expect(getLoadingLabel()).toBe("Loading...");
    });

    it("returns custom label when provided", () => {
      expect(getLoadingLabel("Saving...")).toBe("Saving...");
    });

    it("returns default label for empty string", () => {
      expect(getLoadingLabel("")).toBe("Loading...");
    });

    it("handles special characters in custom label", () => {
      expect(getLoadingLabel("Processing... 🔄")).toBe("Processing... 🔄");
    });
  });
});
