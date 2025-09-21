'use client';

import { useState } from 'react';
import { createBrowserClient } from '@/lib/supabase-browser';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [variant, setVariant] = useState<'success' | 'error' | 'idle'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setVariant('error');
      setMessage('Veuillez renseigner une adresse e-mail.');
      return;
    }

    setIsSubmitting(true);
    setVariant('idle');
    setMessage(null);

    try {
      const supabase = createBrowserClient();
      const {
        error,
      } = await supabase.auth.signInWithOtp({
        email: trimmedEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      setVariant('success');
      setMessage('Un lien de connexion vient d’être envoyé. Consultez votre boîte mail.');
    } catch (error) {
      console.error(error);
      setVariant('error');
      setMessage("Une erreur est survenue. Veuillez réessayer dans un instant.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <label className="block text-sm font-medium text-slate-200" htmlFor="email">
        Adresse e-mail
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="vous@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-dark hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Envoi en cours…' : 'Envoyer un lien magique'}
      </button>
      {message && (
        <p
          role="status"
          aria-live="polite"
          className={
            variant === 'success' ? 'text-sm text-emerald-400' : variant === 'error' ? 'text-sm text-rose-400' : 'text-sm text-slate-400'
          }
        >
          {message}
        </p>
      )}
    </form>
  );
}
