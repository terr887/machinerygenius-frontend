import { getSections } from "@/utils/sectionsStore";

export interface CmsSection<TData = Record<string, unknown>> {
    id: number | string;
    type: string;
    data?: TData;
}

export interface MachineCategoryData {
    category?: string;
    title?: string;
    slug?: string;
    content?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
}

export interface MachineCategoryPage {
    id: number | string;
    category: string;
    title: string;
    slug: string;
    path: string;
    content: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
}

export const machineCategoryLabels: Record<string, string> = {
    lathes: "Lathes",
    mills: "Mills",
    press_brakes: "Press Brakes",
    saws: "Saws",
    grinders: "Grinders",
    plate_rolls: "Plate Rolls",
    angle_rolls: "Angle Rolls",
    lasers: "Lasers",
    cnc_machines: "CNC Machines",
    fabrication_equipment: "Fabrication Equipment",
    shop_equipment: "Shop Equipment",
};

const slugify = (value: string) =>
    value
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const trimCommonTitlePrefix = (value: string) => {
    const normalized = value.trim();

    if (!normalized) {
        return "";
    }

    return normalized
        .replace(
            /^(?:machinery\s*genius(?:\s*ai)?|machine\s*categories?|machine\s*category|category)\s*[:\-–—|]+\s*/i,
            ""
        )
        .replace(/^(?:machinery\s*genius(?:\s*ai)?|machine\s*categories?|machine\s*category|category)\s+/i, "")
        .trim();
};

export const normalizeMachineCategoryPage = (
    section: CmsSection<MachineCategoryData>
): MachineCategoryPage | null => {
    const data = section.data || {};
    const category = data.category?.trim();
    const rawTitle = data.title?.trim() || (category ? machineCategoryLabels[category] : "");
    const title = trimCommonTitlePrefix(rawTitle) || rawTitle;

    if (!category || !title) {
        return null;
    }

    const slug = slugify(data.slug?.trim() || category);

    if (!slug) {
        return null;
    }

    return {
        id: section.id,
        category,
        title,
        slug,
        path: `/machine-categories/${slug}`,
        content: data.content || "",
        metaTitle: data.meta_title || undefined,
        metaDescription: data.meta_description || undefined,
        metaKeywords: data.meta_keywords || undefined,
    };
};

export const getMachineCategoryPages = async (): Promise<MachineCategoryPage[]> => {
    const sections = (await getSections()) as CmsSection<MachineCategoryData>[];

    return sections
        .filter((section) => section.type === "machine_categories")
        .map((section) => normalizeMachineCategoryPage(section))
        .filter((page): page is MachineCategoryPage => Boolean(page))
        .sort((a, b) => a.title.localeCompare(b.title));
};
