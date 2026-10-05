import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../../core/model/Pageable';
import { Loan } from '../model/loan';
import { PaginatedData } from '../../core/model/PaginatedData';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class LoanService {
    protected readonly http = inject(HttpClient);

    private baseUrl = 'http://localhost:8080/loan';

    getLoans(filterLoan: Loan, pageable: Pageable): Observable<PaginatedData<Loan>> {
        return this.http.post<PaginatedData<Loan>>(this.baseUrl, { 
            gameId: filterLoan.gameId,
            clientId: filterLoan.clientId,
            searchDate: filterLoan.searchDate,
            pageable: pageable });
    }

    saveLoan(Loan: Loan): Observable<Loan> {
        const { id } = Loan;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<Loan>(url, Loan);
    }

    deleteLoan(idLoan: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idLoan}`);
    }

    getAllLoans(): Observable<Loan[]> {
        return this.http.get<Loan[]>(this.baseUrl);
    }
}
