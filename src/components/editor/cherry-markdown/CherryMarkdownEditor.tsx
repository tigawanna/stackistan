import { useSSRFriendlyTheme, useWindowTheme } from "@/lib/rakkas/theme";
import { copytoClipBoard } from "@/utils/helpers/copy-to-clipboard";
import { useWindowSize } from "@/utils/hooks/useWindowSize";
import Cherry from "cherry-markdown/dist/cherry-markdown.core";
import {
  Copy,
  FileEdit,
  GalleryThumbnails,
  Printer,
  SplitSquareHorizontal,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  cautionBlock,
  noteBlock,
  tipBlock,
  warningBlock,
} from "./custom/blocks";

interface CherryMarkdownEditorProps {
  input_string: string;
  custom_element?: (cherry: Cherry | null) => JSX.Element;
  container_classname?: string;
  setContent?: (html: string, text: string) => void;
}

export default function CherryMarkdownEditor({
  input_string,
  container_classname,
  custom_element,
  setContent,
}: CherryMarkdownEditorProps) {
  const cherry = useRef<Cherry | null>(null);
  const { theme } = useSSRFriendlyTheme();
  console.log({ theme });
  const { width } = useWindowSize();

  useEffect(() => {
    if (!cherry.current) {
      cherry.current = new Cherry({
        id: "cherry-markdown",
        value: "",
        locale: "en_US",
        editor: {
          // defaultModel The default mode of the editor after initialization. There are three modes: 1. Double column edit preview mode; 2. Pure editing mode; 3. Preview mode
          // edit&preview: Double column edit preview mode
          // editOnly: Pure editing mode (without preview, you can switch to double column or preview mode through toolbar)
          // previewOnly: Preview mode (there is no edit box, the toolbar only displays the "return to edit" button, which can be switched to edit mode through the toolbar)
          defaultModel: width > 850 ? "edit&preview" : "editOnly",
        },

        // @ts-expect-error
        callback: {
          afterChange: (text, html) => {
            if (setContent) {
              setContent(html, text);
            }
          },
          beforeImageMounted: (srcProp: string, src: string) => {
            return {
              srcProp,
              src,
            };
          },
        },

        theme: [
          { className: "default", label: "default" },
          { className: "dark", label: "dark" },
          { className: "light", label: "light" },
          { className: "green", label: "green" },
          { className: "red", label: "red" },
          { className: "violet", label: "violet" },
          { className: "blue", label: "blue" },
        ],
        toolbars: {
          customMenu: {
            warn: warningBlock,
            tip: tipBlock,
            note: noteBlock,
            caution: cautionBlock,
          },
          toolbar: [
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "|",
            "color",
            "justify",
            "header",
            "ruby",
            "detail",
            "|",
            "list",
            {
              insert: [
                "image",
                "audio",
                "video",
                "link",
                "hr",
                "br",
                "code",
                "formula",
                "toc",
                "table",
                "drawIo",
              ],
            },
            "settings",
            "codeTheme",
            "|",

            // "panel",
          ],
          toolbarRight: ["fullScreen", "export"],
          float: ["bold", "size", "color", "table", "code"],
          bubble: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "sub",
            "sup",
            "ruby",
            "|",
            "color",
            "size",
          ],
          sidebar: [
            "copy",
            "theme",
            "toc",
            "togglePreview",
            "mobilePreview",
            "warn",
            "note",
            "tip",
            "caution",
          ],
          theme: theme === "dark" ? "dark" : "light",
        },
      });
    }
  }, []);

  useEffect(() => {
    const html_as_markdwon = cherry.current?.engine.makeMarkdown(input_string);
    if (html_as_markdwon) {
      cherry.current?.setMarkdown(html_as_markdwon);
      // cherry.current?.setMarkdown(html_as_markdwon);
    }
  }, [cherry.current, input_string]);

  useEffect(() => {
    cherry.current?.switchModel(width > 850 ? "edit&preview" : "editOnly");
  }, [width]);

  function exportMarkdown() {
    cherry.current?.export("pdf", "resume.md");
  }

  const editor_width = width > 650 ? width - 120 : width - 20;

  return (
    <div
      className={twMerge(
        "w-full h-[50vh]  flex flex-col items-center justify-between gap- relative ",
        container_classname,
      )}
    >
      <div className="flex gap-3 items-center justify-between absolute -top-8 left-[5%] right-[5%] px-2 z-50">
        {custom_element && custom_element(cherry?.current)}
      </div>
      <div
        style={{ width: editor_width }}
        id="cherry-markdown"
        className="w-full h-full min-h-[40vh] "
      />
    </div>
  );
}
