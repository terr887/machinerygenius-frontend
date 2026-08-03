import { getSections } from "@/utils/sectionsStore";

export interface CmsSection<TData = Record<string, unknown>> {
    id: number | string;
    type: string;
    data?: TData;
}

export interface ManufacturerData {
    title?: string;
    slug?: string;
    content?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
}

export interface ManufacturerPage {
    id: number | string;
    title: string;
    slug: string;
    path: string;
    content: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
}

const slugify = (value: string) =>
    value
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const trimCommonTitleAffixes = (value: string) => {
    const normalized = value.trim();

    if (!normalized) {
        return "";
    }

    return normalized
        .replace(/^(?:machinery\s*genius(?:\s*ai)?)\s*[:\-–—|]+\s*/i, "")
        .replace(/^(?:machinery\s*genius(?:\s*ai)?)\s+/i, "")
        .replace(/\s*[|:–—-]+\s*machinery\s*genius(?:\s*ai)?\s*$/i, "")
        .trim();
};

export const normalizeManufacturerPage = (
    section: CmsSection<ManufacturerData>
): ManufacturerPage | null => {
    const data = section.data || {};
    const rawTitle = data.title?.trim();
    const title = rawTitle ? trimCommonTitleAffixes(rawTitle) || rawTitle : "";

    if (!title) {
        return null;
    }

    const slug = slugify(data.slug?.trim() || title);

    if (!slug) {
        return null;
    }

    return {
        id: section.id,
        title,
        slug,
        path: `/manufacturers/${slug}`,
        content: data.content || "",
        metaTitle: data.meta_title || undefined,
        metaDescription: data.meta_description || undefined,
        metaKeywords: data.meta_keywords || undefined,
    };
};

export const getManufacturerPages = async (): Promise<ManufacturerPage[]> => {
    const sections = (await getSections()) as CmsSection<ManufacturerData>[];

    return sections
        .filter((section) => section.type === "manufacturers")
        .map((section) => normalizeManufacturerPage(section))
        .filter((page): page is ManufacturerPage => Boolean(page))
        .sort((a, b) => a.title.localeCompare(b.title));
};
