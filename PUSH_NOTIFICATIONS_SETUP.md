# Push Notifications Setup Guide

This guide explains how to set up push notifications for admin devices when users book appointments.

## Overview

The booking system is now complete with:
- ✅ Appointments database table
- ✅ Booking Edge Function with notification hooks
- ✅ Booking modal UI on Services page
- ⏳ Push notification integration (requires setup)

## Push Notification Options

### Option 1: Firebase Cloud Messaging (FCM) - Recommended

FCM supports both iOS and Android devices and is free to use.

#### Setup Steps:

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Enable Cloud Messaging

2. **Get Server Key**
   - In Firebase Console, go to Project Settings > Cloud Messaging
   - Copy the Server Key (Legacy)

3. **Add Server Key to Supabase**
   ```bash
   # Set the FCM server key as an environment variable in Supabase
   supabase secrets set FCM_SERVER_KEY=your_server_key_here
   ```

4. **Update Edge Function**
   - Uncomment the FCM integration code in `supabase/functions/book-appointment/index.ts`
   - The code is already prepared (lines 69-88)

5. **Register Admin Devices**
   - Create an admin panel or script to register device tokens
   - Insert device tokens into the `admin_devices` table:
   ```sql
   INSERT INTO admin_devices (device_token, device_type, is_active)
   VALUES ('your_fcm_device_token', 'android', true);
   ```

6. **Get Device Tokens**
   - For Android: Use Firebase SDK in your admin app
   - For iOS: Use Firebase SDK in your admin app
   - Example code to get token:
   ```javascript
   // In your admin mobile app
   import messaging from '@react-native-firebase/messaging';
   
   async function getDeviceToken() {
     const token = await messaging().getToken();
     console.log('Device Token:', token);
     // Send this token to your backend to store in admin_devices table
   }
   ```

### Option 2: Apple Push Notification Service (APNs)

For iOS-only notifications.

#### Setup Steps:

1. **Get APNs Certificate**
   - Log in to Apple Developer Portal
   - Create an APNs certificate for your app
   - Download the certificate

2. **Configure in Supabase**
   ```bash
   supabase secrets set APNS_KEY_ID=your_key_id
   supabase secrets set APNS_TEAM_ID=your_team_id
   supabase secrets set APNS_PRIVATE_KEY=your_private_key
   ```

3. **Update Edge Function**
   - Add APNs integration code to the Edge Function
   - Use a library like `apn` for Node.js

### Option 3: Web Push Notifications

For browser-based notifications.

#### Setup Steps:

1. **Generate VAPID Keys**
   ```bash
   npm install -g web-push
   web-push generate-vapid-keys
   ```

2. **Add Keys to Supabase**
   ```bash
   supabase secrets set VAPID_PUBLIC_KEY=your_public_key
   supabase secrets set VAPID_PRIVATE_KEY=your_private_key
   ```

3. **Update Edge Function**
   - Uncomment the web push code in the Edge Function
   - Install web-push library in your Edge Function

4. **Register Service Worker**
   - Add a service worker to your admin dashboard
   - Subscribe to push notifications
   - Store the subscription in `admin_devices` table

### Option 4: Email Notifications (Immediate Alternative)

While setting up push notifications, you can use email notifications immediately.

#### Setup with SendGrid:

1. **Sign up for SendGrid**
   - Go to [SendGrid](https://sendgrid.com/)
   - Create a free account (100 emails/day free)

2. **Get API Key**
   - In SendGrid Dashboard, go to Settings > API Keys
   - Create a new API key

3. **Add to Supabase**
   ```bash
   supabase secrets set SENDGRID_API_KEY=your_api_key
   ```

4. **Update Edge Function**
   ```typescript
   // In supabase/functions/book-appointment/index.ts
   async function sendEmailNotification(appointmentData: AppointmentData) {
     const sendgridApiKey = Deno.env.get('SENDGRID_API_KEY');
     
     if (!sendgridApiKey) {
       console.log('SendGrid API key not configured');
       return;
     }
     
     const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${sendgridApiKey}`,
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         personalizations: [{
           to: [{ email: 'admin@revelrocars.com' }],
           subject: `New Appointment: ${appointmentData.customer_name}`,
         }],
         from: { email: 'noreply@revelrocars.com' },
         content: [{
           type: 'text/html',
           value: `
             <h2>New Appointment Booking</h2>
             <p><strong>Customer:</strong> ${appointmentData.customer_name}</p>
             <p><strong>Email:</strong> ${appointmentData.customer_email}</p>
             <p><strong>Phone:</strong> ${appointmentData.customer_phone}</p>
             <p><strong>Service:</strong> ${appointmentData.service_type}</p>
             <p><strong>Vehicle:</strong> ${appointmentData.car_make} ${appointmentData.car_model}</p>
             <p><strong>Date:</strong> ${appointmentData.preferred_date}</p>
             <p><strong>Time:</strong> ${appointmentData.preferred_time}</p>
           `,
         }],
       }),
     });
     
     if (!response.ok) {
       console.error('SendGrid error:', await response.text());
     }
   }
   ```

## Testing the System

### 1. Test Appointment Booking

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Services page
3. Click "Book Now" on any service
4. Fill out the booking form
5. Submit the form

### 2. Verify Database Entry

Check if the appointment was created:
```sql
SELECT * FROM appointments ORDER BY created_at DESC LIMIT 1;
```

### 3. Check Edge Function Logs

View logs in Supabase Dashboard:
- Go to Edge Functions > book-appointment > Logs
- Look for notification attempts

## Admin Device Registration

To receive notifications, admin devices must be registered in the `admin_devices` table.

### Manual Registration (for testing):

```sql
-- For Android/iOS (FCM)
INSERT INTO admin_devices (device_token, device_type, is_active)
VALUES ('your_fcm_token_here', 'android', true);

-- For Web Push
INSERT INTO admin_devices (device_token, device_type, is_active)
VALUES ('your_web_push_subscription_json', 'web', true);
```

### Programmatic Registration:

Create an admin panel with a "Register Device" button that:
1. Requests notification permission
2. Gets the device token
3. Sends it to your backend
4. Stores it in the `admin_devices` table

## Troubleshooting

### No Notifications Received

1. **Check Edge Function Logs**
   - Look for errors in Supabase Dashboard

2. **Verify Device Registration**
   ```sql
   SELECT * FROM admin_devices WHERE is_active = true;
   ```

3. **Test FCM Token**
   - Use Firebase Console to send a test notification
   - Verify the token is valid

4. **Check Environment Variables**
   ```bash
   supabase secrets list
   ```

### Appointments Not Saving

1. **Check Browser Console**
   - Look for API errors

2. **Verify Supabase Configuration**
   - Ensure `.env` has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

3. **Check RLS Policies**
   - Verify the "Anyone can book appointments" policy is active

## Next Steps

1. **Choose a notification method** (FCM recommended)
2. **Set up the service** (Firebase, SendGrid, etc.)
3. **Add environment variables** to Supabase
4. **Update Edge Function** (uncomment relevant code)
5. **Register admin devices**
6. **Test the complete flow**

## Security Considerations

- Never expose FCM server keys or API keys in client-side code
- Use environment variables for all sensitive data
- Implement rate limiting to prevent spam
- Validate device tokens before storing
- Regularly clean up inactive device tokens

## Support

For issues or questions:
- Check Supabase Edge Function logs
- Review Firebase Console for FCM issues
- Verify database entries and RLS policies
