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
import { Clients } from '../../clients/model/clients';
import { Game } from '../../game/model/game';
import { ClientsService } from '../../clients/clients-list/clients.service';
import { GameService } from '../../game/game-list/game.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-loan-edit',
    standalone: true,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
    ],
    templateUrl: './loan-edit.html',
    styleUrl: './loan-edit.scss',
})
export class LoanEditComponent implements OnInit {
    protected readonly loanService = inject(LoanService);
    protected readonly dialogRef = inject(MatDialogRef<LoanEditComponent>);
    protected readonly data = inject(MAT_DIALOG_DATA);

    protected readonly clientsService = inject(ClientsService);
    protected readonly gameService = inject(GameService);

    protected readonly id = signal<number | null>(null);
    protected readonly clientId = signal<number | null>(null);
    protected readonly gameId = signal<number | null>(null);
    protected readonly clientName = signal<string | null>(null);
    protected readonly gameName = signal<string | null>(null);
    protected readonly startDate = signal<Date | null>(null);
    protected readonly endDate = signal<Date | null>(null);

            
    clients: Clients[] = [];
    games: Game[] = [];

    loadFormData(initialData: Loan | null) {
        this.id.set(initialData?.id ?? null);
        this.clientId.set(initialData?.clientId ?? null);
        this.gameId.set(initialData?.gameId ?? null);
        this.clientName.set(initialData?.clientName ?? null);
        this.gameName.set(initialData?.gameName ?? null);
        this.startDate.set(initialData?.startDate ?? null);
        this.endDate.set(initialData?.endDate ?? null);
    }

    ngOnInit(): void {

        this.loadFormData(this.data.loan ?? null);

        this.clientsService.getClients().subscribe(data => {
            console.log('CLIENTS', data);
            this.clients = data;
        });

        this.gameService.getGames().subscribe(data => {
            this.games = data;
        });
    }

    onSave() {
        const id = this.id();
        const clientId = this.clientId();
        const gameId = this.gameId();
        const startDate = this.startDate();
        const endDate = this.endDate();

        const requiredFields = ["clientId", "gameId", "startDate", "endDate"] as const
        const data = { clientId, gameId, startDate, endDate }

        if (!validateFields(data, requiredFields)) {
            return;
        }

        const loan = {
            id,
            clientId,
            gameId,
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