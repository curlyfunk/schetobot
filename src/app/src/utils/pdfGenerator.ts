import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

/**
 * Генерира PDF документ според избрания тип и въведените данни
 * @param documentType Тип на документа (declaration, invoice, contract, application, certificate)
 * @param formData Данни от формуляра
 * @returns Генерираният PDF документ
 */
export const generateDocument = (documentType: string, formData: any): jsPDF => {
  // Създаване на нов PDF документ
  const doc = new jsPDF();
  
  // Общи настройки
  doc.setFont('helvetica');
  doc.setLanguage('bg');
  
  // Добавяне на заглавие според типа документ
  let title = '';
  switch (documentType) {
    case 'declaration':
      title = 'ДАНЪЧНА ДЕКЛАРАЦИЯ';
      generateDeclaration(doc, formData);
      break;
    case 'invoice':
      title = 'ФАКТУРА';
      generateInvoice(doc, formData);
      break;
    case 'contract':
      title = 'ДОГОВОР';
      generateContract(doc, formData);
      break;
    case 'application':
      title = 'ЗАЯВЛЕНИЕ';
      generateApplication(doc, formData);
      break;
    case 'certificate':
      title = 'УДОСТОВЕРЕНИЕ';
      generateCertificate(doc, formData);
      break;
    default:
      title = 'ДОКУМЕНТ';
      generateGenericDocument(doc, formData);
  }
  
  // Добавяне на заглавие
  doc.setFontSize(16);
  doc.text(title, 105, 20, { align: 'center' });
  
  // Добавяне на номер и дата
  const today = new Date();
  const documentNumber = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  
  doc.setFontSize(10);
  doc.text(`№ ${documentNumber}`, 105, 30, { align: 'center' });
  doc.text(`Дата: ${today.toLocaleDateString('bg-BG')}`, 105, 35, { align: 'center' });
  
  // Добавяне на footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Документът е генериран чрез e-doc.bg | Страница ${i} от ${pageCount}`, 105, 290, { align: 'center' });
  }
  
  // Запазване на PDF документа
  doc.save(`${documentType}_${documentNumber}.pdf`);
  
  return doc;
};

/**
 * Генерира данъчна декларация
 * @param doc PDF документ
 * @param formData Данни от формуляра
 */
const generateDeclaration = (doc: jsPDF, formData: any): void => {
  // Данни за лицето
  doc.setFontSize(12);
  doc.text('ДАННИ ЗА ДЕКЛАРАТОРА:', 20, 50);
  
  doc.setFontSize(10);
  doc.text(`Име: ${formData.fullName}`, 20, 60);
  doc.text(`ЕГН: ${formData.egn}`, 20, 65);
  doc.text(`Адрес: ${formData.address}`, 20, 70);
  doc.text(`Имейл: ${formData.email}`, 20, 75);
  doc.text(`Телефон: ${formData.phone}`, 20, 80);
  
  // Данни за декларацията
  doc.setFontSize(12);
  doc.text('ДЕКЛАРИРАМ:', 20, 95);
  
  doc.setFontSize(10);
  doc.text(`1. Доход за периода ${formData.period}: ${formData.income} лв.`, 20, 105);
  
  // Допълнителна информация
  if (formData.additionalInfo) {
    doc.text('Допълнителна информация:', 20, 115);
    doc.text(formData.additionalInfo, 25, 125);
  }
  
  // Подпис
  doc.text('Декларатор: ............................', 130, 200);
  doc.text(`(${formData.fullName})`, 140, 205);
};

/**
 * Генерира фактура
 * @param doc PDF документ
 * @param formData Данни от формуляра
 */
const generateInvoice = (doc: jsPDF, formData: any): void => {
  // Данни за издателя
  doc.setFontSize(12);
  doc.text('ИЗДАТЕЛ:', 20, 50);
  
  doc.setFontSize(10);
  doc.text('e-doc.bg ООД', 20, 60);
  doc.text('ЕИК: 123456789', 20, 65);
  doc.text('Адрес: гр. София, ул. Примерна 1', 20, 70);
  
  // Данни за получателя
  doc.setFontSize(12);
  doc.text('ПОЛУЧАТЕЛ:', 120, 50);
  
  doc.setFontSize(10);
  doc.text(`Име: ${formData.fullName}`, 120, 60);
  doc.text(`ЕГН/ЕИК: ${formData.egn}`, 120, 65);
  doc.text(`Адрес: ${formData.address}`, 120, 70);
  
  // Таблица с услуги
  const tableColumn = ['№', 'Описание', 'Количество', 'Ед. цена', 'Сума'];
  const tableRows = [
    ['1', 'Абонамент e-doc.bg', '1', formData.income, formData.income]
  ];
  
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 90,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    foot: [['', '', '', 'Общо:', formData.income + ' лв.']],
    footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }
  });
  
  // Подписи
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  doc.text('Издател: ............................', 30, finalY);
  doc.text('Получател: ............................', 130, finalY);
};

/**
 * Генерира договор
 * @param doc PDF документ
 * @param formData Данни от формуляра
 */
const generateContract = (doc: jsPDF, formData: any): void => {
  // Заглавие на договора
  doc.setFontSize(12);
  doc.text('ДОГОВОР ЗА ПРЕДОСТАВЯНЕ НА УСЛУГИ', 105, 50, { align: 'center' });
  
  // Страни по договора
  doc.setFontSize(10);
  doc.text('Днес, ' + new Date().toLocaleDateString('bg-BG') + ' г., в гр. София, между:', 20, 60);
  
  doc.text('1. e-doc.bg ООД, ЕИК: 123456789, със седалище и адрес на управление: гр. София, ул. Примерна 1, представлявано от Управителя, наричано по-долу за краткост ИЗПЪЛНИТЕЛ, от една страна,', 20, 70);
  
  doc.text(`2. ${formData.fullName}, ЕГН: ${formData.egn}, с адрес: ${formData.address}, наричан/а по-долу за краткост ВЪЗЛОЖИТЕЛ, от друга страна,`, 20, 80);
  
  doc.text('се сключи настоящият договор за следното:', 20, 90);
  
  // Предмет на договора
  doc.setFontSize(11);
  doc.text('I. ПРЕДМЕТ НА ДОГОВОРА', 20, 100);
  
  doc.setFontSize(10);
  doc.text('Чл. 1. ВЪЗЛОЖИТЕЛЯТ възлага, а ИЗПЪЛНИТЕЛЯТ приема да предоставя услуги за генериране на електронни документи чрез платформата e-doc.bg за срок от 1 (една) година.', 20, 110);
  
  // Цена и начин на плащане
  doc.setFontSize(11);
  doc.text('II. ЦЕНА И НАЧИН НА ПЛАЩАНЕ', 20, 125);
  
  doc.setFontSize(10);
  doc.text(`Чл. 2. (1) ВЪЗЛОЖИТЕЛЯТ заплаща на ИЗПЪЛНИТЕЛЯ възнаграждение в размер на ${formData.income} лв. за периода ${formData.period}.`, 20, 135);
  doc.text('(2) Плащането се извършва по банков път по сметка на ИЗПЪЛНИТЕЛЯ или чрез системата за онлайн плащания на платформата.', 20, 145);
  
  // Подписи
  doc.text('ВЪЗЛОЖИТЕЛ: ............................', 30, 250);
  doc.text(`(${formData.fullName})`, 40, 255);
  
  doc.text('ИЗПЪЛНИТЕЛ: ............................', 130, 250);
  doc.text('(Управител)', 140, 255);
};

/**
 * Генерира заявление
 * @param doc PDF документ
 * @param formData Данни от формуляра
 */
const generateApplication = (doc: jsPDF, formData: any): void => {
  // Заглавие
  doc.setFontSize(12);
  doc.text('ДО', 20, 50);
  doc.text('ДИРЕКТОРА НА', 20, 55);
  doc.text('НАЦИОНАЛНА АГЕНЦИЯ ЗА ПРИХОДИТЕ', 20, 60);
  
  doc.setFontSize(14);
  doc.text('ЗАЯВЛЕНИЕ', 105, 75, { align: 'center' });
  
  // Данни за заявителя
  doc.setFontSize(10);
  doc.text('От:', 20, 85);
  doc.text(`${formData.fullName}`, 30, 85);
  doc.text(`ЕГН: ${formData.egn}`, 30, 90);
  doc.text(`Адрес: ${formData.address}`, 30, 95);
  doc.text(`Телефон: ${formData.phone}`, 30, 100);
  doc.text(`Имейл: ${formData.email}`, 30, 105);
  
  // Съдържание на заявлението
  doc.setFontSize(12);
  doc.text('УВАЖАЕМИ ГОСПОДИН/ГОСПОЖО ДИРЕКТОР,', 20, 120);
  
  doc.setFontSize(10);
  doc.text('Моля да ми бъде издадено удостоверение за липса/наличие на задължения по чл. 87, ал. 6 от ДОПК, което ми е необходимо за:', 20, 130);
  
  if (formData.additionalInfo) {
    doc.text(formData.additionalInfo, 25, 140);
  } else {
    doc.text('Служебна употреба', 25, 140);
  }
  
  // Дата и подпис
  doc.text(`Дата: ${new Date().toLocaleDateString('bg-BG')} г.`, 20, 200);
  doc.text('С уважение: ............................', 130, 200);
  doc.text(`(${formData.fullName})`, 140, 205);
};

/**
 * Генерира удостоверение
 * @param doc PDF документ
 * @param formData Данни от формуляра
 */
const generateCertificate = (doc: jsPDF, formData: any): void => {
  // Заглавие
  doc.setFontSize(14);
  doc.text('УДОСТОВЕРЕНИЕ', 105, 50, { align: 'center' });
  
  // Съдържание
  doc.setFontSize(10);
  doc.text('Националната агенция за приходите удостоверява, че:', 20, 70);
  
  doc.text(`Лице: ${formData.fullName}`, 20, 80);
  doc.text(`ЕГН/ЕИК: ${formData.egn}`, 20, 85);
  doc.text(`Адрес: ${formData.address}`, 20, 90);
  
  doc.text('Няма задължения по смисъла на чл. 87, ал. 6 от ДОПК.', 20, 105);
  
  doc.text('Настоящото удостоверение се издава, за да послужи пред:', 20, 120);
  
  if (formData.additionalInfo) {
    doc.text(formData.additionalInfo, 25, 130);
  } else {
    doc.text('По искане на лицето', 25, 130);
  }
  
  doc.text('Удостоверението е валидно до 30 дни от датата на издаване.', 20, 145);
  
  // Печат и подпис
  doc.text(`Дата: ${new Date().toLocaleDateString('bg-BG')} г.`, 20, 200);
  doc.text('Печат: (МП)', 20, 210);
  
  doc.text('Директор на ТД на НАП: ............................', 110, 200);
};

/**
 * Генерира общ документ
 * @param doc PDF документ
 * @param formData Данни от формуляра
 */
const generateGenericDocument = (doc: jsPDF, formData: any): void => {
  // Данни за лицето
  doc.setFontSize(12);
  doc.text('ДАННИ ЗА ЛИЦЕТО:', 20, 50);
  
  doc.setFontSize(10);
  doc.text(`Име: ${formData.fullName}`, 20, 60);
  doc.text(`ЕГН: ${formData.egn}`, 20, 65);
  doc.text(`Адрес: ${formData.address}`, 20, 70);
  doc.text(`Имейл: ${formData.email}`, 20, 75);
  doc.text(`Телефон: ${formData.phone}`, 20, 80);
  
  // Съдържание
  doc.setFontSize(12);
  doc.text('СЪДЪРЖАНИЕ:', 20, 95);
  
  doc.setFontSize(10);
  if (formData.additionalInfo) {
    doc.text(formData.additionalInfo, 20, 105);
  } else {
    doc.text('Документ с общо предназначение.', 20, 105);
  }
  
  // Подпис
  doc.text('Подпис: ............................', 130, 200);
  doc.text(`(${formData.fullName})`, 140, 205);
};
