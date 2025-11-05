// The Noun Project API integration
const NOUN_PROJECT_API_KEY = '3965033ad0c3476288a04637b6b264e0';
const NOUN_PROJECT_SECRET = '68b8a785fd5d45e2b643d9292a566ee6';

interface NounProjectIcon {
  id: string;
  term: string;
  preview_url: string;
  icon_url: string;
}

// Icon mapping for all icons used in the application
export const iconSearchTerms = {
  // Header & Navigation
  phone: 'phone call',
  menu: 'hamburger menu',
  close: 'close x',
  
  // Footer & Contact
  mail: 'email envelope',
  mapPin: 'location pin',
  facebook: 'facebook',
  instagram: 'instagram',
  linkedin: 'linkedin',
  clock: 'clock time',
  send: 'send paper plane',
  
  // Service Cards
  search: 'search magnifying glass',
  settings: 'settings gear',
  shield: 'shield protection',
  crown: 'crown premium',
  
  // Equipment
  plug: 'plug connector',
  ruler: 'ruler measure',
  gauge: 'gauge meter',
  camera: 'camera',
  battery: 'battery',
  thermometer: 'thermometer temperature',
  eye: 'eye view',
  clipboardList: 'clipboard checklist',
  
  // Process
  wrench: 'wrench tool',
  fileText: 'document file',
  calendar: 'calendar date',
  
  // Features
  userCheck: 'user checkmark',
  cog: 'cog gear',
  fileCheck: 'document checkmark',
  bookOpen: 'book open',
  package: 'package box',
  checkCircle: 'checkmark circle',
  check: 'checkmark',
  
  // Vehicle
  car: 'car automobile',
  
  // Modal
  messageSquare: 'message chat',
  user: 'user person',
};

export async function fetchIconFromNounProject(searchTerm: string): Promise<string> {
  const auth = btoa(`${NOUN_PROJECT_API_KEY}:${NOUN_PROJECT_SECRET}`);
  
  try {
    const response = await fetch(
      `https://api.thenounproject.com/v2/icon?query=${encodeURIComponent(searchTerm)}&limit=1`,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch icon: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.icons && data.icons.length > 0) {
      // Return the SVG URL
      return data.icons[0].icon_url;
    }
    
    throw new Error('No icon found');
  } catch (error) {
    console.error(`Error fetching icon for "${searchTerm}":`, error);
    throw error;
  }
}

export async function downloadIconSVG(iconUrl: string): Promise<string> {
  try {
    const response = await fetch(iconUrl);
    if (!response.ok) {
      throw new Error(`Failed to download SVG: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error downloading SVG:', error);
    throw error;
  }
}
