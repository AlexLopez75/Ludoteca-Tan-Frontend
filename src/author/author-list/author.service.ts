import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../../core/model/Pageable';
import { Author } from '../model/author';
import { PaginatedData } from '../../core/model/PaginatedData';
import { AUTHOR_DATA } from '../model/mock-authors';
import { HttpClient } from '@angular/common/http';
import { AUTHOR_DATA_LIST } from '../model/mock-authors-list';

@Injectable({
    providedIn: 'root',
})
export class AuthorService {
    protected readonly http = inject(HttpClient);

    private baseUrl = 'http://localhost:8080/author';

    getAuthors(pageable: Pageable): Observable<PaginatedData<Author>> {
        return this.http.post<PaginatedData<Author>>(this.baseUrl, { pageable: pageable });
    }

    saveAuthor(author: Author): Observable<Author> {
        const { id } = author;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<Author>(url, author);
    }

    deleteAuthor(idAuthor: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idAuthor}`);
    }

    getAllAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(this.baseUrl);
    }
}
