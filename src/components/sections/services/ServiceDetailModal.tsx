"use client";

import {
  ArrowRight,
  ChevronRight,
  FileText,
  Gauge,
  Phone,
  PlayCircle,
  Ruler,
  ShieldCheck,
  Truck,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SiteButton } from "@/components/site/SiteButton";
import { getService } from "@/data/services";

type ServiceDetailModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  serviceId: string;
};

export function ServiceDetailModal({
  isOpen,
  onOpenChange,
  serviceId,
}: ServiceDetailModalProps) {
  const service = getService(serviceId);

  if (!service) return null;

  const icons = {
    gauge: Gauge,
    shield: ShieldCheck,
    truck: Truck,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto bg-[#f7fafc] p-0 text-gray-900 sm:rounded-xl">
        <div className="relative p-6 sm:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            {service.eyebrow}
          </p>
          <DialogTitle className="mb-6 border-l-4 border-primary pl-4 text-3xl font-black uppercase tracking-tight text-primary">
            {service.title}
          </DialogTitle>

          <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Media Column */}
            <div className="space-y-6 lg:col-span-2">
              <div className="group relative h-64 w-full overflow-hidden bg-gray-200 sm:h-72">
                <img
                  src={service.mainImage}
                  alt={`${service.title} service`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {service.badge}
                </div>
              </div>

              {/* Gallery Mini-Grid */}
              <div className="grid grid-cols-3 gap-3">
                {service.gallery.map((image, index) => (
                  <div key={image} className="h-20 overflow-hidden bg-gray-200 sm:h-24">
                    <img
                      src={image}
                      alt={`${service.title} detail ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              {/* Process Steps List */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="mb-4 text-xs font-black uppercase tracking-wider text-gray-500">
                  Processing Flow
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {service.process.map((step, index) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-primary text-xs font-black text-white rounded">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          Step {index + 1}
                        </p>
                        <h4 className="text-sm font-bold text-gray-800">{step}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Information Side */}
            <aside className="lg:col-span-1">
              <div className="flex h-full flex-col border border-gray-200 bg-white p-6 shadow-sm rounded-lg">
                <h2 className="mb-3 text-lg font-black uppercase tracking-wide text-gray-900">
                  {service.category}
                </h2>
                <DialogDescription className="mb-4 text-xs leading-relaxed text-gray-600">
                  {service.summary}
                </DialogDescription>
                <p className="mb-6 text-xs leading-relaxed text-gray-600">
                  {service.description}
                </p>

                {/* Specs Section */}
                <div className="mb-6 grid grid-cols-2 gap-x-3 gap-y-4 border-y border-gray-100 py-4">
                  {service.specs.map((spec) => (
                    <div key={spec.label}>
                      <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        {spec.label}
                      </p>
                      <p className="text-xs font-semibold text-gray-800">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-auto space-y-2">
                  <SiteButton
                    href="/contact"
                    variant="modal"
                    layout="full"
                    lucideIcon={ArrowRight}
                    iconClassName="h-3.5 w-3.5"
                  >
                    Inquire Now
                  </SiteButton>
                  <SiteButton
                    href={`/services/${service.slug}`}
                    variant="modal-outline"
                    layout="full"
                    lucideIcon={ChevronRight}
                    iconClassName="h-3.5 w-3.5"
                  >
                    Full Details Page
                  </SiteButton>
                </div>
              </div>
            </aside>
          </section>

          {/* Technical Specs List */}
          <section className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-xs font-black uppercase tracking-wider text-gray-500">
              Technical Specifications
            </h3>
            <div className="overflow-x-auto border border-gray-200 bg-white shadow-sm rounded">
              <table className="min-w-full divide-y divide-gray-200 text-left">
                <thead className="bg-primary text-[10px] font-bold uppercase tracking-wider text-white">
                  <tr>
                    <th className="px-4 py-3" scope="col">Parameter</th>
                    <th className="px-4 py-3" scope="col">Standard Value</th>
                    <th className="px-4 py-3" scope="col">Check Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-xs">
                  {service.technicalSpecs.map((row, index) => (
                    <tr key={row.property} className={index % 2 ? "bg-gray-50" : "bg-white"}>
                      <td className="whitespace-nowrap px-4 py-2.5 font-bold text-gray-900">{row.property}</td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-gray-600">{row.value}</td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-[10px] text-gray-500">{row.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
