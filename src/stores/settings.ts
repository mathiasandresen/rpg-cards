export default interface Settings {
  convertFirstSubtitle: boolean;
  convertDndSpellblock: boolean;
}

export const defaultSettings: Settings = {
  convertDndSpellblock: false,
  convertFirstSubtitle: false
};
