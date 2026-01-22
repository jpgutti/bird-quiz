import React, { useCallback, useEffect, useMemo, useState } from "react";
import birds from "../../aves_de_jacarei.json";

const Quiz = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<any>([]);
  const [step, setStep] = useState(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [tempBlock, setTempBlock] = useState(false);

  useEffect(() => {
    getBirdQuiz();
  }, [started]);

  const getBirdQuiz = () => {
    let bird_list = [];
    for (let i = 0; i < 20; i++) {
      const index = Math.floor(Math.random() * (birds.length - 1));
      const selected_bird = birds[index];
      const tax = selected_bird.nome_cientifico.split(" ")[0];
      console.log("tax", tax);
      const tax_similar = birds.find(
        (item) =>
          item.titulo !== selected_bird.titulo ||
          item.nome_cientifico.split(" ")[0] === tax,
      );
      console.log("similar", tax_similar);

      let options: string[] = [tax_similar!.titulo];

      for (let j = 0; j < 3; j++) {
        const j_index = Math.floor(Math.random() * (birds.length - 1));
        options.push(birds[j_index].titulo);
      }

      bird_list.push({ ...selected_bird, options });
    }

    setQuestions(bird_list);
  };

  const current_question = useMemo(() => questions[step], [questions]);
  const pos = useMemo(() => Math.floor(Math.random() * 4), [step]);
  console.log({ current_question });

  const handleSelection = useCallback(
    (evt: any) => {
      setTempBlock(true);
      console.log({ evt, current_question });

      const target = evt.target;
      if (target.value === current_question.titulo) {
        setCorrectCount(correctCount + 1);
      }
    },
    [current_question, correctCount],
  );

  return (
    <div
      id="quiz"
      className="flex center justify-center gap-2 flex-col w-4/5 m-auto pt-4"
    >
      <h1 className="text-3xl font-bold mb-4">Quiz!</h1>
      {started && questions ? (
        <div id="quiz_question flex center justify-center w-auto">
          {/* <audio
            className="w-auto h-auto m-auto mb-4"
            controls
            src={current_question.audio}
          ></audio> */}
          <div className="flex flex-col items-center h-auto w-auto">
            {current_question.options.map((item: any, index: number) => {
              if (index === pos) {
                return (
                  <div
                    className={`flex gap-2 relative h-12 w-80 p-2 mb-2 cursor-pointer border-emerald-600 rounded-md border hover:bg-pink-50 ${tempBlock ? "pointer-events-none bg-gray-700" : ""}`}
                  >
                    <input
                      onClick={handleSelection}
                      className="appearance-none w-100 cursor-pointer"
                      disabled={tempBlock}
                      key={current_question.titulo}
                      type="radio"
                      name="bird"
                      value={current_question.titulo}
                    />
                    <label
                      className="leading-6 text-center absolute left-0 top-0 translate-y-1/2 w-1/1 pointer-events-none font-bold text-sm"
                      htmlFor={current_question.titulo}
                    >
                      {current_question.titulo}
                    </label>
                  </div>
                );
              }

              return (
                <div
                  className={`flex gap-2 relative h-12 w-80 p-2 mb-2 cursor-pointer border-emerald-600 rounded-md border hover:bg-pink-50 ${tempBlock ? "pointer-events-none bg-gray-700" : ""} `}
                >
                  <input
                    onClick={handleSelection}
                    className="appearance-none w-100 cursor-pointer"
                    key={item}
                    disabled={tempBlock}
                    type="radio"
                    name="bird"
                    value={item}
                  />
                  <label
                    className="leading-6 text-center absolute left-0 top-0 translate-y-1/2 w-1/1 pointer-events-none font-bold text-sm"
                    htmlFor={item}
                  >
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      {correctCount}/20
      {!started ? (
        <button
          onClick={() => setStarted(true)}
          className="w-48 self-center bg-teal-700 hover:bg-teal-600 hover:border hover:border-teal-950 border border-transparent transition-all cursor-pointer p-2 rounded-md font-bold"
        >
          Iniciar Quiz
        </button>
      ) : null}
    </div>
  );
};

export default Quiz;
