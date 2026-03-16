"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const demandes = [
  { label: "Réservation", value: "reservation", defaultChecked: true },
  { label: "Devis", value: "devis" },
  { label: "Demande d'informations", value: "infos" },
  { label: "Autre", value: "autre" },
]

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  )
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    setErrorMsg("")

    const form = e.currentTarget
    const formData = new FormData(form)

    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      type: formData.get("type-demande"),
      message: formData.get("message"),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || "Une erreur est survenue.")
        setStatus("error")
        return
      }

      setStatus("sent")
      form.reset()
    } catch {
      setErrorMsg("Impossible de contacter le serveur.")
      setStatus("error")
    }
  }

  return (
    <>
      {status === "sent" && (
        <div className="mb-4 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
          Message envoyé avec succès ! Nous vous recontacterons rapidement.
        </div>
      )}
      {status === "error" && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMsg || "Une erreur est survenue. Veuillez réessayer."}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="ml-1 text-sm font-medium text-[#2E2E2E]">
            Nom et prénom
          </label>
          <input
            type="text"
            name="name"
            placeholder="Jean Doe"
            required
            className="border-primary/10 focus:border-primary/40 rounded-md border bg-white/80 px-4 py-3 text-sm transition-colors outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="ml-1 text-sm font-medium text-[#2E2E2E]">
              Votre email
            </label>
            <input
              type="email"
              name="email"
              placeholder="jean@exemple.fr"
              required
              className="border-primary/10 focus:border-primary/40 rounded-md border bg-white/80 px-4 py-3 text-sm transition-colors outline-none placeholder:text-gray-400"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="ml-1 text-sm font-medium text-[#2E2E2E]">
              Numéro de téléphone
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+33 06 xxx xx xxx"
              className="border-primary/10 focus:border-primary/40 rounded-md border bg-white/80 px-4 py-3 text-sm transition-colors outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="ml-1 text-sm font-medium text-[#2E2E2E]">
            Type de demande
          </span>
          <div className="flex flex-wrap gap-2">
            {demandes.map(({ label, value, defaultChecked }) => (
              <label key={value} className="cursor-pointer">
                <input
                  type="radio"
                  name="type-demande"
                  value={value}
                  defaultChecked={defaultChecked}
                  className="peer sr-only"
                />
                <span className="border-primary/30 text-primary peer-checked:border-primary peer-checked:bg-primary/10 inline-block rounded-full border px-4 py-2 text-sm transition-colors">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="ml-1 text-sm font-medium text-[#2E2E2E]">
            Votre message
          </label>
          <textarea
            name="message"
            placeholder="Décrivez votre besoin, nous vous contacterons avec la solution la plus adaptée"
            rows={5}
            required
            className="border-primary/10 focus:border-primary/40 resize-none rounded-md border bg-white/80 px-4 py-3 text-sm transition-colors outline-none placeholder:text-gray-400"
          />
        </div>

        <Button type="submit" className="mt-2 w-fit" disabled={status === "sending"}>
          {status === "sending" ? "Envoi en cours..." : "Envoyez mon message"}
        </Button>
      </form>
    </>
  )
}
