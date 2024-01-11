const parseEnv = () => {
  try {
    const envPrefix = "RSS_";
    const filteredEnv = Object.entries(process.env)
      .filter(([key]) => key.startsWith(envPrefix))
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");

    if (filteredEnv) {
      console.log(
        `Environment variables with prefix ${envPrefix}: ${filteredEnv}`
      );
    } else {
      console.log(`No environment variables with prefix ${envPrefix} found.`);
    }
  } catch (err) {
    console.error(err.message);
  }
};

parseEnv();
