import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

interface DocumentData {
  [key: string]: string;
}

interface jsPDFWithPlugin extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

// Utility function to format date from YYYY-MM-DD to DD.MM.YYYY
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}.${month}.${year}`;
};

// Base PDF generator with common settings
const createBasePDF = (): jsPDFWithPlugin => {
  const doc = new jsPDF() as jsPDFWithPlugin;
  doc.setFont('helvetica');
  doc.setLanguage('bg');
  return doc;
};

// Generate GFO for company without activity
export const generateGFODocument = (data: DocumentData): jsPDF => {
  const doc = createBasePDF();

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ГОДИШЕН ФИНАНСОВ ОТЧЕТ', 105, 20, { align: 'center' });
  doc.text('за фирма без дейност', 105, 30, { align: 'center' });
  doc.setFontSize(14);
  doc.text(`за ${data.year} година`, 105, 40, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Данни за фирмата:', 20, 60);
  doc.text(`Наименование: ${data.companyName}`, 30, 70);
  doc.text(`ЕИК/БУЛСТАТ: ${data.bulstat}`, 30, 80);
  doc.text(`Адрес: ${data.address}`, 30, 90);
  doc.text(`Управител: ${data.managerName}`, 30, 100);

  doc.setFontSize(12);
  doc.text('ДЕКЛАРАЦИЯ', 105, 120, { align: 'center' });

  const declarationText = 
    `Долуподписаният ${data.managerName}, в качеството си на управител на ${data.companyName}, ` +
    `с ЕИК/БУЛСТАТ ${data.bulstat}, декларирам, че през ${data.year} година дружеството не е ` +
    'осъществявало дейност по смисъла на Закона за счетоводството и не е отчитало приходи и разходи.';

  const splitText = doc.splitTextToSize(declarationText, 170);
  doc.text(splitText, 20, 130);

  doc.text('СЧЕТОВОДЕН БАЛАНС', 105, 160, { align: 'center' });

  autoTable(doc, {
    startY: 170,
    head: [['АКТИВ', 'Сума (лв.)']],
    body: [
      ['А. НЕТЕКУЩИ (ДЪЛГОТРАЙНИ) АКТИВИ', '0.00'],
      ['Б. ТЕКУЩИ (КРАТКОТРАЙНИ) АКТИВИ', '0.00'],
      ['ОБЩО АКТИВИ', '0.00']
    ],
  });

  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY || 180) + 10,
    head: [['ПАСИВ', 'Сума (лв.)']],
    body: [
      ['А. СОБСТВЕН КАПИТАЛ', '0.00'],
      ['Б. ПРОВИЗИИ И СХОДНИ ЗАДЪЛЖЕНИЯ', '0.00'],
      ['В. ЗАДЪЛЖЕНИЯ', '0.00'],
      ['ОБЩО ПАСИВИ', '0.00']
    ],
  });

  const endY = (doc.lastAutoTable?.finalY || 200) + 30;
  doc.text('Дата: ________________', 20, endY);
  doc.text('Управител: ________________', 120, endY);
  doc.text(`(${data.managerName})`, 140, endY + 10);

  return doc;
};

// Останалата част от файла не изисква промяна, защото не ползва `lastAutoTable`
