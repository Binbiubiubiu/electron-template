window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'chrome']) {
    replaceText(`${type}-version`, process.versions[type]!);
  }
  const msg = document.createElement('div');
  msg.innerHTML = JSON.stringify(process.versions);
  console.log(process.versions);
});
