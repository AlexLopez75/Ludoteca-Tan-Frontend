import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LoanEditComponent } from '../loan-edit/loan-edit';
import { LoanService } from './loan.service';
import { Loan } from '../model/loan';
import { Pageable } from '../../core/model/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { signal } from '@angular/core';
import { Game } from '../../game/model/game'
import { Clients } from '../../clients/model/clients'
import { GameService } from '../../game/game-list/game.service';
import { ClientsService } from '../../clients/clients-list/clients.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-loan-list',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      MatButtonModule,
      MatIconModule,
      MatTableModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatSelectModule,
      MatDatepickerModule,
      MatInputModule,
      MatNativeDateModule
    ],
    templateUrl: './loan-list.page.html',
    styleUrl: './loan-list.page.scss',
})
export class LoanListComponent implements OnInit {

    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;

    filterLoan: Loan = {};
    protected readonly games = signal<Game[]>([]);
    protected readonly clients = signal<Clients[]>([]);

    dataSource = new MatTableDataSource<Loan>();
    displayedColumns: string[] = [
        'id',
        'gameName',
        'clientName',
        'startDate',
        'endDate',
        'action'
    ];

    constructor(
        private loanService: LoanService,
       private gameService: GameService,
        private clientsService: ClientsService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadGames();
        this.loadClients();
        this.loadPage();
    }

    loadPage(event?: PageEvent) {

        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [
                {
                    property: 'id',
                    direction: 'ASC'
                }
            ]
        };

        if (event) {
            pageable.pageNumber = event.pageIndex;
            pageable.pageSize = event.pageSize;
        }

        this.loanService.getLoans(this.filterLoan, pageable)
            .subscribe(data => {
                this.dataSource.data = data.content;
                this.pageNumber = data.pageable.pageNumber;
                this.pageSize = data.pageable.pageSize;
                this.totalElements = data.totalElements;
            });
    }

    onSearch() {
        this.pageNumber = 0;
        this.loadPage();
    }

    onCleanFilter() {
        this.filterLoan = {};
        this.pageNumber = 0;
        this.loadPage();
    }

    loadGames(): void {
        this.gameService.getGames().subscribe(data => {
        this.games.set(data);
      });
    }

    loadClients(): void {
      this.clientsService.getClients().subscribe(data => {
          this.clients.set(data);
      });
    }

    createLoan() {
        const dialogRef = this.dialog.open(LoanEditComponent, {
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    editLoan(loan: Loan) {
        const dialogRef = this.dialog.open(LoanEditComponent, {
            data: { loan: loan },
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    deleteLoan(loan: Loan) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: {
                title: 'Eliminar autor',
                description:
                    'Atención si borra el autor se perderán sus datos.<br> ¿Desea eliminar el autor?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.loanService.deleteLoan(loan.id).subscribe((result) => {
                    this.ngOnInit();
                });
            }
        });
    }
}
