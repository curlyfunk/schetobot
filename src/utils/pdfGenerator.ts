import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

interface DocumentData {
  [key: string]: string;
}

// Utility function to format date from YYYY-MM-DD to DD.MM.YYYY
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}.${month}.${year}`;
};

// Base PDF generator with common settings
const createBasePDF = (): jsPDF => {
  const doc = new jsPDF();
  doc.setFont('helvetica');
  doc.setLanguage('bg');
  return doc;
};

// Generate GFO for company without activity
export const generateGFODocument = (data: DocumentData): jsPDF => {
  const doc = createBasePDF();
  
  // Header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ГОДИШЕН ФИНАНСОВ ОТЧЕТ', 105, 20, { align: 'center' });
  doc.text('за фирма без дейност', 105, 30, { align: 'center' });
  doc.setFontSize(14);
  doc.text(`за ${data.year} година`, 105, 40, { align: 'center' });
  
  // Company info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Данни за фирмата:', 20, 60);
  doc.text(`Наименование: ${data.companyName}`, 30, 70);
  doc.text(`ЕИК/БУЛСТАТ: ${data.bulstat}`, 30, 80);
  doc.text(`Адрес: ${data.address}`, 30, 90);
  doc.text(`Управител: ${data.managerName}`, 30, 100);
  
  // Declaration content
  doc.setFontSize(12);
  doc.text('ДЕКЛАРАЦИЯ', 105, 120, { align: 'center' });
  
  const declarationText = 
    `Долуподписаният ${data.managerName}, в качеството си на управител на ${data.companyName}, ` +
    `с ЕИК/БУЛСТАТ ${data.bulstat}, декларирам, че през ${data.year} година дружеството не е ` +
    'осъществявало дейност по смисъла на Закона за счетоводството и не е отчитало приходи и разходи.';
  
  doc.setFont('helvetica', 'normal');
  const splitText = doc.splitTextToSize(declarationText, 170);
  doc.text(splitText, 20, 130);
  
  // Balance sheet (empty)
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
    startY: doc.lastAutoTable.finalY + 10,
    head: [['ПАСИВ', 'Сума (лв.)']],
    body: [
      ['А. СОБСТВЕН КАПИТАЛ', '0.00'],
      ['Б. ПРОВИЗИИ И СХОДНИ ЗАДЪЛЖЕНИЯ', '0.00'],
      ['В. ЗАДЪЛЖЕНИЯ', '0.00'],
      ['ОБЩО ПАСИВИ', '0.00']
    ],
  });
  
  // Signature
  doc.text('Дата: ________________', 20, doc.lastAutoTable.finalY + 30);
  doc.text('Управител: ________________', 120, doc.lastAutoTable.finalY + 30);
  doc.text(`(${data.managerName})`, 140, doc.lastAutoTable.finalY + 40);
  
  return doc;
};

// Generate service contract
export const generateServiceContract = (data: DocumentData): jsPDF => {
  const doc = createBasePDF();
  
  // Header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('ДОГОВОР ЗА ПРЕДОСТАВЯНЕ НА УСЛУГИ', 105, 20, { align: 'center' });
  
  // Contract number and date
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Днес, ${formatDate(data.deadline) || '________________'} г., в гр. София, между:`, 20, 40);
  
  // Parties
  doc.text(`1. ${data.providerName}, с ЕИК/БУЛСТАТ/ЕГН ${data.providerID}, наричан/а за краткост ИЗПЪЛНИТЕЛ, от една страна`, 20, 55);
  doc.text('и', 20, 65);
  doc.text(`2. ${data.clientName}, с ЕИК/БУЛСТАТ/ЕГН ${data.clientID}, наричан/а за краткост ВЪЗЛОЖИТЕЛ, от друга страна,`, 20, 75);
  
  doc.text('се сключи настоящият договор за следното:', 20, 90);
  
  // Contract terms
  doc.setFont('helvetica', 'bold');
  doc.text('I. ПРЕДМЕТ НА ДОГОВОРА', 20, 105);
  doc.setFont('helvetica', 'normal');
  doc.text(`Чл. 1. ВЪЗЛОЖИТЕЛЯТ възлага, а ИЗПЪЛНИТЕЛЯТ приема да извърши следната услуга:`, 20, 115);
  
  const serviceDesc = doc.splitTextToSize(data.serviceDescription, 170);
  doc.text(serviceDesc, 20, 125);
  
  doc.setFont('helvetica', 'bold');
  doc.text('II. СРОК И ЦЕНА', 20, 145 + serviceDesc.length * 5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Чл. 2. ИЗПЪЛНИТЕЛЯТ се задължава да извърши услугата в срок до ${formatDate(data.deadline)}.`, 20, 155 + serviceDesc.length * 5);
  doc.text(`Чл. 3. ВЪЗЛОЖИТЕЛЯТ се задължава да заплати на ИЗПЪЛНИТЕЛЯ възнаграждение в размер на ${data.price}.`, 20, 165 + serviceDesc.length * 5);
  
  // Signatures
  const signatureY = 230 + serviceDesc.length * 5;
  doc.text('ВЪЗЛОЖИТЕЛ: ________________', 20, signatureY);
  doc.text('ИЗПЪЛНИТЕЛ: ________________', 120, signatureY);
  
  return doc;
};

// Generate CV
export const generateCVDocument = (data: DocumentData): jsPDF => {
  const doc = createBasePDF();
  
  // Header with name
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(data.fullName, 105, 20, { align: 'center' });
  
  // Contact information
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const contactInfo = `${data.email} | ${data.phone}${data.address ? ' | ' + data.address : ''}`;
  doc.text(contactInfo, 105, 30, { align: 'center' });
  
  // Professional summary
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('ПРОФЕСИОНАЛНО РЕЗЮМЕ', 20, 45);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const summaryText = doc.splitTextToSize(data.summary, 170);
  doc.text(summaryText, 20, 55);
  
  // Professional experience
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('ПРОФЕСИОНАЛЕН ОПИТ', 20, 75 + summaryText.length * 5);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const experienceText = doc.splitTextToSize(data.experience, 170);
  doc.text(experienceText, 20, 85 + summaryText.length * 5);
  
  // Education
  const educationY = 105 + summaryText.length * 5 + experienceText.length * 5;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('ОБРАЗОВАНИЕ', 20, educationY);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const educationText = doc.splitTextToSize(data.education, 170);
  doc.text(educationText, 20, educationY + 10);
  
  // Skills
  const skillsY = educationY + 30 + educationText.length * 5;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('УМЕНИЯ', 20, skillsY);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const skillsText = doc.splitTextToSize(data.skills, 170);
  doc.text(skillsText, 20, skillsY + 10);
  
  return doc;
};

// Generate Invoice
export const generateInvoiceDocument = (data: DocumentData): jsPDF => {
  const doc = createBasePDF();
  
  // Header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ФАКТУРА', 105, 20, { align: 'center' });
  
  // Invoice details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Фактура №: ${data.invoiceNumber}`, 20, 40);
  doc.text(`Дата: ${formatDate(data.issueDate)}`, 150, 40);
  
  // Seller info
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('ПРОДАВАЧ:', 20, 55);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.sellerName}`, 20, 65);
  doc.text(`ЕИК/БУЛСТАТ: ${data.sellerVAT}`, 20, 75);
  doc.text(`Адрес: ${data.sellerAddress}`, 20, 85);
  
  // Buyer info
  doc.setFont('helvetica', 'bold');
  doc.text('КУПУВАЧ:', 120, 55);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.buyerName}`, 120, 65);
  doc.text(`ЕИК/БУЛСТАТ/ЕГН: ${data.buyerVAT}`, 120, 75);
  doc.text(`Адрес: ${data.buyerAddress}`, 120, 85);
  
  // Items table
  doc.setFontSize(10);
  autoTable(doc, {
    startY: 100,
    head: [['№', 'Описание', 'Количество', 'Ед. цена', 'Сума']],
    body: [
      ['1', data.items, '', '', '']
    ],
  });
  
  // Totals
  doc.setFontSize(11);
  doc.text('Сума без ДДС:', 130, doc.lastAutoTable.finalY + 20);
  doc.text(`${data.totalAmount} лв.`, 180, doc.lastAutoTable.finalY + 20, { align: 'right' });
  
  doc.text('ДДС (20%):', 130, doc.lastAutoTable.finalY + 30);
  doc.text(`${data.vatAmount} лв.`, 180, doc.lastAutoTable.finalY + 30, { align: 'right' });
  
  doc.setFont('helvetica', 'bold');
  doc.text('Обща сума:', 130, doc.lastAutoTable.finalY + 40);
  doc.text(`${data.totalWithVAT} лв.`, 180, doc.lastAutoTable.finalY + 40, { align: 'right' });
  
  // Signatures
  doc.setFont('helvetica', 'normal');
  doc.text('Съставил: ________________', 20, doc.lastAutoTable.finalY + 60);
  doc.text('Получил: ________________', 120, doc.lastAutoTable.finalY + 60);
  
  return doc;
};

// Generate Declaration of No Conflict of Interest
export const generateDeclarationDocument = (data: DocumentData): jsPDF => {
  const doc = createBasePDF();
  
  // Header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('ДЕКЛАРАЦИЯ', 105, 20, { align: 'center' });
  doc.text('за липса на конфликт на интереси', 105, 30, { align: 'center' });
  
  // Declarator info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Долуподписаният/ата:', 20, 50);
  doc.text(`${data.declaratorName}, ЕГН ${data.declaratorID}`, 20, 60);
  doc.text(`в качеството ми на ${data.position}`, 20, 70);
  doc.text(`в ${data.companyName}`, 20, 80);
  
  // Declaration text
  doc.text('ДЕКЛАРИРАМ:', 20, 100);
  
  const declarationText = 
    `1. Не съм в конфликт на интереси по смисъла на чл. 57, параграф 2 от Регламент (ЕС, Евратом) ` +
    `№ 966/2012 на Европейския парламент и на Съвета от 25 октомври 2012 г. относно финансовите ` +
    `правила, приложими за общия бюджет на Съюза.\n\n` +
    `2. Нямам частен интерес от възлагането на обществена поръчка по конкретната процедура.\n\n` +
    `3. Не съм свързано лице с кандидат или участник в процедурата или с посочените от него подизпълнители.`;
  
  const splitText = doc.splitTextToSize(declarationText, 170);
  doc.text(splitText, 20, 110);
  
  // Project info
  doc.text(`Настоящата декларация се отнася за процедура: ${data.projectName}`, 20, 170);
  
  // Date and signature
  doc.text(`Дата: ${formatDate(data.declarationDate)}`, 20, 200);
  doc.text('Декларатор: ________________', 120, 200);
  
  return doc;
};

// Main function to generate document based on template ID
export const generateDocument = (templateId: string, data: DocumentData): jsPDF => {
  switch (templateId) {
    case 'gfo-no-activity':
      return generateGFODocument(data);
    case 'service-contract':
      return generateServiceContract(data);
    case 'cv-template':
      return generateCVDocument(data);
    case 'invoice-template':
      return generateInvoiceDocument(data);
    case 'declaration-no-conflict':
      return generateDeclarationDocument(data);
    default:
      throw new Error(`Template ${templateId} not implemented yet`);
  }
};

export default generateDocument;
