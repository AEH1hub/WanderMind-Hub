import React, { useState } from 'react';

const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    console.log({ name, email, message });
    setTimeout(() => {
      setStatus('submitted');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 4000);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-soft-lg border border-black/5">
      <h1 className="font-sans text-3xl font-bold text-center text-dark">Get In Touch</h1>
      <p className="mt-2 text-center text-muted">
        Have a question, a story idea, or just want to say hello? We'd love to hear from you.
      </p>

      {status === 'submitted' ? (
        <div className="mt-8 p-4 bg-green-100 text-green-800 rounded-md text-center">
          <h3 className="font-bold">Thank You!</h3>
          <p>Your message has been sent successfully. We'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-dark font-sans">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md shadow-soft focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark font-sans">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md shadow-soft focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-dark font-sans">Message</label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md shadow-soft focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-soft-lg text-sm font-bold text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-gray-400 font-sans"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactView;