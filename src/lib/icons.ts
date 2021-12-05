import icons from '../../static/icons/icons.json';

export type Icon = {
  name: string;
  path: string;
  svg: string;
};

const iconMap = new Map<string, Icon>();

icons.forEach((icon) => {
  let name = icon.name;

  let count = 2;
  while (iconMap.has(name)) {
    name = name + count;
    count++;
  }

  iconMap.set(name, icon);
});

export function getIcon(name: string): Icon {
  return iconMap.get(name);
}

export function getAllIcons(): Icon[] {
  return Array.from(iconMap.values());
}
