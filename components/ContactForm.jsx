'use client'

import { useState } from 'react'
import axios from 'axios'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async e => {
    e.preventDefault()
    const { name, email, phone, message } = formData

    if (!name || !email || !phone || !message) {
      setModalMessage('Please fill all fields.')
      setShowModal(true)
      return
    }
    if (!validateEmail(email)) {
      setModalMessage('Invalid email format.')
      setShowModal(true)
      return
    }

    try {
      setLoading(true)
      const res = await axios.post('https://vernanbackend.ezlab.in/api/contact-us/', formData)
      if (res.status === 200) {
        setModalMessage('✅ Form Submitted!')
        setFormData({ name: '', email: '', phone: '', message: '' })
      }
    } catch (err) {
      setModalMessage('❌ Submission failed. Try again.')
    } finally {
      setLoading(false)
      setShowModal(true)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h3>Contact Us</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange}/>
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange}/>
          <input type="text" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange}/>
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange}></textarea>
          <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
        </form>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <p>{modalMessage}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
