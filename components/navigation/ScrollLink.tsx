"use client";

import type { ComponentProps, MouseEvent } from "react";

type ScrollLinkProps = Omit<ComponentProps<"a">, "href"> & {
  /** id del elemento destino, sin el "#" */
  targetId: string;
};

export default function ScrollLink({
  targetId,
  onClick,
  children,
  ...props
}: ScrollLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const target = document.getElementById(targetId);
    if (!target) return; // sin destino, el navegador hace su comportamiento normal

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });

    // Mantiene el hash en la URL sin añadir entradas al historial
    history.replaceState(null, "", `#${targetId}`);
  }

  return (
    <a href={`#${targetId}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
