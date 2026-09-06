export interface MetricCard {
  label: string;
  value: string;
  note?: string;
  noteColor?: string;
}

export interface ProgressItem {
  label: string;
  value: number;
}
export type ProgressPanelProps = {
  title: string;
  items: ProgressItem[];
};
