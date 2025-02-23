import Link from "next/link";

export default function NoMoreCall() {
    return (
        <div>
            <h1 className="mt-4 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                Limite dépassé
            </h1>
            <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                La limite de requêtes à été dépassé veuillez attendre un petit moment avant de pouvoir envoyer une
                nouvelle requête
            </p>
            <div className="mt-10">
                <Link href="/" className="text-sm/7 font-semibold text-slate-600">
                    <span aria-hidden="true">&larr;</span> Retour à l&#39;accueil
                </Link>
            </div>
        </div>
)
}