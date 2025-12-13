'use client';

import React from 'react';
import { 
  FiArrowRight, 
  FiArrowLeft, 
  FiDownload, 
  FiPhone, 
  FiMail, 
  FiMapPin,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiCheck,
  FiPlus,
  FiMinus,
  FiMessageCircle,
  FiSend,
  FiEye,
  FiX,
  FiCalendar,
  FiUser,
  FiTarget,
  FiZap,
  FiThermometer,
  FiPackage,
  FiCpu,
  FiSettings,
  FiPower,
  FiGlobe,
  FiWind
} from 'react-icons/fi';
import { 
  FaWhatsapp, 
  FaLinkedin,
  FaUtensils,
  FaTshirt,
  FaBox,
  FaPills,
  FaFlask,
  FaFire,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { GiMilkCarton } from 'react-icons/gi';
import { IoLeafOutline } from 'react-icons/io5';

export interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  'arrow-right': FiArrowRight,
  'arrow-left': FiArrowLeft,
  'download': FiDownload,
  'phone': FiPhone,
  'mail': FiMail,
  'map-pin': FiMapPin, // Default outline style
  'location': FaMapMarkerAlt, // Filled marker style
  'map-marker': FaMapMarkerAlt, // Alias for filled marker
  'chevron-down': FiChevronDown,
  'chevron-left': FiChevronLeft,
  'chevron-right': FiChevronRight,
  'check-circle': FiCheckCircle,
  'check': FiCheck,
  'plus': FiPlus,
  'minus': FiMinus,
  'message-circle': FiMessageCircle,
  'send': FiSend,
  'eye': FiEye,
  'x': FiX,
  'calendar': FiCalendar,
  'user': FiUser,
  'target': FiTarget,
  'zap': FiZap,
  'thermometer': FiThermometer,
  'package': FiPackage,
  'cpu': FiCpu,
  'settings': FiSettings,
  'power': FiPower,
  'whatsapp': FaWhatsapp,
  'linkedin': FaLinkedin,
  'utensils': FaUtensils,
  'tshirt': FaTshirt,
  'box': FaBox,
  'pills': FaPills,
  'flask': FaFlask,
  'fire': FaFire,
  'flame': FaFire, // Map flame to fire icon
  'wind': FiWind,
  'milk-carton': GiMilkCarton,
  'sprout': IoLeafOutline,
  'globe': FiGlobe,
};

function Icon({ name, className = '', style, size }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const sizeValue = size || 24;
  const width = typeof sizeValue === 'number' ? sizeValue : parseFloat(sizeValue as string) || 24;
  const height = typeof sizeValue === 'number' ? sizeValue : parseFloat(sizeValue as string) || 24;

  return (
    <IconComponent
      className={className}
      style={{
        width: width,
        height: height,
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
    />
  );
}

export default Icon;
