const portItemSchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
    },
    isDone: {
      type: 'boolean',
      default: false
    }
  },
};

module.exports = portItemSchema;