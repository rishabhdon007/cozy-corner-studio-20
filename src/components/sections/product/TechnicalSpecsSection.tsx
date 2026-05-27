const rows = [
  { property: "Yield Stress (MPa)", value: "240 - 320", method: "ASTM A1008" },
  { property: "Tensile Strength (MPa)", value: "350 - 450", method: "ASTM A1008" },
  { property: "Elongation (%)", value: "Min 20% (on 50mm GL)", method: "ISO 6892-1" },
  { property: "Hardness (HRB)", value: "50 - 65 Max", method: "Rockwell Scale B" },
  { property: "Camber", value: "Max 5mm per 2000mm length", method: "Internal Standard" },
  { property: "Surface Quality", value: "Oiled / Dry Matt Finish", method: "Visual - Grade A" },
];

export function TechnicalSpecsSection() {
  return (
    <div className="mb-16 rounded-[28px] bg-white p-6 shadow-xl shadow-primary/10 ring-1 ring-outline-variant/60 md:p-8">
      <h2 className="mb-8 text-center font-heading text-3xl font-bold uppercase tracking-wide text-primary-dark">
        Technical Specifications
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary-dark">
            <tr>
              <th className="w-1/3 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white" scope="col">
                Property
              </th>
              <th className="w-1/3 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white" scope="col">
                Standard Value
              </th>
              <th className="w-1/3 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white" scope="col">
                Test Method
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((row) => (
              <tr key={row.property} className="table-row-zebra">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">{row.property}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{row.value}</td>
                <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-500">{row.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
