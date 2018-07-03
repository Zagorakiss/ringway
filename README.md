## API

* write - writes an element or an array of elements before overwriting and returns the number of elements written to the buffer
* read - returns a single buffered int in FIFO order, and removes the element
from the buffer
* empty - clears buffer

## Config
* debug - if the property has true value, messages with additional information will be written in console
* schema - determines if data will be validated by provided schema with Joi API. Not valid elements won't be written in buffer
