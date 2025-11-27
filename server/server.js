import express from 'express';
import cors from 'cors';
import { parseStringPromise } from 'xml2js';

const app = express();
const PORT = 3001;

// RegCheck API credentials
const REGCHECK_USERNAME = 'jou1';
const REGCHECK_API_URL = 'https://www.regcheck.org.uk/api/reg.asmx';

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Revelro API Server Running' });
});

// Test RegCheck credentials   
app.get('/api/test-credentials', async (req, res) => {
  try {   
    const testSoapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema"
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CheckIndia xmlns="http://regcheck.org.uk/">
      <RegistrationNumber>TEST123</RegistrationNumber>
      <username>${REGCHECK_USERNAME}</username>
    </CheckIndia>
  </soap:Body>
</soap:Envelope>`;

    const response = await fetch(REGCHECK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://regcheck.org.uk/CheckIndia'
      },
      body: testSoapRequest
    });

    const xmlResponse = await response.text();
    
    res.json({
      status: response.status,
      username: REGCHECK_USERNAME,
      response: xmlResponse,
      message: response.ok ? 'Credentials appear valid' : 'Credentials may be invalid - check response'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vehicle history check endpoint
app.post('/api/vehicle-history', async (req, res) => {
  try {
    const { vehicleNumber } = req.body;

    if (!vehicleNumber) {
      return res.status(400).json({
        success: false,
        error: 'Vehicle registration number is required'
      });
    }

    // Construct SOAP XML request (SOAP 1.2 format)
    const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                 xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                 xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <CheckIndia xmlns="http://regcheck.org.uk">
      <RegistrationNumber>${vehicleNumber}</RegistrationNumber>
      <username>${REGCHECK_USERNAME}</username>
    </CheckIndia>
  </soap12:Body>
</soap12:Envelope>`;

    console.log(`[${new Date().toISOString()}] Fetching vehicle data for: ${vehicleNumber}`);

    // Make SOAP request to RegCheck API
    const response = await fetch(REGCHECK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/soap+xml; charset=utf-8'
      },
      body: soapRequest
    });

    const xmlResponse = await response.text();
    console.log(`[${new Date().toISOString()}] Response status: ${response.status}`);
    console.log(`[${new Date().toISOString()}] Response preview:`, xmlResponse.substring(0, 500));

    if (!response.ok) {
      console.error('[ERROR] RegCheck API error response:', xmlResponse);
      throw new Error(`RegCheck API returned status: ${response.status}. Check if username is valid or if the vehicle number format is correct.`);
    }

    // Parse XML to JSON
    const parsedData = await parseStringPromise(xmlResponse, {
      explicitArray: false,
      ignoreAttrs: true,
      tagNameProcessors: [
        (name) => name.replace('soap:', '').replace('CheckIndiaResponse', 'Response')
      ]
    });

    // Extract vehicle data from SOAP response
    const vehicleData = parsedData?.Envelope?.Body?.Response?.CheckIndiaResult;

    if (!vehicleData) {
      return res.status(404).json({
        success: false,
        error: 'No vehicle data found for this registration number'
      });
    }

    // Log the structure for debugging
    console.log('[DEBUG] Vehicle data structure:', JSON.stringify(vehicleData, null, 2));

    // Return structured response
    res.json({
      success: true,
      data: {
        vehicleNumber: vehicleNumber,
        rawData: vehicleData,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch vehicle history',
      details: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚗 Revelro Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 Vehicle History API: http://localhost:${PORT}/api/vehicle-history`);
  console.log(`✅ Health Check: http://localhost:${PORT}/health`);
});
