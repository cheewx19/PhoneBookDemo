export interface Column {
    label: string
    align: "left" | "center" | "right" | "justify" | "inherit" | undefined
    minWidth?: number
  }