import { FaPlusCircle } from "react-icons/fa";
import "./table.css";

const Table = ({ onClickAddBtn, headerData, rowData }: ITableProps) => {
  return (
    <div className="table">
      <div className="table__main">
        <table>
          {headerData && headerData.length && rowData && rowData().length ? (
            <>
              <thead>
                <tr>
                  {headerData.map((item) => {
                    return <th>{item}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {rowData().map((item) => {
                  return (
                    <tr>
                      {item.map((cellData) => {
                        return (
                          <td>
                            <p>{cellData}</p>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </>
          ) : (
            <p>No Data Available...</p>
          )}
        </table>
      </div>
      <span className="table__add-btn">
        <FaPlusCircle onClick={onClickAddBtn} />
      </span>
    </div>
  );
};

export { Table };
