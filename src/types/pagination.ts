export type PAGINATION = {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    path: string;
    has_more_pages: boolean;
    prev_page_url: string | null;
    next_page_url: string | null;
}