export default interface Technology {
    id: number;
    name: string;
    time_of_experience?: string;
    icon_name: string;
    base_tech?: Technology | null;
    is_selected?: boolean;
}
