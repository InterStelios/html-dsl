/**
 * initialise - Initialiser method for creating DOM nodes.
 *
 * @param  {String} type         The type of DOM node to create.
 * @param  {String|Array|Object} attributes The attributes of DOM node.
 * @param  {String|Array|Object} children The children of DOM node.
 * @return {Function}            DOM node.
 */
const initialise = (type = 'div', [attributes = {}, children = null]) => {
  children = Array.isArray(children) ? children : [children]

  // create an empty DOM node.
  const node = document.createElement(type)

  debugger
  // add attributes.
  Object.keys(attributes).forEach(name => node.setAttribute(name, attributes[name]))

  // loop over all children and append them to the newly created DOM node.
  return children.reduce((prev, cur) => {
    if (cur != null) {
      if (typeof cur === 'string' || typeof cur === 'number') {
        const textNode = document.createTextNode(cur + '')
        prev.appendChild(textNode)
        return prev
      }

      // 'cur' in this case is an HTML (DOM like) object
      if (typeof cur === 'object') {
        prev.appendChild(cur)
        return prev
      }
    }
    return prev
  }, node)
}

/**
 * createNode - Creates a simple DOM node.
 *
 * @param  {String} type    The type of DOM node to create.
 * @param  [Object] options Any configurable options
 * @return {Function}       A function which can be used to populate the generated DOM node.
 */
const createNode = (type, options) => content =>
  // Example methods for extending the DOM element (_node). These give a nice DSL for manipulating the DOM directly.
  // For example you could do: DOM.tr().$text('tr sample').append(td('td sample'))... etc.
  Object.assign(initialise(type, content, options), {
    $text(textContent) {
      _node.textContent(textContent)
      return _node
    },

    $append(node) {
      return _node.appendChild(node)
    },

    // useful method for chaining.
    $appendTo(node) {
      _node.appendChild(node)
      return _node
    }
  })

export default new Proxy({}, {
  get(attrs, type) {
    return options => createNode(type, options)
  }
})
