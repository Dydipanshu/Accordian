import React, { useState } from "react";
import data from "./data";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultipleSelection, setEnableMultipleSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (getCurrentId) => {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };

  const handleMultipleSelection = (getCurrentId) => {
    // setSelected(getCurrentId === selected ? : getCurrentId)
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);
    console.log(findIndexOfCurrentId);

    if (findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId);
    else cpyMultiple.splice(findIndexOfCurrentId, 1);

    setMultiple(cpyMultiple);
  };

  return (
    <div className="container mx-auto px-4">
      <button
        onClick={() => setEnableMultipleSelection(!enableMultipleSelection)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md mb-4"
      >
        Enable Multi Selection
      </button>
      <div>
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div key={dataItem.id} className="mb-4">
              <div
                onClick={() =>
                  enableMultipleSelection
                    ? handleMultipleSelection(dataItem.id)
                    : handleSingleSelection(dataItem.id)
                }
                className="bg-gray-100 py-2 px-4 flex justify-between items-center cursor-pointer rounded-md shadow"
              >
                <h3 className="text-lg font-semibold">{dataItem.question}</h3>
                <span className="text-gray-500 text-xl">
                  {selected === dataItem.id ? "-" : "+"}
                </span>
              </div>
              {enableMultipleSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="bg-white p-4 rounded-md shadow mt-2">
                      {dataItem.answer}
                    </div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
}
