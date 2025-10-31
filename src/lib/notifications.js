// Lightweight email notification helper
// Supports either:
// 1) Generic webhook (e.g., Zapier/Make): VITE_FORM_EMAIL_WEBHOOK_URL
// 2) EmailJS REST API (no SDK): VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY

export async function sendExpressionOfInterestEmail({ toEmail, subject, formData }) {
  try {
    const webhookUrl = import.meta.env.VITE_FORM_EMAIL_WEBHOOK_URL;
    if (webhookUrl) {
      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'expression_of_interest',
          to: toEmail,
          subject,
          payload: formData,
        }),
      });
      if (!resp.ok) throw new Error('Webhook failed');
      return true;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (serviceId && templateId && publicKey) {
      const emailJsResp = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            to_email: toEmail,
            subject,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            suburb: formData.suburb,
            heard_about_us: formData.heardAboutUs,
            comments: formData.comments,
            timestamp: formData.timestamp || new Date().toISOString(),
          },
        }),
      });
      if (!emailJsResp.ok) throw new Error('EmailJS failed');
      return true;
    }

    console.warn('No email notification method configured. Set VITE_FORM_EMAIL_WEBHOOK_URL or EmailJS env vars.');
    return false;
  } catch (err) {
    console.error('sendExpressionOfInterestEmail error:', err);
    return false;
  }
}


