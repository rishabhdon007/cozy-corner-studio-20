import type { Metadata } from "next";

import { ServiceDetailPage } from "@/components/sections/services/ServiceDetailPage";
import { getService } from "@/data/services";

type PageProps = {
  params: Promise<{ serviceId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceId } = await params;
  const service = getService(serviceId);
  return {
    title: `${service?.title ?? "Service Details"} | NRK Iron & Steel`,
  };
}

export default async function ServiceDetailRoute({ params }: PageProps) {
  const { serviceId } = await params;
  return <ServiceDetailPage serviceId={serviceId} />;
}
