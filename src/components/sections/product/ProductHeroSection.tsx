import Link from "next/link";

const MAIN_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCu_AF4dpTBmmHegSorKBsEdCUm3I3JfVSx-XDp7nW5n2ACrXY9J0CwN8jLoATp9dx0caHq31eUOSVbKeaHMKJzjupwoBrIK4jxfcIsnTr8TBQxD-0C98JSDHjG-OdTpegwo_gsOy2i-sOqIkEyz6x-hSP1L-xFv5WSgkSEd1eEuYryj9gEMid7FVJuc8NxOzfqCsFI9ZsUBqJC3_YM-jOg7zVDEf7NY08107lVgXiQ56XFQE-7ka9R9lxfEI9Tx4mH7_kGlulQTAc";
const VIDEO_THUMB =
  "https://lh3.googleusercontent.com/aida/ADBb0ujPEXWWg0iI87xROhYOFi07NvkaakLAKcufgsmsIULakcaTeHZTBoIc_SxWcBJJ_XJXykvO25FlqnSvlL2F2-qayNrL4cFeH77NIYfPrDj7cPcOgWyaoKvxwlrpSEHlZKBjl6X4VE8b3F2mfO97oySF6u5pyG3CEJy3o0ht1wmhFITEbVwKqYEQKEAzVynO-vMzEP2_ED04Cr3uAEBun4G0G363gZ2HgbEP0sHEUcbr6f0mh2B_d0W_Br0";

const secondaryImages = [
  {
    alt: "Steel stack close up",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRKVZ7OTc54HY7px_IqK8IxBw7DBGJMM5ThTrK647yBQMXSlaSxNsdaLQctQu-8gJbNDTB0YHO3eYOhF8ur_gsbIu1Y4d6zHOG9OcLj2fmcy7gyNJRIolPBBdl-m7shRcFHnxlPXIS0KdCuk_fxOLQYQ-9NnNlpBTWbdin817CizhsNzZhbJScA9I99Me2FtiMWFKVQU3EDHQWiJzxUNaPUrmqK6RSwHfYT3yGcnNT1xTsR1CftjNgOTAkcEs5MMSgN-hKI5nOtWE",
  },
  {
    alt: "Multiple steel coils",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9ZpmlTi9am7jAl3U69ngMTXiV7YHlzoRweLAmBg3U0RavWxTHJ2b8IPruaQ9-dnjFUwuQL1xNZK3LBkggzBv1l8DtaQdmxOKFUWUOs07kpOxvYHIR2JpYxH0rexpvWJQ6fGejqpa5AiBFrUL7Tye0qUdPKUM06F3Jee_vttkYUqoFFByAHosY8tUmo5j5CPpTt_T5F_XPrQgnxvPP_AJEwx_FY5STNvE5dvPOsAnCOV8AB-RmL7qlceqMvm3HoBGYRxvu7pIfys",
  },
  {
    alt: "Reflective steel surface",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB0V8AkOvGcfFYxE2ed-7p9yTbfHgwusGX0YJPJiWlQ6LtK8_fMgtMpIWkh5LBeQRsFE3TPoKv2DeP-jBKRXCuBj20dsQggHyp7lEK9P-DmAiVRv8C0fFhkI3ifeUcWszFt38r-adOR2x86Jnmvtl25Uu61Fdfyogckz2ub6Kr0ahiUCWppxsiiG2XinepiY7a560BYqW4Blpzr1SoHiAUIq7Nst3WySQUQBIJI-JaCBcURjJgPGnXBId3w0dc-528UA64lZDbGjU",
  },
];

const specs = [
  { label: "Thickness", value: "0.30 - 4mm" },
  { label: "Grade", value: "Semi Hard" },
  { label: "Size Range", value: "1.5ft & Above" },
  { label: "Material", value: "Mild Steel" },
];

const variants = ["Cr Sheet Cutting", "CR Semi Hard Material"];

export function ProductHeroSection() {
  return (
    <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <div className="group relative h-80 overflow-hidden rounded-[28px] bg-gray-200 shadow-2xl shadow-primary/10 md:h-[460px]">
          <img
            alt="Large roll of cold rolled steel"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={MAIN_IMAGE}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 rounded-full bg-white/95 px-4 py-2 text-xs font-black uppercase tracking-wider text-primary-dark shadow-lg">
            Industrial Grade: Mild Steel
          </div>
        </div>
        <div className="group relative h-64 cursor-pointer overflow-hidden rounded-[24px] bg-gray-900 shadow-xl shadow-primary/10">
          <img
            alt="Steel Slitting Line Video Thumbnail"
            className="h-full w-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-50"
            src={VIDEO_THUMB}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg className="ml-1 h-6 w-6 text-primary-dark" fill="currentColor" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-white">Watch Process Video</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {secondaryImages.map((image) => (
            <div key={image.alt} className="h-36 overflow-hidden rounded-2xl bg-gray-200 shadow-sm">
              <img
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                src={image.src}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="flex h-full flex-col rounded-[28px] border border-outline-variant bg-white/95 p-8 shadow-2xl shadow-primary/10 lg:sticky lg:top-28">
          <h2 className="mb-4 font-heading text-3xl font-black tracking-tight text-primary">Precision Engineering</h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-600">
            Our Cold Rolled Coils are manufactured through a meticulous process of passing hot rolled steel through a
            series of rollers at room temperature, ensuring superior surface finish and precise dimensional tolerances.
          </p>
          <div className="mb-8 grid grid-cols-2 gap-4">
            {specs.map((spec) => (
              <div key={spec.label} className="rounded-2xl bg-surface-container-low p-4">
                <p className="mb-1 text-xs font-black uppercase tracking-wider text-gray-500">{spec.label}</p>
                <p className="text-lg font-bold text-primary">{spec.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-auto space-y-3">
            <Link
              href="/contact"
              className="flex w-full items-center justify-center rounded-full bg-primary-dark px-4 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-container"
            >
              Inquire Now
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </Link>
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-full border-2 border-primary-dark bg-white px-4 py-3 text-sm font-bold uppercase tracking-wider text-primary-dark transition-colors hover:bg-gray-50"
            >
              Request Spec Sheet
            </button>
            <Link
              href="/contact"
              className="flex w-full items-center justify-center rounded-full bg-surface-container-low px-4 py-3 text-sm font-bold uppercase tracking-wider text-gray-800 transition-colors hover:bg-surface-container-high"
            >
              Talk to Sales
            </Link>
          </div>
          <div className="mt-8">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">Available Variants</h3>
            <ul className="space-y-2">
              {variants.map((variant) => (
                <li key={variant}>
                  <Link
                    href="/product"
                    className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3 transition-all hover:border-primary-dark hover:shadow-sm"
                  >
                    <span className="text-sm font-medium text-gray-800">{variant}</span>
                    <svg
                      className="h-4 w-4 text-gray-400 group-hover:text-primary-dark"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
