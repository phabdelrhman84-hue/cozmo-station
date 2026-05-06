"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Layout, 
  Image as ImageIcon, 
  Type, 
  ToggleLeft,
  MoveVertical,
  Plus,
  Trash2,
  Save,
  Monitor,
  Smartphone,
  Eye,
  Settings
} from "lucide-react";

type SectionType = "hero" | "featured_products" | "categories" | "about_us" | "footer" | "banner";

interface ThemeSection {
  id: string;
  type: SectionType;
  name: string;
  visible: boolean;
  order: number;
  content: any;
}

const initialSections: ThemeSection[] = [
  {
    id: "s1",
    type: "hero",
    name: "Hero Section",
    visible: true,
    order: 1,
    content: {
      title_en: "Glow With K-Beauty",
      title_ar: "تألقي مع الجمال الكوري",
      subtitle_en: "Discover your perfect routine",
      subtitle_ar: "اكتشفي روتينك المثالي",
      button_text_en: "Shop Now",
      button_text_ar: "تسوقي الآن",
      image_url: "/images/hero-bg.jpg"
    }
  },
  {
    id: "s2",
    type: "featured_products",
    name: "Featured Products",
    visible: true,
    order: 2,
    content: {
      title_en: "Trending Now",
      title_ar: "رائج الآن",
    }
  },
  {
    id: "s3",
    type: "categories",
    name: "Categories Grid",
    visible: true,
    order: 3,
    content: {
      title_en: "Shop by Category",
      title_ar: "تسوق حسب الفئة",
    }
  },
  {
    id: "s4",
    type: "banner",
    name: "Mid-Page Ad Banner",
    visible: true,
    order: 4,
    content: {
      image_url: "/images/banner-placeholder.jpg",
      link: "/collections/sale",
      text_en: "Summer Sale - Up to 50% Off",
      text_ar: "تخفيضات الصيف - حتى 50% خصم",
      location: "middle",
      start_date: "2024-06-01",
      end_date: "2024-08-31"
    }
  }
];

export default function ThemeEditor() {
  const [sections, setSections] = useState<ThemeSection[]>(initialSections);
  const [activeSection, setActiveSection] = useState<ThemeSection | null>(initialSections[0]);
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching sections:', error);
      return;
    }

    if (data && data.length > 0) {
      const formattedSections: ThemeSection[] = data.map(item => ({
        id: item.section_id,
        type: item.type as SectionType,
        name: item.name,
        visible: item.is_visible,
        order: item.order_index,
        content: item.content
      }));
      setSections(formattedSections);
      setActiveSection(formattedSections[0]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Format sections for Supabase
    const sectionsToUpsert = sections.map((section, index) => ({
      section_id: section.id,
      type: section.type,
      name: section.name,
      is_visible: section.visible,
      order_index: index + 1, // update order based on array position
      content: section.content
    }));

    const { error } = await supabase
      .from('site_content')
      .upsert(sectionsToUpsert, { onConflict: 'section_id' });

    setIsSaving(false);
    
    if (error) {
      console.error('Error saving sections:', error);
      alert("Failed to save theme. Please try again.");
    } else {
      alert("Theme saved successfully to Supabase!");
    }
  };

  const updateSectionContent = (field: string, value: any) => {
    if (!activeSection) return;
    const updated = {
      ...activeSection,
      content: { ...activeSection.content, [field]: value }
    };
    setActiveSection(updated);
    setSections(sections.map(s => s.id === updated.id ? updated : s));
  };

  const toggleSectionVisibility = (id: string, currentStatus: boolean) => {
    setSections(sections.map(s => s.id === id ? { ...s, visible: !currentStatus } : s));
    if (activeSection?.id === id) {
      setActiveSection({ ...activeSection, visible: !currentStatus });
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex gap-6 overflow-hidden">
      {/* Editor Sidebar */}
      <div className="w-96 bg-[#1A1D27] rounded-xl border border-[#2A2E3B] flex flex-col overflow-hidden flex-shrink-0">
        <div className="p-4 border-b border-[#2A2E3B] flex items-center justify-between">
          <h2 className="font-bold text-white flex items-center gap-2">
            <Layout size={20} className="text-[#7C6FFF]" />
            Theme Editor
          </h2>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#7C6FFF] hover:bg-[#6b5eee] disabled:opacity-50 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <Save size={16} />
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Section List */}
          <div className="p-4 border-b border-[#2A2E3B]">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sections</h3>
            <div className="space-y-2">
              {sections.map((section) => (
                <div 
                  key={section.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    activeSection?.id === section.id 
                      ? "bg-[#7C6FFF]/10 border-[#7C6FFF]/50 text-white" 
                      : "bg-[#0F1117] border-[#2A2E3B] text-gray-300 hover:border-gray-500"
                  }`}
                  onClick={() => setActiveSection(section)}
                >
                  <div className="flex items-center gap-3">
                    <MoveVertical size={16} className="text-gray-500 cursor-grab" />
                    <span className="font-medium text-sm">{section.name}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSectionVisibility(section.id, section.visible);
                    }}
                    className={`p-1.5 rounded-md ${section.visible ? "text-[#7C6FFF] hover:bg-white/10" : "text-gray-500 hover:text-gray-300 hover:bg-white/10"}`}
                  >
                    <Eye size={16} className={!section.visible ? "opacity-50" : ""} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-dashed border-[#2A2E3B] rounded-lg text-sm text-gray-400 hover:text-white hover:border-gray-500 flex items-center justify-center gap-2 transition-colors">
              <Plus size={16} />
              Add Section / Ad Banner
            </button>
          </div>

          {/* Active Section Editor */}
          {activeSection && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{activeSection.name} Settings</h3>
                {activeSection.type === 'banner' && (
                  <button className="text-red-400 p-1.5 hover:bg-red-400/10 rounded-md transition-colors">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Content Editor based on type */}
                {activeSection.content.title_en !== undefined && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Title (English)</label>
                      <input 
                        type="text" 
                        value={activeSection.content.title_en}
                        onChange={(e) => updateSectionContent('title_en', e.target.value)}
                        className="w-full bg-[#0F1117] border border-[#2A2E3B] rounded-lg px-3 py-2 text-sm text-white focus:border-[#7C6FFF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1" dir="rtl">العنوان (عربي)</label>
                      <input 
                        type="text" 
                        value={activeSection.content.title_ar}
                        onChange={(e) => updateSectionContent('title_ar', e.target.value)}
                        dir="rtl"
                        className="w-full bg-[#0F1117] border border-[#2A2E3B] rounded-lg px-3 py-2 text-sm text-white focus:border-[#7C6FFF] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {activeSection.content.subtitle_en !== undefined && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Subtitle (English)</label>
                      <input 
                        type="text" 
                        value={activeSection.content.subtitle_en}
                        onChange={(e) => updateSectionContent('subtitle_en', e.target.value)}
                        className="w-full bg-[#0F1117] border border-[#2A2E3B] rounded-lg px-3 py-2 text-sm text-white focus:border-[#7C6FFF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1" dir="rtl">العنوان الفرعي (عربي)</label>
                      <input 
                        type="text" 
                        value={activeSection.content.subtitle_ar}
                        onChange={(e) => updateSectionContent('subtitle_ar', e.target.value)}
                        dir="rtl"
                        className="w-full bg-[#0F1117] border border-[#2A2E3B] rounded-lg px-3 py-2 text-sm text-white focus:border-[#7C6FFF] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {activeSection.content.image_url !== undefined && (
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Background / Image</label>
                    <div className="mt-1 flex items-center gap-3">
                      <div className="h-16 w-16 rounded-lg border border-[#2A2E3B] bg-[#0F1117] flex items-center justify-center overflow-hidden">
                        <ImageIcon size={24} className="text-gray-500" />
                      </div>
                      <button className="bg-[#2A2E3B] hover:bg-[#3f4557] text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
                        Upload Image
                      </button>
                    </div>
                  </div>
                )}

                {/* Banner Specific Fields */}
                {activeSection.type === 'banner' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Link URL</label>
                      <input 
                        type="text" 
                        value={activeSection.content.link}
                        onChange={(e) => updateSectionContent('link', e.target.value)}
                        className="w-full bg-[#0F1117] border border-[#2A2E3B] rounded-lg px-3 py-2 text-sm text-white focus:border-[#7C6FFF] focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Start Date</label>
                        <input 
                          type="date" 
                          value={activeSection.content.start_date}
                          onChange={(e) => updateSectionContent('start_date', e.target.value)}
                          className="w-full bg-[#0F1117] border border-[#2A2E3B] rounded-lg px-3 py-2 text-sm text-white focus:border-[#7C6FFF] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">End Date</label>
                        <input 
                          type="date" 
                          value={activeSection.content.end_date}
                          onChange={(e) => updateSectionContent('end_date', e.target.value)}
                          className="w-full bg-[#0F1117] border border-[#2A2E3B] rounded-lg px-3 py-2 text-sm text-white focus:border-[#7C6FFF] focus:outline-none"
                        />
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex-1 bg-[#0F1117] rounded-xl border border-[#2A2E3B] flex flex-col overflow-hidden">
        <div className="h-12 bg-[#1A1D27] border-b border-[#2A2E3B] flex items-center justify-between px-4">
          <div className="text-sm font-medium text-gray-400">Live Preview</div>
          <div className="flex items-center gap-1 bg-[#0F1117] p-1 rounded-lg border border-[#2A2E3B]">
            <button 
              className={`p-1.5 rounded-md transition-colors ${deviceView === 'desktop' ? 'bg-[#2A2E3B] text-white' : 'text-gray-500 hover:text-white'}`}
              onClick={() => setDeviceView('desktop')}
            >
              <Monitor size={16} />
            </button>
            <button 
              className={`p-1.5 rounded-md transition-colors ${deviceView === 'mobile' ? 'bg-[#2A2E3B] text-white' : 'text-gray-500 hover:text-white'}`}
              onClick={() => setDeviceView('mobile')}
            >
              <Smartphone size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto bg-[#0F1117] p-4 flex justify-center">
          <div 
            className={`bg-white shadow-2xl transition-all duration-300 ${
              deviceView === 'desktop' ? 'w-full max-w-5xl h-full rounded-lg' : 'w-[375px] h-[812px] rounded-[2rem] border-8 border-[#1A1D27]'
            } overflow-y-auto overflow-x-hidden`}
          >
            {/* Mock Storefront Preview */}
            <div className="flex flex-col min-h-full font-sans">
              {/* Header */}
              <header className="h-16 border-b flex items-center justify-center px-4 bg-white sticky top-0 z-10">
                <div className="text-xl font-bold tracking-widest text-black">COZMO STATION</div>
              </header>

              {/* Render Sections Dynamically based on current state */}
              {sections.filter(s => s.visible).map((section) => {
                
                if (section.type === 'hero') {
                  return (
                    <div key={section.id} className={`relative h-[60vh] bg-gray-900 flex items-center justify-center ${activeSection?.id === section.id ? 'ring-4 ring-[#7C6FFF] ring-inset' : ''}`}>
                      <div className="absolute inset-0 bg-black/40 z-10"></div>
                      <div className="relative z-20 text-center text-white px-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{section.content.title_en}</h1>
                        <p className="text-lg md:text-xl mb-8">{section.content.subtitle_en}</p>
                        <button className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-100 transition-colors">
                          {section.content.button_text_en || "Shop Now"}
                        </button>
                      </div>
                    </div>
                  );
                }

                if (section.type === 'featured_products') {
                  return (
                    <div key={section.id} className={`py-16 px-4 max-w-7xl mx-auto w-full ${activeSection?.id === section.id ? 'ring-4 ring-[#7C6FFF] ring-inset' : ''}`}>
                      <h2 className="text-2xl font-bold text-center mb-10 text-black">{section.content.title_en}</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="aspect-[3/4] bg-gray-100 rounded-lg"></div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (section.type === 'banner') {
                  return (
                    <div key={section.id} className={`my-8 px-4 ${activeSection?.id === section.id ? 'ring-4 ring-[#7C6FFF] ring-inset' : ''}`}>
                      <div className="bg-gradient-to-r from-[#7C6FFF] to-[#E8A0BF] text-white p-8 rounded-xl text-center shadow-lg">
                        <h3 className="text-2xl font-bold mb-2">{section.content.text_en}</h3>
                        <p className="text-white/80 text-sm">{section.content.start_date} to {section.content.end_date}</p>
                      </div>
                    </div>
                  );
                }

                return null;
              })}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
