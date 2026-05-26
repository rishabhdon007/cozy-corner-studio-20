import { createFileRoute } from "@tanstack/react-router";
import html from "../pages-html/gallery.html?raw";
import { RawHtmlPage } from "./index";

export const Route = createFileRoute("/gallery")({
  component: () => <RawHtmlPage html={html} />,
  head: () => ({ meta: [{ title: "Gallery & Insights | NRK Iron & Steel" }] }),
});
