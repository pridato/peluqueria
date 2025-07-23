import { NextResponse } from 'next/server'
import { Resend } from 'resend'

/**
 * envía un correo de confirmación al cliente
 * @param req - Request object
 */
export async function POST(req: Request) {
    const body = await req.json() // body es un objeto tipo booking
    const { customerEmail, customerName, date, time, serviceName } = body

    const resend = new Resend(process.env.RESEND_API_KEY)

    try {
        await resend.emails.send({
            from: process.env.RESEND_SENDER_EMAIL!,
            to: customerEmail,
            subject: 'Confirmación de tu cita',
            html: `
        <h2>¡Hola ${customerName}!</h2>
        <p>Tu cita para <strong>${serviceName}</strong> ha sido confirmada.</p>
        <p>📅 Fecha: ${date} <br/> 🕒 Hora: ${time}</p>
        <p>Gracias por confiar en nosotros. Te esperamos.</p>
      `,
        })

        return NextResponse.json({ ok: true })
    } catch (error) {
        return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 })
    }
}
