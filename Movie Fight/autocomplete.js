// don't forget to link <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.css" />

const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
  //initialize html dropdown-menu elements.
  root.innerHTML = `
  <label><b>Search</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  //to update the dropdown menu.
  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    //to check if the results array is empty return nothing.
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    resultsWrapper.innerHTML = ""; // to empty the dropdown menu in order to add the next searched results.
    dropdown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      //to detect when dropdown menu is clicked.
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });
      resultsWrapper.appendChild(option);
    }
  };

  //to attach onInput function to input element and add debounce to it.
  input.addEventListener("input", debounce(onInput, 500));

  //automatically closing the dropdown menu.
  document.addEventListener("click", (event) => {
    //to check if the clicked target contain in root element or not.
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
