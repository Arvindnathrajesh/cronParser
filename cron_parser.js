function parseCron(cronString) {
    const fields = cronString.split(' ');
  
    const fieldNames = ['minute', 'hour', 'day of month', 'month', 'day of week'];
    const expandedFields = [];
  
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (field === '*') {
        let length = getUpperLimit(i)
        let values = []
        for(let j=1;j<=length;j++){
            values.push(j)
        }
        expandedFields.push(values)
      } else {
        expandedFields.push(parseField(field, i));
      }
    }
  
    formatOutput(fieldNames, expandedFields);
  }
  
  function getUpperLimit(fieldIndex) {
    if (fieldIndex === 0) {
      return 60; // minute
    } else if (fieldIndex === 1) {
      return 24; // hour
    } else if (fieldIndex === 2) {
      return 31; // day of month
    } else if (fieldIndex === 3) {
      return 12; // month
    } else if (fieldIndex === 4) {
      return 7; // day of week
    }
    return 0;
  }
  
  function parseField(field, fieldIndex) {
    const values = [];
  
    if (field.includes(',')) {
      const parts = field.split(',');
      for (const part of parts) {
        values.push(part);
      }
    } else if (field.includes('-')) {
      const [start, end] = field.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        values.push(i);
      }
    } else if (field.includes('/')) {
      const [_, step] = field.split('/').map(Number);
      for (let i = 0; i < getUpperLimit(fieldIndex); i += step) {
        values.push(i);
      }
    } else {
      values.push(Number(field));
    }
  
    return values;
  }
  
  function formatOutput(fieldNames, expandedFields) {
    for (let i = 0; i < fieldNames.length; i++) {
      const name = fieldNames[i];
      const values = expandedFields[i];
      console.log(`${name.padEnd(14)}`, values.join(' '));
    }
  }
  
  function main() {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
      console.log('Please provide correct arguments');
      return;
    }
  
    const cronString = args[0];
    parseCron(cronString);
  }
  
  main();
  