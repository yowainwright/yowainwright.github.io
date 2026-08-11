import React, { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";

type PostTableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  "data-title"?: string;
};

type TableViewProps = {
  className: string;
  props: React.TableHTMLAttributes<HTMLTableElement>;
};

const TableView = ({ className, props }: TableViewProps) => (
  <table {...props} className={className} />
);

const getTitle = (title?: string) => {
  if (!title) return null;
  return <h3 className="post__table-title">{title}</h3>;
};

const stopPropagation = (event: React.MouseEvent) => event.stopPropagation();

const ExpandedTable = ({
  className,
  isOpen,
  onClose,
  props,
  title,
}: TableViewProps & {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="post__table-dialog" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="post__table-dialog-content" onClick={stopPropagation}>
        <div className="post__table-dialog-header">
          {title}
          <button
            type="button"
            className="post__table-dialog-close"
            aria-label="Close table"
            title="Close table"
            onClick={onClose}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="post__table-dialog-scroll">
          <div className="post__table-scroll">
            <TableView className={className} props={props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PostTable({ className, ...props }: PostTableProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { "data-title": tableTitle, ...tableProps } = props;
  const tableClassName = ["post__table", className].filter(Boolean).join(" ");
  const title = getTitle(tableTitle);
  const open = () => setIsExpanded(true);
  const close = () => setIsExpanded(false);

  useEffect(() => {
    if (!isExpanded) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isExpanded]);

  return (
    <>
      <div className="post__table-wrapper">
        <div className="post__table-chrome">
          {title}
          <button
            type="button"
            className="post__table-expand"
            aria-label="View larger table"
            title="View larger table"
            onClick={open}
          >
            <Maximize2 size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="post__table-scroll">
          <TableView className={tableClassName} props={tableProps} />
        </div>
      </div>
      <ExpandedTable
        className={tableClassName}
        isOpen={isExpanded}
        onClose={close}
        props={tableProps}
        title={title}
      />
    </>
  );
}
