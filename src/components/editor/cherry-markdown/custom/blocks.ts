import Cherry from "cherry-markdown";

export const warningBlock = Cherry.createMenuHook("warning", {
  iconName: "warn",
  onClick: function (selection: any) {
    return `> [!WARNING]
    ${selection}`;
  },
});
export const noteBlock = Cherry.createMenuHook("note", {
  iconName: "ok",
  onClick: function (selection: any) {
    return `> [!NOTE]
    ${selection}`;
  },
  
});
export const tipBlock = Cherry.createMenuHook("tip", {
  iconName: "tips",
  onClick: function (selection: any) {
    return `> [!TIP]
    ${selection}`;
  },
});
export const cautionBlock = Cherry.createMenuHook("caution", {
  iconName: "mistake",
  onClick: function (selection: any) {
    return `> [!CAUTION]
    ${selection}`;
  },
});
