document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('fileInput');
  const fileType = document.getElementById('fileType');
  const availableFields = document.getElementById('availableFields');
  const displayedFields = document.getElementById('displayedFields');
  const addButton = document.getElementById('addField');
  const removeButton = document.getElementById('removeField');
  const productTable = document.getElementById('productTable');
  const tableBody = document.getElementById('tableBody');
  const cancelButton = document.getElementById('cancelButton');
  const nextButton = document.getElementById('nextButton');

  let selectedFields = [];

  fileInput.addEventListener('change', handleFileUpload);
  addButton.addEventListener('click', addToDisplay);
  removeButton.addEventListener('click', removeFromDisplay);
  cancelButton.addEventListener('click', cancelProcess);
  nextButton.addEventListener('click', goToNextStep);

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      const contents = e.target.result;
      if (fileType.value === 'csv') {
        // CSV parsing logic
        // For example:
        // const csvData = contents.split('\n').map(row => row.split(','));
        // const headers = csvData[0];
        // populateAvailableFields(headers);
      } else if (fileType.value === 'json') {
        // JSON parsing logic
        // For example:
        // const jsonData = JSON.parse(contents);
        // const fields = Object.keys(jsonData[0]);
        populateAvailableFields(['Subcategory', 'Title', 'Price', 'Popularity']);
      }
    };

    reader.readAsText(file);
  }

  function populateAvailableFields(fields) {
    availableFields.innerHTML = '';
    fields.forEach(field => {
      const option = document.createElement('option');
      option.value = field;
      option.textContent = field;
      availableFields.appendChild(option);
    });
  }

  function addToDisplay() {
    const selected = [...availableFields.selectedOptions].map(option => option.value);
    selectedFields = [...new Set(selectedFields.concat(selected.filter(option => !selectedFields.includes(option))))];
    updateDisplayedFields();
  }

  function removeFromDisplay() {
    const selected = [...displayedFields.selectedOptions].map(option => option.value);
    selectedFields = selectedFields.filter(option => !selected.includes(option));
    updateDisplayedFields();
  }

  function updateDisplayedFields() {
    displayedFields.innerHTML = '';
    selectedFields.forEach(option => {
      const optionElem = document.createElement('option');
      optionElem.value = option;
      optionElem.textContent = option;
      displayedFields.appendChild(optionElem);
    });

    displayProducts();
  }

  function displayProducts() {
    // Simulated products data
    const products = [
      { 'Product ID': '1', 'Subcategory': 'Category A', 'Title': 'Product 1', 'Price': '$19.99', 'Popularity': 'High' },
      { 'Product ID': '2', 'Subcategory': 'Category B', 'Title': 'Product 2', 'Price': '$29.99', 'Popularity': 'Medium' },
      { 'Product ID': '3', 'Subcategory': 'Category C', 'Title': 'Product 3', 'Price': '$39.99', 'Popularity': 'Low' },
      // Add more product data here as needed
    ];

    // Clear table
    tableBody.innerHTML = '';

    // Display products based on selected fields
    products.forEach(product => {
      const tr = document.createElement('tr');
      selectedFields.forEach(field => {
        const td = document.createElement('td');
        td.textContent = product[field];
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  }

  function cancelProcess() {
    selectedFields = [];
    updateDisplayedFields();
  }

  function goToNextStep() {
    // Logic for navigating to the next step
    // For instance, display another section of the application
  }
});
