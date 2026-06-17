import { Button } from "@/components/ui/Button";

type UploadTab = {
  id: string;
  label: string;
};

type AdminUploadTabsProps = {
  activeTab: string;
  onChange: (tab: string) => void;
};

const tabs: UploadTab[] = [
  { id: "all", label: "All Assets" },
  { id: "covers", label: "Manga Covers" },
  { id: "chapter_pages", label: "Chapter Pages" },
  { id: "avatars", label: "Avatars" },
  { id: "failed", label: "Failed/Pending" },
];

export function AdminUploadTabs({ activeTab, onChange }: AdminUploadTabsProps) {
  return (
    <div className="glass rounded-3xl p-4 shadow-lg shadow-black/10">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "primary" : "secondary"}
            size="sm"
            onClick={() => onChange(tab.id)}
            className="rounded-full px-4"
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
