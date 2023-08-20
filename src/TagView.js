import React, { useState } from "react";
import "./App.css";
// TagView component
const TagView = ({ tag, onAddChild, onTagChange }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="tag">
      <div className="tag-header">
        <div>
          <button className="collapse-button" onClick={handleCollapseToggle}>
            {collapsed ? ">" : "v"}
          </button>
          <span className="tag-name">{tag.name}</span>
        </div>
        <button onClick={() => onAddChild(tag)}>Add Child</button>
      </div>
      {!collapsed && (
        <div className="tag-content">
          {tag.data !== undefined && (
            <div className="data">
              <span>Data</span>
              <input
              type="text"
              value={tag.data}
              onChange={(e) => onTagChange(tag, e.target.value)}
            />
            </div>
          )}
          {/* {tag.children && (
            <button onClick={() => onAddChild(tag)}>Add Child</button>
          )} */}
          {tag.children &&
            tag.children.map((child) => (
              <TagView
                key={child.name}
                tag={child}
                onAddChild={onAddChild}
                onTagChange={onTagChange}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default TagView;
