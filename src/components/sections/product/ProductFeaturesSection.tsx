const features = [
  {
    title: "High Precision",
    description: "Guaranteed thickness consistency across the entire length of the coil within ±0.02mm.",
    iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    title: "Quality Grade",
    description: "Every batch undergoes rigorous ultrasonic and chemical analysis for structural integrity.",
    iconPath:
      "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  {
    title: "Global Supply",
    description: "Integrated logistics network ensures timely delivery for large-scale infrastructure projects.",
    iconPath: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
];

export function ProductFeaturesSection() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="rounded-[24px] border border-outline-variant bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
        >
          <svg className="mb-4 h-8 w-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d={feature.iconPath} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
          <h3 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h3>
          <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
