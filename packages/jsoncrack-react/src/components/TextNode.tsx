import React from "react";
import type { NodeData } from "../types";
import styles from "./Node.module.css";
import { TextRenderer } from "./TextRenderer";
import { getTextColor } from "./nodeStyles";

type TextNodeProps = {
  node: NodeData;
  x: number;
  y: number;
  onNodeValueChange?: (path: JSONPath, newValue: any) => void;
};

const TextNodeBase = ({ node, x, y, onNodeValueChange }: TextNodeProps) => {
  const { text, width, height } = node;
  const firstRow = text[0];

  const [isEditing, setIsEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(String(firstRow?.value));

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      let newValue: any = editValue;
      if (typeof firstRow.value === "number") newValue = Number(editValue);
      else if (typeof firstRow.value === "boolean") newValue = editValue === "true";
      else if (firstRow.value === null) newValue = null;

      onNodeValueChange?.(node.path ?? [], newValue);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditValue(String(firstRow.value));
    }
  };

  if (!firstRow) return null;

  const value = firstRow.value;

  return (
    <foreignObject
      className={styles.foreignObject}
      data-id={`node-${node.id}`}
      width={width}
      height={height}
      x={0}
      y={0}
    >
      <span
        className={styles.textNodeWrapper}
        data-x={x}
        data-y={y}
        data-key={JSON.stringify(text)}
      >
        <span className={styles.key} style={{ color: getTextColor({ value, type: typeof value }) }}>
          {isEditing ? (
            <input
              autoFocus
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => setIsEditing(false)}
              onClick={e => e.stopPropagation()}
              style={{ background: "transparent", color: "inherit", border: "1px solid gray", outline: "none", width: "100%", maxWidth: "150px" }}
            />
          ) : (
            <span onDoubleClick={handleDoubleClick}>
              <TextRenderer>{value}</TextRenderer>
            </span>
          )}
        </span>
      </span>
    </foreignObject>
  );
};

const propsAreEqual = (prev: TextNodeProps, next: TextNodeProps) => {
  return prev.node.text === next.node.text && prev.node.width === next.node.width;
};

export const TextNode = React.memo(TextNodeBase, propsAreEqual);
