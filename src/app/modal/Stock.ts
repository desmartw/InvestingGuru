export interface Stock {
  // UID is id of user that added stock
  uid?:any;
  // ID is unique id for stock
  id?: any;
  // Ticker is letters to ID stock i.e. APPL, TSLA, etc
  ticker: string;
  // Price is current price for stock will need to use api
  price: string;
  // move is percent moved in a dya
  move: string;
  // date added is when user added stock to watchlist
  dateAdded: any;
  // quantity is the amount of stock owned
  quantity: string;
}
