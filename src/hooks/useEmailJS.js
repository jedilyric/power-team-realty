import { useState } from 'react'
import emailjs from 'emailjs-com'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const USER_REPLY_TEMPLATE = import.meta.env.VITE_EMAILJS_USER_TEMPLATE || 'YOUR_USER_TEMPLATE'
const AGENT_TEMPLATE = import.meta.env.VITE_EMAILJS_AGENT_TEMPLATE || 'YOUR_AGENT_TEMPLATE'
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

export function useEmailJS() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const send = async (formData) => {
    setLoading(true)
    setError(null)
    try {
      // Send auto-reply to user
      await emailjs.send(SERVICE_ID, USER_REPLY_TEMPLATE, {
        to_name: formData.name,
        to_email: formData.email,
        from_name: 'Bryan & Jamie Powers — Power Team Realty',
        reply_to: '9288998945@txt.att.net',
        message: `Thank you for reaching out, ${formData.name}! Bryan and Jamie will contact you within 24 hours. In the meantime, feel free to call us at 928-899-8945.`,
      }, PUBLIC_KEY)

      // Notify agents
      await emailjs.send(SERVICE_ID, AGENT_TEMPLATE, {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message || formData.type || 'New lead from website',
        subject: formData.subject || 'New Website Lead',
      }, PUBLIC_KEY)

      setSuccess(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      setError('Something went wrong. Please call us directly at 928-899-8945.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setSuccess(false); setError(null) }

  return { send, loading, success, error, reset }
}
