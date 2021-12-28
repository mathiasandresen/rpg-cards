export default interface PageLayout {
  paperSize: {
    width: number;
    height: number;
  };
  cardSize: {
    width: number;
    height: number;
  };
  adjust: {
    x?: number;
    y?: number;
  };
  cardBackBorder: number;
}
