import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportResumeToPDF(
  element: HTMLElement,
  filename: string = 'resume.pdf'
): Promise<void> {
  const pages = element.querySelectorAll('.a4-page');
  
  if (pages.length === 0) {
    await exportSinglePage(element, filename);
    return;
  }

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i] as HTMLElement;
    
    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: page.offsetWidth,
      windowHeight: page.offsetHeight,
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(
      imgData,
      'JPEG',
      0,
      0,
      pdfWidth,
      pdfHeight
    );
  }

  pdf.save(filename);
}

async function exportSinglePage(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const imgData = canvas.toDataURL('image/jpeg', 1.0);
  const pdf = new jsPDF('p', 'mm', 'a4');

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(
    imgData,
    'JPEG',
    0,
    0,
    pdfWidth,
    pdfHeight
  );

  pdf.save(filename);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  if (!year || !month) return dateString;
  return `${year}年${month}月`;
}

export function formatDateRange(
  startDate: string,
  endDate: string,
  current: boolean
): string {
  const start = formatDate(startDate);
  if (current) {
    return `${start} - 至今`;
  }
  const end = formatDate(endDate);
  return `${start} - ${end || '至今'}`;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
