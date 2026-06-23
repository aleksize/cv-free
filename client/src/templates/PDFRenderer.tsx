import { Document, Font } from '@react-pdf/renderer';
import type { CvData } from '../types/cv';
import ClassicPDF from './ClassicPDF';
import ModernPDF from './ModernPDF';
import MinimalPDF from './MinimalPDF';
import TechnicalPDF from './TechnicalPDF';

// Register Polish supporting fonts from local assets (TTF format, served from /public/fonts)
Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Roboto-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Roboto-Regular.ttf', fontWeight: 500 },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 600 },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' }
  ]
});

Font.register({
  family: 'Inter',
  fonts: [
    { src: '/fonts/Inter-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Inter-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Inter-Regular.ttf', fontWeight: 500 },
    { src: '/fonts/Inter-Bold.ttf', fontWeight: 600 },
    { src: '/fonts/Inter-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/Inter-Bold.ttf', fontWeight: 'bold' }
  ]
});

Font.register({
  family: 'Montserrat',
  fonts: [
    { src: '/fonts/Montserrat-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Montserrat-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Montserrat-Regular.ttf', fontWeight: 500 },
    { src: '/fonts/Montserrat-Bold.ttf', fontWeight: 600 },
    { src: '/fonts/Montserrat-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/Montserrat-Bold.ttf', fontWeight: 'bold' }
  ]
});

interface CvDocumentProps {
  data: CvData;
}

export function CvDocument({ data }: CvDocumentProps) {
  const renderTemplate = () => {
    switch (data.template) {
      case 'classic':
        return <ClassicPDF data={data} />;
      case 'minimal':
        return <MinimalPDF data={data} />;
      case 'technical':
        return <TechnicalPDF data={data} />;
      case 'modern':
      default:
        return <ModernPDF data={data} />;
    }
  };

  return (
    <Document title={`${data.personal.fullName || 'CV'} - cv-free.pl`} author={data.personal.fullName}>
      {renderTemplate()}
    </Document>
  );
}
