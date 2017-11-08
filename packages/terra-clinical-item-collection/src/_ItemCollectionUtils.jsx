const maxDisplays = 8;

const KEYCODES = {
  ENTER: 13,
  SPACE: 32,
};

/**
 * This function ensures the correct elements are provided to create a consistent item view layout. To handle a
 * potential missing required accessory element, a boolean indicator is provided to single accessory space is needed.
 *
 * @ param {childElement} obj - The react child props that will compose an item view list item.
 * @ param {requiredElements} obj - The elements expected to be displayed.
 */
function addAnyMissingListElements(childElements, requiredElements) {
  const { startAccessoryRequired, displaysRequired, commentRequired, endAccessoryRequired } = requiredElements;
  const { startAccessory, children, comment, endAccessory } = childElements;
  const itemViewPieces = { startAccessory: null, children: null, comment: null, endAccessory: null };

  itemViewPieces.startAccessory = startAccessoryRequired ? startAccessory : null;
  itemViewPieces.hasStartAccessory = startAccessoryRequired;

  let displayContent = [];
  if (displaysRequired && displaysRequired > 0) {
    const numberOfDisplays = displaysRequired < maxDisplays ? displaysRequired : maxDisplays;
    if (children) {
      // If one child element is provided, children is an obj, not an array
      displayContent = children.length ? children.slice(0, numberOfDisplays) : children;
    }
  }
  itemViewPieces.children = displayContent;

  itemViewPieces.comment = commentRequired ? comment : null;
  itemViewPieces.endAccessory = endAccessoryRequired ? endAccessory : null;
  itemViewPieces.hasEndAccessory = endAccessoryRequired;

  return itemViewPieces;
}

/**
 * This function ensures the correct elements are provided to create a consistent table row layout. If a required
 * element is missing, an empty div is provided as cell content.
 *
 * @ param {childElement} obj - The react child props that will compose a table row.
 * @ param {requiredElements} obj - The elements expected to be displayed.
 */
function addAnyMissingTableElements(childElements, requiredElements) {
  const { startAccessoryRequired, displaysRequired, commentRequired, endAccessoryRequired } = requiredElements;
  const { startAccessory, children, comment, endAccessory } = childElements;
  const tableRowPieces = { startAccessory: null, children: null, comment: null, endAccessory: null };

  if (startAccessoryRequired) {
    tableRowPieces.startAccessory = ' ';
    if (startAccessory) {
      tableRowPieces.startAccessory = startAccessory;
    }
  }

  let displayContent = [];
  if (displaysRequired) {
    const numberOfDisplays = displaysRequired < maxDisplays ? displaysRequired : maxDisplays;
    if (children) {
      displayContent = children.length ? children.slice(0, numberOfDisplays) : [children];
    }
    while (displayContent.length < numberOfDisplays) {
      displayContent.push(' ');
    }
  }
  tableRowPieces.children = displayContent;

  if (commentRequired) {
    tableRowPieces.comment = ' ';
    if (comment) {
      tableRowPieces.comment = comment;
    }
  }

  if (endAccessoryRequired) {
    tableRowPieces.endAccessory = ' ';
    if (endAccessory) {
      tableRowPieces.endAccessory = endAccessory;
    }
  }

  return tableRowPieces;
}

const ItemCollectionUtils = {
  addAnyMissingListElements,
  addAnyMissingTableElements,
  KEYCODES,
};

export default ItemCollectionUtils;
