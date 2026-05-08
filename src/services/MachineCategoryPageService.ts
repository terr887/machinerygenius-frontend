import api from "@/services/ApiService";

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

export const normalizeMachineCategoryPage = (
    section: CmsSection<MachineCategoryData>
): MachineCategoryPage | null => {
    const data = section.data || {};
    const category = data.category?.trim();
    const title = data.title?.trim() || (category ? machineCategoryLabels[category] : "");

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
    };
};

export const getMachineCategoryPages = async (): Promise<MachineCategoryPage[]> => {
    const response = await api.getHomeSections();
    const sections = Array.isArray(response.data?.data) ? response.data.data : [];

    return sections
        .filter((section: CmsSection<MachineCategoryData>) => section.type === "machine_categories")
        .map((section: CmsSection<MachineCategoryData>) => normalizeMachineCategoryPage(section))
        .filter((page: MachineCategoryPage | null): page is MachineCategoryPage => Boolean(page));
};
