# Booking System Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Database Setup
- [ ] Run the appointments table migration
  ```bash
  supabase db push
  ```
  Or execute `supabase/migrations/20251031160000_create_appointments_table.sql` in Supabase SQL Editor

- [ ] Verify tables created:
  ```sql
  SELECT * FROM appointments LIMIT 1;
  SELECT * FROM admin_devices LIMIT 1;
  ```

### 2. Edge Functions Deployment
- [ ] Deploy book-appointment function
  ```bash
  supabase functions deploy book-appointment
  ```

- [ ] (Optional) Deploy register-admin-device function
  ```bash
  supabase functions deploy register-admin-device
  ```

- [ ] Verify functions are live in Supabase Dashboard > Edge Functions

### 3. Environment Variables
- [ ] Confirm `.env` file has:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

- [ ] (Optional) Set notification service keys in Supabase:
  ```bash
  # For email notifications (SendGrid)
  supabase secrets set SENDGRID_API_KEY=your_key

  # For push notifications (FCM)
  supabase secrets set FCM_SERVER_KEY=your_key
  ```

### 4. Frontend Build
- [ ] Install dependencies
  ```bash
  npm install
  ```

- [ ] Test locally
  ```bash
  npm run dev
  ```

- [ ] Build for production
  ```bash
  npm run build
  ```

### 5. Testing
- [ ] Test booking form opens on Services page
- [ ] Test form validation (required fields)
- [ ] Test successful booking submission
- [ ] Verify appointment appears in database
- [ ] Check Edge Function logs for errors

## 🔔 Notification Setup (Optional but Recommended)

### Quick Start: Email Notifications
- [ ] Sign up for SendGrid (free tier)
- [ ] Get API key
- [ ] Set in Supabase: `supabase secrets set SENDGRID_API_KEY=your_key`
- [ ] Update Edge Function to use email (uncomment code)
- [ ] Test by making a booking

### Advanced: Push Notifications
- [ ] Follow `PUSH_NOTIFICATIONS_SETUP.md`
- [ ] Choose notification service (FCM recommended)
- [ ] Set up Firebase project
- [ ] Configure credentials in Supabase
- [ ] Register admin devices
- [ ] Test notifications

## 🚀 Go Live

### Option A: Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option B: Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option C: Deploy to your hosting
- Upload `dist/` folder contents
- Configure environment variables on host
- Point domain to hosting

## 📋 Post-Deployment

- [ ] Test booking on production site
- [ ] Monitor Edge Function logs
- [ ] Check database for test bookings
- [ ] Set up admin notification method
- [ ] Create admin panel (future)
- [ ] Set up automated backups

## 🎯 Quick Test Script

Run this after deployment:

1. **Visit your site** → Navigate to Services
2. **Click "Book Now"** on any service
3. **Fill form** with test data:
   - Name: Test User
   - Email: test@example.com
   - Phone: +91 9999999999
   - Car: Toyota Camry 2023
   - Date: Tomorrow
   - Time: Any slot
4. **Submit** and wait for success message
5. **Check database**:
   ```sql
   SELECT * FROM appointments 
   WHERE customer_email = 'test@example.com' 
   ORDER BY created_at DESC LIMIT 1;
   ```

## ⚠️ Important Notes

- **TypeScript errors** in Edge Functions are expected (Deno environment)
- **RLS policies** are configured for public booking, admin-only viewing
- **IP tracking** is enabled for spam prevention
- **Date validation** prevents booking in the past
- **Email validation** ensures valid email format

## 🐛 Common Issues

### Issue: "Failed to book appointment"
**Fix:** Check Edge Function logs, verify Supabase credentials

### Issue: Modal doesn't open
**Fix:** Check browser console, ensure BookingModal is imported

### Issue: Database error
**Fix:** Verify migration ran successfully, check RLS policies

### Issue: No notifications
**Fix:** Set up notification service, check credentials

## 📞 Need Help?

1. Check `BOOKING_SYSTEM_README.md` for detailed docs
2. Review `PUSH_NOTIFICATIONS_SETUP.md` for notifications
3. Check Supabase Dashboard logs
4. Verify all environment variables

---

**Status:** Ready for deployment! 🎉
