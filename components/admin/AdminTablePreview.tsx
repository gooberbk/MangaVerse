import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type TableColumn = {
  key: string;
  label: string;
  width?: string;
};

type TableData = Record<string, string | number | ReactNode>;

type AdminTablePreviewProps = {
  columns: TableColumn[];
  data: TableData[];
  className?: string;
};

export function AdminTablePreview({
  columns,
  data,
  className,
}: AdminTablePreviewProps) {
  return (
    <div className={cn("glass rounded-2xl shadow-lg shadow-black/20 overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted",
                    column.width,
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((row, index) => (
              <tr
                key={index}
                className="transition-colors hover:bg-white/5"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-sm text-white"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
