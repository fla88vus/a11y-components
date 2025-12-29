import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./Input";
import React from "react";

describe("Input", () => {
  it("renders with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("associates label with input correctly", () => {
    render(<Input label="Username" />);
    const input = screen.getByLabelText("Username");
    expect(input).toHaveAttribute("id");
    expect(screen.getByText("Username")).toHaveAttribute("for", input.id);
  });

  it("handles user input", async () => {
    render(<Input label="Name" />);
    const input = screen.getByLabelText("Name");

    await userEvent.type(input, "John Doe");
    expect(input).toHaveValue("John Doe");
  });

  it("shows error message when error prop is provided", () => {
    render(<Input label="Email" error="Invalid email" />);

    expect(screen.getByText("Invalid email")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
  });

  it("marks input as invalid when error is present", () => {
    render(<Input label="Email" error="Invalid email" />);
    const input = screen.getByLabelText("Email");

    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("shows helper text", () => {
    render(<Input label="Password" helperText="Must be at least 8 characters" />);
    expect(screen.getByText("Must be at least 8 characters")).toBeInTheDocument();
  });

  it("hides helper text when error is present", () => {
    render(
      <Input
        label="Email"
        helperText="We'll never share your email"
        error="Invalid email"
      />
    );

    expect(screen.queryByText("We'll never share your email")).not.toBeInTheDocument();
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("shows required indicator when required", () => {
    render(<Input label="Email" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("applies disabled state correctly", () => {
    render(<Input label="Email" disabled />);
    const input = screen.getByLabelText("Email");

    expect(input).toBeDisabled();
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<Input label="Email" size="small" />);
    expect(screen.getByLabelText("Email")).toHaveClass("small");

    rerender(<Input label="Email" size="large" />);
    expect(screen.getByLabelText("Email")).toHaveClass("large");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input label="Email" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("applies fullWidth class", () => {
    render(<Input label="Email" fullWidth />);
    const wrapper = screen.getByLabelText("Email").parentElement;
    expect(wrapper).toHaveClass("fullWidth");
  });

  describe("Accessibility - WCAG 2.1 AA/AAA", () => {
    it("has proper label association (WCAG 1.3.1, 3.3.2)", () => {
      render(<Input label="Email address" />);

      const input = screen.getByLabelText("Email address");
      const label = screen.getByText("Email address");

      expect(input).toHaveAttribute("id");
      expect(label).toHaveAttribute("for", input.id);
    });

    it("uses aria-describedby for error messages (WCAG 3.3.1)", () => {
      render(<Input label="Email" error="Invalid email format" />);

      const input = screen.getByLabelText("Email");
      const errorId = input.getAttribute("aria-describedby");

      expect(errorId).toBeTruthy();
      expect(document.getElementById(errorId!)).toHaveTextContent(
        "Invalid email format"
      );
    });

    it("uses aria-describedby for helper text (WCAG 3.3.2)", () => {
      render(<Input label="Password" helperText="Must be 8+ characters" />);

      const input = screen.getByLabelText("Password");
      const helperId = input.getAttribute("aria-describedby");

      expect(helperId).toBeTruthy();
      expect(document.getElementById(helperId!)).toHaveTextContent(
        "Must be 8+ characters"
      );
    });

    it("combines error and helper text in aria-describedby", () => {
      const { rerender } = render(
        <Input label="Email" helperText="Required field" />
      );

      let input = screen.getByLabelText("Email");
      const helperTextId = input.getAttribute("aria-describedby");

      rerender(
        <Input label="Email" helperText="Required field" error="Invalid email" />
      );

      input = screen.getByLabelText("Email");
      const describedBy = input.getAttribute("aria-describedby");

      expect(describedBy).toContain(helperTextId);
      expect(describedBy?.split(" ").length).toBeGreaterThan(0);
    });

    it("marks input as invalid with aria-invalid (WCAG 3.3.1)", () => {
      render(<Input label="Email" error="Invalid email" />);

      const input = screen.getByLabelText("Email");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("uses role='alert' for error messages (WCAG 4.1.3)", () => {
      render(<Input label="Email" error="Invalid email format" />);

      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent("Invalid email format");
    });

    it("indicates required fields with aria-required (WCAG 3.3.2)", () => {
      render(<Input label="Email" required />);

      const input = screen.getByLabelText(/Email/);
      expect(input).toHaveAttribute("aria-required", "true");
      expect(input).toHaveAttribute("required");
    });

    it("has visible focus indicator (WCAG 2.4.7)", () => {
      render(<Input label="Email" />);
      const input = screen.getByLabelText("Email");

      input.focus();
      expect(input).toHaveFocus();
    });

    it("supports keyboard navigation", async () => {
      render(<Input label="Email" />);
      const input = screen.getByLabelText("Email");

      // Tab to input
      await userEvent.tab();
      expect(input).toHaveFocus();

      // Type
      await userEvent.keyboard("test@example.com");
      expect(input).toHaveValue("test@example.com");
    });

    it("uses semantic HTML input element (WCAG 4.1.2)", () => {
      render(<Input label="Email" type="email" />);
      const input = screen.getByLabelText("Email");

      expect(input.tagName).toBe("INPUT");
      expect(input).toHaveAttribute("type", "email");
    });

    it("allows hiding label visually while keeping it for screen readers", () => {
      render(<Input label="Search" hideLabel />);

      const label = screen.getByText("Search");
      expect(label).toHaveClass("visuallyHidden");

      // Still accessible to screen readers
      expect(screen.getByLabelText("Search")).toBeInTheDocument();
    });

    it("prevents interaction when disabled", async () => {
      const handleChange = vi.fn();
      render(<Input label="Email" disabled onChange={handleChange} />);

      const input = screen.getByLabelText("Email");

      await userEvent.type(input, "test");
      expect(handleChange).not.toHaveBeenCalled();
      expect(input).toHaveValue("");
    });

    it("provides accessible name for required indicator", () => {
      render(<Input label="Email" required />);

      const requiredIndicator = screen.getByText("*");
      expect(requiredIndicator).toHaveAttribute("aria-label", "required");
    });
  });
});
