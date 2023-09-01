import React, { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

let Quill;

if (typeof window !== "undefined") {
  Quill = require("quill");
  require("quill/dist/quill.snow.css");
}

const HTMLArea = (props) => {
  const title = props.title || "Modifier la première description";
  const value = props.value || "";
  const max = props.max || 150;
  const setDescription = props.setDescription || (() => {});

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [hasReachedMax, setHasReachedMax] = useState(false);

  useEffect(() => {
    if (!Quill) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: [["bold", "italic"], ["clean"]],
      },
    });

    // Initialiser Quill avec le contenu après sa création
    const sanitizedHTML = DOMPurify.sanitize(value);
    quillRef.current.clipboard.dangerouslyPasteHTML(sanitizedHTML);

    const handleTextChange = () => {
      const contentText = quillRef.current.getText();

      if (contentText.length > max) {
        setHasReachedMax(true);
        quillRef.current.setText(contentText.substring(0, max));
      } else {
        setHasReachedMax(false);
      }

      const sanitizedOutput = DOMPurify.sanitize(
        quillRef.current.root.innerHTML
      );
      setDescription(sanitizedOutput);
    };

    quillRef.current.on("text-change", handleTextChange);

    return () => {
      quillRef.current.off("text-change", handleTextChange);
    };
  }, []);

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
