export interface PaginationFilterSortParams<T> {
	isCompleted?: boolean;
	page?: number;
	size?: number;
	sortBy?: keyof T;
	sortDirection?: "ASC" | "DESC";
}

export interface Page<T> {
	content: T[];
	totalElements?: number;
	numberOfElements: number;
}
