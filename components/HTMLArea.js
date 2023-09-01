import React, { useEffect, useRef, useState } from "react";

let Quill;

if (typeof window !== "undefined") {
  Quill = require("quill");
  require("quill/dist/quill.snow.css");
}

const HTMLArea = (props) => {
  const title = props.title || "Modifier la première description";
  const value = props.value || ""; // Use a default value if none is provided
  const max = props.max || 150;

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [hasReachedMax, setHasReachedMax] = useState(false); // New state for tracking if max characters reached

  useEffect(() => {
    if (!Quill) return; // Ensure Quill is loaded

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic"], // Boutons pour "bold" et "italic"
          ["clean"],
        ],
      },
    });

    if (value) {
      quillRef.current.clipboard.dangerouslyPasteHTML(value);
    }

    const handleTextChange = () => {
      const contentText = quillRef.current.getText();

      if (contentText.length > max) {
        setHasReachedMax(true);
        quillRef.current.off("text-change", handleTextChange);
        quillRef.current.setText(contentText.substring(0, max));
        quillRef.current.on("text-change", handleTextChange);
      } else {
        setHasReachedMax(false);
      }

      props.onChange(quillRef.current.root.innerHTML);
    };

    quillRef.current.on("text-change", handleTextChange);
  }, [value]);

  return (
    <div className="mt-5">
      <label
        htmlFor="comment"
        className="block text-sm leading-6 text-gray-700"
      >
        {title}
      </label>
      <div className="mt-2"></div>
      <div ref={editorRef} style={{ minHeight: "100px" }}></div>
      <span className="mt-2 block font-light text-xs text-red-500">
        {hasReachedMax && `Nombre de caractère maximum ${max}.`}
      </span>
    </div>
  );
};

export default HTMLArea;
