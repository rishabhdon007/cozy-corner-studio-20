"use client";

import { type RefObject, useEffect } from "react";

function hideTypewriterCursor(container: HTMLElement): void {
  container.classList.add("is-typewriter-complete");
  container.querySelectorAll<HTMLElement>("[data-typewriter-cursor]").forEach((cursor) => {
    cursor.style.display = "none";
    cursor.setAttribute("aria-hidden", "true");
  });
}

function showTypewriterCursor(container: HTMLElement): void {
  container.classList.remove("is-typewriter-complete");
  container.querySelectorAll<HTMLElement>("[data-typewriter-cursor]").forEach((cursor) => {
    cursor.style.removeProperty("display");
    cursor.removeAttribute("aria-hidden");
  });
}

function initHeroTypewriterBlock(headline: HTMLElement): () => void {
  const lines = [...headline.querySelectorAll<HTMLElement>("[data-typewriter-line]")];
  if (lines.length === 0) return () => undefined;

  const finalLines = lines.map((line) => line.dataset.typewriterText ?? line.textContent ?? "");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    lines.forEach((line, i) => {
      line.textContent = finalLines[i];
    });
    hideTypewriterCursor(headline);
    return () => undefined;
  }

  let cancelled = false;
  let timeoutId: number | undefined;

  showTypewriterCursor(headline);

  const startTyping = (): void => {
    if (cancelled) return;
    lines.forEach((line) => {
      line.textContent = "";
    });
    typeLine(0, 0);
  };

  const typeLine = (lineIndex: number, charIndex: number): void => {
    if (cancelled) return;

    if (lineIndex >= lines.length) {
      hideTypewriterCursor(headline);
      return;
    }

    const line = lines[lineIndex];
    const text = finalLines[lineIndex];

    if (charIndex <= text.length) {
      line.textContent = text.slice(0, charIndex);
      timeoutId = window.setTimeout(() => typeLine(lineIndex, charIndex + 1), 42);
      return;
    }

    timeoutId = window.setTimeout(() => typeLine(lineIndex + 1, 0), 180);
  };

  timeoutId = window.setTimeout(startTyping, 250);

  return () => {
    cancelled = true;
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    lines.forEach((line, i) => {
      line.textContent = finalLines[i];
    });
    hideTypewriterCursor(headline);
  };
}

function initHeroTypewriter(root: ParentNode): () => void {
  const headlines = [...root.querySelectorAll<HTMLElement>("[data-typewriter]")];
  if (headlines.length === 0) return () => undefined;

  const cleanups = headlines.map((headline) => initHeroTypewriterBlock(headline));

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}

function initLoopingTaglineTypewriter(root: ParentNode): () => void {
  const containers = [...root.querySelectorAll<HTMLElement>("[data-typewriter-loop]")];
  if (containers.length === 0) return () => undefined;

  const cleanups = containers.map((container) => initLoopingTaglineBlock(container));

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}

function initLoopingTaglineBlock(container: HTMLElement): () => void {
  const fullText = container.dataset.typewriterText ?? container.textContent?.trim() ?? "";
  const highlightWord = container.dataset.typewriterHighlight ?? "";
  const output =
    container.querySelector<HTMLElement>("[data-typewriter-output]") ??
    container.querySelector<HTMLElement>("[data-typewriter-loop]") ??
    container;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const highlightStart = highlightWord ? fullText.indexOf(highlightWord) : -1;
  const highlightEnd = highlightStart >= 0 ? highlightStart + highlightWord.length : -1;

  const renderText = (count: number): void => {
    const text = fullText.slice(0, count);

    if (highlightStart < 0) {
      output.textContent = text;
      return;
    }

    const before = text.slice(0, highlightStart);
    const middleEnd = Math.min(count, highlightEnd);
    const middle = count > highlightStart ? text.slice(highlightStart, middleEnd) : "";
    const after = count > highlightEnd ? text.slice(highlightEnd) : "";

    output.replaceChildren();
    if (before) output.append(document.createTextNode(before));
    if (middle) {
      const highlight = document.createElement("span");
      highlight.className = "text-orange-400";
      highlight.textContent = middle;
      output.append(highlight);
    }
    if (after) output.append(document.createTextNode(after));
  };

  if (prefersReducedMotion) {
    renderText(fullText.length);
    hideTypewriterCursor(container);
    return () => undefined;
  }

  let cancelled = false;
  let timeoutId: number | undefined;

  const typeSpeed = 58;
  const deleteSpeed = 34;
  const pauseAfterType = 2400;
  const pauseAfterDelete = 700;

  showTypewriterCursor(container);

  const loop = (mode: "typing" | "deleting", index: number): void => {
    if (cancelled) return;

    if (mode === "typing") {
      renderText(index);
      if (index < fullText.length) {
        timeoutId = window.setTimeout(() => loop("typing", index + 1), typeSpeed);
        return;
      }

      hideTypewriterCursor(container);
      timeoutId = window.setTimeout(() => {
        showTypewriterCursor(container);
        loop("deleting", fullText.length - 1);
      }, pauseAfterType);
      return;
    }

    renderText(index);
    if (index > 0) {
      timeoutId = window.setTimeout(() => loop("deleting", index - 1), deleteSpeed);
      return;
    }

    hideTypewriterCursor(container);
    timeoutId = window.setTimeout(() => {
      showTypewriterCursor(container);
      loop("typing", 1);
    }, pauseAfterDelete);
  };

  timeoutId = window.setTimeout(() => loop("typing", 1), 350);

  return () => {
    cancelled = true;
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    renderText(fullText.length);
    hideTypewriterCursor(container);
  };
}

export function useHeroTypewriter(
  root: RefObject<HTMLElement | null>,
  enabled = true,
  deps: unknown[] = [],
): void {
  useEffect(() => {
    if (!enabled) return;
    const el = root.current;
    if (!el) return;
    return initHeroTypewriter(el);
  }, [root, enabled, ...deps]);
}

export function useLoopingTaglineTypewriter(
  root: RefObject<HTMLElement | null>,
  enabled = true,
  deps: unknown[] = [],
): void {
  useEffect(() => {
    if (!enabled) return;
    const el = root.current;
    if (!el) return;
    return initLoopingTaglineTypewriter(el);
  }, [root, enabled, ...deps]);
}

export function useTypewriter(
  root: RefObject<HTMLElement | null>,
  enabled = true,
  deps: unknown[] = [],
): void {
  useHeroTypewriter(root, enabled, deps);
  useLoopingTaglineTypewriter(root, enabled, deps);
}
