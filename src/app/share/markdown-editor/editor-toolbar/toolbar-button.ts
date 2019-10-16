export interface ToolbarButton {
  icon: string;
  tooltip: string;
  before?: string;
  after?: string;
  space?: number;
  selection?: number;
  onClick?: () => boolean|Promise<boolean>;
  position: 'left' | 'right';
}
