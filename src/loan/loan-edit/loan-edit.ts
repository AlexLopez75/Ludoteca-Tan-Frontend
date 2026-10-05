import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanService } from '../loan-list/loan.service';
import { Loan } from '../model/loan';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { validateFields } from '../../core/helpers/validation.helper';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-loan-edit',
    standalone: true,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
    ],
    templateUrl: './loan-edit.html',
    styleUrl: './loan-edit.scss',
})
export class LoanEditComponent implements OnInit {
    protected readonly loanService = inject(LoanService);
    protected readonly dialogRef = inject(MatDialogRef<LoanEditComponent>);
    protected readonly data = inject(MAT_DIALOG_DATA);

    protected readonly id = signal<number | null>(null);
    protected readonly clientName = signal<string | null>(null);
    protected readonly gameName = signal<string | null>(null);
    protected readonly startDate = signal<Date | null>(null);
    protected readonly endDate = signal<Date | null>(null);


    loadFormData(initialData: Loan | null) {
        this.id.set(initialData.id ?? null);
        this.clientName.set(initialData.clientName ?? null);
        this.gameName.set(initialData.gameName ?? null);
        this.startDate.set(initialData.startDate ?? null);
        this.endDate.set(initialData.endDate ?? null);

    }

    ngOnInit(): void {
        this.loadFormData(this.data.loan ?? null);
    }

    onSave() {
        const id = this.id();
        const clientName = this.clientName();
        const gameName = this.gameName();
        const startDate = this.startDate();
        const endDate = this.endDate();

        const requiredFields = ["clientName", "gameName", "startDate", "endDate"] as const
        const data = { clientName, gameName, startDate, endDate }

        if (!validateFields(data, requiredFields)) {
            return;
        }

        const loan = {
            id,
            clientName,
            gameName,
            startDate,
            endDate,
        } as Loan;
        this.loanService.saveLoan(loan).subscribe(() => {
            this.dialogRef.close(true);
        });
    }

    onClose() {
        this.dialogRef.close(false);
    }
}