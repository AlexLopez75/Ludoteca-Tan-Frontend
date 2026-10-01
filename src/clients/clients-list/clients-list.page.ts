import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Clients } from '../model/clients';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClientsService } from './clients.service';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientsEditComponent } from '../clients-edit/clients-edit';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation';

@Component({
    selector: 'app-clients-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule
    ],
    templateUrl: './clients-list.page.html',
    styleUrl: './clients-list.page.scss'
})
export class ClientsListComponent implements OnInit {

  dataSource = new MatTableDataSource<Clients>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  protected readonly clientService = inject(ClientsService);
  protected readonly dialog = inject(MatDialog);

  loadData(): void {
    this.clientService.getClients().subscribe(
      clients => this.dataSource.data = clients
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  createClient() {    
    const dialogRef = this.dialog.open(ClientsEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.loadData();
    });    
  }  

  editClient(client: Clients) {
    const dialogRef = this.dialog.open(ClientsEditComponent, {
      data: { client }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.loadData();
    });
  }

   deleteClient(client: Clients) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(client.id).subscribe(result => {
          this.loadData();
        }); 
      }
    });
  }  
}