import "./App.css";
import { useCallback, useEffect, useState } from "react";
import TagView from "./TagView";

const initialState = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        { name: "child1-child1", data: "c1-c1 Hello" },
        { name: "child1-child2", data: "c1-c2 JS" },
      ],
    },
    { name: "child2", data: "c2 World" },
  ],
};

const App = () => {
  const [tree, setTree] = useState(initialState);
  const [isExport, setIsExport] = useState(false);

  const [items, setItems] = useState(initialState);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setItems(items);
    }
  }, [tree]);

 
  const handleExport = useCallback(() => {
    setItems(tree);
    setIsExport(true);
  }, [tree]);

  const handleAddChild = (parent) => {
    if (parent.name === "root") {
      parent.children.push({
        name: `child${parent.children.length + 1}`,
        data: "Data",
      });
      setTree({ ...tree });
    } else if (parent.children) {
      parent.children.push({
        name: `${parent.name}-child${parent.children.length + 1}`,
        data: "Data",
      });
      setTree({ ...tree });
    } else if (parent.data) {
      delete parent.data;
      parent.children = [{ name: `${parent.name}-child1`, data: "Data" }];
      setTree({ ...tree });
    }
   
  };

  const handleTagChange = (tag, newData) => {
    tag.data = newData;
    setTree({ ...tree });
  };

  return (
    <div>
      <TagView
        tag={tree}
        onAddChild={handleAddChild}
        onTagChange={handleTagChange}
      />
      <div className="btn-export">
        <button onClick={handleExport}>Export</button>
        {isExport && <div>{JSON.stringify(items)}</div>}
      </div>
    </div>
  );
};

export default App;
