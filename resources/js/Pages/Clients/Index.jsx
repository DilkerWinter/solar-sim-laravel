import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Index() {
    const { clients } = usePage().props;

    return (
        <div>
            <h1>Lista de Clientes</h1>
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        {client.name} - {client.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}
