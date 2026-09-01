"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageField } from "@/components/admin/ImageField";
import {
  Plus,
  Trash,
  ExternalLink,
  Save,
  Home,
  Info,
  Package,
  Image as ImageIcon,
  Phone,
  RotateCcw,
  GitCommit,
  CheckCircle2,
  Users,
  Award,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function ContentAdmin() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [committing, setCommitting] = useState(false);
  const [message, setMessage] = useState("");
  const [activePageTab, setActivePageTab] = useState<"home" | "about" | "products" | "gallery" | "contact">("home");
  const [activeSection, setActiveSection] = useState("hero");
  const [showCommitModal, setShowCommitModal] = useState(false);

  useEffect(() => {
    let localDraft: any = null;
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("nrk_draft_preview_data");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.draft) localDraft = parsed.draft;
        }
      } catch (_) {}
    }

    fetch("/api/admin/data?type=draft")
      .then((res) => res.json())
      .then((serverData) => {
        if (localDraft) {
          setData({ ...serverData, ...localDraft });
        } else {
          setData(serverData);
        }
      })
      .catch((err) => {
        console.error("Failed to load server draft", err);
        if (localDraft) setData(localDraft);
      });
  }, []);

  const handleSave = async (updatedData = data) => {
    setSaving(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("nrk_draft_preview_data", JSON.stringify({ draft: updatedData }));
    }
    try {
      const res = await fetch("/api/admin/data?action=save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const json = await res.json();
      if (res.ok) {
        setMessage("Draft saved successfully!");
      } else {
        setMessage(json.error || "Saved to local draft.");
      }
    } catch (err) {
      setMessage("Draft saved in browser cache.");
    }
    setSaving(false);
    setTimeout(() => setMessage(""), 3500);
  };

  const handleCommit = async () => {
    setCommitting(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("nrk_draft_preview_data", JSON.stringify({ draft: data }));
    }
    try {
      const res = await fetch("/api/admin/data?action=commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft: data, published: data }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setMessage(json.message || "All edits are committed to GitHub & live build triggered!");
        setShowCommitModal(false);
      } else {
        setMessage(json.message || json.error || "Failed to commit.");
      }
    } catch (err) {
      setMessage("Failed to execute commit.");
    }
    setCommitting(false);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleResetDraft = async () => {
    if (!confirm("Are you sure you want to discard your current draft and reset to live published site data?")) {
      return;
    }
    localStorage.removeItem("nrk_draft_preview_data");
    try {
      const res = await fetch("/api/admin/data?type=published");
      const pubData = await res.json();
      setData(pubData);
      await fetch("/api/admin/data?action=save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pubData),
      });
      setMessage("Draft reset to live published data!");
    } catch (_) {
      setMessage("Failed to reset draft.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const openPreview = (page: string = activePageTab) => {
    let path = "/?preview=true";
    if (page === "about") path = "/about?preview=true";
    if (page === "products") path = "/services?preview=true";
    if (page === "gallery") path = "/gallery?preview=true";
    if (page === "contact") path = "/contact?preview=true";
    window.open(path, "_blank");
  };

  const updateKey = (section: string, key: string, value: any) => {
    const updated = {
      ...data,
      [section]: {
        ...data?.[section],
        [key]: value,
      },
    };
    setData(updated);
  };

  const updateNestedArray = (section: string, index: number, field: string, value: any) => {
    const arr = [...(data?.[section] || [])];
    arr[index] = { ...arr[index], [field]: value };
    const updated = { ...data, [section]: arr };
    setData(updated);
  };

  const addArrayItem = (section: string, newItem: any) => {
    const arr = [...(data?.[section] || []), newItem];
    const updated = { ...data, [section]: arr };
    setData(updated);
  };

  const removeArrayItem = (section: string, index: number) => {
    const arr = [...(data?.[section] || [])];
    arr.splice(index, 1);
    const updated = { ...data, [section]: arr };
    setData(updated);
  };

  // Section list per page tab
  const getPageSections = () => {
    switch (activePageTab) {
      case "home":
        return [
          { id: "hero", label: "Hero Banner" },
          { id: "stats", label: "Key Metrics & Stats" },
          { id: "secondary", label: "Secondary Material" },
          { id: "partners", label: "Client Logos" },
          { id: "testimonials", label: "Testimonials" },
          { id: "whyChooseUs", label: "Why Choose Us" },
          { id: "connectCta", label: "Connect CTA" },
        ];
      case "about":
        return [
          { id: "aboutHero", label: "About Hero & Banner" },
          { id: "journey", label: "Company Journey (30+ Yrs)" },
          { id: "missionVision", label: "Mission & Vision" },
          { id: "leadership", label: "Founders & Leadership" },
          { id: "marketingTeam", label: "Marketing Team" },
        ];
      case "products":
        return [
          { id: "productsOverview", label: "Catalog Overview" },
          { id: "qualityControl", label: "Quality Assurance & Control" },
        ];
      case "gallery":
        return [{ id: "galleryGrid", label: "Industrial Gallery Photos" }];
      case "contact":
        return [{ id: "contactInfo", label: "Contact Info & Location" }];
      default:
        return [];
    }
  };

  if (!data) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <span className="text-sm font-bold text-gray-500">Loading Admin CMS & Catalog Data...</span>
        </div>
      </div>
    );
  }

  const sectionsList = getPageSections();

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* HEADER CONTROLS BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
              NRK CMS Manager
            </span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
            Website Page & Section CMS
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            onClick={() => handleSave()}
            disabled={saving}
            variant="outline"
            className="h-9 px-3.5 font-bold border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 rounded-xl text-xs"
          >
            <Save className="h-3.5 w-3.5 text-blue-600" />
            {saving ? "Saving..." : "Save Draft"}
          </Button>

          <Button
            onClick={() => setShowCommitModal(true)}
            disabled={committing}
            className="h-9 px-4 font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 rounded-xl shadow-md shadow-blue-600/20 text-xs"
          >
            <GitCommit className="h-3.5 w-3.5" />
            {committing ? "Committing..." : "Commit & Publish"}
          </Button>

          <Button
            onClick={() => openPreview()}
            variant="ghost"
            className="h-9 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-bold rounded-xl flex items-center gap-1 text-xs"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live Preview
          </Button>

          <Button
            onClick={handleResetDraft}
            variant="ghost"
            className="h-9 px-2.5 text-red-600 hover:bg-red-50 font-bold rounded-xl text-xs flex items-center gap-1"
            title="Discard draft changes"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
        </div>
      </div>

      {/* Toast Notification */}
      {message && (
        <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>{message}</span>
          </div>
        </div>
      )}

      {/* TOP HORIZONTAL PAGE TABS BAR */}
      <div className="bg-white p-2 rounded-2xl border border-gray-200/80 shadow-sm flex flex-wrap gap-2 sticky top-4 z-30">
        <button
          onClick={() => {
            setActivePageTab("home");
            setActiveSection("hero");
          }}
          className={`px-5 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activePageTab === "home"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <Home className="h-4 w-4" />
          <span>Home Page</span>
        </button>

        <button
          onClick={() => {
            setActivePageTab("about");
            setActiveSection("aboutHero");
          }}
          className={`px-5 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activePageTab === "about"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <Info className="h-4 w-4" />
          <span>About Us Page</span>
        </button>

        <button
          onClick={() => {
            setActivePageTab("products");
            setActiveSection("productsOverview");
          }}
          className={`px-5 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activePageTab === "products"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <Package className="h-4 w-4" />
          <span>Products & Services</span>
        </button>

        <button
          onClick={() => {
            setActivePageTab("gallery");
            setActiveSection("galleryGrid");
          }}
          className={`px-5 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activePageTab === "gallery"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <ImageIcon className="h-4 w-4" />
          <span>Gallery Page</span>
        </button>

        <button
          onClick={() => {
            setActivePageTab("contact");
            setActiveSection("contactInfo");
          }}
          className={`px-5 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activePageTab === "contact"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <Phone className="h-4 w-4" />
          <span>Contact Page</span>
        </button>
      </div>

      {/* TWO-COLUMN LAYOUT: FIXED LEFT SECTION SIDEBAR + RIGHT CONTENT EDITOR */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* LEFT VERTICAL SECTION SIDEBAR (Sticky while scrolling) */}
        <aside className="md:col-span-3 bg-white p-3 rounded-2xl border border-gray-200/80 shadow-sm sticky top-24 z-20 space-y-1">
          <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 mb-1">
            Page Sections
          </div>
          {sectionsList.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between group ${
                activeSection === sec.id
                  ? "bg-gray-900 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span>{sec.label}</span>
              <ChevronRight
                className={`h-3.5 w-3.5 transition-transform ${
                  activeSection === sec.id ? "text-blue-400 translate-x-0.5" : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </button>
          ))}
        </aside>

        {/* RIGHT MAIN EDITOR AREA */}
        <main className="md:col-span-9 space-y-6">
          {/* HOME PAGE EDITORS */}
          {activePageTab === "home" && (
            <>
              {activeSection === "hero" && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Hero Banner Configuration</h3>
                    <p className="text-xs text-gray-500">Edit tagline, main headings, and description for the home hero.</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-bold text-gray-700">Tagline Eyebrow</Label>
                      <Input
                        value={data.hero?.tagline || ""}
                        onChange={(e) => updateKey("hero", "tagline", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs font-bold text-gray-700">Heading Line 1</Label>
                        <Input
                          value={data.hero?.headingLine1 || ""}
                          onChange={(e) => updateKey("hero", "headingLine1", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-gray-700">Heading Line 2 (Highlighted)</Label>
                        <Input
                          value={data.hero?.headingLine2 || ""}
                          onChange={(e) => updateKey("hero", "headingLine2", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-gray-700">Heading Line 3</Label>
                        <Input
                          value={data.hero?.headingLine3 || ""}
                          onChange={(e) => updateKey("hero", "headingLine3", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-700">Description Paragraph</Label>
                      <Textarea
                        rows={3}
                        value={data.hero?.description || ""}
                        onChange={(e) => updateKey("hero", "description", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "stats" && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Key Metrics & Statistics</h3>
                      <p className="text-xs text-gray-500">Edit experience, reach, and retention metrics.</p>
                    </div>
                    <Button
                      onClick={() =>
                        addArrayItem("stats", {
                          value: "100+",
                          label: "New Metric",
                          description: "Metric details here",
                          icon: "star",
                        })
                      }
                      size="sm"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold border border-blue-200 text-xs rounded-xl"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add Metric
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(data.stats || []).map((stat: any, index: number) => (
                      <div key={index} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3 relative">
                        <button
                          onClick={() => removeArrayItem("stats", index)}
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                        <div>
                          <Label className="text-xs font-bold text-gray-700">Value (e.g. 30+)</Label>
                          <Input
                            value={stat.value}
                            onChange={(e) => updateNestedArray("stats", index, "value", e.target.value)}
                            className="mt-1 bg-white"
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-bold text-gray-700">Label</Label>
                          <Input
                            value={stat.label}
                            onChange={(e) => updateNestedArray("stats", index, "label", e.target.value)}
                            className="mt-1 bg-white"
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-bold text-gray-700">Description</Label>
                          <Textarea
                            rows={2}
                            value={stat.description}
                            onChange={(e) => updateNestedArray("stats", index, "description", e.target.value)}
                            className="mt-1 bg-white text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "secondary" && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Secondary Material Section</h3>
                    <p className="text-xs text-gray-500">Edit intro heading and description for secondary steel supply.</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-bold text-gray-700">Heading Title</Label>
                      <Input
                        value={data.servicesSection?.heading || ""}
                        onChange={(e) => updateKey("servicesSection", "heading", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-700">Description</Label>
                      <Textarea
                        rows={3}
                        value={data.servicesSection?.description || ""}
                        onChange={(e) => updateKey("servicesSection", "description", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "partners" && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Client & Brand Logos</h3>
                      <p className="text-xs text-gray-500">Manage client brand logos displayed on home page marquee.</p>
                    </div>
                    <Button
                      onClick={() =>
                        addArrayItem("partners", {
                          name: "New Partner",
                          logo: "/assests/client_logo/Tata_Steel_Logo.webp",
                          alt: "New Partner Logo",
                        })
                      }
                      size="sm"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold border border-blue-200 text-xs rounded-xl"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add Client Logo
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(data.partners || []).map((partner: any, index: number) => (
                      <div key={index} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-4 relative">
                        <button
                          onClick={() => removeArrayItem("partners", index)}
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                        <div>
                          <Label className="text-xs font-bold text-gray-700">Company Name</Label>
                          <Input
                            value={partner.name}
                            onChange={(e) => updateNestedArray("partners", index, "name", e.target.value)}
                            className="mt-1 bg-white"
                          />
                        </div>
                        <ImageField
                          label={`Logo for ${partner.name || "Client"}`}
                          value={partner.logo || ""}
                          onChange={(val) => updateNestedArray("partners", index, "logo", val)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "testimonials" && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Client Testimonials</h3>
                      <p className="text-xs text-gray-500">Manage client reviews and testimonials.</p>
                    </div>
                    <Button
                      onClick={() =>
                        addArrayItem("testimonials", {
                          quote: "Excellent quality material and fast delivery.",
                          name: "Client Name",
                          role: "Industrial Buyer",
                          initials: "CN",
                        })
                      }
                      size="sm"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold border border-blue-200 text-xs rounded-xl"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add Testimonial
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(data.testimonials || []).map((t: any, index: number) => (
                      <div key={index} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3 relative">
                        <button
                          onClick={() => removeArrayItem("testimonials", index)}
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                        <div>
                          <Label className="text-xs font-bold text-gray-700">Client Quote</Label>
                          <Textarea
                            rows={3}
                            value={t.quote}
                            onChange={(e) => updateNestedArray("testimonials", index, "quote", e.target.value)}
                            className="mt-1 bg-white text-xs"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-bold text-gray-700">Client Name</Label>
                            <Input
                              value={t.name}
                              onChange={(e) => updateNestedArray("testimonials", index, "name", e.target.value)}
                              className="mt-1 bg-white"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-bold text-gray-700">Role / Company</Label>
                            <Input
                              value={t.role}
                              onChange={(e) => updateNestedArray("testimonials", index, "role", e.target.value)}
                              className="mt-1 bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "whyChooseUs" && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Why Choose Us Section</h3>
                    <p className="text-xs text-gray-500">Edit titles and featured founder image.</p>
                  </div>
                  <div className="space-y-4">
                    <ImageField
                      label="Featured Image (Founder / Facility)"
                      value={data.whyChooseUs?.image || ""}
                      onChange={(val) => updateKey("whyChooseUs", "image", val)}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-bold text-gray-700">Eyebrow</Label>
                        <Input
                          value={data.whyChooseUs?.eyebrow || ""}
                          onChange={(e) => updateKey("whyChooseUs", "eyebrow", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-gray-700">Title</Label>
                        <Input
                          value={data.whyChooseUs?.title || ""}
                          onChange={(e) => updateKey("whyChooseUs", "title", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-700">Lead Paragraph</Label>
                      <Textarea
                        rows={3}
                        value={data.whyChooseUs?.lead || ""}
                        onChange={(e) => updateKey("whyChooseUs", "lead", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "connectCta" && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Connect CTA & Brochure</h3>
                    <p className="text-xs text-gray-500">Edit bottom banner titles and brochure download URL.</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-bold text-gray-700">Title</Label>
                      <Input
                        value={data.connectCta?.title || ""}
                        onChange={(e) => updateKey("connectCta", "title", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-700">Description</Label>
                      <Textarea
                        rows={2}
                        value={data.connectCta?.description || ""}
                        onChange={(e) => updateKey("connectCta", "description", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-700">Brochure PDF URL</Label>
                      <Input
                        value={data.connectCta?.brochureUrl || ""}
                        onChange={(e) => updateKey("connectCta", "brochureUrl", e.target.value)}
                        className="mt-1 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ABOUT US PAGE EDITORS */}
          {activePageTab === "about" && (
            <>
              {activeSection === "aboutHero" && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">About Us Banner & Summary</h3>
                    <p className="text-xs text-gray-500">Edit titles, overview summary, and about banner image.</p>
                  </div>
                  <div className="space-y-4">
                    <ImageField
                      label="About Hero Banner Image"
                      value={data.about?.image || ""}
                      onChange={(val) => updateKey("about", "image", val)}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-bold text-gray-700">Eyebrow</Label>
                        <Input
                          value={data.about?.eyebrow || ""}
                          onChange={(e) => updateKey("about", "eyebrow", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-gray-700">Title Highlight</Label>
                        <Input
                          value={data.about?.titleHighlight || ""}
                          onChange={(e) => updateKey("about", "titleHighlight", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-700">Company Summary</Label>
                      <Textarea
                        rows={4}
                        value={data.about?.summary || ""}
                        onChange={(e) => updateKey("about", "summary", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "journey" && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Company Journey (30+ Years)</h3>
                    <p className="text-xs text-gray-500">Edit company timeline milestones since 1994.</p>
                  </div>
                  <div className="space-y-6">
                    {(data.journey?.milestones || []).map((m: any, index: number) => (
                      <div key={index} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs font-bold text-gray-700">Year</Label>
                            <Input
                              value={m.year}
                              onChange={(e) => {
                                const arr = [...(data.journey?.milestones || [])];
                                arr[index] = { ...arr[index], year: e.target.value };
                                setData({ ...data, journey: { ...data.journey, milestones: arr } });
                              }}
                              className="mt-1 bg-white"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-bold text-gray-700">Milestone Title</Label>
                            <Input
                              value={m.title}
                              onChange={(e) => {
                                const arr = [...(data.journey?.milestones || [])];
                                arr[index] = { ...arr[index], title: e.target.value };
                                setData({ ...data, journey: { ...data.journey, milestones: arr } });
                              }}
                              className="mt-1 bg-white"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs font-bold text-gray-700">Description</Label>
                          <Textarea
                            rows={3}
                            value={m.description}
                            onChange={(e) => {
                              const arr = [...(data.journey?.milestones || [])];
                              arr[index] = { ...arr[index], description: e.target.value };
                              setData({ ...data, journey: { ...data.journey, milestones: arr } });
                            }}
                            className="mt-1 bg-white text-xs"
                          />
                        </div>
                        <ImageField
                          label={`Milestone Photo (${m.year})`}
                          value={m.image || ""}
                          onChange={(val) => {
                            const arr = [...(data.journey?.milestones || [])];
                            arr[index] = { ...arr[index], image: val };
                            setData({ ...data, journey: { ...data.journey, milestones: arr } });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "missionVision" && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Mission & Vision Statements</h3>
                    <p className="text-xs text-gray-500">Edit company mission pillars and strategic vision.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(data.missionVision?.mission || []).map((m: any, index: number) => (
                        <div key={index} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                          <Label className="text-xs font-bold text-gray-700">Mission Pillar Title</Label>
                          <Input
                            value={m.title}
                            onChange={(e) => {
                              const arr = [...(data.missionVision?.mission || [])];
                              arr[index] = { ...arr[index], title: e.target.value };
                              setData({ ...data, missionVision: { ...data.missionVision, mission: arr } });
                            }}
                            className="bg-white"
                          />
                          <Label className="text-xs font-bold text-gray-700">Description</Label>
                          <Textarea
                            rows={2}
                            value={m.description}
                            onChange={(e) => {
                              const arr = [...(data.missionVision?.mission || [])];
                              arr[index] = { ...arr[index], description: e.target.value };
                              setData({ ...data, missionVision: { ...data.missionVision, mission: arr } });
                            }}
                            className="bg-white text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "leadership" && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" /> Founders & Leadership Team
                      </h3>
                      <p className="text-xs text-gray-500">Edit founder and key executives displayed on the About page.</p>
                    </div>
                    <Button
                      onClick={() =>
                        addArrayItem("leadership", {
                          name: "Executive Name",
                          role: "Director",
                          description: "Executive details.",
                          image: "/company/Nimesh_sir.jpg",
                        })
                      }
                      size="sm"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold border border-blue-200 text-xs rounded-xl"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add Leadership Member
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(data.leadership || []).map((leader: any, index: number) => (
                      <div key={index} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-4 relative">
                        <button
                          onClick={() => removeArrayItem("leadership", index)}
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                        <div>
                          <Label className="text-xs font-bold text-gray-700">Full Name</Label>
                          <Input
                            value={leader.name}
                            onChange={(e) => updateNestedArray("leadership", index, "name", e.target.value)}
                            className="mt-1 bg-white font-bold"
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-bold text-gray-700">Role / Designation</Label>
                          <Input
                            value={leader.role}
                            onChange={(e) => updateNestedArray("leadership", index, "role", e.target.value)}
                            className="mt-1 bg-white"
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-bold text-gray-700">Description</Label>
                          <Textarea
                            rows={3}
                            value={leader.description}
                            onChange={(e) => updateNestedArray("leadership", index, "description", e.target.value)}
                            className="mt-1 bg-white text-xs"
                          />
                        </div>
                        <ImageField
                          label={`Photo of ${leader.name || "Leader"}`}
                          value={leader.image || ""}
                          onChange={(val) => updateNestedArray("leadership", index, "image", val)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "marketingTeam" && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                        <Users className="h-5 w-5 text-indigo-600" /> Marketing Team
                      </h3>
                      <p className="text-xs text-gray-500">Edit marketing team members displayed on the About page.</p>
                    </div>
                    <Button
                      onClick={() =>
                        addArrayItem("marketingTeam", {
                          name: "Marketing Member",
                          role: "Marketing Team",
                          description: "Marketing responsibilities.",
                          image: "/company/navin_marketing.png",
                        })
                      }
                      size="sm"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold border border-blue-200 text-xs rounded-xl"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add Marketing Member
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(data.marketingTeam || []).map((marketer: any, index: number) => (
                      <div key={index} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-4 relative">
                        <button
                          onClick={() => removeArrayItem("marketingTeam", index)}
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                        <div>
                          <Label className="text-xs font-bold text-gray-700">Full Name</Label>
                          <Input
                            value={marketer.name}
                            onChange={(e) => updateNestedArray("marketingTeam", index, "name", e.target.value)}
                            className="mt-1 bg-white font-bold"
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-bold text-gray-700">Role / Designation</Label>
                          <Input
                            value={marketer.role}
                            onChange={(e) => updateNestedArray("marketingTeam", index, "role", e.target.value)}
                            className="mt-1 bg-white"
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-bold text-gray-700">Description</Label>
                          <Textarea
                            rows={3}
                            value={marketer.description}
                            onChange={(e) => updateNestedArray("marketingTeam", index, "description", e.target.value)}
                            className="mt-1 bg-white text-xs"
                          />
                        </div>
                        <ImageField
                          label={`Photo of ${marketer.name || "Marketer"}`}
                          value={marketer.image || ""}
                          onChange={(val) => updateNestedArray("marketingTeam", index, "image", val)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* PRODUCTS & SERVICES PAGE EDITORS */}
          {activePageTab === "products" && (
            <>
              {activeSection === "productsOverview" && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Products & Services Catalog</h3>
                      <p className="text-xs text-gray-500">Manage products, processing services, technical specs, and variants.</p>
                    </div>
                    <a
                      href="/admin/products"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow inline-flex items-center gap-1.5"
                    >
                      <ExternalLink className="h-4 w-4" /> Open Full Catalog Manager
                    </a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
                      <h4 className="font-bold text-gray-900 text-base">Steel Products ({data.products?.length || 0})</h4>
                      <p className="text-xs text-gray-600">Prime & secondary steel products (HR Coils, CR Sheets, Structural Steel, etc.)</p>
                      <a href="/admin/products" className="inline-block text-xs font-bold text-blue-600 hover:underline pt-2">
                        Edit Products Catalog &rarr;
                      </a>
                    </div>
                    <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
                      <h4 className="font-bold text-gray-900 text-base">Processing Services ({data.services?.length || 0})</h4>
                      <p className="text-xs text-gray-600">Slitting, Cut-to-length, Pickling, and custom processing offerings.</p>
                      <a href="/admin/products" className="inline-block text-xs font-bold text-blue-600 hover:underline pt-2">
                        Edit Services Catalog &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "qualityControl" && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-blue-600" />
                      Quality Assurance & Stringent Quality Control
                    </h3>
                    <p className="text-xs text-gray-500">Edit quality assurance badges, description, inspection points, and certifications image.</p>
                  </div>

                  <div className="space-y-4">
                    <ImageField
                      label="Quality Control Inspection / Facility Image"
                      value={data.qualityControl?.image || ""}
                      onChange={(val) => updateKey("qualityControl", "image", val)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-bold text-gray-700">Eyebrow Tagline</Label>
                        <Input
                          value={data.qualityControl?.eyebrow || ""}
                          onChange={(e) => updateKey("qualityControl", "eyebrow", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-gray-700">Main Title</Label>
                        <Input
                          value={data.qualityControl?.title || ""}
                          onChange={(e) => updateKey("qualityControl", "title", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-bold text-gray-700">Badge Value (e.g. ISO)</Label>
                        <Input
                          value={data.qualityControl?.badgeValue || ""}
                          onChange={(e) => updateKey("qualityControl", "badgeValue", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-gray-700">Badge Label (e.g. 9001:2008 Certified)</Label>
                        <Input
                          value={data.qualityControl?.badgeLabel || ""}
                          onChange={(e) => updateKey("qualityControl", "badgeLabel", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-bold text-gray-700">Lead Paragraph</Label>
                      <Textarea
                        rows={3}
                        value={data.qualityControl?.lead || ""}
                        onChange={(e) => updateKey("qualityControl", "lead", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    {/* Features List */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">Quality Inspection Points</h4>
                        <Button
                          onClick={() => {
                            const features = [...(data.qualityControl?.features || [])];
                            features.push({
                              icon: "verified",
                              title: "New Quality Point",
                              description: "Description of quality check",
                            });
                            setData({ ...data, qualityControl: { ...data.qualityControl, features } });
                          }}
                          size="sm"
                          className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold border border-blue-200 text-xs rounded-xl"
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" /> Add Quality Point
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {(data.qualityControl?.features || []).map((feat: any, index: number) => (
                          <div key={index} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3 relative">
                            <button
                              onClick={() => {
                                const features = [...(data.qualityControl?.features || [])];
                                features.splice(index, 1);
                                setData({ ...data, qualityControl: { ...data.qualityControl, features } });
                              }}
                              className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <Label className="text-xs font-bold text-gray-700">Icon Name</Label>
                                <Input
                                  value={feat.icon}
                                  onChange={(e) => {
                                    const features = [...(data.qualityControl?.features || [])];
                                    features[index] = { ...features[index], icon: e.target.value };
                                    setData({ ...data, qualityControl: { ...data.qualityControl, features } });
                                  }}
                                  className="mt-1 bg-white text-xs font-mono"
                                />
                              </div>
                              <div>
                                <Label className="text-xs font-bold text-gray-700">Title</Label>
                                <Input
                                  value={feat.title}
                                  onChange={(e) => {
                                    const features = [...(data.qualityControl?.features || [])];
                                    features[index] = { ...features[index], title: e.target.value };
                                    setData({ ...data, qualityControl: { ...data.qualityControl, features } });
                                  }}
                                  className="mt-1 bg-white text-xs"
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs font-bold text-gray-700">Description</Label>
                              <Textarea
                                rows={2}
                                value={feat.description}
                                onChange={(e) => {
                                  const features = [...(data.qualityControl?.features || [])];
                                  features[index] = { ...features[index], description: e.target.value };
                                  setData({ ...data, qualityControl: { ...data.qualityControl, features } });
                                }}
                                className="mt-1 bg-white text-xs"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* GALLERY PAGE EDITORS */}
          {activePageTab === "gallery" && (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-blue-600" />
                    Industrial Gallery Photos
                  </h3>
                  <p className="text-xs text-gray-500">Manage plant photos, warehouse shots, and machinery images.</p>
                </div>
                <Button
                  onClick={() => {
                    const items = [...(data.gallery?.items || [])];
                    items.push({
                      id: `photo-${Date.now()}`,
                      title: "New Plant Image",
                      image: "/Gallary/Heavy_Slitting_Operations.png",
                      className: "md:col-span-1 md:row-span-1 min-h-[250px]",
                    });
                    setData({ ...data, gallery: { ...data.gallery, items } });
                  }}
                  size="sm"
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold border border-blue-200 text-xs rounded-xl"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Gallery Photo
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(data.gallery?.items || []).map((item: any, index: number) => (
                  <div key={index} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-4 relative">
                    <button
                      onClick={() => {
                        const items = [...(data.gallery?.items || [])];
                        items.splice(index, 1);
                        setData({ ...data, gallery: { ...data.gallery, items } });
                      }}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                    <div>
                      <Label className="text-xs font-bold text-gray-700">Photo Title / Caption</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          const items = [...(data.gallery?.items || [])];
                          items[index] = { ...items[index], title: e.target.value };
                          setData({ ...data, gallery: { ...data.gallery, items } });
                        }}
                        className="mt-1 bg-white font-bold text-xs"
                      />
                    </div>
                    <ImageField
                      label={`Gallery Image #${index + 1}`}
                      value={item.image || ""}
                      onChange={(val) => {
                        const items = [...(data.gallery?.items || [])];
                        items[index] = { ...items[index], image: val };
                        setData({ ...data, gallery: { ...data.gallery, items } });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT PAGE EDITORS */}
          {activePageTab === "contact" && (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  Contact Details & Office Location
                </h3>
                <p className="text-xs text-gray-500">Edit phone, email, address, and Google Maps URL.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-bold text-gray-700">Phone Number</Label>
                    <Input
                      value={data.contact?.phone || ""}
                      onChange={(e) => updateKey("contact", "phone", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-gray-700">Official Email</Label>
                    <Input
                      value={data.contact?.email || ""}
                      onChange={(e) => updateKey("contact", "email", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-700">Office & Facility Address</Label>
                  <Textarea
                    rows={2}
                    value={data.contact?.address || ""}
                    onChange={(e) => updateKey("contact", "address", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-700">Google Maps Embed URL</Label>
                  <Input
                    value={data.contact?.googleMapEmbed || ""}
                    onChange={(e) => updateKey("contact", "googleMapEmbed", e.target.value)}
                    className="mt-1 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* COMMIT CONFIRMATION MODAL */}
      {showCommitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-blue-600">
              <GitCommit className="h-7 w-7" />
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Commit & Publish to Live</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              This will perform a single atomic commit of your updated database configuration (`src/data/db.json`) to your GitHub repository, triggering a single Vercel production build.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-800 font-semibold">
              ✓ 1 production build will be triggered on Vercel containing all your latest edits.
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setShowCommitModal(false)}
                className="h-10 px-4 font-bold text-gray-600 hover:bg-gray-100 rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCommit}
                disabled={committing}
                className="h-10 px-5 font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 text-xs"
              >
                {committing ? "Committing to Git..." : "Confirm & Commit Now"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
