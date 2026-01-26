import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "row" | "col"
}

const Logo = ({ variant = "row" }: LogoProps) => {
  return (
    <div
      className={cn(
        "flex gap-[10.11px]",
        variant === "row"
          ? "h-[43px] w-[185px] flex-row items-end"
          : "h-auto w-auto flex-col items-center"
      )}
    >
      <Image
        src="/img/logo/logo-type.svg"
        alt="U Bagnu"
        width={40}
        height={43}
      />
      <Image
        src="/img/logo/logo-text.svg"
        alt="U Bagnu"
        width={135}
        height={22}
        className={variant === "row" ? "mb-[4px]" : ""}
      />
    </div>
  )
}

export default Logo
