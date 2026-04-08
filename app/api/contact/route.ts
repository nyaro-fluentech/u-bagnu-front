import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL = process.env.TO_EMAIL || ""

export async function POST(request: Request) {
  try {
    const { name, email, phone, type, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis." },
        { status: 400 }
      )
    }

    const typeLabels: Record<string, string> = {
      reservation: "Réservation",
      devis: "Devis",
      infos: "Demande d'informations",
      autre: "Autre",
    }

    const { error } = await resend.emails.send({
      from: "U Bagnu <noreply@ubagnu.com>",
      to: TO_EMAIL,
      subject: `Nouvelle demande de contact — ${typeLabels[type] || type}`,
      replyTo: email,
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
            <td style="background-color:#2954a4;padding:28px 32px;">
              <h1 style="margin:0;font-size:20px;color:#ffffff;font-weight:700;">U Bagnu</h1>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">Nouvelle demande de contact</p>
            </td>
          </tr>

          <!-- Badge type -->
          <tr>
            <td style="padding:24px 32px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#eef2f9;border-radius:20px;padding:6px 16px;">
                    <span style="font-size:13px;font-weight:600;color:#2954a4;">${typeLabels[type] || type}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact info -->
          <tr>
            <td style="padding:20px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8ecf1;border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid #e8ecf1;">
                    <span style="font-size:12px;color:#8a94a6;text-transform:uppercase;letter-spacing:0.5px;">Nom</span><br/>
                    <span style="font-size:15px;color:#1a1a2e;font-weight:600;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid #e8ecf1;">
                    <span style="font-size:12px;color:#8a94a6;text-transform:uppercase;letter-spacing:0.5px;">Email</span><br/>
                    <a href="mailto:${email}" style="font-size:15px;color:#2954a4;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;">
                    <span style="font-size:12px;color:#8a94a6;text-transform:uppercase;letter-spacing:0.5px;">Téléphone</span><br/>
                    <span style="font-size:15px;color:#1a1a2e;">${phone ? `<a href="tel:${phone}" style="color:#2954a4;text-decoration:none;">${phone}</a>` : '<span style="color:#b0b8c9;">Non renseigné</span>'}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:20px 32px;">
              <p style="margin:0 0 8px;font-size:12px;color:#8a94a6;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
              <div style="background-color:#f8f9fb;border-left:3px solid #2954a4;border-radius:0 8px 8px 0;padding:16px 18px;">
                <p style="margin:0;font-size:14px;color:#2e2e2e;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</p>
              </div>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:0 32px 28px;" align="center">
              <a href="mailto:${email}" style="display:inline-block;background-color:#2954a4;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:8px;">Répondre à ${name.split(" ")[0]}</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f9fb;padding:16px 32px;border-top:1px solid #e8ecf1;">
              <p style="margin:0;font-size:12px;color:#8a94a6;text-align:center;">
                Envoyé depuis le formulaire de contact — ubagnu.com
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
    console.error("Contact API error:", err)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi." },
      { status: 500 }
    )
  }
}
