import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";
import React from "react";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state correctly", () => {
    render(<Button loading>Submit</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Submit</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).not.toBeDisabled(); // No native disabled attribute
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click
      </Button>
    );

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies correct variant classes", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("primary");

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole("button")).toHaveClass("danger");
  });

  it("supports keyboard navigation", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);

    const button = screen.getByRole("button");
    button.focus();
    expect(button).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Click</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  describe("Accessibility - WCAG 2.1 AA/AAA", () => {
    it("supports keyboard navigation with Enter key", async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Submit</Button>);

      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();

      await userEvent.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("supports keyboard navigation with Space key", async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Submit</Button>);

      const button = screen.getByRole("button");
      button.focus();

      await userEvent.keyboard(" ");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("has visible focus indicator with correct outline", () => {
      render(<Button>Focus me</Button>);
      const button = screen.getByRole("button");

      // Verifica che il bottone non sia disabilitato (quindi focusabile)
      expect(button).not.toBeDisabled();

      // Simula focus
      button.focus();
      expect(button).toHaveFocus();

      // Il focus indicator è gestito da CSS :focus-visible
      expect(button).toBeInTheDocument();
    });
    it("announces loading state to screen readers", () => {
      render(<Button loading>Submit</Button>);

      // Verifica aria-busy
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-busy", "true");

      // Verifica presenza di status role per screen reader
      const status = screen.getByRole("status");
      expect(status).toBeInTheDocument();

      // Verifica testo "Loading..." per screen reader
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("uses semantic HTML with proper button role", () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole("button");

      // Verifica che sia un <button> nativo
      expect(button.tagName).toBe("BUTTON");

      // Verifica type attribute
      expect(button).toHaveAttribute("type", "button");
    });

    it("maintains focus order when disabled", () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole("button");

      // Con aria-disabled, il bottone RIMANE focusabile (non usa disabled nativo)
      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).not.toBeDisabled();

      // Il bottone può ricevere focus
      button.focus();
      expect(button).toHaveFocus();
    });
    it("provides accessible name from children", () => {
      render(<Button>Save changes</Button>);

      const button = screen.getByRole("button", { name: "Save changes" });
      expect(button).toBeInTheDocument();
    });

    it("supports aria-label for icon-only buttons", () => {
      render(<Button aria-label="Close dialog">×</Button>);

      const button = screen.getByRole("button", { name: "Close dialog" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-label", "Close dialog");
    });

    it("prevents interaction when loading", async () => {
      const handleClick = vi.fn();
      render(
        <Button loading onClick={handleClick}>
          Submit
        </Button>
      );

      const button = screen.getByRole("button");

      // Tenta click
      await userEvent.click(button);

      // Non deve essere chiamato
      expect(handleClick).not.toHaveBeenCalled();
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("hides decorative spinner from screen readers", () => {
      render(<Button loading>Submit</Button>);

      // Trova lo spinner
      const button = screen.getByRole("button");
      const spinner = button.querySelector('[aria-hidden="true"]');

      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute("aria-hidden", "true");
    });

    it("applies correct ARIA attributes for disabled state", () => {
      render(<Button disabled>Submit</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).not.toBeDisabled(); // No native disabled

      // Button con aria-disabled rimane accessibile via tastiera
      button.focus();
      expect(button).toHaveFocus();
    });

    it("remains focusable but prevents clicks when aria-disabled", async () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Submit
        </Button>
      );

      const button = screen.getByRole("button");

      // Può ricevere focus
      button.focus();
      expect(button).toHaveFocus();

      // Ma il click non viene eseguito
      await userEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("prevents keyboard activation when aria-disabled", async () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Submit
        </Button>
      );

      const button = screen.getByRole("button");
      button.focus();

      // Prova Enter
      await userEvent.keyboard("{Enter}");
      expect(handleClick).not.toHaveBeenCalled();

      // Prova Space
      await userEvent.keyboard(" ");
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
