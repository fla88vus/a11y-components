// src/atoms/Checkbox/Checkbox.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";
import React from "react";

describe("Checkbox", () => {
  // ===================================
  // BASIC RENDERING
  // ===================================

  it("renders with label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText("Accept terms")).toBeInTheDocument();
  });

  it("associates label with input correctly", () => {
    render(<Checkbox label="Subscribe to newsletter" />);
    const checkbox = screen.getByLabelText("Subscribe to newsletter");
    const label = screen.getByText("Subscribe to newsletter");

    expect(checkbox).toHaveAttribute("id");
    expect(label).toHaveAttribute("for", checkbox.id);
  });

  it("renders as checkbox input type", () => {
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByLabelText("Accept terms");

    expect(checkbox).toHaveAttribute("type", "checkbox");
  });

  // ===================================
  // CHECKED STATE
  // ===================================

  it("is unchecked by default", () => {
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByLabelText("Accept terms");

    expect(checkbox).not.toBeChecked();
  });

  it("can be checked with defaultChecked prop (uncontrolled)", () => {
    render(<Checkbox label="Accept terms" defaultChecked />);
    const checkbox = screen.getByLabelText("Accept terms");

    expect(checkbox).toBeChecked();
  });

  it("respects checked prop (controlled)", () => {
    const { rerender } = render(
      <Checkbox label="Accept terms" checked={false} onChange={() => {}} />
    );
    const checkbox = screen.getByLabelText("Accept terms");

    expect(checkbox).not.toBeChecked();

    rerender(
      <Checkbox label="Accept terms" checked={true} onChange={() => {}} />
    );
    expect(checkbox).toBeChecked();
  });

  // ===================================
  // USER INTERACTION
  // ===================================

  it("toggles when clicked", async () => {
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByLabelText("Accept terms");

    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("toggles when label is clicked", async () => {
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByLabelText("Accept terms");
    const label = screen.getByText("Accept terms");

    expect(checkbox).not.toBeChecked();

    await userEvent.click(label);
    expect(checkbox).toBeChecked();
  });

  it("toggles with Space key", async () => {
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByLabelText("Accept terms");

    checkbox.focus();
    expect(checkbox).not.toBeChecked();

    await userEvent.keyboard(" ");
    expect(checkbox).toBeChecked();

    await userEvent.keyboard(" ");
    expect(checkbox).not.toBeChecked();
  });

  it("calls onChange handler when toggled", async () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Accept terms" onChange={handleChange} />);
    const checkbox = screen.getByLabelText("Accept terms");

    await userEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          checked: true,
        }),
      })
    );
  });

  // ===================================
  // ERROR STATE
  // ===================================

  it("shows error message when error prop is provided", () => {
    render(<Checkbox label="Accept terms" error="You must accept the terms" />);

    expect(screen.getByText("You must accept the terms")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "You must accept the terms"
    );
  });

  it("marks checkbox as invalid when error is present", () => {
    render(<Checkbox label="Accept terms" error="Required field" />);
    const checkbox = screen.getByLabelText("Accept terms");

    expect(checkbox).toHaveAttribute("aria-invalid", "true");
  });

  // ===================================
  // HELPER TEXT
  // ===================================

  it("shows helper text", () => {
    render(
      <Checkbox label="Subscribe" helperText="We'll send you weekly updates" />
    );
    expect(
      screen.getByText("We'll send you weekly updates")
    ).toBeInTheDocument();
  });

  it("hides helper text when error is present", () => {
    render(
      <Checkbox
        label="Accept terms"
        helperText="Please read our terms"
        error="You must accept"
      />
    );

    expect(screen.queryByText("Please read our terms")).not.toBeInTheDocument();
    expect(screen.getByText("You must accept")).toBeInTheDocument();
  });

  it("links helper text via aria-describedby", () => {
    render(<Checkbox label="Subscribe" helperText="Weekly updates" />);
    const checkbox = screen.getByLabelText("Subscribe");
    const helperText = screen.getByText("Weekly updates");

    expect(checkbox).toHaveAttribute("aria-describedby");
    expect(checkbox.getAttribute("aria-describedby")).toContain(helperText.id);
  });

  // ===================================
  // REQUIRED STATE
  // ===================================

  it("shows required indicator when required", () => {
    render(<Checkbox label="Accept terms" required />);
    const requiredIndicator = screen.getByLabelText("required");
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveTextContent("*");
  });

  it("has required attribute when required", () => {
    render(<Checkbox label="Accept terms" required />);
    const checkbox = screen.getByRole("checkbox", { name: /Accept terms/i });

    expect(checkbox).toBeRequired();
    expect(checkbox).toHaveAttribute("aria-required", "true");
    expect(checkbox).toHaveAttribute("required");
  });

  // ===================================
  // DISABLED STATE
  // ===================================

  it("applies disabled state correctly", () => {
    render(<Checkbox label="Accept terms" disabled />);
    const checkbox = screen.getByLabelText("Accept terms");

    expect(checkbox).toBeDisabled();
  });

  it("cannot be toggled when disabled", async () => {
    render(<Checkbox label="Accept terms" disabled />);
    const checkbox = screen.getByLabelText("Accept terms");

    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  // ===================================
  // SIZE VARIANTS
  // ===================================

  it("applies correct size classes", () => {
    const { rerender } = render(<Checkbox label="Accept terms" size="small" />);
    let checkbox = screen.getByRole("checkbox", { name: /Accept terms/i });
    expect(checkbox).toHaveClass("small");

    rerender(<Checkbox label="Accept terms" size="medium" />);
    checkbox = screen.getByRole("checkbox", { name: /Accept terms/i });
    expect(checkbox).toHaveClass("medium");

    rerender(<Checkbox label="Accept terms" size="large" />);
    checkbox = screen.getByRole("checkbox", { name: /Accept terms/i });
    expect(checkbox).toHaveClass("large");
  });

  // ===================================
  // REF FORWARDING
  // ===================================

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox label="Accept terms" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe("checkbox");
  });

  // ===================================
  // CUSTOM ID
  // ===================================

  it("uses custom id when provided", () => {
    render(<Checkbox label="Accept terms" id="custom-checkbox-id" />);
    const checkbox = screen.getByLabelText("Accept terms");

    expect(checkbox).toHaveAttribute("id", "custom-checkbox-id");
  });

  // ===================================
  // ACCESSIBILITY - WCAG 2.1 AA/AAA
  // ===================================

  describe("Accessibility - WCAG 2.1 AA/AAA", () => {
    it("has proper label association (WCAG 1.3.1, 3.3.2)", () => {
      render(<Checkbox label="Accept terms and conditions" />);

      const checkbox = screen.getByLabelText("Accept terms and conditions");
      const label = screen.getByText("Accept terms and conditions");

      expect(checkbox).toHaveAttribute("id");
      expect(label).toHaveAttribute("for", checkbox.id);
    });

    it("uses semantic checkbox input (WCAG 1.3.1)", () => {
      render(<Checkbox label="Accept terms" />);
      const checkbox = screen.getByLabelText("Accept terms");

      expect(checkbox.tagName).toBe("INPUT");
      expect(checkbox).toHaveAttribute("type", "checkbox");
    });

    it("error state not conveyed by color alone (WCAG 1.4.1)", () => {
      render(<Checkbox label="Accept terms" error="Required field" />);
      const checkbox = screen.getByLabelText("Accept terms");

      // Uses aria-invalid and role="alert", not just color
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("is keyboard accessible (WCAG 2.1.1)", () => {
      render(<Checkbox label="Accept terms" />);
      const checkbox = screen.getByLabelText("Accept terms");

      expect(checkbox.tagName).toBe("INPUT");
      expect(checkbox).not.toHaveAttribute("tabindex", "-1");
    });

    it("can receive focus (WCAG 2.4.7)", () => {
      render(<Checkbox label="Accept terms" />);
      const checkbox = screen.getByLabelText("Accept terms");

      checkbox.focus();
      expect(checkbox).toHaveFocus();
    });

    it("has aria-describedby for error (WCAG 3.3.1)", () => {
      render(<Checkbox label="Accept terms" error="This field is required" />);
      const checkbox = screen.getByLabelText("Accept terms");
      const errorMessage = screen.getByText("This field is required");

      expect(checkbox).toHaveAttribute("aria-describedby");
      expect(checkbox.getAttribute("aria-describedby")).toContain(
        errorMessage.id
      );
    });

    it("has aria-describedby for helper text (WCAG 3.3.2)", () => {
      render(<Checkbox label="Subscribe" helperText="Get weekly updates" />);
      const checkbox = screen.getByLabelText("Subscribe");
      const helperText = screen.getByText("Get weekly updates");

      expect(checkbox).toHaveAttribute("aria-describedby");
      expect(checkbox.getAttribute("aria-describedby")).toContain(
        helperText.id
      );
    });

    it("combines error and helper in aria-describedby", () => {
      render(
        <Checkbox label="Accept" helperText="Read carefully" error="Required" />
      );

      // Should only show error (helper is hidden when error present)
      expect(screen.queryByText("Read carefully")).not.toBeInTheDocument();
      expect(screen.getByText("Required")).toBeInTheDocument();
    });

    it("has accessible name from label (WCAG 4.1.2)", () => {
      render(<Checkbox label="I agree to the privacy policy" />);
      const checkbox = screen.getByRole("checkbox", {
        name: "I agree to the privacy policy",
      });

      expect(checkbox).toBeInTheDocument();
    });

    it("announces required state to screen readers (WCAG 3.3.2)", () => {
      render(<Checkbox label="Accept terms" required />);
      const checkbox = screen.getByRole("checkbox", { name: /Accept terms/i });

      expect(checkbox).toHaveAttribute("aria-required", "true");
      expect(checkbox).toHaveAttribute("required");
    });
  });

  // ===================================
  // INDETERMINATE STATE
  // ===================================

  describe("Indeterminate State", () => {
    it("supports indeterminate state", () => {
      render(<Checkbox label="Select all" indeterminate={true} />);
      const checkbox = screen.getByLabelText("Select all") as HTMLInputElement;

      expect(checkbox.indeterminate).toBe(true);
    });

    it("is not indeterminate by default", () => {
      render(<Checkbox label="Select all" />);
      const checkbox = screen.getByLabelText("Select all") as HTMLInputElement;

      expect(checkbox.indeterminate).toBe(false);
    });

    it("sets aria-checked='mixed' when indeterminate", () => {
      render(<Checkbox label="Select all" indeterminate={true} />);
      const checkbox = screen.getByLabelText("Select all");

      expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    });

    it("does not set aria-checked='mixed' when not indeterminate", () => {
      render(<Checkbox label="Select all" indeterminate={false} />);
      const checkbox = screen.getByLabelText("Select all");

      expect(checkbox).not.toHaveAttribute("aria-checked", "mixed");
    });

    it("updates indeterminate state when prop changes", () => {
      const { rerender } = render(
        <Checkbox label="Select all" indeterminate={false} />
      );
      const checkbox = screen.getByLabelText("Select all") as HTMLInputElement;

      expect(checkbox.indeterminate).toBe(false);

      rerender(<Checkbox label="Select all" indeterminate={true} />);
      expect(checkbox.indeterminate).toBe(true);

      rerender(<Checkbox label="Select all" indeterminate={false} />);
      expect(checkbox.indeterminate).toBe(false);
    });

    it("can be both checked and indeterminate", () => {
      render(
        <Checkbox
          label="Select all"
          checked={true}
          indeterminate={true}
          onChange={() => {}}
        />
      );
      const checkbox = screen.getByLabelText("Select all") as HTMLInputElement;

      expect(checkbox).toBeChecked();
      expect(checkbox.indeterminate).toBe(true);
    });

    it("clicking indeterminate checkbox calls onChange", async () => {
      const handleChange = vi.fn();
      render(
        <Checkbox
          label="Select all"
          indeterminate={true}
          onChange={handleChange}
        />
      );
      const checkbox = screen.getByLabelText("Select all");

      await userEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("applies indeterminate CSS class", () => {
      render(<Checkbox label="Select all" indeterminate={true} />);
      const checkbox = screen.getByLabelText("Select all");

      expect(checkbox).toHaveClass("indeterminate");
    });

    it("indeterminate state works with all sizes", () => {
      const { rerender } = render(
        <Checkbox label="Select all" indeterminate={true} size="small" />
      );
      let checkbox = screen.getByLabelText("Select all") as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
      expect(checkbox).toHaveClass("small");

      rerender(
        <Checkbox label="Select all" indeterminate={true} size="medium" />
      );
      checkbox = screen.getByLabelText("Select all") as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
      expect(checkbox).toHaveClass("medium");

      rerender(
        <Checkbox label="Select all" indeterminate={true} size="large" />
      );
      checkbox = screen.getByLabelText("Select all") as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
      expect(checkbox).toHaveClass("large");
    });

    it("indeterminate state works with disabled", () => {
      render(
        <Checkbox label="Select all" indeterminate={true} disabled={true} />
      );
      const checkbox = screen.getByLabelText("Select all") as HTMLInputElement;

      expect(checkbox.indeterminate).toBe(true);
      expect(checkbox).toBeDisabled();
    });

    it("maintains indeterminate state with ref", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox label="Select all" indeterminate={true} ref={ref} />);

      expect(ref.current?.indeterminate).toBe(true);
    });

    // WCAG 4.1.2 - Name, Role, Value
    it("announces indeterminate state to screen readers (WCAG 4.1.2)", () => {
      render(<Checkbox label="Select all items" indeterminate={true} />);
      const checkbox = screen.getByLabelText("Select all items");

      // aria-checked="mixed" tells screen readers about the indeterminate state
      expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    });
  });
});
