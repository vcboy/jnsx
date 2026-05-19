// Category configuration - separated from data
// This allows categories to be added/changed via API without modifying component code

export interface CategoryConfig {
  icon: string; // Icon identifier (used to map to actual icon component)
  bgColor: string;
  iconColor: string;
}

// Default fallback configuration
export const defaultCategoryConfig: CategoryConfig = {
  icon: "box",
  bgColor: "#f3f4f6",
  iconColor: "#6b7280",
};

// Category configuration map
// Keys should match category names from API
export const categoryConfigMap: Record<string, CategoryConfig> = {
  "健康服务": {
    icon: "heart-pulse",
    bgColor: "#fef2f2",
    iconColor: "#dc2626",
  },
  "交通与汽车": {
    icon: "car",
    bgColor: "#eff6ff",
    iconColor: "#2563eb",
  },
  "商贸服务": {
    icon: "shopping-bag",
    bgColor: "#fefce8",
    iconColor: "#ca8a04",
  },
  "数字技术": {
    icon: "monitor",
    bgColor: "#f5f3ff",
    iconColor: "#7c3aed",
  },
  "现代服务": {
    icon: "layers",
    bgColor: "#fdf4ff",
    iconColor: "#c026d3",
  },
  "智能制造": {
    icon: "hexagon",
    bgColor: "#f0fdf4",
    iconColor: "#16a34a",
  },
};

// Level configuration map
export const levelConfigMap: Record<string, { bgColor: string; textColor: string }> = {
  "中技": { bgColor: "#dbeafe", textColor: "#1e40af" },
  "高级工": { bgColor: "#dcfce7", textColor: "#166534" },
  "预备技师": { bgColor: "#fef3c7", textColor: "#92400e" },
  "中高职一体化": { bgColor: "#fce7f3", textColor: "#be185d" },
  "其他": { bgColor: "#f3f4f6", textColor: "#374151" },
};

// Utility function to get category config with fallback
export function getCategoryConfig(categoryName: string): CategoryConfig {
  return categoryConfigMap[categoryName] || defaultCategoryConfig;
}

// Utility function to get level config with fallback
export function getLevelConfig(level: string): { bgColor: string; textColor: string } {
  return levelConfigMap[level] || { bgColor: "#f3f4f6", textColor: "#6b7280" };
}

// Icon name constants - used to map to actual icons in components
export const CATEGORY_ICONS = {
  HEART_PULSE: "heart-pulse",
  CAR: "car",
  SHOPPING_BAG: "shopping-bag",
  MONITOR: "monitor",
  LAYERS: "layers",
  HEXAGON: "hexagon",
  BOX: "box",
} as const;

export type CategoryIconName = typeof CATEGORY_ICONS[keyof typeof CATEGORY_ICONS];
