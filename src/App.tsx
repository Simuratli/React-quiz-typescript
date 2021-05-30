import React,{useState} from 'react';
//components
import QuestionCard from './components/QuestionCard/QuestionCard';
import { fetchQuizQuestions, Difficulty, QuestionsState } from './API'
//style
import { GlobalStyle,Wrapper } from './App.styles'

const TOTAL_QUESTION:number = 10

export type AnswerObject = {
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string
}

function App() {

  

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswors, setUserAnswors] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  console.log(fetchQuizQuestions(TOTAL_QUESTION,Difficulty.EASY));

  const startTrivia = async () => {
      setLoading(true)
      setGameOver(false)

      const newQuestions = await  fetchQuizQuestions(TOTAL_QUESTION,Difficulty.EASY)
      setQuestions(newQuestions)
      setScore(0)
      setUserAnswors([])
      setNumber(0)
      setLoading(false)
  }

  const checkAnswers = (e:React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer;
      if(correct) setScore(score+1);
      
      const answerObject = {
        question:questions[number].question,
        answer,
        correct,
        correctAnswer:questions[number].correct_answer
      }
      setUserAnswors((prev)=>([ ...prev, answerObject]))
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1
    if(nextQuestion === TOTAL_QUESTION){
      setGameOver(true)
    }else{
      setNumber(nextQuestion)
    }
  }


  return (
    <Wrapper>
      <GlobalStyle/>
          <h1>REACT QUIZZ</h1>
          {gameOver || userAnswors.length===TOTAL_QUESTION ? 
           <button onClick={startTrivia}>Start quizz</button>
           : null
          }
         
          {
            !gameOver ? <p className="score">Score: {score}</p> : null
          }
          
          {
            !loading && !gameOver &&  (
              <QuestionCard 
              questionNumber={number+1}
              totalQuestions={TOTAL_QUESTION}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswors ? userAnswors[number] : undefined}
              callback={checkAnswers}
              />
            )
          }
          {
            !gameOver && !loading && userAnswors.length === number+1 && number !== TOTAL_QUESTION - 1 ? (
              <button onClick={nextQuestion} className="next">Next</button>
            ): null
          }
    </Wrapper>
  );
}

export default App;
