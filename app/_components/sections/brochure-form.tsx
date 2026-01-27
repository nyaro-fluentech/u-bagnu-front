"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const BrochureForm = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle form submission
    console.log("Email submitted:", email)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[834px]">
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
          className="w-full px-[24px] py-[16px] text-[14px] md:text-[15px] lg:w-auto lg:px-[32px] lg:py-[18px] lg:text-[16px]"
        >
          Télécharger la brochure
        </Button>
      </div>
    </form>
  )
}

export default BrochureForm
