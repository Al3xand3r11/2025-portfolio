import type { ReactNode } from "react";
import styles from "../dashboard.module.css";
import EmptyState from "./EmptyState";

export type Column<Row> = {
  header: string;
  cell: (row: Row) => ReactNode;
};

export default function DataTable<Row>({
  columns,
  rows,
  rowKey,
  empty = "Nothing here.",
}: {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  empty?: string;
}) {
  if (rows.length === 0) return <EmptyState message={empty} />;

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.header} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((column) => (
                <td key={column.header}>{column.cell(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
