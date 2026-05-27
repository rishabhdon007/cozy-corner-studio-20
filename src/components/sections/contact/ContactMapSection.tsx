import { MapEmbed } from "@/components/site/MapEmbed";
import { contactInfo } from "@/data/contact";

export function ContactMapSection() {
  return <MapEmbed query={contactInfo.address.full} title="NRK Iron & Steel location map" />;
}
