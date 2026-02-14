export interface MermaidDialogProps {
  isOpen: boolean;
  onClose: () => void;
  svgContent: string;
  title?: string;
}

export interface MermaidChartProps {
  svgContent: string;
  onClick: () => void;
}

export interface MermaidContainerProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface UseMermaidChartsReturn {
  dialogState: {
    isOpen: boolean;
    svgContent: string;
    title?: string;
  };
  closeDialog: () => void;
  processMermaidCharts: () => void;
  cleanup: () => void;
}
