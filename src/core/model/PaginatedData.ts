import { Pageable } from '../../core/model/Pageable';

export interface PaginatedData <TData>{
    content: TData[];
    pageable: Pageable;
    totalElements: number;
}