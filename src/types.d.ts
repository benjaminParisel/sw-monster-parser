declare module '*.json';
export interface Monster {
    id,
    name: string;
    element: string;
    com2us_id: number;
    image_filename: string;
    natural_stars: number;
    family_id: number;
    isAwaken: boolean;
    isDoubleAwaken?: boolean,
    awakens_from?: number | null,
    awakens_to?: number | null,
}