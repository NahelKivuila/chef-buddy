'use client';

import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ApiError() {
    useEffect(() => {
        toast.error(
            'Un problème est survenu, veuillez réessayer ou me contacter si cela persiste'
        );
        redirect('/');
    }, []);

    return null;
}
