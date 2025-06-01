declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf';

  interface jsPDFAPI extends jsPDF {
    autoTable: (options: AutoTableOptions) => void;
    lastAutoTable: {
      finalY: number;
    };
  }

  interface AutoTableOptions {
    head?: any[][];
    body?: any[][];
    foot?: any[][];
    startY?: number;
    margin?: Margin;
    pageBreak?: 'auto' | 'avoid' | 'always';
    rowPageBreak?: 'auto' | 'avoid';
    tableWidth?: 'auto' | 'wrap' | number;
    showHead?: 'everyPage' | 'firstPage' | 'never';
    showFoot?: 'everyPage' | 'lastPage' | 'never';
    tableLineWidth?: number;
    tableLineColor?: number | [number, number, number];
    tableId?: string;
    theme?: 'striped' | 'grid' | 'plain';
    styles?: Styles;
    headStyles?: Styles;
    bodyStyles?: Styles;
    footStyles?: Styles;
    alternateRowStyles?: Styles;
    columnStyles?: {
      [key: number]: Styles;
    };
    didParseCell?: (data: CellHookData) => void;
    willDrawCell?: (data: CellHookData) => void;
    didDrawCell?: (data: CellHookData) => void;
    didDrawPage?: (data: HookData) => void;
  }

  interface Margin {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }

  interface Styles {
    font?: string;
    fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
    overflow?: 'linebreak' | 'ellipsize' | 'visible' | 'hidden';
    fillColor?: number | [number, number, number];
    textColor?: number | [number, number, number];
    halign?: 'left' | 'center' | 'right';
    valign?: 'top' | 'middle' | 'bottom';
    fontSize?: number;
    cellPadding?: number;
    lineColor?: number | [number, number, number];
    lineWidth?: number;
    cellWidth?: 'auto' | 'wrap' | number;
    minCellHeight?: number;
    minCellWidth?: number;
  }

  interface CellHookData {
    table: any;
    cell: any;
    row: any;
    column: any;
    section: 'head' | 'body' | 'foot';
    pageNumber: number;
    settings: any;
  }

  interface HookData {
    table: any;
    pageNumber: number;
    settings: any;
    doc: any;
    cursor: {
      x: number;
      y: number;
    };
  }
}

export {};
