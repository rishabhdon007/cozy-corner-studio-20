import { createFileRoute } from "@tanstack/react-router";
import html from "../pages-html/product.html?raw";
import { RawHtmlPage } from "./index";

export const Route = createFileRoute("/product")({
  component: () => <RawHtmlPage html={html} />,
  head: () => ({ meta: [{ title: "Cold Rolled Coils | NRK Iron & Steel" }] }),
});
