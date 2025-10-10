const faqs = [
  {
    question: 'Comment commencer une séance ?',
    answer:
      'Choisissez un cours dans la bibliothèque, installez-vous confortablement puis suivez les indications audio. Vous pouvez reprendre une session en cours à tout moment.',
  },
  {
    question: 'Respire est-il accessible hors ligne ?',
    answer:
      'Oui. Téléchargez vos séances favorites depuis la section cours pour les retrouver même sans connexion. Votre progression sera synchronisée lors de votre prochaine connexion.',
  },
  {
    question: 'Puis-je partager mon abonnement ?',
    answer:
      'Chaque compte est individuel afin de personnaliser votre suivi. Vous pouvez cependant offrir des mois d’accès via la boutique cadeaux.',
  },
];

export const metadata = {
  title: 'FAQ | Respire',
  description: 'Réponses aux questions les plus fréquentes sur Respire.',
};

export default function FAQPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">FAQ</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Vos questions fréquentes</h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Retrouvez ici les réponses aux questions les plus posées sur l’utilisation de Respire, l’accès aux cours et la gestion de
          votre compte.
        </p>
      </div>
      <dl className="grid gap-4 sm:grid-cols-2">
        {faqs.map((faq) => (
          <div key={faq.question} className="card h-full space-y-2 bg-card/90">
            <dt className="text-lg font-semibold text-slate-900 dark:text-white">{faq.question}</dt>
            <dd className="text-sm text-slate-600 dark:text-slate-300">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
