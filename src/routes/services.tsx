import { createFileRoute } from "@tanstack/react-router";
import html from "../pages-html/services.html?raw";
import { RawHtmlPage } from "./index";

export const Route = createFileRoute("/services")({
  component: () => <RawHtmlPage html={html} />,
  head: () => ({ meta: [{ title: "Services | NRK Iron & Steel" }] }),
});
