export function formatString(template: string, object: object): string {
    return template.replace(/\<(\w+(\.\w+)*)\>/gi, (match, key) => {
      const keys = key.split(".");
      let value = object;
      for (const k of keys) {
        if (k in value) {
          value = value[k];
        } else {
          return match;
        }
      }
      return formatString(String(value), object);
    });
  }
  
  export function formatObjectEntries<O extends object = object>(object: O): O {
    const formatValue = (value: any): any => {
      if (typeof value === "string") {
        return value.replace(/\<(\w+(\.\w+)*)\>/gi, (match, key) => {
          const keys = key.split(".");
          let tempValue = object;
          for (const k of keys) {
            if (k in tempValue) {
              tempValue = tempValue[k];
            } else {
              return match;
            }
          }
          return formatValue(tempValue);
        });
      } else if (Array.isArray(value)) {
        return value.map((item: any) => formatValue(item));
      } else if (typeof value === "object" && value !== null) {
        const formattedObject: any = {};
        for (const prop in value) {
          formattedObject[prop] = formatValue(value[prop]);
        }
        return formattedObject;
      }
      return value;
    };
  
    const formattedObject: any = {};
    for (const key in object) {
      const formattedValue = formatValue(object[key]);
      formattedObject[key] = formattedValue;
    }
    return formattedObject;
  }