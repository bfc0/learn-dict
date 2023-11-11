"use client";
import { useEffect, useState } from "react"


type Word = {
    id: number,
    word: string,
    translation: string,
    usage: string
}

type QuizItem = {
    idx: number,
    word: string,
    answers: string[]
    correct: string
}

export default function Quiz(props: { words: Word[] }) {
    const words = props.words
    const [quizItem, setQuizItem] = useState<QuizItem | null>(null)
    const [clickedItems, setClickedItems] = useState<Array<string>>([])
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [totalAnswers, setTotalAnswers] = useState(0)

    function getRandomIdx(list: Array<any>): number {
        return Math.floor(Math.random() * list.length)
    }

    function generateItemFrom(list: Array<Word>): QuizItem {
        const itemIdx = getRandomIdx(list)
        const answers = []
        answers.push(list[itemIdx].translation)

        answers.push(list[getRandomIdx(list)].translation)
        answers.push(list[getRandomIdx(list)].translation)
        answers.push(list[getRandomIdx(list)].translation)

        answers.sort(() => Math.random() - 0.5)

        return {
            idx: itemIdx,
            word: list[itemIdx].word,
            answers: answers,
            correct: list[itemIdx].translation
        }
    }

    function clickAnswer(answer: string) {
        setClickedItems(prevClickedItems => [...prevClickedItems, answer])
        setTotalAnswers(prev => prev + 1)
        if (answer == quizItem?.correct) {
            setCorrectAnswers(prev => prev + 1)
            setTimeout(() => {
                setQuizItem(generateItemFrom(words))
                setClickedItems([])
            }, 1000)
        }
    }

    useEffect(() => { setQuizItem(generateItemFrom(words)) }, [])

    useEffect(() => {
        function keyPress(e: KeyboardEvent) {
            if (["1", "2", "3", "4"].includes(e.key)) {
                if (!quizItem) { return }
                clickAnswer(quizItem.answers[parseInt(e.key) - 1])
            }
            // console.log(clickedItems)
        }
        window.addEventListener("keydown", keyPress)
        return () => window.removeEventListener("keydown", keyPress)
    }, [quizItem])

    const buttonUnknown = "text-blue-700 hover:text-white  hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
    const buttonWrong = "text-white   bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
    const buttonCorrect = "text-white  bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"

    return (
        <div>
            {
                quizItem && <>
                    <h2 className="inline pl-5">Correct:</h2>
                    <h1 className="inline pl-3 font-bold">{correctAnswers}</h1>
                    <h2 className="inline pl-10">Total:</h2>
                    <h1 className="inline pl-3 font-bold">{totalAnswers}</h1>


                    <h1 className="text-xl py-16 px-5 font-bold"> {quizItem.word}</h1>
                    {
                        quizItem.answers.map(item =>
                            <div>
                                <button
                                    className={
                                        clickedItems.includes(item) ?
                                            quizItem.correct === item ? buttonCorrect : buttonWrong
                                            : buttonUnknown
                                    }
                                    onClick={() => clickAnswer(item)}>{item}</button>
                            </div>
                        )
                    }
                </>
            }
        </div >
    )
}