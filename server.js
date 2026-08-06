import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const PORT = parseInt(process.env.API_PORT || process.env.PORT || '8451', 10)
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS
const EMAIL_TARGET = 'yokeshkumar192007@gmail.com'

if (!EMAIL_USER || !EMAIL_PASS) {
  console.error('EMAIL_USER and EMAIL_PASS environment variables are required for email delivery.')
  process.exit(1)
}

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
})

transporter.verify((error) => {
  if (error) {
    console.error('Email transport verification failed:', error)
  } else {
    console.log('Email transporter ready')
  }
})

async function sendMail(subject, text) {
  console.log(`Sending email from ${EMAIL_USER} to ${EMAIL_TARGET} with subject: ${subject}`)

  try {
    const info = await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_TARGET,
      subject,
      text,
    })
    console.log('Email send result:', info.response)
    return info
  } catch (error) {
    console.error('sendMail failed:', error)
    throw error
  }
}

app.post('/api/order', async (req, res) => {
  const { orderId, placedAt, status, total, items, customerName, email, phone, address } = req.body

  if (!orderId || total == null || !items) {
    return res.status(400).json({ error: 'Missing order payload' })
  }

  const text = `A new order has been placed.\n\nOrder ID: ${orderId}\nPlaced At: ${placedAt}\nStatus: ${status}\nTotal Amount: ₹${total}\n\nCustomer Name: ${customerName ?? 'N/A'}\nEmail: ${email ?? 'N/A'}\nPhone: ${phone ?? 'N/A'}\nAddress: ${address ?? 'N/A'}\n\nProducts:\n${items
    .map((item) => `- ${item.product.name} x${item.quantity} @ ₹${item.product.price}`)
    .join('\n')}\n\nThank you.`

  try {
    await sendMail(`🛒 New SportZone Order - ${orderId}`, text)
    return res.status(200).json({ message: 'Order email sent' })
  } catch (error) {
    console.error('Order email error:', error)
    return res.status(500).json({ error: 'Failed to send order email' })
  }
})

app.post('/api/order/cancel', async (req, res) => {
  const { orderId, placedAt, status, total, items, customerName, email, phone, address } = req.body

  if (!orderId || total == null || !items) {
    return res.status(400).json({ error: 'Missing cancellation payload' })
  }

  const text = `Order cancellation received.\n\nOrder ID: ${orderId}\nPlaced At: ${placedAt}\nStatus: ${status}\nTotal Amount: ₹${total}\n\nCustomer Name: ${customerName ?? 'N/A'}\nEmail: ${email ?? 'N/A'}\nPhone: ${phone ?? 'N/A'}\nAddress: ${address ?? 'N/A'}\n\nProducts:\n${items
    .map((item) => `- ${item.product.name} x${item.quantity} @ ₹${item.product.price}`)
    .join('\n')}\n\nThis order was canceled by the customer.`

  try {
    await sendMail(`❌ SportZone Order Canceled - ${orderId}`, text)
    return res.status(200).json({ message: 'Cancellation email sent' })
  } catch (error) {
    console.error('Cancellation email error:', error)
    return res.status(500).json({ error: 'Failed to send cancellation email' })
  }
})

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing contact fields' })
  }

  const text = `New contact request received.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`

  try {
    await sendMail(`📩 SportZone Contact Request from ${name}`, text)
    return res.status(200).json({ message: 'Contact message sent' })
  } catch (error) {
    console.error('Contact email error:', error)
    return res.status(500).json({ error: 'Failed to send contact email' })
  }
})

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`✅ SportZone email API running on http://localhost:${PORT}`)
})
