"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { SocialButton } from "@/components/ui/social-button";
import * as FancyButton from "@/components/ui/fancy-button";
import { MapPin, Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/matheusrdb",
    icon: FaLinkedin,
  },
  { name: "GitHub", href: "https://github.com/Maschior", icon: FaGithub },
];

export function ContactHero() {
  const t = useTranslations("contact");
  const formRef = useRef<HTMLFormElement>(null);

  // Estados de controle de envio
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({
    message: "",
    type: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setFeedback({ message: "", type: null });

    if (
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID === undefined ||
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID === undefined ||
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY === undefined
    ) {
      console.error("EmailJS environment variables are not set.");
      setFeedback({
        message:
          t("form.error") || "Ocorreu um erro ao enviar. Tente novamente.",
        type: "error",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        }
      );

      setFeedback({
        message: t("form.success") || "Mensagem enviada com sucesso!",
        type: "success",
      });
      formRef.current.reset(); // Limpa os campos após enviar
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFeedback({
        message:
          t("form.error") || "Ocorreu um erro ao enviar. Tente novamente.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-background">
      <div className="max-w-6xl mx-auto px-8 py-16 lg:py-24 border-x-2 border-dotted border-border/40">
        <div className="text-center mb-16 space-y-4">
          <p className="text-subtitle">{t("subtitle")}</p>
          <h1 className="text-headline">{t("title")}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Form */}
          <div className="card-modern p-8">
            <form className="space-y-6" onSubmit={handleSubmit} ref={formRef}>
              <div className="space-y-2">
                <label
                  htmlFor="from_name"
                  className="text-sm font-medium text-foreground"
                >
                  {t("form.name")}
                </label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder={t("form.namePlaceholder")}
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="reply_to"
                  className="text-sm font-medium text-foreground"
                >
                  {t("form.email")}
                </label>
                <input
                  id="reply_to"
                  name="reply_to"
                  type="email"
                  required
                  disabled={isSubmitting}
                  placeholder={t("form.emailPlaceholder")}
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  disabled={isSubmitting}
                  rows={5}
                  placeholder={t("form.messagePlaceholder")}
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                />
              </div>

              {/* Mensagem de Feedback */}
              {feedback.type && (
                <div
                  className={`p-4 rounded-xl text-sm font-medium transition-all ${
                    feedback.type === "success"
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                      : "bg-destructive/10 text-destructive border border-destructive/20"
                  }`}
                >
                  {feedback.message}
                </div>
              )}

              <FancyButton.Root
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                <FancyButton.Icon as={Send} />
                {isSubmitting
                  ? t("form.sending") || "Enviando..."
                  : t("form.send")}
              </FancyButton.Root>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card-modern p-8 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                {t("info.title")}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {t("info.email")}
                    </p>
                    <Link
                      href="mailto:matheusrb8@outlook.com.br"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      matheusrb8@outlook.com.br
                    </Link>
                    <br />
                    <Link
                      href="mailto:dev@maschior.com"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      dev@maschior.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {t("info.location")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      São Paulo, SP - Brasil
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-modern p-8 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                {t("info.social")}
              </h3>
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <SocialButton
                    key={link.href}
                    href={link.href}
                    icon={link.icon}
                    label={link.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
