export const formatCode = (code, language = 'jsx') => {
  // Basic code formatting
  let formatted = code
    .replace(/;\n/g, ';\n')
    .replace(/\{\n/g, '{ ')
    .replace(/\n\}/g, ' }');
  
  return formatted;
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

export const downloadAsFile = (content, filename) => {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
