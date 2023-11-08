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
        setClickedItems([...clickedItems, answer])

        if (answer == quizItem?.correct) {
            setTimeout(() => setQuizItem(generateItemFrom(words)), 1000)
        }
    }

    useEffect(() => { setQuizItem(generateItemFrom(words)) }, [])
    const buttonUnknown = "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
    const buttonWrong = "text-white border border-red-700 bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
    const buttonCorrect = "text-white border border-green-700 bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"

    return (
        <div>
            {
                quizItem && <>
                    <h1 className=""> {quizItem.word}</h1>
                    {
                        quizItem.answers.map(item =>
                            <button className={
                                clickedItems.includes(item) ?
                                    quizItem.correct === item ? buttonCorrect : buttonWrong
                                    : buttonUnknown
                            }
                                onClick={() => clickAnswer(item)}>{item}</button>
                        )
                    }
                </>
            }
        </div >
    )
}