const handleVisibility = (selector, class2Toggle) => {
  let element = document.querySelector(selector);
  return () => {
    element.classList.toggle(class2Toggle);
  };
};

export default handleVisibility;
