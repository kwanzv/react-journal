import * as React from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import ReactMde from "react-mde";
import Showdown from "showdown";

export default function Editor({ currentNote, updateNote }) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <ReactMde
      value={currentNote.body}
      onChange={updateNote}
      minEditorHeight={90}
      heightUnits="vh"
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={(markdown) =>
        Promise.resolve(converter.makeHtml(markdown))
      }
      childProps={{
        writeButton: {
          tabIndex: -1,
        },
      }}
    />
  );
}
