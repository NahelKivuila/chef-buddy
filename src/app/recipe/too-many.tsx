"use client";

import {toast} from "sonner";
import {redirect} from "next/navigation";
import {useEffect} from "react";

export default function TooMany() {
    useEffect(() => {
        toast.error('La limite de requêtes à été dépassé veuillez attendre un petit moment et recommencer')
        redirect('/')
    }, [])

    return null
}