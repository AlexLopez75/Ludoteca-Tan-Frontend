import { Component, OnInit, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from '../clients-list/clients.service';
import { Clients } from '../model/clients';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-clients-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
    templateUrl: './clients-edit.html',
    styleUrl: './clients-edit.scss'
})

export class ClientsEditComponent implements OnInit {
    protected readonly dialogRef = inject(MatDialogRef<ClientsEditComponent>);
    protected readonly data = inject(MAT_DIALOG_DATA) as { client: Clients };
    protected readonly clientsService = inject(ClientsService);

    protected readonly id = signal<number | null>(null);
    protected readonly name = signal<string | null>(null);
    protected readonly duplicatedName = signal(false);

    ngOnInit(): void {
        this.loadFormData(this.data.client ?? null);
    }

    loadFormData(initialData: Clients | null): void {
        this.id.set(initialData?.id ?? null);
        this.name.set(initialData?.name ?? null);
    }

    onSave() {
        const id = this.id();
        const name = this.name();

        if(!name) {
            return;
        }

        const client = { id, name } as Clients;
        
        this.duplicatedName.set(false);

        this.clientsService.saveClient(client).subscribe({ 
          next: () => {
            console.log('NEXT');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.log('ERROR', err);
            this.duplicatedName.set(true);
          }
        });
    }

    onClose() {
        this.dialogRef.close();
    }

    onNameChange(value: string) {
        this.name.set(value);
        this.duplicatedName.set(false);
    }
}
