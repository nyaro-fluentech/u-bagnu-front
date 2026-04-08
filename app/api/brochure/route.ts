import { Resend } from "resend"
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const resend = new Resend(process.env.RESEND_API_KEY)

const BROCHURE_PATH = path.join(process.cwd(), "public", "brochure-ubagnu.pdf")

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "L'adresse email est requise." },
        { status: 400 }
      )
    }

    if (!fs.existsSync(BROCHURE_PATH)) {
      console.error("Brochure file not found:", BROCHURE_PATH)
      return NextResponse.json(
        { error: "La brochure n'est pas encore disponible." },
        { status: 500 }
      )
    }

    const brochureBuffer = fs.readFileSync(BROCHURE_PATH)

    const { error } = await resend.emails.send({
      from: "U Bagnu <noreply@ubagnu.com>",
      to: email,
      subject: "Votre brochure U Bagnu est arrivée !",
      attachments: [
        {
          filename: "brochure-ubagnu.pdf",
          content: brochureBuffer,
        },
      ],
      html: `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background-color:#2954a4;padding:28px 32px;text-align:center;">
              <h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:700;">U Bagnu</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:16px;color:#2e2e2e;line-height:1.6;">
                Bonjour ! 👋
              </p>
              <p style="margin:0 0 16px;font-size:15px;color:#2e2e2e;line-height:1.7;">
                Merci pour votre intérêt pour U Bagnu ! Nous sommes ravis de partager avec vous notre brochure.
              </p>
              <p style="margin:0 0 16px;font-size:15px;color:#2e2e2e;line-height:1.7;">
                Vous y découvrirez nos services de récupération sportive, bains froids, pressothérapie et sauna infrarouge ; conçus pour accompagner les athlètes et les passionnés de bien-être au quotidien.
              </p>
              <p style="margin:0 0 24px;font-size:15px;color:#2e2e2e;line-height:1.7;">
                La brochure est en pièce jointe de cet email. N'hésitez pas à la parcourir et à nous contacter si vous avez la moindre question, nous serons heureux d'échanger avec vous !
              </p>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
                <tr>
                  <td align="center" style="background-color:#2954a4;border-radius:8px;">
                    <a href="https://ubagnu.com" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
                      Découvrir U Bagnu
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;font-size:15px;color:#2e2e2e;line-height:1.7;">
                À très bientôt,
              </p>
              <p style="margin:0;font-size:15px;color:#2954a4;font-weight:600;line-height:1.7;">
                L'équipe U Bagnu 🌊
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f9fb;padding:16px 32px;border-top:1px solid #e8ecf1;">
              <p style="margin:0;font-size:12px;color:#8a94a6;text-align:center;">
                Récupération sportive mobile en Corse — ubagnu.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Brochure API error:", err)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi." },
      { status: 500 }
    )
  }
}
