"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash, ExternalLink, Save, Check, Layout, Sparkles, MessageSquare, Briefcase, FileText } from "lucide-react";

// Image Field Helper Component with Real-time Preview and Local Upload Support
const ImageField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.url) {
        onChange(json.url);
      } else {
        alert("Upload failed: " + (json.error || "unknown error"));
      }
    } catch (err) {
      alert("Failed to upload file");
    }
    setUploading(false);
  };

  const uploadId = `file-upload-${label.replace(/[^a-zA-Z0-9]/g, "-")}`;

  return (
    <div className="space-y-2">
      <Label className="font-semibold text-gray-700">{label}</Label>
      <div className="flex gap-4 items-center">
        <div className="flex-1 flex flex-col gap-2">
          <Input 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder="e.g. /company/Nimesh_sir.jpg" 
          />
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              id={uploadId}
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <label
              htmlFor={uploadId}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border text-xs font-bold rounded-lg cursor-pointer transition-all inline-block select-none disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </label>
            {value && <span className="text-[10px] text-gray-400 truncate max-w-[200px]">{value}</span>}
          </div>
        </div>
        <div className="w-16 h-16 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center shrink-0 shadow-sm">
          <img 
            src={value || "/company_logo.webp"} 
            alt="Preview" 
            className="object-cover w-full h-full" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=No+Image";
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default function ContentAdmin() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [committing, setCommitting] = useState(false);
  const [message, setMessage] = useState("");
  const [activePreviewTab, setActivePreviewTab] = useState("home");
  const [activeSection, setActiveSection] = useState("hero");
  const [showCommitModal, setShowCommitModal] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data?type=draft")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load data", err));
  }, []);

  const handleSave = async (updatedData = data) => {
    setSaving(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("nrk_draft_preview_data", JSON.stringify({ draft: updatedData }));
    }
    try {
      await fetch("/api/admin/data?action=save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      setMessage("Draft saved successfully!");
    } catch (err) {
      setMessage("Failed to save.");
    }
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCommit = async () => {
    setCommitting(true);
    try {
      await fetch("/api/admin/data?action=save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await fetch("/api/admin/data?action=commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      setMessage("All edits are committed and live!");
    } catch (err) {
      setMessage("Failed to commit.");
    }
    setCommitting(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const openPreview = () => {
    let path = "/?preview=true";
    if (activePreviewTab === "about") path = "/about?preview=true";
    if (activePreviewTab === "services") path = "/services?preview=true";
    window.open(path, "_blank");
  };

  const updateKey = (section: string, key: string, value: any) => {
    setData({
      ...data,
      [section]: {
        ...data[section],
        [key]: value,
      },
    });
  };

  const menuItems = [
    { id: "hero", label: "Home Hero", icon: Sparkles },
    { id: "stats", label: "Home Stats", icon: Layout },
    { id: "servicesSection", label: "Services Intro", icon: Briefcase },
    { id: "why-us", label: "Why Choose Us", icon: Sparkles },
    { id: "partners", label: "Partners & Brands", icon: Layout },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "about", label: "About Hero", icon: Sparkles },
    { id: "journey", label: "Company Journey", icon: Layout },
    { id: "philosophy", label: "Mission & Vision", icon: Sparkles },
    { id: "cta", label: "Connect CTA & Brochure", icon: FileText },
  ];

  if (!data) return <div className="p-10 text-center font-semibold text-gray-500">Loading Content Settings...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner Control Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Website Pages Content Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Manage taglines, sliders, stats, testimonials, and company philosophy.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {message && (
            <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 flex items-center gap-1.5 animate-pulse">
              <Check className="h-4 w-4" /> {message}
            </span>
          )}
          
          <select 
            value={activePreviewTab} 
            onChange={(e) => setActivePreviewTab(e.target.value)}
            className="border rounded-lg text-sm px-3 py-2 bg-gray-50 font-medium"
          >
            <option value="home">Preview Home Page</option>
            <option value="about">Preview About Us</option>
            <option value="services">Preview Products Page</option>
          </select>

          <Button variant="outline" onClick={openPreview} className="flex items-center gap-1.5">
            <ExternalLink className="h-4 w-4" /> Live Preview
          </Button>

          <Button variant="secondary" onClick={() => handleSave(data)} disabled={saving} className="flex items-center gap-1.5">
            <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Draft"}
          </Button>

          <Button onClick={() => setShowCommitModal(true)} disabled={committing || saving} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            {committing ? "Deploying..." : "Commit & Deploy"}
          </Button>
        </div>
      </div>

      {/* Rebuilt Sidebar Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left Column Sidebar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-1 h-fit">
          <h2 className="text-xs uppercase font-black tracking-wider text-gray-400 px-3 mb-2">Sections</h2>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm font-semibold transition-all ${
                  isActive 
                    ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-50/50" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <IconComponent className={`h-4 w-4 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Editor Columns */}
        <div className="md:col-span-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          
          {/* 1. Home Hero */}
          {activeSection === "hero" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-3 text-gray-800">Home Hero Section</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tagline">Rotating Typewriter Tagline</Label>
                  <Input id="tagline" value={data.hero.tagline} onChange={(e) => updateKey("hero", "tagline", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heading1">Title Line 1</Label>
                  <Input id="heading1" value={data.hero.headingLine1} onChange={(e) => updateKey("hero", "headingLine1", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heading2">Title Line 2</Label>
                  <Input id="heading2" value={data.hero.headingLine2} onChange={(e) => updateKey("hero", "headingLine2", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heading3">Title Line 3 (Accent color)</Label>
                  <Input id="heading3" value={data.hero.headingLine3} onChange={(e) => updateKey("hero", "headingLine3", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroDesc">Hero Subheading Description</Label>
                <Textarea id="heroDesc" rows={3} value={data.hero.description} onChange={(e) => updateKey("hero", "description", e.target.value)} />
              </div>
              
              {/* Feature Highlights */}
              <div className="pt-4 border-t space-y-4">
                <h3 className="font-bold text-gray-800">Hero Feature highlights</h3>
                {data.hero.features.map((feat: any, idx: number) => (
                  <div key={idx} className="p-4 border rounded-xl bg-gray-50/50 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label>Icon ID</Label>
                      <Input value={feat.icon} onChange={e => {
                        const feats = [...data.hero.features];
                        feats[idx].icon = e.target.value;
                        updateKey("hero", "features", feats);
                      }} />
                    </div>
                    <div className="space-y-1">
                      <Label>Title</Label>
                      <Input value={feat.title} onChange={e => {
                        const feats = [...data.hero.features];
                        feats[idx].title = e.target.value;
                        updateKey("hero", "features", feats);
                      }} />
                    </div>
                    <div className="space-y-1">
                      <Label>Description</Label>
                      <Input value={feat.description} onChange={e => {
                        const feats = [...data.hero.features];
                        feats[idx].description = e.target.value;
                        updateKey("hero", "features", feats);
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Home Stats */}
          {activeSection === "stats" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-3 text-gray-800">Homepage Stats Counters</h2>
              <div className="grid grid-cols-1 gap-6">
                {data.stats.map((stat: any, idx: number) => (
                  <div key={idx} className="p-4 border rounded-xl bg-gray-50/50 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div className="space-y-1">
                      <Label>Counter Value (e.g. 4000+)</Label>
                      <Input value={stat.value} onChange={e => {
                        const updated = [...data.stats];
                        updated[idx].value = e.target.value;
                        setData({ ...data, stats: updated });
                      }} />
                    </div>
                    <div className="space-y-1">
                      <Label>Label Text</Label>
                      <Input value={stat.label} onChange={e => {
                        const updated = [...data.stats];
                        updated[idx].label = e.target.value;
                        setData({ ...data, stats: updated });
                      }} />
                    </div>
                    <div className="space-y-1">
                      <Label>Short Description</Label>
                      <Textarea rows={1} value={stat.description} onChange={e => {
                        const updated = [...data.stats];
                        updated[idx].description = e.target.value;
                        setData({ ...data, stats: updated });
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Services Intro */}
          {activeSection === "servicesSection" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-3 text-gray-800">Homepage Services Header</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="servHeading">Section Heading</Label>
                  <Input id="servHeading" value={data.servicesSection.heading} onChange={(e) => updateKey("servicesSection", "heading", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servDesc">Description Paragraph</Label>
                  <Textarea id="servDesc" rows={3} value={data.servicesSection.description} onChange={(e) => updateKey("servicesSection", "description", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* 4. Why Choose Us */}
          {activeSection === "why-us" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-3 text-gray-800">Why Choose Us Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="whyEyebrow">Eyebrow</Label>
                  <Input id="whyEyebrow" value={data.whyChooseUs.eyebrow} onChange={(e) => updateKey("whyChooseUs", "eyebrow", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whyTitle">Main Section Title</Label>
                  <Input id="whyTitle" value={data.whyChooseUs.title} onChange={(e) => updateKey("whyChooseUs", "title", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="badgeVal">Badge Value (e.g. 30+)</Label>
                  <Input id="badgeVal" value={data.whyChooseUs.badgeValue} onChange={(e) => updateKey("whyChooseUs", "badgeValue", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="badgeLbl">Badge Label (e.g. Years of Trust)</Label>
                  <Input id="badgeLbl" value={data.whyChooseUs.badgeLabel} onChange={(e) => updateKey("whyChooseUs", "badgeLabel", e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <ImageField 
                    label="Cover Image Path" 
                    value={data.whyChooseUs.image || ""} 
                    onChange={(v) => updateKey("whyChooseUs", "image", v)} 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="whyLead">Lead Intro Text</Label>
                  <Textarea id="whyLead" rows={2} value={data.whyChooseUs.lead} onChange={(e) => updateKey("whyChooseUs", "lead", e.target.value)} />
                </div>
              </div>

              {/* Features List */}
              <div className="pt-4 space-y-4 border-t">
                <h3 className="font-bold text-gray-800">Why Choose Us feature grid</h3>
                <div className="grid grid-cols-1 gap-4">
                  {data.whyChooseUs.features.map((feat: any, idx: number) => (
                    <div key={idx} className="flex gap-4 p-4 border rounded-xl bg-gray-50/50 items-start">
                      <span className="font-bold text-gray-400 self-center">#{idx + 1}</span>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <Label>Icon ID</Label>
                          <Input value={feat.icon} onChange={e => {
                            const feats = [...data.whyChooseUs.features];
                            feats[idx].icon = e.target.value;
                            updateKey("whyChooseUs", "features", feats);
                          }} />
                        </div>
                        <div className="space-y-1">
                          <Label>Title</Label>
                          <Input value={feat.title} onChange={e => {
                            const feats = [...data.whyChooseUs.features];
                            feats[idx].title = e.target.value;
                            updateKey("whyChooseUs", "features", feats);
                          }} />
                        </div>
                        <div className="space-y-1">
                          <Label>Description</Label>
                          <Input value={feat.description} onChange={e => {
                            const feats = [...data.whyChooseUs.features];
                            feats[idx].description = e.target.value;
                            updateKey("whyChooseUs", "features", feats);
                          }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. Partners */}
          {activeSection === "partners" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-xl font-bold text-gray-800">Brands We Work With</h2>
                <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => {
                  const updated = [...data.partners, { name: "New Partner", logo: "/assests/client_logo/sail.webp", alt: "New Partner" }];
                  setData({ ...data, partners: updated });
                }}>
                  <Plus className="h-4 w-4" /> Add Brand
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {data.partners.map((partner: any, idx: number) => (
                  <div key={idx} className="flex gap-4 p-4 border rounded-xl items-start bg-gray-50/50">
                    <div className="flex-1 space-y-4">
                      <div className="space-y-1">
                        <Label>Brand Name</Label>
                        <Input value={partner.name} onChange={(e) => {
                          const updated = [...data.partners];
                          updated[idx].name = e.target.value;
                          updated[idx].alt = e.target.value;
                          setData({ ...data, partners: updated });
                        }} />
                      </div>
                      <ImageField 
                        label="Logo Image Path" 
                        value={partner.logo} 
                        onChange={(v) => {
                          const updated = [...data.partners];
                          updated[idx].logo = v;
                          setData({ ...data, partners: updated });
                        }} 
                      />
                    </div>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 shrink-0 self-center" onClick={() => {
                      const updated = data.partners.filter((_: any, i: number) => i !== idx);
                      setData({ ...data, partners: updated });
                    }}><Trash className="h-5 w-5" /></Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Testimonials */}
          {activeSection === "testimonials" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-xl font-bold text-gray-800">Client Reviews</h2>
                <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => {
                  const updated = [...data.testimonials, { quote: "", name: "New Client", role: "Partner", initials: "NC", avatarIcon: "person", avatarClass: "bg-blue-600 text-white" }];
                  setData({ ...data, testimonials: updated });
                }}>
                  <Plus className="h-4 w-4" /> Add Review
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {data.testimonials.map((review: any, idx: number) => (
                  <div key={idx} className="flex gap-4 p-5 border rounded-xl bg-gray-50/50 items-start">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label>Quote Text</Label>
                        <Textarea rows={2} value={review.quote} onChange={(e) => {
                          const updated = [...data.testimonials];
                          updated[idx].quote = e.target.value;
                          setData({ ...data, testimonials: updated });
                        }} />
                      </div>
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input value={review.name} onChange={(e) => {
                          const updated = [...data.testimonials];
                          updated[idx].name = e.target.value;
                          const initials = e.target.value.split(" ").map((n: string) => n[0]).join("").slice(0,2).toUpperCase();
                          updated[idx].initials = initials || "NC";
                          setData({ ...data, testimonials: updated });
                        }} />
                      </div>
                      <div className="space-y-2">
                        <Label>Role / Title</Label>
                        <Input value={review.role} onChange={(e) => {
                          const updated = [...data.testimonials];
                          updated[idx].role = e.target.value;
                          setData({ ...data, testimonials: updated });
                        }} />
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => {
                      const updated = data.testimonials.filter((_: any, i: number) => i !== idx);
                      setData({ ...data, testimonials: updated });
                    }}><Trash className="h-5 w-5" /></Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. About Hero */}
          {activeSection === "about" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-3 text-gray-800">About Us Page Hero</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eyebrowAbt">Eyebrow</Label>
                  <Input id="eyebrowAbt" value={data.about.eyebrow} onChange={(e) => updateKey("about", "eyebrow", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleBefore">Title Prefix</Label>
                  <Input id="titleBefore" value={data.about.titleBefore} onChange={(e) => updateKey("about", "titleBefore", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleHighlight">Title Highlight</Label>
                  <Input id="titleHighlight" value={data.about.titleHighlight} onChange={(e) => updateKey("about", "titleHighlight", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleAfter">Title Suffix</Label>
                  <Input id="titleAfter" value={data.about.titleAfter} onChange={(e) => updateKey("about", "titleAfter", e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="summaryAbt">Main Summary</Label>
                  <Textarea id="summaryAbt" rows={3} value={data.about.summary} onChange={(e) => updateKey("about", "summary", e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <ImageField 
                    label="Hero Background Media Path" 
                    value={data.about.image} 
                    onChange={(v) => updateKey("about", "image", v)} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* 8. Journey Milestones */}
          {activeSection === "journey" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-3 text-gray-800">Company Journey History</h2>
              
              {/* Legacy lines list */}
              <div className="space-y-3">
                <Label>History Paragraphs (Lines of copy)</Label>
                {data.journey.legacyLines.map((line: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <Textarea 
                      rows={2} 
                      value={line} 
                      onChange={e => {
                        const updated = [...data.journey.legacyLines];
                        updated[idx] = e.target.value;
                        updateKey("journey", "legacyLines", updated);
                      }} 
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>

              {/* Milestones list */}
              <div className="pt-4 border-t space-y-4">
                <h3 className="font-bold text-gray-800">Journey Milestones</h3>
                <div className="space-y-6">
                  {data.journey.milestones.map((ms: any, idx: number) => (
                    <div key={idx} className="p-4 border rounded-xl bg-gray-50/50 space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <Label>Milestone Year (e.g. 1994)</Label>
                          <Input value={ms.year} onChange={e => {
                            const updated = [...data.journey.milestones];
                            updated[idx].year = e.target.value;
                            updateKey("journey", "milestones", updated);
                          }} />
                        </div>
                        <div className="space-y-1">
                          <Label>Milestone Title</Label>
                          <Input value={ms.title} onChange={e => {
                            const updated = [...data.journey.milestones];
                            updated[idx].title = e.target.value;
                            updateKey("journey", "milestones", updated);
                          }} />
                        </div>
                        <div className="space-y-1">
                          <Label>Icon ID</Label>
                          <Input value={ms.icon} onChange={e => {
                            const updated = [...data.journey.milestones];
                            updated[idx].icon = e.target.value;
                            updateKey("journey", "milestones", updated);
                          }} />
                        </div>
                        <div className="space-y-1 md:col-span-1">
                          <Label>Photo Image URL</Label>
                          <Input value={ms.image} onChange={e => {
                            const updated = [...data.journey.milestones];
                            updated[idx].image = e.target.value;
                            updateKey("journey", "milestones", updated);
                          }} />
                        </div>
                        <div className="space-y-1 col-span-2 md:col-span-4">
                          <Label>Description Copy</Label>
                          <Textarea rows={2} value={ms.description} onChange={e => {
                            const updated = [...data.journey.milestones];
                            updated[idx].description = e.target.value;
                            updateKey("journey", "milestones", updated);
                          }} />
                        </div>
                        <div className="col-span-2 md:col-span-4">
                          <ImageField 
                            label="Milestone Cover Image" 
                            value={ms.image} 
                            onChange={(v) => {
                              const updated = [...data.journey.milestones];
                              updated[idx].image = v;
                              updateKey("journey", "milestones", updated);
                            }} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 9. Mission & Vision */}
          {activeSection === "philosophy" && (
            <div className="space-y-6">
              
              {/* Mission statement */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <h2 className="text-xl font-bold text-gray-800">Our Mission Statements</h2>
                  <Button size="sm" variant="outline" onClick={() => {
                    const updated = [...data.missionVision.mission, { title: "New statement", description: "", icon: "flag" }];
                    updateKey("missionVision", "mission", updated);
                  }}>+ Add Mission</Button>
                </div>
                {data.missionVision.mission.map((ms: any, idx: number) => (
                  <div key={idx} className="p-4 border rounded-xl bg-gray-50/50 flex gap-4 items-start">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label>Title</Label>
                        <Input value={ms.title} onChange={e => {
                          const updated = [...data.missionVision.mission];
                          updated[idx].title = e.target.value;
                          updateKey("missionVision", "mission", updated);
                        }} />
                      </div>
                      <div className="space-y-1">
                        <Label>Icon ID</Label>
                        <Input value={ms.icon} onChange={e => {
                          const updated = [...data.missionVision.mission];
                          updated[idx].icon = e.target.value;
                          updateKey("missionVision", "mission", updated);
                        }} />
                      </div>
                      <div className="space-y-1 col-span-2">
                        <Label>Description Copy</Label>
                        <Textarea rows={2} value={ms.description} onChange={e => {
                          const updated = [...data.missionVision.mission];
                          updated[idx].description = e.target.value;
                          updateKey("missionVision", "mission", updated);
                        }} />
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => {
                      const updated = data.missionVision.mission.filter((_: any, i: number) => i !== idx);
                      updateKey("missionVision", "mission", updated);
                    }}><Trash className="h-5 w-5" /></Button>
                  </div>
                ))}
              </div>

              {/* Vision statement */}
              <div className="pt-6 border-t space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <h2 className="text-xl font-bold text-gray-800">Our Vision Statements</h2>
                  <Button size="sm" variant="outline" onClick={() => {
                    const updated = [...data.missionVision.vision, { title: "New Vision", description: "", icon: "visibility" }];
                    updateKey("missionVision", "vision", updated);
                  }}>+ Add Vision</Button>
                </div>
                {data.missionVision.vision.map((vs: any, idx: number) => (
                  <div key={idx} className="p-4 border rounded-xl bg-gray-50/50 flex gap-4 items-start">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label>Title</Label>
                        <Input value={vs.title} onChange={e => {
                          const updated = [...data.missionVision.vision];
                          updated[idx].title = e.target.value;
                          updateKey("missionVision", "vision", updated);
                        }} />
                      </div>
                      <div className="space-y-1">
                        <Label>Icon ID</Label>
                        <Input value={vs.icon} onChange={e => {
                          const updated = [...data.missionVision.vision];
                          updated[idx].icon = e.target.value;
                          updateKey("missionVision", "vision", updated);
                        }} />
                      </div>
                      <div className="space-y-1 col-span-2">
                        <Label>Description Copy</Label>
                        <Textarea rows={2} value={vs.description} onChange={e => {
                          const updated = [...data.missionVision.vision];
                          updated[idx].description = e.target.value;
                          updateKey("missionVision", "vision", updated);
                        }} />
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => {
                      const updated = data.missionVision.vision.filter((_: any, i: number) => i !== idx);
                      updateKey("missionVision", "vision", updated);
                    }}><Trash className="h-5 w-5" /></Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. Connect CTA */}
          {activeSection === "cta" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-3 text-gray-800">Connect CTA Section</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ctaEyebrow">Eyebrow</Label>
                  <Input id="ctaEyebrow" value={data.connectCta.eyebrow} onChange={(e) => updateKey("connectCta", "eyebrow", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaTitle">Title</Label>
                  <Input id="ctaTitle" value={data.connectCta.title} onChange={(e) => updateKey("connectCta", "title", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaDesc">Description Copy</Label>
                  <Textarea id="ctaDesc" rows={3} value={data.connectCta.description} onChange={(e) => updateKey("connectCta", "description", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brochure">Brochure Download Link</Label>
                  <Input id="brochure" value={data.connectCta.brochureUrl} onChange={(e) => updateKey("connectCta", "brochureUrl", e.target.value)} />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Confirmation Modal */}
      {showCommitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl p-7 max-w-md w-full border border-gray-100 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-amber-50 rounded-2xl text-amber-600 shrink-0 shadow-sm border border-amber-100/50">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Deploy Draft to Live Site?</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  You are about to push all your saved draft edits to the live production server.
                </p>
              </div>
            </div>

            <div className="bg-blue-50/60 border border-blue-100/80 rounded-2xl p-4 space-y-2">
              <p className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-ping" />
                Before you commit:
              </p>
              <ul className="text-xs text-blue-700/90 list-disc list-inside space-y-1.5 pl-1 leading-relaxed">
                <li>Make sure to preview the pages using the <strong>Live Preview</strong> button.</li>
                <li>Verify that all updated texts, metrics, and images look correct.</li>
              </ul>
            </div>

            <div className="flex gap-3 justify-end pt-1">
              <Button variant="outline" onClick={() => setShowCommitModal(false)} className="rounded-xl font-semibold border-gray-200">
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setShowCommitModal(false);
                  handleCommit();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/10"
              >
                Confirm & Deploy Live
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
