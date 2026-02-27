import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

interface TableRow {
  id: string;
  [key: string]: string | number | boolean;
}

interface DataTableProps {
  columns: TableColumn[];
  rows: TableRow[];
  title?: string;
}

export default function DataTable({ columns, rows, title }: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedRows = sortedRows.slice(0, 5);

  const getStatusBadgeColor = (status: string) => {
    if (status === 'active' || status === 'completed') return 'bg-red-100 text-red-700';
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700';
    if (status === 'failed') return 'bg-gray-100 text-gray-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {title && <div className="px-6 py-4 border-b border-gray-200"><h3 className="font-semibold text-gray-900">{title}</h3></div>}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-3 text-left">
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-2 font-semibold text-gray-700 text-sm hover:text-gray-900 transition-all"
                    >
                      {column.label}
                      {sortKey === column.key ? (
                        sortOrder === 'asc' ? (
                          <ChevronUp className="w-4 h-4 text-red-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-red-400" />
                        )
                      ) : (
                        <div className="w-4 h-4"></div>
                      )}
                    </button>
                  ) : (
                    <span className="font-semibold text-gray-700 text-sm">{column.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                {columns.map((column) => (
                  <td key={`${row.id}-${column.key}`} className="px-6 py-4">
                    {column.key === 'status' ? (
                      <span
                        className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${getStatusBadgeColor(
                          row[column.key] as string
                        )}`}
                      >
                        {row[column.key]}
                      </span>
                    ) : (
                      <span className="text-gray-700 text-sm">{row[column.key]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
        <span className="text-sm text-gray-600">
          Showing {paginatedRows.length} of {rows.length} results
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition-all">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
