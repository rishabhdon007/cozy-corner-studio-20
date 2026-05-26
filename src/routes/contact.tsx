import { createFileRoute } from "@tanstack/react-router";
import html from "../pages-html/contact.html?raw";
import { RawHtmlPage } from "./index";

export const Route = createFileRoute("/contact")({
  component: () => <RawHtmlPage html={html} />,
  head: () => ({ meta: [{ title: "Contact Us | NRK Iron & Steel" }] }),
});
