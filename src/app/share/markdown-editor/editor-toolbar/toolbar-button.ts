export interface ToolbarButton {
  icon: string;
  tooltip: string;
  before?: string;
  after?: string;
  space?: number;
  selection?: number;
  onClick?: () => boolean;
  position: 'left' | 'right';
}
