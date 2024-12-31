declare global {
  // ITableProps
  interface ITableProps {
    onClickAddBtn: () => void;
    headerData: Array<string>;
    rowData: () => Array<Array<string>>;
  }
}

export {};
