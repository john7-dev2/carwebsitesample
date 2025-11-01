// @ts-ignore - Deno Edge Function uses npm: prefix
import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface AppointmentData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_type: string;
  car_make: string;
  car_model: string;
  car_year?: string;
  preferred_date: string;
  preferred_time: string;
  additional_notes?: string;
}

// Function to send push notifications to admin devices
async function sendAdminNotifications(supabase: any, appointmentData: AppointmentData) {
  try {
    // Get all active admin devices
    const { data: devices, error: devicesError } = await supabase
      .from('admin_devices')
      .select('device_token, device_type')
      .eq('is_active', true);

    if (devicesError) {
      console.error('Error fetching admin devices:', devicesError);
      return;
    }

    if (!devices || devices.length === 0) {
      console.log('No active admin devices found');
      return;
    }

    // Prepare notification payload
    const notification = {
      title: '🚗 New Appointment Booking!',
      body: `${appointmentData.customer_name} booked ${appointmentData.service_type} for ${appointmentData.car_make} ${appointmentData.car_model}`,
      data: {
        type: 'new_appointment',
        customer_name: appointmentData.customer_name,
        service_type: appointmentData.service_type,
        preferred_date: appointmentData.preferred_date,
        preferred_time: appointmentData.preferred_time,
      },
    };

    // In a production environment, you would integrate with a push notification service
    // like Firebase Cloud Messaging (FCM) or Apple Push Notification service (APNs)
    // For now, we'll log the notification
    console.log('Notification to send:', notification);
    console.log('To devices:', devices);

    // Example FCM integration (commented out - requires FCM setup):
    /*
    const fcmServerKey = Deno.env.get('FCM_SERVER_KEY');
    if (fcmServerKey) {
      for (const device of devices) {
        if (device.device_type === 'android' || device.device_type === 'ios') {
          const fcmResponse = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `key=${fcmServerKey}`,
            },
            body: JSON.stringify({
              to: device.device_token,
              notification: {
                title: notification.title,
                body: notification.body,
              },
              data: notification.data,
            }),
          });
          
          if (!fcmResponse.ok) {
            console.error('FCM error:', await fcmResponse.text());
          }
        }
      }
    }
    */

    // For web push notifications (commented out - requires VAPID keys):
    /*
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY');
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY');
    
    if (vapidPublicKey && vapidPrivateKey) {
      for (const device of devices) {
        if (device.device_type === 'web') {
          // Use web-push library to send notification
          // Implementation depends on your web push setup
        }
      }
    }
    */

  } catch (error) {
    console.error('Error sending admin notifications:', error);
  }
}

// Function to send email notification (using a simple approach)
async function sendEmailNotification(appointmentData: AppointmentData) {
  // In production, integrate with an email service like SendGrid, Mailgun, or AWS SES
  // For now, we'll just log it
  console.log('Email notification would be sent to admin with details:', appointmentData);
  
  // Example with a hypothetical email service:
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  // @ts-ignore - Deno global available in Edge Functions
  /*
  const emailServiceUrl = Deno.env.get('EMAIL_SERVICE_URL');
  const emailServiceKey = Deno.env.get('EMAIL_SERVICE_KEY');
  
  if (emailServiceUrl && emailServiceKey) {
    await fetch(emailServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${emailServiceKey}`,
      },
      body: JSON.stringify({
        to: 'admin@revelrocars.com',
        subject: `New Appointment: ${appointmentData.customer_name}`,
        html: `
          <h2>New Appointment Booking</h2>
          <p><strong>Customer:</strong> ${appointmentData.customer_name}</p>
          <p><strong>Email:</strong> ${appointmentData.customer_email}</p>
          <p><strong>Phone:</strong> ${appointmentData.customer_phone}</p>
          <p><strong>Service:</strong> ${appointmentData.service_type}</p>
          <p><strong>Vehicle:</strong> ${appointmentData.car_make} ${appointmentData.car_model} ${appointmentData.car_year || ''}</p>
          <p><strong>Preferred Date:</strong> ${appointmentData.preferred_date}</p>
          <p><strong>Preferred Time:</strong> ${appointmentData.preferred_time}</p>
          ${appointmentData.additional_notes ? `<p><strong>Notes:</strong> ${appointmentData.additional_notes}</p>` : ''}
        `,
      }),
    });
  }
  */
}

// @ts-ignore - Deno global available in Edge Functions
Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // @ts-ignore - Deno global available in Edge Functions
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    // @ts-ignore - Deno global available in Edge Functions
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const appointmentData: AppointmentData = await req.json();

    // Validate required fields
    if (!appointmentData.customer_name || !appointmentData.customer_email || 
        !appointmentData.customer_phone || !appointmentData.service_type ||
        !appointmentData.car_make || !appointmentData.car_model ||
        !appointmentData.preferred_date || !appointmentData.preferred_time) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(appointmentData.customer_email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(appointmentData.customer_phone)) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone number format' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Get client IP
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Insert appointment into database
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          customer_name: appointmentData.customer_name.trim(),
          customer_email: appointmentData.customer_email.trim().toLowerCase(),
          customer_phone: appointmentData.customer_phone.trim(),
          service_type: appointmentData.service_type.trim(),
          car_make: appointmentData.car_make.trim(),
          car_model: appointmentData.car_model.trim(),
          car_year: appointmentData.car_year?.trim() || null,
          preferred_date: appointmentData.preferred_date,
          preferred_time: appointmentData.preferred_time,
          additional_notes: appointmentData.additional_notes?.trim() || null,
          status: 'pending',
          ip_address: clientIp,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to book appointment' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Send notifications to admin (async, don't wait for completion)
    sendAdminNotifications(supabase, appointmentData).catch(console.error);
    sendEmailNotification(appointmentData).catch(console.error);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Appointment booked successfully! We will contact you soon to confirm.',
        id: data.id,
        appointment: {
          date: data.preferred_date,
          time: data.preferred_time,
          service: data.service_type,
        },
      }),
      {
        status: 201,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing appointment:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
