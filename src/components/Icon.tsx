import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function Icon({ name, size = 24, className = '', strokeWidth = 2 }: IconProps) {
  const [svgContent, setSvgContent] = React.useState<string>('');

  React.useEffect(() => {
    // Dynamically import the SVG file
    import(`../assets/icons/${name}.svg?raw`)
      .then((module) => {
        let svg = module.default;
        
        // Modify SVG attributes to match our needs
        svg = svg.replace(/<svg([^>]*)>/, (match: string, attrs: string) => {
          // Remove existing width, height, and add our custom ones
          let newAttrs = attrs
            .replace(/width="[^"]*"/g, '')
            .replace(/height="[^"]*"/g, '')
            .replace(/stroke-width="[^"]*"/g, '');
          
          return `<svg${newAttrs} width="${size}" height="${size}" stroke-width="${strokeWidth}" class="${className}">`;
        });
        
        setSvgContent(svg);
      })
      .catch((error) => {
        console.error(`Failed to load icon: ${name}`, error);
        // Fallback to a simple placeholder
        setSvgContent(`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" class="${className}"><circle cx="12" cy="12" r="10"/></svg>`);
      });
  }, [name, size, className, strokeWidth]);

  return <div dangerouslySetInnerHTML={{ __html: svgContent }} style={{ display: 'inline-block', lineHeight: 0 }} />;
}

// Export individual icon components for easier migration
export const Phone = (props: Omit<IconProps, 'name'>) => <Icon name="Phone" {...props} />;
export const Menu = (props: Omit<IconProps, 'name'>) => <Icon name="Menu" {...props} />;
export const X = (props: Omit<IconProps, 'name'>) => <Icon name="X" {...props} />;
export const Mail = (props: Omit<IconProps, 'name'>) => <Icon name="Mail" {...props} />;
export const MapPin = (props: Omit<IconProps, 'name'>) => <Icon name="MapPin" {...props} />;
export const Facebook = (props: Omit<IconProps, 'name'>) => <Icon name="Facebook" {...props} />;
export const Instagram = (props: Omit<IconProps, 'name'>) => <Icon name="Instagram" {...props} />;
export const Linkedin = (props: Omit<IconProps, 'name'>) => <Icon name="Linkedin" {...props} />;
export const Clock = (props: Omit<IconProps, 'name'>) => <Icon name="Clock" {...props} />;
export const Send = (props: Omit<IconProps, 'name'>) => <Icon name="Send" {...props} />;
export const Search = (props: Omit<IconProps, 'name'>) => <Icon name="Search" {...props} />;
export const Settings = (props: Omit<IconProps, 'name'>) => <Icon name="Settings" {...props} />;
export const Shield = (props: Omit<IconProps, 'name'>) => <Icon name="Shield" {...props} />;
export const Crown = (props: Omit<IconProps, 'name'>) => <Icon name="Crown" {...props} />;
export const Plug = (props: Omit<IconProps, 'name'>) => <Icon name="Plug" {...props} />;
export const Ruler = (props: Omit<IconProps, 'name'>) => <Icon name="Ruler" {...props} />;
export const Gauge = (props: Omit<IconProps, 'name'>) => <Icon name="Gauge" {...props} />;
export const Camera = (props: Omit<IconProps, 'name'>) => <Icon name="Camera" {...props} />;
export const Battery = (props: Omit<IconProps, 'name'>) => <Icon name="Battery" {...props} />;
export const Thermometer = (props: Omit<IconProps, 'name'>) => <Icon name="Thermometer" {...props} />;
export const Eye = (props: Omit<IconProps, 'name'>) => <Icon name="Eye" {...props} />;
export const ClipboardList = (props: Omit<IconProps, 'name'>) => <Icon name="ClipboardList" {...props} />;
export const Wrench = (props: Omit<IconProps, 'name'>) => <Icon name="Wrench" {...props} />;
export const FileText = (props: Omit<IconProps, 'name'>) => <Icon name="FileText" {...props} />;
export const Calendar = (props: Omit<IconProps, 'name'>) => <Icon name="Calendar" {...props} />;
export const UserCheck = (props: Omit<IconProps, 'name'>) => <Icon name="UserCheck" {...props} />;
export const Cog = (props: Omit<IconProps, 'name'>) => <Icon name="Cog" {...props} />;
export const FileCheck = (props: Omit<IconProps, 'name'>) => <Icon name="FileCheck" {...props} />;
export const BookOpen = (props: Omit<IconProps, 'name'>) => <Icon name="BookOpen" {...props} />;
export const Package = (props: Omit<IconProps, 'name'>) => <Icon name="Package" {...props} />;
export const CheckCircle = (props: Omit<IconProps, 'name'>) => <Icon name="CheckCircle" {...props} />;
export const Check = (props: Omit<IconProps, 'name'>) => <Icon name="Check" {...props} />;
export const Car = (props: Omit<IconProps, 'name'>) => <Icon name="Car" {...props} />;
export const MessageSquare = (props: Omit<IconProps, 'name'>) => <Icon name="MessageSquare" {...props} />;
export const User = (props: Omit<IconProps, 'name'>) => <Icon name="User" {...props} />;
