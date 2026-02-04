import birds from "../aves_de_jacarei.json";

export const QUIZ_QUESTIONS_LENGTH = 20;

export const getQuiz = () => {
  let bird_list = [];
  for (let i = 0; i < QUIZ_QUESTIONS_LENGTH; i++) {
    const index = Math.floor(Math.random() * (birds.length - 1));
    const selected_bird = birds[index];
    const tax = selected_bird.nome_cientifico.split(" ")[0];
    const tax_similar = birds.find(
      (item) =>
        item.titulo !== selected_bird.titulo ||
        item.nome_cientifico.split(" ")[0] === tax,
    );

    let options: string[] = [tax_similar!.titulo];

    for (let j = 0; j < 3; j++) {
      const j_index = Math.floor(Math.random() * (birds.length - 1));
      options.push(birds[j_index].titulo);
    }

    bird_list.push({ ...selected_bird, options });
  }

  return bird_list;
};
