import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getQuiz, QUIZ_QUESTIONS_LENGTH } from "../../utils/getQuiz";

const Quiz = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<any>([]);
  const [step, setStep] = useState(0);
  const [respondida, setRespondida] = useState(false);
  const [choice, setChoice] = useState<any>(null);

  useEffect(() => {
    const quiz = getQuiz();
    setQuestions(quiz);
  }, [started]);

  const handleStepUpdate = useCallback(() => {
    if (step >= 0 && step < QUIZ_QUESTIONS_LENGTH) {
      setStep(step + 1);
      setRespondida(false);
    }
  }, [step]);

  const current_question = useMemo(() => questions[step], [questions, step]);
  const pos = useMemo(() => Math.floor(Math.random() * 4), [step]);
  console.log({ current_question });

  const handleSelection = useCallback((evt: any, item: any) => {
    setRespondida(true);

    const target = evt.target;
    if (target.value === item.titulo) {
      setChoice(item);
    }
  }, []);

  console.log(current_question === choice);

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
                    className={`${current_question === choice ? "bg-green-500" : ""} flex gap-2 relative h-12 w-80 p-2 mb-2 cursor-pointer border-emerald-600 rounded-md border hover:bg-pink-50 ${respondida ? "pointer-events-none" : ""} `}
                  >
                    <input
                      onClick={(evt) => handleSelection(evt, current_question)}
                      className="appearance-none w-100 cursor-pointer"
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
                  className={` flex gap-2 relative h-12 w-80 p-2 mb-2 cursor-pointer border-emerald-600 rounded-md border hover:bg-pink-50 ${respondida ? "pointer-events-none" : ""}`}
                >
                  <input
                    onClick={(evt) => handleSelection(evt, item)}
                    className={`appearance-none w-100 cursor-pointer ${respondida && item === choice?.titulo ? "bg-red-500" : ""}`}
                    key={item}
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
      {step}/20
      {!started ? (
        <button
          onClick={() => setStarted(true)}
          className="w-48 self-center bg-teal-700 hover:bg-teal-600 hover:border hover:border-teal-950 border border-transparent transition-all cursor-pointer p-2 rounded-md font-bold"
        >
          Iniciar Quiz
        </button>
      ) : null}
      {respondida ? (
        <button
          onClick={() => handleStepUpdate()}
          className="w-48 self-center bg-teal-700 hover:bg-teal-600 hover:border hover:border-teal-950 border border-transparent transition-all cursor-pointer p-2 rounded-md font-bold"
        >
          Próximo desafio!
        </button>
      ) : null}
    </div>
  );
};

export default Quiz;
