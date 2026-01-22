import React, { useEffect, useState } from "react";

interface DefaultSettings {
  custom_selection: string[] | [];
}

const DEFAULT_SETTINGS = {
  custom_selection: [],
};

const QuizSettings = () => {
  const [settings, setSettings] = useState<DefaultSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    // return setSettings(DEFAULT_SETTINGS);
  }, []);

  return <div id="QuizSettings"></div>;
};

export default QuizSettings;
