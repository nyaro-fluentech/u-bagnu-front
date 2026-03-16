"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const BrochureForm = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  )
  const [errorMsg, setErrorMsg] = useState("")

  const isValid = EMAIL_REGEX.test(email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    setStatus("sending")
    setErrorMsg("")

    try {
      const res = await fetch("/api/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || "Une erreur est survenue.")
        setStatus("error")
        return
      }

      setStatus("sent")
      setEmail("")
    } catch {
      setErrorMsg("Impossible de contacter le serveur.")
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div className="w-full max-w-[834px] rounded-[44px] bg-white px-[24px] py-[16px] text-center lg:px-[32px] lg:py-[20px]">
        <p className="font-outfit text-[14px] text-[#3D3D3D] md:text-[15px] lg:text-[16px]">
          Brochure envoyée ! Vérifiez votre boîte mail.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[834px] flex-col gap-2"
    >
      {status === "error" && (
        <p className="px-4 text-sm text-red-300">{errorMsg}</p>
      )}
      <div className="flex w-full flex-col gap-[12px] lg:flex-row lg:items-center lg:gap-0 lg:rounded-[44px] lg:bg-white lg:p-[10px]">
        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="font-outfit w-full flex-1 rounded-[44px] bg-white px-[24px] py-[16px] text-[14px] text-[#3D3D3D] placeholder-[#A2A2A2] focus:outline-none md:text-[15px] lg:rounded-none lg:bg-transparent lg:px-[32px] lg:py-[20px] lg:text-[16px]"
          aria-label="Votre adresse email"
        />
        <Button
          type="submit"
          disabled={!isValid || status === "sending"}
          className="w-full px-[24px] py-[16px] text-[14px] md:text-[15px] lg:w-auto lg:px-[32px] lg:py-[18px] lg:text-[16px]"
        >
          {status === "sending"
            ? "Envoi en cours..."
            : "Envoyez-moi la brochure"}
        </Button>
      </div>
    </form>
  )
}

export default BrochureForm
