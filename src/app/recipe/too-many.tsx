'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function TooMany() {
    useEffect(() => {
        toast.error(
            'La limite de requêtes a été dépassée, veuillez attendre un petit moment et recommencer'
        );
        redirect('/');
    }, []);

    return null;
}
