import React from "react";
import { Link } from "react-router-dom";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Props:
 * - to (optional): if provided, renders Link
 * - as (optional): 'a' for anchor, default 'button'
 * - variant: 'primary' | 'ghost'
 * - className: extra classes
 */
export default function Button({
  to,
  as,
  variant = "primary",
  className,
  children,
  ...rest
}) {
  const base = "btn";
  const look =
    variant === "ghost" ? "btn-ghost" : "btn-primary";

  if (to) {
    return (
      <Link to={to} className={cx(base, look, className)} {...rest}>
        {children}
      </Link>
    );
  }

  if (as === "a") {
    return (
      <a className={cx(base, look, className)} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={cx(base, look, className)} {...rest}>
      {children}
    </button>
  );
}
