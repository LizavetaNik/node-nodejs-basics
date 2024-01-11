const parseArgs = () => {
  try {
    const args = process.argv.slice(2);

    if (args.length % 2 !== 0) {
      throw new Error(
        "Invalid number of arguments. Each property should have a corresponding value."
      );
    }

    const parsedArgs = {};

    for (let i = 0; i < args.length; i += 2) {
      const propName = args[i].replace(/^--/, "");
      const propValue = args[i + 1];
      parsedArgs[propName] = propValue;
    }

    for (const [propName, propValue] of Object.entries(parsedArgs)) {
      console.log(`${propName} is ${propValue}`);
    }
  } catch (err) {
    console.error(err.message);
  }
};

parseArgs();
