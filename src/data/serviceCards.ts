export type ServiceCardItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
};

export const featuredServiceCards: ServiceCardItem[] = [
  {
    id: "slitting",
    slug: "slitting",
    title: "Slitting",
    description: "High-speed slitting lines for accurate, burr-free slit coils in different widths.",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0ujHU7ebzYPuh3XqZZW0eS1FVKhRs9JQaSaYMYTQXj9POv1Gn2riWzjjzZ4voyRPwg3X4cUGxIinOkwU3IwHsS6m3Z2W93W5qrdXRw56QCyJPY41arGtOn0FdZr8gIgo4SUyE3hlGX-3d-AqYKTjoi5-9myM4Up2-Tnchin4AeQmZEz0AK355Ei3fcRsdNwGmAlPLnoggbXnKrkjPWJc5HKwfO8N1zoFxpBBxRzr-aDrVCB94XKKNfkZD00",
  },
  {
    id: "cut-to-length",
    slug: "cut-to-length",
    title: "Cut to Length",
    description: "Precision coil cutting service for custom lengths, ensuring minimal wastage.",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0uivdi1gtq1TGu910WV5iy4kr7Vpsh3NqNR6Xt_aBSacWZlPipe-q8DQ3I-LVLuyrkVFlH_dmkAd6u7YAJz-J0O1aqQExJ6SE-3lhHW6a4T-9wVrgXfGBnxKqZM5dHHJ2CSHJsgMkbikHnO2yoVSAtVOv-CpEpoiLudhVzGEmGR0spg0QfCRa5pLZV5WO9vF6f19Udr5ZMb3pkrpK20Xe_RH2jqs2VA8A65TJHkXzU5Um0WyIU9k2n9uFH4",
  },
  {
    id: "deck-sheets",
    slug: "coated-profile-sheets",
    title: "Deck Sheets",
    description: "Durable structural deck sheets ideal for roofing and floor applications.",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0ugYJ_aUeqb62Gz2tmxZyD9g3ouZl3KNer_w5s2GvLgbq4-BahjotEDtXYXTrqH4ICMkt3eW3ok9BAMewNTBdAdRz4IEy0Rj_jV8zFiByluZXLPj0r65Xe7V4OKPl8TI4O4_meEj9Teyb7OL4gPKylEO5FMhSHyRXe_U1clXfIXxPVj1vD8IgNok7CEXsjfhICy7RRtl2nV8m-9gqvw7nKH92aKz5QRagfD5xQH7bAqd3asJVhHH2YDT-OA",
  },
  {
    id: "wooden-pallet",
    slug: "logistics-warehousing",
    title: "Wooden Pallete",
    description: "Secure wooden pallet packaging ensures damage-free delivery.",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0ujlqYduoQo8q6OjTbc6ifPxWs_oQeEadSTZ1K4-vc3KLaxiUqzStbzLEGbeFU_41IgYpdbsHCIURd8cRIZ6G7-tmYXoS03yG4HfMdiBbKtGv4GlHkM-0LuyTsuSWwdjKE7J64Zq-M8YfanfGOqXAjujRkWiKyWmy7tgKIDORcyv27aJw57ViS3Ez8d8pu6B6tTGaewf-qK5Zt2YyhIHw0sOQPrJnCeUJUkWq4zrkUdTlpN46g9zVacW1A",
  },
  {
    id: "z-c-purlin",
    slug: "coated-profile-sheets",
    title: "Z C Purlin",
    description: "We manufacture high-strength Z & C Purlins used in steel building frameworks.",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0ugrP6gYPLaadWjcQ_UvRMk039k2alc_eoihFKlbI17Vnzp2pPelolsBt4eZwrdn21x8eblOstX1SVtG7iibhhNBqm25fR7roFqRkQmG6kokG7SGwxkTx0-sKhDyP0H3-oe7G80G7rh0bCLABed9sLYYv5iknYwd4Vt8mvWLwPu6z0hg0qICgVEX7i6rd40w7Aedqgnd_xh2MLmCjuerEyqCL3bhwiJS_QYYmpAbnG29I7auRnJgGbkZh3Y",
  },
  {
    id: "profiling",
    slug: "coated-profile-sheets",
    title: "Profiling",
    description: "Custom profile and corrugation services for roofing and construction needs.",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0uh_gfmvtsEKQa2xaROcF9FtGQ8IlG7igL0UidMOTMcLFNkpv_luNaYa8r-VSwzO4UYcdE87b4mXEP4eZQTS6dBnU24zHpsFRb9syBtZFf7TMdXJz8Ri4svBR0GTRA2uB1HFhcieLQAe-D1zFpk4C1DuS1rE34GObjnHYTfSSuSHWTDFYOc_KnOM_F0xcpBh-zTJPq5GAOx_d3Hj1T8xoQ3kkowcxU7_zdBU42NJ5w4ry8YrDXgkvLj0yHk",
  },
];

export const allServiceCards: ServiceCardItem[] = [
  {
    id: "slitting",
    slug: "slitting",
    title: "Slitting",
    description:
      "High-speed slitting lines for accurate, burr-free slit coils in different widths for industrial and commercial needs.",
    image: featuredServiceCards[0].image,
  },
  {
    id: "cut-to-length",
    slug: "cut-to-length",
    title: "Cut to Length",
    description:
      "Precision coil cutting service for custom lengths up to 10000mm, ensuring minimal wastage across HR, CR, and coated sheets.",
    image: featuredServiceCards[1].image,
  },
  {
    id: "annealing",
    slug: "annealing",
    title: "Annealing Processing",
    description:
      "Advanced heat treatment for thinner, softer material properties and improved workability in forming applications.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDu8Ky62X-5F853bdedSvtzNaVQ1B9jp5Izn0_BQJN75iCU9SwQBLaVyRCGy7DIfEg43klsgnRSYpuaJdPJ5UwEIZeb6cif4ohXJrtD7t7ZQt-a_h1YK2wUwMlBeZ2gZexI_bRO06LT45aiHPwTgxW7e1GO4y67nsVuJSyVnEEvSsCONefQg6DrNLLT5yjCNt2PT4XjX3fOh_or_sd-e5RuY9XU9nmu62ib5ThCrE8KeJRM3ciNoA3EwT1C6XKVcl2k_PfmkKz6OvA",
  },
  {
    id: "hr-cr-ms-plates",
    slug: "hr-cr-ms-plates",
    title: "HR, CR & MS Plates",
    description:
      "Prime Hot Rolled, Cold Rolled, and MS Plates sourced from leading manufacturers like SAIL, Jindal, and AMNS.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWEdwMeNFxKE61YEA_hposv1SW7wwWs7ZpM87Yvzj4ZW5FuYnfj5N4Dvl4HOD6cXk1oKKj0kzvxZ1s2Zxj5ryEcxpqaHQfhnQd76vZ2VETh5WX4LOiEvMSdOWRcz2l6Yo7-xFXWO4ztf2th7pDtA_FSNFPa5hWS-3itr7dfvd-a79mm8WP7ZbQbw5HVlAS_wQF84OA52bx0QSxFRLqn2p85Y_Q2R60-mBSn7NxEQ3NYfyTbfNTjQ3oLalfM363PxPqeaxhNLTdz6o",
  },
  {
    id: "coated-profile-sheets",
    slug: "coated-profile-sheets",
    title: "Coated & Profile Sheets",
    description:
      "Galvanized, color coated, galvalume, and profile sheets tailored for durability and aesthetic appeal.",
    image: featuredServiceCards[2].image,
  },
  {
    id: "logistics-warehousing",
    slug: "logistics-warehousing",
    title: "Logistics & Warehousing",
    description:
      "Material handling with heavy cranes, dedicated warehousing, and door-to-door transportation support.",
    image: featuredServiceCards[3].image,
  },
];
