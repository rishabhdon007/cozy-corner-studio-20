import { createFileRoute } from "@tanstack/react-router";
import html from "../pages-html/about.html?raw";
import { RawHtmlPage } from "./index";

export const Route = createFileRoute("/about")({
  component: () => <RawHtmlPage html={html} />,
  head: () => ({ meta: [{ title: "About Us | NRK Iron & Steel" }] }),
});
