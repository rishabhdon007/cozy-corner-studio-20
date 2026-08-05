"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash, ExternalLink, Save, Check, Layers } from "lucide-react";

import { products as staticProducts } from "@/data/products";
import { services as staticServices } from "@/data/services";

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
    <div className="space-y-2 w-full">
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
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="px-3 py-1 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-bold rounded-lg transition-all inline-block select-none"
              >
                Clear
              </button>
            )}
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

type Spec = { label: string; value: string };
type FeatureCard = { icon: string; title: string; body: string };
type Offering = {
  id: string;
  title: string;
  price: string;
  specs: Spec[];
};

type CatalogItem = {
  slug: string;
  title: string;
  category: string;
  eyebrow: string;
  badge: string;
  summary: string;
  description: string;
  mainImage: string;
  kind: "product" | "service";
  section: string; // prime, secondary, processing, fabrication, specialty
  specs: Spec[];
  variants: string[];
  process: string[];
  featureCards: FeatureCard[];
  offerings: Offering[];
  gallery?: string[];
};

export default function CatalogManager() {
  const [dbData, setDbData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [committing, setCommitting] = useState(false);
  const [message, setMessage] = useState("");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editingKind, setEditingKind] = useState<"product" | "service">("product");
  const [showCommitModal, setShowCommitModal] = useState(false);

  // Form State
  const [form, setForm] = useState<CatalogItem>({
    slug: "",
    title: "",
    category: "Prime Material",
    eyebrow: "",
    badge: "",
    summary: "",
    description: "",
    mainImage: "",
    kind: "product",
    section: "prime",
    specs: [],
    variants: [],
    process: [],
    featureCards: [],
    offerings: [],
    gallery: [],
  });

  useEffect(() => {
    fetch("/api/admin/data?type=published")
      .then((res) => res.json())
      .then((json) => setDbData(json))
      .catch((err) => console.error("Failed to load data", err));
  }, []);

  const handleSave = async (updatedDbData = dbData) => {
    setSaving(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("nrk_draft_preview_data", JSON.stringify({ draft: updatedDbData }));
    }
    try {
      await fetch("/api/admin/data?action=save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDbData),
      });
      setMessage("Saved to draft!");
      setDbData(updatedDbData);
    } catch (err) {
      setMessage("Failed to save draft.");
    }
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCommit = async () => {
    setCommitting(true);
    try {
      await handleSave();
      await fetch("/api/admin/data?action=commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      setMessage("Catalog updates committed & live!");
    } catch (err) {
      setMessage("Commit failed.");
    }
    setCommitting(false);
    setTimeout(() => setMessage(""), 3000);
  };

  // Combine static and dynamic data
  const getCombinedItems = () => {
    if (!dbData) return { products: [], services: [] };

    const draftProducts = dbData.products || [];
    const draftServices = dbData.services || [];

    const mergedProducts = [
      ...draftProducts,
      ...Object.values(staticProducts)
        .filter((sp: any) => !draftProducts.some((dp: any) => dp.slug === sp.slug))
        .map((sp: any) => ({ ...sp, kind: "product" as const, section: sp.section || "prime" })),
    ];

    const mergedServices = [
      ...draftServices,
      ...Object.values(staticServices)
        .filter((ss: any) => !draftServices.some((ds: any) => ds.slug === ss.slug))
        .map((ss: any) => ({ ...ss, kind: "service" as const, section: ss.section || "processing" })),
    ];

    return { products: mergedProducts, services: mergedServices };
  };

  const { products, services } = getCombinedItems();

  const handleEdit = (item: any, kind: "product" | "service") => {
    setEditingKind(kind);
    setForm({
      slug: item.slug || "",
      title: item.title || "",
      category: item.category || "",
      eyebrow: item.eyebrow || "",
      badge: item.badge || "",
      summary: item.summary || "",
      description: item.description || "",
      mainImage: item.mainImage || item.image || "",
      kind: kind,
      section: item.section || (kind === "product" ? "prime" : "processing"),
      specs: item.specs || [],
      variants: item.variants || [],
      process: item.process || [],
      featureCards: item.featureCards || [],
      offerings: item.offerings || [],
      gallery: item.gallery || [],
    });
    setEditingSlug(item.slug);
  };

  const handleAddNew = (kind: "product" | "service") => {
    setEditingKind(kind);
    setForm({
      slug: `${kind}-${Date.now()}`,
      title: "",
      category: kind === "product" ? "Prime Material" : "Steel Processing",
      eyebrow: "",
      badge: "",
      summary: "",
      description: "",
      mainImage: "/assests/products/plate.webp",
      kind: kind,
      section: kind === "product" ? "prime" : "processing",
      specs: [],
      variants: [],
      process: [],
      featureCards: [],
      offerings: [],
      gallery: [],
    });
    setEditingSlug("new");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const arrayKey = editingKind === "product" ? "products" : "services";
    const currentList = dbData[arrayKey] || [];

    const cleanedGallery = (form.gallery || []).filter((src) => src.trim() !== "");
    const cleanedForm = { ...form, gallery: cleanedGallery };

    let updatedList;
    if (editingSlug === "new") {
      // Check for slug duplicates in both static and dynamic lists
      const slugExists = [...products, ...services].some((item) => item.slug === cleanedForm.slug);
      if (slugExists) {
        alert("This URL Slug is already taken!");
        return;
      }
      updatedList = [...currentList, cleanedForm];
    } else {
      // If it existed statically but not dynamically yet, add it. Otherwise modify.
      const existsInDb = currentList.some((p: any) => p.slug === editingSlug);
      if (existsInDb) {
        updatedList = currentList.map((p: any) => (p.slug === editingSlug ? cleanedForm : p));
      } else {
        updatedList = [...currentList, cleanedForm];
      }
    }

    const updatedDbData = { ...dbData, [arrayKey]: updatedList };
    handleSave(updatedDbData);
    if (editingSlug === "new") {
      setEditingSlug(cleanedForm.slug);
    }
  };

  const handleDelete = (slug: string, kind: "product" | "service", e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete/reset this item? (For static items, this resets them to default)")) {
      const arrayKey = kind === "product" ? "products" : "services";
      const updatedList = (dbData[arrayKey] || []).filter((p: any) => p.slug !== slug);
      handleSave({ ...dbData, [arrayKey]: updatedList });
      if (editingSlug === slug) {
        setEditingSlug(null);
      }
    }
  };

  const openPreview = () => {
    if (!form.slug) return;
    const pathPrefix = form.kind === "product" ? "/product" : "/services";
    window.open(`${pathPrefix}/${form.slug}?preview=true`, "_blank");
  };

  // Dynamic Array Helper State Modifiers
  const updateSpec = (idx: number, field: keyof Spec, val: string) => {
    const updated = [...form.specs];
    updated[idx][field] = val;
    setForm({ ...form, specs: updated });
  };

  const updateFeature = (idx: number, field: keyof FeatureCard, val: string) => {
    const updated = [...form.featureCards];
    updated[idx][field] = val;
    setForm({ ...form, featureCards: updated });
  };

  const updateOffering = (idx: number, field: keyof Offering, val: any) => {
    const updated = [...form.offerings];
    updated[idx] = { ...updated[idx], [field]: val };
    setForm({ ...form, offerings: updated });
  };

  if (!dbData) return <div className="p-10 text-center font-semibold text-gray-500">Loading catalog manager...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner Control Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Products & Services Catalog</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and edit the entire product and service catalog of NRK Steel.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {message && (
            <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 flex items-center gap-1.5 animate-pulse">
              <Check className="h-4 w-4" /> {message}
            </span>
          )}
          
          {editingSlug && editingSlug !== "new" && (
            <Button variant="outline" onClick={openPreview} className="flex items-center gap-1.5">
              <ExternalLink className="h-4 w-4" /> Preview Page
            </Button>
          )}

          <Button variant="secondary" onClick={() => handleSave(dbData)} disabled={saving} className="flex items-center gap-1.5">
            <Save className="h-4 w-4" /> Save Draft
          </Button>

          <Button onClick={() => setShowCommitModal(true)} disabled={committing || saving} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            {committing ? "Deploying..." : "Commit & Deploy"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Product & Service List */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6 h-fit">
          
          {/* Products Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-black text-gray-800 flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-blue-600" /> Products
              </h2>
              <Button size="sm" variant="outline" onClick={() => handleAddNew("product")}>+ Add</Button>
            </div>
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {products.map((item: any) => (
                <div 
                  key={item.slug} 
                  className={`flex justify-between items-center p-2.5 border rounded-lg cursor-pointer transition-all ${
                    editingSlug === item.slug ? "border-blue-500 bg-blue-50/30 font-semibold" : "border-gray-100 hover:bg-gray-50"
                  }`}
                  onClick={() => handleEdit(item, "product")}
                >
                  <span className="truncate text-sm text-gray-800">{item.title}</span>
                  <div className="flex gap-1 items-center" onClick={e => e.stopPropagation()}>
                    {dbData.products?.some((dp: any) => dp.slug === item.slug) && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold mr-1">Draft</span>
                    )}
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={(e) => handleDelete(item.slug, "product", e)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-black text-gray-800 flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-purple-600" /> Services
              </h2>
              <Button size="sm" variant="outline" onClick={() => handleAddNew("service")}>+ Add</Button>
            </div>
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {services.map((item: any) => (
                <div 
                  key={item.slug} 
                  className={`flex justify-between items-center p-2.5 border rounded-lg cursor-pointer transition-all ${
                    editingSlug === item.slug ? "border-purple-500 bg-purple-50/30 font-semibold" : "border-gray-100 hover:bg-gray-50"
                  }`}
                  onClick={() => handleEdit(item, "service")}
                >
                  <span className="truncate text-sm text-gray-800">{item.title}</span>
                  <div className="flex gap-1 items-center" onClick={e => e.stopPropagation()}>
                    {dbData.services?.some((ds: any) => ds.slug === item.slug) && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold mr-1">Draft</span>
                    )}
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={(e) => handleDelete(item.slug, "service", e)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Columns: Editor Form */}
        <div className="lg:col-span-2">
          {editingSlug ? (
            <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b bg-gray-50/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingSlug === "new" ? `Create New ${editingKind}` : `Edit ${editingKind}`}
                </h2>
                <span className="text-xs uppercase font-black bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">{form.kind}</span>
              </div>

              <Tabs defaultValue="info" className="w-full">
                <TabsList className="bg-gray-100/50 border-b p-1 rounded-none flex w-full">
                  <TabsTrigger value="info" className="flex-1 rounded-none py-3 font-semibold text-sm border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">General Info</TabsTrigger>
                  <TabsTrigger value="specs" className="flex-1 rounded-none py-3 font-semibold text-sm border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">Specs & Features</TabsTrigger>
                  <TabsTrigger value="subservices" className="flex-1 rounded-none py-3 font-semibold text-sm border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">Sub-Services / Variants</TabsTrigger>
                  <TabsTrigger value="process" className="flex-1 rounded-none py-3 font-semibold text-sm border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">Process Steps</TabsTrigger>
                </TabsList>

                {/* Tab 1: Info */}
                <TabsContent value="info" className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title Name</Label>
                      <Input 
                        id="title" required value={form.title} 
                        onChange={e => {
                          const title = e.target.value;
                          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                          setForm({ ...form, title, slug: editingSlug === "new" ? slug : form.slug });
                        }} 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug Link</Label>
                      <Input id="slug" required disabled={editingSlug !== "new"} value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="section">Catalog Grid Section</Label>
                      <select 
                        id="section" value={form.section} onChange={e => setForm({ ...form, section: e.target.value })}
                        className="w-full border rounded-lg h-9 px-3 text-sm bg-gray-50"
                      >
                        <option value="prime">Prime Steel Products (Home/Services)</option>
                        <option value="secondary">Secondary Material (Home/Services)</option>
                        <option value="processing">Steel Processing Products (Services)</option>
                        <option value="fabrication">Fabrication & Support (Services)</option>
                        <option value="specialty">Specialty Capabilities (Services)</option>
                        <option value="manufacturing">Manufacturing Products (Services)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category Type Label</Label>
                      <Input id="category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eyebrow">Eyebrow (Sub-type)</Label>
                      <Input id="eyebrow" value={form.eyebrow} onChange={e => setForm({ ...form, eyebrow: e.target.value })} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="badge">Badge/Grade Tag</Label>
                      <Input id="badge" value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <ImageField 
                        label="Main Image" 
                        value={form.mainImage} 
                        onChange={(v) => setForm({ ...form, mainImage: v })} 
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="summary">Short Summary (Sub-description)</Label>
                      <Textarea id="summary" rows={2} value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Full Description</Label>
                      <Textarea id="description" rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                    </div>

                    {/* Gallery Images (Multiple) */}
                    <div className="space-y-4 pt-4 border-t md:col-span-2">
                      <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="font-bold text-gray-800">Gallery Images (Multiple)</h3>
                        <Button type="button" size="sm" variant="outline" onClick={() => setForm({ ...form, gallery: [...(form.gallery || []), ""] })}>+ Add Gallery Image</Button>
                      </div>
                      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                        {(form.gallery || []).map((imgUrl, idx) => (
                          <div key={idx} className="flex gap-2 items-start p-3 border rounded-xl bg-gray-50 relative">
                            <div className="flex-1">
                              <ImageField 
                                label={`Gallery Image #${idx + 1}`} 
                                value={imgUrl} 
                                onChange={(v) => {
                                  const updated = [...(form.gallery || [])];
                                  updated[idx] = v;
                                  setForm({ ...form, gallery: updated });
                                }} 
                              />
                            </div>
                            <Button type="button" variant="ghost" size="icon" className="text-red-500 absolute top-2 right-2" onClick={() => {
                              const updated = (form.gallery || []).filter((_, i) => i !== idx);
                              setForm({ ...form, gallery: updated });
                            }}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 2: Specs & Features */}
                <TabsContent value="specs" className="p-6 space-y-6">
                  {/* Technical Specs */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <h3 className="font-bold text-gray-800">Specifications (Label - Value)</h3>
                      <Button type="button" size="sm" variant="outline" onClick={() => setForm({ ...form, specs: [...form.specs, { label: "", value: "" }] })}>+ Add Spec</Button>
                    </div>
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {form.specs.map((spec, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <Input placeholder="e.g. Grade" value={spec.label} onChange={e => updateSpec(idx, "label", e.target.value)} className="w-1/3" />
                          <Input placeholder="e.g. 1079 / 2062" value={spec.value} onChange={e => updateSpec(idx, "value", e.target.value)} className="flex-1" />
                          <Button type="button" variant="ghost" size="icon" className="text-red-500" onClick={() => setForm({ ...form, specs: form.specs.filter((_, i) => i !== idx) })}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feature Cards */}
                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex justify-between items-center border-b pb-2">
                      <h3 className="font-bold text-gray-800">Feature Highlight Cards</h3>
                      <Button type="button" size="sm" variant="outline" onClick={() => setForm({ ...form, featureCards: [...form.featureCards, { icon: "verified", title: "", body: "" }] })}>+ Add Card</Button>
                    </div>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      {form.featureCards.map((feat, idx) => (
                        <div key={idx} className="p-3 border rounded-xl bg-gray-50 flex gap-4 items-start">
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <Label>Icon Type</Label>
                              <select
                                value={feat.icon}
                                onChange={e => updateFeature(idx, "icon", e.target.value)}
                                className="w-full border rounded-lg h-9 px-3 text-sm bg-white"
                              >
                                <option value="gauge">Speed / Gauge (gauge)</option>
                                <option value="shield">Quality / Shield (shield)</option>
                                <option value="truck">Logistics / Truck (truck)</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <Label>Title</Label>
                              <Input value={feat.title} onChange={e => updateFeature(idx, "title", e.target.value)} />
                            </div>
                            <div className="space-y-1 col-span-2">
                              <Label>Description Body</Label>
                              <Textarea rows={2} value={feat.body} onChange={e => updateFeature(idx, "body", e.target.value)} />
                            </div>
                          </div>
                          <Button type="button" variant="ghost" size="icon" className="text-red-500 self-center" onClick={() => setForm({ ...form, featureCards: form.featureCards.filter((_, i) => i !== idx) })}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 3: Sub-Services & Offerings */}
                <TabsContent value="subservices" className="p-6 space-y-6">
                  {/* Flat variants (simple options) */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <h3 className="font-bold text-gray-800">Flat Variants (Sub-services List)</h3>
                      <Button type="button" size="sm" variant="outline" onClick={() => setForm({ ...form, variants: [...form.variants, ""] })}>+ Add Variant</Button>
                    </div>
                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                      {form.variants.map((v, idx) => (
                        <div key={idx} className="flex gap-2">
                          <Input 
                            value={v} 
                            placeholder="e.g. CRCA Slit Coils"
                            onChange={e => {
                              const updated = [...form.variants];
                              updated[idx] = e.target.value;
                              setForm({ ...form, variants: updated });
                            }} 
                            className="flex-1"
                          />
                          <Button type="button" variant="ghost" size="icon" className="text-red-500" onClick={() => setForm({ ...form, variants: form.variants.filter((_, i) => i !== idx) })}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Offerings */}
                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex justify-between items-center border-b pb-2">
                      <h3 className="font-bold text-gray-800">Detailed Offerings / Sub-sections</h3>
                      <Button type="button" size="sm" variant="outline" onClick={() => setForm({ ...form, offerings: [...form.offerings, { id: `off-${Date.now()}`, title: "", price: "", specs: [] }] })}>+ Add Offering</Button>
                    </div>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                      {form.offerings.map((off, idx) => (
                        <div key={idx} className="p-4 border rounded-xl bg-gray-50 space-y-3 relative">
                          <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => setForm({ ...form, offerings: form.offerings.filter((_, i) => i !== idx) })}>
                            <Trash className="h-4.5 w-4.5" />
                          </Button>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label>Offering Title</Label>
                              <Input value={off.title} onChange={e => updateOffering(idx, "title", e.target.value)} />
                            </div>
                            <div className="space-y-1">
                              <Label>Price (e.g. ₹ 46,000 / Tonne)</Label>
                              <Input value={off.price} onChange={e => updateOffering(idx, "price", e.target.value)} />
                            </div>
                          </div>
                          
                          {/* Inner Specs for this Offering */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-gray-500">Offering Specs</span>
                              <Button type="button" size="sm" variant="ghost" className="h-7 text-xs text-blue-600 hover:text-blue-700" onClick={() => {
                                const specs = off.specs || [];
                                updateOffering(idx, "specs", [...specs, { label: "", value: "" }]);
                              }}>+ Add Spec</Button>
                            </div>
                            {(off.specs || []).map((os, sidx) => (
                              <div key={sidx} className="flex gap-2">
                                <Input placeholder="Label" value={os.label} onChange={e => {
                                  const specs = [...off.specs];
                                  specs[sidx].label = e.target.value;
                                  updateOffering(idx, "specs", specs);
                                }} className="h-8 text-xs w-1/3" />
                                <Input placeholder="Value" value={os.value} onChange={e => {
                                  const specs = [...off.specs];
                                  specs[sidx].value = e.target.value;
                                  updateOffering(idx, "specs", specs);
                                }} className="h-8 text-xs flex-1" />
                                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => {
                                  const specs = off.specs.filter((_, i) => i !== sidx);
                                  updateOffering(idx, "specs", specs);
                                }}>
                                  <Trash className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 4: Process */}
                <TabsContent value="process" className="p-6 space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="font-bold text-gray-800">Process Steps (Ordered Workflow)</h3>
                    <Button type="button" size="sm" variant="outline" onClick={() => setForm({ ...form, process: [...form.process, ""] })}>+ Add Step</Button>
                  </div>
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {form.process.map((step, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <span className="font-black text-sm text-gray-400">Step {idx + 1}</span>
                        <Input 
                          value={step} 
                          onChange={e => {
                            const updated = [...form.process];
                            updated[idx] = e.target.value;
                            setForm({ ...form, process: updated });
                          }} 
                          className="flex-1"
                        />
                        <Button type="button" variant="ghost" size="icon" className="text-red-500" onClick={() => setForm({ ...form, process: form.process.filter((_, i) => i !== idx) })}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="p-6 border-t bg-gray-50/50 flex gap-3">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">Save Catalog Draft</Button>
                <Button type="button" variant="outline" onClick={() => setEditingSlug(null)}>Cancel</Button>
              </div>
            </form>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 p-12 rounded-2xl text-center text-gray-500 font-semibold h-[400px] flex flex-col justify-center items-center shadow-inner">
              <Plus className="h-10 w-10 text-gray-300 mb-2" />
              <span>Select any Product or Service from the sidebar to edit it, or click "+ Add" to create a new one.</span>
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
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Deploy Catalog to Live?</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  You are pushing all product/service catalog updates and specifications live.
                </p>
              </div>
            </div>

            <div className="bg-blue-50/60 border border-blue-100/80 rounded-2xl p-4 space-y-2">
              <p className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-ping" />
                Before you commit:
              </p>
              <ul className="text-xs text-blue-700/90 list-disc list-inside space-y-1.5 pl-1 leading-relaxed">
                <li>Make sure to preview the product or service page using the <strong>Preview Page</strong> button in the toolbar.</li>
                <li>Verify specifications table, variant tags, and manufacturing process steps look correct.</li>
                <li className="font-bold text-amber-800">Note: Committed changes will take up to 2-5 minutes to reflect in production.</li>
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
