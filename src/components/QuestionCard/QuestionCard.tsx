import React from 'react'
import { AnswerObject } from '../../App'
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
    question:string;
    answers:string[];
    callback:(e:React.MouseEvent<HTMLButtonElement>)=>void;
    userAnswer:AnswerObject | undefined;
    questionNumber:number,
    totalQuestions:number
}

const QuestionCard:React.FC<Props> =({question,answers,callback,questionNumber,totalQuestions,userAnswer})=>{
    return(
        <Wrapper>
            <p className="number">Question:{questionNumber} / {totalQuestions}</p>
            <p dangerouslySetInnerHTML={{__html:question}}></p>
            <div>
                {answers && answers.map((answer,index)=>{
                    return (
                        <ButtonWrapper  
                        correct={userAnswer?.correctAnswer === answer}
                        userClicked={userAnswer?.answer === answer} key={index}>
                            <button onClick={callback} value={answer} disabled={!!userAnswer}>
                                <span dangerouslySetInnerHTML={{__html:answer}}/>
                            </button>
                        </ButtonWrapper>
                    ) 
                })}
            </div>
        </Wrapper>
    )
}

export default QuestionCard
