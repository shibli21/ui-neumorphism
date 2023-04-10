import React from "react";
import { DefaultProps } from "../../assets";
import { Spacer } from "../../index";
import { getModuleClasses } from "../../util";
import styles from "./Table.module.css";

interface TableProps extends DefaultProps {
  id?: string;
  items?: any[];
  headers?: any[];
  noDataValue?: string;
  flat?: boolean;
  dense?: boolean;
  actions?: React.ReactNode;
  outlined?: boolean;
  noHeaders?: boolean;
  description?: React.ReactNode;
  inset?: boolean;
  children?: React.ReactNode;
}

const Table = ({
  items = [],
  headers = [],
  noDataValue = "No data found",
  flat,
  dense,
  actions,
  outlined,
  noHeaders,
  description,
  dark,
  inset,
  style,
  children,
  className,
}: TableProps) => {
  const getAlignment = (align: string) => {
    const alignValues = ["inherit", "center", "left", "right", "justify"];
    return alignValues.find((v) => v === align) || alignValues[0];
  };

  const getVerticalAlignment = (align: string) => {
    const alignValues = ["top", "middle", "bottom"];
    return alignValues.find((v) => v === align) || alignValues[1];
  };

  const getClasses = (elem: any, value: any = {}) => {
    const align = value.align;
    const verticalAlign = value.verticalAlign;
    switch (elem) {
      case "wrapper":
        return getModuleClasses(
          styles,
          `
            nu-table
            ${flat ? "nu-table--flat" : ""}
            ${inset ? "nu-table--inset" : ""}
            ${dense ? "nu-table--dense" : ""}
            nu-table--${dark ? "dark" : "light"}
            ${outlined ? "nu-table--outlined" : ""}
          `
        );
      case "toolbar":
        return getModuleClasses(styles, "nu-table--toolbar");
      case "table":
        return getModuleClasses(styles, "nu-table--table");
      case "thr":
        return getModuleClasses(styles, "nu-table--header-row");
      case "tr":
        return getModuleClasses(styles, "nu-table--row");
      case "th":
        return getModuleClasses(
          styles,
          `
            nu-table--header-cell
            nu-table--align-${getAlignment(align)}
          `
        );
      case "td":
        return getModuleClasses(
          styles,
          `
          nu-table--cell
          nu-table--align-${getAlignment(align)}
          nu-table--align-vertical-${getVerticalAlignment(verticalAlign)}
        `
        );
      case "tbody":
        return getModuleClasses(styles, "nu-table--body");
      case "thead":
        return getModuleClasses(styles, "nu-table--header");
      case "no-data":
        return getModuleClasses(
          styles,
          "nu-table--cell nu-table--align-center"
        );
      default:
        return "";
    }
  };

  const canSelfRender = !!headers || !!items;

  const tableToolbar = () => {
    return description || actions ? (
      <tr className={getClasses("toolbar")}>
        <td>
          {description}
          <Spacer />
          {actions}
        </td>
      </tr>
    ) : null;
  };

  const getTableHeadData = () => {
    return (
      <tr className={getClasses("thr")}>
        {headers.map((header, i) => (
          <th
            key={i}
            scope="col"
            className={`${getClasses("th", header)} ${header.className}`}
          >
            {header.text}
          </th>
        ))}
      </tr>
    );
  };

  const getTableRowData = () => {
    return items.map((item, i) => (
      <tr key={i} className={getClasses("tr")}>
        {headers.map((header, j) => (
          <td
            key={j}
            scope={j === 0 ? "row" : undefined}
            className={`${getClasses("td", header)} ${header.className}`}
          >
            {item[header.value]}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div style={style} className={`${getClasses("wrapper")} ${className}`}>
      {canSelfRender ? (
        <table className={getClasses("table")}>
          {noHeaders ? null : (
            <thead className={getClasses("thead")}>
              {tableToolbar()}
              {getTableHeadData()}
            </thead>
          )}
          <tbody className={getClasses("tbody")}>
            {!items.length ? (
              <tr>
                <td colSpan={headers.length} className={getClasses("no-data")}>
                  {noDataValue}
                </td>
              </tr>
            ) : (
              getTableRowData()
            )}
          </tbody>
        </table>
      ) : (
        children
      )}
    </div>
  );
};

Table.displayName = "NuTable";

export default Table;
