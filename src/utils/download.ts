export function download(file: File) {
  const url = window.URL.createObjectURL(file);

  const element = document.createElement("a");
  element.setAttribute("href", url);
  element.setAttribute("download", file.name);
  element.click();

  document.body.removeChild(element);
}
