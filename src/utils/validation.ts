export const isValidTaskTitle = (title: string) => {
    return title.length >= 3 && title.length <= 50;
  };
  
  export const isValidTaskDescription = (description: string) => {
    return description.length >= 10 && description.length <= 200;
  };
  