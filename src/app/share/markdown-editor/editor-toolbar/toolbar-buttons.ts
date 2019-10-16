import { ToolbarButton } from './toolbar-button';

export const BUTTON_HEADINGS: ToolbarButton[] = [
  {
    icon: 'looks_one',
    tooltip: 'Nadpis 1',
    before: '#',
    after: '',
    onClick: () => true,
    position: 'left'
  },
  {
    icon: 'looks_two',
    tooltip: 'Nadpis 2',
    before: '##',
    after: '',
    onClick: () => true,
    position: 'left'
  },
  {
    icon: 'looks_3',
    tooltip: 'Nadpis 3',
    before: '###',
    after: '',
    onClick: () => true,
    position: 'left'
  },
  {
    icon: 'looks_4',
    tooltip: 'Nadpis 4',
    before: '####',
    after: '',
    onClick: () => true,
    position: 'left'
  },
  {
    icon: 'looks_5',
    tooltip: 'Nadpis 5',
    before: '#####',
    after: '',
    onClick: () => true,
    position: 'left'
  },
  {
    icon: 'looks_6',
    tooltip: 'Nadpis 6',
    before: '######',
    after: '',
    onClick: () => true,
    position: 'left'
  },
];

export const BUTTON_BOLD: ToolbarButton = {
  icon: 'format_bold',
  tooltip: 'Tučný',
  before: '**',
  after: '**',
  onClick: () => true,
  position: 'left'
};

export const BUTTON_ITALIC: ToolbarButton = {
  icon: 'format_italic',
  tooltip: 'Kurzíva',
  before: '*',
  after: '*',
  onClick: () => true,
  position: 'left'
};

export const BUTTON_UNDERLINE: ToolbarButton = {
  icon: 'format_underline',
  tooltip: 'Podrtžený',
  before: '',
  after: '',
  onClick: () => true,
  position: 'left'
};

export const BUTTON_STRIKETHROUGH: ToolbarButton = {
  icon: 'format_strikethrough',
  tooltip: 'Přeškrtnutý',
  before: '~~',
  after: '~~',
  onClick: () => true,
  position: 'left'
};

export const BUTTON_HIGHLIGHT: ToolbarButton = {
  icon: 'highlight',
  tooltip: 'Zvýraznit',
  before: '/',
  after: '\\',
  onClick: () => true,
  position: 'left'
};

export const BUTTON_SMALL: ToolbarButton = {
  icon: 'height',
  tooltip: 'Zmenšit',
  before: '\\',
  after: '/',
  onClick: () => true,
  position: 'left'
};

export const BUTTON_QUOTES: ToolbarButton = {
  icon: 'chevron_right',
  tooltip: 'Citace',
  before: '> ',
  after: '',
  onClick: () => true,
  position: 'left'
};

export const BUTTON_ORDERED_LIST: ToolbarButton = {
  icon: 'format_list_bulleted',
  tooltip: 'Neuspořádaný seznam',
  before: '- \n- \n- ',
  after: '',
  space: -6,
  onClick: () => true,
  position: 'left'
};

export const BUTTON_UNORDERED_LIST: ToolbarButton = {
  icon: 'format_list_numbered',
  tooltip: 'Uspořádaný seznam',
  before: '1. \n2. \n3. ',
  after: '',
  space: -8,
  onClick: () => true,
  position: 'left'
};

export const BUTTON_LINK: ToolbarButton = {
  icon: 'link',
  tooltip: 'Vložit odkaz',
  before: '[text]',
  after: '(odkaz)',
  space: -5,
  onClick: () => true,
  position: 'left'
};

export function buttonForImage(onClick: () => boolean): ToolbarButton {
  return {
    icon: 'insert_photo',
    tooltip: 'Vložit obrázek',
    before: '',
    after: '',
    onClick: onClick,
    position: 'left'
  }
}

// export const BUTTON_IMAGE: ToolbarButton = {
//   icon: 'insert_photo',
//   tooltip: 'Vložit obrázek',
//   before: '',
//   after: '',
//   onClick: () => false,
//   position: 'left'
// };

export function buttonForPreview(onClick: () => boolean): ToolbarButton {
  return {
    icon: 'pageview',
    tooltip: 'Náhled',
    before: '',
    after: '',
    onClick: onClick,
    position: 'right'
  };
}

// export const BUTTON_PREVIEW: ToolbarButton = {
//   icon: 'pageview',
//   tooltip: 'Náhled',
//   before: '',
//   after: '',
//   onClick: () => false,
//   position: 'right'
// };
