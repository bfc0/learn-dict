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

    return (
        <div>
            <h1>Quiz</h1>
            <p>{JSON.stringify(generateItemFrom(words))}</p>
        </div>
    )
}