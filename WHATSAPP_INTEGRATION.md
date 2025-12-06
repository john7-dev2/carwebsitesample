# WhatsApp Integration Guide

## Overview
This document explains how to set up WhatsApp notifications after successful payment.

## Implementation Steps

### 1. Backend API Setup (Required)

You need to create a backend API endpoint at `/api/send-whatsapp` that will handle sending WhatsApp messages.

#### Option A: Using Twilio WhatsApp API

```javascript
// Example Node.js/Express endpoint
const twilio = require('twilio');

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

app.post('/api/send-whatsapp', async (req, res) => {
  const { to, message, vehicleNumber, amount, paymentId } = req.body;
  
  try {
    const messageResponse = await client.messages.create({
      from: 'whatsapp:+14155238886', // Twilio WhatsApp number
      to: `whatsapp:+91${to}`, // Customer's WhatsApp number
      body: message
    });
    
    console.log('WhatsApp message sent:', messageResponse.sid);
    res.json({ success: true, messageSid: messageResponse.sid });
  } catch (error) {
    console.error('Error sending WhatsApp:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
```

#### Option B: Using WhatsApp Business API

```javascript
// Example using WhatsApp Business API
const axios = require('axios');

app.post('/api/send-whatsapp', async (req, res) => {
  const { to, message, vehicleNumber, amount, paymentId } = req.body;
  
  try {
    const response = await axios.post(
      'https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages',
      {
        messaging_product: 'whatsapp',
        to: `91${to}`,
        type: 'text',
        text: { body: message }
      },
      {
        headers: {
          'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('WhatsApp message sent:', response.data);
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error sending WhatsApp:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
```

#### Option C: Using WATI (WhatsApp Team Inbox)

```javascript
// Example using WATI API
const axios = require('axios');

app.post('/api/send-whatsapp', async (req, res) => {
  const { to, message, vehicleNumber, amount, paymentId } = req.body;
  
  try {
    const response = await axios.post(
      'https://live-server-XXXX.wati.io/api/v1/sendSessionMessage',
      {
        phone: `91${to}`,
        message: message
      },
      {
        headers: {
          'Authorization': 'Bearer YOUR_WATI_API_KEY',
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('WhatsApp message sent:', response.data);
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error sending WhatsApp:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### 2. Message Template

The current message template sent to customers:

```
🎉 Payment Successful!

Vehicle: KL03Y1954
Amount: ₹235
Payment ID: pay_xxxxxxxxxxxxx

Your vehicle history report will be delivered to WhatsApp number: 9999999999

Thank you for choosing our service!
```

### 3. Razorpay Webhook (Alternative Method)

Instead of listening to payment events on the frontend, you can use Razorpay webhooks:

```javascript
// Razorpay webhook handler
app.post('/api/razorpay-webhook', async (req, res) => {
  const secret = 'YOUR_WEBHOOK_SECRET';
  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest === req.headers['x-razorpay-signature']) {
    const event = req.body.event;
    
    if (event === 'payment.captured') {
      const payment = req.body.payload.payment.entity;
      
      // Send WhatsApp notification
      await sendWhatsAppNotification({
        to: payment.notes.contact_number,
        vehicleNumber: payment.notes.vehicle_number,
        amount: payment.amount / 100,
        paymentId: payment.id
      });
    }
    
    res.json({ status: 'ok' });
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
});
```

### 4. Environment Variables

Create a `.env` file:

```env
# Twilio (Option A)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+14155238886

# WhatsApp Business API (Option B)
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token

# WATI (Option C)
WATI_API_KEY=your_wati_api_key
WATI_SERVER_URL=https://live-server-XXXX.wati.io

# Razorpay
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

### 5. Testing

To test the WhatsApp integration:

1. Use Razorpay test mode
2. Complete a test payment
3. Check your backend logs for the API call
4. Verify WhatsApp message delivery

### 6. Production Checklist

- [ ] Set up WhatsApp Business Account
- [ ] Get API credentials (Twilio/WhatsApp Business/WATI)
- [ ] Configure backend API endpoint
- [ ] Set up Razorpay webhooks (optional but recommended)
- [ ] Test with real phone numbers
- [ ] Add error handling and retry logic
- [ ] Set up monitoring and logging
- [ ] Add rate limiting to prevent abuse

## Notes

- The current frontend implementation listens for payment success via `window.postMessage`
- For production, consider using Razorpay webhooks for more reliability
- Store payment records in your database before sending WhatsApp messages
- Add proper error handling and user notifications if WhatsApp delivery fails
