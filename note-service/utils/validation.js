// import json
const objects = require('./form.json')

// validate function.
const validate = (data, instance) => {
  // get a specific instance field.
  const fields = objects[instance]['fields']

  // loop the field
  for (const [key, value] of Object.entries(data)) {
    const field = fields.find(field => {
      return field['name'] === key
    })

    if (!field || !value || typeof value !== field['type']) return false
  }

  return true
}

module.exports = validate
