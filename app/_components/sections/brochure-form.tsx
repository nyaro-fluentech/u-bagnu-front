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
    <form onSubmit={handleSubmit} className="flex max-w-[834px]">
      <div className="flex flex-1 items-center rounded-[44px] bg-white p-[10px]">
        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="font-outfit flex-1 bg-transparent px-[32px] py-[20px] text-[16px] text-[#3D3D3D] placeholder-[#A2A2A2] focus:outline-none"
          aria-label="Votre adresse email"
        />
        <Button type="submit" className="px-[32px] py-[18px] text-[16px]">
          Télécharger la brochure
        </Button>
      </div>
    </form>
  )
}

export default BrochureForm
